let cart = JSON.parse(localStorage.getItem("cart"))||[];
let orders = JSON.parse(localStorage.getItem("order"))||[];

let button =document.getElementById("form")
button.addEventListener("submit",(e)=>{
    e.preventDefault()
    var inputs = form.querySelectorAll('form');
    cart.forEach(element => {
        orders.push(element);
    });
    localStorage.setItem("order",JSON.stringify(orders));
    cart = [];
    localStorage.setItem("cart",JSON.stringify(cart));
    window.location.assign("PaymentSucessfull.html")
   
    
})

let totalbill = localStorage.getItem("totalbill");
let totalitem = localStorage.getItem("totalitem");



document.getElementById("totalbill").textContent = totalbill
document.getElementById("totalitem").textContent = totalitem
