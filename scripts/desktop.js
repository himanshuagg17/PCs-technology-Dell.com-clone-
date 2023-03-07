const URL = "https://639eb5f95eb8889197eb9a64.mockapi.io/DELL";
let container = document.getElementById("desktop_container");
let sort = document.getElementById("sort");
let search = document.getElementById("search_btn");

let cart=JSON.parse(localStorage.getItem("cart"))||[];
let storeData = [];

sort.addEventListener("change",sortbyprice);
search.addEventListener("click",searchbytitle);
console.log(document.querySelector(".icon>img"));
document.querySelector(".icon>img").addEventListener("click",function(){
    console.log("yes");
    window.location.assign("index.html");
})
fetch(URL)
.then(res=>res.json())
.then((data)=>{
    console.log(data);
  let newData = data.filter(function(element){
    return element.category === "Desktop";
  })
  renderCards(newData);
  storeData = newData;
});

function renderCards(data){
  container.innerHTML = null;
  data.forEach((element,index) =>{
    
    let discount = (+element.strikeoffprize)-(+element.price);
    let percentage = (((element.strikeoffprize - +element.price)/+element.strikeoffprize)*100).toFixed(0);

    let card = document.createElement("div");
    card.setAttribute("class","product_card");
    let img= document.createElement("img");
    img.setAttribute("src",element.image1);
    let title = document.createElement("h2");
    title.textContent = element.name;
    let price1 = document.createElement("p");
    price1.innerHTML = `Online Price <span>₹${element.strikeoffprize}</span>`
    let price2 = document.createElement("p");
    price2.innerHTML =`<span><b>₹${element.price}</b></span> Save <span style="color:green">₹${discount}(${percentage}%)</span>`;
    let price3 = document.createElement("p");
    price3.textContent = "Price inclusive of GST. Free Delivery."
    let processor = document.createElement("div");
    processor.innerHTML = `<i class="fa-solid fa-microchip"></i> <span>11th Gen Intel® Core™ i3-1115G4</span>`
    let memory = document.createElement("div");
    memory.innerHTML = `<i class="fa-solid fa-ruler-horizontal"></i> <span>${element.ram}, DDR4, 2666 MHz</span>`
    let harddrive = document.createElement("div");
    harddrive.innerHTML = `<i class="fa-solid fa-hard-drive"></i> <span>${element.rom}, M.2, PCIe NVMe, SSD</span>`
    let size = document.createElement("div");
    size.innerHTML = `<i class="fa-solid fa-display"></i> <span>${element.screensize}-inch. display Full HD (1920X1080)</span>`
    let color = document.createElement("p");
    color.textContent = "Colour : "+element.color;
    let productline = document.createElement("p");
    productline.textContent = "Productline : "+element.productline;
    let button = document.createElement("button");
    button.textContent = "Add to Cart";

    button.addEventListener("click",()=>{
        let cart=JSON.parse(localStorage.getItem("cart"))||[];

        let temp=[];
        temp.push(element);
        temp.push(1);
        cart.push(temp);

        localStorage.setItem("cart",JSON.stringify(cart));
        alert("Product added to cart");
       

    })
    let cartTotal = document.getElementById("cart_container");
    cartTotal.textContent = cart.length;
    let mediacartTotal = document.getElementById("media_cart_container");
    mediacartTotal.textContent = cart.length;
    
    card.append(img,title,price1,price2,price3,processor,memory,harddrive,size,color,productline,button);
    container.append(card);
  });
}

//  ---------------------functionality for search bar -------------------------

function sortbyprice(){
    let select = sort.value;
    if(select===""){
        renderCards(storeData);
    }else{
        if(select === "Highest_Price"){
            storeData = storeData.sort(function(a,b){
               return b.price-a.price;
            });
          }
          else if(select === "Lowest_Price"){
              storeData = storeData.sort(function(a,b){
                  return a.price-b.price;
               });
          }
          
          renderCards(storeData);
    }
    

}

// ------------------------Functionality for search bar ------------------------

function searchbytitle(){
    console.log("yes");
        let input = document.querySelector("#input_search").value;
        let searchinput = storeData.filter((element) =>{
            return element.name.toLowerCase().includes(input.toLowerCase())
        });
        renderCards(searchinput);
    
    
}
// -------------functionalities for filter starts here ----------------
// -----------------------Functionality for productline filter --------------------

let productline = document.querySelectorAll(".productline");
    for(let itm of productline){
        itm.addEventListener("change",productlinefilter);
    }

    function productlinefilter(e){
     let select = e.target.value;
     if(e.target.checked){
        let newArr = storeData.filter(function(element){
            if(select == "Inspiron"){
                return element.productline === select;
            }
            else if(select == "Vostro"){
                return element.productline === select;
            }
            else{
                return element.productline === select;
            }
        })
        renderCards(newArr);
     }else{
        renderCards(storeData);
     }
    }

    // ------------------------------ functionality for memory filter -----------------------

    let memory = document.querySelectorAll(".memory");
    for(let itm of memory){
        itm.addEventListener("change",memoryFilter);
    }

    function memoryFilter(e){
     let select = e.target.value;
     if(e.target.checked){
        let newArr = storeData.filter(function(element){
            if(select == "8GB"){
                return element.ram === select;
            }
            else if(select == "16GB"){
                return element.ram === select;
            }
            else{
                return element.ram === select;
            }
        })
        renderCards(newArr);
     }else{
        renderCards(storeData);
     }
    }

// ----------------------------functionality for harddrive --------------------------

    let rom = document.querySelectorAll(".harddrive");
    for(let itm of rom){
        itm.addEventListener("change",romFilter);
    }

    function romFilter(e){
     let select = e.target.value;
     if(e.target.checked){
        let newArr = storeData.filter(function(element){
            if(select == "256GB"){
                return element.rom === select;
            }
            else if(select == "512GB"){
                return element.rom === select;
            }
            else{
                return element.rom === select;
            }
        })
        renderCards(newArr);
     }else{
        renderCards(storeData);
     }
    }

    // ------------------------functionality for price ---------------------

    let price = document.querySelectorAll(".price");
    for(let itm of price){
        itm.addEventListener("change",priceFilter);
    }

    function priceFilter(e){
     let select = e.target.value;
     if(e.target.checked){
        let newArr = storeData.filter(function(element){
            if(select == "10,000-50,000"){
                return element.price > 10000 && element.price <= 50000;
            }
            else if(select == "50,000-1,00,000"){
                return element.price > 50000 && element.price <= 100000;
            }
            else if(select == "1,00,000-1,50,000"){
                return element.price > 100000 && element.price <= 150000;
            }else{
                return element.price>150000;
            }
        })
        renderCards(newArr);
     }else{
        renderCards(storeData);
     }
    }

// -------------------functionality for color ---------------------

    let color = document.querySelectorAll(".color");
    for(let itm of color){
        itm.addEventListener("change",colorFilter);
    }

    function colorFilter(e){
     let select = e.target.value;
     if(e.target.checked){
        let newArr = storeData.filter(function(element){
            if(select == "silver"){
                return element.color === select;
            }
            else if(select == "Black"){
                return element.color === select;
            }
            else if(select == "Grey"){
                return element.color === select;
            }
            else{
                return element.color === select;
            }
        })
        renderCards(newArr);
     }else{
        renderCards(storeData);
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