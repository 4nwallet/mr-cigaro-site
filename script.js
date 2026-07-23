function createTodayTime(hour, minute = 0){

    let time = new Date();

    time.setHours(hour);
    time.setMinutes(minute);
    time.setSeconds(0);
    time.setMilliseconds(0);

    return time;

}



function updateDeliveryTimer(){

    const now = new Date();

    let targetTime;
let fixedTargetTime = null;
    



    // قبل از شروع سرویس
    if(
        now < createTodayTime(7,30)
    ){

        targetTime = createTodayTime(9,0);

    }



    // زمان فعالیت روزانه
else if(
    now >= createTodayTime(7,30) &&
    now < createTodayTime(18,0)
){

    if(!fixedTargetTime){

        fixedTargetTime = new Date(
            now.getTime() + (90 * 60 * 1000)
        );

    }


    targetTime = fixedTargetTime;

}



    // بعد از پایان سفارش گیری
    else {

        targetTime = createTodayTime(9,0);

        targetTime.setDate(
            targetTime.getDate() + 1
        );

    }



    let distance = targetTime - now;



    let hours = Math.floor(
        distance / (1000 * 60 * 60)
    );


    let minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        /
        (1000 * 60)
    );


    let seconds = Math.floor(
        (distance % (1000 * 60))
        /
        1000
    );



    document.getElementById("countdown").innerHTML =
        String(hours).padStart(2,"0")
        + ":" +
        String(minutes).padStart(2,"0")
        + ":" +
        String(seconds).padStart(2,"0");



    let message =
    document.getElementById("next-delivery");



    if(now >= createTodayTime(18,0)){

        message.innerHTML =
        "اولین ارسال فردا از ساعت ۹:۰۰ شروع می‌شود";

    }

    else if(now < createTodayTime(7,30)){

        message.innerHTML =
        "اولین ارسال امروز از ساعت ۹:۰۰ شروع می‌شود";

    }

    else{

        message.innerHTML =
        "سفارش شما در سریع‌ترین زمان ممکن ارسال می‌شود";

    }


}



updateDeliveryTimer();


setInterval(
    updateDeliveryTimer,
    1000
);
