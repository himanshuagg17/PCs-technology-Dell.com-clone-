let cart=JSON.parse(localStorage.getItem("cart"))||[];
let t=document.getElementById("saving");
let container=document.querySelector("#container");
let items=document.getElementById("items");
let coupon=document.getElementById("coupon");
let totalOrder=document.getElementById("orderValue");
let couponbtn=document.getElementById("couponbtn");

renderCards(cart);
let user = JSON.parse(localStorage.getItem("user"))||null;
let greet = document.getElementById("greet");
if(user!=null){
  greet.textContent = `Hi ${user.name}`;
}

function renderCards(data){
    container.innerHTML = null;

    let totalSavings=data.reduce(function(acc,item){
      let q=item[1];
      let p=+item[0].price;
      let discPrice=+item[0].strikeoffprize;
      let tot=q*(discPrice-p);
      acc+=tot;
      return acc;
    },0)
    t.textContent=totalSavings;


    let totalItems=data.reduce(function(acc,item){
      let q=item[1];
      
      acc+=q;
      return acc;
    },0)
    items.textContent=totalItems;

  
    let totalValue=data.reduce((acc,item)=>{
      let q1=item[1];
      let p1=+item[0].price;
      let tot1=p1*q1;
      acc+=tot1;
      return acc;
    },0)
    console.log(totalValue)
    totalOrder.textContent=totalValue;

    var currentDate = new Date();
    var threeDaysLater = new Date(currentDate.getTime() + 3*24*60*60*1000).toLocaleDateString();
    let date=document.getElementById("date");
    date.textContent= threeDaysLater;

    // let totalCost=JSON.parse(localStorage.getItem("total"))||[];
    // totalCost.push(totalValue);
    // eventlistener on clicking the checkout button
    



    data.forEach((element,index) =>{

      
      let discount = (+element[0].strikeoffprize)-(+element[0].price);
      let percentage = (((element[0].strikeoffprize - +element[0].price)/+element[0].strikeoffprize)*100).toFixed(0);
  
      let card = document.createElement("div");
      card.setAttribute("class","product_card");
      let img= document.createElement("img");
      img.setAttribute("src",element[0].image1);
      let title = document.createElement("h2");
      title.textContent = element[0].name;
      let price1 = document.createElement("p");
      price1.innerHTML = `Online Price <span>₹${element[0].strikeoffprize}</span>`
      let price2 = document.createElement("p");
      price2.innerHTML =`<span><b>₹${element[0].price}</b></span> Save <span style="color:green">₹${discount}(${percentage}%)</span>`;
      let price3 = document.createElement("p");
      price3.textContent = "Price inclusive of GST. Free Delivery."
      let processor = document.createElement("div");
      processor.innerHTML = `<i class="fa-solid fa-microchip"></i> <span>11th Gen Intel® Core™ i3-1115G4</span>`
      let memory = document.createElement("div");
      memory.innerHTML = `<i class="fa-solid fa-ruler-horizontal"></i> <span>${element[0].ram}, DDR4, 2666 MHz</span>`
      let harddrive = document.createElement("div");
      harddrive.innerHTML = `<i class="fa-solid fa-hard-drive"></i> <span>${element[0].rom}, M.2, PCIe NVMe, SSD</span>`
      let size = document.createElement("div");
      size.innerHTML = `<i class="fa-solid fa-display"></i> <span>${element[0].screensize}-inch. display Full HD (1920X1080)</span>`
    let color = document.createElement("p");
    color.textContent = "Colour : "+element[0].color;
    let productline = document.createElement("p");
    productline.textContent = "Productline : "+element[0].productline;


    // let itemprice=document.createElement("h1");
    // itemprice.textContent=element[0].price;
    let quantity=document.createElement("span");
    quantity.textContent=element[1];

    let add=document.createElement("button");
    add.textContent="+";
    add.style.padding = "10px"
    add.style.marginRight = "5px";
    add.addEventListener("click",()=>{
        increment(element,quantity,index);
    })

    
    

    let subtract=document.createElement("button");
    subtract.textContent="-";
    subtract.style.padding = "10px";
    subtract.style.marginLeft = "5px";
    subtract.addEventListener("click",()=>{
        decrement(element,quantity,index);
    })



   
    card.append(img,title,price1,price2,price3,processor,memory,harddrive,size,color,productline,add,quantity,subtract);
    container.append(card);
  });
}


let checkout = document.getElementById("checkout");
checkout.addEventListener("click",()=>{
    checkouttoaddress();
})

    function checkouttoaddress(){
      if(user!=null){
      let TotalValue = totalOrder.textContent;
      let TotalItems = items.textContent;
      let TotalSaving = t.textContent;
      localStorage.setItem("totalbill",TotalValue);
      localStorage.setItem("totalitem",TotalItems)
      localStorage.setItem("totalsaving",TotalSaving)
      window.location.assign("address.html");
      }else{
        window.location.assign("login.html");
      }
    }

function increment(element,span,index){
      element[1]++;
      localStorage.setItem("cart",JSON.stringify(cart));
      renderCards(cart);
}

function decrement(element,span,index){
  if(element[1]>1){
    element[1]--;
    localStorage.setItem("cart",JSON.stringify(cart));
    renderCards(cart);
   }else{
    deletefromcart(element,index)
   } 
}


function deletefromcart(element,index){
  cart.splice(index,1);
  localStorage.setItem("buy",JSON.stringify(cart));
  renderCards(cart);

}

couponbtn.addEventListener("click",function(){
  let totalValue = totalOrder.textContent;
  if(coupon.value==="republic"){
    totalOrder.textContent=totalValue-0.2*totalValue;
  }
  
    // totalOrder.textContent=totalValue-0.2*totalValue;
})
   
