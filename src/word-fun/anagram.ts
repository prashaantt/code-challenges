import { createReadStream, existsSync } from 'fs';
import { createInterface } from 'readline';
const hash = require('object-hash');

export function readFile(filename: string, numLines?: number): Promise<string[]> {
    const lines: string[] = [];

    if (!existsSync(filename)) {
        throw new Error('File not found');
    }

    const readLine = createInterface({
        input: createReadStream(filename)
    });

    readLine.on('line', (line) => {
        if (!numLines || (numLines && lines.length < numLines)) {
            lines.push(line);
        }
        else {
            readLine.close();
        }
    });

    return new Promise(resolve => {
        readLine.on('close', () => resolve(lines));
    });
};

export function mapWord(word: string) {
    const map = word.split('').reduce((wordMap: any, letter: string) => {
        if (wordMap[letter]) {
            wordMap[letter]++;
        }
        else {
            wordMap[letter] = 1;
        }
        return wordMap;
    }, {});
    return {
        map,
        word
    };
}

interface WordMap {
    map: { [key: string]: number };
    word: string;
}

export function hashWord(wordMap: WordMap): WordHash {
    return {
        word: wordMap.word,
        hash: hash(wordMap.map)
    };
}

interface WordHash {
    word: string;
    hash: string;
}

interface WordGroups {
    [hash: string]: string[];
}

export function groupWords(wordHashes: WordHash[]) {
    return wordHashes.reduce((map: WordGroups, wordHash: WordHash) => {
        if (map[wordHash.hash]) {
            map[wordHash.hash].push(wordHash.word);
        }
        else {
            map[wordHash.hash] = [wordHash.word];
        }

        return map;
    }, {});
}

export function anagrams(wordGroups: WordGroups) {
    return Object.keys(wordGroups)
        .filter(hash => wordGroups[hash].length > 1)
        .map(hash => wordGroups[hash]);
}

export function areAnagrams(w1: string, w2: string) {
    const hash1 = hashWord(mapWord(w1));
    const hash2 = hashWord(mapWord(w2));

    return hash1.hash === hash2.hash;
}
