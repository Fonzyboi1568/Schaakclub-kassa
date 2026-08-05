import { LitElement, html, css } from "lit";
import "./confirm-delete-modal";

const ZERO = 0;
export class CustomerSelection extends LitElement {
    static styles = css`
    :host {
        background-color: #E40078;
        padding: 1.2rem;
        display: inline-block;
        justify-content: center;
    }
    #send-btn, #delete-btn, select {
        border-radius: 0.8rem;
        color: white;
        font-weight: bold;
        border: 2px solid black;
    }

    select{
        font-size: 1rem;
        padding: 0.5rem;
        margin-bottom: 1rem;
        background-color: yellowgreen;
    }

    option {
        background-color: white;
        color: black;
    }

    #send-btn {
        background-color: yellowgreen;
        padding: 1rem;
    }
    #delete-btn {
        background-color: red;
        padding: 1rem;
    }
    #send-btn:hover, #delete-btn:hover {
        background-color: gray;
    }
    #send-btn:active, #delete-btn:active {
        background-color: lightgray;
    }
    .input-customer {
        display: block;
    }
    #customer-add-input {
        border-radius: 0.8rem;
        padding: 0.5rem;
        border: 2px solid black;
    }
    .error {
        background-color: white;
        border: 2px solid black;
        padding: 0.5rem;
    }
    `

    static properties = {
        customers: {type: Array},
        data: {type: Object},
        errors: {type: Array},
        selectedCustomer: {type: String},
        open: {type: Boolean},
    }

    constructor() {
        super();
        this.customers = ["geen klant geselecteerd"];
        this.open = false;
        this.errors = [];
    }

    validateCustomer(customer) {
        const re = /[A-Za-z]/u
        if (re.test(customer)) {return customer;}
        this.errors.push("Klant is niet goed ingevuld");
        this.update();
        this.errors.pop("Klant is niet goed ingevuld");
        throw new Error("Klant is niet goed ingevuld");
    }

    addCustomer() {
        const inputValue = this.shadowRoot.querySelector('#customer-add-input').value;
        if (this.customers.find((customer) => customer.name === inputValue)) {
            this.errors.push("De klant bestaat al");
            this.update();
            this.errors.pop("De klant bestaat al");
            throw new Error("De klant bestaat al");
        } else {
            this.dispatchEvent(new CustomEvent("customer-sent", {
                detail: this.validateCustomer(inputValue),
                bubbles: true,
                composed: true
            }));
        }
    }

    selectCustomer(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent("customer-selected", {
            detail: event.target.value,
            bubbles: true,
            composed: true
        }));
    }

    deleteCustomer() {
        this.open = false;
        this.dispatchEvent(new CustomEvent("customer-delete", {
            bubbles: true,
            composed: true
        }));
    }

    openDeleteModal() {
        this.open = true;
    }

    closeDeleteModal() {
        this.open = false;
    }

    render() {
        return html`
        <label>
            <select @change=${this.selectCustomer}>
                <option value="">Selecteer een klant</option>
                ${this.customers.map((customer) => 
                html`
                <option value=${customer.name}>${customer.name}</option>
                `)}
            </select>
        </label>

        <label class="input-customer">
            <input type="text" id="customer-add-input" required placeholder="voeg klant toe..." />
            <button id="send-btn" @click=${this.addCustomer}>Voeg toe</button>
        </label>
        ${this.errors.length > ZERO ? this.errors.map((error) => html`<p class="error">${error}</p>`) : ""}
        
        ${this.selectedCustomer === "" ? "": html`<button id="delete-btn" @click=${this.openDeleteModal}>Verwijder klant</button>`}
        <confirm-delete-modal
            .open=${this.open}
            .selectedCustomer=${this.selectedCustomer}
            @close=${this.closeDeleteModal}
            @confirm=${this.deleteCustomer}
        ></confirm-delete-modal>
        `
    }

}
customElements.define("customer-selection", CustomerSelection);