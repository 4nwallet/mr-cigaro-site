// ======================================
// تنظیمات اصلی
// ======================================

const INITIAL_TIME = 90 * 60; // 90 دقیقه

const WHATSAPP_ACTIVE_TIME = 30 * 60; // 30 دقیقه

const ORDER_KEY = "mrCigaroOrder";


// ======================================
// اطلاعات قابل تغییر
// ======================================

const PAYMENT_CARD = "5041 7212 2230 0692";

const PAYMENT_OWNER = "داوود سلطانی";

const WHATSAPP_NUMBER = "989125246071";


// ======================================
// تعطیلات
// ======================================

// تاریخ ها با فرمت میلادی YYYY-MM-DD

const HOLIDAYS = [

    "2026-07-01",

    "2026-07-05"

];


// ======================================
// ساعت ها
// ======================================

const SERVICE_START_HOUR = 7;
const SERVICE_START_MINUTE = 30;


const SERVICE_END_HOUR = 18;
const SERVICE_END_MINUTE = 0;


const LAST_ORDER_HOUR = 18;
const LAST_ORDER_MINUTE = 30;


const FIRST_DELIVERY_HOUR = 9;
const FIRST_DELIVERY_MINUTE = 0;



// ======================================
// عناصر صفحه
// ======================================

const countdown =
document.getElementById("countdown");


const whatsappBtn =
document.getElementById("whatsapp-btn");


const redirectMessage =
document.getElementById("redirect-message");


const statusBox =
document.getElementById("status-box");


const paymentCard =
document.getElementById("payment-card");


const paymentOwner =
document.getElementById("payment-owner");


const copyHint =
document.getElementById("copy-hint");


const copyCardBtn =
document.getElementById("copy-card-btn");



// ======================================
// ساخت ساعت امروز
// ======================================

function createTodayTime(hour, minute){


    let time = new Date();


    time.setHours(hour);

    time.setMinutes(minute);

    time.setSeconds(0);

    time.setMilliseconds(0);


    return time;

}



// ======================================
// بررسی تعطیلی
// ======================================

function isHoliday(){


    const today = new Date();


    const date =

    today.getFullYear()

    + "-"

    + String(today.getMonth()+1).padStart(2,"0")

    + "-"

    + String(today.getDate()).padStart(2,"0");



    return HOLIDAYS.includes(date);


}

// ======================================
// فرمت تایمر
// ======================================

function formatTime(seconds){


    let hours =
    Math.floor(seconds / 3600);



    let minutes =
    Math.floor(
        (seconds % 3600) / 60
    );



    let secs =
    seconds % 60;



    return (

        String(hours).padStart(2,"0")

        +

        ":"

        +

        String(minutes).padStart(2,"0")

        +

        ":"

        +

        String(secs).padStart(2,"0")

    );


}




// ======================================
// بررسی ساعت سرویس
// ======================================

function isServiceActive(){


    const now = new Date();



    return (

        now >= createTodayTime(
            SERVICE_START_HOUR,
            SERVICE_START_MINUTE
        )

        &&

        now < createTodayTime(
            SERVICE_END_HOUR,
            SERVICE_END_MINUTE
        )

    );


}




// ======================================
// پایان زمان سفارش امروز
// ======================================

function isOrderClosed(){


    const now = new Date();


    return now >= createTodayTime(
        LAST_ORDER_HOUR,
        LAST_ORDER_MINUTE
    );


}




// ======================================
// گرفتن زمان باقی مانده تا 9 صبح
// ======================================

function getTimeUntilFirstDelivery(){


    const now = new Date();


    let target = createTodayTime(

        FIRST_DELIVERY_HOUR,

        FIRST_DELIVERY_MINUTE

    );



    if(now >= target){


        target.setDate(

            target.getDate() + 1

        );


    }



    return Math.floor(

        (target - now) / 1000

    );


}




// ======================================
// تایمر عادی صفحه
// ======================================

function startNormalTimer(){


    let remaining;



    if(isHoliday()){


        return;


    }




    if(isServiceActive()){


        remaining = INITIAL_TIME;


    }

    else{


        remaining = getTimeUntilFirstDelivery();


    }





    setInterval(()=>{



        if(localStorage.getItem(ORDER_KEY)){


            return;


        }



        if(isHoliday()){


            return;


        }




        remaining--;





        if(isServiceActive()){



            if(remaining <= 0){


                remaining = INITIAL_TIME;


            }


        }






        else{


            remaining =

            getTimeUntilFirstDelivery();


        }





        if(countdown){


            countdown.innerHTML =

            formatTime(remaining);


        }





    },1000);


}



