import test = require('tape');

import { palindrome } from './palindrome';

test('palindrome', t => {
    t.test('correctly makes an array from given string', t => {
        t.equal(palindrome('A.b Cd"e'), false);
        t.equal(palindrome('malayalam'), true);
        t.equal(palindrome('madam i\'m adam'), true);
        t.equal(palindrome('whatever'), false);
        t.equal(palindrome('abba'), true);
        t.end();
    });
});
