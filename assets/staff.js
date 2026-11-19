/* Staff member: Camille Dupont (fictitious), Communication team. */
(function () {
  'use strict';
  var h = PC.h;

  var COPIES = {
    general: {
      label: { fr: 'E-news générale', nl: 'Algemene nieuwsbrief', en: 'General e-news', de: 'Allgemeine e-news' },
      desc: { fr: 'La FRB vous informe, KBS informeert, KBF e-news, KBS Ostbelgien.', nl: 'KBS informeert, La FRB vous informe, KBF e-news, KBS Ostbelgien.', en: 'KBF e-news, La FRB vous informe, KBS informeert, KBS Ostbelgien.', de: 'KBS Ostbelgien, La FRB vous informe, KBS informeert, KBF e-news.' }
    },
    stories: {
      label: { fr: 'Stories', nl: 'Stories', en: 'Stories', de: 'Stories' },
      desc: { fr: 'Les envois consacrés à un projet ou à un partenaire.', nl: 'Mailings over één project of partner.', en: 'Mailings about a single project or partner.', de: 'Mailings zu einem Projekt oder Partner.' }
    },
    press: {
      label: { fr: 'Communiqués de presse', nl: 'Persberichten', en: 'Press releases', de: 'Pressemitteilungen' },
      desc: { fr: 'Communiqués et invitations de presse.', nl: 'Persberichten en persuitnodigingen.', en: 'Press releases and press invitations.', de: 'Pressemitteilungen und Presseeinladungen.' }
    }
  };

  var STRINGS = {
    fr: {
      title: 'Mes e-mails internes', h1: 'Vos e-mails internes',
      lead: 'Bonjour Camille, cette page réunit les e-mails que vous recevez en tant que membre du personnel de la Fondation.',
      role: 'Équipe Communication', email: 'Adresse e-mail',
      internalTitle: 'Newsletter interne',
      internalLabel: 'Newsletter interne',
      internalDesc: 'Envoyée à tout le personnel. Elle fait partie de l’information interne et ne peut pas être désactivée.',
      always: 'Toujours activée', internalLang: 'Langue de la newsletter interne',
      copiesTitle: 'Copies de contrôle des envois externes',
      copiesHelp: 'Recevez une copie de chaque envoi pour voir ce que reçoivent nos publics. Vous voyez cette section parce que vous faites partie de l’équipe Communication.',
      copiesLangs: 'Dans ces langues', errLangs: 'Choisissez au moins une langue pour vos copies de contrôle.',
      personalTitle: 'À titre personnel',
      personalBody: 'Les e-news thématiques sont ouvertes à tous. Pour les recevoir, abonnez-vous comme n’importe quel lecteur.',
      personalBtn: 'Choisir des e-news'
    },
    nl: {
      title: 'Mijn interne e-mails', h1: 'Uw interne e-mails',
      lead: 'Dag Camille, op deze pagina vindt u de e-mails die u als personeelslid van de Stichting ontvangt.',
      role: 'Team Communicatie', email: 'E-mailadres',
      internalTitle: 'Interne nieuwsbrief',
      internalLabel: 'Interne nieuwsbrief',
      internalDesc: 'Wordt naar alle personeelsleden verstuurd. Hij hoort bij de interne informatie en kan niet worden uitgeschakeld.',
      always: 'Altijd aan', internalLang: 'Taal van de interne nieuwsbrief',
      copiesTitle: 'Controlekopieën van externe mailings',
      copiesHelp: 'Ontvang een kopie van elke mailing om te zien wat ons publiek ontvangt. U ziet dit onderdeel omdat u deel uitmaakt van het team Communicatie.',
      copiesLangs: 'In deze talen', errLangs: 'Kies minstens één taal voor uw controlekopieën.',
      personalTitle: 'Persoonlijk',
      personalBody: 'De thematische nieuwsbrieven staan open voor iedereen. Wilt u ze ontvangen, schrijf u dan in zoals elke lezer.',
      personalBtn: 'Nieuwsbrieven kiezen'
    },
    en: {
      title: 'My internal emails', h1: 'Your internal emails',
      lead: 'Hello Camille, this page brings together the emails you receive as a member of the Foundation’s staff.',
      role: 'Communication team', email: 'Email address',
      internalTitle: 'Internal newsletter',
      internalLabel: 'Internal newsletter',
      internalDesc: 'Sent to all staff. It is part of internal information and cannot be switched off.',
      always: 'Always on', internalLang: 'Language of the internal newsletter',
      copiesTitle: 'Check copies of external mailings',
      copiesHelp: 'Receive a copy of each mailing to see what our audiences receive. You see this section because you are part of the Communication team.',
      copiesLangs: 'In these languages', errLangs: 'Choose at least one language for your check copies.',
      personalTitle: 'In a personal capacity',
      personalBody: 'The topic e-news are open to everyone. To receive them, subscribe like any other reader.',
      personalBtn: 'Choose e-news'
    },
    de: {
      title: 'Meine internen E-Mails', h1: 'Ihre internen E-Mails',
      lead: 'Hallo Camille, auf dieser Seite finden Sie die E-Mails, die Sie als Mitglied des Personals der Stiftung erhalten.',
      role: 'Team Kommunikation', email: 'E-Mail-Adresse',
      internalTitle: 'Interner Newsletter',
      internalLabel: 'Interner Newsletter',
      internalDesc: 'Geht an das gesamte Personal. Er gehört zur internen Information und kann nicht abbestellt werden.',
      always: 'Immer aktiv', internalLang: 'Sprache des internen Newsletters',
      copiesTitle: 'Kontrollkopien externer Mailings',
      copiesHelp: 'Erhalten Sie eine Kopie jedes Mailings, um zu sehen, was unsere Zielgruppen erhalten. Sie sehen diesen Bereich, weil Sie zum Team Kommunikation gehören.',
      copiesLangs: 'In diesen Sprachen', errLangs: 'Wählen Sie mindestens eine Sprache für Ihre Kontrollkopien.',
      personalTitle: 'Persönlich',
      personalBody: 'Die thematischen e-news stehen allen offen. Um sie zu erhalten, melden Sie sich wie alle Leserinnen und Leser an.',
      personalBtn: 'e-news auswählen'
    }
  };

  var state = { internalLang: 'fr', copies: { general: true, stories: true, press: true }, copyLangs: { fr: true, nl: true } };

  function pill(type, name, value, checked, label, onchange) {
    var input = h('input', { type: type, name: name, value: value, checked: checked });
    input.addEventListener('change', function () { onchange(input.checked); });
    return h('li', { class: 'pill' }, [h('label', null, [input, h('span', { text: label })])]);
  }

  function render() {
    PC.mount(document.getElementById('internal-lang'), ['fr', 'nl', 'en'].map(function (code) {
      return pill('radio', 'internalLang', code, state.internalLang === code, PC.endonym(code), function () {
        state.internalLang = code; PC.changed();
      });
    }));

    PC.mount(document.getElementById('copies'), Object.keys(COPIES).map(function (k) {
      var on = !!state.copies[k];
      var li = h('li', { class: 'topic' + (on ? ' is-on' : ''), style: '--c: var(--teal-7)' });
      var input = h('input', { type: 'checkbox', role: 'switch', checked: on });
      input.addEventListener('change', function () {
        state.copies[k] = input.checked;
        li.classList.toggle('is-on', input.checked);
        PC.changed();
      });
      PC.mount(li, [h('label', { class: 'topic__label' }, [
        h('span', null, [
          h('span', { class: 'topic__title', text: PC.pick(COPIES[k].label) }),
          h('span', { class: 'topic__desc', text: PC.pick(COPIES[k].desc) })
        ]),
        h('span', { class: 'switch' }, [input, h('span', { class: 'switch__track', 'aria-hidden': 'true' })])
      ])]);
      return li;
    }));

    PC.mount(document.getElementById('copy-langs'), ['fr', 'nl', 'en', 'de'].map(function (code) {
      return pill('checkbox', 'copyLang', code, !!state.copyLangs[code], PC.endonym(code), function (on) {
        if (on) state.copyLangs[code] = true; else delete state.copyLangs[code];
        PC.changed();
      });
    }));
  }

  PC.init({
    strings: STRINGS,
    titleKey: 'title',
    defaultLang: 'fr',
    getState: function () { return state; },
    setState: function (s) { state = s; },
    render: render,
    validate: function () {
      var anyCopy = Object.keys(state.copies).some(function (k) { return state.copies[k]; });
      return anyCopy && Object.keys(state.copyLangs).length === 0 ? { key: 'errLangs', target: 'copy-langs' } : null;
    }
  });
})();
