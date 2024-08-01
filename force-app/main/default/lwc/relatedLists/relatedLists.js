import { LightningElement, api } from 'lwc';

export default class RelatedLists extends LightningElement {
    @api recordId;

    constructor(){
        super();
        console.log('\n');
        console.log('Parent Contructor: ' + this.recordId);
    }

    connectedCallback(){
        console.log('Parent connected: ' + this.recordId);
    }

    disconnectedCallback(){
        console.log('Parent disconnected: ' + this.recordId);
    }

    renderedCallback(){
        console.log('Parent rendered: ' + this.recordId);
    }

    errorCallback(){
        console.log('Parent error: ' + this.recordId);
    }
}