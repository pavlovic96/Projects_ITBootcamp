
let ruze = document.getElementById('ruze');
let ljiljani = document.getElementById('ljiljani');
let gerberi = document.getElementById('gerberi');

let pokloni = document.getElementsByName('pokloni');
let placanje = document.getElementsByName('placanje');

let btnIzracunaj = document.getElementById('izracunaj');
let btnResetuj = document.getElementById('resetuj')

let picRuze = document.getElementById('ruze_pic');
let picLjiljani = document.getElementById('ljiljani_pic');
let picGerberi = document.getElementById('gerberi_pic');
let dodatak = document.getElementById('dodatak');

let bezPopusta = document.getElementById('bez_popusta');
let cena = document.getElementById('cena');
let greska = document.getElementById('greska');


btnIzracunaj.addEventListener('click', () => {
    let brRuze = ruze.value;
    let brLjiljani = ljiljani.value;
    let brGerberi = gerberi.value;
    let ukupnaCena = brRuze * 150 + brLjiljani * 120 + brGerberi * 70;

    picRuze.innerHTML = '';
    picLjiljani.innerHTML = '';
    picGerberi.innerHTML = '';
    dodatak.innerHTML = '';
    bezPopusta.innerHTML = '';
    cena.innerHTML = '';
    greska.innerHTML = '';

    if (brRuze % 1 == 0 && brLjiljani % 1 == 0 && brGerberi % 1 == 0 && brRuze >= 0 && brLjiljani >= 0 && brGerberi >= 0) {
        if (brRuze > 10) {
            picRuze.innerHTML = '<img src = "pictures/ruza.jpg">' + ' x ' + brRuze;
        }
        else {
            for (let i = 0; i < brRuze; i++) {
                picRuze.innerHTML += '<img src = "pictures/ruza.jpg">'
            }
        }
        if (brLjiljani > 10) {
            picLjiljani.innerHTML = '<img src = "pictures/ljiljan.png">' + ' x ' + brLjiljani;
        }
        else {
            for (let i = 0; i < brLjiljani; i++) {
                picLjiljani.innerHTML += '<img src = "pictures/ljiljan.png">'
            }
        }
        if (brGerberi > 10) {
            picGerberi.innerHTML = '<img src ="pictures/gerber.png">' + ' x ' + brGerberi;
        }
        else {
            for (let i = 0; i < brGerberi; i++) {
                picGerberi.innerHTML += '<img src ="pictures/gerber.png">'
            }
        }

        pokloni.forEach(poklon => {
            if (poklon.checked) {
                dodatak.innerHTML += `+ ${poklon.value} <br>`
                ukupnaCena += 500;
            }
        });

        placanje.forEach(plati => {
            if (plati.value == 'kes' && plati.checked) {
                cena.innerHTML = `Price: <span>${ukupnaCena} RSD.</span>`
            }
            if (plati.value == 'kartica' && plati.checked) {
                if (ukupnaCena > 2000) {
                    bezPopusta.innerHTML = `Price without discount: ${ukupnaCena} RSD.`;
                    cena.innerHTML = `Price with discount:<span> ${ukupnaCena * 0.9} RSD.</span>`
                }
                else {
                    cena.innerHTML = `<h2>Price: <span>${ukupnaCena} RSD.</span></h2>`
                }
            }
        });

    }
    else {
        greska.style.color = 'red';
        greska.innerHTML = 'Wrong input!'

    }

});

btnResetuj.addEventListener('click', () => {
    window.location.reload()
})


