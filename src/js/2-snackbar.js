// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", event => {

        event.preventDefault();

    createPromise(event)
        .then(data => {
            iziToast.show({
                position: 'topRight',
                color: 'green',
                title: 'OK',
                message: ` Fulfilled promise in ${data}ms`,
                iconUrl: './img/bi_check2-circle.svg',

            });        
        })
        .catch(error => {
            iziToast.show({
                position: 'topRight',
                color: 'red',
                title: 'Error',
                message: ` Rejected promise in ${error}ms`,
                iconUrl: './img/bi_x-octagon.svg',
            });        
    })
});

function createPromise(event) {
    const delay = event.currentTarget.elements.delay.value;
    const state = event.currentTarget.elements.state.value
    

        
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay)
            } else if (state === "rejected") {
                reject(delay)
            }

        }, delay)

    })
}