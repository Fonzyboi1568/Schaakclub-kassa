class DrinkService {
    constructor() {
        this.baseURL = "http://localhost:3000/"
    }

    fetchAllDrinks() {
        return fetch(`${this.baseURL}drinks`)
        .then((response) => response.json());
    }

}

const drinkService = new DrinkService();
export { drinkService };