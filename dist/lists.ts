import { AbstractIterator, IndexOutOfBoundError } from "./index.js";

export class List<T> extends AbstractIterator<T> {
    
    /**
     * Create a new Immutable list from an Iterable
     * @param values 
     * @returns 
     */
    public static of<T>(values: Iterable<T>): ImmutableList<T> {
        return new ImmutableList(values);
    }

    constructor(values?: Iterable<T>) {
        super();

        if(typeof values !== 'undefined') {
            for(let value of values) {
                this.values.push(value);
            }
        }
    }

    public add(value: T): void {
        if(this.isImmutable()) {
            throw new RangeError('cannot add values to an immutable list!')
        }
        this.values.push(value);
    }

    public remove(index: number): void {
        if(this.isImmutable()) {
            throw new RangeError('cannot remove values from an immutable list!')
        }
        this.values.splice(index, 1);
    }

    /**
     * call the predicate for each elements in the list
     * @param predicate 
     */
    forEach(predicate: (element:T, index:number, list:List<T>) => void) {
        for (let i = 0; i < this.values.length; i++) {
            predicate(this.values[i], i, this);
        }
    }

    /**
     * filter elements in the list if they match the predicate
     * @param predicate
     * @override
     * @returns 
     */
    filter(predicate: (element:T, index:number) => boolean): List<T> {
        let list = new List<T>();
        for (let i = 0; i < this.values.length; i++) {
            let check = predicate(this.values[i], i);
            if (check) {
                list.add(this.values[i]);
            }
        }
        return list;
    }

    public map<B>(predicate: (element: T, index: number) => B): List<B> {
        let list = new List<B>();
        for (let i = 0; i < this.values.length; i++) {
            list.add(predicate(this.values[i], i));
        }
        return list;
    }

    /**
     * Remove any values that match the predicate
     * @returns the removed values
     */
    public removeIf(predicate: (element: T, index: number) => boolean): List<T> {
        let list = new List<T>();
        for (let i = 0; i < this.values.length; i++) {
            let value = this.values[i];
            if(predicate(value, i)) {
                list.add(value);
            };
        }
        return list;
    }

    /**
     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive. 
     * (If fromIndex and toIndex are equal, the returned list is empty.)
     * @param fromIndex 
     * @param toIndex 
     * @returns 
     */
    public subList(fromIndex: number, toIndex: number): List<T> {
        let list = new List<T>();

        // return an empty list
        if(fromIndex == toIndex) {
            return list;
        }
        else if(fromIndex > toIndex) {
            throw new IndexOutOfBoundError('fromIndex must be smaller than toIndex');
        }

        for(let i = 0; i < this.values.length; i++) {
            if(i>=fromIndex && i < toIndex) {
                list.add(this.values[i]);
            }
        }

        return list;
    }
}

export class ImmutableList<T> extends List<T> {

    constructor(values: Iterable<T>) {
        super(values);
    }

    forEach(predicate: (element: T, index: number, list: ImmutableList<T>) => void): void {
        for (let i = 0; i < this.values.length; i++) {
            predicate(this.values[i], i, this);
        }
    }

    /**
     * filter elements in the list if they match the predicate
     * return a new Immutable list.
     * @param predicate 
     * @override
     * @returns 
     */
    filter(predicate: (element: T, index: number) => boolean): ImmutableList<T> {
        let list = new List<T>();
        for (let i = 0; i < this.values.length; i++) {
            let check = predicate(this.values[i], i);
            if (check) {
                list.add(this.values[i]);
            }
        }
        return new ImmutableList(list);
    }

    public map<B>(predicate: (element: T, index: number) => B): ImmutableList<B> {
        let list = new List<B>();
        for (let i = 0; i < this.values.length; i++) {
            list.add(predicate(this.values[i], i));
        }
        return new ImmutableList(list);
    }

    public removeIf(predicate: (element: T, index: number) => boolean): ImmutableList<T> {
        let list = new List<T>();
        for (let i = 0; i < this.values.length; i++) {
            let value = this.values[i];
            if(predicate(value, i)) {
                list.add(value);
            };
        }
        return ImmutableList.of(list);
    }

    public isImmutable(): boolean {
        return true;
    }
}