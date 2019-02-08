import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformFileSync } from 'babel-core';

const plugin = path.join(__dirname, '../src/index.js');
const fixturesDir = path.join(__dirname, 'fixtures');

const trim = (str) => {
    return str.replace(/^\s+|\s+$/, '');
};

const transformFile = (filename) =>
    transformFileSync(filename, {
        presets: ['react', 'stage-0'],
        babelrc: false,
        plugins: ['transform-class-properties', [plugin]],
    }).code;

describe('Transform add display name in react elements', function() {
    fs.readdirSync(fixturesDir).forEach(function(fixture) {
        const actual = transformFile(path.join(fixturesDir, fixture, 'input.js'));
        const expected = fs.readFileSync(path.join(fixturesDir, fixture, 'expected.js'), 'utf8');
        
        it(path.basename(fixture), function() {
            assert.equal(trim(actual), trim(expected));
        });
    });
});
