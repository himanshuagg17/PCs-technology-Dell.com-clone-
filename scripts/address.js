
document.querySelector("button").addEventListener("click",()=>{
    let  fname=document.querySelector("#fname").value
    let  lname=document.querySelector("#lname").value
    let  company=document.querySelector("#company").value
    let  country=document.querySelector("#country").value
    let  address=document.querySelector("#address").value
    let  address_2=document.querySelector("#address-2").value
    let  city=document.querySelector("#city").value;
    let  state=document.querySelector("#state").value
    let  zip_code=document.querySelector("#zip-code").value;
    let  phone=document.querySelector("#phone").value
    let  email=document.querySelector("#email").value
let obj={
    fname:fname,
    lname:lname,
    conpany:company,
    country:country,
    address:address,
    address_2:address_2,
    city:city,
    state:state,
    zip_code:zip_code,
    phone:phone,
    email:email
}
if(obj.fname=="" || obj.lname=="" || obj.address=="" || obj.country=="" || obj.zip_code=="" || obj.phone=="" ||obj.email==""){
    alert("Please Fill Complete Details")
}
else{
    location.replace('payments.html')
}
console.log(obj)
})



let totalbill = localStorage.getItem("totalbill");
let totalsaving = localStorage.getItem("totalsaving");
let totalitem = localStorage.getItem("totalitem");



document.getElementById("totalbill").textContent = totalbill
document.getElementById("totalitem").textContent = totalitem
document.getElementById("totalsaving").textContent =  totalsaving