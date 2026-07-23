const deliverySchedule = [
    {
        orderUntil: "09:00",
        delivery: "10:۰۰ تا 11:۰۰"
    },
    {
        orderUntil: "10:00",
        delivery: "11:۰۰ تا 12:۰۰"
    },
    {
        orderUntil: "11:00",
        delivery: "12:۰۰ تا 13:۰۰"
    },
    {
        orderUntil: "13:00",
        delivery: "14:۰۰ تا 15:۰۰"
    },
    {
        orderUntil: "14:00",
        delivery: "15:۰۰ تا 16:۰۰"
    },
    {
        orderUntil: "15:00",
        delivery: "16:۰۰ تا 17:۰۰"
    },
    {
        orderUntil: "16:00",
        delivery: "17:۰۰ تا 18:۰۰"
    }
];


function convertTime(time) {

    const parts = time.split(":");

    const date = new Date();

    date.setHours(parts[0]);
    date.setMinutes(parts[1]);
    date.setSeconds(0);

    return date;

}



function updateDelivery() {

    const now = new Date();

    let nextDelivery = null;


    for (let item of deliverySchedule) {

        const deadline = convertTime(item.orderUntil);


        if (now < deadline) {

            nextDelivery = item;
            break;

        }

    }



    const deliveryText = document.getElementById("next-delivery");
    const countdown = document.getElementById("countdown");



    if (!nextDelivery) {

        deliveryText.innerHTML =
        "فردا ساعت ۱۰:۰۰ تا ۱۱:۰۰";

        countdown.innerHTML =
        "اولین بازه ارسال فردا";

        return;

    }



    deliveryText.innerHTML =
    "امروز " + nextDelivery.delivery;



    const endTime = convertTime(nextDelivery.orderUntil);


    const distance = endTime - now;


    const hours = Math.floor(distance / (1000 * 60 * 60));

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );



    countdown.innerHTML =
    String(hours).padStart(2,"0") + ":" +
    String(minutes).padStart(2,"0") + ":" +
    String(seconds).padStart(2,"0");

}



updateDelivery();

setInterval(updateDelivery,1000);
