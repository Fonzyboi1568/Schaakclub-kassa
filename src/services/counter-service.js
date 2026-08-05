class CounterService {
    constructor() {
        this.baseURL = "http://localhost:3000/";
    }

    fetchAllCounters() {
        return fetch(`${this.baseURL}counters`)
        .then((response) => response.json());
    }

    postCounters(counters) {
        return fetch(`${this.baseURL}counters`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(counters)
        });
    }
}
const counterService = new CounterService();

export {counterService};