import test = require('tape');

import { Board } from './Life';

test('Game of Life', (t) => {
    const layout = [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 1]
    ];

    t.test('auto-generates the boards with given number of tiles', (t) => {

        const board = new Board(10);
        t.equal(board.state().length, 10);
        t.equal(board.state()[9].length, 10);
        t.true([0, 1].includes(board.state()[0][0]));
        t.end();
    });

    t.test('inits the board if layout is provided', (t) => {

        const board = new Board(3, layout);
        t.equal(board.state(), layout);
        t.end();
    });

    t.test('throws if the dimensions don\'t match with given layout', (t) => {

        const missingLayout = [
            [0, 1, 0],
            [1, 1],
            [0, 1, 1]
        ];

        t.throws(() => { new Board(4, layout); }, 'Invalid layout');
        t.throws(() => { new Board(3, missingLayout); }, 'Invalid layout');
        t.end();
    });

    t.test('correctly gets the neighbours', (t) => {

        const board = new Board(3, layout);
        t.deepEqual(board.neighbours(1, 1), [0, 1, 0, 1, 0, 0, 1, 1]);
        t.deepEqual(board.neighbours(0, 0), [null, null, null, null, 1, null, 1, 1]);
        t.deepEqual(board.neighbours(1, 2), [1, 0, null, 1, null, 1, 1, null]);
        t.end();
    });

    t.test('correctly gets the number of live neighbours', (t) => {

        const board = new Board(3, layout);
        t.equal(board.liveNeighbours(1, 1), 4);
        t.equal(board.liveNeighbours(2, 2), 2);
        t.equal(board.liveNeighbours(0, 2), 2);
        t.end();
    });

    t.test('correctly gets the next generation of a cell', (t) => {

        const board = new Board(3, layout);
        t.equal(board.nextGenCell(1, 1), 0);
        t.equal(board.nextGenCell(2, 2), 1);
        t.end();
    });

    t.test('correctly generates next gen of the board', (t) => {

        const largeLayout = [
            [0, 1, 0, 1, 0],
            [1, 1, 0, 0, 1],
            [0, 1, 1, 1, 1],
            [1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0]
        ];

        const largeLayoutNext = [
            [0, 1, 0, 0, 1],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        const board = new Board(5, largeLayout);
        t.deepEqual(board.nextGen(), largeLayoutNext);
        t.end();
    });
});
