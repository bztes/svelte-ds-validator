import * as fs from 'fs';
import * as IndexExports from './index';

describe('index.js', () => {
  test('rule exports complete', () => {
    const indexExports = Object.keys(IndexExports);

    const ruleDirs = fs.readdirSync('./src/rules', { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    expect(ruleDirs.every(r => indexExports.includes(r))).toBe(true);
  });
});
