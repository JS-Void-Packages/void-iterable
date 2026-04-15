export declare class BaseIterableIterator<T> implements IterableIterator<T> {
    private values;
    private n;
    constructor(values: T[]);
    [Symbol.iterator](): IterableIterator<T>;
    next(...[value]: [] | [any]): IteratorResult<T, any>;
}
export declare abstract class AbstractIterator<T> implements Iterable<T> {
    protected values: T[];
    /**
     * Add an element to the set
     * @param value
     */
    abstract add(value: T): void;
    /**
     * Remove an element from the set
     * @param index
     */
    abstract remove(index: number): void;
    /**
     * Returns true if this iterator contains the specified element.
     * @param value
     * @returns
     */
    contains(value: T): boolean;
    /**
     * Returns true if this iterator contains all of the values in the specified iterable.
     * @param iterable
     * @returns
     */
    containsAll(iterable: Iterable<T>): boolean;
    /**
     * Remove all the elements in this iterable
     */
    clear(): void;
    /**
     * Return the first element that match the index.
     * @param index positive number
     * @returns
     */
    get(index: number): T | undefined;
    /**
     * Replaces the element at the specified position in this iterable with the specified element
     * @param index positive number
     * @param value value
     * @returns
     */
    set(index: number, value: T): void;
    /**
     * Returns the index of the first occurrence of the specified element in this iterable, or -1 if this iterable does not contain the element.
     * @param value
     */
    indexOf(value: T): number;
    /**
     * Returns the index of the last occurrence of the specified element in this iterable, or -1 if this iterable does not contain the element.
     * @param value
     */
    lastIndexOf(value: T): number;
    /**
     * Add all values to the iterable
     * @param v
     */
    addAll(v: Iterable<T>): void;
    /**
     * Returns all the values in this iterable as array
     * @returns
     */
    toArray(): T[];
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * call the predicate for each elements in the iterator
     * @param predicate
     */
    abstract forEach(predicate: (element: T, index: number, iterator: AbstractIterator<T>) => void): void;
    /**
     * filter elements in the iterator if they match the predicate
     * @param predicate
     * @returns
     */
    abstract filter(predicate: (element: T, index: number) => boolean): AbstractIterator<T>;
    abstract map<B>(predicate: (element: T, index: number) => B): AbstractIterator<B>;
    /**
     * Remove any values that match the predicate
     * @returns the removed values
     */
    abstract removeIf(predicate: (element: T, index: number) => boolean): AbstractIterator<T>;
    isImmutable(): boolean;
    toJson(): object;
}
export declare class BaseMapIterator<T> implements MapIterator<T> {
    private values;
    private n;
    constructor(values: T[]);
    [Symbol.iterator](): MapIterator<T>;
    next(...[value]: [] | [unknown]): IteratorResult<T, any>;
}
export declare class IndexOutOfBoundError extends Error {
    constructor(message?: string);
}
