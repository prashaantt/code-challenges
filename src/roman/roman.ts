export function romanize(num: number, pos: number) {

    switch (pos) {
        case 0: return getRoman(num, 'I', 'V', 'X');
        case 1: return getRoman(num, 'X', 'L', 'C');
        case 2: return getRoman(num, 'C', 'D', 'M');
        case 3: return 'M'.repeat(num);
        default: throw new Error('Invalid position');
    }
}

function getRoman(num: number, base: string, mid: string, next: string) {

    if (num < 1 || num > 9) {
        return '';
    }
    else if (num <= 3) {
        return base.repeat(num);
    }
    else if (num === 4) {
        return base + mid;
    }
    else if (num <= 8) {
        return mid + base.repeat(num - 5);
    }

    return base + next;
}

export function toRoman(num: number) {
    if (num < 1 || !!~String(num).indexOf('.')) {
        throw new Error('Invalid number');
    }

    return Array.from(String(num), Number).reverse()
        .map(romanize).reduce((a, b) => b + a);
}
