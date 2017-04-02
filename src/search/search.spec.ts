import test = require('tape');

import { binarySearch } from './search';

test('binary chop', t => {

    t.equal(binarySearch(1, []), -1);
    t.equal(binarySearch(1, [1]), 0);
    t.equal(binarySearch(2, [1]), -1);

    t.equal(binarySearch(2, [1, 2, 3, 4]), 1);
    t.equal(binarySearch(1, [1, 2, 3, 4]), 0);
    t.equal(binarySearch(3, [1, 2, 3, 4]), 2);
    t.equal(binarySearch(4, [1, 2, 3, 4]), 3);

    t.equal(binarySearch(7, [1, 3, 5, 7, 9, 13, 15, 19, 21]), 3);
    t.equal(binarySearch(21, [1, 3, 5, 7, 9, 13, 15, 19, 21]), 8);

    t.end();
});
