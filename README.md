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

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


