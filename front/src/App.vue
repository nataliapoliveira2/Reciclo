<template>
  <div class="page-wrapper">
    <div class="mobile-frame">
      <main class="app-background">
        <header class="app-header">
          <h1>Reciclo</h1>
          <h3>Realidade Aumentada</h3>
        </header>

        <div class="card-translucido">
          <p>
            O <strong>Reciclo</strong> é uma iniciativa integrada ao projeto <strong>Lixo Zero</strong> do IFB,
            desenvolvida para facilitar o descarte correto de resíduos por meio da Realidade Aumentada.
            Ao apontar a câmera para embalagens e materiais, a aplicação identifica o resíduo em tempo real
            e orienta a separação correta, apoiando a sustentabilidade e a preservação do nosso campus.
          </p>
        </div>

        <h2 class="subtitulo-h2">Mecânica Principal</h2>

        <div class="card-translucido card-mecanica">
          <div class="card-header">
            <div class="icone-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#123e47" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <rect x="7" y="7" width="10" height="10" rx="2" />
              </svg>
            </div>
            <h4 class="card-titulo">
              1. Scan &amp; Spawn
            </h4>
          </div>

          <p class="card-texto">
            Ao escanear o objeto com a câmera, a tecnologia de Realidade Aumentada identifica o tipo de resíduo
            instantaneamente e projeta a lixeira ideal para a separação adequada.
          </p>
        </div>

        <div class="card-translucido card-mecanica">
          <div class="card-header">
            <div class="icone-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#123e47" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </div>
            <h4 class="card-titulo">
              2. Indicação da Lixeira
            </h4>
          </div>

          <p class="card-texto">
            A tela projeta a lixeira correspondente em Realidade Aumentada com base na cor padrão da coleta seletiva
            (papel, plástico, vidro, metal ou não reciclável).
          </p>
        </div>

        <div class="card-translucido card-mecanica">
          <div class="card-header">
            <div class="icone-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#123e47" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 class="card-titulo">
              3. Pontos de Coleta (Ecopontos)
            </h4>
          </div>

          <p class="card-texto">
            Para resíduos que não vão na coleta seletiva comum como pilhas, lâmpadas e eletrônicos,
            o aplicativo aponta o ecoponto ou lixeira especial mais próxima no campus.
          </p>
        </div>

        <div class="card-translucido card-mecanica">
          <div class="card-header">
            <div class="icone-box">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#123e47" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h4 class="card-titulo">
              4. Confirmação do Descarte
            </h4>
          </div>

          <p class="card-texto">
            O estudante confirma a ação ao jogar o resíduo no local correto,
            registrando a destinação adequada do material.
          </p>
        </div>

        <h2 class="subtitulo-h2">Tipos de Resíduos</h2>

        <div class="card-translucido card-residuos">
          <!-- 1. Papel -->
          <div class="item-residuo">
            <div class="bolinha-cor bg-papel"></div>
            <div class="info-residuo">
              <h5>Papel</h5>
              <span>Folhas, jornais e revistas sem sujeira</span>
            </div>
          </div>

          <!-- 2. Reciclável Seco -->
          <div class="item-residuo">
            <div class="bolinha-cor bg-reciclavel-seco"></div>
            <div class="info-residuo">
              <h5>Reciclável (Seco)</h5>
              <span>Embalagens, latas, plástico e garrafas</span>
            </div>
          </div>

          <div class="item-residuo item-destaque-organico">
            <div class="bolinha-cor bg-organico bolinha-estrela">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#ffdf00">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div class="info-residuo">
              <span class="tag-destaque">Foco Lixo Zero / Compostagem</span>
              <h5>Orgânico / Úmido</h5>
              <span>Restos de comida e papel engordurado</span>
            </div>
          </div>
        </div>

        <div class="cta-container">
          <button class="btn-download">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#257280" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span>Baixar Reciclo</span>
          </button>

          <span class="disponibilidade-texto">Disponível para iOS e Android</span>
        </div>

      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #258599;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
</style>

<style scoped>
.page-wrapper,
.mobile-frame {
  width: 100% !important;
  min-height: 100vh !important;
  height: auto !important;
  max-width: 100% !important;
  max-height: none !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  overflow: visible !important;
  display: flex;
  flex-direction: column;
}

.app-background {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 48px 20px 30px 20px;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgba(255, 255, 255, 0.08)' stroke-width='1'%3E%3Crect width='40' height='40'/%3E%3Ccircle cx='20' cy='20' r='14'/%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(180deg,
      #258599 0%,
      #31959b 30%,
      #55ad98 85%,
      #86c596 100%);

  background-repeat: repeat, no-repeat;
  background-size: 34px 34px, 100% 100%;
  background-attachment: local, local;
}

.app-background::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

h1,
h3 {
  text-align: center;
  color: #ffffff;
}

h3 {
  font-weight: 400;
}

.card-translucido {
  background-color: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 18px 20px;
  margin-top: 28px;
}

.card-translucido p {
  color: #123e47;
  font-size: 13.5px;
  line-height: 1.45;
  font-weight: 500;
  text-align: left;
  text-align: justify;
}

.card-translucido strong {
  font-weight: 700;
}

.subtitulo-h2 {
  margin-top: 28px;
  justify-content: center;
  text-align: center;
  color: #ffffff;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.icone-box {
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.card-titulo {
  color: #123e47;
  font-size: 18px;
  line-height: 1.45;
  font-weight: 700;
  text-align: left;
}

.card-residuos {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
}

.item-residuo {
  display: flex;
  align-items: center;
  gap: 14px;
  background-color: rgba(255, 255, 255, 0.22);
  padding: 12px 16px;
  border-radius: 14px;
}

.bolinha-cor {
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
  border-radius: 50%;
  flex-shrink: 0;
}

.info-residuo {
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
}

.info-residuo h5 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #123e47;
  line-height: 1.2;
}

.info-residuo span {
  font-size: 12px;
  font-weight: 500;
  color: #234d56;
  margin-top: 3px;
  line-height: 1.3;
}

.bg-papel {
  background-color: #0b4f9c;
}

.bg-reciclavel-seco {
  background-color: #c92a2a;
}

.bg-organico {
  background-color: #4a2c20;
}

.bolinha-estrela {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative;
}

.bolinha-estrela svg {
  display: block;
  margin: auto;
  transform: translateY(-0.5px); 
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 100%;
}

.btn-download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  background-color: #ffffff;
  border: none;
  border-radius: 9999px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-download:active {
  transform: scale(0.98);
}

.btn-download span {
  color: #257280;
  font-size: 16px;
  font-weight: 700;
}

.disponibilidade-texto {
  margin-top: 25px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
}

</style>