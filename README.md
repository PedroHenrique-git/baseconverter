## Base converter

A class for converting numbers between bases, step by step

## Getting Started

install dependencies: <b>npm install</b>

use the <b>code runner</b> extension to run the project
link: https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner

## Built With

* [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript

## Methods and how to use

<b>Call the class where you want to use</b>

```
    import BaseConverter from './classes/BaseConverter';
```

<b>Decimal to other bases</b>

pass the number that will be converted and the base(2,8,16) you want in the method

```
    BaseConverter.decimalTo('45', 2)
```
<b>return</b>

```
    {
        steps: [
            '45 / 2 = 22.50 | rest = 1',
            '22 / 2 = 11.00 | rest = 0',
            '11 / 2 = 5.50 | rest = 1',
            '5 / 2 = 2.50 | rest = 1',
            '2 / 2 = 1.00 | rest = 0',
            'lsb: 1'
        ],
        result: '101101'
    }
```

## Other bases (2,8,16) for decimal

<b>pass the number and the base of it in the method</b>

```
    BaseConverter.otherBaseToDecimal('111000', 2)
```

<b>return</b>

```
    {
        steps: [
            '0 * 2^0 = 0',
            '0 * 2^1 = 0',
            '0 * 2^2 = 0',
            '1 * 2^3 = 8',
            '1 * 2^4 = 16',
            '1 * 2^5 = 32'
        ],
        result: '56'
    }
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


