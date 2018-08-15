let numberOfSymbols= 8;
let symbols= [];
let cards= [];

function prepareSymbols () {
  for (let i=0; i< numberOfSymbols; i++) {
    let n = i+1;

  symbols.push(n, n)
  }
}

function shuffleSymbols() {
  for (let i=0; i< symbols.length; i++) {
    let random = Math.floor(Math.random() * symbols.length);

    let tmp = symbols[i];

    symbols[i] = symbols[random];
    symbols[random] = tmp;
  }
}

function renderCards(){
  let container = document.querySelector("#app");
  let template = document.querySelector("#card-template");

  symbols.forEach(symbol => { //dla kazdego symbolu
    let copy = template.cloneNode(true) //sklonuj ten element (deep?,bolean)

    copy.removeAttribute("id") // z kopi kartu usun atrybut o nazwie id (bo moze byc id tylko 1 na stronie)
    copy.querySelector(".back").innerText = symbol
    copy.dataset.symbol = symbol

    cards.push(copy)
    container.appendChild(copy)
  })
}

function addClickListeners(){
let selected = []
let matched = []

  cards.forEach(card => {
    card.addEventListener("click", function(){
        // sprawdzamy czy 2x kliknieta ta sama karta
        // lub kliknieta karta ktora wygrala
      if (selected.includes(card) || matched.includes(card)){
        return
      }
      // czy zaznaczone 2 karty
      if(selected.length === 2){
        selected[0].classList.remove("selected")
        selected[1].classList.remove("selected")

        selected = []

      }

      // zaznacz karte
      card.classList.add("selected")
      selected.push(card)

      // czy wygrana
      if(selected.length ===2 && selected[0].dataset.symbol === selected[1].dataset.symbol){
        selected[0].classList.remove("selected")
        selected[0].classList.add("matched")

        selected[1].classList.remove("selected")
        selected[1].classList.add("matched")

        matched.push(selected[0], selected[1])
      }
      if(matched.length === cards.length){
        alert("Wygrałeś! Dobra robota")

      }
    })
  })
}

prepareSymbols()
shuffleSymbols()
renderCards()
addClickListeners()

console.log(symbols)
