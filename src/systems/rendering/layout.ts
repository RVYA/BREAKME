const CELL_SIZE = 16
const CELL_GAP = 4
const MARGIN_X = 6
const MARGIN_Y = 4
const GRID_COLS = 16
const GRID_ROWS = 8
const TOTAL_CELLS = 128
const PLAYER_CELL_SPAN = 2
const PLAYER_SIZE = PLAYER_CELL_SPAN * CELL_SIZE + (PLAYER_CELL_SPAN - 1) * CELL_GAP
const BASE_ASSET_SIZE = 20
const TILE_SCALE = CELL_SIZE / BASE_ASSET_SIZE
const PLAYER_SCALE = PLAYER_SIZE / BASE_ASSET_SIZE
const VISIBLE_TILE_SLOTS = TOTAL_CELLS - PLAYER_CELL_SPAN * PLAYER_CELL_SPAN
const BOARD_WIDTH = MARGIN_X * 2 + GRID_COLS * CELL_SIZE + (GRID_COLS - 1) * CELL_GAP
const BOARD_HEIGHT = MARGIN_Y * 2 + GRID_ROWS * CELL_SIZE + (GRID_ROWS - 1) * CELL_GAP

type CellPosition = {
	col: number
	row: number
	x: number
	y: number
}

function getCellPosition(cellIndex: number): CellPosition {
	const col = cellIndex % GRID_COLS
	const row = Math.floor(cellIndex / GRID_COLS)
	const x = MARGIN_X + col * (CELL_SIZE + CELL_GAP)
	const y = MARGIN_Y + row * (CELL_SIZE + CELL_GAP)
	return { col, row, x, y }
}

const TILE_SLOTS: CellPosition[] = []
for (let r = 0; r < GRID_ROWS; r++) {
	for (let c = 0; c < GRID_COLS; c++) {
		if (r < PLAYER_CELL_SPAN && c < PLAYER_CELL_SPAN) {
			continue
		}
		TILE_SLOTS.push({
			col: c,
			row: r,
			x: MARGIN_X + c * (CELL_SIZE + CELL_GAP),
			y: MARGIN_Y + r * (CELL_SIZE + CELL_GAP),
		})
	}
}

function getTileSlotPosition(slotIndex: number): CellPosition {
	return TILE_SLOTS[slotIndex] ?? { col: 0, row: 0, x: 0, y: 0 }
}

export {
	BOARD_HEIGHT,
	BOARD_WIDTH,
	CELL_GAP,
	CELL_SIZE,
	GRID_COLS,
	GRID_ROWS,
	MARGIN_X,
	MARGIN_Y,
	PLAYER_CELL_SPAN,
	PLAYER_SCALE,
	PLAYER_SIZE,
	TILE_SCALE,
	TILE_SLOTS,
	TOTAL_CELLS,
	VISIBLE_TILE_SLOTS,
	getCellPosition,
	getTileSlotPosition,
}
export type { CellPosition }
