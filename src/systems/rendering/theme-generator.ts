import { ensureWcagContrast, type HslColor } from "#utils/contrast"
import murmur3_32 from "#utils/murmur3-32"

const GOLDEN_RATIO_CONJUGATE = 0.618033988749895

export type HarmonyMode =
	| "complementary"
	| "split-complementary"
	| "triadic"
	| "tetradic"
	| "analogous"
	| "warm-cool"
	| "monochrome"

export type ThemeOptions = {
	seedOrUsername?: string
	bgHue?: number
	fgHue?: number
	harmonyMode?: HarmonyMode
	bgSaturation?: number
	bgLightness?: number
	fgSaturation?: number
	fgLightness?: number
	accentSaturation?: number
	accentLightness?: number
	minContrastRatio?: number
}

export type ThemePalette = {
	bgHue: number
	fgHue: number
	harmonyMode: HarmonyMode
	bg: HslColor
	fg: HslColor
	accent: HslColor
	contrastRatio: number
}

const HARMONIC_PRESETS: { mode: HarmonyMode; offsets: number[] }[] = [
	{ mode: "complementary", offsets: [180] },
	{ mode: "split-complementary", offsets: [150, 210] },
	{ mode: "triadic", offsets: [120, 240] },
	{ mode: "tetradic", offsets: [90, 270] },
	{ mode: "analogous", offsets: [35, 55, 305, 325] },
	{ mode: "warm-cool", offsets: [135, 225] },
	{ mode: "monochrome", offsets: [0] },
]

export function deriveHueFromSeed(key: string): number {
	const hash = murmur3_32(key)
	const fraction = ((hash * GOLDEN_RATIO_CONJUGATE) % 1 + 1) % 1
	return Math.round(fraction * 360) % 360
}

export function getHarmonicOffset(hash: number, requestedMode?: HarmonyMode): { mode: HarmonyMode; offset: number } {
	if (requestedMode) {
		const match = HARMONIC_PRESETS.find((p) => p.mode === requestedMode)
		if (match) {
			const offset = match.offsets[(hash >>> 4) % match.offsets.length]
			return { mode: match.mode, offset }
		}
	}

	const selected = HARMONIC_PRESETS[hash % HARMONIC_PRESETS.length]
	const offset = selected.offsets[(hash >>> 4) % selected.offsets.length]
	return { mode: selected.mode, offset }
}

export function formatHslString(color: HslColor): string {
	return `hsl(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%)`
}

export function generateThemePalette(options: ThemeOptions = {}): ThemePalette {
	const hash = options.seedOrUsername ? murmur3_32(options.seedOrUsername) : 0
	const bgHue =
		options.bgHue !== undefined
			? ((options.bgHue % 360) + 360) % 360
			: options.seedOrUsername
				? deriveHueFromSeed(options.seedOrUsername)
				: 0

	const { mode: harmonyMode, offset } = getHarmonicOffset(hash >>> 8, options.harmonyMode)
	const fgHue =
		options.fgHue !== undefined
			? ((options.fgHue % 360) + 360) % 360
			: ((bgHue + offset) % 360 + 360) % 360

	const derivedBgSaturation = 15 + ((hash >>> 16) & 0x1f) % 34
	const derivedBgLightness = 8 + ((hash >>> 21) & 0x0f) % 12
	const derivedFgSaturation = 60 + ((hash >>> 25) & 0x1f) % 41
	const derivedFgLightness = 76 + ((hash >>> 29) & 0x0f) % 17
	const derivedAccentSaturation = 15 + ((hash >>> 12) & 0x1f) % 24
	const derivedAccentLightness = 18 + ((hash >>> 8) & 0x0f) % 13

	const initialBg: HslColor = {
		h: bgHue,
		s: options.bgSaturation ?? (options.seedOrUsername ? derivedBgSaturation : 30),
		l: options.bgLightness ?? (options.seedOrUsername ? derivedBgLightness : 14),
	}

	const initialFg: HslColor = {
		h: fgHue,
		s: options.fgSaturation ?? (options.seedOrUsername ? derivedFgSaturation : 75),
		l: options.fgLightness ?? (options.seedOrUsername ? derivedFgLightness : 84),
	}

	const accent: HslColor = {
		h: bgHue,
		s: options.accentSaturation ?? (options.seedOrUsername ? derivedAccentSaturation : 24),
		l: options.accentLightness ?? (options.seedOrUsername ? derivedAccentLightness : 25),
	}

	const targetRatio = options.minContrastRatio ?? 10.0
	const { bg, fg, ratio } = ensureWcagContrast(initialBg, initialFg, targetRatio)

	return {
		bgHue,
		fgHue,
		harmonyMode,
		bg,
		fg,
		accent,
		contrastRatio: ratio,
	}
}

export function generateThemeCss(options: ThemeOptions = {}): string {
	const palette = generateThemePalette(options)

	return `:root {\n\t--bg: ${formatHslString(palette.bg)};\n\t--fg: ${formatHslString(palette.fg)};\n\t--accent: ${formatHslString(palette.accent)};\n}`
}
