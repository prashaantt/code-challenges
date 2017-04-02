export function palindrome(input: string) {
    return !Array.from(input.replace(/\W/g, '').toLowerCase())
        .some((char, index, array) => char !== array[array.length - index - 1]);
}
