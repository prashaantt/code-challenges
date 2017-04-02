export function fib(n: number): number[] {
    if (n < 1) {
        throw new Error('Invalid input');
    }

    if (n === 1) {
        return [1];
    }

    if (n === 2) {
        return [1, 1];
    }

    const series = fib(n - 1);

    return series.concat(series[series.length - 1] + series[series.length - 2]);
}
