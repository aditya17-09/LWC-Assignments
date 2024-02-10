import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { publish, MessageContext } from 'lightning/messageService';
import CALCULATION_CHANNEL from '@salesforce/messageChannel/Calculation__c';
import updateAccountFields from '@salesforce/apex/UpdateAccountFields.updateAccountFields';



const FIELDS = ['Account.Distance__c', 'Account.Price_per_km__c'];

export default class CalculateDistance extends LightningElement {
    @api recordId;
    distance;
    pricePerKm;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            this.distance = getFieldValue(data, 'Account.Distance__c');
            this.pricePerKm = getFieldValue(data, 'Account.Price_per_km__c');
        } else if (error) {
            console.error(error);
        }
    }


    calculate() {
        const total = this.distance * this.pricePerKm;
        publish(this.messageContext, CALCULATION_CHANNEL, { total });
        updateAccountFields({ recordId: this.recordId, distance: this.distance, pricePerKm: this.pricePerKm })
            .then(result => {
                // Handle success
            })
            .catch(error => {
                console.error(error);
            });
    }
}

