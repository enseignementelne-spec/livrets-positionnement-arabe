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
  couleurs: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 12C27 12 10 28 10 48c0 18 14 30 28 30 6 0 8-4 8-8 0-6 4-9 9-9h9c14 0 26-8 26-22C90 23 72 12 50 12Z" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="38" r="7" fill="#d62828"/><circle cx="52" cy="28" r="7" fill="#f2c511"/><circle cx="71" cy="38" r="7" fill="#1f5fd6"/><circle cx="30" cy="58" r="7" fill="#2a9d3a"/></svg>',
  animaux: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor"><ellipse cx="50" cy="66" rx="20" ry="16"/><ellipse cx="24" cy="44" rx="8" ry="11"/><ellipse cx="40" cy="28" rx="8" ry="11"/><ellipse cx="60" cy="28" rx="8" ry="11"/><ellipse cx="76" cy="44" rx="8" ry="11"/></g></svg>',
  nombres: '<svg viewBox="0 0 100 100" aria-hidden="true"><text x="50" y="62" text-anchor="middle" font-family="sans-serif" font-size="32" font-weight="700" fill="currentColor">1 2 3</text></svg>',
  matin: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><line x1="8" y1="70" x2="92" y2="70"/><path d="M28 70a22 22 0 0 1 44 0"/><line x1="50" y1="26" x2="50" y2="36"/><line x1="22" y1="40" x2="29" y2="47"/><line x1="78" y1="40" x2="71" y2="47"/></g></svg>',
  midi: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"><line x1="8" y1="88" x2="92" y2="88"/><circle cx="50" cy="36" r="14"/><line x1="50" y1="8" x2="50" y2="15"/><line x1="50" y1="57" x2="50" y2="64"/><line x1="22" y1="36" x2="29" y2="36"/><line x1="71" y1="36" x2="78" y2="36"/><line x1="30" y1="16" x2="35" y2="21"/><line x1="70" y1="16" x2="65" y2="21"/><line x1="30" y1="56" x2="35" y2="51"/><line x1="70" y1="56" x2="65" y2="51"/></g></svg>',
  soir: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M58 16A30 30 0 1 0 84 62A24 24 0 1 1 58 16Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><g fill="currentColor"><circle cx="24" cy="22" r="3.5"/><circle cx="14" cy="44" r="2.5"/><circle cx="36" cy="10" r="2.5"/></g></svg>',
  "itineraire-droit-droite": '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><polyline points="30,90 30,35 82,35"/><polyline points="70,23 82,35 70,47"/></g></svg>',
  "itineraire-droit-gauche": '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><polyline points="70,90 70,35 18,35"/><polyline points="30,23 18,35 30,47"/></g></svg>',
  "itineraire-droite-droit": '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><polyline points="12,80 62,80 62,18"/><polyline points="50,30 62,18 74,30"/></g></svg>',
  "horloge-8h": '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5"/><g stroke="currentColor" stroke-width="4"><line x1="50" y1="10" x2="50" y2="17"/><line x1="90" y1="50" x2="83" y2="50"/><line x1="50" y1="90" x2="50" y2="83"/><line x1="10" y1="50" x2="17" y2="50"/></g><g stroke="currentColor" stroke-linecap="round"><line x1="50" y1="50" x2="28.3" y2="62.5" stroke-width="7"/><line x1="50" y1="50" x2="50" y2="18" stroke-width="4"/></g><circle cx="50" cy="50" r="4" fill="currentColor"/></svg>',
  "horloge-9h30": '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5"/><g stroke="currentColor" stroke-width="4"><line x1="50" y1="10" x2="50" y2="17"/><line x1="90" y1="50" x2="83" y2="50"/><line x1="50" y1="90" x2="50" y2="83"/><line x1="10" y1="50" x2="17" y2="50"/></g><g stroke="currentColor" stroke-linecap="round"><line x1="50" y1="50" x2="25.9" y2="43.5" stroke-width="7"/><line x1="50" y1="50" x2="50" y2="82" stroke-width="4"/></g><circle cx="50" cy="50" r="4" fill="currentColor"/></svg>',
  "horloge-10h": '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="5"/><g stroke="currentColor" stroke-width="4"><line x1="50" y1="10" x2="50" y2="17"/><line x1="90" y1="50" x2="83" y2="50"/><line x1="50" y1="90" x2="50" y2="83"/><line x1="10" y1="50" x2="17" y2="50"/></g><g stroke="currentColor" stroke-linecap="round"><line x1="50" y1="50" x2="28.3" y2="37.5" stroke-width="7"/><line x1="50" y1="50" x2="50" y2="18" stroke-width="4"/></g><circle cx="50" cy="50" r="4" fill="currentColor"/></svg>',
  personne: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"><circle cx="50" cy="28" r="14"/><path d="M22 90c0-20 12-34 28-34s28 14 28 34"/></g></svg>',
  lieu: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"><polyline points="12,46 50,14 88,46"/><rect x="22" y="44" width="56" height="44"/><rect x="42" y="62" width="16" height="26"/></g></svg>',
  chose: '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"><polygon points="50,12 86,30 86,72 50,90 14,72 14,30"/><polyline points="14,30 50,48 86,30"/><line x1="50" y1="48" x2="50" y2="90"/></g></svg>',
  "drapeau-maroc": '<svg viewBox="0 0 100 70" aria-hidden="true"><rect width="100" height="70" fill="#c1272d"/><polygon points="50,16 59.4,44.9 34.8,27.1 65.2,27.1 40.6,44.9" fill="none" stroke="#006233" stroke-width="3.2" stroke-linejoin="round"/></svg>',
  "drapeau-algerie": '<svg viewBox="0 0 100 70" aria-hidden="true"><rect width="50" height="70" fill="#006233"/><rect x="50" width="50" height="70" fill="#fff"/><rect width="100" height="70" fill="none" stroke="#999" stroke-width="1"/><path d="M58 20a17 17 0 1 0 0 30a14 14 0 1 1 0-30z" fill="#d21034"/><polygon points="62,28 64.4,33.2 70,33.6 65.6,37.2 67,42.6 62,39.6 57,42.6 58.4,37.2 54,33.6 59.6,33.2" fill="#d21034"/></svg>',
  "drapeau-france": '<svg viewBox="0 0 100 70" aria-hidden="true"><rect width="33.4" height="70" fill="#0055a4"/><rect x="33.3" width="33.4" height="70" fill="#fff"/><rect x="66.6" width="33.4" height="70" fill="#ef4135"/><rect width="100" height="70" fill="none" stroke="#999" stroke-width="1"/></svg>',
  haut_parleur: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a8.5 8.5 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};
window.LIBELLES_ICONES = {
  soleil: "lettre solaire", lune: "lettre lunaire", passe: "déjà passé", futur: "va arriver",
  couleurs: "couleurs", animaux: "animaux", nombres: "nombres",
  matin: "le matin", midi: "à midi", soir: "le soir",
  "itineraire-droit-droite": "tout droit puis à droite", "itineraire-droit-gauche": "tout droit puis à gauche",
  "itineraire-droite-droit": "à droite puis tout droit",
  "horloge-8h": "8 h", "horloge-9h30": "9 h 30", "horloge-10h": "10 h",
  personne: "une personne", lieu: "un lieu", chose: "une chose faite",
  "drapeau-maroc": "Maroc", "drapeau-algerie": "Algérie", "drapeau-france": "France"
};

function partiesDuLivret(livret) {
  const presentes = new Set(livret.items.map((i) => i.partie));
  return window.CONTENU.parties.filter((p) => presentes.has(p.id));
}

function pointsOral(livret) { return 2 * (livret.oral || []).length; }

function memePassage(a, b) {
  return Boolean(a && b && (a.son || a.sons) && JSON.stringify(a.son || a.sons) === JSON.stringify(b.son || b.sons));
}
