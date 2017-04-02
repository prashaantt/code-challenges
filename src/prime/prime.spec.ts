import test = require('tape');

import { isPrime, primeFactorsRec, primeFactors } from './prime';

test('prime', t => {

    t.equal(isPrime(1), false);
    t.equal(isPrime(2), true);
    t.equal(isPrime(3), true);
    t.equal(isPrime(4), false);
    t.equal(isPrime(5), true);
    t.equal(isPrime(99), false);
    t.equal(isPrime(113), true);
    t.equal(isPrime(1451), true);
    t.end();
});

test('primeFactor', t => {

    t.deepEqual(primeFactorsRec(1), []);
    t.deepEqual(primeFactorsRec(2), [2]);
    t.deepEqual(primeFactorsRec(4), [2, 2]);
    t.deepEqual(primeFactorsRec(6), [2, 3]);
    t.deepEqual(primeFactorsRec(10), [2, 5]);
    t.deepEqual(primeFactorsRec(36), [2, 2, 3, 3]);
    t.deepEqual(primeFactorsRec(81), [3, 3, 3, 3]);
    t.deepEqual(primeFactorsRec(113), [113]);
    t.end();
});

test('primeFactor', t => {

    t.deepEqual(primeFactors(1), []);
    t.deepEqual(primeFactors(2), [2]);
    t.deepEqual(primeFactors(4), [2, 2]);
    t.deepEqual(primeFactors(6), [2, 3]);
    t.deepEqual(primeFactors(10), [2, 5]);
    t.deepEqual(primeFactors(36), [2, 2, 3, 3]);
    t.deepEqual(primeFactors(81), [3, 3, 3, 3]);
    t.deepEqual(primeFactors(113), [113]);
    t.end();
});
