import { BaseIterableIterator } from "./iterator/iterators.js";
import { ImmutableList, List } from "./lists.js";
import { BaseSet } from "./sets.js";

export abstract class AbstractMap<A, B> implements Iterable<Entry<A, B>> {
    
    protected data: List<Entry<A, B>> = new List();

    constructor(values: Iterable<Entry<A, B>> = []) {
        for(let value of values) {
            this.put(value.getKey(), value.getValue())
        }
    }
    
    [Symbol.iterator](): IterableIterator<Entry<A, B>> {
        return new BaseIterableIterator(this.data.toArray());
    }

    /**
     * add an entry to the map
     * @param key 
     * @param value 
     */
    public put(key: A, value: B): void {
        if(!this.containsKey(key)) {
            this.data.add(new Entry(key, value));
        }
    }

    /**
     * add a key value combo to the map if the key doesn't have a value associated
     * @param key 
     * @param value 
     */
    public putIfAbsent(key: A, value: B): void {
        let entry = this.getOrNull(key);
        if(entry == null) {
            this.put(key, value);
        }
    }

    /**
     *  Returns the value matching the key or a default value if the key doesn't exist.
     * @param key 
     * @param defaultValue 
     * @returns 
     */
    public getOrDefault(key: A, defaultValue: B): B {
        for(let entry of this.data) {
            if(entry.getKey() == key) {
                return entry.getValue();
            }
        }
        return defaultValue;
    }
    
    /**
     * Returns the value matching the key or null if the key doesn't exist.
     * @param key 
     * @returns 
     */
    public getOrNull(key: A): B {
        for(let entry of this.data) {
            if(entry.getKey() == key) {
                return entry.getValue();
            }
        }
        return null;
    }

    /**
     * returns the entry for that key or null if it doesn't exist.
     * @param key 
     * @returns 
     */
    public getEntryOrNull(key: A): Entry<A, B> {
        for(let entry of this.data) {
            if(entry.getKey() == key) {
                return entry;
            }
        }
        return null;
    }

    /**
     * returns the entry for that key or a default entry if it doesn't exist.
     * @param key 
     * @returns 
     */
    public getEntryOrDefault(key: A, defaultEntry: Entry<A, B>): Entry<A, B> {
        for(let entry of this.data) {
            if(entry.getKey() == key) {
                return entry;
            }
        }
        return defaultEntry;
    }

    /**
     * Returns the index for that key in the map, returns -1 if not found
     * @param key 
     * @returns 
     */
    public indexOf(key: A): number {
        let rest = -1;
        for(let i = 0; i<this.size(); i++) {
            let entry = this.data.get(i);
            if(entry.getKey() == key) {
                rest = i;
                break;
            }
        }
        return rest;
    }

    /**
     * Remove a entry from the map
     * Returns true if it was removed.
     * @param key 
     * @returns 
     */
    public remove(key: A): boolean {
        let index = this.indexOf(key);

        let bool = false;
        // return true if index exists
        if(index !== -1) {
            this.data.remove(index);
            bool = true;
        }
        return bool;
    }

    /**
     * Returns true if this map contains a mapping for the specified key.
     * @param key 
     * @returns 
     */
    public containsKey(key: A): boolean {
        let bool = false;
        for(let entry of this.data) {
            if(entry.getKey() == key) {
                bool = true;
                break;
            }
        }
        return bool;
    }

    /**
     * Returns true if this map maps one or more keys to the specified value.
     * @param value 
     * @returns 
     */
    public containsValue(value: B): boolean {
        let bool = false;
        for(let entry of this.data) {
            // break at the first entry found
            if(entry.getValue() == value) {
                bool = true;
                break;
            }
        }
        return bool;
    }

    /**
     * Returns a sets of keys
     * @returns 
     */
    public getKeys(): BaseSet<A> {
        return new BaseSet(this.data.map(e => e.getKey()));
    }

    /**
     * Returns a list of values
     * @returns 
     */
    public getValues(): List<B> {
        return this.data.map(e => e.getValue());
    }

    /**
     * Returns a set of entries
     * @returns 
     */
    public entrySet(): BaseSet<Entry<A, B>> {
        return new BaseSet(this.data);
    }

    /**
     * Remove all elements in the map
     */
    public clear() {
        this.data.clear();
    }

    /**
     * returns the size of the map
     * @returns 
     */
    public size(): number {
        return this.data.size();
    }

    /**
     * Returns true if the map is immutable
     */
    public abstract isImmutable(): boolean;

    /**
     * Call the predicate on each entries in the map
     * @param predicate 
     */
    public forEach(predicate: (key: A, value: B, index: number) => void) {
        for(let i = 0; i<this.data.size(); i++) {
            let entry = this.data[i];
            let key = entry.getKey();
            let value = entry.getValue();
            predicate(key, value, i);
        }
    }

    /**
     * call the predicate on each entries in the map to returns a different map
     * @param predicate 
     */
    public abstract map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): AbstractMap<C, D>;

    /**
     * call the predicate on each entries in the map to returns a list
     * @param predicate 
     */
    public abstract map2List<C>(predicate: (key: A, value: B, index: number) => C): List<C>;

    public abstract map2Set<C>(predicate: (key: A, value: B, index: number) => C): BaseSet<C>;
}

export class BaseMap<A, B> extends AbstractMap<A, B> {

    map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): BaseMap<C, D> {
        let map = new BaseMap<C, D>();        

        for(let i = 0; i<this.size(); i++) {
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
        for(let i = 0; i<this.size(); i++) {
            let entry = this.data[i];
            let key = entry.getKey();
            let value = entry.getValue();
            list.add(predicate(key, value, i));
        }
        return list;
    }

    map2Set<C>(predicate: (key: A, value: B, index: number) => C): BaseSet<C> {
        let set = new BaseSet<C>();
        for(let i = 0; i<this.size(); i++) {
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
        super();

        // can't call super with the map parametter as put is used which this override
        for(let value of map) {
            this.data.add(value);
        }
    }

    public put(key: A, value: B): void {
        throw new RangeError('Cannot add data to an immutable object!');
    }
    
    public isImmutable(): boolean {
        return true;
    }

    map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): ImmutableMap<C, D> {
        let map = new BaseMap<C, D>();        

        for(let i = 0; i<this.size(); i++) {
            let entry = this.data[i];
            let key = entry.getKey();
            let value = entry.getValue();
            let predi = predicate(key, value, i);
            map.put(predi.getKey(), predi.getValue());
        }

        return new ImmutableMap(map);
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