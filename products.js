// ======================================
// محصولات آقای سیگارو
// فقط این قسمت را در آینده ویرایش کن
// ======================================

const productGroups = [

{
brand:"Winston",

products:[

{
name:"Winston XStyle",
price:220000,
image:"images/products/winston-xstyle.jpg",
available:true,
show:true
}

]

},


{
brand:"Marlboro",

products:[

{
name:"Marlboro Gold Touch",
price:240000,
image:"images/products/marlboro-gold-touch.jpg",
available:true,
show:true
}

]

},


{
brand:"Kent",

products:[

{
name:"Kent Nano",
price:230000,
image:"images/products/kent-nano.jpg",
available:true,
show:true
}

]

},


{
brand:"Napoli",

products:[

{
name:"Napoli",
price:200000,
image:"images/products/napoli.jpg",
available:true,
show:true
}

]

},


{
brand:"Camel",

products:[

{
name:"Camel Blue",
price:220000,
image:"images/products/camel-blue.jpg",
available:true,
show:true
}

]

},


{
brand:"Esse",

products:[

{
name:"Esse Change",
price:210000,
image:"images/products/esse-change.jpg",
available:true,
show:true
}

]

}

];


// ======================================
// نمایش محصولات
// ======================================


const container =
document.getElementById("products-container");


function formatPrice(price){

return price.toLocaleString("fa-IR")+" تومان";

}


function createCard(product){

if(!product.show){

return "";

}

return `

<div class="product-card">

<img

src="${product.image}"

class="product-image"

alt="${product.name}">

<div class="product-body">

<div class="product-name">

${product.name}

</div>


${
product.available

?

`<div class="product-price">

${formatPrice(product.price)}

</div>`

:

`<div class="out-of-stock">

❌ ناموجود

</div>`

}


</div>

</div>

`;

}



let html="";


productGroups.forEach(group=>{


const visibleProducts =

group.products.filter(p=>p.show);



if(visibleProducts.length===0){

return;

}



html+=`

<div class="brand-section">


<div class="brand-title">

${group.brand}

</div>


<div class="products-grid">

`;



visibleProducts.forEach(product=>{

html+=createCard(product);

});


html+=`

</div>

</div>

`;

});


container.innerHTML=html;
