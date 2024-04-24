const blackjackCards = {
    "As": {
        isim: "As",
        deger: [1, 11], // As'ın değeri 1 veya 11 olabilir
        img: ["cards/A-C.png", "cards/A-D.png", "cards/A-H.png", "cards/A-S.png"]
    },
    "İki": {
        isim: "İki",
        deger: 2,
        img: ["cards/2-C.png", "cards/2-D.png", "cards/2-H.png", "cards/2-S.png"]
    },
    "Üç": {
        isim: "Üç",
        deger: 3,
        img: ["cards/3-C.png", "cards/3-D.png", "cards/3-H.png", "cards/3-S.png"]
    },
    "Dört": {
        isim: "Dört",
        deger: 4,
        img: ["cards/4-C.png", "cards/4-D.png", "cards/4-H.png", "cards/4-S.png"]
    },
    "Beş": {
        isim: "Beş",
        deger: 5,
        img: ["cards/5-C.png", "cards/5-D.png", "cards/5-H.png", "cards/5-S.png"]
    },
    "Altı": {
        isim: "Altı",
        deger: 6,
        img: ["cards/6-C.png", "cards/6-D.png", "cards/6-H.png", "cards/6-S.png"]
    },
    "Yedi": {
        isim: "Yedi",
        deger: 7,
        img: ["cards/7-C.png", "cards/7-D.png", "cards/7-H.png", "cards/7-S.png"]
    },
    "Sekiz": {
        isim: "Sekiz",
        deger: 8,
        img: ["cards/8-C.png", "cards/8-D.png", "cards/8-H.png", "cards/8-S.png"]
    },
    "Dokuz": {
        isim: "Dokuz",
        deger: 9,
        img: ["cards/9-C.png", "cards/9-D.png", "cards/9-H.png", "cards/9-S.png"]
    },
    "On": {
        isim: "On",
        deger: 10,
        img: ["cards/10-C.png", "cards/10-D.png", "cards/10-H.png", "cards/10-S.png"]
    },
    "Vale": {
        isim: "J",
        deger: 10,
        img: ["cards/J-C.png", "cards/J-D.png", "cards/J-H.png", "cards/J-S.png"]
    },
    "Kız": {
        isim: "Q",
        deger: 10,
        img: ["cards/Q-C.png", "cards/Q-D.png", "cards/Q-H.png", "cards/Q-S.png"]
    },
    "Papaz": {
        isim: "K",
        deger: 10,
        img: ["cards/K-C.png", "cards/K-D.png", "cards/K-H.png", "cards/K-S.png"]
    }
};

