function el(tag, classe, contenu) {
  const noeud = document.createElement(tag);
  if (classe) noeud.className = classe;
  if (contenu !== undefined) {
    for (const partie of [].concat(contenu)) {
      noeud.append(partie instanceof Node ? partie : document.createTextNode(String(partie)));
    }
  }
  return noeud;
}

function motSurligne(s, classe) {
  const zwj = "‍";
  const mot = el("span", "ar " + (classe || ""));
  if (s.avant) mot.append(document.createTextNode(s.avant + zwj));
  mot.append(el("span", "surligne", (s.avant ? zwj : "") + s.segment + (s.apres ? zwj : "")));
  if (s.apres) mot.append(document.createTextNode(zwj + s.apres));
  return mot;
}

window.ICONES = {
  soleil: '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="6"/><g stroke="currentColor" stroke-width="6" stroke-linecap="round"><line x1="50" y1="6" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="94"/><line x1="6" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="94" y2="50"/><line x1="19" y1="19" x2="29" y2="29"/><line x1="71" y1="71" x2="81" y2="81"/><line x1="19" y1="81" x2="29" y2="71"/><line x1="71" y1="29" x2="81" y2="19"/></g></svg>',
  lune: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M64 10 A42 42 0 1 0 90 70 A34 34 0 1 1 64 10 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/></svg>',
  passe: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><polyline points="48,24 22,50 48,76"/><polyline points="78,24 52,50 78,76"/></g></svg>',
  futur: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><polyline points="22,24 48,50 22,76"/><polyline points="52,24 78,50 52,76"/></g></svg>',
  haut_parleur: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a8.5 8.5 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};
window.LIBELLES_ICONES = { soleil: "lettre solaire", lune: "lettre lunaire", passe: "déjà passé", futur: "va arriver" };
