const apiKey = '1ab83bf0'; // Insira sua chave da OMDb API

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
        container.innerHTML = '';  // Limpa conteúdo anterior

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

// Chamada de teste
buscarFilmes('Batman');
