import test = require('tape');

import { sortLetters, hashString, insertionSort } from './sort';

test('groupAndSort', t => {

    t.test('converts all input to lower case and remove punctuations', t => {

        t.deepEqual(sortLetters('A.ABbcCd'), 'aabbccd');
        t.end();
    });

    t.test('sorts all letters in a given input', t => {

        t.equal(sortLetters(`When not studying nuclear physics, Bambi likes to play
    beach volleyball.`), 'aaaaabbbbcccdeeeeeghhhiiiiklllllllmnnnnooopprsssstttuuvwyyyy');
        t.end();
    });
});

test('groupString', t => {

    t.test('correctly returns a map of characters in a string', t => {

        t.deepEqual(hashString('When not studying'), {
            w: 1,
            h: 1,
            e: 1,
            n: 3,
            o: 1,
            t: 2,
            s: 1,
            u: 1,
            d: 1,
            y: 1,
            i: 1,
            g: 1
        });

        t.end();
    });
});

test('insertionSort', t => {

    t.test('correctly works on characteres', t => {

        t.deepEqual(insertionSort(['w', 'h', 'e', 'n']), ['e', 'h', 'n', 'w']);
        t.end();
    });
});
