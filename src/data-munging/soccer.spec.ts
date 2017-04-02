import test = require('tape');

import { SoccerLeague } from './soccer';

test('SoccerLeague', t => {

    const filename = 'src/data-munging/football.dat';

    t.test('instantiates correctly', t => {

        const soccer = new SoccerLeague();
        t.assert(soccer);
        t.end();
    });

    t.test('throws when accessing file data without reading the file', t => {
        const soccer = new SoccerLeague();
        t.throws(() => soccer.data);
        t.end();
    });

    t.test('reads the data file correctly', t => {
        const soccer = new SoccerLeague();
        soccer.readFile(filename);
        t.assert(soccer.data);
        t.equal(soccer.data.length, 20);
        t.end();
    });

    t.test('parses the data correctly', t => {
        const soccer = new SoccerLeague();
        soccer.readFile(filename);
        const data = soccer.parseData();
        t.equal(data.length, 20);
        t.deepEqual(data[0], {
            team: 'Arsenal',
            f: 79,
            a: 36
        });
        t.end();
    });

    t.test('gets the closestTeam', t => {
        const soccer = new SoccerLeague();
        soccer.readFile(filename);
        const closest = soccer.closestTeam();
        t.equal(closest.team, 'Aston_Villa');
        t.end();
    });
});
