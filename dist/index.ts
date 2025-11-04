export abstract class AbstractSet<T> {
    protected values: T[] = [];

    /**
     * Add an element to the set
     * @param value 
     */
    public abstract add(value: T): void;

    /**
     * Remove an element from the set
     * @param index 
     */
    public abstract remove(index: number): void;

    /**
     * Add all values to the set
     * @param values 
     */
    public addAll(...values: T[]) {
        for(let value of values) {
            this.add(value);
        }
    }

    /**
     * Throw an duplicate element error
     */
    protected duplicateError(): void {
        throw new RangeError('Set cannot contains duplicate elements!');
    }

    /**
     * Get all of the values from the set as an array
     * @returns 
     */
    public getElements() : T[] {
        return this.values;
    }

    [Symbol.iterator]() {
        var index = -1;
        var data = this.values;

        return {
            next: () => ({ value: data[++index], done: !(index in data) }),
        };
    }

    /**
     * call the predicate for each elements in the set
     * @param predicate 
     */
    public abstract forEach(predicate: (element:T, index:number, set:AbstractSet<T>) => void): void;

    /**
     * filter elements in the set if they match the predicate
     * @param predicate 
     * @returns 
     */
    public abstract filter(predicate: (element:T, index:number, set:AbstractSet<T>) => boolean): AbstractSet<T>;
    
    public isImmutable(): boolean {
        return false;
    }
}

export class JavaSet<T> extends AbstractSet<T> {

    /**
     * Return a new immutable set
     * @param values 
     * @returns 
     */
    public static immutable<T>(values: Iterable<T>): JavaSet<T> {
        return new ImmutableJavaSet(values);
    }

    public static of<T>(...values: T[]): JavaSet<T> {
        let set = new JavaSet<T>();

        for(let value of values) {
            set.add(value);
        }

        return set;
    }

    public static ofIterable<T>(values: Iterable<T>): JavaSet<T> {
        let set = new JavaSet<T>();

        for(let value of values) {
            set.add(value);
        }

        return set;
    }

    public add(value: T): void {
        if(this.values.includes(value)) {
           this.duplicateError(); 
        }
        else {
            this.values.push(value);
        }
    }

    public remove(index: number): void {
        this.values.splice(index, 1);
    }

    /**
     * call the predicate for each elements in the set
     * @param predicate 
     */
    forEach(predicate: (element:T, index:number, set:JavaSet<T>) => void) {
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
    filter(predicate: (element:T, index:number, set:JavaSet<T>) => boolean): JavaSet<T> {
        let set = new JavaSet<T>();
        for (let i = 0; i < this.values.length; i++) {
            let check = predicate(this.values[i], i, this);
            if (check) {
                set.add(this.values[i]);
            }
        }
        return set;
    }
}

export class ImmutableJavaSet<T> extends JavaSet<T> {

    constructor(values: Iterable<T>) {
        super();

        for(let value of values) {
            if(this.values.includes(value)) {
                this.duplicateError();
            }
            this.values.push(value);
        }

    }

    public add(value: T): void {}

    public remove(index: number): void {}

    forEach(predicate: (element: T, index: number, set: ImmutableJavaSet<T>) => void): void {
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
    filter(predicate: (element: T, index: number, set: ImmutableJavaSet<T>) => boolean): ImmutableJavaSet<T> {
        let set = new JavaSet<T>();
        for (let i = 0; i < this.values.length; i++) {
            let check = predicate(this.values[i], i, this);
            if (check) {
                set.add(this.values[i]);
            }
        }
        return new ImmutableJavaSet(set);
    }

    public isImmutable(): boolean {
        return true;
    }
}