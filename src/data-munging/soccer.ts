import { readFileSync } from 'fs';

export class SoccerLeague {
    private _data: string;
    private filename: string;

    readFile(filename: string) {
        this.filename = filename;
        this._data = readFileSync(filename, 'utf8');
    }

    get data() {
        if (!this.filename) {
            throw new Error('Data file not specified');
        }

        let data = this._data.split('\n')
            .slice(1).slice(0, -1).filter(line => !line.startsWith('-'));
        return data.slice(0, 18).concat(data.slice(19));
    }

    parseData() {
        const data = this.data.map(line => line.replace('-', '').split(/\s+/));

        return data.map(d => {
            return {
                team: d[2],
                f: Number(d[7]),
                a: Number(d[8])
            };
        });
    }

    closestTeam() {
        const parsed = this.parseData();
        return parsed.sort((t1, t2) => Math.abs(t1.f - t1.a) - Math.abs(t2.f - t2.a))[0];
    }
}
