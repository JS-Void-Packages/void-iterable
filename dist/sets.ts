import { AbstractIterator, IndexOutOfBoundError } from "./iterator/iterators.js";

export class BaseSet<T> extends AbstractIterator<T> {
    
    /**
     * Create a new Immutable list from values
     * @param values 
     * @returns 
     */
    public static of<T>(...values: T[]): ImmutableSet<T> {
        return new ImmutableSet(values);
    }

    constructor(values?: Iterable<T>) {
        super();

        if(typeof values !== 'undefined') {
            for(let value of values) {
                if(!this.contains(value)) {
                    this.values.push(value);
                }
            }
        }

    }

    public add(value: T): void {
        if(!this.values.includes(value)) {
            if(this.isImmutable()) {
                throw new RangeError('cannot add values to an immutable set!')
            }
            this.values.push(value);
        }
    }

    public remove(index: number): void {
        if(this.isImmutable()) {
                throw new RangeError('cannot remove values from an immutable set!')
        }
        this.values.splice(index, 1);
    }

    /**
     * call the predicate for each elements in the set
     * @param predicate 
     */
    forEach(predicate: (element:T, index:number, set:BaseSet<T>) => void) {
        for (let i = 0; i < this.values.length; i++) {
            predicate(this.values[i], i, this);
        }
    }

    /**
     * filter elements in the set if they match the predicate
     * @param predicate
     * @override
     * @returns 
     */
    filter(predicate: (element:T, index:number) => boolean): BaseSet<T> {
        let set = new BaseSet<T>();
        for (let i = 0; i < this.values.length; i++) {
            let check = predicate(this.values[i], i);
            if (check) {
                set.add(this.values[i]);
            }
        }
        return set;
    }

    public map<B>(predicate: (element: T, index: number) => B): BaseSet<B> {
        let set = new BaseSet<B>();
        for (let i = 0; i < this.values.length; i++) {
            set.add(predicate(this.values[i], i));
        }
        return set;
    }

    public removeIf(predicate: (element: T, index: number) => boolean): BaseSet<T> {
        let set = new BaseSet<T>();
        for (let i = 0; i < this.values.length; i++) {
            let value = this.values[i];
            if(predicate(value, i)) {
                this.remove(i);
                set.add(value);
            }
        }
        return set;
    }

    /**
     * Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive. 
     * (If fromIndex and toIndex are equal, the returned list is empty.)
     * @param fromIndex 
     * @param toIndex 
     * @returns 
     */
    public subSet(fromIndex: number, toIndex: number): BaseSet<T> {
        let set = new BaseSet<T>();

        // return an empty list
        if(fromIndex == toIndex) {
            return set;
        }
        else if(fromIndex > toIndex) {
            throw new IndexOutOfBoundError('fromIndex must be smaller than toIndex');
        }

        for(let i = 0; i < this.values.length; i++) {
            if(i>=fromIndex && i < toIndex) {
                set.add(this.values[i]);
            }
        }

        return set;
    }
}

export class ImmutableSet<T> extends BaseSet<T> {

    constructor(values: Iterable<T>) {
        super(values);
    }

    public add(value: T): void {}

    public remove(index: number): void {}

    forEach(predicate: (element: T, index: number, set: ImmutableSet<T>) => void): void {
        for (let i = 0; i < this.values.length; i++) {
            predicate(this.values[i], i, this);
        }
    }

    /**
     * filter elements in the set if they match the predicate
     * return a new Immutable set.
     * @param predicate 
     * @override
     * @returns 
     */
    filter(predicate: (element: T, index: number) => boolean): ImmutableSet<T> {
        let set = new BaseSet<T>();
        for (let i = 0; i < this.values.length; i++) {
            let check = predicate(this.values[i], i);
            if (check) {
                set.add(this.values[i]);
            }
        }
        return new ImmutableSet(set);
    }

    public map<B>(predicate: (element: T, index: number) => B): ImmutableSet<B> {
        let set = new BaseSet<B>();
        for (let i = 0; i < this.values.length; i++) {
            set.add(predicate(this.values[i], i));
        }
        return new ImmutableSet(set);
    }

    public removeIf(predicate: (element: T, index: number) => boolean): ImmutableSet<T> {
        let set = new BaseSet<T>();
        for (let i = 0; i < this.values.length; i++) {
            let value = this.values[i];
            if(predicate(value, i)) {
                set.add(value);
            };
        }
        return new ImmutableSet(set);
    }

    public isImmutable(): boolean {
        return true;
    }
}