const apiKey = '1ab83bf0';

function adicionarMensagemUsuario(texto) {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<div class="msg usuario">${texto}</div>`;
}

function adicionarMensagemBot(texto) {
    const chat = document.getElementById("chat");
    chat.innerHTML += `<div class="msg bot">${texto}</div>`;
}


function enviarMensagem() {
    const input = document.getElementById("mensagem");
    const texto = input.value.trim();

    if (texto === "") return;

    adicionarMensagemUsuario(texto);
    input.value = "";

    if (texto.startsWith("/filme ")) {
        const titulo = texto.replace("/filme ", "").trim();
        buscarFilmeBot(titulo);
    } else {
        adicionarMensagemBot("Comando não reconhecido. Tente: /filme NomeDoFilme");
    }
}


async function buscarFilmes(termo) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(termo)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        const data = await response.json();

        if (data.Response === "False") {
            alert('Nenhum filme encontrado.');
            return;
        }

        const filmes = data.Search;

        const container = document.getElementById('filmesContainer');
        container.innerHTML = '';

        filmes.forEach(filme => {
            const div = document.createElement('div');
            div.classList.add('filme');

            div.innerHTML = `
                <h2>${filme.Title} (${filme.Year})</h2>
                <img src="${filme.Poster !== "N/A" ? filme.Poster : 'https://via.placeholder.com/200x300?text=Sem+Imagem'}" alt="${filme.Title}">
                <hr>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar filmes.');
    }
}


