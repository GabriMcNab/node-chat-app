const expect = require('expect');

const { isRealString } = require('./validation');

describe('IsRealString', () => {
  it('Should reject non-string values', () => {
    const str = 1234;
    const result = isRealString(str);
    expect(result).toBeFalsy();
  });

  it('Should reject string with only spaces', () => {
    const str = '     ';
    const result = isRealString(str);
    expect(result).toBeFalsy();
  });

  it('Should allow strings with non-space characters', () => {
    const str = '  Gabri  ';
    const result = isRealString(str);
    expect(result).toBeTruthy();
  });
});