export default function generate32BitMurmur3Hash(key: string, seed: number) {
	let h = seed >>> 0
	const remainder = key.length & 3 // bytes % 4
	const bytes = key.length - remainder

	for (let i = 0; i < bytes; i += 4) {
		let k =
			(key.charCodeAt(i) & 0xff) |
			((key.charCodeAt(i + 1) & 0xff) << 8) |
			((key.charCodeAt(i + 2) & 0xff) << 16) |
			((key.charCodeAt(i + 3) & 0xff) << 24)

		k = Math.imul(k, 0xcc9e2d51)
		k = (k << 15) | (k >>> 17)
		k = Math.imul(k, 0x1b873593)

		h ^= k
		h = (h << 13) | (h >>> 19)
		h = (Math.imul(h, 5) + 0xe6546b64) | 0
	}

	let k = 0
	if (remainder === 3) k ^= (key.charCodeAt(bytes + 2) & 0xff) << 16
	if (remainder >= 2) k ^= (key.charCodeAt(bytes + 1) & 0xff) << 8
	if (remainder >= 1) {
		k ^= key.charCodeAt(bytes) & 0xff
		k = Math.imul(k, 0xcc9e2d51)
		k = (k << 15) | (k >>> 17)
		k = Math.imul(k, 0x1b873593)
		h ^= k
	}

	h ^= key.length
	h ^= h >>> 16
	h = Math.imul(h, 0x85ebca6b)
	h ^= h >>> 13
	h = Math.imul(h, 0xc2b2ae35)
	h ^= h >>> 16

	return h >>> 0 // Return unsigned 32-bit integer
}
