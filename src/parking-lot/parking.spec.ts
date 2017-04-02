import test = require('tape');

import { ParkingLot } from './parking';

test('parking lot', t => {

    t.test('inits correctly', t => {
        const layout = [
            { id: 0, occupied: 0 },
            { id: 1, occupied: 0 },
            { id: 2, occupied: 0 },
            { id: 3, occupied: 0 }
        ];
        const parkingLot = new ParkingLot(layout);
        t.ok(parkingLot);
        t.deepEqual(parkingLot.state, layout);
        t.end();
    });

    t.test('throws if parking is already full when trying to park', t => {
        const layout = [
            { id: 0, occupied: 1 },
            { id: 1, occupied: 1 },
            { id: 2, occupied: 1 },
            { id: 3, occupied: 1 }
        ];
        const parkingLot = new ParkingLot(layout);
        t.throws(() => parkingLot.park());
        t.end();
    });

    t.test('successfully parks when parking is available', t => {
        const initialLayout = [
            { id: 0, occupied: 1 },
            { id: 1, occupied: 1 },
            { id: 2, occupied: 1 },
            { id: 3, occupied: 0 }
        ];

        const newLayout = [
            { id: 0, occupied: 1 },
            { id: 1, occupied: 1 },
            { id: 2, occupied: 1 },
            { id: 3, occupied: 1 }
        ];

        const parkingLot = new ParkingLot(initialLayout);
        t.doesNotThrow(() => parkingLot.park());
        t.deepEqual(parkingLot.state, newLayout);
        t.end();
    });

    t.test('throws if the slot doesn\'t exist', t => {
        const layout = [
            { id: 0, occupied: 1 },
            { id: 1, occupied: 1 },
            { id: 2, occupied: 1 },
            { id: 3, occupied: 0 }
        ];

        const parkingLot = new ParkingLot(layout);

        t.throws(() => parkingLot.drive(4));
        t.end();
    });

    t.test('throws if the slot is empty when trying to drive away', t => {
        const layout = [
            { id: 0, occupied: 1 },
            { id: 1, occupied: 1 },
            { id: 2, occupied: 1 },
            { id: 3, occupied: 0 }
        ];

        const parkingLot = new ParkingLot(layout);

        t.throws(() => parkingLot.drive(3));
        t.end();
    });

    t.test('correctly frees up parking slot when vehicle is driven away', t => {
        const initialLayout = [
            { id: 0, occupied: 1 },
            { id: 1, occupied: 1 },
            { id: 2, occupied: 1 },
            { id: 3, occupied: 0 }
        ];

        const newLayout = [
            { id: 0, occupied: 1 },
            { id: 1, occupied: 1 },
            { id: 2, occupied: 0 },
            { id: 3, occupied: 0 }
        ];

        const parkingLot = new ParkingLot(initialLayout);
        parkingLot.drive(2);
        t.deepEqual(parkingLot.state, newLayout);
        t.end();
    });
});
