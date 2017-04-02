import { readFileSync } from 'fs';

export class Weather {
    private _data: string;

    readFile(filename: string) {
        this._data = readFileSync(filename, 'utf8').trim();
    }

    get data() {
        return this._data;
    }

    parseData() {
        if (!this._data) {
            throw new Error('Data not found');
        }

        return this._data.split('\n').slice(2).slice(0, -1)
            .map(line => line.trim().split(/\s+/))
            .map(line => {

                return {
                    day: Number(line[0]),
                    mxt: parseInt(line[1]),
                    mnt: parseInt(line[2])
                };
            });
    }

    desiredDay() {
        return this.parseData()
            .sort((d1, d2) => (d1.mxt - d1.mnt) - (d2.mxt - d2.mnt))[0];
    }
}
