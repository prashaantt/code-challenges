export function sortLetters(input: string) {
    const o = hashString(input);
    return insertionSort(Object.keys(o)).map((k) => k.repeat(o[k])).join('');
}

export function hashString(input: string) {
    return Array.from(input.replace(/\W/g, '').toLowerCase()).reduce((hash: any, c: string) => {
        if (hash[c]) {
            hash[c]++;
        }
        else {
            hash[c] = 1;
        }
        return hash;
    }, {});
}

export function insertionSort(input: string[]) {
    if (input.length === 1) {
        return input;
    }

    for (let i = 1; i < input.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (input[j] < input[j - 1]) {
                const temp = input[j];
                input[j] = input[j - 1];
                input[j - 1] = temp;
            }
        }
    }

    return input;
}
