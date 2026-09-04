import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const STYLES_DIR = path.join(__dirname, "..", "..", "rendering", "styles")

async function resolveCssImports(filePath: string, visited: Set<string> = new Set<string>()): Promise<string> {
	const absolutePath = path.resolve(filePath)
	if (visited.has(absolutePath)) {
		return ""
	}
	visited.add(absolutePath)

	const content = await fs.readFile(absolutePath, "utf8")
	const importRegex = /@import\s+["']([^"']+)["'];?/g

	let resolved = ""
	let lastIndex = 0
	let match: RegExpExecArray | null

	while ((match = importRegex.exec(content)) !== null) {
		resolved += content.slice(lastIndex, match.index)
		const relativeImport = match[1]
		const importPath = path.resolve(path.dirname(absolutePath), relativeImport)
		const importedContent = await resolveCssImports(importPath, visited)
		resolved += importedContent + "\n"
		lastIndex = match.index + match[0].length
	}

	resolved += content.slice(lastIndex)
	return resolved.trim()
}

export async function loadGameBoardStyles(): Promise<string> {
	const entryFile = path.join(STYLES_DIR, "game-board.css")
	return resolveCssImports(entryFile)
}
