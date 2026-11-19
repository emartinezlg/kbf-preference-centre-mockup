/* Newsletter subscriber: Marie Lambert (fictitious), French e-news.
   Topic labels: kbs-frb.be/xx/preference-center. Pillar descriptions: same page.
   Topics per language follow the current preference DEs (consent analysis, 16 Oct 2026). */
(function () {
  'use strict';
  var h = PC.h, t = PC.t;

  // c = pillar colour on kbs-frb.be
  var TOPICS = {
    general: {
      c: 'corporate',
      label: { fr: 'La FRB vous informe', nl: 'KBS informeert', en: 'KBF e-news', de: 'KBS informiert' },
      desc: {
        fr: 'Les actualités de la Fondation : appels à projets, études, prix et événements.',
        nl: 'Het nieuws van de Stichting: projectoproepen, studies, prijzen en evenementen.',
        en: 'News from the Foundation: calls for projects, studies, awards and events.',
        de: 'Neuigkeiten der Stiftung: Projektaufrufe, Studien, Preise und Veranstaltungen.'
      }
    },
    ostbelgien: {
      sub: 'general', c: 'corporate',
      label: 'KBS Ostbelgien',
      desc: {
        fr: 'Les actualités de la Fondation en Communauté germanophone.',
        nl: 'Nieuws van de Stichting in de Duitstalige Gemeenschap.',
        en: 'Foundation news for the German-speaking Community.',
        de: 'Neuigkeiten der Stiftung aus Ostbelgien.'
      }
    },
    health: {
      c: 'health',
      label: { fr: 'Santé', nl: 'Gezondheid', en: 'Health', de: 'Gesundheit' },
      desc: {
        fr: 'Investir dans la santé et la recherche médicale.',
        nl: 'Investeren in gezondheid en medisch onderzoek.',
        en: 'Investing in health and medical research.',
        de: 'Investition in Gesundheit und medizinische Forschung.'
      }
    },
    research: {
      c: 'health',
      label: { fr: 'Recherche biomédicale', nl: 'Biomedisch onderzoek', en: 'Biomedical research', de: 'Biomedizinische Forschung' },
      desc: {
        fr: 'Fonds, prix et résultats de la recherche biomédicale.',
        nl: 'Fondsen, prijzen en resultaten van biomedisch onderzoek.',
        en: 'Funds, prizes and results in biomedical research.',
        de: 'Fonds, Preise und Ergebnisse der biomedizinischen Forschung.'
      }
    },
    heritage: {
      c: 'heritage',
      label: { fr: 'Patrimoine', nl: 'Erfgoed', en: 'Heritage', de: 'Kulturerbe' },
      desc: {
        fr: 'Sauvegarder et pérenniser le patrimoine belge.',
        nl: 'Belgisch erfgoed beschermen en behouden.',
        en: 'Safeguarding Belgian heritage for the long term.',
        de: 'Wahrung und Verewigung des belgischen Kulturerbes.'
      }
    },
    poverty: {
      c: 'social',
      label: { fr: 'Justice sociale & pauvreté', nl: 'Sociale rechtvaardigheid & armoede', en: 'Social justice & poverty', de: 'Soziale Gerechtigkeit & Armut' },
      desc: {
        fr: 'Lutter contre la pauvreté et renforcer la cohésion sociale.',
        nl: 'Armoede bestrijden en de sociale samenhang versterken.',
        en: 'Fighting poverty and building social cohesion.',
        de: 'Armutsbekämpfung und Stärkung des sozialen Zusammenhalts.'
      }
    },
    housing: {
      c: 'social',
      label: { fr: 'Logement', nl: 'Huisvesting', en: 'Housing', de: 'Wohnen' },
      desc: {
        fr: 'L’accès à un logement abordable et de qualité.',
        nl: 'Toegang tot betaalbare en kwaliteitsvolle huisvesting.',
        en: 'Access to affordable, decent housing.',
        de: 'Zugang zu bezahlbarem und gutem Wohnraum.'
      }
    },
    employment: {
      c: 'social',
      label: { fr: 'Emploi', nl: 'Tewerkstelling', en: 'Employment', de: 'Beschäftigung' },
      desc: {
        fr: 'Un meilleur accès au travail et à la formation pour les publics fragilisés.',
        nl: 'Een betere toegang tot werk en opleidingen voor kwetsbare groepen.',
        en: 'Better access to work and training for vulnerable groups.',
        de: 'Besserer Zugang zu Arbeit und Ausbildung für benachteiligte Gruppen.'
      }
    },
    disability: {
      c: 'social',
      label: { fr: 'Personnes avec un handicap', nl: 'Personen met een beperking', en: 'People with disabilities', de: 'Menschen mit Behinderung' },
      desc: {
        fr: 'L’inclusion et la qualité de vie des personnes avec un handicap.',
        nl: 'Inclusie en levenskwaliteit van personen met een beperking.',
        en: 'Inclusion and quality of life for people with disabilities.',
        de: 'Inklusion und Lebensqualität von Menschen mit Behinderung.'
      }
    },
    climate: {
      c: 'climate',
      label: { fr: 'Climat, environnement et biodiversité', nl: 'Klimaat, milieu en biodiversiteit', en: 'Climate, environment and biodiversity', de: 'Klima, Umwelt und Biodiversität' },
      desc: {
        fr: 'Répondre aux enjeux climatiques et environnementaux.',
        nl: 'Antwoorden op klimaat- en milieu-uitdagingen.',
        en: 'Responding to climate and environmental challenges.',
        de: 'Antworten auf Klima- und Umweltherausforderungen.'
      }
    },
    animals: {
      c: 'climate',
      label: { fr: 'Les animaux & nous', nl: 'Mens & Dier', en: 'Animals & us', de: 'Mensch & Tier' },
      desc: {
        fr: 'Le bien-être animal et le lien entre l’homme et l’animal.',
        nl: 'Dierenwelzijn en de band tussen mens en dier.',
        en: 'Animal welfare and the bond between people and animals.',
        de: 'Tierschutz und die Beziehung zwischen Mensch und Tier.'
      }
    },
    education: {
      c: 'education',
      label: { fr: 'Education et développement des talents', nl: 'Onderwijs en ontwikkeling van talenten', en: 'Education and talent development', de: 'Bildung und Talententwicklung' },
      desc: {
        fr: 'Renforcer la qualité de l’enseignement et soutenir les talents.',
        nl: 'Gelijkheid bevorderen in het Belgisch onderwijs.',
        en: 'Improving the quality of teaching and supporting talented people.',
        de: 'Stärkung des Schulwesens und Talentförderung.'
      }
    },
    democracy: {
      c: 'democracy',
      label: { fr: 'Démocratie', nl: 'Democratie', en: 'Democracy', de: 'Demokratie' },
      desc: {
        fr: 'Ancrer la démocratie dans un monde en pleine évolution.',
        nl: 'Democratie verankeren in een wereld in verandering.',
        en: 'Anchoring democracy in a changing world.',
        de: 'Demokratie verankern in einer Welt im Wandel.'
      }
    },
    europe: {
      c: 'democracy',
      label: { fr: 'Europe', nl: 'Europa', en: 'Europe', de: 'Europa' },
      desc: {
        fr: 'La Fondation et ses partenaires en Europe.',
        nl: 'De Stichting en haar partners in Europa.',
        en: 'The Foundation and its partners across Europe.',
        de: 'Die Stiftung und ihre Partner in Europa.'
      }
    },
    international: {
      c: 'corporate',
      label: { fr: 'Afrique, Amérique du Sud et Asie', nl: 'Afrika, Zuid-Amerika en Azië', en: 'Africa, Latin America and Asia', de: 'Afrika, Lateinamerika und Asien' },
      desc: {
        fr: 'Nos actions avec des partenaires sur trois continents.',
        nl: 'Onze acties met partners op drie continenten.',
        en: 'Our work with partners on three continents.',
        de: 'Unsere Arbeit mit Partnern auf drei Kontinenten.'
      }
    }
  };

  var FR_NL = ['general', 'health', 'research', 'heritage', 'poverty', 'housing', 'employment',
    'disability', 'climate', 'animals', 'education', 'democracy', 'europe', 'international'];
  var EDITIONS = {
    fr: FR_NL,
    nl: FR_NL,
    en: ['general', 'europe', 'international', 'research', 'democracy'],
    de: ['ostbelgien', 'international', 'europe', 'research']
  };
  // Topics that exist only as an English edition, per subscriber language.
  var ENGLISH_ONLY = { fr: ['research', 'europe'], nl: ['research', 'europe'], en: [], de: ['international', 'europe', 'research'] };

  var STRINGS = {
    fr: {
      title: 'Gérer mes e-news',
      h1: 'Gérez vos e-news',
      lead: 'Bonjour Marie, choisissez les thèmes qui vous intéressent et la langue dans laquelle vous les recevez.',
      email: 'Adresse e-mail',
      lastChange: 'Dernière modification',
      editionTitle: 'Langue de vos e-news',
      editionHelp: 'La plupart des e-news paraissent en français et en néerlandais. Certaines n’existent qu’en anglais.',
      topicsTitle: 'Vos thèmes',
      topicsHelp: 'Activez les e-news que vous voulez recevoir.',
      count_one: 'Vous suivez {n} thème sur {total}.',
      count_other: 'Vous suivez {n} thèmes sur {total}.',
      dropped: 'Ces thèmes ne paraissent pas {lang} : {list}. Ils seront retirés de vos choix quand vous enregistrez.',
      errNone: 'Choisissez au moins un thème, ou désabonnez-vous de toutes les e-news en bas de la page.',
      historyTitle: 'Historique de vos choix',
      src_website: 'Inscription sur le site web',
      src_email: 'Préférences modifiées via le lien d’un e-mail',
      src_page: 'Préférences modifiées sur cette page',
      src_optout: 'Désabonnement de toutes les e-news',
      langChange: 'Langue : {from} → {to}',
      leaveTitle: 'Se désabonner',
      leaveBody: 'Vous ne voulez plus recevoir d’e-news de la Fondation ? Vous pouvez vous désabonner de toutes en une fois.',
      leaveBtn: 'Me désabonner de toutes les e-news',
      dlgTitle: 'Ne plus recevoir aucune e-news ?',
      dlgBody: 'Vous ne recevrez plus aucune e-news de la Fondation. Vous pouvez vous réabonner à tout moment sur cette page.',
      dlgCancel: 'Garder mes e-news',
      outTitle: 'Vous ne recevez plus aucune e-news.',
      outHelp: 'Vous avez changé d’avis ? Réabonnez-vous, puis enregistrez vos thèmes.',
      resubBtn: 'Me réabonner',
      outSaved: 'Désabonnement enregistré.'
    },
    nl: {
      title: 'Mijn nieuwsbrieven beheren',
      h1: 'Beheer uw nieuwsbrieven',
      lead: 'Dag Marie, kies de thema’s die u interesseren en de taal waarin u ze ontvangt.',
      email: 'E-mailadres',
      lastChange: 'Laatste wijziging',
      editionTitle: 'Taal van uw nieuwsbrieven',
      editionHelp: 'De meeste nieuwsbrieven verschijnen in het Nederlands en het Frans. Sommige bestaan alleen in het Engels.',
      topicsTitle: 'Uw thema’s',
      topicsHelp: 'Zet de nieuwsbrieven aan die u wilt ontvangen.',
      count_one: 'U volgt {n} van de {total} thema’s.',
      count_other: 'U volgt {n} van de {total} thema’s.',
      dropped: 'Deze thema’s verschijnen niet {lang}: {list}. Ze worden uit uw keuzes verwijderd wanneer u opslaat.',
      errNone: 'Kies minstens één thema, of schrijf u onderaan de pagina uit voor alle nieuwsbrieven.',
      historyTitle: 'Geschiedenis van uw keuzes',
      src_website: 'Inschrijving via de website',
      src_email: 'Voorkeuren gewijzigd via de link in een e-mail',
      src_page: 'Voorkeuren gewijzigd op deze pagina',
      src_optout: 'Uitgeschreven voor alle nieuwsbrieven',
      langChange: 'Taal: {from} → {to}',
      leaveTitle: 'Uitschrijven',
      leaveBody: 'Wilt u geen nieuwsbrieven van de Stichting meer ontvangen? U kunt zich in één keer voor alle nieuwsbrieven uitschrijven.',
      leaveBtn: 'Uitschrijven voor alle nieuwsbrieven',
      dlgTitle: 'Geen enkele nieuwsbrief meer ontvangen?',
      dlgBody: 'U ontvangt geen nieuwsbrieven van de Stichting meer. U kunt zich op elk moment opnieuw inschrijven via deze pagina.',
      dlgCancel: 'Mijn nieuwsbrieven behouden',
      outTitle: 'U ontvangt geen nieuwsbrieven meer.',
      outHelp: 'Van gedachten veranderd? Schrijf u opnieuw in en sla uw thema’s op.',
      resubBtn: 'Opnieuw inschrijven',
      outSaved: 'Uitschrijving opgeslagen.'
    },
    en: {
      title: 'Manage my e-news',
      h1: 'Manage your e-news',
      lead: 'Hello Marie, choose the topics you are interested in and the language you receive them in.',
      email: 'Email address',
      lastChange: 'Last change',
      editionTitle: 'Language of your e-news',
      editionHelp: 'Most e-news are published in French and Dutch. Some exist only in English.',
      topicsTitle: 'Your topics',
      topicsHelp: 'Switch on the e-news you want to receive.',
      count_one: 'You follow {n} of {total} topics.',
      count_other: 'You follow {n} of {total} topics.',
      dropped: 'These topics are not published {lang}: {list}. They will be removed from your choices when you save.',
      errNone: 'Choose at least one topic, or unsubscribe from all e-news at the bottom of the page.',
      historyTitle: 'History of your choices',
      src_website: 'Signed up on the website',
      src_email: 'Preferences changed through an email link',
      src_page: 'Preferences changed on this page',
      src_optout: 'Unsubscribed from all e-news',
      langChange: 'Language: {from} → {to}',
      leaveTitle: 'Unsubscribe',
      leaveBody: 'No longer want e-news from the Foundation? You can unsubscribe from all of them at once.',
      leaveBtn: 'Unsubscribe from all e-news',
      dlgTitle: 'Stop all e-news?',
      dlgBody: 'You will no longer receive any e-news from the Foundation. You can subscribe again on this page at any time.',
      dlgCancel: 'Keep my e-news',
      outTitle: 'You no longer receive any e-news.',
      outHelp: 'Changed your mind? Subscribe again, then save your topics.',
      resubBtn: 'Subscribe again',
      outSaved: 'Unsubscribe saved.'
    },
    de: {
      title: 'Meine e-news verwalten',
      h1: 'Verwalten Sie Ihre e-news',
      lead: 'Hallo Marie, wählen Sie die Themen, die Sie interessieren, und die Sprache, in der Sie sie erhalten.',
      email: 'E-Mail-Adresse',
      lastChange: 'Letzte Änderung',
      editionTitle: 'Sprache Ihrer e-news',
      editionHelp: 'Die meisten e-news erscheinen auf Französisch und Niederländisch. Einige gibt es nur auf Englisch.',
      topicsTitle: 'Ihre Themen',
      topicsHelp: 'Aktivieren Sie die e-news, die Sie erhalten möchten.',
      count_one: 'Sie folgen {n} von {total} Themen.',
      count_other: 'Sie folgen {n} von {total} Themen.',
      dropped: 'Diese Themen erscheinen nicht {lang}: {list}. Sie werden beim Speichern aus Ihrer Auswahl entfernt.',
      errNone: 'Wählen Sie mindestens ein Thema, oder melden Sie sich unten auf der Seite von allen e-news ab.',
      historyTitle: 'Verlauf Ihrer Auswahl',
      src_website: 'Anmeldung auf der Website',
      src_email: 'Einstellungen über den Link in einer E-Mail geändert',
      src_page: 'Einstellungen auf dieser Seite geändert',
      src_optout: 'Von allen e-news abgemeldet',
      langChange: 'Sprache: {from} → {to}',
      leaveTitle: 'Abmelden',
      leaveBody: 'Sie möchten keine e-news der Stiftung mehr erhalten? Sie können sich von allen auf einmal abmelden.',
      leaveBtn: 'Von allen e-news abmelden',
      dlgTitle: 'Keine e-news mehr erhalten?',
      dlgBody: 'Sie erhalten keine e-news der Stiftung mehr. Sie können sich jederzeit auf dieser Seite wieder anmelden.',
      dlgCancel: 'Meine e-news behalten',
      outTitle: 'Sie erhalten keine e-news mehr.',
      outHelp: 'Anders überlegt? Melden Sie sich wieder an und speichern Sie Ihre Themen.',
      resubBtn: 'Wieder anmelden',
      outSaved: 'Abmeldung gespeichert.'
    }
  };

  var state = {
    edition: 'fr',
    subs: { general: true, health: true, poverty: true, heritage: true },
    optedOut: false
  };

  // Newest first. Matches the kind of events MARKE holds today (website, email link).
  var history = [
    { date: '2025-09-05', source: 'email', changes: [{ k: 'heritage', on: true }, { k: 'poverty', on: true }] },
    { date: '2024-03-12', source: 'website', changes: [{ k: 'general', on: true }, { k: 'health', on: true }] }
  ];
  var freshEntry = false;
  var keptBeforeOptOut = null;

  function subKey(topicKey) { return TOPICS[topicKey].sub || topicKey; }
  function editionSubs(ed) { return EDITIONS[ed].map(subKey); }

  function selectedInEdition() {
    return editionSubs(state.edition).filter(function (s) { return state.subs[s]; });
  }

  function droppedSubs() {
    var avail = editionSubs(state.edition);
    return Object.keys(state.subs).filter(function (s) { return state.subs[s] && avail.indexOf(s) < 0; });
  }

  /* ---------- Rendering ---------- */

  function renderIdentity() {
    var last = history[0];
    PC.mount(document.getElementById('last-change'), [
      PC.fmtDate(last.date),
      h('small', { text: t('src_' + last.source) })
    ]);
  }

  function renderEditions() {
    var ul = document.getElementById('editions');
    PC.mount(ul, ['fr', 'nl', 'en', 'de'].map(function (code) {
      return h('li', { class: 'pill' }, [
        h('label', null, [
          h('input', {
            type: 'radio', name: 'edition', value: code, checked: state.edition === code,
            onchange: function () { state.edition = code; renderTopics(); PC.changed(); }
          }),
          h('span', { lang: code, text: PC.endonym(code) })
        ])
      ]);
    }));
  }

  function renderTopics() {
    var keys = EDITIONS[state.edition];
    var englishOnly = ENGLISH_ONLY[state.edition];
    var list = document.getElementById('topic-list');

    PC.mount(list, keys.map(function (key) {
      var s = subKey(key);
      var on = !!state.subs[s];
      var label = key === 'ostbelgien' ? TOPICS.ostbelgien.label : PC.pick(TOPICS[key].label);
      var li = h('li', { class: 'topic' + (on ? ' is-on' : ''), style: '--c: var(--' + TOPICS[key].c + ')' });
      var input = h('input', {
        type: 'checkbox', role: 'switch', checked: on,
        'aria-describedby': 'desc-' + key,
        onchange: function () {
          state.subs[s] = input.checked;
          li.classList.toggle('is-on', input.checked);
          renderCount();
          renderDropped();
          PC.changed();
        }
      });
      PC.mount(li, [
        h('label', { class: 'topic__label' }, [
          h('span', null, [
            h('span', { class: 'topic__title' }, [
              label,
              englishOnly.indexOf(key) >= 0 ? h('span', { class: 'tag', lang: PC.lang(), text: PC.inLang('en') }) : null
            ]),
            h('span', { class: 'topic__desc', id: 'desc-' + key, text: PC.pick(TOPICS[key].desc) })
          ]),
          h('span', { class: 'switch' }, [input, h('span', { class: 'switch__track', 'aria-hidden': 'true' })])
        ])
      ]);
      return li;
    }));
    renderCount();
    renderDropped();
  }

  function renderCount() {
    document.getElementById('topic-count').textContent =
      PC.tn('count', selectedInEdition().length, { total: EDITIONS[state.edition].length });
  }

  function renderDropped() {
    var box = document.getElementById('dropped');
    var gone = droppedSubs();
    box.hidden = gone.length === 0 || state.optedOut;
    if (!box.hidden) {
      box.textContent = t('dropped', {
        lang: PC.inLang(state.edition),
        list: gone.map(function (s) { return PC.pick(TOPICS[s].label); }).join(', ')
      });
    }
  }

  function renderHistory() {
    var ol = document.getElementById('history-list');
    if (freshEntry) document.getElementById('history').open = true;
    PC.mount(ol, history.map(function (e, i) {
      var chips = (e.changes || []).map(function (c) {
        if (c.type === 'lang') {
          return h('span', { class: 'change', text: t('langChange', { from: PC.langName(c.from), to: PC.langName(c.to) }) });
        }
        var label = c.k === 'general' && e.edition === 'de' ? TOPICS.ostbelgien.label : PC.pick(TOPICS[c.k].label);
        return h('span', { class: 'change' + (c.on ? '' : ' change--off'), text: (c.on ? '+ ' : '− ') + label });
      });
      return h('li', { class: i === 0 && freshEntry ? 'is-new' : null }, [
        h('span', { class: 'history__date', text: PC.fmtDate(e.date) }),
        h('span', null, [
          t('src_' + e.source),
          chips.length ? h('span', { class: 'changes' }, chips) : null
        ])
      ]);
    }));
    freshEntry = false;
  }

  function renderOptOut() {
    document.getElementById('optout').hidden = !state.optedOut;
    document.getElementById('prefs').disabled = state.optedOut;
    document.getElementById('leave').hidden = state.optedOut;
  }

  function render() {
    renderIdentity();
    renderEditions();
    renderTopics();
    renderHistory();
    renderOptOut();
  }

  /* ---------- Actions ---------- */

  function validate() {
    if (state.optedOut) return null;
    if (selectedInEdition().length === 0) return { key: 'errNone', target: 'topics' };
    return null;
  }

  function onSave(before, after) {
    var avail = editionSubs(after.edition);
    // Drop topics that do not exist in the chosen language.
    Object.keys(after.subs).forEach(function (s) { if (avail.indexOf(s) < 0) delete state.subs[s]; });

    var changes = [];
    if (before.edition !== after.edition) changes.push({ type: 'lang', from: before.edition, to: after.edition });
    var keys = avail.slice();
    Object.keys(before.subs).forEach(function (s) { if (keys.indexOf(s) < 0) keys.push(s); });
    keys.forEach(function (s) {
      var was = !!before.subs[s] && !before.optedOut;
      var now = !!state.subs[s];
      if (was !== now) changes.push({ k: s, on: now });
    });
    history.unshift({ date: PC.today(), source: 'page', edition: after.edition, changes: changes });
    freshEntry = true;
  }

  function unsubscribeAll() {
    PC.confirm({
      title: t('dlgTitle'), body: t('dlgBody'), confirm: t('leaveBtn'), cancel: t('dlgCancel'), danger: true
    }).then(function (ok) {
      if (!ok) return;
      keptBeforeOptOut = JSON.parse(JSON.stringify(state.subs));
      state.optedOut = true;
      state.subs = {};
      history.unshift({ date: PC.today(), source: 'optout', changes: [] });
      freshEntry = true;
      PC.commit('outSaved');
      document.getElementById('optout').focus();
    });
  }

  function resubscribe() {
    state.optedOut = false;
    state.subs = keptBeforeOptOut || { general: true };
    render();
    PC.changed();
    var first = document.querySelector('#topic-list input');
    if (first) first.focus();
  }

  document.getElementById('leave-btn').addEventListener('click', unsubscribeAll);
  document.getElementById('resub-btn').addEventListener('click', resubscribe);

  PC.init({
    strings: STRINGS,
    titleKey: 'title',
    defaultLang: 'fr',
    getState: function () { return state; },
    setState: function (s) { state = s; },
    render: render,
    validate: validate,
    onSave: onSave
  });
})();
