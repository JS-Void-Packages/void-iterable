export class BaseIterableIterator<T> implements IterableIterator<T> {
    private values: T[];
    private n = 0;
    
    constructor(values: T[]) {
        this.values = values;
    }
    
    [Symbol.iterator](): IterableIterator<T> {
        return this;
    }
    
    next(...[value]: [] | [any]): IteratorResult<T, any> {
        let vals = this.values;
        if(this.n < vals.length) {
            return { value: vals[this.n++], done: false };
        } 
        else {
            this.n = 0;
            return { value:undefined, done: true };
        }
    }
    
}

export abstract class AbstractIterator<T> implements Iterable<T> {
    protected values: T[] = [];

    /**
     * Add an element to the set
     * @param value 
     */
    public abstract add(value: T): void;

    /**
     * Remove an element from the iterable
     * @param index 
     */
    public abstract remove(index: number): void;

    /**
     * Returns true if this iterator contains the specified element.
     * @param value 
     * @returns 
     */
    public contains(value: T): boolean {
        let r = false;
        for(let v of this.values) {
            if(v === value || v == value) {
                r = true;
                break;
            }
        }
        return r;
    }

    /**
     * Returns true if this iterator contains all of the values in the specified iterable.
     * @param iterable 
     * @returns 
     */
    public containsAll(iterable: Iterable<T>): boolean {
        let r = true;
        for(let v of iterable) {
            if(!this.contains(v)) {
                r = false;
                break;
            }
        }
        return r;
    }

    /**
     * Remove all the elements in this iterable
     */
    public clear(): void {
        this.values = [];
    }

    /**
     * Return the first element that match the index.
     * @param index positive number
     * @returns 
     */
    public get(index: number): T | undefined {

        if(index>this.values.length) {
            throw new IndexOutOfBoundError('Index provided is supperior than the length of this iterator');
        }

        let returnedValue = undefined;
        for(let i = 0; i<this.values.length; i++) {
            let value = this.values[i];
            if(index == i) {
                return value;
            }
        }

        return returnedValue;
    }

    /**
     * Replaces the element at the specified position in this iterable with the specified element
     * @param index positive number
     * @param value value
     * @returns 
     */
    public set(index: number, value: T): void {
        if(index>this.values.length) {
            throw new IndexOutOfBoundError('Index provided is supperior than the length of this iterator');
        }
        this.values[index] = value;
    }

    /**
     * Returns the index of the first occurrence of the specified element in this iterable, or -1 if this iterable does not contain the element.
     * @param value 
     */
    public indexOf(value: T): number {
        let index = -1;
        for(let i = 0; i<this.values.length; i++) {
            let v = this.values[i];
            if(v === value || v == value) {
                index = i;
                break;
            }
        }
        return index;
    }

    /**
     * Returns the index of the last occurrence of the specified element in this iterable, or -1 if this iterable does not contain the element.
     * @param value 
     */
    public lastIndexOf(value: T): number {
        let index = -1;
        for(let i = 0; i<this.values.length; i++) {
            let v = this.values[i];
            if(v === value || v == value) {
                index = i;
            }
        }
        return index;
    }

    /**
     * Add all values to the iterable
     * @param v 
     */
    public addAll(v: Iterable<T>) {
        for(let value of v) {
            this.add(value);
        }
    }

    /**
     * Returns all the values in this iterable as array
     * @returns 
     */
    public toArray() : T[] {
        return this.values;
    }

    [Symbol.iterator](): IterableIterator<T> {
        return new BaseIterableIterator(this.values);
    }

    /**
     * call the predicate for each elements in the iterator
     * @param predicate 
     */
    public abstract forEach(predicate: (element:T, index:number, iterator:AbstractIterator<T>) => void): void;

    /**
     * filter elements in the iterator if they match the predicate
     * @param predicate 
     * @returns 
     */
    public abstract filter(predicate: (element:T, index:number) => boolean): AbstractIterator<T>;

    public abstract map<B>(predicate: (element:T, index:number) => B): AbstractIterator<B>;

    /**
     * Remove any values that match the predicate
     * @returns the removed values
     */
    public abstract removeIf(predicate: (element:T, index:number) => boolean): AbstractIterator<T>;

    /**
     * @returns the number of values in the iterator
     */
    public size(): number {
        return this.values.length;
    }
    
    public isImmutable(): boolean {
        return false;
    }

    public toJson(): object {
        return this.values;
    }
}

export class IndexOutOfBoundError extends Error {
    constructor(message?: string) {
        super(message, {
            cause: 'IndexOutOfBound'
        });
    }
}