export default class BaseConverter {
    private _number: number;

    private _currentBase: number;

    private _targetBase: number;

    constructor(number: number, currentBase: number, targetBase: number) {
      this._number = number;
      this._currentBase = currentBase;
      this._targetBase = targetBase;
    }

    get number(): number {
      return this._number;
    }

    get currentBase(): number {
      return this._currentBase;
    }

    get targetBase(): number {
      return this._targetBase;
    }

    basicConversion(): string[][] {
      let dividend = this.number;
      let quotient = 0;
      let rest = 0;
      let lsb = 0;

      const num:number[] = [];
      const dividends:number[] = [];
      const rests:number[] = [];
      const steps:string[] = [];
      const result: string[][] = [];

      while (dividend >= this._targetBase) {
        dividends.push(dividend);

        quotient = Math.trunc(dividend / this._targetBase);
        rest = Math.trunc(dividend % this._targetBase);
        dividend = quotient;

        num.push(rest);
        rests.push(rest);

        if (!(dividend >= this._targetBase)) {
          num.push(dividend);
          lsb = dividend;
        }
      }

      for (let i = 0; i < dividends.length; i += 1) {
        steps.push(`${dividends[i]} / ${this._targetBase} = ${(dividends[i] / this._targetBase).toFixed(2)} | rest = ${rests[i]}`);
      }
      steps.push(`lsb: ${lsb}`);

      const newNum = num.map((n) => n.toString());

      result.push(steps);
      result.push(newNum.reverse());

      return result;
    }
}
