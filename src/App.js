import { useState } from "react";

function Square({ value, noCliqueQuadrado }) {
  // O que está entre {} no argumento da função Square são propriedades
  return (
    <button className="square" onClick={noCliqueQuadrado}>
      {value}
    </button>
  );
}

//

function Board({ xIsNext, squares, onPlay }) {
  function ManipuladorClique(i) {
    if (squares[i] || CalculadoraVencedor(squares)) {
      return;
    }
    const proximosQuadrados = squares.slice();
    if (xIsNext) {
      proximosQuadrados[i] = "X";
    } else {
      proximosQuadrados[i] = "O";
    }
    onPlay(proximosQuadrados);
  }

  const vencedor = CalculadoraVencedor(squares);
  let status;
  if (vencedor) {
    status = `O vencedor é: ${vencedor}`;
  } else {
    status = "O próximo a jogar é: " + (xIsNext ? "X" : "O");
  }
  // Definindo uma função chamada Square.
  //Sobre as JavaScript Keywords: export ==> faz a função ser acessível fora deste arquivo.
  // default ==> explicita para outros arquivos do código que esta é a função principal do arquivo App.js.
  return (
    // retorna um valor para a chamada função.
    <>
      <div className="StatusJogo"> {status} </div>
      <div className="Espaco"> ... </div>
      <div className="quadro-linha">
        <Square
          value={squares[0]}
          noCliqueQuadrado={() => ManipuladorClique(0)}
        />
        <Square
          value={squares[1]}
          noCliqueQuadrado={() => ManipuladorClique(1)}
        />
        <Square
          value={squares[2]}
          noCliqueQuadrado={() => ManipuladorClique(2)}
        />
      </div>

      <div className="quadro-linha">
        <Square
          value={squares[3]}
          noCliqueQuadrado={() => ManipuladorClique(3)}
        />
        <Square
          value={squares[4]}
          noCliqueQuadrado={() => ManipuladorClique(4)}
        />

        <Square
          value={squares[5]}
          noCliqueQuadrado={() => ManipuladorClique(5)}
        />
      </div>

      <div className="quadro-lina">
        <Square
          value={squares[6]}
          noCliqueQuadrado={() => ManipuladorClique(6)}
        />
        <Square
          value={squares[7]}
          noCliqueQuadrado={() => ManipuladorClique(7)}
        />
        <Square
          value={squares[8]}
          noCliqueQuadrado={() => ManipuladorClique(8)}
        />
      </div>
    </>
    // cada div organiza a disposição dos quadrados em linhas diferentes
    /* Button é uma tag HTML/JS (JSX element). ClassName ==>
      propriedade do botão, mostra ao CSS como estilizar --> return ==> . //  // o botão, neste caso,
      como um quadrado. O que fica entre a abertura da tag button e seu
      fechamento é o texto que será exibido. X. */
  );
}

export default function Jogo() {
  const [historico, setHistorico] = useState([Array(9).fill(null)]);
  const [MovimentoAtual, setMovimentoAtual] = useState(0);
  const QuadradoAtual = historico[MovimentoAtual];
  const xIsNext = MovimentoAtual % 2 === 0;
  //
  function ManipuladorJogo(proximosQuadrados) {
    const ProximoHistorico = [
      ...historico.slice(0, MovimentoAtual + 1),
      proximosQuadrados,
    ];
    setHistorico(ProximoHistorico);
    setMovimentoAtual(ProximoHistorico.length - 1);
  }

  function PularPara(ProximoMovimento) {
    setMovimentoAtual(ProximoMovimento);
  }

  const Movimentos = historico.map((squares, movimento) => {
    let descricao;
    if (movimento > 0) {
      descricao = "Vá para o movimento " + movimento;
    } else {
      descricao = "Vá para o início do jogo";
    }
    return (
      <li key={movimento}>
        <button onClick={() => PularPara(movimento)}>{descricao}</button>
      </li>
    );
  });

  return (
    <div className="jogo">
      <div className="jogo-quadro">
        <Board
          xIsNext={xIsNext}
          squares={QuadradoAtual}
          onPlay={ManipuladorJogo}
        />
      </div>
      <div className="InformacaoJogo">
        <ol> {Movimentos} </ol>
      </div>
    </div>
  );
}

//Função para calcular o vencedor da disputa. Se o "X" ou o "O" ou "empateNull"
function CalculadoraVencedor(squares) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
