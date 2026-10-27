const translations = {
  pl: {
    'meta.title': 'Robert Sereda — Portfolio',
    'meta.description': 'Portfolio Roberta Seredy — projekty, umiejętności, kontakt.',
    'nav.home': 'Start',
    'nav.about': 'O mnie',
    'nav.projects': 'Projekty',
    'nav.contact': 'Kontakt',
    'controls.themeToggle': 'Przełącz tryb jasny/ciemny',
    'controls.langToggle': 'Zmień język',
    'controls.navToggle': 'Przełącz menu',
    'controls.backToTop': 'Przewiń do góry',
    'hero.greeting': 'Witaj, nazywam się',
    'hero.subtitle': 'Tworzę aplikacje biznesowe w Java i Angular.',
    'hero.cta': 'Zobacz projekty',
    'hero.avatarAlt': 'Zdjęcie profilowe',
    'about.title': 'O mnie',
    'about.body': 'Jestem programistą Java zainteresowanym UI/UX oraz technologiami webowymi. Mam doświadczenie komercyjne w systemach urzędowo-księgowych. Zawodowo interesuję się poznawaniem wiedzy dziedzinowej, którą można zamodelować za pomocą systemów informatycznych.',
    'projects.title': 'Projekty',
    'projects.cta': 'Zobacz więcej',
    'projects.p1.desc': 'System medyczny klasy enterprise, zgodny z branżowymi standardami jak SNOMED CT, HL7 FHIR, ICD-10.',
    'projects.p2.desc': 'Modularna platforma core-bankingowa uwzględniająca regulacje (IFRS 9, DORA, FATCA/CRS, PSD2/SCA), obsługująca procesowanie kart, ryzyko kredytowe, egzekucję długów oraz raportowanie regulacyjne (KNF, NBP, BFG).',
    'projects.p3.desc': 'Samodzielnie hostowane, lokalne rozwiązanie do zarządzania drukarką 3D, wysyłanie plików druku (FTPS), monitorowanie stanu drukarki (MQTT) i podgląd postępu druku w czasie rzeczywistym (obsługa kamer IP i streamingu IoT).',
    'contact.title': 'Kontakt',
    'contact.body': 'Chcesz się ze mną skontaktować? Napisz:',
    'footer.copyPrefix': '©',
    'footer.copySuffix': 'Wszelkie prawa zastrzeżone.',
  },
  en: {
    'meta.title': 'Robert Sereda — Portfolio',
    'meta.description': 'Robert Sereda’s portfolio — projects, skills, contact.',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'controls.themeToggle': 'Toggle light/dark mode',
    'controls.langToggle': 'Change language',
    'controls.navToggle': 'Toggle menu',
    'controls.backToTop': 'Scroll to top',
    'hero.greeting': 'Hi, my name is',
    'hero.subtitle': 'I build business applications in Java and Angular.',
    'hero.cta': 'View projects',
    'hero.avatarAlt': 'Profile photo',
    'about.title': 'About me',
    'about.body': 'I am a Java developer with an interest in UI/UX and web technologies. I have commercial experience in public-administration and accounting systems. Professionally, I am interested in domain knowledge that can be modeled through software systems.',
    'projects.title': 'Projects',
    'projects.cta': 'Learn more',
    'projects.p1.desc': 'Enterprise-grade medical system compliant with industry standards such as SNOMED CT, HL7 FHIR and ICD-10.',
    'projects.p2.desc': 'Modular core-banking platform addressing regulations (IFRS 9, DORA, FATCA/CRS, PSD2/SCA), covering card processing, credit risk, debt enforcement and regulatory reporting (KNF, NBP, BFG).',
    'projects.p3.desc': 'Self-hosted, local 3D printer management solution with print-file upload (FTPS), printer status monitoring (MQTT) and real-time print progress tracking (IP camera and IoT streaming support).',
    'contact.title': 'Contact',
    'contact.body': 'Want to get in touch? Write to me:',
    'footer.copyPrefix': '©',
    'footer.copySuffix': 'All rights reserved.',
  },
};

function applyTranslations(lang) {
  const dict = translations[lang] || translations.pl;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.getAttribute('data-i18n-attr').split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (attr && dict[key] !== undefined) {
        el.setAttribute(attr, dict[key]);
      }
    });
  });

  document.documentElement.setAttribute('lang', lang);

  const langCode = document.querySelector('#langToggle .lang-code');
  if (langCode) {
    const nextLang = lang === 'pl' ? 'en' : 'pl';
    langCode.textContent = nextLang.toUpperCase();
  }

  try {
    localStorage.setItem('lang', lang);
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  let lang = 'pl';
  try {
    lang = localStorage.getItem('lang') || 'pl';
  } catch (e) {}

  applyTranslations(lang);

  const langToggle = document.getElementById('langToggle');
  langToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') || 'pl';
    const next = current === 'pl' ? 'en' : 'pl';
    applyTranslations(next);
  });
});
