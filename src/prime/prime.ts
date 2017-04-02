export function isPrime(n: number) {

    if (n === 1) {
        return false;
    }

    let factorFound = false;


    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % Number(i) === 0) {
            factorFound = true;
            break;
        }
    }

    return !factorFound;
}

export function primeFactorsRec(n: number) {

    const factors: number[] = [];

    for (let i = 2; i <= n; i++) {
        if (n % i === 0) {
            factors.push(i);
            factors.push(...primeFactorsRec(n / i));
            break;
        }
    }

    return factors;
}

export function primeFactors(n: number) {

    const factors: number[] = [];
    if (n > 1) {
        let candidate = 2;
        while (n > 1) {
            while (n % candidate === 0) {
                factors.push(candidate);
                n = n / candidate;
            }
            candidate++;
        }
    }

    return factors;
}
