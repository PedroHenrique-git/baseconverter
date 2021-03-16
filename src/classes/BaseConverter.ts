import {
  IData, hexadecimal, hexadecimalInversion, hexadecimalBinary,
} from '../database/data';

export default class BaseConverter {
  // decimal for binary
  // decimal for octal
  // decimal for hexadecimal
  static decimalTo(number: string, targetBase: number): IData {
    let dividend = Number(number);
    let quotient = 0;
    let rest = 0;
    let lsb = 0;

    const num:number[] = [];
    const dividends:number[] = [];
    const rests:number[] = [];
    const steps:string[] = [];

    while (dividend >= targetBase) {
      dividends.push(dividend);

      quotient = Math.trunc(dividend / targetBase);
      rest = Math.trunc(dividend % targetBase);
      dividend = quotient;

      num.push(rest);
      rests.push(rest);

      if (!(dividend >= targetBase)) {
        num.push(dividend);
        lsb = dividend;
      }
    }

    for (let i = 0; i < dividends.length; i += 1) {
      steps.push(`${dividends[i]} / ${targetBase} = ${(dividends[i] / targetBase).toFixed(2)} | rest = ${rests[i]}`);
    }
    steps.push(`lsb: ${lsb}`);

    let newNum = num.map((n) => String(n));

    if (targetBase === 16) {
      newNum = num.map((n) => {
        let n2 = String(n);
        if (hexadecimal[n]) {
          n2 = hexadecimal[n];
        }
        return String(n2);
      });
    }

    return {
      steps,
      result: newNum.reverse().join(''),
    };
  }

  // binary for decimal
  // octal for decimal
  // hexadecimal for decimal
  static otherBaseToDecimal(number: string, currentBase: number): IData {
    let sum = 0;

    const steps: string[] = [];
    const stringNumberArr = number.split('').reverse();

    if (currentBase === 16) {
      for (let i = 0; i < stringNumberArr.length; i += 1) {
        const n = stringNumberArr[i];
        if (hexadecimalInversion[n]) {
          sum += Number(hexadecimalInversion[n]) * (currentBase ** i);
          steps.push(`${hexadecimalInversion[n]} * ${currentBase}^${i}`);
        } else {
          sum += Number(n) * (currentBase ** i);
          steps.push(`${n} * ${currentBase}^${i}`);
        }
      }
    } else {
      for (let i = 0; i < stringNumberArr.length; i += 1) {
        const n = Number(stringNumberArr[i]);
        sum += n * (currentBase ** i);
        steps.push(`${n} * ${currentBase}^${i}`);
      }
    }

    return {
      steps,
      result: String(sum),
    };
  }

  static floatNumberToBinary(number: string): IData {
    const separatedNumber: string[] = number.split('.');
    const integerPart = BaseConverter.decimalTo(separatedNumber[0], 2).result;
    const floatPart = Number(`0.${separatedNumber[1]}`);
    const fractionalHouses: string[] = [];
    const steps: string[] = [];

    let multiplication = 0;
    let newFloat = floatPart;

    while (true) {
      multiplication = Number(`0.${String(newFloat).split('.')[1]}`) * 2;
      steps.push(`0.${String(newFloat).split('.')[1]} * 2 = ${multiplication}`);
      newFloat = multiplication;

      fractionalHouses.push(String(newFloat).split('.')[0]);

      if (Number.isInteger(multiplication) || fractionalHouses.length === 12) break;
    }

    return {
      steps,
      result: `${integerPart}.${fractionalHouses.join('')}`,
    };
  }

  static floatBinaryToDecimal(number: string): IData {
    const separatedNumber: string[] = number.split('.');
    const steps: string[] = [];
    const integerPart = BaseConverter.otherBaseToDecimal(separatedNumber[0], 2);
    const floatPart = separatedNumber[1];

    integerPart.steps.forEach((step) => steps.push(step));

    let sum = 0;

    for (let i = 0; i < floatPart.length; i += 1) {
      const result = Number(floatPart[i]) * (2 ** -(i + 1));
      steps.push(`${Number(floatPart[i])} * 2^${-(i + 1)} = ${result}`);
      sum += result;
    }

    return {
      steps,
      result: `${integerPart.result}.${String(sum).split('.')[1]}`,
    };
  }

  static hexadecimalToBinary(number: string): IData {
    const steps: string[] = [];
    const dividedNumber: string[] = number.split('');
    const result:string[] = [];

    dividedNumber.forEach((n) => {
      if (hexadecimalBinary[n]) {
        steps.push(`${n} = ${hexadecimalBinary[n]}`);
        result.push(hexadecimalBinary[n]);
      }
    });

    return {
      steps,
      result: result.join(''),
    };
  }
}
