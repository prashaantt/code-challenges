import test = require('tape');

import { fib } from './fibonacci';

test('fibonacci', t => {

    t.test('throws if input < 1', t => {

        t.throws(() => fib(0));
        t.end();
    });

    t.test('outputs correctly for 1', t => {

        t.deepEqual(fib(1), [1]);
        t.end();
    });

    t.test('for 2', t => {

        t.deepEqual(fib(2), [1, 1]);
        t.end();
    });

    t.test('for 3', t => {

        t.deepEqual(fib(3), [1, 1, 2]);
        t.end();
    });

    t.test('for 4', t => {

        t.deepEqual(fib(4), [1, 1, 2, 3]);
        t.end();
    });
});
