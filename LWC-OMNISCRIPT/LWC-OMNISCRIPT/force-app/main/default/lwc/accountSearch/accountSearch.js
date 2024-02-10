import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    // Add more columns as needed
];

export default class AccountSearch extends LightningElement {
    @track searchText = '';
    @track accountData = [];
    @track selectedRows = [];
    columns = columns;

    handleInputChange(event) {
        this.searchText = event.target.value;
        this.isButtonDisabled = this.searchText.length < 3;
    }

    @wire(getAccounts, { searchText: '$searchText' })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accountData = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleSelectRecords() {
        this.dispatchEvent(new CustomEvent('selected', { detail: this.selectedRows }));
    }
}
