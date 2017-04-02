export function binarySearch(n: number, list: number[]) {

    return chop(n, list, 0, list.length);
}

function chop(n: number, list: number[], start: number, end: number): number {
    const sublist = list.slice(start, end);

    if (sublist.length === 0) {
        return -1;
    }
    else if (sublist.length === 1) {
        if (n === sublist[0]) {
            return start;
        }

        return -1;
    }

    const mid = Math.floor((sublist.length - 1) / 2);

    if (n < sublist[mid]) {
        return chop(n, list, start, start + mid);
    }
    else if (n > sublist[mid]) {
        return chop(n, list, start + mid + 1, end);
    }

    return start + mid;
}
