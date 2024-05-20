const videoContainer = document.querySelector(".videos__container");
const barraPesquisa = document.querySelector(".pesquisar__input");
const botoesCategoria = document.querySelectorAll(".superior__item");

barraPesquisa.addEventListener("input", pesquisarVideo);

async function buscarEExibirVideos() {
  try {
    const api = await fetch("http://localhost:3000/videos");
    const videos = await api.json();
    videos.forEach((video) => {
      if (video.categoria == "") {
        throw new Error("Vídeo não tem categoria");
      }
      videoContainer.innerHTML += `
          <li class="videos__item">
          <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
          <div class="descricao-video">
          <img src="${video.imagem}" class="img-canal" alt="Logo do canal">
          <h3 class="titulo-video">${video.titulo}</h3>
          <p class="titulo-canal">${video.descricao}</p>
          <p class="video-categoria" hidden>${video.categoria}</p>
          </div>
          </li>
          `;
    });
  } catch (error) {
    videoContainer.innerHTML = `
<p> Houve um erro ao carregar os vídeos: ${error}</p>
`;
  }
}

function pesquisarVideo() {
  const videos = document.querySelectorAll(".videos__item");

  if (barraPesquisa.value != "") {
    for (let video of videos) {
      let titulo = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      let buscaTitulo = barraPesquisa.value.toLowerCase();

      if (!titulo.includes(buscaTitulo)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    }
  }
}

botoesCategoria.forEach((botao) => {
  const categoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarVideos(categoria));
});

function filtrarVideos(filtro) {
  const videos = document.querySelectorAll(".videos__item");

  for (let video of videos) {
    const valorFiltro = filtro.toLowerCase();
    const videoCategoria = video
      .querySelector(".video-categoria")
      .textContent.toLowerCase();

    if (!videoCategoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}

buscarEExibirVideos();
