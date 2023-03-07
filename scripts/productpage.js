let product = JSON.parse(localStorage.getItem("product"));
let cart = JSON.parse(localStorage.getItem("cart"))||[];
renderProduct(product);

console.log(document.querySelector(".icon>img"));
document.querySelector(".icon>img").addEventListener("click", function () {
    console.log("yes");
    window.location.assign("index.html");
})




let slide = document.querySelectorAll(".slide");
let count = 0;
slide.forEach((element, i) => {
    element.style.left = `${i * 100}%`;
});
function goprev() {
    if (count > 0) {
        count--;
    }
    console.log(count);
    slideimage();
}
function gonext() {
    if (count < 2) {
        count++;
    }
    console.log(count);
    slideimage();
}
function slideimage() {
    slide.forEach(element => {
        element.style.transform = `translateX(-${count * 100}%)`
    });
}
console.log(slide);
function renderProduct(product) {
    let div1 = document.createElement("div");

    let div11 = document.createElement("div");
    let img1 = document.createElement("img");
    img1.setAttribute("src", product[0].image1);
    img1.setAttribute("class", "slide");
    let img2 = document.createElement("img");
    img2.setAttribute("src", product[0].image2);
    img2.setAttribute("class", "slide");
    let img3 = document.createElement("img");
    img3.setAttribute("src", product[0].image3);
    img3.setAttribute("class", "slide");
    div11.append(img1, img2, img3);

    let d = document.createElement("div");
    let button1 = document.createElement("button");
    button1.innerText = "Previous";
    button1.addEventListener("click", goprev)
    let button2 = document.createElement("button");
    button2.innerText = "Next";
    button2.addEventListener("click", gonext)
    d.append(button1, button2)

    div1.append(div11, d);
    let discount = (+product[0].strikeoffprize)-(+product[0].price);
    let percentage = (((product[0].strikeoffprize - +product[0].price)/+product[0].strikeoffprize)*100).toFixed(0);


    let div2 = document.createElement("div");
    let title = document.createElement("h2");
    title.textContent = product[0].name;
    let price1 = document.createElement("p");
    price1.innerHTML = `Online Price <span>₹${product[0].strikeoffprize}</span>`
    let price2 = document.createElement("p");
    price2.innerHTML = `<span><b>₹${product[0].price}</b></span> Save <span style="color:green">₹${discount}(${percentage}%)</span>`;
    let price3 = document.createElement("p");
    price3.textContent = "Price inclusive of GST. Free Delivery."
    let processor = document.createElement("div");
    let description = document.createElement("p");
    description.textContent = product[0].description;
    processor.innerHTML = `<i class="fa-solid fa-microchip"></i> <span>11th Gen Intel® Core™ i3-1115G4</span>`
    let memory = document.createElement("div");
    memory.innerHTML = `<i class="fa-solid fa-ruler-horizontal"></i> <span>${product[0].ram}, DDR4, 2666 MHz</span>`
    let harddrive = document.createElement("div");
    harddrive.innerHTML = `<i class="fa-solid fa-hard-drive"></i> <span>${product[0].rom}, M.2, PCIe NVMe, SSD</span>`
    let size = document.createElement("div");
    size.innerHTML = `<i class="fa-solid fa-display"></i> <span>${product[0].screensize}-inch. display Full HD (1920X1080)</span>`
    let resolution = document.createElement("div");
    resolution.innerHTML = `RESOLUTION : ${product[0].resolution}</span>`
    let ports = document.createElement("div");
    ports.innerHTML = `PORTS : <span>${product[0].ports}</span>`
    let color = document.createElement("p");
    color.textContent = "Colour : " + product[0].color;
    let productline = document.createElement("p");
    productline.textContent = "Productline : " + product[0].productline;
    let button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click",function(){
      addtocart(product);
    });
    let cartTotal = document.getElementById("cart_container");
    cartTotal.textContent = cart.length;
    let mediacartTotal = document.getElementById("media_cart_container");
    mediacartTotal.textContent = cart.length;
    if(product[1]=="Laptop"||product[1]=="Desktop"){
        div2.append(title,price1,price2,price3,processor,memory,harddrive,size,color,productline,button);
    }else{
        div2.append(title,price1,price2,price3,description,size,resolution,ports,productline,button)
    }

    document.getElementById("products").append(div1,div2);
}

// --------------------------------functionality for product page -----------------------------

function addtocart(element) {
    let flag = false;
    cart.forEach(ele => {
        if (ele[0].id === element[0].id) {
            flag = true;
        }
    });
     console.log(flag);
    if(flag == false) {
        let arr = [];
        arr.push(element[0]);
        arr.push(1);
        cart.push(arr);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart");
       
    }else {
        alert("Product is already present in cart");
    }

}