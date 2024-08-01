import { LightningElement, api } from 'lwc';

export default class Child extends LightningElement {
    // counter = 0;

    // incrementCounter() {
    //     this.counter++;
    //     // send data to parent using the custom event
    //     const increment = new CustomEvent("increment", {
    //         detail: { counter: this.counter }
    //     });
    //     this.dispatchEvent(increment);
    // }

    // get buttonLabel() {
    //     return `Count (${this.counter})`;
    // }
    @api messageFromParent = "";
}