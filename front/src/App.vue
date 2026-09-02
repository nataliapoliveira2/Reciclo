<template>
  <div class="page-container">
    <main class="background-premium">

      <div class="content-wrapper">

        <!-- Header -->
        <header class="top-nav">
          <div class="logo-area">
            <img src="/LogoIFB.png" alt="Logo IFB" class="logo-img" />
            <div class="logo-divider"></div>
            <img src="/LogoILZB.png" alt="Logo Lixo Zero" class="logo-img" />
          </div>

          <div class="admin-menu-wrapper">
            <button class="menu-btn" @click="menuAberto = !menuAberto">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ffffff" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <transition name="fade">
              <div v-if="menuAberto" class="admin-dropdown">
                <a href="#login" class="dropdown-item" @click="menuAberto = false">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#258599" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>Login</span>
                </a>
              </div>
            </transition>
          </div>
        </header>

        <div class="page-titles">
          <h1>Portal de Notícias <strong>RECICLO</strong></h1>
          <p>Acompanhe as atualizações sustentáveis do Campus Brasília</p>
        </div>

        <!-- Carrosel de Notícias  -->
        <section class="glass-card hero-card">
          <div class="hero-image-container">
            <img :src="noticiasDestaque[slideAtivo]?.imagem" alt="Notícia Destaque" class="hero-image" />
          </div>

          <div class="hero-content">
            <div class="hero-header-info">
              <span class="tag-highlight">DESTAQUE</span>
              <span class="date-text">{{ formatarData(noticiasDestaque[slideAtivo]?.data) }}</span>
            </div>

            <h2>{{ noticiasDestaque[slideAtivo]?.titulo }}</h2>
            <p>{{ noticiasDestaque[slideAtivo]?.resumo }}</p>

            <button @click="abrirNoticia(noticiasDestaque[slideAtivo])" class="btn-ler-materia">
              Ler Matéria Completa
            </button>

            <div class="carousel-controls">
              <button @click="slideAnterior" class="circle-btn">❮</button>

              <div class="carousel-indicators">
                <span v-for="(noticia, index) in noticiasDestaque" :key="noticia.id" class="indicator-dot"
                  :class="{ active: slideAtivo === index }" @click="slideAtivo = index"></span>
              </div>

              <button @click="proximoSlide" class="circle-btn">❯</button>
            </div>
          </div>
        </section>

        <div class="section-divider">
          <h3>Últimas Atualizações</h3>
          <div class="yellow-line"></div>
        </div>

        <!-- Grade de Notícias -->
        <section class="news-grid">
          <article v-for="noticia in noticiasOrdenadas" :key="noticia.id" class="glass-card mini-card clickable"
            @click="abrirNoticia(noticia)">
            <div class="mini-card-img-wrapper">
              <img :src="noticia.imagem" alt="Capa da Notícia" class="mini-card-img" />
            </div>

            <div class="mini-card-content">
              <span class="date-text small-date">{{ formatarData(noticia.data) }}</span>
              <h4 class="mini-card-title">{{ noticia.titulo }}</h4>
              <p class="mini-card-summary">{{ noticia.resumo }}</p>
            </div>
          </article>
        </section>

        <transition name="fade">
          <div v-if="noticiaAberta" class="modal-overlay" @click.self="fecharNoticia">
            <article class="glass-card modal-content">
              <button class="modal-close-btn" @click="fecharNoticia">✕</button>

              <span class="date-text">{{ formatarData(noticiaAberta.data) }}</span>
              <h2 class="modal-title">{{ noticiaAberta.titulo }}</h2>

              <div class="modal-img-container">
                <img :src="noticiaAberta.imagem" :alt="noticiaAberta.titulo" />
              </div>

              <div class="modal-body">
                <p class="modal-resumo">{{ noticiaAberta.resumo }}</p>
                <p class="modal-texto">{{ noticiaAberta.conteudo }}</p>
              </div>
            </article>
          </div>
        </transition>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const menuAberto = ref(false)
const slideAtivo = ref(0)
const noticiaAberta = ref(null)

const abrirNoticia = (item) => {
  noticiaAberta.value = item
  document.body.style.overflow = 'hidden'
}

const fecharNoticia = () => {
  noticiaAberta.value = null
  document.body.style.overflow = 'auto'
}

