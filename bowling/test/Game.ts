import { Game } from "../src/Game";
const Lab = require("lab");
const Code = require("code");

const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const beforeEach = lab.beforeEach;

let g: Game;

const rollMany = (n: number, pins: number) => {

    for (let i = 0; i < n; i++) {
        g.roll(pins);
    }
};

const rollSpare = () => {

    g.roll(5);
    g.roll(5);
};

const rollStrike = () => {

    g.roll(10);
};

beforeEach((done: any) => {

    g = new Game();
    return done();
});

describe("The bowling game", () => {

    it("scores an all-gutter game correctly", (done: any) => {

        rollMany(20, 0);
        expect(g.score()).to.equal(0);
        return done();
    });

    it("scores all 1s correctly", (done: any) => {

        rollMany(20, 1);
        expect(g.score()).to.equal(20);
        return done();
    });

    it("scores a spare correctly", (done: any) => {

        rollSpare();
        g.roll(3);
        rollMany(17, 0);
        expect(g.score()).to.equal(16);
        return done();
    });

    it("scores a strike correctly", (done: any) => {

        rollStrike();
        g.roll(3);
        g.roll(4);
        rollMany(17, 0);
        expect(g.score()).to.equal(24);
        return done();
    });

    it("scores a perfect game correctly", (done: any) => {

        rollMany(12, 10);
        expect(g.score()).to.equal(300);
        return done();
    });
});
