import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        const summaryElement = document.querySelector(
            `${this.outputSelector} #subtotal`
        );
        const itemNumElement = document.querySelector(
            `${this.outputSelector} #itemNum`
        );

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);

        summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
        itemNumElement.innerText = this.list.length;
    }

    calculateOrderTotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(this.outputSelector + " #total");

        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    }

    async checkout() {
        const formElement = document.forms["checkout"];

        const json = formDataToJSON(formElement);
        // adds totals to json object
        json.orderTotal = this.orderTotal;
        json.shipping = this.shipping;
        json.tax = this.tax;
        json.orderDate = new Date();
        json.items = packageItems(this.list);

        try {
            const res = await services.checkout(json);
            console.log(res);

            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");

        } catch (err) {
            console.log(err);
            let messages = "";
            if (err.message && typeof err.message === "object") {
                for (const key in err.message) {
                    messages += `${key}: ${err.message[key]} <br>`;
                }
            } else {
                messages = err.message || "Something went wrong with your order.";
            }
            alertMessage(messages);
        }
    }
}