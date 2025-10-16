let valorUsuario = document.querySelector("#valor");
let moedaUsuario = document.querySelector("#moedas");
let btn = document.querySelector("#btn");

function pegarMoeda() {
    const moeda = moedaUsuario.value;

    if (moeda === "default") {
        alert("Selecione uma moeda!");
        return;
    }

    fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}`)
        .then((res) => res.json())
        .then((data) => {
            displayResultado(data, moeda);
        })
        .catch(() => alert("Erro ao buscar cotação"));
}

function displayResultado(data, moeda) {
    const chave = moeda.replace("-", "");
    const valorAtual = data[chave].bid;
    const cotacao = (valorAtual * Number(valorUsuario.value))
        .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const divRes = document.querySelector(".display-res");
    divRes.classList.add("style-container");

    divRes.innerHTML = `
    <div class="resultado">
      <p>${chave.replace("BRL", "")}$ ${valorUsuario.value} = ${cotacao}</p>
      <p>${cotacao} Reais</p>
    </div>`;
}

btn.addEventListener("click", pegarMoeda);
