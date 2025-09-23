class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.hoje = "ter";
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const response = await fetch('aulas.json');
      const aulas = await response.json();
      this.render(aulas);
    } catch (error) {
      console.error('Erro ao carregar os dados das aulas:', error);
    }
  }

  render(aulas) {
    const aulasDia = aulas.filter(a => a.data === this.hoje);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles_componente.css';
    this.shadowRoot.appendChild(link);

    this.shadowRoot.innerHTML += `
        <div>
          ${aulasDia.map(a => {
      let provaDisplay = a.prova_alert ? '' : 'display: none;';
      let gradeStyle = '';
      if (a.nota < 6) {
        gradeStyle = 'color: red;';
      } else if (a.nota >= 6 && a.nota <= 8) {
        gradeStyle = 'color: orange;';
      } else {
        gradeStyle = 'color: lightgreen;'; 
      }

      return `
              <div class="comp-aula">
                <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                <div class="titulo_aula">${a.disciplina}</div>
                <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                <div class="lables">
                  <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                  <div class="lable-nota p_lable" style="${gradeStyle}">CR: <b>${a.nota}</b></div>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      `;
  }
}

customElements.define('aulas-component', AulasComponent);  