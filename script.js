document.getElementById("buscar").addEventListener("click", () => {
  const nome = document.getElementById("ghibli").value.toLowerCase().trim();
  const resultado = document.getElementById("resultado");

  if (!nome) {
    resultado.innerHTML = "Digite um nome de um filme do Studio Ghibli.";
    return;
  }

  resultado.innerHTML = "Buscando...";

  fetch('https://ghibliapi.vercel.app/films')
    .then(res => {
      if (!res.ok) throw new Error('Erro na requisição');
      return res.json();
    })
    .then(filmes => {
      const filme = filmes.find(f => f.title.toLowerCase() === nome);

      if (filme) {
        resultado.innerHTML = `
          <h3>${filme.title}</h3>
          <img src="${filme.image}" alt="Capa de ${filme.title}" style="max-width: 150px; border-radius: 10px; margin-bottom: 10px;" />
          <p><strong>Descrição:</strong> ${filme.description}</p>
          <p><strong>Diretor:</strong> ${filme.director}</p>
          <p><strong>Ano de lançamento:</strong> ${filme.release_date}</p>
        `;
      } else {
        resultado.innerHTML = "Filme não encontrado. Tente outro nome.";
      }
    })
    .catch(error => {
      resultado.innerHTML = 'Erro: ' + error.message;
    });
});
