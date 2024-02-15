import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CALCULATE_MESSAGE_CHANNEL from '@salesforce/messageChannel/CalculateMessageChannel__c';

export default class DisplayCalculation extends LightningElement {
    calculatedValue;

    @wire(MessageContext)
    messageContext;

    subscription;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            CALCULATE_MESSAGE_CHANNEL,
            (message) => {
                this.handleMessage(message);
            }
        );
    }

    handleMessage(message) {
        this.calculatedValue = message.calculatedValue;
    }
}
