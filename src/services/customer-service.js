class CustomerService {
    constructor() {
        this.baseURL = "http://localhost:3000/";
    }

    fetchAllcustomers() {
        return fetch(`${this.baseURL}customers`)
        .then((response) => response.json());
    }

    postCustomer(customer) {
        return fetch(`${this.baseURL}customers`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"name": customer})
        });
    }

    deleteCustomer(customerId) {
        return fetch(`${this.baseURL}customers/${customerId}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        })
    }
}

const customerService = new CustomerService();
export { customerService };