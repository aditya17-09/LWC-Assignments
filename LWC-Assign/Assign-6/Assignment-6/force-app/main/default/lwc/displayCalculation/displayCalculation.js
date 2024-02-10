import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CALCULATION_CHANNEL from '@salesforce/messageChannel/Calculation__c';

export default class DisplayCalculation extends LightningElement {
    total;

    @wire(MessageContext)
    messageContext;

    subscription;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            CALCULATION_CHANNEL,
            (message) => {
                this.total = message.total;
            }
        );
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}
