import test = require('tape');

import { Weather } from './weather';

test('the weather parser', t => {

    const filename = 'src/data-munging/weather.dat';

    t.test('inits correctly', t => {

        const weather = new Weather();
        t.assert(weather);
        t.end();
    });

    t.test('throws if invalid file is supplied', t => {

        const filename = 'src/data-munging/weather.data';

        const weather = new Weather();
        t.throws(() => weather.readFile(filename));
        t.end();
    });

    t.test('reads the data file correctly', t => {

        const weather = new Weather();
        weather.readFile(filename);
        t.assert(weather.data);
        t.end();
    });

    t.test('throws if parse is called without data', t => {

        const weather = new Weather();
        t.throws(() => weather.parseData());
        t.end();
    });

    t.test('parses the data correctly', t => {

        const weather = new Weather();
        weather.readFile(filename);
        const parsedData = weather.parseData();
        t.equal(parsedData.length, 30);
        t.deepEqual(parsedData[0], {
            day: 1,
            mxt: 88,
            mnt: 59
        });
        t.end();
    });

    t.test('finds the day with minimum temp deviation', t => {

        const weather = new Weather();
        weather.readFile(filename);
        t.equal(weather.desiredDay().day, 14);
        t.end();
    });
});
