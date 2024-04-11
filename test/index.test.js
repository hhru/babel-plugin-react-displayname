import path from 'path';
import fs from 'fs';
import { transformFileSync } from '@babel/core';

const plugin = path.join(__dirname, '../src/index.js');
const fixturesDir = path.join(__dirname, 'fixtures');

const trim = (str) => {
    return str.replace(/^\s+|\s+$/, '');
};

const transformFile = (filename) =>
    transformFileSync(filename, {
        babelrc: false,
        configFile: false,
        plugins: [[plugin]],
        presets: [['@babel/preset-react', { runtime: 'automatic' }]],
    }).code;

describe('Transform add displayName in react elements', function() {
    fs.readdirSync(fixturesDir).forEach((fixture) => {
        // if (!['exportCallExpression'].includes(fixture)) {
        //     return;
        // }
        it(fixture, () => {
            const actual = transformFile(path.join(fixturesDir, fixture, 'input.js'));
            const expected = fs.readFileSync(path.join(fixturesDir, fixture, 'expected.js'), 'utf8');
            //fs.writeFileSync(path.join(fixturesDir, fixture, 'expected.js'), actual);

            expect(trim(actual)).toEqual(trim(expected));
        });
    });
});
