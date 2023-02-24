let pitanjaHtml = document.getElementById('pitanjaHtml');
let odgovoriHtml = document.getElementById('odgovoriHtml');
let btnSubmit = document.getElementById('submit');
let btnReset = document.getElementById('reset');

let pitanje1 = {
    pitanje: 'Glavni grad Turske je:',
    odgovori: ['Asmara', 'Atina', 'Ankara', 'Apia'],
    tacanOdg: 2
};

let pitanje2 = {
    pitanje: 'Glavni grad Tajlanda je:',
    odgovori: ['Bamako', 'Bangkok', 'Bishkek', 'Bejrut', 'Bern'],
    tacanOdg: 1
};

let pitanje3 = {
    pitanje: 'Glavni grad Irske je:',
    odgovori: ['Dakar', 'Dili', 'Dusanbe', 'Dublin'],
    tacanOdg: 3
};

let pitanje4 = {
    pitanje: 'Glavni grad Gane je:',
    odgovori: ['Abuja', 'Aman', 'Accra', 'Ashgabat', 'Amsterdam'],
    tacanOdg: 2
};

let pitanje5 = {
    pitanje: 'Glavni grad Malezije je:',
    odgovori: ['Kijev', 'Kingston', 'Kuala Lumpur'],
    tacanOdg: 2
};

let pitanje6 = {
    pitanje: 'Glavni grad Rusije je:',
    odgovori: ['Moskva', 'Muskat', 'Minsk', 'Maputo', 'Monrovia'],
    tacanOdg: 0
};

let pitanje7 = {
    pitanje: 'Glavni grad Kine je:',
    odgovori: ['Prag', 'Pretoria', 'Palikir', 'Peking', 'Pariz'],
    tacanOdg: 3
};

let pitanje8 = {
    pitanje: 'Glavni grad Grenade je:',
    odgovori: ["St. John's", 'Sucre', "St. George's", 'Stanley'],
    tacanOdg: 2
};

let pitanje9 = {
    pitanje: 'Glavni grad Tunisa je:',
    odgovori: ['Tripoli', 'Tunis', 'Tokio', 'Talin'],
    tacanOdg: 1
};

let pitanje10 = {
    pitanje: 'Glavni grad Malte je:',
    odgovori: ['Vilnius', 'Vaduz', 'Valletta', 'Victoria', 'Vatikan'],
    tacanOdg: 2
};

let pitanja = [pitanje1, pitanje2, pitanje3, pitanje4, pitanje5, pitanje6, pitanje7, pitanje8, pitanje9, pitanje10];



let prikaziPitanja = niz => {
    for (let i = pitanja.length - 1; i > 0; i--) {

        let j = Math.round(Math.random() * (i + 1));
        let stariBr = pitanja[i];
        pitanja[i] = pitanja[j];
        pitanja[j] = stariBr;
    }

    for (let i = 0; i < 5; i++) {
        let div = document.createElement('div');
        let pitanje = document.createElement('h3');
        let odgovori = document.createElement('p');

        pitanje.innerHTML = `${i + 1}. ${niz[i].pitanje}`;

        for (let j = 0; j < niz[i].odgovori.length; j++) {
            let odg = niz[i].odgovori[j];
            if (j == 0) {
                odgovori.innerHTML = `<input type="radio" name="pitanje${i}" id="${odg}" value = "${odg}" checked> ${odg} <br>`
            }
            else {
                odgovori.innerHTML += `<input type="radio" name="pitanje${i}" id="${odg}" value = "${odg}"> ${odg} <br>`
            }
        };

        div.append(pitanje);
        div.append(odgovori);
        pitanjaHtml.append(div);
    }
}


window.onload = prikaziPitanja(pitanja);


btnSubmit.addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
        let odgovor = document.querySelector(`input[name = 'pitanje${i}']:checked`);
        let p = document.createElement('p');

        if (odgovor.value == pitanja[i].odgovori[pitanja[i].tacanOdg]) {
            p.style.color = 'green';
            p.innerHTML += `Tačno ste odgovorili na ${i + 1}. pitanje`;
        }
        else {
            p.style.color = 'red';
            p.innerHTML += `Niste tačno odgovorili na ${i + 1}. pitanje`;
        }
        
        odgovoriHtml.append(p);
    }

    let disableRadio = document.querySelectorAll('input[type = radio]');
   
    disableRadio.forEach(el => {
        el.disabled = true;
    });
});


btnReset.addEventListener('click', () => {
    pitanjaHtml.innerHTML = '';
    odgovoriHtml.innerHTML = '';
    prikaziPitanja(pitanja);
});







