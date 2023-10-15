let meals = [

    {

        'sweet': 'Nr.1 Soguk Baklava',
        'infotag': 'pics.img/information.png',
        'description': 'Anders als normale Baklava, wird diese mit Milch Hergestellt',
        'prize': 20,
        'amount': 1,
    },
    {

        'sweet': 'Nr.2 Regular Baklava',
        'infotag': 'pics.img/information.png',
        'description': 'Mit standart Sirup',
        'prize': 12,
        'amount': 1,
    },
    {

        'sweet': 'Nr.3 Türkische Nuss Baklava',
        'infotag': 'pics.img/information.png',
        'description': 'wird mit sogenannter Antep Fistig Hergestellt',
        'prize': 15,
        'amount': 1,
    },
    {

        'sweet': 'Nr.4 Hasselnuss Baklava',
        'infotag': 'pics.img/information.png',
        'description': 'Anders als normale Baklava, wird diese mit Haselnus Creme Hergestellt',
        'prize': 13,
        'amount': 1,
    },
    {

        'sweet': 'Nr.22 Standart Künefe',
        'infotag': 'pics.img/information.png',
        'description': 'Künefe mit Süss Sirup Übergossen',
        'prize': 8,
        'amount': 1,
    },
    {

        'sweet': 'Nr.21 Schoko Künefe',
        'infotag': 'pics.img/information.png',
        'description': 'Künefe mit Schoko Sosse Übergossen',
        'prize': 10,
        'amount': 1,
    },
    {

        'sweet': 'Nr.20 Hasselnuss Künefe',
        'infotag': 'pics.img/information.png',
        'description': 'Künefe mit Nougat Sosse Übergossen',
        'prize': 10,
        'amount': 1,
    },
]
let shoppingcart = [];

loadFromStorage()


function render() {   //baklava bestellungen
    let menuselection = document.getElementById('menuselection');
    menuselection.innerHTML = '';
    künefesweets()

    for (let i = 0; i < 4; i++) {
        let meal = meals[i];

        menuselection.innerHTML += ` 
        <div onclick="PayCalculation(${i})" class="mealspositioning">
           <div class="finetuning"> 
              <div class="nameofmeal"><b>${meal['sweet']}</b><img class="infomeals" src="${meal['infotag']}" alt="nicht da"></div>
              <div class="adding">+</div>
           </div>
           <div class="description"><p>${meal['description']}</p></div>
           <div class="pricetag"><b>${meal['prize']}€</b></div>
        </div>
        `;


    }
}
function künefesweets() {   //Künefe Bestellungen
    let künefe = document.getElementById('künefesweets');
    künefe.innerHTML = '';

    for (let j = 4; j < meals.length; j++) {
        let meal = meals[j];
        künefe.innerHTML += `
        <div onclick="PayCalculation(${j})" class="mealspositioning">
           <div class="finetuning"> 
              <div class="nameofmeal"><b>${meal['sweet']}</b><img class="infomeals" src="${meal['infotag']}" alt="nicht da"></div>
              <div class="adding">+</div>
           </div>
           <div class="description"><p>${meal['description']}</p></div>
           <div class="pricetag"><b>${meal['prize']}€</b></div>
        </div>
        `;
    }
}

function shoppingcartrender() {//rendern vom warenkorb
    if (shoppingcart.length === 0) {

    } else {
        //forschleife für bestellte informationen
        let orders = document.getElementById('orders')
        orders.innerHTML = '';

        for (let x = 0; x < shoppingcart.length; x++) {
            orders.innerHTML += `<div class="paymentdescription">${shoppingcart[x]['amount']}X <button onclick="deleteamount(${x})"" class="deletebtn">Löschen</button><br>${shoppingcart[x]['name']}:
        ${shoppingcart[x]['price']}€/kg</div>`;
        }
        //forschleife für bezahl container
        let finalpayment = document.getElementById('finalpayment')
        finalpayment.innerHTML = '';
        for (let y = 0; y < shoppingcart.length; y++) {
            finalpayment.innerHTML = `<div class="finalpayment">Zwischensumme:${cost()} €<br>
            Summe:  ${delievercost()}€<button class="paybutton">Bezahlen</button></div>`;
        }
    }
}


function PayCalculation(i) {//push in neue array
    let price = +meals[i]['prize'];
    let name = meals[i]['sweet'];
    let amount = meals[i]['amount'];
    if (shoppingcart.findIndex(meal => meal['name'] === name) > -1) {
        let names = shoppingcart.findIndex(meal => meal['name'] === name)
        let amounts = shoppingcart[names]['amount']
        let prices = shoppingcart[names]['price']
        shoppingcart[names]['amount'] = amounts + amount;
        shoppingcart[names]['price'] = prices + price;
        save();
        shoppingcartrender();
    } else {
        shoppingcart.push({ amount, name, price });
        save();
        shoppingcartrender();
    }
}

function cost() {//gesamtkosten
    let sum = 0;
    if (shoppingcart.length == 0) {

    } else {
        for (let z = 0; z < shoppingcart.length; z++) {
            let summe = +shoppingcart[z]['price'];
            sum = sum + summe;
        }
        return sum
    }
}

function delievercost() {//versandkosten return
    let sum = 0;
    if (shoppingcart.length == 0) {

    } else {
        for (let z = 0; z < shoppingcart.length; z++) {
            let summe = +shoppingcart[z]['price'];
            sum = sum + summe;

        }

        return sum + 2
    }
}

function deleteamount(x) {//bestellung löschen
    shoppingcart.splice(x, 1);
    document.getElementById('orders')
    document.getElementById('finalpayment')
    save()
    finalpayment.innerHTML = ''
    orders.innerHTML = ''
    shoppingcartrender()
}
function showpayment() {    //warenkorb für handys anzeigen
   document.getElementById('delievercontainer').classList.remove('d-none');
   document.getElementById('centerback').classList.remove('paymentvissible2');
   document.getElementById('backtomenu').classList.remove('paymentvissible');
  
}
function hidepayment(){
    document.getElementById('delievercontainer').classList.add('d-none');
   document.getElementById('backtomenu').classList.add('paymentvissible');
   document.getElementById('centerback').classList.add('paymentvissible2');
}
function save() {//abspeichern
    let mealsAsText = JSON.stringify(meals)
    let shoppingcartAsText = JSON.stringify(shoppingcart)
    localStorage.setItem('information', mealsAsText);
    localStorage.setItem('shoppingcart', shoppingcartAsText);
}

function loadFromStorage() { //laden
    let mealsAsText = localStorage.getItem('information');
    let shoppingcartAsText = localStorage.getItem('shoppingcart');
    if (mealsAsText && shoppingcartAsText) {
        meals = JSON.parse(mealsAsText);
        shoppingcart = JSON.parse(shoppingcartAsText);
    }

}