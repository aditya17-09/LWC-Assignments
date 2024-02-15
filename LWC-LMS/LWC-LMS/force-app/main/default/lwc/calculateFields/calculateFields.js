import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import DISTANCE_FIELD from '@salesforce/schema/Account.Distance__c';
import PRICE_PER_KM_FIELD from '@salesforce/schema/Account.Price_Per_Km__c';

export default class CalculateFields extends LightningElement {
    distance;
    pricePerKm;

    @wire(getRecord, { recordId: '$recordId', fields: [DISTANCE_FIELD, PRICE_PER_KM_FIELD] })
    wiredRecord({ error, data }) {
        if (data) {
            this.distance = data.fields.Distance__c.value;
            this.pricePerKm = data.fields.Price_Per_Km__c.value;
        } else if (error) {
            console.error('Error loading record', error);
        }
    }

    handleCalculate() {
        const calculateEvent = new CustomEvent('calculate', {
            detail: {
                distance: this.distance,
                pricePerKm: this.pricePerKm
            }
        });
        this.dispatchEvent(calculateEvent);
    }
}
