export interface IData {
    steps: Array<string>;
    result: string;
}

export const hexadecimal: Record<number, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};

export const hexadecimalInversion: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

export const hexadecimalBinary: Record<string, string> = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
};

export const octalBinary: Record<string, string> = {
  0: '000',
  1: '001',
  2: '010',
  3: '011',
  4: '100',
  5: '101',
  6: '110',
  7: '111',
};
