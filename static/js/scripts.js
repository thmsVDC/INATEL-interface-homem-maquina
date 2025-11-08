import { loadVacancies } from './vacancies.js'
import { loadMyApplications } from './my_applications.js'
import { vacancies } from './vacancies_json.js'
import { searchVacancies } from './search_vacancy.js'



window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '') || 'vagas';
  navigate(hash);

  const sortedVacancies = vacancies.sort((a, b) => {
    if (a.applied !== b.applied) {
      return a.applied ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });

  searchVacancies(sortedVacancies, loadVacancies);
});

function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.location.hash = pageId;
  window.scrollTo(0, 0);

  const sortedVacancies = vacancies.sort((a, b) => {
    if (a.applied !== b.applied) {
      return a.applied ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });

  if (pageId === "my-applications") {
    loadMyApplications(sortedVacancies);
    searchVacancies(sortedVacancies, loadMyApplications);
  } else if (pageId === "vacancies") {
    loadVacancies(sortedVacancies)
    searchVacancies(sortedVacancies, loadVacancies);
  }
}
window.navigate = navigate;