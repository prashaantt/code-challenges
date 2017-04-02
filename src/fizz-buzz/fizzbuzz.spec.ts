import test = require('tape');

import { isDivisible, numbers, fizzer, buzzer, fizzbuzzer, luckifier, fizzbuzz, luckify } from './fizzbuzz';

test('fizzBuzz', t => {

    t.test('correctly generates a bounded series of numbers', t => {
        const series = numbers(1, 6);
        t.deepEqual(series, [1, 2, 3, 4, 5, 6]);
        t.end();
    });

    t.test('throws for incorrect args to numbers', t => {
        t.throws(() => numbers(7, 6));
        t.end();
    });

    t.test('correctly computes divisibility of a number by another', t => {
        t.true(isDivisible(3)(6));
        t.false(isDivisible(3)(7));
        t.end();
    });

    t.test('correctly outputs fizz when divisible by 3', t => {
        t.equal(fizzer(6), 'fizz');
        t.equal(fizzer(7), 7);
        t.end();
    });

    t.test('correctly outputs buzz when divisible by 5', t => {
        t.equal(buzzer(10), 'buzz');
        t.equal(buzzer(7), 7);
        t.end();
    });

    t.test('correctly outputs fizzbuzz when divisible by 15', t => {
        t.equal(fizzbuzzer(30), 'fizzbuzz');
        t.equal(fizzbuzzer(31), 31);
        t.end();
    });

    t.test('solves fizzbuzz correctly', t => {
        const series = numbers(1, 16);
        const expected = [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz', 16];
        t.deepEqual(fizzbuzz(series), expected);
        t.end();
    });

    t.test('correctly outputs lucky when number contains 3', t => {
        t.equal(luckifier(30), 'lucky');
        t.equal(luckifier(21), 21);
        t.end();
    });

    t.test('luckifies fizzbuzz correctly', t => {
        const series = numbers(1, 16);
        const expected = [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 'lucky', 14, 'fizzbuzz', 16];
        t.deepEqual(luckify(series), expected);
        t.end();
    });
});
