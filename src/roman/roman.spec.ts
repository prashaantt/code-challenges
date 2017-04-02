import test = require('tape');

import { romanize, toRoman } from './roman';

test('romanize', t => {

    t.test('returns correct result for units place', t => {

        t.equal(romanize(0, 0), '');
        t.equal(romanize(3, 0), 'III');
        t.equal(romanize(4, 0), 'IV');
        t.equal(romanize(5, 0), 'V');
        t.equal(romanize(8, 0), 'VIII');
        t.equal(romanize(9, 0), 'IX');
        t.equal(romanize(10, 0), '');
        t.end();
    });

    t.test('returns correct result for tens place', t => {

        t.equal(romanize(3, 1), 'XXX');
        t.equal(romanize(4, 1), 'XL');
        t.equal(romanize(5, 1), 'L');
        t.equal(romanize(8, 1), 'LXXX');
        t.equal(romanize(9, 1), 'XC');
        t.end();
    });

    t.test('returns correct result for hundreds place', t => {

        t.equal(romanize(3, 2), 'CCC');
        t.equal(romanize(4, 2), 'CD');
        t.equal(romanize(5, 2), 'D');
        t.equal(romanize(8, 2), 'DCCC');
        t.equal(romanize(9, 2), 'CM');
        t.end();
    });

    t.test('returns correct result for thousands place', t => {

        t.equal(romanize(3, 3), 'MMM');
        t.end();
    });

    t.test('throws for any number beyond thousands place', t => {

        t.throws(() => romanize(1, 4));
        t.end();
    });
});

test('toRoman', t => {

    t.test('throws on invalid values', t => {

        t.throws(() => toRoman(0));
        t.throws(() => toRoman(12.12));
        t.end();
    });

    t.test('correctly converts to roman numerals', t => {

        t.equal(toRoman(2017), 'MMXVII');
        t.equal(toRoman(1997), 'MCMXCVII');
        t.end();
    });
});
