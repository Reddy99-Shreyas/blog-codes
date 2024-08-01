import { LightningElement, api } from 'lwc';

export default class RelatedList extends LightningElement {
    @api objectApiName;
    @api parentRecordId;

    constructor(){
        super();
        console.log('\n');
        console.log('Child Contructor: ' + this.objectApiName);
    }

    connectedCallback(){
        console.log('Child connected: ' + this.objectApiName);
    }

    disconnectedCallback(){
        console.log('Child disconnected: ' + this.objectApiName);
    }

    renderedCallback(){
        console.log('Child rendered: ' + this.objectApiName);
    }

    errorCallback(){
        console.log('Child error: ' + this.objectApiName);
    }
}