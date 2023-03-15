import Template from './templates/Template.js';
import './styles/style.css';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
