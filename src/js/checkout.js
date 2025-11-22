import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Calculate totals when the Zip Code field loses focus (blur)
document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

// Handle the Checkout button click
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const myForm = document.forms[0];

    const chk_status = myForm.checkValidity();
    myForm.reportValidity();

    if (chk_status)
        myCheckout.checkout();
});