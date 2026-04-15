import { List } from "./lists.js";
import { BaseSet } from "./sets.js";
export declare abstract class AbstractMap<A, B> implements Iterable<Entry<A, B>> {
    protected data: Entry<A, B>[];
    constructor(values?: Iterable<Entry<A, B>>);
    [Symbol.iterator](): MapIterator<Entry<A, B>>;
    put(key: A, value: B): void;
    get(key: A): B;
    containKey(key: A): boolean;
    abstract isImmutable(): boolean;
    forEach(predicate: (key: A, value: B, index: number) => void): void;
    abstract map2map<C, D>(predicate: (key: A, value: B, index: number) => Entry<C, D>): AbstractMap<C, D>;
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
}
export declare class Entry<A, B> {
    private key;
    private value;
    constructor(key: A, value: B);
    getKey(): A;
    getValue(): B;
}
