export function swap(list: number[], pos1: number, pos2: number) {
    const clone = list.slice();
    clone[pos1] = clone[pos2];
    clone[pos2] = list[pos1];
    return clone;
}

export function swapMutable(list: number[], pos1: number, pos2: number) {
    const temp = list[pos1];
    list[pos1] = list[pos2];
    list[pos2] = temp;
}

export function selectionSort(input: number[]) {

    const list = input.slice();

    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] > list[j]) {
                swapMutable(list, i, j);
            }
        }
    }

    return list;
};

export function bubbleSort(input: number[]) {

    const list = input.slice();

    for (let i = 0; i < list.length; i++) {
        let swapped = false;

        for (let j = list.length - 1; j > i; j--) {
            if (list[j] < list[j - 1]) {
                swapMutable(list, j, j - 1);
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }

    return list;
};

export function insertionSort(input: number[]) {

    const list = input.slice();

    for (let i = 0; i < list.length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            if (list[j] < list[j - 1]) {
                swapMutable(list, j, j - 1);
            }
            else {
                break;
            }
        }
    }

    return list;
};

export function skip(input: number[], increment: number) {

    const subArrays: number[][] = [];

    input.forEach((item, index) => {
        const subArraysIndex = index % increment;
        if (!subArrays[subArraysIndex]) {
            subArrays[subArraysIndex] = [];
        }
        subArrays[subArraysIndex].push(item);
    });

    return subArrays;
}

export function shellSort(input: number[]) {

    const splitLists = skip(input, input.length / 2);
    console.log(splitLists);
    const partSorted = splitLists.map(list => insertionSort(list))
        .reduce((l1, l2) => l1.concat(l2));
    console.log(partSorted);
    const sorted = insertionSort(partSorted);
    console.log(sorted);
    return sorted;
};
