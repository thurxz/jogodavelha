const board = document.getElementById("board");
const casinhas = board.getElementsByClassName("casinha");
const mensagem = document.getElementById("mensagem");

let jogadas = 0;
let jogoAtivo = true;

for (let i = 0; i < casinhas.length; i++) {
  casinhas[i].addEventListener('click', casinhaclick);
}

function casinhaclick() {
  if (!jogoAtivo) return;

  if (this.innerHTML === "") {
    if (jogadas % 2 === 0) {
      this.innerHTML = "X";
      this.classList.add("X");
    } else {
      this.innerHTML = "O";
      this.classList.add("O");
    }
    jogadas += 1;
    if (jogadas >= 5) {
      verificaGanhador();
    }
  }
}

function verificaGanhador() {
  const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combinacao of combinacoesVencedoras) {
    const [a, b, c] = combinacao;
    if (
      casinhas[a].innerHTML &&
      casinhas[a].innerHTML === casinhas[b].innerHTML &&
      casinhas[a].innerHTML === casinhas[c].innerHTML
    ) {
      casinhas[a].classList.add("vencedora");
      casinhas[b].classList.add("vencedora");
      casinhas[c].classList.add("vencedora");
      mostrarMensagem(`O jogador ${casinhas[a].innerHTML} venceu!`);
      jogoAtivo = false;
      return;
    }
  }

  if (jogadas === 9) {
    mostrarMensagem("Empate!");
    jogoAtivo = false;
  }
}

function mostrarMensagem(texto) {
  let segundos = 5;
  mensagem.innerHTML = `${texto}<br>Reiniciando o jogo em ${segundos} segundos...`;
  
  const intervalo = setInterval(() => {
    segundos--;
    if (segundos > 0) {
      mensagem.innerHTML = `${texto}<br>Reiniciando o jogo em ${segundos} segundos...`;
    } else {
      clearInterval(intervalo);
      reiniciarJogo();
    }
  }, 1000);
}

function reiniciarJogo() {
  for (let casinha of casinhas) {
    casinha.innerHTML = "";
    casinha.classList.remove("X", "O", "vencedora");
  }
  mensagem.innerHTML = "";
  jogadas = 0;
  jogoAtivo = true;
}
