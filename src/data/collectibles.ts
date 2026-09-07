import type Collectible from "#types/collectible"
import type { CollectibleName } from "#types/collectible"
import type RarityLabel from "#types/rarity"

export const COLLECTIBLES = {
	"🦆 Rubber Duck with a PhD": {
		symbol: "🦆",
		rarity: "common",
	},
	"🐱 Cat Sitting on Keyboard": {
		symbol: "🐱",
		rarity: "common",
	},
	"☕ Stale Espresso Puck": {
		symbol: "☕",
		rarity: "common",
	},
	"🐕 Sleepy Golden Retriever": {
		symbol: "🐕",
		rarity: "common",
	},
	"🪴 Desk Succulent in a Teacup": {
		symbol: "🪴",
		rarity: "common",
	},
	"🧋 Taro Boba Milk Tea": {
		symbol: "🧋",
		rarity: "common",
	},
	"🎲 D20 Rolling a Natural 1": {
		symbol: "🎲",
		rarity: "common",
	},
	"🍞 Golden Bread Crumb": {
		symbol: "🍞",
		rarity: "common",
		spawnCondition: { applicableShapes: ["Bread"] },
	},
	"🍩 Sugar Glaze Flake": {
		symbol: "🍩",
		rarity: "common",
		spawnCondition: { applicableShapes: ["Donut"] },
	},
	"🪨 Compressed Peat": {
		symbol: "🪨",
		rarity: "common",
		spawnCondition: { applicableVariants: ["Dirt"] },
	},
	"🪵 Seasoned Woodchip": {
		symbol: "🪵",
		rarity: "common",
		spawnCondition: { applicableVariants: ["Wood"] },
	},
	"🍬 Peppermint Shard": {
		symbol: "🍬",
		rarity: "common",
		spawnCondition: { applicableVariants: ["Candy"] },
	},
	"🧦 Missing Semicolon": {
		symbol: "🧦",
		rarity: "common",
		spawnCondition: { minTileIndex: 8 },
	},
	"🪶 Staged .DS_Store": {
		symbol: "🪶",
		rarity: "common",
		spawnCondition: { minTileIndex: 12 },
	},
	"🔥 'This is Fine' Mug": {
		symbol: "🔥",
		rarity: "common",
	},
	"🪙 Doge Copper Coin": {
		symbol: "🪙",
		rarity: "common",
	},
	"🍄 8-Bit Red Mushroom": {
		symbol: "🍄",
		rarity: "common",
	},
	"❤️ Pixel Heart Container": {
		symbol: "❤️",
		rarity: "common",
	},
	"📦 Cardboard Stealth Box": {
		symbol: "📦",
		rarity: "common",
	},
	"🍜 Steaming Naruto Ramen": {
		symbol: "🍜",
		rarity: "common",
	},
	"🦜 Syntax Error Parrot": {
		symbol: "🦜",
		rarity: "common",
	},
	"🦎 Chill Aquarium Axolotl": {
		symbol: "🦎",
		rarity: "common",
	},
	"🦔 Cozy Desk Hedgehog": {
		symbol: "🦔",
		rarity: "common",
	},
	"🧢 Red Ash Cap": {
		symbol: "🧢",
		rarity: "common",
	},
	"🪀 Fidget Spinner of Focus": {
		symbol: "🪀",
		rarity: "common",
	},
	"🎧 Foam Ear Cushion": {
		symbol: "🎧",
		rarity: "common",
	},
	"🍪 Fortune Cookie (No Fortune Inside)": {
		symbol: "🍪",
		rarity: "common",
	},
	"🥤 Lukewarm Energy Drink": {
		symbol: "🥤",
		rarity: "common",
	},
	"📦 node_modules Fragment": {
		symbol: "📦",
		rarity: "common",
		spawnCondition: { minTileIndex: 16 },
	},
	"📎 Clippy's Bent Wire": {
		symbol: "📎",
		rarity: "common",
	},
	"🧻 Git Blame Receipt": {
		symbol: "🧻",
		rarity: "common",
		spawnCondition: { minTileIndex: 20 },
	},
	"🍕 Cold Hackathon Slice": {
		symbol: "🍕",
		rarity: "common",
	},
	"🩹 Deprecated Monkey Patch": {
		symbol: "🩹",
		rarity: "common",
		spawnCondition: { minTileIndex: 24 },
	},
	"🔋 1% Battery Warning": {
		symbol: "🔋",
		rarity: "common",
	},
	"🧊 Cold Ice Cubelet": {
		symbol: "🧊",
		rarity: "common",
		spawnCondition: { applicableVariants: ["Glacier"] },
	},
	"🌿 Mossy Pebble": {
		symbol: "🌿",
		rarity: "common",
		spawnCondition: { applicableVariants: ["Moss"] },
	},
	"🧱 Terra Cotta Shard": {
		symbol: "🧱",
		rarity: "common",
		spawnCondition: { applicableVariants: ["Terracotta"] },
	},
	"🌸 Sakura Blossom Petal": {
		symbol: "🌸",
		rarity: "common",
		spawnCondition: { applicableVariants: ["Sakura"] },
	},
	"🔴 Red Polka Dot": {
		symbol: "🔴",
		rarity: "common",
		spawnCondition: { applicableVariants: ["PolkaDot"] },
	},
	"🛡️ Scratched Steel Plate": {
		symbol: "🛡️",
		rarity: "common",
		spawnCondition: { applicableEffects: ["Armored"] },
	},
	"🔨 Brittle Glass Shard": {
		symbol: "🔨",
		rarity: "common",
		spawnCondition: { applicableEffects: ["Brittle"] },
	},
	"🔗 Iron Link Ring": {
		symbol: "🔗",
		rarity: "common",
		spawnCondition: { applicableEffects: ["Chained"] },
	},
	"💈 Barbed Needle Tip": {
		symbol: "💈",
		rarity: "common",
		spawnCondition: { applicableEffects: ["Barbed"] },
	},
	"🕯️ Scented Soy Candle": {
		symbol: "🕯️",
		rarity: "common",
	},
	"🎟️ Jira Ticket Stub": {
		symbol: "🎟️",
		rarity: "common",
	},
	"💡 Deprecated Idea Filament": {
		symbol: "💡",
		rarity: "common",
	},
	"🪟 Frosted Glass Pane": {
		symbol: "🪟",
		rarity: "common",
	},
	"🧲 Refrigerator Magnet Letter 'C'": {
		symbol: "🧲",
		rarity: "common",
	},
	"📬 Unread Notification Badge": {
		symbol: "📬",
		rarity: "common",
	},
	"🏷️ Pristine Git Tag": {
		symbol: "🏷️",
		rarity: "common",
	},
	"🧪 Pipette of Solder Flux": {
		symbol: "🧪",
		rarity: "common",
	},
	"🪵 Chewed Pencil Stub": {
		symbol: "🪵",
		rarity: "common",
	},
	"🫧 Soap Bubble Cache": {
		symbol: "🫧",
		rarity: "common",
	},
	"🧵 Single-Thread Spool": {
		symbol: "🧵",
		rarity: "common",
	},
	"🧱 1x1 Brick Stud": {
		symbol: "🧱",
		rarity: "common",
	},
	"🍙 Onigiri Rice Ball": {
		symbol: "🍙",
		rarity: "common",
	},
	"🪩 Tiny Disco Mirror Tile": {
		symbol: "🪩",
		rarity: "common",
	},
	"🪗 8-Bit Chiptune Synth Key": {
		symbol: "🪗",
		rarity: "common",
	},
	"🥪 Corner Cafe Panini": {
		symbol: "🥪",
		rarity: "common",
	},
	"🧃 Juice Box with Bendy Straw": {
		symbol: "🧃",
		rarity: "common",
	},
	"🥐 Butter Croissant Flake": {
		symbol: "🥐",
		rarity: "common",
	},
	"🐹 Chinchilla Dust Bath Jar": {
		symbol: "🐹",
		rarity: "common",
	},
	"🦆 Tiny Rubber Duckie Army": {
		symbol: "🦆",
		rarity: "common",
	},
	"☕ French Press Plunger": {
		symbol: "☕",
		rarity: "common",
	},
	"🪅 Bubble Wrap Sheet": {
		symbol: "🪅",
		rarity: "common",
	},
	"🥪 PB&J Cut Diagonally": {
		symbol: "🥪",
		rarity: "common",
	},
	"🐱 Purring Calico Kitten": {
		symbol: "🐱",
		rarity: "common",
	},
	"🖍️ Box of 64 Crayons with Sharpener": {
		symbol: "🖍️",
		rarity: "common",
	},
	"🎮 Classic Game Boy Cartridge": {
		symbol: "🎮",
		rarity: "common",
	},
	"🧋 Strawberry Milk Bottle": {
		symbol: "🧋",
		rarity: "common",
	},

	"🫙 Detached HEAD in a Jar": {
		symbol: "🫙",
		rarity: "uncommon",
		spawnCondition: { minTileIndex: 28 },
	},
	"⁏ Greek Question Mark": {
		symbol: "⁏",
		rarity: "uncommon",
		spawnCondition: { minTileIndex: 32 },
	},
	"🪦 Legacy IE6 Polyfill": {
		symbol: "🪦",
		rarity: "uncommon",
		spawnCondition: { minTileIndex: 36 },
	},
	"💾 Install Disk #17 of 42": {
		symbol: "💾",
		rarity: "uncommon",
		spawnCondition: { minTileIndex: 40 },
	},
	"🪤 Heisenbug Trap": {
		symbol: "🪤",
		rarity: "uncommon",
		spawnCondition: { minTileIndex: 44 },
	},
	"🐕‍🦺 Capybara with an Orange on Its Head": {
		symbol: "🐕‍🦺",
		rarity: "uncommon",
	},
	"🐈 Tuxedo Cat in a Loaf": {
		symbol: "🐈",
		rarity: "uncommon",
	},
	"🦝 Trash Panda with Half an Apple": {
		symbol: "🦝",
		rarity: "uncommon",
	},
	"📼 Rickroll Cassette Tape": {
		symbol: "📼",
		rarity: "uncommon",
	},
	"📈 Stonks Rising Chart": {
		symbol: "📈",
		rarity: "uncommon",
	},
	"🧪 Blue Mana Potion": {
		symbol: "🧪",
		rarity: "uncommon",
	},
	"🧪 Red Health Flask": {
		symbol: "🧪",
		rarity: "uncommon",
	},
	"🗡️ Master Sword Hilt Shard": {
		symbol: "🗡️",
		rarity: "uncommon",
	},
	"🧱 Redstone Dust Pile": {
		symbol: "🧱",
		rarity: "uncommon",
	},
	"🔵 Companion Cube Keyring": {
		symbol: "🔵",
		rarity: "uncommon",
	},
	"🎲 Bag of Polyhedral Dice": {
		symbol: "🎲",
		rarity: "uncommon",
	},
	"🧙 Miniature Painted Wizard": {
		symbol: "🧙",
		rarity: "uncommon",
	},
	"🃏 Foil Trading Card Booster Pack": {
		symbol: "🃏",
		rarity: "uncommon",
	},
	"🪶 Senzu Bean Pouch": {
		symbol: "🪶",
		rarity: "uncommon",
	},
	"📻 Walkman with Synthwave Tape": {
		symbol: "📻",
		rarity: "uncommon",
	},
	"🏺 Ancient Copper Ingot": {
		symbol: "🏺",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Copper"] },
	},
	"🪨 Sandstone Fossil": {
		symbol: "🪨",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Sandstone"] },
	},
	"🪵 Petrified Amber Nugget": {
		symbol: "🪵",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Amber"] },
	},
	"🦚 Bandana Cloth Patch": {
		symbol: "🦚",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Bandana"] },
	},
	"🌊 Seigaiha Wave Crest": {
		symbol: "🌊",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Seigaiha"] },
	},
	"🪶 Camo Webbing": {
		symbol: "🪶",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Camo"] },
	},
	"🐝 Honeycomb Wax Cell": {
		symbol: "🐝",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Honeycomb"] },
	},
	"👘 Shibori Indigo Swatch": {
		symbol: "👘",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Shibori"] },
	},
	"🌿 Monstera Leaf Cutting": {
		symbol: "🌿",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Monstera"] },
	},
	"🏛️ Carrara Marble Chip": {
		symbol: "🏛️",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Marble"] },
	},
	"🐢 Tortoiseshell Pick": {
		symbol: "🐢",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Tortoise"] },
	},
	"🏴󠁧󠁢󠁳󠁣󠁴󠁿 Tartan Ribbon": {
		symbol: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Tartan"] },
	},
	"♟️ Houndstooth Fabric Square": {
		symbol: "♟️",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Houndstooth"] },
	},
	"🐆 Leopard Rosette Spot": {
		symbol: "🐆",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Leopard"] },
	},
	"🏺 Zellige Cobalt Tilelet": {
		symbol: "🏺",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Zellige"] },
	},
	"🪐 Zero-G Gyroscope": {
		symbol: "🪐",
		rarity: "uncommon",
		spawnCondition: { applicableEffects: ["Levitating"] },
	},
	"⏳ Stasis Hourglass": {
		symbol: "⏳",
		rarity: "uncommon",
		spawnCondition: { applicableEffects: ["Stasis"] },
	},
	"👥 Echo Silhouette": {
		symbol: "👥",
		rarity: "uncommon",
		spawnCondition: { applicableEffects: ["Echo"] },
	},
	"⚡ Volatile Spark Plug": {
		symbol: "⚡",
		rarity: "uncommon",
		spawnCondition: { applicableEffects: ["Volatile"] },
	},
	"🔮 Amethyst Geode Fragment": {
		symbol: "🔮",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Amethyst"] },
	},
	"🪞 Rose Gold Locket": {
		symbol: "🪞",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["RoseGold"] },
	},
	"🟢 Jade Talisman": {
		symbol: "🟢",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Jade"] },
	},
	"📐 Blueprint Compass": {
		symbol: "📐",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Blueprint"] },
	},
	"🪸 Coral Branchlet": {
		symbol: "🪸",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Coral"] },
	},
	"📟 Monospace Green Cursor": {
		symbol: "📟",
		rarity: "uncommon",
		spawnCondition: { applicableVariants: ["Terminal"] },
	},
	"🧲 Hitchhiker's Towel (42)": {
		symbol: "🧲",
		rarity: "uncommon",
	},
	"🪄 Wand of Refactoring": {
		symbol: "🪄",
		rarity: "uncommon",
	},
	"🕹️ Arcade Joystick Balltop": {
		symbol: "🕹️",
		rarity: "uncommon",
	},
	"🍵 Ceremonial Matcha Whisk": {
		symbol: "🍵",
		rarity: "uncommon",
	},
	"🪅 Piñata Confetti Burst": {
		symbol: "🪅",
		rarity: "uncommon",
	},
	"🐧 Linux Tux Plushie": {
		symbol: "🐧",
		rarity: "uncommon",
	},
	"🪀 Yo-Yo of Infinite Sleep": {
		symbol: "🪀",
		rarity: "uncommon",
	},
	"🔋 Double-A Battery Pair": {
		symbol: "🔋",
		rarity: "uncommon",
	},
	"🪐 Sailor Moon Locket": {
		symbol: "🪐",
		rarity: "uncommon",
	},
	"🪞 Distracted Boyfriend Polarized Film": {
		symbol: "🪞",
		rarity: "uncommon",
	},
	"🦆 Untitled Goose Bell": {
		symbol: "🦆",
		rarity: "uncommon",
	},
	"🦝 Raccoon in a Tiny Hoodie": {
		symbol: "🦝",
		rarity: "uncommon",
	},
	"🐕 Corgi Fluffy Butt": {
		symbol: "🐕",
		rarity: "uncommon",
	},
	"⚔️ Wooden Training Sword": {
		symbol: "⚔️",
		rarity: "uncommon",
	},
	"🥪 Lembas Elven Waybread": {
		symbol: "🥪",
		rarity: "uncommon",
	},
	"🧲 Vintage Neon Clock": {
		symbol: "🧲",
		rarity: "uncommon",
	},
	"🐢 Ninja Turtle Pizza Box": {
		symbol: "🐢",
		rarity: "uncommon",
	},
	"🪀 Golden Snitch Wing": {
		symbol: "🪀",
		rarity: "uncommon",
	},
	"🍵 Cast Iron Tetsubin Teapot": {
		symbol: "🍵",
		rarity: "uncommon",
	},
	"🎮 Memory Card 8MB": {
		symbol: "🎮",
		rarity: "uncommon",
	},

	"🚪 The Vim Exit Parchment": {
		symbol: "🚪",
		rarity: "rare",
		spawnCondition: { minTileIndex: 50 },
	},
	"⚔️ Ghost Merge Conflict": {
		symbol: "⚔️",
		rarity: "rare",
		spawnCondition: { minTileIndex: 54 },
	},
	"💧 Linter's Pure Tear": {
		symbol: "💧",
		rarity: "rare",
		spawnCondition: { minTileIndex: 58 },
	},
	"🔌 Unplugged Staging Server": {
		symbol: "🔌",
		rarity: "rare",
		spawnCondition: { minTileIndex: 62 },
	},
	"🐱 Keyboard Cat's Synth": {
		symbol: "🐱",
		rarity: "rare",
	},
	"🌈 Nyan Cat Pop-Tart Trail": {
		symbol: "🌈",
		rarity: "rare",
	},
	"🐢 Blue Spiny Shell": {
		symbol: "🐢",
		rarity: "rare",
	},
	"🧪 Estus Flask of Firelink": {
		symbol: "🧪",
		rarity: "rare",
	},
	"🗡️ Buster Sword Blade Fragment": {
		symbol: "🗡️",
		rarity: "rare",
	},
	"🔴 Pokéball with Master Capture Seal": {
		symbol: "🔴",
		rarity: "rare",
	},
	"🏹 Arrow to the Knee": {
		symbol: "🏹",
		rarity: "rare",
	},
	"🪨 Obsidian Cleavage Shard": {
		symbol: "🪨",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Obsidian"] },
	},
	"💎 Flawless Diamond Shard": {
		symbol: "💎",
		rarity: "rare",
		spawnCondition: { applicableShapes: ["Sapphire"] },
	},
	"☀️ Solar Corona Flare": {
		symbol: "☀️",
		rarity: "rare",
		spawnCondition: { applicableShapes: ["Sun"] },
	},
	"📜 Damascus Steel Pattern": {
		symbol: "📜",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Damascus"] },
	},
	"🌈 Bismuth Stepped Crystal": {
		symbol: "🌈",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Bismuth"] },
	},
	"🩸 Vampiric Blood Vial": {
		symbol: "🩸",
		rarity: "rare",
		spawnCondition: { applicableEffects: ["Vampiric"] },
	},
	"🔮 Cursed Rune Stone": {
		symbol: "🔮",
		rarity: "rare",
		spawnCondition: { applicableEffects: ["Cursed"] },
	},
	"⚡ Circuit Trace Ribbon": {
		symbol: "⚡",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Circuit"] },
	},
	"🪞 Quicksilver Droplet": {
		symbol: "🪞",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Quicksilver"] },
	},
	"🌌 Aurora Borealis Ribbon": {
		symbol: "🌌",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Aurora"] },
	},
	"🔥 Smoldering Ember Core": {
		symbol: "🔥",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Ember"] },
	},
	"📺 Glitch CRT Scanline": {
		symbol: "📺",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Glitch"] },
	},
	"🌊 Abyssal Trench Core": {
		symbol: "🌊",
		rarity: "rare",
		spawnCondition: { applicableVariants: ["Abyssal"] },
	},
	"📡 56k Modem Handshake Crystal": {
		symbol: "📡",
		rarity: "rare",
	},
	"🧠 Turing Machine Paper Tape": {
		symbol: "🧠",
		rarity: "rare",
	},
	"🪟 Netscape Navigator Gold Disc": {
		symbol: "🪟",
		rarity: "rare",
	},
	"🕹️ Arcade Vector Monitor": {
		symbol: "🕹️",
		rarity: "rare",
	},
	"🧮 Quake Fast Inverse Square Root": {
		symbol: "🧮",
		rarity: "rare",
	},
	"🐉 Dragon Radar Sensor": {
		symbol: "🐉",
		rarity: "rare",
	},
	"👒 Straw Hat Jolly Roger Pin": {
		symbol: "👒",
		rarity: "rare",
	},
	"📓 Notebook with Black Leather Cover": {
		symbol: "📓",
		rarity: "rare",
	},
	"🔦 Sonic Screwdriver": {
		symbol: "🔦",
		rarity: "rare",
	},
	"💍 Precious Golden Ring": {
		symbol: "💍",
		rarity: "rare",
	},
	"🛸 Millennium Hyperdrive Coil": {
		symbol: "🛸",
		rarity: "rare",
	},
	"💡 Green Kyber Crystal": {
		symbol: "💡",
		rarity: "rare",
	},
	"🤖 T-800 Endoskeleton Finger": {
		symbol: "🤖",
		rarity: "rare",
	},
	"🐕 Shiba Inu 'Much Wow' Collar": {
		symbol: "🐕",
		rarity: "rare",
	},
	"🦦 Hand-Holding Sea Otter Pair": {
		symbol: "🦦",
		rarity: "rare",
	},
	"🦥 Zen Sloth Branch": {
		symbol: "🦥",
		rarity: "rare",
	},
	"🪙 D20 Rolling a Natural 20": {
		symbol: "🪙",
		rarity: "rare",
	},
	"🪓 Cherry-Pick Tongs": {
		symbol: "🪓",
		rarity: "rare",
	},
	"🧬 Brainfuck Compiler Tape": {
		symbol: "🧬",
		rarity: "rare",
	},
	"🪤 Deadlock Mutex Pair": {
		symbol: "🪤",
		rarity: "rare",
	},
	"🧮 Fibonacci Golden Ratio Shell": {
		symbol: "🧮",
		rarity: "rare",
	},
	"🧙 Staff of the Grey Pilgrim": {
		symbol: "🧙",
		rarity: "rare",
	},
	"🐈‍⬛ Jiji the Black Cat's Radio": {
		symbol: "🐈‍⬛",
		rarity: "rare",
	},
	"🍕 Teenage Mutant Ooze Canister": {
		symbol: "🍕",
		rarity: "rare",
	},
	"🚀 Kerbal Staging Separator": {
		symbol: "🚀",
		rarity: "rare",
	},
	"🪶 Totoro's Acorn Pouch": {
		symbol: "🪶",
		rarity: "rare",
	},

	"🧯 Production Fire Blanket": {
		symbol: "🧯",
		rarity: "epic",
		spawnCondition: { minTileIndex: 75 },
	},
	"🪐 The 500-Mile Email Relay": {
		symbol: "🪐",
		rarity: "epic",
		spawnCondition: { minTileIndex: 80 },
	},
	"💣 Uncapped While(True)": {
		symbol: "💣",
		rarity: "epic",
		spawnCondition: { minTileIndex: 85 },
	},
	"🧙‍♂️ Wizard's Tab-Indented Makefile": {
		symbol: "🧙‍♂️",
		rarity: "epic",
		spawnCondition: { minTileIndex: 90 },
	},
	"⚡ Flux Capacitor 1.21 Gigawatts": {
		symbol: "⚡",
		rarity: "epic",
	},
	"🗝️ TARDIS Police Box Key": {
		symbol: "🗝️",
		rarity: "epic",
	},
	"🔺 Golden Triforce of Wisdom": {
		symbol: "🔺",
		rarity: "epic",
	},
	"🛡️ Hylian Shield with Crimson Crest": {
		symbol: "🛡️",
		rarity: "epic",
	},
	"🤖 EVA-01 Berserk Battery Pack": {
		symbol: "🤖",
		rarity: "epic",
	},
	"🌋 Magma Crucible": {
		symbol: "🌋",
		rarity: "epic",
		spawnCondition: { applicableVariants: ["Magma"] },
	},
	"⚡ Cyber Neon Conduit": {
		symbol: "⚡",
		rarity: "epic",
		spawnCondition: { applicableVariants: ["CyberNeon"] },
	},
	"☀️ Solar Flare Corona": {
		symbol: "☀️",
		rarity: "epic",
		spawnCondition: { applicableVariants: ["SolarFlare"] },
	},
	"🧪 Toxic Biohazard Vial": {
		symbol: "🧪",
		rarity: "epic",
		spawnCondition: { applicableVariants: ["Toxic"] },
	},
	"🌴 Vaporwave Sunset Hologram": {
		symbol: "🌴",
		rarity: "epic",
		spawnCondition: { applicableVariants: ["Vaporwave"] },
	},
	"🌌 Orion Nebula Stardust": {
		symbol: "🌌",
		rarity: "epic",
		spawnCondition: { applicableVariants: ["Nebula"] },
	},
	"🌊 Abyssal Leviathan Scale": {
		symbol: "🌊",
		rarity: "epic",
		spawnCondition: { applicableVariants: ["Abyssal"] },
	},
	"✨ Quantum Phase Shifter": {
		symbol: "✨",
		rarity: "epic",
		spawnCondition: { applicableEffects: ["Phase"] },
	},
	"🪨 Encased Amber Relic": {
		symbol: "🪨",
		rarity: "epic",
		spawnCondition: { applicableEffects: ["Encased"] },
	},
	"⚡ Supercharged Leyden Jar": {
		symbol: "⚡",
		rarity: "epic",
		spawnCondition: { applicableEffects: ["Overcharged"] },
	},
	"🕹️ Unlocked Konami Code Cartridge": {
		symbol: "🕹️",
		rarity: "epic",
	},
	"📜 Root Certificate Authority Key": {
		symbol: "📜",
		rarity: "epic",
	},
	"🧪 Liquid Nitrogen Thermos": {
		symbol: "🧪",
		rarity: "epic",
	},
	"🧲 Room-Temperature Superconductor": {
		symbol: "🧲",
		rarity: "epic",
	},
	"🪞 Maxwell's Demon Shutter": {
		symbol: "🪞",
		rarity: "epic",
	},
	"🧩 The Halting Problem Paradox": {
		symbol: "🧩",
		rarity: "epic",
	},
	"🪓 The Master Git Rebase Mallet": {
		symbol: "🪓",
		rarity: "epic",
	},
	"📡 Deep Space Network Parabolic Dish": {
		symbol: "📡",
		rarity: "epic",
	},
	"🧠 Neuromorphic Synapse Chip": {
		symbol: "🧠",
		rarity: "epic",
	},
	"🔋 Zero-Point Vacuum Energy Cell": {
		symbol: "🔋",
		rarity: "epic",
	},
	"📜 RFC 1149 Carrier Pigeon Feather": {
		symbol: "📜",
		rarity: "epic",
	},
	"🌪️ Ergosphere Vortex Turbine": {
		symbol: "🌪️",
		rarity: "epic",
	},
	"💾 Core Dump of Alexandria": {
		symbol: "💾",
		rarity: "epic",
	},
	"🐈 Schrödinger's Sealed Box": {
		symbol: "🐈",
		rarity: "epic",
	},
	"🔮 Infinity Gauntlet Finger Snap": {
		symbol: "🔮",
		rarity: "epic",
	},
	"🐕 Shiba Inu Moon Rocket": {
		symbol: "🐕",
		rarity: "epic",
	},
	"🦾 Johnny's Silver Cyberarm": {
		symbol: "🦾",
		rarity: "epic",
	},
	"🪞 Mirror of Erised Shard": {
		symbol: "🪞",
		rarity: "epic",
	},
	"💣 GoldenEye 007 Remote Mine": {
		symbol: "💣",
		rarity: "epic",
	},

	"🌌 Master Commit Zero": {
		symbol: "🌌",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 100 },
	},
	"🌀 Singularity Tarball": {
		symbol: "🌀",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 105 },
	},
	"⚡ Linus's First Keypress": {
		symbol: "⚡",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 110 },
	},
	"🪞 Turing's Universal Tape": {
		symbol: "🪞",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 112 },
	},
	"🪐 Event Horizon Singularity": {
		symbol: "🪐",
		rarity: "legendary",
		spawnCondition: { applicableVariants: ["BlackHole"] },
	},
	"✨ Holographic Universe Plate": {
		symbol: "✨",
		rarity: "legendary",
		spawnCondition: { applicableVariants: ["Holographic"] },
	},
	"💥 Supernova Remnant Seed": {
		symbol: "💥",
		rarity: "legendary",
		spawnCondition: { applicableVariants: ["Supernova"] },
	},
	"🛡️ Mithril True-Silver Ingot": {
		symbol: "🛡️",
		rarity: "legendary",
		spawnCondition: { applicableVariants: ["Mithril"] },
	},
	"🌑 Dark Matter Monolith": {
		symbol: "🌑",
		rarity: "legendary",
		spawnCondition: { applicableVariants: ["DarkMatter"] },
	},
	"✨ Kintsugi Golden Seam": {
		symbol: "✨",
		rarity: "legendary",
		spawnCondition: { applicableVariants: ["Kintsugi"] },
	},
	"😇 Halo of the Blessed Engine": {
		symbol: "😇",
		rarity: "legendary",
		spawnCondition: { applicableEffects: ["Blessed"] },
	},
	"⚛️ Quantum Bit Superposition": {
		symbol: "⚛️",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 115 },
	},
	"📜 The Origin Block Hash": {
		symbol: "📜",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 118 },
	},
	"🔮 Ada Lovelace's Analytical Engine Gear": {
		symbol: "🔮",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 120 },
	},
	"🌌 Cosmic Ray Bit-Flipper": {
		symbol: "🌌",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 122 },
	},
	"⌛ Chrono-Trigger Timestamp Zero": {
		symbol: "⌛",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 124 },
	},
	"🧬 Primordial Assembly Opcode": {
		symbol: "🧬",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 125 },
	},
	"🌟 The First Webpage Hyperlink": {
		symbol: "🌟",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 126 },
	},
	"🗝️ Sudo Master Skeleton Key": {
		symbol: "🗝️",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 127 },
	},
	"🌌 The Grand Unified Kernel": {
		symbol: "🌌",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 128 },
	},
	"🐾 The Omnipresent Void Cat": {
		symbol: "🐾",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 124 },
	},
	"🐉 Shenron's Wish Orb": {
		symbol: "🐉",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 125 },
	},
	"⚔️ Excalibur Embedded in Bedrock": {
		symbol: "⚔️",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 126 },
	},
	"⭐ The Invincibility Star": {
		symbol: "⭐",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 127 },
	},
	"🧙‍♂️ The One Ring to Rule the Commits": {
		symbol: "🧙‍♂️",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 128 },
	},
	"🏰 Castle in the Sky Aetherium Crystal": {
		symbol: "🏰",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 127 },
	},
	"🌌 Carl Sagan's Pale Blue Dot": {
		symbol: "🌌",
		rarity: "legendary",
		spawnCondition: { minTileIndex: 128 },
	},
} as const satisfies Record<string, Collectible>

export const COLLECTIBLES_BY_RARITY = (Object.entries(COLLECTIBLES) as [CollectibleName, Collectible][]).reduce(
	(acc, [name, item]) => {
		;(acc[item.rarity] ??= []).push(name)
		return acc
	},
	{} as Record<RarityLabel, CollectibleName[]>,
)
