export default function murmur3_32(key: string, seed = 0) {
	const length = key.length

	let h = seed >>> 0
	let i = 0

	while (i + 3 < length) {
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

		i += 4
	}

	let k = 0
	const remainder = length & 3
	if (remainder === 3) k ^= (key.charCodeAt(i + 2) & 0xff) << 16
	if (remainder >= 2) k ^= (key.charCodeAt(i + 1) & 0xff) << 8
	if (remainder >= 1) {
		k ^= key.charCodeAt(i) & 0xff
		k = Math.imul(k, 0xcc9e2d51)
		k = (k << 15) | (k >>> 17)
		k = Math.imul(k, 0x1b873593)
		h ^= k
	}

	h ^= length
	h ^= h >>> 16
	h = Math.imul(h, 0x85ebca6b)
	h ^= h >>> 13
	h = Math.imul(h, 0xc2b2ae35)
	h ^= h >>> 16

	return h >>> 0 // Return unsigned 32-bit integer
}
