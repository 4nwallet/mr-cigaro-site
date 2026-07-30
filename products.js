// ======================================
// محصولات آقای سیگارو
// فقط این قسمت را در آینده ویرایش کن
// ======================================

const productGroups = [

{

brand:"Winston",

products:[

{

name:"Winston Light",

price:220000,

image:"images/products/winston-light.jpg",

available:true,

show:true

},

{

name:"Winston Ultra",

price:220000,

image:"images/products/winston-ultra.jpg",

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

brand:"Compact",

products:[

{

name:"Compact",

price:190000,

image:"images/products/compact.jpg",

available:true,

show:true

}

]

}

];
// ======================================
// از اینجا به بعد چیزی را تغییر نده
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



const isSingleProduct = visibleProducts.length === 1;



const hasMoreProducts = visibleProducts.length > 3;



const productsToShow =

hasMoreProducts

?

visibleProducts.slice(0,3)

:

visibleProducts;



html+=`

<div class="brand-section ${isSingleProduct ? "single-product" : ""}">


<div class="brand-title">

${group.brand}

</div>


<div class="products-grid">

`;



productsToShow.forEach(product=>{

html+=createCard(product);

});



html+=`

</div>

`;



if(hasMoreProducts){

html+=`

<button class="show-more-products">

نمایش همه محصولات ${group.brand}

</button>

`;

}



html+=`

</div>

`;

});


container.innerHTML=html;
});

container.innerHTML=html;

