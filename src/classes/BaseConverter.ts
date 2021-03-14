interface IData {
    steps: Array<string>;
    result: string;
}

const hexadecimal: Record<number, string> = {
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
};

const hexadecimalInversion: Record<string, number> = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

export default class BaseConverter {
    private _number: string;

    private _currentBase: number;

    private _targetBase: number;

    constructor(number: string, currentBase: number, targetBase: number) {
      this._number = number;
      this._currentBase = currentBase;
      this._targetBase = targetBase;
    }

    get number(): string {
      return this._number;
    }

    get currentBase(): number {
      return this._currentBase;
    }

    get targetBase(): number {
      return this._targetBase;
    }

    // decimal for binary
    // decimal for octal
    // decimal for hexadecimal
    decimalTo(): IData {
      let dividend = Number(this.number);
      let quotient = 0;
      let rest = 0;
      let lsb = 0;

      const num:number[] = [];
      const dividends:number[] = [];
      const rests:number[] = [];
      const steps:string[] = [];

      while (dividend >= this.targetBase) {
        dividends.push(dividend);

        quotient = Math.trunc(dividend / this.targetBase);
        rest = Math.trunc(dividend % this.targetBase);
        dividend = quotient;

        num.push(rest);
        rests.push(rest);

        if (!(dividend >= this.targetBase)) {
          num.push(dividend);
          lsb = dividend;
        }
      }

      for (let i = 0; i < dividends.length; i += 1) {
        steps.push(`${dividends[i]} / ${this.targetBase} = ${(dividends[i] / this.targetBase).toFixed(2)} | rest = ${rests[i]}`);
      }
      steps.push(`lsb: ${lsb}`);

      let newNum = num.map((n) => String(n));

      if (this.targetBase === 16) {
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
    otherBaseToDecimal(): IData {
      let sum = 0;

      const steps: string[] = [];
      const stringNumberArr = this.number.split('').reverse();

      if (this.currentBase === 16) {
        for (let i = 0; i < stringNumberArr.length; i += 1) {
          const n = stringNumberArr[i];
          if (hexadecimalInversion[n]) {
            sum += Number(hexadecimalInversion[n]) * (this.currentBase ** i);
            steps.push(`${hexadecimalInversion[n]} * ${this.currentBase}^${i}`);
          } else {
            sum += Number(n) * (this.currentBase ** i);
            steps.push(`${n} * ${this.currentBase}^${i}`);
          }
        }
      } else {
        for (let i = 0; i < stringNumberArr.length; i += 1) {
          const n = Number(stringNumberArr[i]);
          sum += n * (this.currentBase ** i);
          steps.push(`${n} * ${this.currentBase}^${i}`);
        }
      }

      return {
        steps,
        result: String(sum),
      };
    }
}
