const deliverySchedule = [
    {
        start: "10:00",
        end: "11:00",
        label: "امروز ساعت ۱۰:۰۰ تا ۱۱:۰۰"
    },
    {
        start: "11:00",
        end: "12:00",
        label: "امروز ساعت ۱۱:۰۰ تا ۱۲:۰۰"
    },
    {
        start: "12:00",
        end: "13:00",
        label: "امروز ساعت ۱۲:۰۰ تا ۱۳:۰۰"
    },
    {
        start: "14:00",
        end: "15:00",
        label: "امروز ساعت ۱۴:۰۰ تا ۱۵:۰۰"
    },
    {
        start: "15:00",
        end: "16:00",
        label: "امروز ساعت ۱۵:۰۰ تا ۱۶:۰۰"
    },
    {
        start: "16:00",
        end: "17:00",
        label: "امروز ساعت ۱۶:۰۰ تا ۱۷:۰۰"
    },
    {
        start: "17:00",
        end: "18:00",
        label: "امروز ساعت ۱۷:۰۰ تا ۱۸:۰۰"
    }
];



function createTime(time, tomorrow = false){

    let date = new Date();

    let parts = time.split(":");

    date.setHours(parts[0]);
    date.setMinutes(parts[1]);
    date.setSeconds(0);
    date.setMilliseconds(0);


    if(tomorrow){

        date.setDate(date.getDate()+1);

    }


    return date;

}



function updateDelivery(){

    const now = new Date();


    let selectedDelivery = null;


    for(let item of deliverySchedule){

        let endTime = createTime(item.end);


        if(now < endTime){

            selectedDelivery = item;
            break;

        }

    }



    const deliveryText =
    document.getElementById("next-delivery");


    const countdown =
    document.getElementById("countdown");



    if(selectedDelivery){


        deliveryText.innerHTML =
        selectedDelivery.label;



        let endTime =
        createTime(selectedDelivery.end);



        let distance =
        endTime - now;



        let hours =
        Math.floor(
            distance / (1000 * 60 * 60)
        );


        let minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            /
            (1000 * 60)
        );


        let seconds =
        Math.floor(
            (distance % (1000 * 60))
            /
            1000
        );



        countdown.innerHTML =
        String(hours).padStart(2,"0")
        + ":" +
        String(minutes).padStart(2,"0")
        + ":" +
        String(seconds).padStart(2,"0");


    }

    else{


        deliveryText.innerHTML =
        "اولین زمان تحویل سفارش شما<br>فردا ساعت ۱۰:۰۰ تا ۱۱:۰۰";



        let tomorrowEnd =
        createTime("11:00", true);



        let distance =
        tomorrowEnd - now;



        let hours =
        Math.floor(
            distance / (1000*60*60)
        );


        let minutes =
        Math.floor(
            (distance % (1000*60*60))
            /(1000*60)
        );


        let seconds =
        Math.floor(
            (distance % (1000*60))
            /1000
        );


        countdown.innerHTML =
        String(hours).padStart(2,"0")
        + ":" +
        String(minutes).padStart(2,"0")
        + ":" +
        String(seconds).padStart(2,"0");

    }

}



updateDelivery();

setInterval(updateDelivery,1000);
