export function searchVacancies(vacancies, renderCallback) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) {
    renderCallback(vacancies);
    return;
  } 

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    // se o campo está vazio, mostra tudo
    if (query === '') {
      renderCallback(vacancies);
      return;
    }

    const filtered = vacancies.filter(v =>
      v.title.toLowerCase().includes(query) ||
      v.company.toLowerCase().includes(query)
    );

    renderCallback(filtered);
  });
}