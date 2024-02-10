import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track counter = 0;

    handleCounterChange(event) {
        this.counter = event.detail;
    }
}

