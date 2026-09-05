import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { ensureWcagContrast, getContrastRatio, getRelativeLuminance, hslToRgb } from "#utils/contrast"

describe("Contrast & Color Utilities", () => {
	it("converts HSL to sRGB accurately", () => {
		const black = hslToRgb({ h: 0, s: 0, l: 0 })
		assert.deepEqual(black, { r: 0, g: 0, b: 0 })

		const white = hslToRgb({ h: 0, s: 0, l: 100 })
		assert.deepEqual(white, { r: 1, g: 1, b: 1 })

		const pureRed = hslToRgb({ h: 0, s: 100, l: 50 })
		assert.equal(Math.round(pureRed.r * 255), 255)
		assert.equal(Math.round(pureRed.g * 255), 0)
		assert.equal(Math.round(pureRed.b * 255), 0)

		const pureGreen = hslToRgb({ h: 120, s: 100, l: 50 })
		assert.equal(Math.round(pureGreen.r * 255), 0)
		assert.equal(Math.round(pureGreen.g * 255), 255)
		assert.equal(Math.round(pureGreen.b * 255), 0)

		const pureBlue = hslToRgb({ h: 240, s: 100, l: 50 })
		assert.equal(Math.round(pureBlue.r * 255), 0)
		assert.equal(Math.round(pureBlue.g * 255), 0)
		assert.equal(Math.round(pureBlue.b * 255), 255)
	})

	it("computes relative luminance according to WCAG 2.1 specs", () => {
		const blackLuminance = getRelativeLuminance({ r: 0, g: 0, b: 0 })
		assert.equal(blackLuminance, 0)

		const whiteLuminance = getRelativeLuminance({ r: 1, g: 1, b: 1 })
		assert.equal(whiteLuminance, 1)

		const midLuminance = getRelativeLuminance({ r: 0.5, g: 0.5, b: 0.5 })
		assert.ok(midLuminance > 0.2 && midLuminance < 0.3)
	})

	it("calculates contrast ratio between colors correctly", () => {
		const whiteHsl = { h: 0, s: 0, l: 100 }
		const blackHsl = { h: 0, s: 0, l: 0 }
		const ratio = getContrastRatio(whiteHsl, blackHsl)

		assert.equal(Math.round(ratio), 21)
	})

	it("automatically adjusts lightness when contrast is below target ratio", () => {
		const lowContrastBg = { h: 210, s: 15, l: 40 }
		const lowContrastFg = { h: 210, s: 20, l: 60 }

		const initialRatio = getContrastRatio(lowContrastBg, lowContrastFg)
		assert.ok(initialRatio < 10)

		const adjusted = ensureWcagContrast(lowContrastBg, lowContrastFg, 10.0)
		assert.ok(adjusted.ratio >= 10.0)
		assert.ok(adjusted.bg.l < lowContrastBg.l)
		assert.ok(adjusted.fg.l > lowContrastFg.l)
	})

	it("leaves colors intact if they already satisfy target contrast ratio", () => {
		const darkBg = { h: 200, s: 15, l: 8 }
		const lightFg = { h: 200, s: 20, l: 95 }

		const result = ensureWcagContrast(darkBg, lightFg, 10.0)
		assert.equal(result.bg.l, 8)
		assert.equal(result.fg.l, 95)
		assert.ok(result.ratio >= 10.0)
	})
})
