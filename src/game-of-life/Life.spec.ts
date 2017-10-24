import tape = require('tape');
import { Life, getLiveNeighbours } from './life';

tape('Life', tp => {
    tp.test('inits with a random board', t => {
        const life = Life.getInstance(5);
        t.assert(life.layout.length === 5);
        t.assert(life.layout[0].length === 5);
        t.true([1, 0].includes(life.layout[0][0]));
        t.end();
    });

    tp.test('inits with a given input game', t => {
        const input = [
            [1, 0, 1],
            [0, 0, 1],
            [1, 0, 0]
        ];
        const life = Life.getInstance(3, input);
        t.assert(life.layout.length === 3);
        t.assert(life.layout[0].length === 3);
        t.end();
    });

    tp.test('throws for invalid inputgame', t => {
        const input = [[1, 2, 3], [1, 2, 3], [1, 2]];
        t.throws(() => Life.getInstance(3, input));
        t.end();
    });

    tp.test('getLiveNeighbours gets the live neighbours of a given cell', t => {
        const input = [
            [1, 0, 1, 0, 1],
            [0, 0, 1, 1, 0],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 1, 0, 1, 1]
        ];
        t.equals(getLiveNeighbours(input, 2, 2), 3);
        t.equals(getLiveNeighbours(input, 0, 0), 0);
        t.equals(getLiveNeighbours(input, 4, 4), 2);
        t.equals(getLiveNeighbours(input, 0, 4), 1);
        t.equals(getLiveNeighbours(input, 2, 4), 3);
        t.end();
    });

    tp.test('gets the next generations', t => {
        const input = [
            [1, 0, 1],
            [0, 0, 1],
            [1, 0, 0]
        ];
        const life = Life.getInstance(3, input);
        const nextGen = [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0]
        ];
        t.deepEqual(life.getNextGeneration().layout, nextGen);
        const secondGen = [
            [0, 0, 0],
            [0, 1, 0],
            [1, 0, 0]
        ];
        t.deepEqual(life.getNextGeneration().getNextGeneration().layout, secondGen);
        t.end();
    });
});
