import { files } from '../../index';

const jpgFile = {
  lastModified: 1467475547340,
  name: 'photo.jpg',
  size: 1000,
  type: 'image/jpeg',
};

const txtFile = {
  lastModified: 1467475547340,
  name: 'readme.txt',
  size: 10,
  type: 'text/plain',
};

const unknownFile = {
  name: 'readme.txt',
};

describe('files', () => {
  test('invalid input', () => {
    let validator = files();
    expect(validator.validate('file')).toBe(files.Options.msg.invalidInputType);
  });

  test('valid default', () => {
    let validator = files();
    expect(validator.validate([jpgFile])).toBe(true);
  });

  test('invalid default', () => {
    let validator = files();
    expect(validator.validate([])).toBe('Select at least 1 file');
  });

  test('valid min', () => {
    let validator = files({ min: 1 });
    expect(validator.validate([jpgFile])).toBe(true);
  });

  test('invalid min', () => {
    let validator = files({ min: 2 });
    expect(validator.validate([jpgFile])).toBe('Select at least 2 files');
  });

  test('valid max', () => {
    let validator = files({ max: 1 });
    expect(validator.validate([jpgFile])).toBe(true);
  });

  test('invalid max', () => {
    let validator = files({ max: 1 });
    expect(validator.validate([jpgFile, unknownFile])).toBe('Select a maximum of 1 file');
  });

  test('invalid max 2', () => {
    let validator = files({ max: 2 });
    expect(validator.validate([jpgFile, txtFile, unknownFile])).toBe('Select a maximum of 2 files');
  });

  test('valid min size', () => {
    let validator = files({ minSize: 1000 });
    expect(validator.validate([jpgFile])).toBe(true);
  });

  test('invalid min size', () => {
    let validator = files({ minSize: 1001 });
    expect(validator.validate([jpgFile])).toBe(files.Options.msg.fileToSmall);
  });

  test('valid max size', () => {
    let validator = files({ maxSize: 1000 });
    expect(validator.validate([jpgFile])).toBe(true);
  });

  test('invalid max size', () => {
    let validator = files({ maxSize: 999 });
    expect(validator.validate([jpgFile])).toBe(files.Options.msg.fileToLarge);
  });

  test('valid type', () => {
    let validator = files({ type: 'image/jpeg' });
    expect(validator.validate([jpgFile])).toBe(true);
  });

  test('valid type pattern', () => {
    let validator = files({ type: 'text/plain|image/*' });
    expect(validator.validate([jpgFile])).toBe(true);
  });

  test('invalid type', () => {
    let validator = files({ type: 'text/plain' });
    expect(validator.validate([jpgFile])).toBe(files.Options.msg.invalidFileType);
  });

  test('invalid type pattern', () => {
    let validator = files({ type: 'audio/*' });
    expect(validator.validate([jpgFile, txtFile])).toBe(files.Options.msg.invalidFileType);
  });

  test('invalid unknown type', () => {
    let validator = files({ type: 'text/plain' });
    expect(validator.validate([unknownFile])).toBe(files.Options.msg.invalidFileType);
  });
});
