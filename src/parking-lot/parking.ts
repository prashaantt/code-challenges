interface ParkingSlot {
    id: number;
    occupied: number;
}

export class ParkingLot {
    private layout: ParkingSlot[];

    constructor(layout: ParkingSlot[]) {
        this.layout = layout;
    }

    get state() {
        return this.layout;
    }

    park() {
        const emptySlot = this.layout.find(slot => slot.occupied === 0);

        if (!emptySlot) {
            throw new Error('Parking full!');
        }

        this.layout = this.layout.map(slot =>
            slot.id === emptySlot.id ? { ...slot, occupied: 1 } : slot);
    }

    drive(slotId: number) {
        const parkedSlot = this.layout.find(slot => slot.id === slotId);

        if (!parkedSlot) {
            throw new Error('Invalid slotId');
        }

        if (parkedSlot.occupied === 0) {
            throw new Error('Slot is empty');
        }

        this.layout = this.layout.map(slot =>
            slot.id === parkedSlot.id ? { ...slot, occupied: 0 } : slot);
    }
}
