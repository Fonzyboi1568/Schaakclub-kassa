import { LitElement, html, css } from "lit";

const ZERO = 0;
const ONE = 1;
const NR_RECENT_ORDERS = 5;
const FIXED_DECIMALS = 2;
export class RecentOrders extends LitElement {
    static styles = css`
    :host {
        float: right;
        margin-right: 2rem;
        margin-top: 3rem;
        width: fit-content;
        background-color: #E40078;
        padding: 2rem;
    }
    h2 {
        margin-top: 0;
        color: white;
    }
    .recentOrder {
        background-color: white;
        padding: 1rem;
        padding-top: 0.1rem;
        margin-bottom: 1rem;
        box-shadow: 2.5px 2.5px 5px 1px rgba(0,0,0,0.5);
    }
    `
    static properties = {
        orderData: {type: Array},
        recentOrders: {type: Array},
    }

    constructor() {
        super();
        this.recentOrders = [];
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        if (this.orderData.length > NR_RECENT_ORDERS) {
            this.recentOrders = [...this.orderData];

            const deleteCount = this.recentOrders.length - NR_RECENT_ORDERS;
            this.recentOrders.splice(ZERO , deleteCount);
            
            this.recentOrders.reverse();
        } else if (this.orderData.length <= NR_RECENT_ORDERS) {
            this.recentOrders = [...this.orderData];

            this.recentOrders.reverse();
        };
        
        return html`
        <h2>Recente bestellingen</h2>
        ${this.recentOrders.length > ZERO ? this.recentOrders.map((data) =>
            html`
            <div class="recentOrder">
                <h3>${data.customer}:</h3>
                <h4>Tijd: ${data.time}</h4>
                ${data.orders.map((drink) => 
                html`
                <p>${drink.name} €${drink.price.toFixed(FIXED_DECIMALS).replace('.', ',')}</p>
                `)}
                --------------------------------
                <h4>Totaal: €${data.totalPrice.toFixed(FIXED_DECIMALS).replace('.', ',')}</h4>
            </div>
            `) : html`<p>Geen bestellingen...</p>`}
        `
    }
}
customElements.define("recent-orders", RecentOrders);