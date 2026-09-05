import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
	deriveHueFromSeed,
	generateThemeCss,
	generateThemePalette,
	getHarmonicOffset,
} from "#systems/rendering/theme-generator"

describe("Theme Generator", () => {
	it("deterministically derives hue from username or seed string", () => {
		const hue1 = deriveHueFromSeed("alice")
		const hue2 = deriveHueFromSeed("alice")
		const hue3 = deriveHueFromSeed("bob")

		assert.equal(hue1, hue2)
		assert.notEqual(hue1, hue3)
		assert.ok(hue1 >= 0 && hue1 < 360)
	})

	it("generates dual-tone harmonic light-on-dark palette with WCAG contrast > 10", () => {
		const palette = generateThemePalette({ seedOrUsername: "player1" })

		assert.ok(palette.bgHue >= 0 && palette.bgHue < 360)
		assert.ok(palette.fgHue >= 0 && palette.fgHue < 360)
		assert.equal(palette.bg.h, palette.bgHue)
		assert.equal(palette.fg.h, palette.fgHue)
		assert.equal(palette.accent.h, palette.bgHue)
		assert.ok(palette.contrastRatio >= 10.0)
		assert.ok(palette.bg.l <= 20)
		assert.ok(palette.fg.l >= 70)
	})

	it("supports custom manual hue and harmony mode input", () => {
		const palette = generateThemePalette({ bgHue: 200, harmonyMode: "complementary" })

		assert.equal(palette.bgHue, 200)
		assert.equal(palette.fgHue, (200 + 180) % 360)
		assert.equal(palette.harmonyMode, "complementary")
		assert.ok(palette.contrastRatio >= 10.0)
	})

	it("computes valid harmonic offsets for presets", () => {
		const comp = getHarmonicOffset(0, "complementary")
		assert.equal(comp.mode, "complementary")
		assert.equal(comp.offset, 180)

		const tetradic = getHarmonicOffset(0, "tetradic")
		assert.equal(tetradic.mode, "tetradic")
		assert.ok(tetradic.offset === 90 || tetradic.offset === 270)

		const triadic = getHarmonicOffset(0, "triadic")
		assert.equal(triadic.mode, "triadic")
		assert.ok(triadic.offset === 120 || triadic.offset === 240)
	})

	it("generates valid CSS custom property variable definitions", () => {
		const css = generateThemeCss({ bgHue: 220, fgHue: 40 })

		assert.ok(css.includes(":root {"))
		assert.ok(css.includes("--bg: hsl(220,"))
		assert.ok(css.includes("--fg: hsl(40,"))
		assert.ok(css.includes("--accent: hsl(220,"))
	})
})
