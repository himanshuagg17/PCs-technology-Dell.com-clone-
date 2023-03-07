let data_submit=document.querySelector("#data-updata-in-server")
const URL = "https://639eb5f95eb8889197eb9a64.mockapi.io/DELL";

document.querySelector(".update-product").addEventListener("click",()=>{
  
    let x=document.querySelector(".update-data")
    x.classList.remove("show-data")
    x.classList.add("updata-data-1")
  console.log(x);})
  document.querySelector(".update-data span").addEventListener('click',()=>{
    let x=document.querySelector(".update-data")
    x.classList.remove("updata-data-1")
    x.classList.add("show-data")
    console.log(1)
  })
  data_submit.addEventListener("click",()=>{
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
    fetch(URL,{
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
       })
  }
  else{
    alert("Please Write Complete Information")
  }
   
  })
