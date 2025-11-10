import { expect, test, describe } from 'vitest';
import { makeQuery } from '../make-query';

describe('makeQuery', () => {
  test('주어진 파라미터로 쿼리스트링을 생성하고 & 로 연결한다', () => {
    const params = [
      { key: 'q', value: 'Harry Potter' },
      { key: 'category', value: 'Fantasy/Sci-Fi' },
      { key: 'empty', value: '' }, // falsy -> 제거
    ];
    const result = makeQuery(params);
    expect(result).toBe(`q=${encodeURIComponent('Harry Potter')}&category=${encodeURIComponent('Fantasy/Sci-Fi')}`);
  });

  test('값이 falsy(""), 제거되어 빈 문자열을 반환한다', () => {
    const params = [
      { key: 'a', value: '' },
      { key: 'b', value: '' },
    ];
    expect(makeQuery(params)).toBe('');
  });

  test('유니코드와 공백이 올바르게 인코딩된다', () => {
    const value = '홍 길동';
    const params = [{ key: 'name', value }];
    expect(makeQuery(params)).toBe(`name=${encodeURIComponent(value)}`);
  });

  test('키도 인코딩된다', () => {
    const params = [{ key: 'my key', value: 'value' }];
    expect(makeQuery(params)).toBe(`${encodeURIComponent('my key')}=${encodeURIComponent('value')}`);
  });

  test('빈 배열은 빈 문자열을 반환한다', () => {
    expect(makeQuery([])).toBe('');
  });
});
