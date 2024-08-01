import { LightningElement, api } from 'lwc';
import firstTemplate from './lifecyclehook.html';
import secondTemplate from './lifecyclehook2.html';
export default class Lifecyclehook extends LightningElement {
    @api templateno = 'temp1';
    constructor(){
        super();
        console.log('Inside 1 cmp Constructor');
    }

    connectedCallback() {
        console.log('Inside 1st Cmp Connected call back');
    }
    
    disconnectedCallback() {
        console.log('Inside 1st cmp disconnected callback');
    }

    changeTemplate(){
        console.log('Inside change template method');
        if(this.templateno === 'temp1'){
            this.templateno = 'temp2';
        }else{
            this.templateno = 'temp1';
        }
    }
    render(){
        console.log('Inside render');
        if(this.templateno === 'temp1'){
            return firstTemplate;
        }
        else{
            return secondTemplate;
        }  
    }
}