const noticias = ref([
  {
    id: 1,
    titulo: 'IFB Campus Brasília recebe destaque no Prêmio Lixo Zero 2025',
    resumo: 'O evento celebrou iniciativas de impacto que promovem a redução de resíduos, a economia circular e a sustentabilidade em diferentes setores.',
    conteudo: `Entre os premiados da noite, a professora Simone Pinheiro, do IFB Campus Brasília, recebeu o reconhecimento na categoria Educadora Lixo Zero, em homenagem ao trabalho que vem desenvolvendo na implantação da metodologia Lixo Zero no campus. A homenagem destaca o papel central da docente na transformação da gestão de resíduos da unidade, por meio de programa contínuo de extensão.

              Atualmente, o IFB Campus Brasília é referência interna: é o único campus do IFB que composta 80% dos resíduos orgânicos gerados e realiza o encaminhamento dos recicláveis para a cooperativa Vencendo Obstáculos, fortalecendo o trabalho de catadores e promovendo a inclusão socioambiental. A iniciativa reduziu o envio de resíduos ao aterro sanitário, fortaleceu práticas de consumo consciente e mobilizou estudantes, servidores e terceirizados em torno do conceito Lixo Zero.

            O prêmio também reconheceu diversas outras ações e inovações voltadas para sustentabilidade, gestão de resíduos, tecnologia social e mobilização comunitária — reforçando a importância de instituições públicas como o IFB no avanço das práticas ambientais no Distrito Federal.

            Para a professora Simone, "Este prêmio é um reflexo da persistência. Tudo que é novo é diferente exige muita persistência. Precisamos alfabetizar ambientalmente as pessoas para a mudança".`,
    data: '2025-12-05',
    imagem: '/ImgNoticia1.jpg'
  },

  {
    id: 2,
    titulo: 'IFB recebe Encontro Nacional de Boas Práticas Lixo Zero nesta semana',
    resumo: 'O Campus Brasília do Instituto Federal de Brasília (IFB) sediou nesta quarta-feira (3) e segue sediando até amanhã (4) o Encontro Nacional de Boas Práticas Lixo Zero, evento que reúne iniciativas, projetos e tecnologias de destaque na área de gestão de resíduos, sustentabilidade e economia circular.',
    conteudo: `A programação reúne empresas, instituições de ensino, organizações sociais, gestores públicos e pessoas que têm desenvolvido soluções inovadoras para redução, reutilização e transformação de resíduos. O objetivo é promover um espaço de troca, formação e inspiração para todos que desejam contribuir com práticas sustentáveis em seus territórios.

              O encontro é fruto da parceria entre o Instituto Lixo Zero Brasil (ILZB), o Instituto Desponta Brasil, o Instituto Federal de Brasília (IFB) e o Serviço de Limpeza Urbana (SLU). Juntas, as instituições uniram esforços para fortalecer a cultura do Lixo Zero no Distrito Federal, ampliando o diálogo sobre educação ambiental, inovação social e práticas que podem ser aplicadas tanto no cotidiano quanto em políticas públicas.

              Durante os dois dias, o público tem acesso a palestras, apresentação de cases, oficinas temáticas e exposição de projetos voltados à reciclagem, compostagem, reaproveitamento de materiais, design sustentável e tecnologias de impacto. A iniciativa destaca-se por reunir experiências de várias regiões do país, permitindo o intercâmbio de práticas e metodologias que vêm transformando a gestão de resíduos no Brasil.

              O evento é gratuito e aberto à comunidade. Interessados ainda podem se inscrever para participar das atividades desta quinta-feira (4). Para isso, basta acessar o formulário disponível em https://forms.gle/KKmBJ8JUVEWbGYjj8 e comparecer ao IFB Campus Brasília.`,
    data: '2025-12-03',
    imagem: '/ImgNoticia2.jpeg'
  },

  {
    id: 3,
    titulo: 'Campus Brasília avança rumo ao lixo zero e seleciona cooperativas para coleta de recicláveis',
    resumo: 'A nova aplicação do projeto Lixo Zero reconhece resíduos em tempo real pela câmera e ensina o descarte correto de forma interativa.',
    conteudo: `O IFB Campus Brasília informa que estão abertas as inscrições para o Encontro Nacional de Boas Práticas Lixo Zero, que será realizado nos dias 3 e 4 de dezembro, das 9h às 17h, no Auditório do Bloco C do IFB Campus Brasília, Asa Norte.

              Trata-se de um encontro de soluções, iniciativas e experiências que estão transformando o Brasil rumo ao Lixo Zero.

              Acontecerão também oficinas com o Patubatê, de madeira plástica e outras.

              Haverá certificação.

              Link de inscrição: https://forms.gle/KKmBJ8JUVEWbGYjj8`,
    data: '2025-06-06',
    imagem: '/ImgNoticia3.jpeg'
  },

  {
    id: 4,
    titulo: 'Coleta de resíduos eletrônicos no IFB Campus Brasília',
    resumo: 'O IFB Campus Brasília, nessa quarta-feira (31/07), realizou a retirada dos resíduos eletrônicos coletados até o momento. A ação faz parte do Programa de Ponto de Entrega Voluntária (PEV), que visa promover o descarte correto de materiais e contribuir para a preservação do meio ambiente.',
    conteudo: 'A ação arrecadou centenas de quilos de lixo eletrônico (e-lixo), incluindo teclados antigos, monitores, cabos e baterias. Todos esses materiais contêm metais pesados e precisam de destinação específica para não contaminar o solo. A coleta será realizada semestralmente, e a comunidade externa também está convidada a participar das próximas edições.',
    data: '2024-08-01',
    imagem: '/ImgNoticia4.jpg'
  },
  {
    id: 5,
    titulo: 'Encontro Nacional de Boas Práticas Lixo Zero começa dia 3',
    resumo: 'O IFB Campus Brasília informa que estão abertas as inscrições para o Encontro Nacional de Boas Práticas Lixo Zero, que será realizado nos dias 3 e 4 de dezembro, das 9h às 17h, no Auditório do Bloco C do IFB Campus Brasília, Asa Norte.',
    conteudo: `Trata-se de um encontro de soluções, iniciativas e experiências que estão transformando o Brasil rumo ao Lixo Zero.

              Acontecerão também oficinas com o Patubatê, de madeira plástica e outras.

              Haverá certificação.

              Link de inscrição: https://forms.gle/KKmBJ8JUVEWbGYjj8`,
    imagem: '/ImgNoticia5.png'
  },
])

