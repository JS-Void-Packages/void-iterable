import { List } from "./lists.js";
import { BaseSet } from "./sets.js";
export declare abstract class AbstractMap<A, B> implements Iterable<Entry<A, B>> {
    protected data: List<Entry<A, B>>;
    constructor(values?: Iterable<Entry<A, B>>);
    [Symbol.iterator](): IterableIterator<Entry<A, B>>;
    /**
     * add an entry to the map
     * @param key
     * @param value
     */
    put(key: A, value: B): void;
    /**
     * add a key value combo to the map if the key doesn't have a value associated
     * @param key
     * @param value
     */
    putIfAbsent(key: A, value: B): void;
    /**
     *  Returns the value matching the key or a default value if the key doesn't exist.
     * @param key
     * @param defaultValue
     * @returns
     */
    getOrDefault(key: A, defaultValue: B): B;
    /**
     * Returns the value matching the key or null if the key doesn't exist.
     * @param key
     * @returns
     */
    getOrNull(key: A): B;
    /**
     * returns the entry for that key or null if it doesn't exist.
     * @param key
     * @returns
     */
    getEntryOrNull(key: A): Entry<A, B>;
    /**
     * returns the entry for that key or a default entry if it doesn't exist.
     * @param key
     * @returns
     */
    getEntryOrDefault(key: A, defaultEntry: Entry<A, B>): Entry<A, B>;
    /**
     * Shuffle the iterable values in place
     */
    shuffle(): this;
    /**
     * Returns the index for that key in the map, returns -1 if not found
     * @param key
     * @returns
     */
    indexOf(key: A): number;
    /**
     * Remove a entry from the map
     * Returns true if it was removed.
     * @param key
     * @returns
     */
    remove(key: A): boolean;
    /**
     * Returns true if this map contains a mapping for the specified key.
     * @param key
     * @returns
     */
    containsKey(key: A): boolean;
    /**
     * Returns true if this map maps one or more keys to the specified value.
     * @param value
     * @returns
     */
    containsValue(value: B): boolean;
    /**
     * Returns a sets of keys
     * @returns
     */
    getKeys(): BaseSet<A>;
    /**
     * Returns a list of values
     * @returns
     */
    getValues(): List<B>;
    /**
     * Returns a set of entries
     * @returns
     */
    entrySet(): BaseSet<Entry<A, B>>;
    /**
     * Remove all elements in the map
     */
    clear(): void;
    /**
     * returns the size of the map
     * @returns
     */
    size(): number;
    /**
     * Returns true if the map is immutable
     */
    abstract isImmutable(): boolean;
    /**
     * Call the predicate on each entries in the map
     * @param predicate
     */
    forEach(predicate: (key: A, value: B, index: number) => void): void;
    /**
     * call the predicate on each entries in the map to returns a different map
     * @param predicate
     */
    abstract map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): AbstractMap<C, D>;
    /**
     * call the predicate on each entries in the map to returns a list
     * @param predicate
     */
    abstract map2List<C>(predicate: (key: A, value: B, index: number) => C): List<C>;
    abstract map2Set<C>(predicate: (key: A, value: B, index: number) => C): BaseSet<C>;
}
export declare class BaseMap<A, B> extends AbstractMap<A, B> {
    map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): BaseMap<C, D>;
    map2List<C>(predicate: (key: A, value: B, index: number) => C): List<C>;
    map2Set<C>(predicate: (key: A, value: B, index: number) => C): BaseSet<C>;
    isImmutable(): boolean;
}
export declare class ImmutableMap<A, B> extends BaseMap<A, B> {
    constructor(map: Iterable<Entry<A, B>>);
    put(key: A, value: B): void;
    isImmutable(): boolean;
    map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): ImmutableMap<C, D>;
}
export declare class Entry<A, B> {
    private key;
    private value;
    constructor(key: A, value: B);
    getKey(): A;
    getValue(): B;
}
