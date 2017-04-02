import test = require('tape');

import { Chain } from './chain';

test('word chain', t => {

    t.test('inits correctly', t => {

        const chain = new Chain('cat', 'dog');
        t.equal(chain.from, 'cat');
        t.equal(chain.to, 'dog');
        t.end();
    });

    // t.test('gets the correct next step', t => {

    //     const chain = new Chain('cat', 'dog');
    //     t.equal(chain.next(), 'cot');
    //     t.end();
    // });
});
