let targetTime = null;


function createTodayTime(hour, minute = 0){

    let time = new Date();

    time.setHours(hour);
    time.setMinutes(minute);
    time.setSeconds(0);
    time.setMilliseconds(0);

    return time;

}



function getTargetTime(){

    const now = new Date();


    // قبل از شروع سرویس
    if(now < createTodayTime(7,30)){

        let start = createTodayTime(9,0);

        return start;

    }



    // زمان فعال سرویس
    if(
        now >= createTodayTime(7,30) &&
        now < createTodayTime(18,0)
    ){

        // فقط یک بار زمان هدف ساخته شود
        if(!targetTime){

            targetTime = new Date(
                now.getTime() + (90 * 60 * 1000)
            );

        }


        return targetTime;

    }



    // بعد از پایان سرویس
    let tomorrow = createTodayTime(9,0);

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    return tomorrow;

}




function updateDeliveryTimer(){

    const now = new Date();

    const endTime = getTargetTime();


    let distance = endTime - now;



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



    let text = document.getElementById("next-delivery");


    if(now < createTodayTime(7,30)){

        text.innerHTML =
        "اولین ارسال امروز از ساعت ۹:۰۰ شروع می‌شود";

    }

    else if(now >= createTodayTime(18,0)){

        text.innerHTML =
        "اولین ارسال فردا از ساعت ۹:۰۰ شروع می‌شود";

    }

    else{

        text.innerHTML =
        "سفارش شما در سریع‌ترین زمان ممکن ارسال می‌شود";

    }

}



updateDeliveryTimer();


setInterval(
    updateDeliveryTimer,
    1000
);
