import { createReadStream } from 'fs';

export class Chain {
    from: string;
    to: string;

    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
    }

    next() { }
}
