const URL = "https://639eb5f95eb8889197eb9a64.mockapi.io/DELL";
let id=''
container=document.querySelector(".show-all-order")
fetch(URL)
.then(res=>res.json())
.then((data)=>{
    console.log(data);
  let newData = data.filter(function(element){
    return element;
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
    card.setAttribute("class","product-card-main");
    let img= document.createElement("img");
    img.setAttribute("src",element.image1);
    let img1= document.createElement("img");
    img1.setAttribute("src",element.image2);
    let img2= document.createElement("img");
    img2.setAttribute("src",element.image3);
    let title = document.createElement("h4");
    title.textContent = element.name;
    let price1 = document.createElement("p");
    price1.innerHTML = `Online Price:-₹${element.strikeoffprize}`
    let price2 = document.createElement("p");
    price2.innerHTML =`Normal Price:-₹${element.price}<br>Discount:-₹${discount}(${percentage}%)</span>`;
    let price3 = document.createElement("p");
    price3.textContent = "Price inclusive of GST. Free Delivery."
    let processor = document.createElement("div");
    processor.innerHTML = `Genration:-</i>11th Gen Intel® Core™ i3-1115G4`
    let memory = document.createElement("div");
    memory.innerHTML = `RAM:-${element.ram},DDR4, 2666 MHz</span>`
    let harddrive = document.createElement("div");
    harddrive.innerHTML = `ROM:-${element.rom},M.2,PCIe NVMe,SSD`
    let size = document.createElement("div");
    size.innerHTML = `Screen-Size${element.screensize}-inch. display Full HD (1920X1080)`
    let color = document.createElement("p");
    color.textContent = "Colour:"+element.color;
    let productline = document.createElement("p");
    productline.textContent = "Productline:"+element.productline;
    card.append(img,img1,img2,title,price1,price2,price3,processor,memory,harddrive,size,color,productline);
    container.append(card);
  });
}
let data_submit=document.querySelector("form")
  data_submit.addEventListener("submit",(event)=>{
    event.preventDefault()
   let obj={
    "name":document.querySelector("#p-name").value ,
    "image1":document.querySelector("#image-1").value ,
    "image2": document.querySelector("#image-2").value ,
    "image3":document.querySelector("#image-3").value  ,
    "ram":document.querySelector("#ram").value  ,
    "rom":document.querySelector("#rom").value  ,
    "productline":document.querySelector("#line").value ,
    "screensize": document.querySelector("#size").value ,
    "price":document.querySelector("#price").value  ,
    "color": document.querySelector("#color").value ,
    "description": document.querySelector("#Description").value ,
    "strikeoffprize": document.querySelector("#strikeoffprize").value ,
    "category":document.querySelector("#Category").value  
   }
   console.log(obj)
   function test(obj){
    let checking=true;
    for(let i in obj){
        if(obj[i]==""){
            checking=false
        }
    }
    return checking
   }
  let check=test(obj)
  console.log(check)
  if(check){
fetch(`${URL}/${id}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
       })
       .then((res)=>{
        return res.json()
       })
       .then((data)=>{
        console.log(data)
        location.reload()
       })
  }
  else{
    alert("Please Write Complete Information")
  }
   
  })
  
 
