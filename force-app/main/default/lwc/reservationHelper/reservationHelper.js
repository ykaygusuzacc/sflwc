/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

export default class ReservationHelper extends LightningElement 
{
    @track flowStarted = false;
    @wire(CurrentPageReference) pageRef;


    connectedCallback() 
    {
        registerListener('selectcustomer', this.handleCustomerSelect, this);
    }


    disconnectedCallback() 
    {
        unregisterAllListeners(this);
    }


    handleCustomerSelect(event) 
    {
        if (!this.flowStarted) 
        {
            debugger;
            console.log('here!  3');

            this.flowStarted = true;
            this.dispatchEvent(
                new CustomEvent('customerchoice', { detail: event.detail }),
            );
        } 
        else if (this.flowStarted) 
        {
            debugger;
            console.log('here! 3a');
       
            const toastEvt = new ShowToastEvent({
                title: 'Flow interview already in progress',
                message:
                    'Finish the flow interview in progress before selecting another customer.',
                variant: 'error',
            });

            this.dispatchEvent(toastEvt);
        }
    }


    @api
    handleFlowExit(event) 
    {
        fireEvent(this.pageRef, 'flowfinish', event);
    }
}