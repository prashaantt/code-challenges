import test = require('tape');

import { Hanoi } from './Hanoi';

test('The tower of hanoi program', (t) => {

    t.test('initialises correctly', (t) => {

        const tower = new Hanoi(4);
        t.deepEqual(tower.source, [1, 2, 3, 4]);
        t.deepEqual(tower.aux, []);
        t.deepEqual(tower.target, []);
        t.end();
    });

    t.test('moves all stacks correctly', (t) => {

        const tower = new Hanoi(4);
        tower.solve();
        t.deepEqual(tower.source, []);
        t.deepEqual(tower.aux, []);
        t.deepEqual(tower.target, [1, 2, 3, 4]);
        t.end();
    });

    t.test('performs as expected', (t) => {

        const stackSize = 9;
        const tower = new Hanoi(stackSize);
        tower.solve();
        t.assert(tower.iterations === Math.pow(2, stackSize) - 1);
        t.end();
    });
});
