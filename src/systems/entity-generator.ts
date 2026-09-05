import { RARITY_DISTRIBUTION } from "#data/rarities"
import type RarityLabel from "#types/rarity"
import type { TileShapeName } from "#types/tile/shape"
import { createSplitmix32Stream } from "#utils/splitmix32"

type PrngStream = {
	next: () => number
	getIndex: () => number
}

export default abstract class EntityGenerator<T, TContext = TileShapeName> {
	/*#seed: number
	#key: string*/

	#pool: Record<RarityLabel, T[]>

	#presenceRoll?: PrngStream
	#generationChance?: number

	#rarityRoll: PrngStream
	#poolRoll: PrngStream

	#filter?: (entity: T, context?: TContext) => boolean

	protected constructor(
		seed: number,
		key: string,
		pool: Record<RarityLabel, T[]>,
		generationChance?: number,
		filter?: (entity: T, context?: TContext) => boolean,
	) {
		/*this.#seed = seed
		this.#key = key*/

		if (generationChance !== undefined) {
			this.#generationChance = generationChance
			this.#presenceRoll = createSplitmix32Stream(seed, `${key}_presence`)
		}
		this.#rarityRoll = createSplitmix32Stream(seed, `${key}_rarity`)
		this.#poolRoll = createSplitmix32Stream(seed, `${key}_select`)

		this.#pool = pool

		this.#filter = filter
	}

	#shouldGenerate(): boolean {
		if (!this.#presenceRoll || this.#generationChance === undefined) return true
		return this.#presenceRoll.next() < this.#generationChance
	}

	#rollRarityIndex(): number {
		const roll = this.#rarityRoll.next()
		for (let i = 0; i < RARITY_DISTRIBUTION.length; i++) {
			if (roll < RARITY_DISTRIBUTION[i].threshold) return i
		}

		return RARITY_DISTRIBUTION.length - 1
	}

	#isApplicableTo(instance: T, context?: TContext): boolean {
		if (!this.#filter || !instance) return true
		else return this.#filter(instance, context)
	}

	#getCandidates(rolledIndex: number, context?: TContext): T[] {
		const totalTiers = RARITY_DISTRIBUTION.length
		for (let offset = 0; offset < totalTiers; offset++) {
			const i = (rolledIndex + offset) % totalTiers
			const tier = RARITY_DISTRIBUTION[i].label
			const tierPool = this.#pool[tier] ?? []
			const candidates = this.#filter ? tierPool.filter((e) => this.#isApplicableTo(e, context)) : tierPool

			if (candidates.length > 0) {
				return candidates
			}
		}

		return []
	}

	generate(context?: TContext): T | undefined {
		if (!this.#shouldGenerate()) return

		const candidates = this.#getCandidates(this.#rollRarityIndex(), context)
		if (candidates.length === 0) return

		const roll = Math.floor(this.#poolRoll.next() * candidates.length)
		return candidates[roll]
	}
}
