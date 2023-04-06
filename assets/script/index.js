'use strict';

//Open Menu
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

toggleBtn.addEventListener('click', function() {
    dropDownMenu.classList.toggle('start');
    const OPEN = dropDownMenu.classList.contains('start');

    toggleBtnIcon.classList = OPEN
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
})

mapboxgl.accessToken = 'pk.eyJ1IjoiY2F0Y2gyMi0iLCJhIjoiY2xnNWd6Y3VyMDNoMzNsbzd1N3pwM25tMCJ9.Lihja_tmPkwHGTslwKqcig';
const map = new mapboxgl.Map({
    container: 'map',
    /*style:'mapbox://styles/catch22-/clg5h7tct008j01o2v2uvyld2',*/
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    projection: 'globe'
});

const marker = new mapboxgl.Marker()
    .setLngLat([-97.19, 49.8]) 
    .addTo(map);

let long = '';
let lat = '';
const getLocation = () => new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
        position => {
            const location = [
                long = position.coords.longitude,
                lat = position.coords.latitude 
            ];
            marker.setLngLat([long, lat]) 
            console.log([long, lat]);
            map.flyTo({
                center: location,
                zoom: 17,
                speed: 0.8,
                essential: true
            })
            resolve(location);
        },
        err => reject(err)
    );
})

let wait = ms => new Promise(
    r => setTimeout(r, ms)
);
let repeat = (ms, func) => new Promise(
    r => (
        setInterval(func, ms),
        wait(ms).then(r)
    )
);

repeat(1500, () => Promise.all([getLocation()]))
    .catch(err => console.log('Geolocation encountered an error'));
