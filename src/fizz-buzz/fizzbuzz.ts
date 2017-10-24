export function numbers(from: number, to: number) {
    if (from > to) {
        throw new Error('Invalid arguments');
    }

    const num = [];

    for (let i = from; i <= to; i++) {
        num.push(i);
    }

    return num;
}

export function isDivisible(divisor: number) {
    return function (dividend: number) {
        return dividend % divisor === 0;
    };
}

export function fizzer(num: number) {
    if (isDivisible(3)(num)) {
        return 'fizz';
    }

    return num;
}

export function buzzer(num: number) {
    if (isDivisible(5)(num)) {
        return 'buzz';
    }

    return num;
}

export function fizzbuzzer(num: number) {
    if (isDivisible(3)(num) && isDivisible(5)(num)) {
        return 'fizzbuzz';
    }

    return num;
}

export function luckifier(num: number) {
    if (!!~String(num).indexOf('3')) {
        return 'lucky';
    }

    return num;
}

function mapper(series: (number | string)[], fn: (num: number) => number | string) {
    return series.map(fn);
}

function reducer(series: (number | string)[], ...fns: ((num: number) => number | string)[]) {
    return fns.reduce(mapper, series);
}

export function fizzbuzz(series: number[]) {
    return reducer(series, fizzbuzzer, fizzer, buzzer);
}

export function luckify(series: number[]) {
    return reducer(series, luckifier, fizzbuzzer, fizzer, buzzer);
}

export function luckifyWithStats(series: number[]) {
    const luckified = luckify(series);
    return luckified.concat(statify(luckified)).join(' ');
}

function statify(series: (number | string)[]) {
    const tokens = tokenise(series);
    return `fizz: ${tokens.fizz} buzz: ${tokens.buzz} fizzbuzz: ${tokens.fizzbuzz} lucky: ${tokens.lucky} integer: ${tokens.integer}`;
}

interface Token {
    fizz: number;
    buzz: number;
    fizzbuzz: number;
    lucky: number;
    integer: number;
}

function tokenise(series: (number | string)[]) {
    return series.reduce((acc: Token, item: keyof Token | number) => {
        if (typeof item === 'string') {
            if (acc[item]) {
                acc[item]++;
            } else {
                acc[item] = 1;
            }
        } else {
            if (acc.integer) {
                acc.integer++;
            } else {
                acc.integer = 1;
            }
        }
        return acc;
    }, {} as Token);
}
