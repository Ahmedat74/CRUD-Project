
let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mood = 'create';
let tmp;

function GetTotal(){
    if(price.value!=''){
      let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
      total.innerHTML = result;
      total.style.background = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
let Products;

if(localStorage.getItem('Products') != null){
    Products = JSON.parse(localStorage.getItem('Products'))
}
else{
    Products = [];
}


submit.onclick = function()
{
    let object = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
   if(title.value != ''&& count.value <100){
     if(mood === 'create'){
        if(object.count > 1){
            for(let i = 0; i < object.count; i++){
                Products.push(object);
            }
        }else{
            Products.push(object);
        }
        
        
    }else{
            Products[tmp] = object;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
   }
    localStorage.setItem('Products', JSON.stringify(Products))
    ClearData();
    ShowData(); 
   
}
function ClearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function ShowData(){
    let table = '';
    for(let i = 0; i < Products.length; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${Products[i].title}</td>
        <td>${Products[i].price}</td>
        <td>${Products[i].taxes}</td>
        <td>${Products[i].ads}</td>
        <td>${Products[i].discount}</td>
        <td>${Products[i].total}</td>
        <td>${Products[i].category}</td>
        <td><button onclick="UpdateData(${i})">Update</button></td>
        <td><button onclick="DeleteData(${i})">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    if(Products.length > 0){
      let btn = document.getElementById('delete').innerHTML = `<button onclick="DeleteAll()">Delete All(${Products.length})</button>`
      document.getElementById('delete').style.display = 'block'
      
    }
    else{
        document.getElementById('delete').style.display = 'none'
    }
}

function DeleteData(i){
    Products.splice(i,1);
    localStorage.Products = JSON.stringify(Products);
    ShowData();

}
function DeleteAll(){
    localStorage.clear();
    Products.splice(0);
    ShowData();
}
function UpdateData(i){
    title.value = Products[i].title;
    price.value = Products[i].price;
    taxes.value = Products[i].taxes;
    ads.value = Products[i].ads;
    discount.value = Products[i].discount;
    GetTotal();
    count.style.display = 'none';
    category.value = Products[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
    submit.onclick = function(){
        Products[i].title = title.value;
        Products[i].price = price.value;
        Products[i].taxes = taxes.value;
        Products[i].ads = ads.value;
        Products[i].discount = discount.value;
        Products[i].total = total.innerHTML;
        Products[i].category = category.value;
        
        localStorage.Products = JSON.stringify(Products);
        ClearData();
        ShowData();
        submit.innerHTML = 'Create';
        count.style.display = 'block';
        GetTotal();
    }
}
let search = 'title';
function GetSearch(id){
    let searchInput = document.getElementById('search');
    if(id == 'Item'){
        search = 'title';
        searchInput.placeholder = 'Search By Item';
    }else{
        search = 'category';
        searchInput.placeholder = 'Search By Category';
    }
    
    searchInput.focus();
    searchInput.value = '';
    ShowData();
}
function SearchData(value){
    let table = '';
    if(search == "title"){
        for(let i =0;i < Products.length; i++){
           if(  Products[i].title.toLowerCase().includes(value.toLowerCase())){
            table += `
        <tr>
        <td>${i+1}</td>
        <td>${Products[i].title}</td>
        <td>${Products[i].price}</td>
        <td>${Products[i].taxes}</td>
        <td>${Products[i].ads}</td>
        <td>${Products[i].discount}</td>
        <td>${Products[i].total}</td>
        <td>${Products[i].category}</td>
        <td><button onclick="UpdateData(${i})">Update</button></td>
        <td><button onclick="DeleteData(${i})">Delete</button></td>
        </tr>
        `
         
           }
        }
    }
    else{
        for(let i =0;i < Products.length; i++){
           if(  Products[i].category.toLowerCase().includes(value.toLowerCase())){
            table += `
        <tr>
        <td>${i+1}</td>
        <td>${Products[i].title}</td>
        <td>${Products[i].price}</td>
        <td>${Products[i].taxes}</td>
        <td>${Products[i].ads}</td>
        <td>${Products[i].discount}</td>
        <td>${Products[i].total}</td>
        <td>${Products[i].category}</td>
        <td><button onclick="UpdateData(${i})">Update</button></td>
        <td><button onclick="DeleteData(${i})">Delete</button></td>
        </tr>
        `
         
           }
        }


    }

     document.getElementById('tbody').innerHTML = table;
    }



ShowData();

