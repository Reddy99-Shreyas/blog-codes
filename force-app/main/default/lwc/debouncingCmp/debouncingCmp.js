import { LightningElement, wire } from 'lwc';
import getAccountsByName from '@salesforce/apex/AccountController.getAccountsByName';

export default class DebouncingCmp extends LightningElement {
    searchTerm = '';
    result = '';
    apiFilter = '';
    display = false;
    searchNameHandler(event) {
        this.searchTerm = event.target.value;
        this.debounceSearch();
    }
    @wire(getAccountsByName, { searchName: '$apiFilter' })
    accHandler({ data, error }) {
        if (data) {
            this.result = data;
        } if (error) {
            console.log(error);
        }
    }

    debounceSearch() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
            this.display = true;
            this.apiFilter = this.searchTerm;
        }, 1500)
    }
}