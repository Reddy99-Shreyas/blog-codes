import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
    // counter = 0;

    // handleIncrementFromChild(event) {
    //     console.log("message received from child component");
    //     this.counter = event.detail.counter;
    // }

    messageToChild="Hello!";

    handleChange(event){
        this.messageToChild = event.target.value;
    }
}