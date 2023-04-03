const options = {
    // Required: API key
    key: 'OrhQTxAkTWCA0JCNZQJp8N9Z2NidJOCd', // REPLACE WITH YOUR KEY !!!

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 66.8969,
    lon: -162.5931,
    zoom: 8,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff
    const { store, broadcast, picker, utils } = windyAPI;
    const overlays = ['wind', 'temp'];
    let i = 0;

    setInterval(() => {
        i = i === 3 ? 0 : i + 1;
        store.set('overlay', overlays[i]);
    }, 5000);

    // Observe the most important broadcasts
    broadcast.on('paramsChanged', params => {
        console.log('Params changed:', params);
    });

    broadcast.on('redrawFinished', params => {
        console.log('Map was rendered:', params);
    });
    const { map } = windyAPI;
    // .map is instance of Leaflet map
    picker.on('pickerOpened', ({ lat, lon, values, overlay }) => {
        // -> 48.4, 14.3, [ U,V, ], 'wind'
        console.log('opened', lat, lon, values, overlay);

        const windObject = utils.wind2obj(values);
        console.log(windObject);
    });

    picker.on('pickerMoved', ({ lat, lon, values, overlay }) => {
        // picker was dragged by user to latLon coords
        console.log('moved', lat, lon, values, overlay);
    });

    picker.on('pickerClosed', () => {
        // picker was closed
    });

    store.on('pickerLocation', ({ lat, lon }) => {
        console.log(lat, lon);

        const { values, overlay } = picker.getParams();
        console.log('location changed', lat, lon, values, overlay);
    });

    // Wait since wather is rendered
    broadcast.once('redrawFinished', () => {
        // Opening of a picker (async)
        picker.open({ lat: 66.89399, lon: -162.59652 });
    });


});