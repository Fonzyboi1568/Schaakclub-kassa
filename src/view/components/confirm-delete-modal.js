import { LitElement, html, css } from "lit";

export class ConfirmDeleteModal extends LitElement {
    static styles = css`
    dialog {
        border: none;
        border-radius: 1rem;
        padding: 2rem;
        background-color: gray;
    }

    dialog::backdrop {
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
    }

    #confirm-btn {
        background-color: red;
    }
    
    #close-btn:hover {
        background-color: gray;
    }
    #close-btn:active {
        background-color: lightgray;
    }

    #close-btn {
        background-color: white;
    }

    #confirm-btn:hover {
        background-color: darkred;
    }

    #confirm-btn:active {
        background-color: rosybrown;
    }

    button {
        font-weight: bold;
        border: 2px solid black;
        padding: 1rem;
        display: inline-block;
        border-radius: 1rem;
    }
    `

    static properties = {
        open: {type: Boolean},
        selectedCustomer: {type: String},
    }

    updated(changedProperties) {
        if (changedProperties.has('open')) {
            const dialog = this.shadowRoot.querySelector('dialog');
            if (this.open) {
                dialog.showModal();
            }
            else {
                dialog.close();
            }
        }
    }

    render() {
        return html`
        <dialog @cancel=${(event) => {event.preventDefault(); this.dispatchEvent(new CustomEvent("close"));}}>
            Weet je zeker dat je de ${this.selectedCustomer} wilt verwijderen?
            <button id="confirm-btn" @click=${() => this.dispatchEvent(new CustomEvent("confirm"))}>Ja, verwijderen</button>
            <button id="close-btn" @click=${() => this.dispatchEvent(new CustomEvent("close"))}>Nee, sluiten</button>
        </dialog>
        `
    }
}
customElements.define("confirm-delete-modal", ConfirmDeleteModal);