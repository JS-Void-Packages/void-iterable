import { AbstractIterator } from "./iterator/iterators.js";
export declare class BaseSet<T> extends AbstractIterator<T> {
    /**
     * Create a new Immutable list from values
     * @param values
     * @returns
     */
    static of<T>(...values: T[]): ImmutableSet<T>;
    constructor(values?: Iterable<T>);
    add(value: T): void;
    remove(index: number): void;
    /**
     * call the predicate for each elements in the set
     * @param predicate
     */
    forEach(predicate: (element: T, index: number, set: BaseSet<T>) => void): void;
    /**
     * filter elements in the set if they match the predicate
     * @param predicate
     * @override
     * @returns
     */
    filter(predicate: (element: T, index: number) => boolean): BaseSet<T>;
    map<B>(predicate: (element: T, index: number) => B): BaseSet<B>;
    removeIf(predicate: (element: T, index: number) => boolean): BaseSet<T>;
    /**
     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
     * (If fromIndex and toIndex are equal, the returned list is empty.)
     * @param fromIndex
     * @param toIndex
     * @returns
     */
    subSet(fromIndex: number, toIndex: number): BaseSet<T>;
}
export declare class ImmutableSet<T> extends BaseSet<T> {
    constructor(values: Iterable<T>);
    add(value: T): void;
    remove(index: number): void;
    forEach(predicate: (element: T, index: number, set: ImmutableSet<T>) => void): void;
    /**
     * filter elements in the set if they match the predicate
     * return a new Immutable set.
     * @param predicate
     * @override
     * @returns
     */
    filter(predicate: (element: T, index: number) => boolean): ImmutableSet<T>;
    map<B>(predicate: (element: T, index: number) => B): ImmutableSet<B>;
    removeIf(predicate: (element: T, index: number) => boolean): ImmutableSet<T>;
    isImmutable(): boolean;
}
