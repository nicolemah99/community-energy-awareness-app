const options = {
    // Required: API key
    key: 'OrhQTxAkTWCA0JCNZQJp8N9Z2NidJOCd',

    // Put additional console output
    verbose: true,

    // Optional: Initial state of the map
    lat: 66.989,
    lon: -162.5931,
    zoom: 8,
};

// Initialize Windy API
windyInit(options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff
    const { store, broadcast, picker } = windyAPI;
    const overlays = ['rain','wind', 'temp', 'clouds'];
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