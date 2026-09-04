import ChunkGenerator from "#systems/generation/chunk-generator"

const generator = new ChunkGenerator(Date.now())
const chunk = generator.generate(0)

console.log("=== Generated Cells Overview ===")
console.log("[Cell 00] Character")

chunk.tiles.forEach((tile, index) => {
	const shape = tile.shape.name
	const variant = tile.variant?.name ?? "NONE"
	const effect = tile.effect?.name ?? "NONE"
	const visibility = index < 8 ? "[VISIBLE]" : "[HIDDEN]"
	console.log(`[Cell ${String(index + 1).padStart(2, "0")}] ${shape}|${variant}|${effect} ${visibility}`)
})
/*
const svg = renderSvg(chunk)
await fs.writeFile("BREAKME-board.svg", svg, "utf8")
console.log("\nSuccessfully generated BREAKME-board.svg")*/
