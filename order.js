// ===============================
// تنظیمات
// ===============================

const INITIAL_TIME = 90 * 60; // 90 دقیقه
const RESET_TIME = 30 * 60;   // 30 دقیقه


const ORDER_KEY = "mrCigaroOrder";



// ===============================
// عناصر صفحه
// ===============================

const countdown =
document.getElementById("countdown");


const whatsappBtn =
document.getElementById("whatsapp-btn");


const redirectMessage =
document.getElementById("redirect-message");


const newOrderBtn =
document.getElementById("new-order-btn");



// ===============================
// وضعیت سفارش
// ===============================

let orderData =
JSON.parse(localStorage.getItem(ORDER_KEY));



// ===============================
// تایمر اولیه صفحه
// ===============================

let pageStartTime =
Date.now();



// ===============================
// نمایش زمان
// ===============================

function formatTime(seconds){


    let hours =
    Math.floor(seconds / 3600);


    let minutes =
    Math.floor((seconds % 3600) / 60);


    let secs =
    seconds % 60;


    return (

        String(hours).padStart(2,"0")
        + ":"
        +
        String(minutes).padStart(2,"0")
        + ":"
        +
        String(secs).padStart(2,"0")

    );

}



// ===============================
// تایمر قبل از ثبت سفارش
// ===============================

function startPreviewTimer(){


    let remaining =
    INITIAL_TIME;


    setInterval(()=>{


        if(orderData){

            return;

        }


        remaining--;


        if(remaining < 0){

            remaining = INITIAL_TIME;

        }


        countdown.innerHTML =
        formatTime(remaining);



    },1000);


}




// ===============================
// تایمر سفارش واقعی
// ===============================

function startOrderTimer(){


    setInterval(()=>{


        if(!orderData){

            return;

        }



        let elapsed =
        Math.floor(
        (Date.now()-orderData.startTime)
        /1000);



        let remaining =
        INITIAL_TIME - elapsed;



        // پایان تایمر

        if(remaining <= 0){


            localStorage.removeItem(ORDER_KEY);

            location.reload();

            return;

        }



        // ریست بعد از نیم ساعت بی فعالیتی

        let inactive =
        Math.floor(
        (Date.now()-orderData.lastAction)
        /1000);



        if(inactive > RESET_TIME){


            localStorage.removeItem(ORDER_KEY);

            location.reload();

            return;


        }



        countdown.innerHTML =
        formatTime(remaining);



    },1000);



}





// ===============================
// کلیک واتساپ
// ===============================


whatsappBtn.addEventListener(
"click",
function(){



    if(!orderData){



        orderData = {


            startTime:Date.now(),

            lastAction:Date.now()


        };



        localStorage.setItem(

            ORDER_KEY,

            JSON.stringify(orderData)

        );


    }




    redirectMessage.style.display =
    "block";



    setTimeout(()=>{


        let message =
        encodeURIComponent(

`سلام 🌿

مایل به ثبت سفارش هستم.

🚬 برند:
📦 تعداد:
🏢 ساختمان:
🚪 شماره واحد:
📱 شماره تماس:`

        );



        window.location.href =

        "https://wa.me/98XXXXXXXXXX?text="
        + message;



    },500);



});





// ===============================
// سفارش جدید
// ===============================


newOrderBtn.addEventListener(
"click",
function(){


    localStorage.removeItem(ORDER_KEY);


    location.reload();


});




// ===============================
// شروع
// ===============================


if(orderData){


    startOrderTimer();


}
else{


    startPreviewTimer();


}
