let tbody = document.getElementById("table");
let order = JSON.parse(localStorage.getItem("order"))||[];
let totalrevenue = document.getElementById("total_revenue");

renderrow(order);

function renderrow(data){

    let total = order.reduce(function(acc,itm){
       let price = +itm[0].price;
       let quantity = +itm[1];
       let totalPrice = price*quantity;
       acc += totalPrice;
       return acc;
    },0);
    totalrevenue.textContent = total;


    tbody.innerhtml = null;
    data.forEach((element,index) => {
        let row = document.createElement("tr");
        let name = document.createElement("td");
        name.textContent = element[0].name;
        let category = document.createElement("td");
        category.textContent = element[0].category;
        let productline = document.createElement("td");
        productline.textContent = element[0].productline;
        let price = document.createElement("td");
        price.textContent = element[0].price;
        let quantity = document.createElement("td");
        quantity.textContent = element[1];

        row.append(name,category,productline,price,quantity);
        tbody.append(row);
        
    });
}