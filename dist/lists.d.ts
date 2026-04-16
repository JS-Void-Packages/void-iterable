import { AbstractIterator } from "./iterator/iterators.js";
export declare class List<T> extends AbstractIterator<T> {
    /**
     * Create a new Immutable list from values
     * @param values
     * @returns
     */
    static of<T>(...values: T[]): ImmutableList<T>;
    constructor(values?: Iterable<T>);
    add(value: T): void;
    remove(index: number): void;
    /**
     * call the predicate for each elements in the list
     * @param predicate
     */
    forEach(predicate: (element: T, index: number, list: List<T>) => void): void;
    /**
     * filter elements in the list if they match the predicate
     * @param predicate
     * @override
     * @returns
     */
    filter(predicate: (element: T, index: number) => boolean): List<T>;
    map<B>(predicate: (element: T, index: number) => B): List<B>;
    /**
     * Remove any values that match the predicate
     * @returns any values removed by the predicate
     */
    removeIf(predicate: (element: T, index: number) => boolean): List<T>;
    /**
     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
     * (If fromIndex and toIndex are equal, the returned list is empty.)
     * @param fromIndex
     * @param toIndex
     * @returns
     */
    subList(fromIndex: number, toIndex: number): List<T>;
}
export declare class ImmutableList<T> extends List<T> {
    constructor(values: Iterable<T>);
    forEach(predicate: (element: T, index: number, list: ImmutableList<T>) => void): void;
    /**
     * filter elements in the list if they match the predicate
     * return a new Immutable list.
     * @param predicate
     * @override
     * @returns
     */
    filter(predicate: (element: T, index: number) => boolean): ImmutableList<T>;
    map<B>(predicate: (element: T, index: number) => B): ImmutableList<B>;
    removeIf(predicate: (element: T, index: number) => boolean): ImmutableList<T>;
    isImmutable(): boolean;
}
