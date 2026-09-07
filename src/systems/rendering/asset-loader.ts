import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RENDERING_DIR = path.join(__dirname, "..", "..", "rendering")
const ASSETS_DIR = path.join(RENDERING_DIR, "assets")
const TILES_DIR = path.join(ASSETS_DIR, "tiles")
const SVG_DEFS_DIR = path.join(RENDERING_DIR, "svg-defs")

function extractSvgInnerContent(svgContent: string): string {
	const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)
	return match ? match[1].trim() : svgContent.trim()
}

async function loadExtraSvgDefs(): Promise<string> {
	try {
		const files = await fs.readdir(SVG_DEFS_DIR)
		const svgFiles = files.filter((file) => file.endsWith(".svg"))

		const contents = await Promise.all(
			svgFiles.map(async (file) => {
				const raw = await fs.readFile(path.join(SVG_DEFS_DIR, file), "utf8")
				return extractSvgInnerContent(raw)
			}),
		)

		return contents.filter(Boolean).join("\n\t")
	} catch {
		return ""
	}
}

export async function loadSvgDefs(): Promise<string> {
	const charBasePath = path.join(ASSETS_DIR, "char-base.svg")

	const [charBaseRaw, tileFiles, extraDefs] = await Promise.all([
		fs.readFile(charBasePath, "utf8"),
		fs.readdir(TILES_DIR),
		loadExtraSvgDefs(),
	])

	const charBaseInner = extractSvgInnerContent(charBaseRaw)

	const svgTileFiles = tileFiles.filter((file) => file.endsWith(".svg")).sort()
	const tileDefs = await Promise.all(
		svgTileFiles.map(async (file) => {
			const id = path.basename(file, ".svg")
			const raw = await fs.readFile(path.join(TILES_DIR, file), "utf8")
			const inner = extractSvgInnerContent(raw)
			return `\t<g id="${id}">\n\t\t${inner}\n\t</g>`
		}),
	)

	const extraDefsBlock = extraDefs ? `\n\t${extraDefs}` : ""

	return `<defs>
	<g id="char-base">
		${charBaseInner}
	</g>
${tileDefs.join("\n")}${extraDefsBlock}
</defs>`
}
