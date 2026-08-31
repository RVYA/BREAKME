import { getTileEffectFrom, getTileShapeFrom, getTileVariantFrom } from "#repos/tiles"
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
