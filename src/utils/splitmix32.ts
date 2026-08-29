import murmur3_32 from "./murmur3-32.js"

export default function splitmix32(seed: number, index = 0): number {
	let z = (seed + Math.imul(index + 1, 0x9e3779b9)) | 0

	z = Math.imul(z ^ (z >>> 16), 0x21f0aaad)
	z = Math.imul(z ^ (z >>> 15), 0x735a2d97)
	z = (z ^ (z >>> 15)) >>> 0

	return z * 2.3283064365386963e-10 // normalize to [0, 1)
}

export function createSplitmix32Stream(seed: number, key: string) {
	const baseSeed = murmur3_32(key, seed)
	let index = 0
	return {
		next: () => splitmix32(baseSeed, index++),
		getIndex: () => index,
	}
}

export function createSplitMix32Chunk(key: string, seed: number, start: number, count: number) {
	const baseSeed = murmur3_32(key, seed)
	const chunk = new Float64Array(count)

	for (let i = 0; i < count; i++) chunk[i] = splitmix32(baseSeed, start + i)

	return chunk
}
