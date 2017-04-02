import test = require('tape');
import { readFile } from 'fs';

import { bubbleSort, insertionSort, selectionSort, shellSort, skip, swap, swapMutable } from './sort';

const input = [4, 5, 6, 2, 1, 7, 10, 3, 8, 9];
const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

test('swap', (t) => {

    t.deepEqual(swap([1, 2, 3], 0, 1), [2, 1, 3]);
    t.end();
});

test('swapMutably', (t) => {

    const list = [1, 2, 3];
    swapMutable(list, 0, 1);

    t.deepEqual(list, [2, 1, 3]);
    t.end();
});

test('selectionSort', (t) => {

    t.deepEqual(selectionSort(input), expected);
    t.end();
});

test('bubbleSort', (t) => {

    t.deepEqual(bubbleSort(input), expected);
    t.end();
});

test('insertionSort', (t) => {

    t.deepEqual(insertionSort(input), expected);
    t.end();
});

test('shellSort', (t) => {

    t.deepEqual(shellSort(input), expected);
    t.end();
});

test('skip', (t) => {

    const split = [[4, 2, 10, 9], [5, 1, 3], [6, 7, 8]];
    t.deepEqual(skip(input, 3), split);
    t.end();
});

// test('', t => {

//     function sleep(duration: number) {
//         return new Promise(resolve => setTimeout(resolve, duration));
//     }

//     function loop(input: number[]) {
//         for (let i = 0; i < input.length; i++) {
//             setTimeout(() => console.log(i), 3000);
//         }
//     }

//     loop([1, 2, 3]);

//     t.end();
// });
