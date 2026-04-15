import { BaseMapIterator } from "./iterator/iterators.js";
import { List } from "./lists.js";
import { BaseSet } from "./sets.js";

export abstract class AbstractMap<A, B> implements Iterable<Entry<A, B>> {
    
    protected data: Entry<A, B>[] = [];

    constructor(values: Iterable<Entry<A, B>> = []) {
        for(let value of values) {
            this.put(value.getKey(), value.getValue())
        }
    }
    
    [Symbol.iterator](): MapIterator<Entry<A, B>> {
        return new BaseMapIterator(this.data);
    }

    public put(key: A, value: B): void {
        if(!this.containKey(key)) {
            this.data.push(new Entry(key, value));
        }
    }

    public get(key: A): B {
        for(let entry of this.data) {
            if(entry.getKey() == key) {
                return entry.getValue();
            }
        }
        throw new RangeError('The key does not exists in the map');
    }

    public containKey(key: A): boolean {
        let bool = false;
        for(let entry of this.data) {
            if(entry.getKey() == key) {
                bool = true;
                break;
            }
        }
        return bool;
    }

    public abstract isImmutable(): boolean;

    public forEach(predicate: (key: A, value: B, index: number) => void) {
        for(let i = 0; i<this.data.length; i++) {
            let entry = this.data[i];
            let key = entry.getKey();
            let value = entry.getValue();
            predicate(key, value, i);
        }
    }

    public abstract map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): AbstractMap<C, D>;

    public abstract map2List<C>(predicate: (key: A, value: B, index: number) => C): List<C>;

    public abstract map2Set<C>(predicate: (key: A, value: B, index: number) => C): BaseSet<C>;
}

export class BaseMap<A, B> extends AbstractMap<A, B> {

    map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): BaseMap<C, D> {
        let map = new BaseMap<C, D>();        

        for(let i = 0; i<this.data.length; i++) {
            let entry = this.data[i];
            let key = entry.getKey();
            let value = entry.getValue();
            let predi = predicate(key, value, i);
            map.put(predi.getKey(), predi.getValue());
        }

        return map;
    }

    map2List<C>(predicate: (key: A, value: B, index: number) => C): List<C> {
        let list = new List<C>();
        for(let i = 0; i<this.data.length; i++) {
            let entry = this.data[i];
            let key = entry.getKey();
            let value = entry.getValue();
            list.add(predicate(key, value, i));
        }
        return list;
    }

    map2Set<C>(predicate: (key: A, value: B, index: number) => C): BaseSet<C> {
        let set = new BaseSet<C>();
        for(let i = 0; i<this.data.length; i++) {
            let entry = this.data[i];
            let key = entry.getKey();
            let value = entry.getValue();
            set.add(predicate(key, value, i));
        }
        return set;
    }
    
    public isImmutable(): boolean {
        return false;
    }
}

export class ImmutableMap<A, B> extends BaseMap<A, B> {

    constructor(map: Iterable<Entry<A, B>>) {
        super(map);
    }

    public put(key: A, value: B): void {
        throw new RangeError('Cannot add data to an immutable object!');
    }
    
    public isImmutable(): boolean {
        return true;
    }
}

export class Entry<A, B> {
    private key: A;
    private value: B;

    constructor(key: A, value: B) {
        this.key = key;
        this.value = value;
    }

    public getKey(): A {
        return this.key;
    }

    public getValue(): B {
        return this.value;
    }
}