// ======================================
// تنظیمات
// ======================================

const INITIAL_TIME = 90 * 60;      // 90 دقیقه
const SAVE_TIME = 30 * 60;         // 30 دقیقه

const ORDER_KEY = "mrCigaroOrder";



// ======================================
// ساعت های کاری
// ======================================

const SERVICE_START = {
    hour: 7,
    minute: 30
};

const SERVICE_END = {
    hour: 18,
    minute: 0
};

const LAST_ORDER = {
    hour: 18,
    minute: 30
};

const FIRST_DELIVERY = {
    hour: 9,
    minute: 0
};



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



// ======================================
// اطلاعات سفارش
// ======================================

let orderData =
JSON.parse(
localStorage.getItem(ORDER_KEY)
);



// ======================================
// ساخت زمان
// ======================================

function createTime(hour, minute){

    let d = new Date();

    d.setHours(hour);

    d.setMinutes(minute);

    d.setSeconds(0);

    d.setMilliseconds(0);

    return d;

}



// ======================================
// وضعیت ساعت
// ======================================

function isServiceOpen(){

    const now = new Date();

    return (

        now >= createTime(

            SERVICE_START.hour,

            SERVICE_START.minute

        )

        &&

        now < createTime(

            SERVICE_END.hour,

            SERVICE_END.minute

        )

    );

}



function isLastOrderExpired(){

    const now = new Date();

    return now >= createTime(

        LAST_ORDER.hour,

        LAST_ORDER.minute

    );

}



// ======================================
// زمان باقی مانده تا 9 صبح
// ======================================

function getSecondsUntilNine(){

    const now = new Date();

    let target;

    if(

        now <

        createTime(

            SERVICE_START.hour,

            SERVICE_START.minute

        )

    ){

        target =

        createTime(

            FIRST_DELIVERY.hour,

            FIRST_DELIVERY.minute

        );

    }

    else{

        target =

        createTime(

            FIRST_DELIVERY.hour,

            FIRST_DELIVERY.minute

        );

        target.setDate(

            target.getDate()+1

        );

    }

    return Math.floor(

        (

            target-now

        )/1000

    );

}



// ======================================
// تبدیل ثانیه
// ======================================

function formatTime(seconds){

    let h = Math.floor(seconds/3600);

    let m = Math.floor(

        (seconds%3600)/60

    );

    let s = seconds%60;

    return (

        String(h).padStart(2,"0")

        + ":"

        +

        String(m).padStart(2,"0")

        + ":"

        +

        String(s).padStart(2,"0")

    );

}

// ======================================
// تایمر اولیه صفحه
// ======================================

function startPreviewTimer(){


    let remaining;


    if(isServiceOpen()){


        remaining = INITIAL_TIME;


    }

    else{


        remaining = getSecondsUntilNine();


    }



    const timer = setInterval(()=>{


        // اگر سفارش ثبت شده باشد
        // تایمر اولیه متوقف شود

        if(orderData){

            clearInterval(timer);

            return;

        }



        remaining--;



        // در ساعات کاری

        if(isServiceOpen()){


            if(remaining <= 0){


                remaining = INITIAL_TIME;


            }


        }


        // خارج از ساعات کاری

        else{


            if(remaining <= 0){


                remaining = getSecondsUntilNine();


            }


        }



        countdown.innerHTML =

        formatTime(remaining);



    },1000);


}




// ======================================
// تایمر بعد از کلیک واتساپ
// ======================================

function startOrderTimer(){


    const timer = setInterval(()=>{


        if(!orderData){


            clearInterval(timer);

            return;


        }




        let orderAge = Math.floor(


            (

                Date.now()

                -

                orderData.startTime


            )

            /

            1000


        );





        // اگر از 30 دقیقه گذشته باشد

        if(orderAge >= SAVE_TIME){



            localStorage.removeItem(

                ORDER_KEY

            );


            clearInterval(timer);


            location.reload();


            return;


        }





        let remaining =

        INITIAL_TIME - orderAge;





        // پایان تایمر 90 دقیقه

        if(remaining <= 0){


            localStorage.removeItem(

                ORDER_KEY

            );


            clearInterval(timer);


            location.reload();


            return;


        }





        countdown.innerHTML =

        formatTime(remaining);



    },1000);


}






// ======================================
// کنترل وضعیت صفحه
// ======================================

function checkPageStatus(){



    const now = new Date();





    // قبل از شروع سرویس

    if(

        now <

        createTime(

            SERVICE_START.hour,

            SERVICE_START.minute

        )

    ){



        if(statusBox){


            statusBox.innerHTML =

            "🟡 اولین ارسال امروز از ساعت ۹:۰۰ شروع می‌شود";


        }



        return;


    }





    // بعد از پایان زمان ثبت سفارش

    if(isLastOrderExpired()){



        if(statusBox){


            statusBox.innerHTML =

            "🔴 زمان ثبت سفارش امروز به پایان رسیده است";


        }




        if(whatsappBtn){


            whatsappBtn.disabled = true;


            whatsappBtn.style.opacity = "0.5";


            whatsappBtn.style.cursor =

            "not-allowed";


        }


        return;


    }





    // حالت عادی

    if(statusBox){


        statusBox.innerHTML =

        "🟢 آماده دریافت سفارش";


    }


}

// ======================================
// کلیک روی ثبت سفارش واتساپ
// ======================================

if(whatsappBtn){


    whatsappBtn.addEventListener(

    "click",

    function(){



        // اگر زمان ثبت سفارش گذشته باشد

        if(isLastOrderExpired()){



            statusBox.innerHTML =

            "🔴 زمان ثبت سفارش امروز به پایان رسیده است";


            return;


        }





        // ذخیره زمان کلیک

        if(!orderData){



            orderData = {


                startTime: Date.now()


            };



            localStorage.setItem(

                ORDER_KEY,

                JSON.stringify(orderData)

            );


        }





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


            "https://wa.me/98XXXXXXXXXX?text="

            +

            message;



        },500);




    });



}





// ======================================
// شروع صفحه
// ======================================

checkPageStatus();





if(orderData){


    startOrderTimer();


}

else{


    startPreviewTimer();


}




// ======================================
// بروزرسانی وضعیت
// ======================================

setInterval(()=>{


    checkPageStatus();


},10000);