const noticiasOrdenadas = computed(() => {
  return [...noticias.value].sort((a, b) => new Date(b.data) - new Date(a.data))
})

const noticiasDestaque = computed(() => {
  return noticiasOrdenadas.value.slice(0, 3)
})

const proximoSlide = () => {
  if (noticiasDestaque.value.length === 0) return
  slideAtivo.value = (slideAtivo.value + 1) % noticiasDestaque.value.length
}

const slideAnterior = () => {
  if (noticiasDestaque.value.length === 0) return
  slideAtivo.value = (slideAtivo.value - 1 + noticiasDestaque.value.length) % noticiasDestaque.value.length
}

const formatarData = (dataIso) => {
  if (!dataIso) return ''
  const [ano, mes, dia] = dataIso.split('-')
  return `${dia}/${mes}/${ano}`
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');


html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}
</style>

<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.page-container {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

.background-premium {
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 20px 80px 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgba(255, 255, 255, 0.08)' stroke-width='1'%3E%3Crect width='40' height='40'/%3E%3Ccircle cx='20' cy='20' r='14'/%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(180deg, #258599 0%, #31959b 30%, #55ad98 85%, #86c596 100%);
  background-attachment: fixed;
  background-size: cover;
}

.content-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 24px;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.logo-divider {
  width: 1.5px;
  height: 26px;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 4px;
}

.admin-menu-wrapper {
  position: relative;
}

.menu-btn {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.admin-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: #fff;
  padding: 6px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  text-decoration: none;
  color: #123e47;
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: rgba(37, 133, 153, 0.1);
}

.page-titles {
  text-align: center;
  margin-bottom: 40px;
}

.page-titles h1 {
  color: #fff;
  font-size: 38px;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 strong {
  color: #facc15;
}

.page-titles p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin-top: 8px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.hero-card {
  display: flex;
  flex-direction: row;
  min-height: 400px;
}

.hero-image-container {
  flex: 1;
  position: relative;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  flex: 1;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tags-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.tag-highlight {
  background: #ffdf00;
  color: #4a2c20;
  font-size: 12px;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 50px;
  text-transform: uppercase;
}

.date-text {
  color: #123e47;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.8;
}

.hero-title {
  color: #123e47;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

.hero-summary {
  color: #123e47;
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0 0 32px 0;
}

.carousel-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: auto;
}

.circle-btn {
  background: #ffffff;
  color: #258599;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.circle-btn:hover {
  transform: scale(1.1);
}

.dots-wrapper {
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  background: rgba(18, 62, 71, 0.25);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.active-dot {
  background: #123e47;
  width: 28px;
  border-radius: 5px;
}

.section-divider {
  margin: 60px 0 30px 0;
  text-align: center;
}

.section-divider h3 {
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.yellow-line {
  width: 50px;
  height: 4px;
  background: #ffdf00;
  border-radius: 4px;
  margin: 0 auto;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.mini-card {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.mini-card:hover {
  transform: translateY(-8px);
}

.mini-card-img-wrapper {
  width: 100%;
  height: 200px;
  position: relative;
}

.mini-card-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.small-date {
  margin-bottom: 8px;
}

.mini-card-title {
  color: #123e47;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 12px 0;
}

.mini-card-summary {
  color: #123e47;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
  margin: 0;
}

@media (max-width: 850px) {
  .hero-card {
    flex-direction: column;
  }

  .hero-image-container {
    height: 250px;
    flex: none;
  }

  .hero-content {
    padding: 30px 20px;
  }
}

/* Pop up de notícias */

.clickable {
  cursor: pointer;
}

.btn-ler-materia {
  align-self: flex-start;
  margin-bottom: 25px;
  padding: 10px 20px;
  background: #facc15;
  color: #123e47;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-ler-materia:hover {
  transform: translateY(-2px);
  background: #fde047;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  position: relative;
  max-width: 750px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.85);
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(18, 62, 71, 0.1);
  border: none;
  color: #123e47;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal-close-btn:hover {
  background: rgba(18, 62, 71, 0.2);
}

.modal-title {
  color: #123e47;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  margin: 10px 0 24px 0;
}

.modal-img-container img {
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 24px;
}

.modal-resumo {
  font-weight: 700;
  font-size: 16px;
  color: #123e47;
  margin-bottom: 16px;
  line-height: 1.6;
}

.modal-texto {
  color: #123e47;
  font-size: 16px;
  line-height: 1.7;
  opacity: 0.9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>