let degerler = ["As", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi", "Sekiz", "Dokuz", "On", "Vale", "Kız", "Papaz"];


let oyuncuSayiToplam = 0;
let kasaSayiToplam = 0;


let hitButton = document.querySelector('.hit');
let standButton = document.querySelector('.stand');
let cardDiv = document.querySelector('.cardDiv');

let oyuncuKartToplami = document.querySelector('.oyuncuKartToplami');
hitButton.disabled = true;
standButton.disabled = true;

// Başlangıç Bakiye Ayarları
let bakiye = 40000;
let betText = document.querySelector('.betText');


// Sesler

let winSound = document.querySelector('#win');
let loseSound = document.querySelector('#lose');
let bjSound = document.querySelector('#bjSound');




console.log(alert);

betText.textContent = bakiye;

// Bahis Ayarları
let bahisYapBtn = document.querySelector('#bahisYapBtn');
let bahisInput = document.querySelector('.bahisInput');
let bahisMiktariText = document.querySelector('.bahisMiktari');

let kurpiyerKartToplamText = document.querySelector('.kurpiyerKartToplamText');
let cardDivCourpier = document.querySelector('.cardDivCourpier');



// Para Çıkartma

function paraCikart() {

    if (bahisInput.value > bakiye) {
        bahisYapBtn.disabled = true;
    } else {
        let paraCikart = bahisInput.value;
        bakiye = bakiye - paraCikart;
        betText.textContent = bakiye;
    }
}

// Para Ekle

function paraEkle() {
    let bahisCek = Number(bahisMiktariText.textContent) * 2;
    bakiye = bakiye + bahisCek
    betText.textContent = bakiye;
    winSound.play();
}


function paraBerabere() {
    let bahisCek = Number(bahisMiktariText.textContent);
    bakiye = bakiye + bahisCek
    betText.textContent = bakiye;
}


bahisYapBtn.addEventListener('click', () => {



    if (bahisInput.value == '') {
        alert('Bahis Girmelisiniz');
    } else if (bahisInput.value < 1) {
        alert('Hatalı Bahis Miktarı');
        bahisInput.value = '';
    } else if (bahisInput.value > bakiye) {
        alert('Bakiyenizden Yüksek Bahis Girdiniz - Düşük Bahis Giriniz');
        bahisInput.value = '';
    }
    else {
        paraCikart();
        hitButton.disabled = false;
        bahisMiktariText.textContent = bahisInput.value;
        bahisYapBtn.disabled = true;
        bahisInput.value = '';
        bahisInput.disabled = true;
        winSound.stop();
        loseSound.stop();
        bjSound.stop();
        winSound.currentTime=0;
        loseSound.currentTime=0;
        bjSound.currentTime=0;

        rePlay();
        if(oyuncuSayiToplam <1){
            kasaAyarlar();
        }

    }

})

function rePlay() {
    cardDivCourpier.innerHTML = '';
    cardDiv.innerHTML = '';
    oyuncuSayiToplam = 0;
    kasaSayiToplam = 0;
    oyuncuKartToplami.textContent = 0; // Oyuncu kart toplamını sıfırla
    kurpiyerKartToplamText.textContent = 0; // Kurpiyer kart toplamını sıfırla
}




function oyunSonu() {
    hitButton.disabled = true;
    standButton.disabled = true;
    bahisInput.disabled = false;
    bahisYapBtn.disabled = false;
    console.log('Stand button disabled status:', standButton.disabled);
    console.log('Hit button disabled status:', hitButton.disabled);
}

function oyuncuAyarlar() {

    // random sayı oluştur ve kart seçtir
    let randomsayi = Math.floor(Math.random() * degerler.length);
    let kartSec = degerler[randomsayi];

    let kartSecRndm = Math.floor(Math.random() * 4)


    // Yeni Kart Yarat Ayarları
    let oyuncuYeniKart = document.createElement('img');
    oyuncuYeniKart.src = blackjackCards[`${kartSec}`].img[kartSecRndm];
    oyuncuYeniKart.className = 'card';
    cardDiv.appendChild(oyuncuYeniKart);

    // As Kontrolü

    if (blackjackCards[`${kartSec}`].isim === "As") {
        // As kartı 11 olarak oyuncunun toplamını 21'i geçerse, As 1 olarak sayılır.
        if (oyuncuSayiToplam + 11 > 21) {
            oyuncuSayiToplam += 1;
        } else {
            oyuncuSayiToplam += 11;
        }
    } else {
        // As değilse, kartın değerini doğrudan ekledim.
        oyuncuSayiToplam += blackjackCards[`${kartSec}`].deger;
    }

    // Oyuncu Sayı Toplamını güncelle
    oyuncuKartToplami.textContent = oyuncuSayiToplam;

    // İhtimaller

    if (oyuncuSayiToplam > 21) {
        loseSound.play();
        oyunSonu();
    } else if (oyuncuSayiToplam == 21) {
        paraEkle();
        bjSound.play();
        oyunSonu();
    }

}




function kasaAyarlar() {
    // random sayı oluştur ve kart seçtir
    let randomsayi = Math.floor(Math.random() * degerler.length);
    let kartSec = degerler[randomsayi];

    let kartSecRndm = Math.floor(Math.random() * 4)


    // Yeni Kart Yarat Ayarları
    let kasaYeniKart = document.createElement('img');
    kasaYeniKart.src = blackjackCards[`${kartSec}`].img[kartSecRndm];
    kasaYeniKart.className = 'kurpiyerKart';
    cardDivCourpier.appendChild(kasaYeniKart);

    // As Kontrolü

    if (blackjackCards[`${kartSec}`].isim === "As") {
        // As kartı 11 olarak oyuncunun toplamını 21'i geçerse, As 1 olarak sayılır.
        if (kasaSayiToplam + 11 > 21) {
            kasaSayiToplam += 1;
        } else {
            kasaSayiToplam += 11;
        }
    } else {
        // As değilse, kartın değerini doğrudan eklemek.
        kasaSayiToplam += blackjackCards[`${kartSec}`].deger;
    }

    // Oyuncu Sayı Toplamını güncelle
    kurpiyerKartToplamText.textContent = kasaSayiToplam;

    // İhtimaller


}


hitButton.addEventListener('click', () => {
    standButton.disabled = false;
    oyuncuAyarlar();

})


standButton.addEventListener('click', () => {
    hitButton.disabled = true;
    standButton.disabled = true;

    let mySetInt = setInterval(() => {
        kasaAyarlar();

        if (kasaSayiToplam > 21) {
            clearInterval(mySetInt);
            bahisInput.disabled = false;
            bahisYapBtn.disabled = false;
            paraEkle();
        } else if (kasaSayiToplam == oyuncuSayiToplam) {
            clearInterval(mySetInt);
            bahisInput.disabled = false;
            bahisYapBtn.disabled = false;
            paraBerabere();
        } else if (kasaSayiToplam > oyuncuSayiToplam) {
            clearInterval(mySetInt);
            bahisInput.disabled = false;
            bahisYapBtn.disabled = false;
            loseSound.play();
        } else if (kasaSayiToplam >= 17 && kasaSayiToplam < oyuncuSayiToplam) {
            clearInterval(mySetInt);
            bahisInput.disabled = false;
            bahisYapBtn.disabled = false;
            paraEkle();
        }

    }, 1000);
});