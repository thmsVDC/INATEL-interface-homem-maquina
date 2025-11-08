export function loadMyApplications(vacancies) {
  const container = document.getElementById("myApplicationsList");
  const appliedJobs = vacancies.filter(vacancy => vacancy.applied === true);

  if (appliedJobs.length === 0) {
    container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  container.innerHTML = appliedJobs.map((vacancy, index) => `
    <div class="job-card">
      <div class="job-info">
        <h3>${vacancy.title}</h3>
        <p><strong>Empresa:</strong> ${vacancy.company}</p>
        <p><strong>Local:</strong> ${vacancy.local}</p>
        <p><strong>Tipo:</strong> ${vacancy.type}</p>
      </div>
      <label class="remove-btn" data-index="${index}">
        <span>Candidatado</span>
      </label>
    </div>
      `).join('');

  document.querySelectorAll('.remove-btn').forEach(function (input) {
    removeApplyForVacancy(input, vacancies)
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    const span = btn.querySelector('span');

    btn.addEventListener('mouseenter', () => {
      if (span.textContent === 'Candidatado') {
        span.textContent = 'Cancelar candidatura';
      }
    });

    btn.addEventListener('mouseleave', () => {
      if (span.textContent === 'Cancelar candidatura') {
        span.textContent = 'Candidatado';
      }
    });
  });
}

function removeApplyForVacancy(input, vacancies) {
  input.addEventListener('click', function () {
    const index = this.dataset.index;
    const vacancy = vacancies[index];

    alert(`
      Candidatura removida com sucesso!
      Candidatura para: ${vacancy.title}
      Empresa: ${vacancy.company}
    `);
    vacancy.applied = false;

    loadMyApplications(vacancies);
  });
}