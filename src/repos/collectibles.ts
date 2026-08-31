import { COLLECTIBLES_BY_NAME } from "#const/unlockables/collectibles"
import type Collectible from "#models/unlockable/collectible"
import type { CollectibleName } from "#models/unlockable/collectible"

export function getCollectibleFrom(name: CollectibleName): Collectible {
	return COLLECTIBLES_BY_NAME[name]
}
