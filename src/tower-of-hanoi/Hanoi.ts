export class Hanoi {
    source: number[] = [];
    target: number[] = [];
    aux: number[] = [];
    iterations = 0;

    constructor(stackSize: number) {
        for (let i = 0; i < stackSize; i++) {
            this.source.push(i + 1);
        }
    }

    solve() {
        this.move(this.source.length, this.source, this.target, this.aux);
    }

    private move(n: number, source: number[], target: number[], aux: number[]) {
        if (n > 0) {
            this.move(n - 1, source, aux, target);
            target.push(<number>source.pop());
            this.move(n - 1, aux, target, source);
            this.iterations++;
        }
    }
}
