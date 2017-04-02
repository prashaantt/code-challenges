import test = require('tape');
const hash = require('object-hash');

import { readFile, mapWord, hashWord, groupWords, anagrams, areAnagrams } from './anagram';

test('Anagram', t => {

    // t.test('reads the file correctly', async t => {

    //     const filename = 'src/word-fun/wordlist.default.txt';
    //     const lines = await readFile(filename);
    //     t.equal(lines.length, 338882);
    //     t.end();
    // });

    t.test('reads the specified number of lines from file correctly', async t => {

        const filename = 'src/word-fun/wordlist.default.txt';
        const lines = await readFile(filename, 500);
        t.equal(lines.length, 500);
        t.end();
    });

    t.test('throws if incorrect file specified', async t => {

        const filename = 'src/word-fun/worldlist.default.txt';
        t.throws(() => readFile(filename));
        t.end();
    });

    t.test('maps a word correctly', t => {

        const word = 'zoantharian';

        t.deepEqual(mapWord(word), {
            word,
            map: {
                z: 1,
                o: 1,
                a: 3,
                n: 2,
                t: 1,
                h: 1,
                r: 1,
                i: 1
            }
        });

        t.end();
    });

    t.test('hashes a word map correctly', t => {

        const word = 'zoantharian';

        const wordMap = mapWord(word);

        const wordHash = hash(wordMap.map);

        t.deepEqual(hashWord(wordMap), {
            word,
            hash: wordHash
        });

        t.end();
    });

    t.test('groups hashed words correctly', t => {

        const words = ['ant', 'art', 'tan', 'tar', 'rat', 'car'];
        const grouped = groupWords(words.map(mapWord).map(hashWord));
        const antHash = hashWord(mapWord('ant'));
        const artHash = hashWord(mapWord('art'));
        const carHash = hashWord(mapWord('car'));
        t.deepEqual(grouped, {
            [antHash.hash]: ['ant', 'tan'],
            [artHash.hash]: ['art', 'tar', 'rat'],
            [carHash.hash]: ['car']
        });
        t.end();
    });

    t.test('correctly filters anagrams from word groups', t => {

        const words = ['ant', 'art', 'tan', 'tar', 'rat', 'car'];
        const grouped = groupWords(words.map(mapWord).map(hashWord));
        const ana = anagrams(grouped);
        t.deepEqual(ana, [
            ['ant', 'tan'],
            ['art', 'tar', 'rat']
        ]);
        t.end();
    });

    t.test('correctly computes that two words are anagrams', t => {

        const word1 = 'abaser';
        const word2 = 'abears';

        t.true(areAnagrams(word1, word2));
        t.end();
    });

    // t.test('correctly finds anagrams from dictionary', async t => {

    //     const filename = 'src/word-fun/wordlist.txt';
    //     const words = await readFile(filename, 500);
    //     const grouped = groupWords(words.map(mapWord).map(hashWord));
    //     const ana = anagrams(grouped);
    //     t.assert(ana);
    //     console.log(ana);
    //     t.end();
    // });
});
