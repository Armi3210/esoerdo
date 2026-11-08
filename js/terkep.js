const terkep = L.map('terkep', { scrollWheelZoom: false }).setView([4, 15], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap közreműködők',
    maxZoom: 18
}).addTo(terkep);

L.marker([-3.1, -60.0]).addTo(terkep).bindPopup('Amazonas-medence (Dél-Amerika)');
L.marker([-0.6, 21.8]).addTo(terkep).bindPopup('Kongó-medence (Közép-Afrika)');
L.marker([0.9, 114.0]).addTo(terkep).bindPopup('Délkelet-Ázsia esőerdei (Borneó térsége)');
