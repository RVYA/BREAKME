export type HslColor = {
	h: number
	s: number
	l: number
}

export type RgbColor = {
	r: number
	g: number
	b: number
}

export function hslToRgb(hsl: HslColor): RgbColor {
	const h = ((hsl.h % 360) + 360) % 360
	const s = Math.max(0, Math.min(100, hsl.s)) / 100
	const l = Math.max(0, Math.min(100, hsl.l)) / 100

	const c = (1 - Math.abs(2 * l - 1)) * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = l - c / 2

	let rPrime = 0
	let gPrime = 0
	let bPrime = 0

	if (h >= 0 && h < 60) {
		rPrime = c
		gPrime = x
		bPrime = 0
	} else if (h >= 60 && h < 120) {
		rPrime = x
		gPrime = c
		bPrime = 0
	} else if (h >= 120 && h < 180) {
		rPrime = 0
		gPrime = c
		bPrime = x
	} else if (h >= 180 && h < 240) {
		rPrime = 0
		gPrime = x
		bPrime = c
	} else if (h >= 240 && h < 300) {
		rPrime = x
		gPrime = 0
		bPrime = c
	} else {
		rPrime = c
		gPrime = 0
		bPrime = x
	}

	return {
		r: rPrime + m,
		g: gPrime + m,
		b: bPrime + m,
	}
}

export function getRelativeLuminance(rgb: RgbColor): number {
	const transformChannel = (c: number): number => {
		const clamped = Math.max(0, Math.min(1, c))
		return clamped <= 0.04045 ? clamped / 12.92 : Math.pow((clamped + 0.055) / 1.055, 2.4)
	}

	const r = transformChannel(rgb.r)
	const g = transformChannel(rgb.g)
	const b = transformChannel(rgb.b)

	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function getContrastRatio(colorA: HslColor, colorB: HslColor): number {
	const lumA = getRelativeLuminance(hslToRgb(colorA))
	const lumB = getRelativeLuminance(hslToRgb(colorB))

	const lighter = Math.max(lumA, lumB)
	const darker = Math.min(lumA, lumB)

	return (lighter + 0.05) / (darker + 0.05)
}

export function ensureWcagContrast(
	bgHsl: HslColor,
	fgHsl: HslColor,
	targetRatio = 10.0,
): { bg: HslColor; fg: HslColor; ratio: number } {
	const bg = { ...bgHsl }
	const fg = { ...fgHsl }
	let ratio = getContrastRatio(bg, fg)


	if (ratio >= targetRatio) {
		return { bg, fg, ratio }
	}

	for (let step = 0; step < 100; step++) {
		if (ratio >= targetRatio) {
			break
		}

		if (bg.l > 0) {
			bg.l = Math.max(0, bg.l - 1)
		}
		if (fg.l < 100) {
			fg.l = Math.min(100, fg.l + 1)
		}

		ratio = getContrastRatio(bg, fg)

		if (bg.l === 0 && fg.l === 100) {
			break
		}
	}

	return { bg, fg, ratio }
}
