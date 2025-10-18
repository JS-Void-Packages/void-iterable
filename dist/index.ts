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
}

export class ImmutableSet<T> extends AbstractSet<T> {

    public add(value: T): void {}

    public remove(index: number): void {}
}

export class Set<T> extends AbstractSet<T> {

    public add(value: T): void {
        this.values.push(value);
    }

    public remove(index: number): void {
        this.values.splice(index, 1);
    }
}