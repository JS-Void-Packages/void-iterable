# void-iterable
Add Java Style Sets, Lists and Map to Javascript
## Instalation
`npm install void-iterable`
## Example
```js
import { BaseSet, BaseMap, List, Entry } from 'void-iterable';

let list = List.of(1, 4, 4, 7, 11, 15, 19, 22);

for(let element of list) {
    console.log(element);
}

// sets can't have duplicate so when we print, there will only be one 4 printed.
let baseSet = BaseSet.of(1, 4, 4, 7, 11, 15, 19, 22);

for(let element of baseSet) {
    console.log(element);
}

let map = new BaseMap();
map.put('A', 0);
map.put('B', 1);

for(let element of map) {
    console.log(`key: ${element.getKey()} value: ${element.getValue()}`);
}

let secondMap = map.map2map((key, value) => new Entry(key.toLowerCase(), value-1));
```