// ======================================
// تایمر بعد از کلیک واتساپ
// ======================================

function startWhatsappTimer(){



    let orderData =

    JSON.parse(

        localStorage.getItem(ORDER_KEY)

    );





    if(!orderData){


        return;


    }





    setInterval(()=>{



        let passed = Math.floor(


            (

                Date.now()

                -

                orderData.clickTime


            )

            /

            1000


        );





        if(passed >= WHATSAPP_ACTIVE_TIME){



            localStorage.removeItem(

                ORDER_KEY

            );



            location.reload();



            return;


        }





        let remaining =


        INITIAL_TIME - passed;





        if(remaining <= 0){



            localStorage.removeItem(

                ORDER_KEY

            );



            location.reload();



            return;


        }





        if(countdown){


            countdown.innerHTML =

            formatTime(remaining);


        }




    },1000);



}




// ======================================
// تغییر وضعیت صفحه
// ======================================

function updateStatus(){



    if(!statusBox){


        return;


    }





    const now = new Date();





    // بررسی تعطیلی

    if(isHoliday()){



        statusBox.innerHTML =


        "🔴 امروز تعطیل هستیم<br><br>از فردا ساعت ۷:۳۰ آماده دریافت سفارش هستیم 🌿";





        if(whatsappBtn){



            whatsappBtn.disabled = true;


            whatsappBtn.style.opacity = "0.5";


            whatsappBtn.style.cursor =

            "not-allowed";


        }





        if(countdown){


            countdown.innerHTML =

            "--:--:--";


        }





        return;


    }






    if(

        now < createTodayTime(

            SERVICE_START_HOUR,

            SERVICE_START_MINUTE

        )

    ){



        statusBox.innerHTML =


        "🟡 اولین ارسال امروز از ساعت ۹:۰۰ شروع می‌شود";



        return;


    }





    if(isOrderClosed()){



        statusBox.innerHTML =


        "🔴 زمان ثبت سفارش امروز به پایان رسیده است";



        if(whatsappBtn){



            whatsappBtn.disabled = true;


            whatsappBtn.style.opacity = "0.5";


            whatsappBtn.style.cursor =

            "not-allowed";


        }





        return;


    }





    statusBox.innerHTML =


    "🟢 آماده دریافت سفارش";



}



// ======================================
// کلیک روی دکمه واتساپ
// ======================================

if(whatsappBtn){


    whatsappBtn.addEventListener(

    "click",

    function(){



        // جلوگیری از ثبت سفارش در روز تعطیل

        if(isHoliday()){



            updateStatus();


            return;


        }




        // اگر زمان سفارش تمام شده باشد

        if(isOrderClosed()){



            updateStatus();


            return;


        }






        let orderData = {


            clickTime: Date.now()


        };





        localStorage.setItem(

            ORDER_KEY,

            JSON.stringify(orderData)

        );






        if(redirectMessage){



            redirectMessage.style.display =

            "block";


        }






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


            "https://wa.me/" + WHATSAPP_NUMBER + "?text="

            +

            message;




        },500);





    });



}






// ======================================
// نمایش اطلاعات پرداخت
// ======================================

if(paymentCard){

    paymentCard.innerHTML =
    PAYMENT_CARD;

}




if(paymentOwner){

    paymentOwner.innerHTML =
    "به نام: " + PAYMENT_OWNER;

}






// ======================================
// کپی شماره کارت
// ======================================

if(copyCardBtn && copyHint){



    copyCardBtn.addEventListener(


    "click",


    function(){



        navigator.clipboard.writeText(

            PAYMENT_CARD

        );





        copyCardBtn.innerHTML =


        "✅ کپی شد";





        copyHint.innerHTML =


        "شماره کارت آماده پرداخت است";






        setTimeout(()=>{



            copyCardBtn.innerHTML =


            "📋 کپی شماره کارت";





            copyHint.innerHTML =


            "برای پرداخت، شماره کارت را کپی کنید";




        },2000);





    });



}


 
// ======================================
// شروع برنامه
// ======================================


updateStatus();





if(

    localStorage.getItem(ORDER_KEY)

){


    startWhatsappTimer();



}

else{


    startNormalTimer();



}






// ======================================
// بررسی وضعیت هر 10 ثانیه
// ======================================

setInterval(()=>{


    updateStatus();



},10000);
