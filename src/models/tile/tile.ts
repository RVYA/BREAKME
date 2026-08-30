import type TileEffectName from "#const/tiles/effects"
import type TileShapeName from "#const/tiles/shapes"
import type TileVariantName from "#const/tiles/variants"
import { getTileEffectFrom, getTileShapeFrom, getTileVariantFrom } from "#repos/tiles"
import type TileEffect from "./effect"
import type TileShape from "./shape"
import type TileVariant from "./variant"

export default class Tile {
	index: number
	#shape: TileShape
	#variant?: TileVariant
	#effect?: TileEffect

	#maxHp: number
	#currentHp: number

	constructor(index: number, shape: TileShapeName, variant?: TileVariantName, effect?: TileEffectName) {
		this.index = index
		this.#shape = getTileShapeFrom(shape)
		this.#variant = getTileVariantFrom(variant)
		this.#effect = getTileEffectFrom(effect)

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

	applyDamage(damage: number): void {
		if (this.#currentHp <= 0) return
		this.#currentHp = Math.max(0, this.#currentHp - damage)
	}

	get isBroken(): boolean {
		return this.#currentHp <= 0
	}
}
