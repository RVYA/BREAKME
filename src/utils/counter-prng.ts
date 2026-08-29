import generate32BitMurmur3Hash from "./hash-generator"

export default function generateRandomSplitmix32(seed: number, index = 0) {
	let z = ((seed + Math.imul(index, 0x9e3779b9)) | 0) >>> 0
	z = (z + 0x9e3779b9) | 0
	z = Math.imul(z ^ (z >>> 16), 0x21f0aaad)
	z = Math.imul(z ^ (z >>> 15), 0x735a2d97)
	return ((z ^ (z >>> 15)) >>> 0) / 4294967296
}

export function createPrngStream(key: string, seed: number) {
	const baseSeed = generate32BitMurmur3Hash(seed, key)
	let index = 0
	return {
		next: () => generateRandomSplitmix32(baseSeed, index++),
		getIndex: () => index,
	}
}

export function getRandomChunk(key: string, seed: number, start: number, count: number) {
	const baseSeed = generate32BitMurmur3Hash(seed, key)
	const chunk = new Float64Array(count)

	for (let i = 0; i < count; i++) chunk[i] = generateRandomSplitmix32(baseSeed, start + i)

	return chunk
}
