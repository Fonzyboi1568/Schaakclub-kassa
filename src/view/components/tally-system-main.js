import { LitElement, html, css } from "lit";

const ZERO = 0;
const ONE = 1;
const FIXED_DECIMALS = 2;
export class TallySystemMain extends LitElement {
    static styles = css`
    :host {
        display: block;
        margin-bottom: 5rem;
    }
    .drinkBtns {
        display: inline-block;
        margin-top: 4rem;
    }

    .drink{
        display: inline-block;
        width: 10rem;
        height: 10rem;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        background-color: white;
        margin: 0.5rem;
        border-radius: 0.5rem;
        border: none;
    }

    .addBtn, .removeBtn {
        font-weight: bold;
        font-size: 1.2rem;
        margin: 0.8rem;
        padding: 1.2rem;
        border: 2px solid gray;
        background-color: lightblue;
        border-radius: 1rem;
    }
    .addBtn {
        float: left;
    }
    .removeBtn {
        float: right;
    }

    .priceOverview {
        float: right;
        margin-top: 4rem;
        width: 10rem;
        background-color: white;
        padding: 2rem;
        box-shadow: 2.5px 2.5px 5px 1px rgba(0,0,0,0.5);
    }

    .listOptions {
        display: block;
    }

    .writeBtn, .clearListBtn {
        display: inline;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        padding: 1rem;
    }

    .writeBtn {
        margin-top: 2rem;
        margin-right: 1rem;
        background-color: #E40078;
    }

    .clearListBtn {
        background-color: white;
        color: black;
    }

    button:hover{
        background-color: gray;
    }

    button:active{
        background-color: lightgray;
    }

    @media (max-width: 800px) {
        .drink{
            width: 7.5rem;
            height: 7.5rem;
        }
        .priceOverview {
            float: none;
        }
        .addBtn, .removeBtn {
            padding: 0.4rem;
            margin-top: 0;
        }
    }
    `

    static properties = {
        selectedCustomer: {type: String},
        drinks: {type: Array},
        totalPrice: {type: Number},
        counters: {type: Object},
        drinkCounters: {type: Object},
        orders: {type: Array},
    }

    constructor() {
        super();
        this.totalPrice = ZERO;
        this.orders = [];
        this.drinkCounters = {};
    }

    connectedCallback() {
        super.connectedCallback();
        if (!Object.keys(this.counters).length > ZERO) {
            this.drinkCounters = this.counters[this.selectedCustomer].drinks;
        } else if (Object.keys(this.counters).length > ZERO) {
            this.drinks.forEach((drink) => {
                this.drinkCounters[drink.name] = ZERO;
                this.counters[this.selectedCustomer] = this.drinkCounters;
            });
        }
    }

    addDrink(drink) {
        if (this.drinkCounters[drink.name] > ZERO) {
            this.drinkCounters[drink.name] += ONE;
        } else {
            this.drinkCounters[drink.name] = ZERO;
            this.drinkCounters[drink.name] += ONE;
        }
        this.orders.push(drink);
        this.totalPrice += drink.price;
        this.update();
    }

    removeDrink(drink) {
        if (this.orders.includes(drink)) {
            this.orders.splice(this.orders.indexOf(drink), ONE);
            this.drinkCounters[drink.name] -= ONE;
            this.totalPrice -= drink.price;
            if (this.totalPrice === -ZERO) {
                this.totalPrice = ZERO;
            }
            this.update();
        }
    }

    clearList() {
        this.orders = [];
        this.drinkCounters = {};
        this.totalPrice = ZERO;
    }

    writeDown() {
        if (this.orders.length > ZERO) {
            try {
                const counterObj = {};
                counterObj[this.selectedCustomer] = {
                    drinks: this.drinkCounters,
                    totalPrice: Number(this.totalPrice.toFixed(FIXED_DECIMALS))
                };

                this.dispatchEvent(new CustomEvent("counters-sent", {
                    detail: counterObj,
                    bubbles: true,
                    composed: true
                }));
                
                this.dispatchEvent(new CustomEvent("order-data-sent", {
                    detail: {
                        customer: this.selectedCustomer, 
                        orders: this.orders,
                        totalPrice: Number(this.totalPrice.toFixed(FIXED_DECIMALS)), 
                        time: new Date().toLocaleDateString("nl-NL", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})
                    },
                    bubbles: true,
                    composed: true
                }));
                this.clearList();
            } catch (error) {
                console.error(error);
            }
        } else {
            window.alert(`Er zijn geen drankjes om op te schrijven bij ${this.selectedCustomer}.`);
        }
    }

    render() {
        return html`
        <div class="drinkBtns">
            ${this.drinks.map((drink) => 
            html`
            <div class="drink">
                <p>${drink.name} <br> €${drink.price.toFixed(FIXED_DECIMALS).replace('.', ',')} <br></p>
                <button class="addBtn" @click=${() => this.addDrink(drink)}>+</button>
                <button class="removeBtn" @click=${() => this.removeDrink(drink)}>-</button>
            </div>
            `)}
        </div>
        <div class="priceOverview">
            <h2>Totaalprijs bestelling ${this.selectedCustomer}: €${this.totalPrice.toFixed(FIXED_DECIMALS).replace('.', ',')}</h2>
            ${this.orders.length > ZERO ? this.orders.map((order) =>
            html`
            <p class="order">${order.name} €${order.price.toFixed(FIXED_DECIMALS).replace('.', ',')}</p>
            `
        ): html`<p>nog geen bestellingen...</p>`}
        </div>
        <div class="listOptions">
            <button class="writeBtn" @click=${this.writeDown}>Schrijf op bij ${this.selectedCustomer}</button>
            <button class="clearListBtn" @click=${this.clearList}>Lijst legen</button>
        </div>
        `
    }
}
customElements.define("tally-system-main", TallySystemMain);