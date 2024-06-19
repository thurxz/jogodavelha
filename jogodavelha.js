const board = document.getElementById("board")
const casinhas = board.getElementsByTagName("div")
const combinacoesVencedoras = [
    [0, 1, 2],  // Linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  // Colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // Diagonais
    [2, 4, 6]
];

let jogadas = 0;

for (let i=0; i<casinhas.length; i++) {
  console.log(casinhas[i])
  casinhas[i].addEventListener('click', casinhaclick)
}

function casinhaclick() {
    if(this.innerHTML == "") {
        if(jogadas%2 == 0) {
            this.innerHTML = "X";
        }else{
            this.innerHTML = "O"
    }
    jogadas +=1;
}
if(jogadas >=5){
    verificaGanhador()
}

}

function verificaGanhador() {
    for (let combinacao of combinacoesVencedoras) {
        let [a, b, c] = combinacao;
        if (casinhas[a].innerHTML !== "" &&
            casinhas[a].innerHTML === casinhas[b].innerHTML &&
            casinhas[a].innerHTML === casinhas[c].innerHTML) {
            
            // Casinhas vencedoras pintadas de verde
            casinhas[a].style.backgroundColor = 'green';
            casinhas[b].style.backgroundColor = 'green';
            casinhas[c].style.backgroundColor = 'green';

            // Identifica o vencedor
            let vencedor = casinhas[a].innerHTML;
            alert(`O jogador ${vencedor} venceu!`);

            // Desabilita o clique nas casinhas após o jogo terminar
            for (let casinha of casinhas) {
                casinha.removeEventListener('click', casinhaclick);
            }

            // Reinicia o jogo após 5 segundos
            setTimeout(() => {
                reiniciarJogo();
            }, 5000);

            return;
        }
    }
}

function reiniciarJogo() {
    // Limpa o conteúdo das casinhas
    for (let casinha of casinhas) {
        casinha.innerHTML = "";
        casinha.style.backgroundColor = ''; // Reseta a cor de fundo
    }

    // Reinicia as variáveis e eventos
    jogadas = 0;
    for (let casinha of casinhas) {
        casinha.addEventListener('click', casinhaclick);
    }
}

let tempoRestante = 5; // Tempo em segundos para reiniciar o jogo
let timerInterval; // Variável para armazenar o intervalo do temporizador
const temporizadorElemento = document.getElementById('temporizador');

function verificaGanhador() {
    for (let combinacao of combinacoesVencedoras) {
        let [a, b, c] = combinacao;
        if (casinhas[a].innerHTML !== "" &&
            casinhas[a].innerHTML === casinhas[b].innerHTML &&
            casinhas[a].innerHTML === casinhas[c].innerHTML) {
            
            // Casinhas vencedoras pintadas de verde
            casinhas[a].style.backgroundColor = 'green';
            casinhas[b].style.backgroundColor = 'green';
            casinhas[c].style.backgroundColor = 'green';

            // Identifica o vencedor
            let vencedor = casinhas[a].innerHTML;
            alert(`O jogador ${vencedor} venceu!`);

            // Desabilita o clique nas casinhas após o jogo terminar
            for (let casinha of casinhas) {
                casinha.removeEventListener('click', casinhaclick);
            }

            // Inicia o temporizador de contagem regressiva
            iniciarContagemRegressiva();

            return;
        }
    }
}

function iniciarContagemRegressiva() {
    temporizadorElemento.innerHTML = `Reiniciando em ${tempoRestante} segundos...`;
    timerInterval = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            temporizadorElemento.innerHTML = `Reiniciando em ${tempoRestante} segundos...`;
        } else {
            clearInterval(timerInterval); // Limpa o intervalo do temporizador
            reiniciarJogo(); // Reinicia o jogo
        }
    }, 1000); // A cada segundo (1000 milissegundos)
}

function reiniciarJogo() {
    // Limpa o conteúdo das casinhas
    for (let casinha of casinhas) {
        casinha.innerHTML = "";
        casinha.style.backgroundColor = ''; // Reseta a cor de fundo
    }

    // Reinicia as variáveis e eventos
    jogadas = 0;
    tempoRestante = 5; // Reinicia o tempo restante
    clearInterval(timerInterval); // Garante que o intervalo do temporizador seja limpo
    temporizadorElemento.innerHTML = ''; // Limpa o conteúdo do temporizador
    for (let casinha of casinhas) {
        casinha.addEventListener('click', casinhaclick);
    }
}
