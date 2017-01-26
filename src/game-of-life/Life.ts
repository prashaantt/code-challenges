export class Board {
    private layout: number[][] = [];

    constructor(size: number, layout?: number[][]) {
        if (layout) {
            this.validateLayout(size, layout);
            this.layout = layout;
        }
        else {
            this.init(size);
        }
    }

    validateLayout(size: number, layout: number[][]) {
        if (size !== layout.length) {
            throw new Error('Invalid layout');
        }
        for (let i = 0; i < size; i++) {
            if (size !== layout[i].length) {
                throw new Error('Invalid layout');
            }
        }
    }

    init(size: number) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (!this.layout[i]) {
                    this.layout.push([]);
                }
                this.layout[i][j] = Math.round(Math.random());
            }
        }
    }

    state() {
        return this.layout;
    }

    neighbours(row: number, col: number) {
        const neighbours = [];

        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i === row && j === col) {
                    continue;
                }

                if (this.layout[i] !== undefined && this.layout[i][j] !== undefined) {
                    neighbours.push(this.layout[i][j]);
                }
                else {
                    neighbours.push(null);
                }
            }
        }

        return neighbours;
    }

    liveNeighbours(row: number, col: number) {
        const neighbours = this.neighbours(row, col);
        return neighbours.reduce((a, b) => b ? a + b : a, 0);
    }

    nextGenCell(row: number, col: number) {
        if (this.liveNeighbours(row, col) === 2) {
            return 1;
        }

        return 0;
    }

    nextGen() {
        const nextLayout: number[][] = [];
        for (let i = 0; i < this.layout.length; i++) {
            for (let j = 0; j < this.layout.length; j++) {
                if (!nextLayout[i]) {
                    nextLayout.push([]);
                }
                nextLayout[i][j] = this.nextGenCell(i, j);
            }
        }
        return nextLayout;
    }
}
