const auswahl = document.querySelectorAll(".wahl");
const ergebnis = document.getElementById("ergebnis");
const restart = document.getElementById("restart");
const roundCon = document.getElementById("round");
const aktuellRound = document.getElementById("aktuell");
const roundAbsolut = document.getElementById("absolut");
const wrapper = document.getElementById("wrapper");
let limit = 0;

let scoreboard = {
  player: 0,
  computer: 0
};

// Spiel starten

function play(e) {
  const userChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const gewinner = getWinner(userChoice, computerChoice);
  getPunkte(gewinner);
  stant(userChoice, computerChoice, gewinner);
  let versuche = radio();
  roundAbsolut.innerHTML = versuche;
  wrapper.style.display = "none";
  roundCon.style.display = "block";

  if (limit < versuche) {
    limit++;
    aktuellRound.innerHTML = limit;
  }
  if (limit == versuche && scoreboard.player > scoreboard.computer) {
    document.getElementById("stant").innerHTML = "Du hast gewonnen!!!";
  } else if (limit == versuche && scoreboard.player < scoreboard.computer) {
    document.getElementById("stant").innerHTML = "Du hast verloren!!!";
  } else if (limit == versuche && scoreboard.player == scoreboard.computer) {
    document.getElementById("stant").innerHTML = "Unentschieden!!!";
  }
  console.log(versuche, limit, scoreboard.player);
}

// event listener/////
auswahl.forEach(wahl => wahl.addEventListener("click", play));
auswahl.forEach(wahl =>
  wahl.addEventListener("mouseout", e => {
    e.target.style.background = "";
  })
);

// zufallswahl des computers////
function getComputerChoice() {
  let x = Math.floor(Math.random() * 3);
  if (x == 1) {
    return "rock";
  } else if (x == 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

//funktion radio-button////

function radio() {
  const fünf = document.getElementById("fünf").checked;
  const zehn = document.getElementById("zehn").checked;
  const fünfZehn = document.getElementById("fünfZehn").checked;
  const zwanzig = document.getElementById("zwanzig").checked;

  if (fünf === true) {
    versuche = 5;
  } else if (zehn == true) {
    versuche = 10;
  } else if (fünfZehn == true) {
    versuche = 15;
  } else if (zwanzig == true) {
    versuche = 20;
  }
  return versuche;
}

// gewinner funktion////

function getWinner(user, computer) {
  if (user === computer) {
    return "unentschieden";
  } else if (user === "rock") {
    if (computer === "paper") {
      return "verloren";
    } else {
      return "gewonnen";
    }
  } else if (user === "paper") {
    if (computer === "scissors") {
      return "verloren";
    } else {
      return "gewonnen";
    }
  } else if (user === "scissors") {
    if (computer === "rock") {
      return "verloren";
    } else {
      return "gewonnen";
    }
  }
}

// funktion score/////
function getPunkte(gewinner) {
  if (gewinner == "gewonnen" && limit < versuche) {
    scoreboard.player++;
  } else if (gewinner === "verloren" && limit < versuche) {
    scoreboard.computer++;
  }
  document.getElementById("player").innerHTML = `${scoreboard.player}`;
  document.getElementById("computer").innerHTML = `${scoreboard.computer}`;
}
function stant(userChoice, computerChoice, gewinner) {
  if (gewinner === "gewonnen") {
    document.getElementById(
      "stant"
    ).innerHTML = `<h4>${userChoice}</h4><p>(user)</p><h2> beats</h2><h4> ${computerChoice}</h4><p> (computer)</p><h4>. You Win!!!</h4>`;
    document.getElementById(`${userChoice}`).style.background = "green";
  } else if (gewinner === "verloren") {
    document.getElementById(
      "stant"
    ).innerHTML = `<h4>${computerChoice}</h4><p>(computer)</p><h2> beats</h2><h4> ${userChoice}</h4><p> (user)</p><h4>. You Lose!!!</h4>`;
    document.getElementById(`${userChoice}`).style.background = "red";
    document.getElementById(`${computerChoice}`).style.background = "";
  } else {
    document.getElementById(
      "stant"
    ).innerHTML = `<h2> It was a Draw! You both choose </h2><h4>${computerChoice} !!!</h4>`;
  }
}

function restarten() {
  location.reload();
}
