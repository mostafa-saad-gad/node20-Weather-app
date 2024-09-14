//console.log('Client side Javascript file is loaded');

const weatherForm = document.querySelector('form');
const locationInp = document.querySelector('input');
const p1 = document.getElementById('p-1');
const p2 = document.getElementById('p-2');
weatherForm.addEventListener('submit', (e) => {
        p1.textContent="Loading ...";
        p2.textContent="";
       e.preventDefault();
       const location = locationInp.value;

        fetch(`http://localhost:3000/weather?location=${location}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    return p1.textContent = data.error;
                }
                p1.textContent = data.label;
                p2.textContent = data.forcast;
            })
        })

});
