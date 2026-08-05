class OrderService {
    constructor() {
        this.baseURL = "http://localhost:3000/";
    }

    fetchAllOrderData() {
        return fetch(`${this.baseURL}orderData`)
        .then((response) => response.json());
    }

    postOrderData(orderData) {
        return fetch(`${this.baseURL}orderData`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderData)
        });
    }
}

const orderService = new OrderService();
export { orderService };