let main_data=[]
const URL = "https://639eb5f95eb8889197eb9a64.mockapi.io/DELL";
let id=''
container=document.querySelector(".show-all-order")
fetch(URL)
.then(res=>res.json())
.then((data)=>{
    main_data=data
  renderCards(data);
});

function renderCards(data){
  container.innerHTML = null;
  date=data.reverse()
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
    let line=document.createElement("hr")
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
    let button_1 = document.createElement("button");
    button_1.textContent = "edit";
    button_1.addEventListener('click',()=>{
 location.replace('editProduct.html')
    })
    let button = document.createElement("button");

    button.textContent = "Delete";

    button.addEventListener("click",()=>{
     location.replace('editProduct.html')
   
    })
    card.append(img,img1,img2,line,title,price1,price2,price3,processor,memory,harddrive,size,color,productline,button_1,button);
    container.append(card);
  });
}
 

       function search(){ 
        let searched=document.querySelector("#input_search").value;
        console.log(searched)
        let new_data=main_data.filter((ele)=>{
          return ele.name.toLowerCase().includes(searched.toLowerCase())
        })
        console.log(new_data)
       renderCards(new_data)
      }
        
 function filter_handle(){
  let arr=[]
  var filter=document.querySelector(".filter").value;
 let filter_data=main_data.filter((ele)=>{
  if(ele.category.toLowerCase()==filter){
    arr.push(ele)
  }
  return arr;
 })
 renderCards(arr)
 }
function sorted(){
  var filter=document.querySelector(".filter").value;
  let sorted_data=main_data.sort((a,b)=>{

    if(filter=="lh"){
  return a.price-b.price
    }
    else if(filter="hl"){
      return b.price-a.price
    }
  })
  renderCards(sorted_data)
}


 
