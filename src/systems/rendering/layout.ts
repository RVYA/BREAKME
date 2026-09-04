const CELL_SIZE = 20
const CELL_GAP = 5
const MARGIN = 5
const GRID_COLS = 8
const GRID_ROWS = 8
const TOTAL_CELLS = 64
const VISIBLE_TILES_COUNT = 8
const BOARD_WIDTH = MARGIN * 2 + GRID_COLS * CELL_SIZE + (GRID_COLS - 1) * CELL_GAP
const BOARD_HEIGHT = MARGIN * 2 + GRID_ROWS * CELL_SIZE + (GRID_ROWS - 1) * CELL_GAP

type CellPosition = {
	col: number
	row: number
	x: number
	y: number
}

function getCellPosition(cellIndex: number): CellPosition {
	const col = cellIndex % GRID_COLS
	const row = Math.floor(cellIndex / GRID_COLS)
	const x = MARGIN + col * (CELL_SIZE + CELL_GAP)
	const y = MARGIN + row * (CELL_SIZE + CELL_GAP)
	return { col, row, x, y }
}

export {
	BOARD_HEIGHT,
	BOARD_WIDTH,
	CELL_GAP,
	CELL_SIZE,
	GRID_COLS,
	GRID_ROWS,
	MARGIN,
	TOTAL_CELLS,
	VISIBLE_TILES_COUNT,
	getCellPosition,
}
export type { CellPosition }
