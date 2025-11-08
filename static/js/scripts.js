import { vacancies } from './vacancies_json.js'
import { Vacancies } from './vacancies.js'
import { MyApplications } from './my_applications.js'
import { SearchHelper } from './search_vacancy.js'

window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#', '') || 'vagas';
  navigate(hash);

  const sortedVacancies = vacancies.sort((a, b) => {
    if (a.applied !== b.applied) {
      return a.applied ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });

  SearchHelper.searchVacancies(sortedVacancies, Vacancies.load);
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
    MyApplications.load(sortedVacancies);
    SearchHelper.searchVacancies(sortedVacancies, MyApplications.load);
  } else if (pageId === "vacancies") {
    Vacancies.load(sortedVacancies)
    SearchHelper.searchVacancies(sortedVacancies, Vacancies.load);
  }
}
window.navigate = navigate;