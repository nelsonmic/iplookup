let userInput = document.getElementById("user-input");

let button = document.getElementById('button');

let ipAddress = document.getElementById("ip");

let place = document.getElementById("place");

let timeZone = document.getElementById("timezone");

let isp = document.getElementById("isp");

let apiUrl = "https://geo.ipify.org/api/v1?apiKey=at_5q58clulHtKzICeJIdx4SddDK9943";


const updateMap=(latLng)=>{
    const map = L.map('map', {
        'center': latLng,
        'zoom': 13,
    })
    
    const tile = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZC1raW5nbmVsc29uIiwiYSI6ImNra3JsdXAyNzNnbW4ydnF0M29zeTBpNTcifQ.eTKSlSwhBIryjvZuFhR9pw'
    }).addTo(map);
    
    const marker = L.marker(latLng).addTo(map);
}

updateDisplay = (data)=>{
        ipAddress.innerHTML = data.ip;
        place.innerHTML = data.location.city;
        timeZone.innerHTML = data.location.timezone;
        isp.innerHTML = data.isp;
}

const updateLocation=(getUserInput)=>{
    if(getUserInput === undefined){
        apiUrl = apiUrl;
    }else{
        apiUrl = `${apiUrl}&ipAddress=${getUserInput}`;
    }

    fetch(apiUrl)
    .then(res => res.json())
    .then((data)=>{
        updateDisplay(data);
        updateMap([data.location.lat, data.location.lng]);
    console.log(data);
    })
    .catch(err => console.log(err));
};



document.addEventListener('load', updateLocation());

button.addEventListener('click', function(){
    updateLocation(userInput.value);
});


// fetch("https://github.com/nelsonmic/Qanda/blob/master/qanda-server/qandadb.json")
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(err => console.log(err));