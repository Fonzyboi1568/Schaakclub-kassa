import { LitElement, html, css } from "lit";
import "./customer-selection";
import "./tally-system-main";
import "./tally-system-table";
import "./recent-orders";

import { customerService } from "../../services/customer-service";
import { counterService } from "../../services/counter-service";
import { drinkService } from "../../services/drink-service";
import { orderService } from "../../services/order-service";
export class TallySystemExchange extends LitElement {
    static styles = css`
    .noCustomerSelected {
        display: block;
        background-color: red;
        padding: 1rem;
        width: fit-content;
        color: white;
        font-weight: bold;
        border-radius: 0.5rem;
    }
    `
    
    static properties = {
        customers: {type: Array},
        selectedCustomer: {type: String},
        drinks: {type: Array},
        counters: {type: Object},
        orderData: {type: Array},
    }

    constructor() {
        super();
        this.customers = [];
        this.selectedCustomer = "";
        this.drinks = [];
        this.counters = {};
        this.orderData = [];
    }

    connectedCallback() {
        super.connectedCallback();

        customerService.fetchAllcustomers()
        .then((data) => this.customers = [...data]);

        drinkService.fetchAllDrinks()
        .then((data) => this.drinks = [...data]);

        counterService.fetchAllCounters()
        .then((data) => this.counters = {...data});

        orderService.fetchAllOrderData()
        .then((data) => this.orderData = [...data]);
    }

    createCustomer(event) {
        const submittedCustomer = event.detail;
        try {
            customerService.postCustomer(submittedCustomer);
            window.alert(`Nieuwe klant ${submittedCustomer} aangemaakt!`);
            this.selectedCustomer = submittedCustomer;
        } catch (error) {
            console.error(error);
        }
        customerService.fetchAllcustomers()
            .then((data) => {
                if(data) {
                    this.customers = [...data];
                }
            });
    }

    deleteCustomer() {
        const customerId = this.customers.find((customer) => customer.name === this.selectedCustomer).id;
        try {
            customerService.deleteCustomer(customerId);
            window.alert(`${this.selectedCustomer} is verwijderd.`);
            this.selectedCustomer = "";
        } catch(error) {
            console.log(error);
        }
        customerService.fetchAllcustomers()
            .then((data) => {
                if(data) {
                    this.customers = [...data];
                }
            });
    }

    writeDownCounters(event) {
        const counterObj = event.detail;
        try {
            counterService.postCounters(counterObj);
            window.alert(`Drankjes opgeslagen voor ${this.selectedCustomer}`)
        } catch(error) {
            console.error(error);
        }
        counterService.fetchAllCounters()
        .then((data) => this.counters = {...data});
    }

    writeDownOrders(event) {
        const orderDataObj = event.detail;
        try {
            orderService.postOrderData(orderDataObj);
        } catch (error) {
            console.error(error);
        }
        orderService.fetchAllOrderData()
        .then((data) => this.orderData = [...data]);
    }

    render() {
        return html`
        <customer-selection
            .customers=${this.customers}
            @customer-sent=${this.createCustomer}
            .selectedCustomer=${this.selectedCustomer}
            @customer-selected=${(event) => {this.selectedCustomer = event.detail}}
            @customer-delete=${this.deleteCustomer}
        ></customer-selection>
        ${this.selectedCustomer === "" ? 
        html`<p class="noCustomerSelected">Selecteer eerst een klant!</p>` :
        html`
        <tally-system-main
            .selectedCustomer=${this.selectedCustomer}
            .drinks=${this.drinks}
            .counters=${this.counters}
            @counters-sent=${this.writeDownCounters}
            @order-data-sent=${this.writeDownOrders}
        ></tally-system-main>`
        }
        <tally-system-table
        .counters=${this.counters}
        ></tally-system-table>
        <recent-orders
        .orderData=${this.orderData}
        ></recent-orders>
        `
    }
}
customElements.define("tally-system-exchange", TallySystemExchange);