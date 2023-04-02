import { LitElement } from "lit";

export class MangoStore<T> {
  public value: ReactiveValue<T>;
  private subscribers: Subscriber<T>[];

  constructor(value: T) {
    this.value = new ReactiveValue<T>(value, this);
    this.subscribers = [];
  }

  public subscribe(callback: (arg0?: T) => T | void, subscriber: HTMLElement | LitElement){
    this.subscribers.push({ callback, subscriber });
    
    return;
  }

  public publish(value: T): void {
    this.subscribers.forEach((subscriber) => subscriber.callback.call(subscriber.subscriber, value));

    return;
  }
}

/**
  * A Reactive value implementation, that calls its parent store to publish when the value is updated.
  * @private
  * @param value - A Generic value (the shape of type) for the value.
  * @param store - {@link MangoStore} A MangoStore to publish to
  */
class ReactiveValue<T> {
  private value?: T;
  private store: MangoStore<T>

  constructor(value: T, store: MangoStore<T>) {
    this.store = store;
    this.value = value;
  }

  /**
    * Gets the value set on the ReactiveValue constructor
    * @public
    * @returns The valuse set on the ReactiveValue constructor. 
    */
  public get() {
    return this.value; 
  }

  /**
    * Sets the value key on {@link ReactiveValue} and calls the store to publish to subscribers.
    * @public
    * @param value - The value to set.
    * @returns The value that was set. 
    */
  public set(value: T): T {
    delete this.value;

    this.value = value;
    this.store.publish(this.value);

    return value;
  }
}
