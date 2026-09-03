import { TILE_EFFECTS_BY_NAME } from "#data/tiles/effects"
import { TILE_SHAPES_BY_NAME } from "#data/tiles/shapes"
import { TILE_VARIANTS_BY_NAME } from "#data/tiles/variants"
import type TileEffect from "./effect"
import type { TileEffectName } from "./effect"
import type TileShape from "./shape"
import type { TileShapeName } from "./shape"
import type TileVariant from "./variant"
import type { TileVariantName } from "./variant"

export default class Tile {
	index: number
	#shape: TileShape
	#variant?: TileVariant
	#effect?: TileEffect

	#maxHp: number
	#currentHp: number

	constructor(index: number, shape: TileShapeName, variant?: TileVariantName, effect?: TileEffectName) {
		this.index = index
		this.#shape = TILE_SHAPES_BY_NAME[shape]
		this.#variant = variant ? TILE_VARIANTS_BY_NAME[variant] : undefined
		this.#effect = effect ? TILE_EFFECTS_BY_NAME[effect] : undefined

		const variantMultiplier = this.#variant?.hpMultiplier ?? 1.0
		const effectMultiplier = this.#effect?.hpMultiplier ?? 1.0
		this.#maxHp = Math.ceil(this.#shape.baseHp * variantMultiplier * effectMultiplier)

		this.#currentHp = this.#maxHp
	}

	get maxHp(): number {
		return this.#maxHp
	}

	get currentHp(): number {
		return this.#currentHp
	}

	get shape(): TileShape {
		return this.#shape
	}

	get variant(): TileVariant | undefined {
		return this.#variant
	}

	get effect(): TileEffect | undefined {
		return this.#effect
	}

	applyDamage(damage: number): void {
		if (this.#currentHp <= 0) return
		this.#currentHp = Math.max(0, this.#currentHp - damage)
	}

	get isBroken(): boolean {
		return this.#currentHp <= 0
	}

	toJSON() {
		return {
			index: this.index,
			shape: this.#shape.name,
			variant: this.#variant?.name,
			effect: this.#effect?.name,
			currentHp: this.#currentHp,
			maxHp: this.#maxHp,
		}
	}

	static fromJSON(data: {
		index: number
		shape: TileShapeName
		variant?: TileVariantName
		effect?: TileEffectName
		currentHp?: number
	}): Tile {
		const tile = new Tile(data.index, data.shape, data.variant, data.effect)
		if (data.currentHp !== undefined) {
			tile.#currentHp = data.currentHp
		}
		return tile
	}
}
