/* KBF preference centre mockup: shared behaviour.
   No data leaves the page: every "save" only changes the in-memory state.
   The DOM is built with createElement/textContent only (helper h()). */
(function () {
  'use strict';

  var LANGS = ['nl', 'fr', 'de', 'en'];                 // header order, as on kbs-frb.be
  var LOCALES = { fr: 'fr-BE', nl: 'nl-BE', en: 'en-GB', de: 'de-BE' };
  var ENDONYMS = { fr: 'Français', nl: 'Nederlands', en: 'English', de: 'Deutsch' };

  var COMMON = {
    fr: {
      org: 'Fondation Roi Baudouin',
      mockup: 'Maquette avec des données fictives',
      allMockups: 'Toutes les maquettes',
      pageLang: 'Langue de la page',
      unsaved: 'Vous avez des modifications non enregistrées.',
      discard: 'Annuler les modifications',
      save: 'Enregistrer mes préférences',
      saved: 'Vos préférences sont enregistrées.',
      address: 'Rue Brederode 21, 1000 Bruxelles',
      privacy: 'Vie privée',
      contact: 'Contact',
      langNames: { fr: 'français', nl: 'néerlandais', en: 'anglais', de: 'allemand' },
      inLang: 'en {lang}'
    },
    nl: {
      org: 'Koning Boudewijnstichting',
      mockup: 'Mock-up met fictieve gegevens',
      allMockups: 'Alle mock-ups',
      pageLang: 'Taal van de pagina',
      unsaved: 'U hebt niet-opgeslagen wijzigingen.',
      discard: 'Wijzigingen annuleren',
      save: 'Mijn voorkeuren opslaan',
      saved: 'Uw voorkeuren zijn opgeslagen.',
      address: 'Brederodestraat 21, 1000 Brussel',
      privacy: 'Privacy',
      contact: 'Contact',
      langNames: { fr: 'Frans', nl: 'Nederlands', en: 'Engels', de: 'Duits' },
      inLang: 'in het {lang}'
    },
    en: {
      org: 'King Baudouin Foundation',
      mockup: 'Mockup with fictitious data',
      allMockups: 'All mockups',
      pageLang: 'Page language',
      unsaved: 'You have unsaved changes.',
      discard: 'Discard changes',
      save: 'Save my preferences',
      saved: 'Your preferences are saved.',
      address: 'Rue Brederode 21, 1000 Brussels',
      privacy: 'Privacy',
      contact: 'Contact',
      langNames: { fr: 'French', nl: 'Dutch', en: 'English', de: 'German' },
      inLang: 'in {lang}'
    },
    de: {
      org: 'König-Baudouin-Stiftung',
      mockup: 'Entwurf mit fiktiven Daten',
      allMockups: 'Alle Entwürfe',
      pageLang: 'Sprache der Seite',
      unsaved: 'Sie haben nicht gespeicherte Änderungen.',
      discard: 'Änderungen verwerfen',
      save: 'Meine Einstellungen speichern',
      saved: 'Ihre Einstellungen wurden gespeichert.',
      address: 'Rue Brederode 21, 1000 Brüssel',
      privacy: 'Datenschutz',
      contact: 'Kontakt',
      langNames: { fr: 'Französisch', nl: 'Niederländisch', en: 'Englisch', de: 'Deutsch' },
      inLang: 'auf {lang}'
    }
  };

  var cfg = null;
  var lang = 'fr';
  var savedSnap = '';
  var bar, barMsg, barTimer, dialogEl;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* Tiny DOM builder. attrs: class, text, on<event>, boolean props (checked,
     disabled, open, hidden), anything else becomes an attribute. */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k.indexOf('on') === 0 && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (v === true) { el[k] = true; el.setAttribute(k, ''); }
        else el.setAttribute(k, v);
      });
    }
    append(el, kids);
    return el;
  }

  function append(el, kids) {
    (kids || []).forEach(function (c) {
      if (c == null || c === false) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }

  function mount(parent, kids) {
    while (parent.firstChild) parent.removeChild(parent.firstChild);
    return append(parent, kids);
  }

  function lookup(l, key) {
    var page = cfg && cfg.strings && cfg.strings[l];
    if (page && page[key] != null) return page[key];
    if (COMMON[l] && COMMON[l][key] != null) return COMMON[l][key];
    return null;
  }

  function t(key, vars) {
    var s = lookup(lang, key);
    if (s == null) s = lookup('en', key);
    if (s == null) return key;
    if (vars && typeof s === 'string') {
      s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    }
    return s;
  }

  // Plural-aware: looks for key_one / key_other.
  function tn(key, n, vars) {
    var form = new Intl.PluralRules(LOCALES[lang]).select(n);
    var k = lookup(lang, key + '_' + form) != null ? key + '_' + form : key + '_other';
    return t(k, Object.assign({ n: n }, vars || {}));
  }

  function langName(code) { return t('langNames')[code] || code; }
  function inLang(code) { return t('inLang', { lang: langName(code) }); }

  // Value for the current language from {fr:…, nl:…, en:…, de:…}.
  function pick(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] != null ? obj[lang] : (obj.en != null ? obj.en : '');
  }

  function fmtDate(iso) {
    var d = iso ? new Date(iso + 'T12:00:00') : new Date();
    return new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  }

  function today() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function session(key, value) {
    try {
      if (value === undefined) return window.sessionStorage.getItem(key);
      window.sessionStorage.setItem(key, value);
    } catch (e) { /* storage unavailable: ignore */ }
    return null;
  }

  /* ---------- Language ---------- */

  function renderLangSwitch() {
    var ul = $('.langs');
    if (!ul) return;
    ul.setAttribute('aria-label', t('pageLang'));
    mount(ul, LANGS.map(function (l) {
      return h('li', null, [
        h('button', {
          type: 'button', lang: l, 'data-lang': l, 'aria-label': ENDONYMS[l],
          'aria-current': l === lang ? 'true' : null, text: l
        })
      ]);
    }));
  }

  function applyStatic() {
    $all('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $all('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
    var logo = $('.logo img');
    if (logo) {
      logo.src = 'assets/logos/logo-' + lang + '-50y.svg';
      logo.alt = t('org');
    }
    $all('a[data-keep-lang]').forEach(function (a) {
      var base = a.getAttribute('href').split('?')[0];
      a.setAttribute('href', base + '?lang=' + lang);
    });
    if (cfg && cfg.titleKey) document.title = t(cfg.titleKey) + ' | ' + t('org');
  }

  function setLang(l, opts) {
    if (LANGS.indexOf(l) < 0) return;
    lang = l;
    document.documentElement.lang = l;
    renderLangSwitch();
    applyStatic();
    if (cfg && cfg.render) cfg.render();
    if (bar) refreshBarText();
    if (!(opts && opts.silent)) {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('lang', l);
        window.history.replaceState(null, '', url.toString());
      } catch (e) { /* file:// may refuse: ignore */ }
    }
  }

  /* ---------- Save bar ---------- */

  function snap() { return JSON.stringify(cfg.getState()); }
  function isDirty() { return snap() !== savedSnap; }

  function buildBar() {
    barMsg = h('p', { class: 'savebar__msg', 'aria-live': 'polite' });
    bar = h('div', { class: 'savebar', role: 'region' }, [
      h('div', { class: 'wrap' }, [
        barMsg,
        h('div', { class: 'savebar__actions' }, [
          h('button', { type: 'button', class: 'btn-text', 'data-act': 'discard', onclick: discard }),
          h('button', { type: 'button', class: 'btn btn--teal', 'data-act': 'save', onclick: save })
        ])
      ])
    ]);
    document.body.appendChild(bar);
  }

  function refreshBarText() {
    $('[data-act="discard"]', bar).textContent = t('discard');
    $('[data-act="save"]', bar).textContent = t('save');
    bar.setAttribute('aria-label', t('save'));
    if (bar.classList.contains('is-saved')) barMsg.textContent = t(bar.getAttribute('data-saved-key') || 'saved');
    else if (bar.classList.contains('is-error')) barMsg.textContent = t(bar.getAttribute('data-error-key'));
    else barMsg.textContent = t('unsaved');
  }

  function showBar(show) {
    bar.classList.toggle('is-visible', show);
    document.body.classList.toggle('has-savebar', show);
  }

  function changed() {
    clearTimeout(barTimer);
    bar.classList.remove('is-saved', 'is-error');
    refreshBarText();
    showBar(isDirty());
  }

  function flashSaved(key) {
    clearTimeout(barTimer);
    bar.classList.remove('is-error');
    bar.classList.add('is-saved');
    bar.setAttribute('data-saved-key', key || 'saved');
    refreshBarText();
    showBar(true);
    barTimer = setTimeout(function () {
      showBar(false);
      setTimeout(function () { bar.classList.remove('is-saved'); refreshBarText(); }, 350);
    }, 2800);
  }

  function save() {
    var err = cfg.validate ? cfg.validate() : null;
    if (err) {
      bar.classList.add('is-error');
      bar.setAttribute('data-error-key', err.key);
      refreshBarText();
      if (err.target) {
        var el = document.getElementById(err.target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    var before = JSON.parse(savedSnap);
    if (cfg.onSave) cfg.onSave(before, cfg.getState());
    savedSnap = snap();
    cfg.render();
    flashSaved('saved');
  }

  function discard() {
    cfg.setState(JSON.parse(savedSnap));
    cfg.render();
    changed();
  }

  // For actions that apply at once (unsubscribe from everything).
  function commit(msgKey) {
    savedSnap = snap();
    cfg.render();
    flashSaved(msgKey);
  }

  /* ---------- Confirmation dialog ---------- */

  function confirmDialog(o) {
    return new Promise(function (resolve) {
      if (!dialogEl) {
        dialogEl = h('dialog', { class: 'confirm', 'aria-labelledby': 'confirm-title' });
        document.body.appendChild(dialogEl);
      }
      var done = false;
      function finish(v) {
        if (done) return;
        done = true;
        if (dialogEl.open) dialogEl.close();
        resolve(v);
      }
      var cancelBtn = h('button', { type: 'button', class: 'btn btn--ghost', text: o.cancel, onclick: function () { finish(false); } });
      mount(dialogEl, [
        h('div', { class: 'confirm__body' }, [
          h('h2', { id: 'confirm-title', text: o.title }),
          h('p', { text: o.body })
        ]),
        h('div', { class: 'confirm__actions' }, [
          cancelBtn,
          h('button', { type: 'button', class: 'btn' + (o.danger ? ' btn--danger' : ''), text: o.confirm, onclick: function () { finish(true); } })
        ])
      ]);
      dialogEl.onclick = function (e) { if (e.target === dialogEl) finish(false); };   // backdrop
      dialogEl.oncancel = function (e) { e.preventDefault(); finish(false); };
      dialogEl.showModal();
      cancelBtn.focus();
    });
  }

  /* ---------- Model notes (presenter) ---------- */

  function setNotes(on) {
    document.body.classList.toggle('show-notes', on);
    var b = $('.notes-toggle');
    if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false');
    session('kbf-pc-notes', on ? '1' : '0');
  }

  function initNotes() {
    var b = $('.notes-toggle');
    if (b) b.addEventListener('click', function () { setNotes(!document.body.classList.contains('show-notes')); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'n' && e.key !== 'N') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var el = e.target;
      if (el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !/checkbox|radio/.test(el.type)))) return;
      setNotes(!document.body.classList.contains('show-notes'));
    });
    setNotes(session('kbf-pc-notes') === '1');
  }

  /* ---------- Init ---------- */

  function init(config) {
    cfg = config;
    var param = null;
    try { param = new URLSearchParams(window.location.search).get('lang'); } catch (e) { /* ignore */ }
    var start = LANGS.indexOf(param) >= 0 ? param : (config.defaultLang || 'fr');

    document.addEventListener('click', function (e) {
      var b = e.target.closest('.langs [data-lang]');
      if (b) setLang(b.getAttribute('data-lang'));
      if (e.target.closest('a[href="#"]')) e.preventDefault();
      // Back to the index: use history when we came from it (works when published too).
      if (e.target.closest('a[data-home]') && document.referrer && window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });

    buildBar();
    initNotes();
    setLang(start, { silent: true });
    savedSnap = snap();
    refreshBarText();
  }

  window.PC = {
    init: init,
    h: h,
    mount: mount,
    t: t,
    tn: tn,
    pick: pick,
    langName: langName,
    inLang: inLang,
    endonym: function (l) { return ENDONYMS[l]; },
    fmtDate: fmtDate,
    today: today,
    lang: function () { return lang; },
    changed: changed,
    commit: commit,
    isDirty: isDirty,
    confirm: confirmDialog
  };
})();
