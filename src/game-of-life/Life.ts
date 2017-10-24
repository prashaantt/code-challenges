export class Life {
    readonly layout: number[][] = [];
    private constructor(gridSize: number, inputGame?: number[][], isValidated = true) {
        if (inputGame) {
            if (!isValidated) {
                this.validate(gridSize, inputGame);
            }
            this.layout = inputGame;
        } else {
            this.layout = this.generateRandomGame(gridSize);
        }
    }

    static getInstance(gridSize: number, inputGame?: number[][]) {
        return new Life(gridSize, inputGame, false);
    }

    getNextGeneration() {
        const layout = this.layout.map((row, rowIndex) => row.map((col, colIndex) => (getLiveNeighbours(this.layout, rowIndex, colIndex) === 2 ? 1 : 0)));
        return new Life(layout.length, layout);
    }

    private generateRandomGame(gridSize: number) {
        return Array.from(new Array(gridSize), () => Array.from(new Array(gridSize), () => Math.round(Math.random())));
    }

    private validate(gridSize: number, inputGame: number[][]) {
        if (inputGame.length !== gridSize || inputGame.some(i => i.length !== gridSize)) {
            throw new Error('Invalid input!');
        }
    }
}

export function getLiveNeighbours(layout: number[][], row: number, col: number) {
    const startRow = row - 1 >= 0 ? row - 1 : 0;
    const endRow = row + 1 < layout.length ? row + 1 : layout.length - 1;
    const startCol = col - 1 >= 0 ? col - 1 : 0;
    const endCol = col + 1 < layout.length ? col + 1 : layout.length - 1;

    const neighbours = layout.slice(startRow, endRow + 1).map(row => row.slice(startCol, endCol + 1));

    return neighbours.reduce((rowAcc, row) => rowAcc + row.reduce((colAcc, col) => colAcc + col, 0), 0) - layout[row][col];
}
