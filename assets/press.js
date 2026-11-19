/* Press contact: Lotte Peeters (fictitious), freelance journalist, Dutch press releases.
   Chips = the press tags in Salesforce (Press_Tag__c), 53 with a DE per language
   (press audience analysis, 16 Oct 2026). Internal tags are not shown: VIP,
   My visibility, Girly, Alternative, Test. */
(function () {
  'use strict';
  var h = PC.h, t = PC.t;

  var SUBJECTS = {
    general: { fr: 'Général', nl: 'Algemeen', en: 'General', de: 'Allgemein' },
    social: { fr: 'Social', nl: 'Sociaal', en: 'Social affairs', de: 'Soziales' },
    society: { fr: 'Société', nl: 'Samenleving', en: 'Society', de: 'Gesellschaft' },
    poverty: { fr: 'Pauvreté', nl: 'Armoede', en: 'Poverty', de: 'Armut' },
    health: { fr: 'Santé', nl: 'Gezondheid', en: 'Health', de: 'Gesundheit' },
    dementia: { fr: 'Démence', nl: 'Dementie', en: 'Dementia', de: 'Demenz' },
    disability: { fr: 'Handicap', nl: 'Beperking', en: 'Disability', de: 'Behinderung' },
    seniors: { fr: 'Seniors', nl: 'Senioren', en: 'Older people', de: 'Senioren' },
    youth: { fr: 'Jeunesse', nl: 'Jongeren', en: 'Youth', de: 'Jugend' },
    education: { fr: 'Enseignement', nl: 'Onderwijs', en: 'Education', de: 'Bildung' },
    research: { fr: 'Recherche', nl: 'Onderzoek', en: 'Research', de: 'Forschung' },
    sciences: { fr: 'Sciences', nl: 'Wetenschappen', en: 'Science', de: 'Wissenschaft' },
    economy: { fr: 'Économie', nl: 'Economie', en: 'Economy', de: 'Wirtschaft' },
    hr: { fr: 'Ressources humaines', nl: 'Human resources', en: 'Human resources', de: 'Personalwesen' },
    digital: { fr: 'Numérique', nl: 'Digitaal', en: 'Digital', de: 'Digitales' },
    migration: { fr: 'Migration', nl: 'Migratie', en: 'Migration', de: 'Migration' },
    sustainability: { fr: 'Développement durable', nl: 'Duurzaamheid', en: 'Sustainability', de: 'Nachhaltigkeit' },
    environment: { fr: 'Environnement', nl: 'Milieu', en: 'Environment', de: 'Umwelt' },
    heritage: { fr: 'Patrimoine', nl: 'Erfgoed', en: 'Heritage', de: 'Kulturerbe' },
    film: { fr: 'Cinéma', nl: 'Film', en: 'Film', de: 'Film' },
    photo: { fr: 'Photographie', nl: 'Fotografie', en: 'Photography', de: 'Fotografie' },
    belvue: { fr: 'Musée BELvue', nl: 'BELvue museum', en: 'BELvue museum', de: 'BELvue-Museum' },
    royal: { fr: 'Maison royale', nl: 'Koningshuis', en: 'Royal Household', de: 'Königshaus' },
    philanthropy: { fr: 'Philanthropie', nl: 'Filantropie', en: 'Philanthropy', de: 'Philanthropie' },
    europe: { fr: 'Europe', nl: 'Europa', en: 'Europe', de: 'Europa' },
    international: { fr: 'International', nl: 'Internationaal', en: 'International', de: 'International' },
    africa: { fr: 'Afrique', nl: 'Afrika', en: 'Africa', de: 'Afrika' },
    balkans: { fr: 'Balkans', nl: 'Balkan', en: 'Balkans', de: 'Balkan' },
    development: { fr: 'Coopération au développement', nl: 'Ontwikkelingssamenwerking', en: 'Development cooperation', de: 'Entwicklungszusammenarbeit' },
    sport: { fr: 'Sport', nl: 'Sport', en: 'Sport', de: 'Sport' },
    horses: { fr: 'Chevaux', nl: 'Paarden', en: 'Horses', de: 'Pferde' }
  };

  var REGIONS = {
    brussels: { fr: 'Bruxelles', nl: 'Brussel', en: 'Brussels', de: 'Brüssel' },
    antwerpen: { fr: 'Anvers', nl: 'Antwerpen', en: 'Antwerp', de: 'Antwerpen' },
    limburg: { fr: 'Limbourg', nl: 'Limburg', en: 'Limburg', de: 'Limburg' },
    oostvl: { fr: 'Flandre orientale', nl: 'Oost-Vlaanderen', en: 'East Flanders', de: 'Ostflandern' },
    westvl: { fr: 'Flandre occidentale', nl: 'West-Vlaanderen', en: 'West Flanders', de: 'Westflandern' },
    vlbrabant: { fr: 'Brabant flamand', nl: 'Vlaams-Brabant', en: 'Flemish Brabant', de: 'Flämisch-Brabant' },
    brabantw: { fr: 'Brabant wallon', nl: 'Waals-Brabant', en: 'Walloon Brabant', de: 'Wallonisch-Brabant' },
    hainaut: { fr: 'Hainaut', nl: 'Henegouwen', en: 'Hainaut', de: 'Hennegau' },
    liege: { fr: 'Liège', nl: 'Luik', en: 'Liège', de: 'Lüttich' },
    namur: { fr: 'Namur', nl: 'Namen', en: 'Namur', de: 'Namur' },
    luxembourg: { fr: 'Luxembourg (province)', nl: 'Luxemburg (provincie)', en: 'Luxembourg (province)', de: 'Luxemburg (Provinz)' },
    brugge: { fr: 'Bruges', nl: 'Brugge', en: 'Bruges', de: 'Brügge' },
    gent: { fr: 'Gand', nl: 'Gent', en: 'Ghent', de: 'Gent' },
    kortrijk: { fr: 'Courtrai', nl: 'Kortrijk', en: 'Kortrijk', de: 'Kortrijk' },
    leuven: { fr: 'Louvain', nl: 'Leuven', en: 'Leuven', de: 'Löwen' },
    mechelen: { fr: 'Malines', nl: 'Mechelen', en: 'Mechelen', de: 'Mecheln' },
    oostende: { fr: 'Ostende', nl: 'Oostende', en: 'Ostend', de: 'Ostende' },
    verviers: { fr: 'Verviers', nl: 'Verviers', en: 'Verviers', de: 'Verviers' }
  };

  var STRINGS = {
    fr: {
      title: 'Mes communiqués de presse',
      h1: 'Vos communiqués de presse',
      lead: 'Bonjour Lotte, vous recevez nos communiqués parce que vous figurez sur notre liste de presse. Choisissez les sujets, les régions et les langues que vous suivez.',
      role: 'Journaliste indépendante',
      email: 'Adresse e-mail',
      since: 'Sur notre liste de presse depuis',
      whyTitle: 'Pourquoi recevez-vous ces e-mails ?',
      whyBody: 'Nous envoyons nos communiqués aux journalistes sur la base de notre intérêt légitime à informer la presse. Vous pouvez vous y opposer à tout moment, en bas de cette page. Cela ne change rien à nos e-news.',
      langsTitle: 'Langues des communiqués',
      langsHelp: 'Choisissez une ou plusieurs langues.',
      topicsTitle: 'Sujets et régions',
      topicsHelp: 'Vous recevez les communiqués qui portent sur au moins un de vos choix.',
      subjects: 'Sujets',
      regions: 'Régions',
      selected_one: '{n} sélectionné',
      selected_other: '{n} sélectionnés',
      errLangs: 'Choisissez au moins une langue.',
      errTags: 'Choisissez au moins un sujet ou une région, ou arrêtez tous les communiqués en bas de la page.',
      newsTitle: 'Nos e-news',
      newsBody: 'Les e-news sont un abonnement distinct, que vous choisissez vous-même. Vous ne les recevez pas pour le moment.',
      newsBtn: 'Choisir des e-news',
      stopTitle: 'Ne plus recevoir de communiqués',
      stopBody: 'Vous ne recevrez plus aucun communiqué ni invitation de presse de la Fondation.',
      stopBtn: 'Arrêter tous les communiqués',
      dlgTitle: 'Arrêter tous les communiqués de presse ?',
      dlgBody: 'Vous ne recevrez plus aucun communiqué ni invitation de presse de la Fondation. Vos abonnements aux e-news ne changent pas.',
      dlgCancel: 'Continuer à les recevoir',
      stoppedTitle: 'Vous ne recevez plus nos communiqués de presse.',
      stoppedHelp: 'Vous pouvez les recevoir à nouveau quand vous voulez.',
      resumeBtn: 'Les recevoir à nouveau',
      stoppedSaved: 'C’est noté : plus de communiqués de presse.'
    },
    nl: {
      title: 'Mijn persberichten',
      h1: 'Uw persberichten',
      lead: 'Dag Lotte, u ontvangt onze persberichten omdat u op onze perslijst staat. Kies de onderwerpen, regio’s en talen die u volgt.',
      role: 'Freelance journaliste',
      email: 'E-mailadres',
      since: 'Op onze perslijst sinds',
      whyTitle: 'Waarom ontvangt u deze e-mails?',
      whyBody: 'We sturen onze persberichten naar journalisten op basis van ons gerechtvaardigd belang om de pers te informeren. U kunt zich daar op elk moment tegen verzetten, onderaan deze pagina. Dat verandert niets aan onze nieuwsbrieven.',
      langsTitle: 'Taal van de persberichten',
      langsHelp: 'Kies een of meer talen.',
      topicsTitle: 'Onderwerpen en regio’s',
      topicsHelp: 'U ontvangt de persberichten over minstens één van uw keuzes.',
      subjects: 'Onderwerpen',
      regions: 'Regio’s',
      selected_one: '{n} gekozen',
      selected_other: '{n} gekozen',
      errLangs: 'Kies minstens één taal.',
      errTags: 'Kies minstens één onderwerp of regio, of stop alle persberichten onderaan de pagina.',
      newsTitle: 'Onze nieuwsbrieven',
      newsBody: 'De nieuwsbrieven zijn een apart abonnement dat u zelf kiest. U ontvangt ze momenteel niet.',
      newsBtn: 'Nieuwsbrieven kiezen',
      stopTitle: 'Geen persberichten meer ontvangen',
      stopBody: 'U ontvangt geen persberichten of persuitnodigingen van de Stichting meer.',
      stopBtn: 'Alle persberichten stoppen',
      dlgTitle: 'Alle persberichten stoppen?',
      dlgBody: 'U ontvangt geen persberichten of persuitnodigingen van de Stichting meer. Uw inschrijvingen op de nieuwsbrieven blijven ongewijzigd.',
      dlgCancel: 'Ze blijven ontvangen',
      stoppedTitle: 'U ontvangt onze persberichten niet meer.',
      stoppedHelp: 'U kunt ze op elk moment opnieuw ontvangen.',
      resumeBtn: 'Opnieuw ontvangen',
      stoppedSaved: 'Genoteerd: geen persberichten meer.'
    },
    en: {
      title: 'My press releases',
      h1: 'Your press releases',
      lead: 'Hello Lotte, you receive our press releases because you are on our press list. Choose the subjects, regions and languages you follow.',
      role: 'Freelance journalist',
      email: 'Email address',
      since: 'On our press list since',
      whyTitle: 'Why do you receive these emails?',
      whyBody: 'We send press releases to journalists on the basis of our legitimate interest in informing the press. You can object at any time at the bottom of this page. This does not affect our e-news.',
      langsTitle: 'Languages of the press releases',
      langsHelp: 'Choose one or more languages.',
      topicsTitle: 'Subjects and regions',
      topicsHelp: 'You receive the press releases about at least one of your choices.',
      subjects: 'Subjects',
      regions: 'Regions',
      selected_one: '{n} selected',
      selected_other: '{n} selected',
      errLangs: 'Choose at least one language.',
      errTags: 'Choose at least one subject or region, or stop all press releases at the bottom of the page.',
      newsTitle: 'Our e-news',
      newsBody: 'The e-news are a separate subscription that you choose yourself. You do not receive them at the moment.',
      newsBtn: 'Choose e-news',
      stopTitle: 'Stop press releases',
      stopBody: 'You will no longer receive press releases or press invitations from the Foundation.',
      stopBtn: 'Stop all press releases',
      dlgTitle: 'Stop all press releases?',
      dlgBody: 'You will no longer receive press releases or press invitations from the Foundation. Your e-news subscriptions do not change.',
      dlgCancel: 'Keep receiving them',
      stoppedTitle: 'You no longer receive our press releases.',
      stoppedHelp: 'You can receive them again whenever you like.',
      resumeBtn: 'Receive them again',
      stoppedSaved: 'Done: no more press releases.'
    },
    de: {
      title: 'Meine Pressemitteilungen',
      h1: 'Ihre Pressemitteilungen',
      lead: 'Hallo Lotte, Sie erhalten unsere Pressemitteilungen, weil Sie auf unserer Presseliste stehen. Wählen Sie die Themen, Regionen und Sprachen, die Sie verfolgen.',
      role: 'Freie Journalistin',
      email: 'E-Mail-Adresse',
      since: 'Auf unserer Presseliste seit',
      whyTitle: 'Warum erhalten Sie diese E-Mails?',
      whyBody: 'Wir versenden Pressemitteilungen an Journalistinnen und Journalisten auf Grundlage unseres berechtigten Interesses, die Presse zu informieren. Sie können dem jederzeit unten auf dieser Seite widersprechen. An unseren e-news ändert das nichts.',
      langsTitle: 'Sprachen der Pressemitteilungen',
      langsHelp: 'Wählen Sie eine oder mehrere Sprachen.',
      topicsTitle: 'Themen und Regionen',
      topicsHelp: 'Sie erhalten die Pressemitteilungen zu mindestens einer Ihrer Auswahlen.',
      subjects: 'Themen',
      regions: 'Regionen',
      selected_one: '{n} ausgewählt',
      selected_other: '{n} ausgewählt',
      errLangs: 'Wählen Sie mindestens eine Sprache.',
      errTags: 'Wählen Sie mindestens ein Thema oder eine Region, oder bestellen Sie unten auf der Seite alle Pressemitteilungen ab.',
      newsTitle: 'Unsere e-news',
      newsBody: 'Die e-news sind ein separates Abonnement, das Sie selbst wählen. Sie erhalten sie derzeit nicht.',
      newsBtn: 'e-news auswählen',
      stopTitle: 'Keine Pressemitteilungen mehr erhalten',
      stopBody: 'Sie erhalten keine Pressemitteilungen oder Presseeinladungen der Stiftung mehr.',
      stopBtn: 'Alle Pressemitteilungen abbestellen',
      dlgTitle: 'Alle Pressemitteilungen abbestellen?',
      dlgBody: 'Sie erhalten keine Pressemitteilungen oder Presseeinladungen der Stiftung mehr. Ihre e-news-Abonnements bleiben unverändert.',
      dlgCancel: 'Weiter erhalten',
      stoppedTitle: 'Sie erhalten unsere Pressemitteilungen nicht mehr.',
      stoppedHelp: 'Sie können sie jederzeit wieder erhalten.',
      resumeBtn: 'Wieder erhalten',
      stoppedSaved: 'Erledigt: keine Pressemitteilungen mehr.'
    }
  };

  var state = {
    langs: { nl: true },
    tags: { social: true, health: true, poverty: true, dementia: true, seniors: true, antwerpen: true, mechelen: true },
    stopped: false
  };
  var keptBeforeStop = null;

  function count(dict) {
    return Object.keys(dict).filter(function (k) { return state.tags[k]; }).length;
  }

  function chip(name, value, checked, label, onchange) {
    var input = h('input', { type: 'checkbox', name: name, value: value, checked: checked });
    input.addEventListener('change', function () { onchange(input.checked); });
    return h('li', { class: 'pill' }, [h('label', null, [input, h('span', { text: label })])]);
  }

  function sorted(dict) {
    var locale = PC.lang();
    return Object.keys(dict).sort(function (a, b) {
      return PC.pick(dict[a]).localeCompare(PC.pick(dict[b]), locale);
    });
  }

  function renderLangs() {
    PC.mount(document.getElementById('press-langs'), ['nl', 'fr', 'en', 'de'].map(function (code) {
      return chip('lang', code, !!state.langs[code], PC.endonym(code), function (on) {
        if (on) state.langs[code] = true; else delete state.langs[code];
        PC.changed();
      });
    }));
  }

  function renderGroup(listId, countId, dict) {
    PC.mount(document.getElementById(listId), sorted(dict).map(function (k) {
      return chip('tag', k, !!state.tags[k], PC.pick(dict[k]), function (on) {
        if (on) state.tags[k] = true; else delete state.tags[k];
        renderCounts();
        PC.changed();
      });
    }));
  }

  function renderCounts() {
    document.getElementById('subjects-count').textContent = PC.tn('selected', count(SUBJECTS));
    document.getElementById('regions-count').textContent = PC.tn('selected', count(REGIONS));
  }

  function renderStopped() {
    document.getElementById('stopped').hidden = !state.stopped;
    document.getElementById('prefs').disabled = state.stopped;
    document.getElementById('stop').hidden = state.stopped;
  }

  function render() {
    document.getElementById('since').textContent = PC.fmtDate('2024-03-14');
    renderLangs();
    renderGroup('subjects', 'subjects-count', SUBJECTS);
    renderGroup('regions', 'regions-count', REGIONS);
    renderCounts();
    renderStopped();
  }

  function validate() {
    if (state.stopped) return null;
    if (Object.keys(state.langs).length === 0) return { key: 'errLangs', target: 'press-langs' };
    if (Object.keys(state.tags).length === 0) return { key: 'errTags', target: 'topics' };
    return null;
  }

  function stopAll() {
    PC.confirm({
      title: t('dlgTitle'), body: t('dlgBody'), confirm: t('stopBtn'), cancel: t('dlgCancel'), danger: true
    }).then(function (ok) {
      if (!ok) return;
      keptBeforeStop = JSON.parse(JSON.stringify({ langs: state.langs, tags: state.tags }));
      state.stopped = true;
      PC.commit('stoppedSaved');
      document.getElementById('stopped').focus();
    });
  }

  function resume() {
    state.stopped = false;
    if (keptBeforeStop) {
      state.langs = keptBeforeStop.langs;
      state.tags = keptBeforeStop.tags;
    }
    render();
    PC.changed();
    var first = document.querySelector('#press-langs input');
    if (first) first.focus();
  }

  document.getElementById('stop-btn').addEventListener('click', stopAll);
  document.getElementById('resume-btn').addEventListener('click', resume);

  PC.init({
    strings: STRINGS,
    titleKey: 'title',
    defaultLang: 'nl',
    getState: function () { return state; },
    setState: function (s) { state = s; },
    render: render,
    validate: validate
  });
})();
