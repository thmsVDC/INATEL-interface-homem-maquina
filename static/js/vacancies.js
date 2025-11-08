export class Vacancies {
  static load(vacancies) {
    const container = document.getElementById("jobList");
    if (vacancies.length === 0) {
      container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
      return;
    }
    container.innerHTML = vacancies.map((vacancy, index) => `
    <div class="job-card">
      <div class="job-info">
        <h3>${vacancy.title}</h3>
        <p><strong>Empresa:</strong> ${vacancy.company}</p>
        <p><strong>Local:</strong> ${vacancy.local}</p>
        <p><strong>Tipo:</strong> ${vacancy.type}</p>
      </div>
      <label class="upload-btn" style="background-color: ${vacancy.applied ? '#00b894' : '#007bff'}">
        <input type="file" data-index="${index}" class="resume-input" style="display:none">
        <span>${vacancy.applied ? 'Currículo enviado' : 'Enviar Currículo'}</span>
      </label>
    </div>
    `).join('');

    const newVacancies = new Vacancies();
    document.querySelectorAll('.resume-input').forEach(function (input) {
      newVacancies.apply(input, vacancies)
    });

    document.querySelectorAll('.upload-btn').forEach(btn => {
      const span = btn.querySelector('span');

      btn.addEventListener('mouseenter', () => {
        if (span.textContent === 'Enviar Currículo') {
          span.textContent = 'Clique para enviar!';
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (span.textContent === 'Clique para enviar!') {
          span.textContent = 'Enviar Currículo';
        }
      });
    });
  }

  apply(input, vacancies) {
    input.addEventListener('change', function () {
      const index = this.dataset.index;
      const vacancy = vacancies[index];

      alert(`
      Currículo enviado!
      Candidatura para: ${vacancy.title}
      Empresa: ${vacancy.company}
    `);
      vacancy.applied = true;

      const button = this.parentElement;
      var span = this.parentElement.querySelector('span');
      if (span) {
        span.textContent = "Currículo enviado";
      }
      button.style.backgroundColor = "#00b894ff";
      button.style.color = '#fff';
    });
  }
}