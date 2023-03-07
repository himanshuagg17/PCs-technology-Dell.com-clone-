const URL = "https://639eb5f95eb8889197eb9a64.mockapi.io/DELL";
let container = document.getElementById("laptop_container");
let sort = document.getElementById("sort");
let search = document.getElementById("search_btn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let storeData = [];

sort.addEventListener("change", sortbyprice);
search.addEventListener("click", searchbytitle);
console.log(document.querySelector(".icon>img"));
document.querySelector(".icon>img").addEventListener("click", function () {
    console.log("yes");
    window.location.assign("index.html");
})
fetch(URL)
    .then(res => res.json())
    .then((data) => {
        let newData = data.filter(function (element) {
            return element.category === "Monitors";
        })
        renderCards(newData);
        storeData = newData;
    });

function renderCards(data) {
    container.innerHTML = null;
    data.forEach((element, index) => {

        let discount = (+element.strikeoffprize) - (+element.price);
        let percentage = (((element.strikeoffprize - +element.price) / +element.strikeoffprize) * 100).toFixed(0);

        let card = document.createElement("div");
        card.setAttribute("class", "product_card");
        let img = document.createElement("img");
        img.setAttribute("src", element.image1);
        let title = document.createElement("h2");
        title.textContent = element.name;
        let price1 = document.createElement("p");
        price1.innerHTML = `Online Price <span>₹${element.strikeoffprize}</span>`
        let price2 = document.createElement("p");
        price2.innerHTML = `<span><b>₹${element.price}</b></span> Save <span style="color:green">₹${discount}(${percentage}%)</span>`;
        let price3 = document.createElement("p");
        price3.textContent = "Price inclusive of GST. Free Delivery."

        let productline = document.createElement("p");
        productline.textContent = "Productline : " + element.productline;
        let button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => {
            addtocart(element, index);
        });

        card.addEventListener("click",function(){
            productpage(element);
        })
        let cartTotal = document.getElementById("cart_container");
        cartTotal.textContent = cart.length;
        let mediacartTotal = document.getElementById("media_cart_container");
        mediacartTotal.textContent = cart.length;
        card.append(img, title, price1, price2, price3, productline, button);
        container.append(card);
    });
}

//  ---------------------functionality for search bar -------------------------

function sortbyprice() {
    let select = sort.value;
    if (select === "") {
        renderCards(storeData);
    } else {
        if (select === "Highest_Price") {
            storeData = storeData.sort(function (a, b) {
                return b.price - a.price;
            });
        }
        else if (select === "Lowest_Price") {
            storeData = storeData.sort(function (a, b) {
                return a.price - b.price;
            });
        }

        renderCards(storeData);
    }


}

// ------------------------Functionality for search bar ------------------------

function searchbytitle() {
    console.log("yes");
    let input = document.querySelector("#input_search").value;
    let searchinput = storeData.filter((element) => {
        return element.name.toLowerCase().includes(input.toLowerCase())
    });
    renderCards(searchinput);


}
// -------------functionalities for filter starts here ----------------
// -----------------------Functionality for productline filter --------------------

let productline = document.querySelectorAll(".productline");
for (let itm of productline) {
    itm.addEventListener("change", productlinefilter);
}

function productlinefilter(e) {
    let select = e.target.value;
    if (e.target.checked) {
        let newArr = storeData.filter(function (element) {
            if (select == "Inspiron") {
                return element.productline === select;
            }
            else if (select == "Vostro") {
                return element.productline === select;
            }
            else {
                return element.productline === select;
            }
        })
        renderCards(newArr);
    } else {
        renderCards(storeData);
    }
}

// ------------------------------ functionality for screen size filter -----------------------

let screensize = document.querySelectorAll(".Screen_size");
for (let itm of screensize) {
    itm.addEventListener("change", screensizeFilter);
}

function screensizeFilter(e) {
    let select = e.target.value;
    if (e.target.checked) {
        let newArr = storeData.filter(function (element) {
            if (select == "20_25_inch") {
                return element.screensize > 20 && element.screensize <= 25;
            }
            else if (select == "25_30_inch") {
                return element.screensize > 25 && element.screensize <= 30;
            }
            else if (select == "30_35_inch") {
                return element.screensize > 30 && element.screensize <= 35;
            } else {
                return element.screensize > 35;
            }
        })
        renderCards(newArr);
        console.log(newArr)
    } else {
        renderCards(storeData);
    }
}

// ----------------------------functionality for ports--------------------------

let port = document.querySelectorAll(".port");
for (let itm of port) {
    itm.addEventListener("change", portFilter);
}

function portFilter(e) {
    let select = e.target.value;
    if (e.target.checked) {
        let newArr = storeData.filter(function (element) {
            if (select == "HDMI") {
                return element.ports === select;
            }
            else if (select == "DisplayPort") {
                return element.ports === select;
            }
            else {
                return element.ports === select;
            }
        })
        renderCards(newArr);
    } else {
        renderCards(storeData);
    }
}

// ------------------------functionality for price ---------------------

let price = document.querySelectorAll(".price");
for (let itm of price) {
    itm.addEventListener("change", priceFilter);
}

function priceFilter(e) {
    let select = e.target.value;
    if (e.target.checked) {
        let newArr = storeData.filter(function (element) {
            if (select == "10,000-50,000") {
                return element.price > 10000 && element.price <= 50000;
            }
            else if (select == "50,000-1,00,000") {
                return element.price > 50000 && element.price <= 100000;
            }
            else if (select == "1,00,000-1,50,000") {
                return element.price > 100000 && element.price <= 150000;
            } else {
                return element.price > 150000;
            }
        })
        renderCards(newArr);
    } else {
        renderCards(storeData);
    }
}

// --------------------------add to cart functionality-------------------------
function addtocart(element, index) {
    let flag = false;
    cart.forEach(ele => {
        if (ele[0].id === element.id) {
            flag = true;
        }
    });
     console.log(flag);
    if(flag == false) {
        let arr = [];
        arr.push(element);
        arr.push(1);
        cart.push(arr);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart");
        
        
    }else {
        alert("Product is already present in cart");
    }

}

// -----------------------------functionality for product page------------------

function productpage(element){
    let arr = [];
    arr.push(element);
    arr.push(element.category);
    localStorage.setItem("product",JSON.stringify(arr));
    window.location.assign("product.html")
}

//  -------------------functionality for filter function ----------------

let filterDiaplay = document.getElementById("media_filter");
let isClicked = true;
filterDiaplay.addEventListener("click",function(){

    if(isClicked){
        document.getElementById("midsection_part1").style.display = "block";
        isClicked = false;
    }else{
        document.getElementById("midsection_part1").style.display = "none";
        isClicked = true;
    }
});