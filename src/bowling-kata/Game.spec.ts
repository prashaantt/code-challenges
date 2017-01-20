import test = require('tape');

import { Game } from './Game';

class TestGame extends Game {
    rollMany(n: number, pins: number) {
        for (let i = 0; i < n; i++) {
            this.roll(pins);
        }
    }

    rollSpare() {
        this.roll(5);
        this.roll(5);
    }

    rollStrike() {
        this.roll(10);
    }
}

test('The bowling game', (t) => {
    t.test('scores an all-gutter game correctly', (t) => {

        const g = new TestGame();
        g.rollMany(20, 0);
        t.equal(g.score(), 0);

        t.end();
    });

    t.test('scores all 1s correctly', (t) => {

        const g = new TestGame();
        g.rollMany(20, 1);
        t.equal(g.score(), 20);

        t.end();
    });

    t.test('scores a spare correctly', (t) => {

        const g = new TestGame();
        g.rollSpare();
        g.roll(3);
        g.rollMany(17, 0);
        t.equal(g.score(), 16);

        t.end();
    });

    t.test('scores a strike correctly', (t) => {

        const g = new TestGame();
        g.rollStrike();
        g.roll(3);
        g.roll(4);
        g.rollMany(17, 0);
        t.equal(g.score(), 24);

        t.end();
    });

    t.test('scores a perfect game correctly', (t) => {

        const g = new TestGame();
        g.rollMany(12, 10);
        t.equal(g.score(), 300);

        t.end();
    });
});
