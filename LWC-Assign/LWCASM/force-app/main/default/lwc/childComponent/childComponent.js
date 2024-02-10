import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api counter = 0;

    handleAdd() {
        this.counter += 1;
        this.dispatchEvent(new CustomEvent('counterchange', { detail: this.counter }));
    }

    handleSubtract() {
        this.counter -= 1;
        this.dispatchEvent(new CustomEvent('counterchange', { detail: this.counter }));
    }

    handleMultiply() {
        this.counter *= 2;
        this.dispatchEvent(new CustomEvent('counterchange', { detail: this.counter }));
    }
}
