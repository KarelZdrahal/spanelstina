'use strict';
/* ====== Úložiště a stav ====== */
const KEY = 'espanol_v1';
const DAY = 864e5;
const IV = [0, 1, 2, 4, 8, 16, 35, 70, 150]; // intervaly opakování ve dnech podle „krabičky“
function blank() { return { v: 1, items: {}, prog: {}, days: {}, rate: 1, unlockAll: false }; }
function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v) return Object.assign(blank(), s); } catch (e) {} return blank(); }
let S = load();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function midnight() { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); }

/* ====== Položky kurzu ====== */
function item(id) {
  const [k, l, i] = id.split(':'); const L = LESSONS[+l]; if (!L) return null;
  if (k === 'w' || k === 's') { const raw = (k === 'w' ? L.w : L.s)[+i]; if (!raw) return null; const [es, cs] = raw.split('|'); return { id, k, l: +l, i: +i, es, cs }; }
  if (k === 'g') { const q = L.q[+i]; if (!q) return null; return { id, k, l: +l, i: +i, q: q[0], o: q[1], a: q[2], e: q[3] }; }
  return null;
}
function introduce(id) { if (!S.items[id]) { S.items[id] = { b: 0, d: 0, c: 0, w: 0 }; save(); } }
function grade(id, ok) {
  if (!id) return; introduce(id);
  const it = S.items[id], now = Date.now();
  if (ok) { it.c++; if (it.d <= now) { it.b = Math.min(it.b + 1, IV.length - 1); it.d = midnight() + IV[it.b] * DAY; } }
  else { it.w++; it.b = 1; it.d = now + 10 * 60e3; }
  const t = dayKey(); S.days[t] = (S.days[t] || 0) + 1; save();
}
function dueIds() { const now = Date.now(); return Object.keys(S.items).filter(id => S.items[id].d <= now && item(id)).sort((a, b) => S.items[a].d - S.items[b].d); }
function learnedIds(kind) { return Object.keys(S.items).filter(id => item(id) && (!kind || id[0] === kind)); }
function prog(l) { return S.prog[l] || 0; }
function unlocked(l) { return S.unlockAll || l === 0 || prog(l - 1) >= 3; }
function nextPart() { for (let l = 0; l < LESSONS.length; l++) { if (prog(l) < 3) return unlocked(l) ? { l, p: prog(l) } : null; } return null; }
function streak() { let n = 0; const d = new Date(); if (!S.days[dayKey(d)]) d.setDate(d.getDate() - 1); while (S.days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); } return n; }

/* ====== Pomocné ====== */
const $ = s => document.querySelector(s);
const app = document.getElementById('app');
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function norm(s) { return s.toLowerCase().replace(/[¿¡?!.,;:«»"“”—–-]/g, ' ').replace(/\s+/g, ' ').trim(); }
function strip(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function noArt(s) { return s.replace(/^(el|la|los|las|un|una|unos|unas) /, ''); }
function grammarHtml(h) { return h.replace(/<e>(.*?)<\/e>/g, (m, t) => `<span class="es" data-say="${esc(t.replace(/<[^>]+>/g, ''))}">${t}</span>`); }
function sayBtns(t) { return `<button class="spk" data-say="${esc(t)}" aria-label="Přehrát">🔊</button><button class="spk slow" data-say="${esc(t)}" data-slow="1" aria-label="Pomalu">🐢</button>`; }

/* ====== Řeč ====== */
let esVoice = null;
function pickVoice() { try { const vs = speechSynthesis.getVoices(); esVoice = vs.find(v => /^es[-_]ES/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null; } catch (e) {} }
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function speak(t, slow) {
  t = t.replace(/[—–]/g, ' ').replace(/\s*\/\s*/g, ', ');
  const r = (slow ? 0.6 : 0.95) * (S.rate || 1);
  if (window.AndroidTTS) { try { AndroidTTS.speak(t, r); return; } catch (e) {} }
  if ('speechSynthesis' in window) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'es-ES'; if (esVoice) u.voice = esVoice; u.rate = r; speechSynthesis.speak(u); } catch (e) {} }
}
function hasVoice() { if (window.AndroidTTS) { try { return AndroidTTS.ready(); } catch (e) { return false; } } return 'speechSynthesis' in window; }
document.addEventListener('click', e => { const b = e.target.closest('[data-say]'); if (b) { speak(b.dataset.say, !!b.dataset.slow); b.classList.add('ping'); setTimeout(() => b.classList.remove('ping'), 400); } });

/* ====== Zvuky odpovědí ====== */
let actx = null;
function beep(ok) {
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(); o.connect(g); g.connect(actx.destination);
    const t = actx.currentTime; o.frequency.setValueAtTime(ok ? 660 : 220, t); if (ok) o.frequency.setValueAtTime(880, t + 0.09);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.15, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3); o.start(t); o.stop(t + 0.32); } catch (e) {}
}

/* ====== Navigace ====== */
let screen = 'home', SES = null;
window.appBack = function () { if (screen === 'home') return false; if (SES) { SES = null; } home(); return true; };
function shell(title, body, back) {
  app.innerHTML = `<div class="page"><header class="hd">${back !== false ? '<button class="back" onclick="home()">‹</button>' : ''}<h1>${title}</h1></header>${body}</div>`;
  window.scrollTo(0, 0);
}

/* ====== Domů ====== */
function home() {
  screen = 'home'; SES = null;
  const due = dueIds().length, np = nextPart(), st = streak(), td = S.days[dayKey()] || 0;
  const doneL = LESSONS.filter((_, l) => prog(l) >= 3).length, words = learnedIds('w').length;
  let sub;
  if (due) sub = `Nejdřív zopakuješ ${due} ${due === 1 ? 'položku' : due < 5 ? 'položky' : 'položek'}`;
  else if (np) sub = `Lekce ${np.l + 1}: ${LESSONS[np.l].t} · část ${np.p + 1}/3`;
  else sub = 'Volné procvičování všeho, co umíš';
  app.innerHTML = `<div class="page home">
  <div class="hero"><div class="flag"></div><h1>¡Hola!</h1><p>Španělština od úplných základů</p>
   <div class="stats"><div><b>🔥 ${st}</b><span>${st === 1 ? 'den' : st >= 2 && st <= 4 ? 'dny' : 'dní'} v řadě</span></div><div><b>${td}</b><span>cvičení dnes</span></div><div><b>${words}</b><span>slovíček</span></div></div></div>
  <button class="go" onclick="smart()"><span class="big">▶ ${td ? 'Pokračovat' : 'Začít'}</span><span class="sm">${esc(sub)}</span></button>
  <div class="grid">
   <button onclick="lessonsList()"><i>📚</i>Lekce<small>${doneL}/${LESSONS.length} hotovo</small></button>
   <button onclick="review()"><i>🔁</i>Opakování<small>${due ? due + ' čeká' : 'vše zopakováno'}</small></button>
   <button onclick="listening()"><i>🎧</i>Poslech<small>trénink ucha</small></button>
   <button onclick="readings()"><i>📖</i>Čtení<small>texty s otázkami</small></button>
   <button onclick="dict()"><i>🗂️</i>Slovníček<small>${words} slov</small></button>
   <button onclick="settings()"><i>⚙️</i>Nastavení<small>hlas, záloha</small></button>
  </div>
  ${!hasVoice() ? '<p class="warn">⚠️ Nenašel jsem španělský hlas pro poslech. Podívej se do Nastavení.</p>' : ''}
  <p class="foot-note">Uč se, kdy chceš a jak dlouho chceš. Každá odpověď se hned ukládá. Ťukni na „Pokračovat“ a aplikace sama vybere, co je na řadě: nejdřív opakování, pak nová látka.</p>
 </div>`;
}

function smart() {
  if (dueIds().length) return review();
  const np = nextPart(); if (np) return startPart(np.l, np.p);
  free();
}

/* ====== Seznam lekcí ====== */
function lessonsList() {
  screen = 'list';
  const rows = LESSONS.map((L, l) => { const p = prog(l), u = unlocked(l);
    return `<button class="lrow ${u ? '' : 'locked'}" ${u ? `onclick="lessonMenu(${l})"` : ''}><span class="lic">${L.ic}</span><span class="lt"><b>${l + 1}. ${esc(L.t)}</b><span class="pbar"><i style="width:${p / 3 * 100}%"></i></span></span><span class="ls">${p >= 3 ? '✅' : u ? p + '/3' : '🔒'}</span></button>`; }).join('');
  shell('Lekce', `<div class="list">${rows}</div><p class="foot-note">Každá lekce má 3 části po zhruba 5–10 minutách. Další lekce se odemkne po dokončení předchozí (v Nastavení jde odemknout všechny).</p>`);
}
function lessonMenu(l) {
  screen = 'menu'; const L = LESSONS[l], p = prog(l);
  const parts = ['Výklad a první slovíčka', 'Další slovíčka a gramatika', 'Věty, poslech a čtení'];
  const btns = parts.map((n, i) => `<button class="part ${i < p ? 'done' : ''}" onclick="startPart(${l},${i})"><b>${i < p ? '✅' : i === p ? '▶' : '○'} Část ${i + 1}</b><span>${n}</span></button>`).join('');
  const words = L.w.map(w => { const [es, cs] = w.split('|'); return `<div class="wrow" data-say="${esc(es)}"><b>${esc(es)}</b><span>${esc(cs)}</span></div>`; }).join('');
  shell(`${L.ic} ${esc(L.t)}`, `<div class="parts">${btns}</div>
  <button class="sec" onclick="practiceLesson(${l})">🎯 Procvičit tuto lekci</button>
  <details class="card"><summary>📘 Výklad gramatiky</summary><div class="gram">${grammarHtml(L.g)}</div></details>
  <details class="card"><summary>🗂️ Slovíčka lekce (${L.w.length})</summary><div class="words">${words}</div></details>`);
}

/* ====== Sestavení lekcí ====== */
function wIds(l, a, b) { return LESSONS[l].w.slice(a, b).map((_, i) => `w:${l}:${a + i}`); }
function startPart(l, p) {
  if (!unlocked(l)) return lessonsList();
  const L = LESSONS[l], half = Math.ceil(L.w.length / 2), q = [];
  const learnWords = ids => { for (let c = 0; c < ids.length; c += 4) { const ch = ids.slice(c, c + 4);
      ch.forEach(id => q.push({ t: 'intro', id })); ch.forEach(id => q.push({ t: 'mc', dir: 'es', id })); shuffle(ch).forEach(id => q.push({ t: pick(['mc', 'listen']), dir: 'cs', id })); } };
  if (p === 0) { q.push({ t: 'info', l }); const ids = wIds(l, 0, half); learnWords(ids); shuffle(ids).slice(0, 3).forEach(id => q.push({ t: 'type', id })); }
  if (p === 1) { const ids = wIds(l, half, L.w.length); learnWords(ids); shuffle(wIds(l, 0, half)).slice(0, 3).forEach(id => q.push({ t: 'listen', id }));
    q.push({ t: 'info', l, short: true }); shuffle(L.q.map((_, i) => `g:${l}:${i}`)).forEach(id => q.push({ t: 'gram', id })); shuffle(ids).slice(0, 3).forEach(id => q.push({ t: 'type', id })); }
  if (p === 2) { const ids = L.s.map((_, i) => `s:${l}:${i}`); ids.forEach(id => q.push({ t: 'introS', id })); shuffle(ids).forEach(id => q.push({ t: 'order', id }));
    shuffle(ids).slice(0, 3).forEach(id => q.push({ t: 'dict', id })); q.push({ t: 'read', l }); L.r.q.forEach((_, i) => q.push({ t: 'readq', l, i }));
    shuffle(wIds(l, 0, L.w.length)).slice(0, 3).forEach(id => q.push({ t: 'type', id })); }
  run(q, { title: `Lekce ${l + 1} · část ${p + 1}/3`, done: () => { if (prog(l) <= p) { S.prog[l] = p + 1; save(); } }, lesson: l, part: p });
}
function taskFor(id) {
  const it = S.items[id] || { b: 0 }, b = it.b, k = id[0];
  if (k === 'g') return { t: 'gram', id };
  if (k === 's') return { t: b <= 2 ? pick(['order', 'mcs']) : pick(['dict', 'order', 'dict']), id };
  return b <= 2 ? { t: pick(['mc', 'mc', 'listen']), dir: pick(['es', 'cs']), id } : { t: pick(['type', 'type', 'listen', 'mc']), dir: 'cs', id };
}
function review() {
  const ids = dueIds().slice(0, 12);
  if (!ids.length) { if (!learnedIds().length) return smart(); return free(true); }
  run(shuffle(ids).map(taskFor), { title: 'Opakování' });
}
function weighted(ids, n) { return ids.map(id => { const it = S.items[id]; return [id, (it.b || 0) - it.w * 0.7 + Math.random() * 3]; }).sort((a, b) => a[1] - b[1]).slice(0, n).map(x => x[0]); }
function free(note) {
  const ids = learnedIds(); if (!ids.length) return smart();
  run(shuffle(weighted(ids, 12)).map(taskFor), { title: note ? 'Vše zopakováno · procvičování navíc' : 'Procvičování' });
}
function practiceLesson(l) {
  const ids = learnedIds().filter(id => +id.split(':')[1] === l);
  const pool = ids.length ? ids : wIds(l, 0, 6);
  run(shuffle(weighted(pool, 12)).map(id => S.items[id] ? taskFor(id) : { t: 'intro', id }), { title: `Procvičení lekce ${l + 1}` });
}
function listening() {
  const ws = learnedIds('w'), ss = learnedIds('s');
  if (!ws.length) return emptyMsg('Poslech', 'Nejdřív projdi alespoň první část první lekce.');
  const q = shuffle(weighted(ws, 8)).map(id => ({ t: 'listen', id })).concat(shuffle(ss).slice(0, 4).map(id => ({ t: 'dict', id })));
  run(shuffle(q), { title: 'Poslech' });
}
function readings() {
  screen = 'read';
  const av = LESSONS.map((L, l) => ({ L, l })).filter(x => prog(x.l) >= 2 || (S.unlockAll));
  const rows = av.length ? av.map(({ L, l }) => `<button class="lrow" onclick="readOne(${l})"><span class="lic">${L.ic}</span><span class="lt"><b>${esc(L.r.t.split('\n')[0])}</b><small>Lekce ${l + 1}</small></span><span class="ls">›</span></button>`).join('')
    : '<p class="foot-note">Texty se zpřístupní po dokončení 2. části každé lekce.</p>';
  shell('Čtení a porozumění', `<div class="list">${rows}</div>`);
}
function readOne(l) { const q = [{ t: 'read', l }]; LESSONS[l].r.q.forEach((_, i) => q.push({ t: 'readq', l, i })); run(q, { title: 'Čtení' }); }
function emptyMsg(t, m) { shell(t, `<div class="card"><p>${m}</p><button class="btn" onclick="smart()">Začít</button></div>`); }

/* ====== Běh lekce / kola ====== */
function run(q, opts) { screen = 'ses'; SES = { q, i: 0, ok: 0, bad: 0, opts, t0: Date.now() }; step(); }
function step() {
  if (!SES) return; if (SES.i >= SES.q.length) return finish();
  const t = SES.q[SES.i], pct = Math.round(SES.i / SES.q.length * 100);
  app.innerHTML = `<div class="ses"><div class="top"><button class="x" onclick="home()" aria-label="Konec">✕</button><div class="bar"><i style="width:${pct}%"></i></div><span class="cnt">${SES.i + 1}/${SES.q.length}</span></div><div class="body" id="body"></div><div class="foot" id="foot"></div></div>`;
  window.scrollTo(0, 0);
  (R[t.t] || R.skip)(t);
}
function next() { if (!SES) return; SES.i++; step(); }
function foot(html) { $('#foot').innerHTML = html; }
function contBtn(label) { foot(`<button class="btn" id="cont">${label || 'Pokračovat'}</button>`); $('#cont').onclick = next; }
function answered(t, ok, rightHtml, extra) {
  if (t.id) grade(t.id, ok);
  ok ? SES.ok++ : SES.bad++; beep(ok);
  if (!ok && !t.re) { const c = Object.assign({}, t, { re: true }); SES.q.splice(Math.min(SES.i + 4, SES.q.length), 0, c); }
  const f = $('#foot'); f.className = 'foot ' + (ok ? 'ok' : 'bad');
  f.innerHTML = `<div class="fb"><b>${ok ? pick(['¡Muy bien!', '¡Perfecto!', '¡Correcto!', '¡Genial!']) + ' ✓' : 'Ještě ne ✗'}</b>${rightHtml ? `<div class="right">${rightHtml}</div>` : ''}${extra ? `<div class="ex">${extra}</div>` : ''}</div><button class="btn" id="cont">Pokračovat</button>`;
  $('#cont').onclick = next; $('#cont').focus();
}
function finish() {
  const o = SES.opts, ok = SES.ok, bad = SES.bad, min = Math.max(1, Math.round((Date.now() - SES.t0) / 60e3));
  if (o.done) o.done();
  SES = null; screen = 'fin';
  const due = dueIds().length, np = nextPart();
  const nextLabel = due ? `🔁 Zopakovat (${due})` : np ? `▶ Dál: Lekce ${np.l + 1}, část ${np.p + 1}` : '🎯 Procvičovat dál';
  const total = ok + bad, pct = total ? Math.round(ok / total * 100) : 100;
  app.innerHTML = `<div class="page fin"><div class="trophy">${pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '🌱'}</div><h1>${o.done ? '¡Terminado!' : '¡Bien hecho!'}</h1><p>${esc(o.title)}</p>
  <div class="stats"><div><b>${ok}</b><span>správně</span></div><div><b>${bad}</b><span>chyb</span></div><div><b>${min}</b><span>min</span></div></div>
  <button class="go" onclick="smart()"><span class="big">${nextLabel}</span><span class="sm">nebo kdykoli skonči, vše je uložené</span></button>
  <button class="sec" onclick="home()">Domů</button></div>`;
}

/* ====== Typy cvičení ====== */
function distract(it, field, n) {
  const own = LESSONS[it.l][it.k === 's' ? 's' : 'w'].map(x => x.split('|')[field === 'es' ? 0 : 1]);
  let pool = own.filter(x => x !== it[field]);
  if (pool.length < n + 2) LESSONS.forEach((L, l) => { if (l !== it.l && (prog(l) > 0 || Math.abs(l - it.l) <= 1)) (it.k === 's' ? L.s : L.w).forEach(x => pool.push(x.split('|')[field === 'es' ? 0 : 1])); });
  pool = [...new Set(pool)].filter(x => x !== it[field] && norm(x) !== norm(it[field]));
  return shuffle(pool).slice(0, n);
}
function options(opts, correct, onPick) {
  return opts.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join('');
}
function bindOptions(opts, correct, cb) {
  document.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    const i = +b.dataset.i, ok = opts[i] === correct;
    document.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (opts[+x.dataset.i] === correct) x.classList.add('good'); });
    if (!ok) b.classList.add('wrong'); cb(ok);
  });
}
const R = {
  skip() { next(); },
  info(t) {
    const L = LESSONS[t.l];
    $('#body').innerHTML = `<div class="tag">${t.short ? 'Připomenutí gramatiky' : 'Nová látka'}</div><h2>${L.ic} ${esc(L.t)}</h2><div class="gram">${grammarHtml(L.g)}</div>`;
    contBtn(t.short ? 'Jdu na cvičení' : 'Rozumím, jdu na slovíčka');
  },
  intro(t) {
    const it = item(t.id); introduce(t.id);
    $('#body').innerHTML = `<div class="tag">Nové slovíčko</div><div class="flash"><div class="es-big">${esc(it.es)}</div><div class="say">${sayBtns(it.es)}</div><div class="cs">${esc(it.cs)}</div></div><p class="hint">Poslechni si ho a nahlas zopakuj.</p>`;
    speak(it.es); contBtn('Další');
  },
  introS(t) {
    const it = item(t.id); introduce(t.id);
    $('#body').innerHTML = `<div class="tag">Nová věta</div><div class="flash"><div class="es-big s">${esc(it.es)}</div><div class="say">${sayBtns(it.es)}</div><div class="cs">${esc(it.cs)}</div></div><p class="hint">Řekni ji nahlas 2× a zkus se přitom trefit do melodie.</p>`;
    speak(it.es); contBtn('Další');
  },
  mc(t) {
    const it = item(t.id), es2cs = t.dir === 'es';
    const correct = es2cs ? it.cs : it.es, opts = shuffle([correct, ...distract(it, es2cs ? 'cs' : 'es', 3)]);
    $('#body').innerHTML = `<div class="tag">${es2cs ? 'Co to znamená?' : 'Jak se to řekne španělsky?'}</div>
     <div class="prompt">${es2cs ? `<div class="es-big">${esc(it.es)}</div><div class="say">${sayBtns(it.es)}</div>` : `<div class="cs-big">${esc(it.cs)}</div>`}</div><div class="opts">${options(opts)}</div>`;
    if (es2cs) speak(it.es);
    bindOptions(opts, correct, ok => { if (!es2cs) speak(it.es); answered(t, ok, `${esc(it.es)} = ${esc(it.cs)} ${sayBtns(it.es)}`); });
  },
  listen(t) {
    const it = item(t.id), showEs = Math.random() < 0.5;
    const correct = showEs ? it.es : it.cs, opts = shuffle([correct, ...distract(it, showEs ? 'es' : 'cs', 3)]);
    $('#body').innerHTML = `<div class="tag">🎧 Poslouchej: ${showEs ? 'co slyšíš?' : 'co to znamená?'}</div><div class="prompt"><button class="play" data-say="${esc(it.es)}">🔊</button><button class="play sm" data-say="${esc(it.es)}" data-slow="1">🐢</button></div><div class="opts">${options(opts)}</div>`;
    setTimeout(() => speak(it.es), 250);
    bindOptions(opts, correct, ok => answered(t, ok, `${esc(it.es)} = ${esc(it.cs)} ${sayBtns(it.es)}`));
  },
  mcs(t) {
    const it = item(t.id), correct = it.cs, opts = shuffle([correct, ...distract(it, 'cs', 2)]);
    $('#body').innerHTML = `<div class="tag">Co znamená tahle věta?</div><div class="prompt"><div class="es-big s">${esc(it.es)}</div><div class="say">${sayBtns(it.es)}</div></div><div class="opts">${options(opts)}</div>`;
    speak(it.es); bindOptions(opts, correct, ok => answered(t, ok, esc(it.es) + ' = ' + esc(it.cs)));
  },
  gram(t) {
    const it = item(t.id), correct = it.o[it.a], opts = shuffle(it.o.slice());
    $('#body').innerHTML = `<div class="tag">Gramatika: vyber správnou možnost</div><div class="prompt"><div class="cs-big g">${esc(it.q).replace('___', '<u>&nbsp;?&nbsp;</u>')}</div></div><div class="opts">${options(opts)}</div>`;
    bindOptions(opts, correct, ok => { const full = /___/.test(it.q) ? it.q.replace('___', correct) : correct; if (/[a-záéíóúñ]/i.test(full) && /___/.test(it.q)) speak(full); answered(t, ok, /___/.test(it.q) ? esc(full) : esc(correct), esc(it.e || '')); });
  },
  type(t) {
    const it = item(t.id);
    $('#body').innerHTML = `<div class="tag">✍️ Napiš španělsky</div><div class="prompt"><div class="cs-big">${esc(it.cs)}</div></div>
     <input id="inp" class="inp" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="napiš…">
     <div class="acc">${'á é í ó ú ñ ü ¿ ¡'.split(' ').map(c => `<button data-c="${c}">${c}</button>`).join('')}</div>`;
    const inp = $('#inp'); setTimeout(() => inp.focus(), 50);
    document.querySelectorAll('.acc button').forEach(b => b.onclick = () => { const p = inp.selectionStart ?? inp.value.length; inp.value = inp.value.slice(0, p) + b.dataset.c + inp.value.slice(inp.selectionEnd ?? p); inp.focus(); inp.selectionStart = inp.selectionEnd = p + 1; });
    foot(`<button class="btn ghost" id="dk">Nevím</button><button class="btn" id="ck">Zkontrolovat</button>`);
    const check = give => {
      const a = norm(inp.value), c = norm(it.es); if (!a && !give) { inp.focus(); return; }
      let ok = false, note = '';
      if (a === c) ok = true;
      else if (strip(a) === strip(c)) { ok = true; note = 'Pozor na diakritiku, jinak správně.'; }
      else if (noArt(c) !== c && (a === noArt(c) || strip(a) === strip(noArt(c)))) { ok = true; note = 'Příště napiš i člen, pomůže ti to zapamatovat si rod.'; }
      inp.disabled = true; speak(it.es);
      answered(t, ok, `${esc(it.es)} ${sayBtns(it.es)}`, note || (!ok && a ? 'Tvoje odpověď: ' + esc(inp.value) : ''));
    };
    $('#ck').onclick = () => check(false); $('#dk').onclick = () => check(true);
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(false); });
  },
  order(t) { tiles(t, false); },
  dict(t) { tiles(t, true); },
  read(t) {
    const r = LESSONS[t.l].r, lines = r.t.split('\n'), tr = r.tr.split('\n');
    $('#body').innerHTML = `<div class="tag">📖 Čtení s porozuměním</div><p class="hint">Přečti si text, poslechni si ho a zkus mu porozumět. Ťuknutím na řádek ho přehraješ.</p>
     <div class="say center"><button class="pill" data-say="${esc(r.t)}">🔊 Celý text</button><button class="pill" data-say="${esc(r.t)}" data-slow="1">🐢 Pomalu</button></div>
     <div class="text">${lines.map((x, i) => `<p data-say="${esc(x)}">${esc(x)}<small class="trl">${esc(tr[i] || '')}</small></p>`).join('')}</div>
     <button class="pill" id="trb">👁 Zobrazit překlad</button>`;
    $('#trb').onclick = () => { document.querySelector('.text').classList.toggle('show'); };
    contBtn('Na otázky');
  },
  readq(t) {
    const r = LESSONS[t.l].r, [qq, o, a] = r.q[t.i], correct = o[a], opts = shuffle(o);
    $('#body').innerHTML = `<div class="tag">📖 Otázka k textu</div><details class="card mini"><summary>Zobrazit text</summary><div class="text">${r.t.split('\n').map(x => `<p data-say="${esc(x)}">${esc(x)}</p>`).join('')}</div></details>
     <div class="prompt"><div class="cs-big g">${esc(qq)}</div></div><div class="opts">${options(opts)}</div>`;
    bindOptions(opts, correct, ok => answered(t, ok, esc(correct)));
  }
};
function tiles(t, isDict) {
  const it = item(t.id), words = it.es.split(' ');
  const own = new Set(words.map(w => strip(norm(w))));
  const extra = shuffle(LESSONS[it.l].s.flatMap(x => x.split('|')[0].split(' ')).filter(w => !own.has(strip(norm(w))))).filter((w, i, a) => a.findIndex(z => norm(z) === norm(w)) === i).slice(0, words.length > 3 ? 2 : 1);
  const pool = shuffle(words.concat(extra).map((w, i) => ({ w, i })));
  const chosen = [];
  $('#body').innerHTML = `<div class="tag">${isDict ? '🎧 Diktát: poskládej, co slyšíš' : '🧩 Přelož: poskládej větu'}</div>
   <div class="prompt">${isDict ? `<button class="play" data-say="${esc(it.es)}">🔊</button><button class="play sm" data-say="${esc(it.es)}" data-slow="1">🐢</button>` : `<div class="cs-big">${esc(it.cs)}</div>`}</div>
   <div class="ans" id="ans"></div><div class="pool" id="pool"></div>`;
  if (isDict) setTimeout(() => speak(it.es), 250);
  const draw = () => {
    $('#ans').innerHTML = chosen.map((p, k) => `<button class="tile" data-k="${k}">${esc(p.w.replace(/[.,]$/,''))}</button>`).join('') || '<span class="ph">ťukej na slova níže</span>';
    $('#pool').innerHTML = pool.map(p => `<button class="tile ${chosen.includes(p) ? 'used' : ''}" data-i="${p.i}" ${chosen.includes(p) ? 'disabled' : ''}>${esc(p.w.replace(/[.,]$/,''))}</button>`).join('');
    document.querySelectorAll('#ans .tile').forEach(b => b.onclick = () => { chosen.splice(+b.dataset.k, 1); draw(); });
    document.querySelectorAll('#pool .tile').forEach(b => b.onclick = () => { chosen.push(pool.find(p => p.i === +b.dataset.i)); draw(); });
  };
  draw();
  foot(`<button class="btn ghost" id="dk">Nevím</button><button class="btn" id="ck">Zkontrolovat</button>`);
  const check = () => {
    const a = norm(chosen.map(p => p.w).join(' ')), ok = a === norm(it.es);
    document.querySelectorAll('.tile').forEach(b => b.disabled = true); speak(it.es);
    answered(t, ok, `${esc(it.es)} ${sayBtns(it.es)}`, isDict || !ok ? esc(it.cs) : '');
  };
  $('#ck').onclick = () => { if (!chosen.length) return; check(); };
  $('#dk').onclick = check;
}

/* ====== Slovníček ====== */
function dict() {
  screen = 'dict';
  const ids = learnedIds('w');
  if (!ids.length) return emptyMsg('Slovníček', 'Zatím tu nic není. Slovíčka se sem přidávají, jak je budeš poznávat v lekcích.');
  const byL = {}; ids.forEach(id => { const it = item(id); (byL[it.l] = byL[it.l] || []).push(it); });
  const body = Object.keys(byL).sort((a, b) => a - b).map(l => `<h3 class="lh">${LESSONS[l].ic} ${esc(LESSONS[l].t)}</h3>` + byL[l].sort((a, b) => a.i - b.i).map(it => { const b = S.items[it.id].b;
    return `<div class="wrow" data-say="${esc(it.es)}" data-f="${esc(strip((it.es + ' ' + it.cs).toLowerCase()))}"><b>${esc(it.es)}</b><span>${esc(it.cs)}</span><em class="lvl" title="úroveň zapamatování">${'●'.repeat(Math.min(5, b))}${'○'.repeat(Math.max(0, 5 - b))}</em></div>`; }).join('')).join('');
  shell('Slovníček', `<input class="inp" id="flt" placeholder="🔎 hledat (španělsky i česky)"><div class="words" id="wl">${body}</div><p class="foot-note">Ťukni na slovo a uslyšíš ho. Tečky ukazují, jak pevně ho už umíš.</p>`);
  $('#flt').oninput = e => { const f = strip(e.target.value.toLowerCase()); document.querySelectorAll('#wl .wrow').forEach(r => r.style.display = r.dataset.f.includes(f) ? '' : 'none'); };
}

/* ====== Nastavení ====== */
function settings() {
  screen = 'set';
  const android = !!window.AndroidTTS, ready = hasVoice();
  shell('Nastavení', `
  <div class="card"><h3>🔊 Hlas</h3>
   <label class="row">Rychlost řeči <input type="range" id="rate" min="0.6" max="1.3" step="0.05" value="${S.rate}"><span id="rv">${Math.round(S.rate * 100)} %</span></label>
   <button class="sec" data-say="Hola, ¿qué tal? Me llamo Lucía y hablo español.">▶ Vyzkoušet hlas</button>
   ${android ? `<p class="small">${ready ? '✅ Španělský hlas je připravený.' : '⚠️ Španělský hlas není nainstalovaný. Nainstaluj ho v nastavení telefonu (Převod textu na řeč → Google → Španělština (Španělsko)).'}</p><button class="sec" onclick="try{AndroidTTS.openSettings()}catch(e){}">Otevřít nastavení hlasu</button>` : `<p class="small">Hlas zajišťuje prohlížeč. Když nic neslyšíš, zkontroluj hlasitost a v Androidu nastavení „Převod textu na řeč“.</p>`}
  </div>
  <div class="card"><h3>📚 Lekce</h3><label class="row"><span>Odemknout všechny lekce</span><input type="checkbox" id="ua" ${S.unlockAll ? 'checked' : ''}></label></div>
  <div class="card"><h3>💾 Záloha postupu</h3><p class="small">Tlačítkem zkopíruješ kód. Ulož si ho třeba do poznámek a později ho můžeš vložit zpátky (i na jiném telefonu).</p>
   <button class="sec" id="cp">📋 Zkopírovat zálohu</button>
   <textarea id="bk" class="inp ta" placeholder="sem vlož kód zálohy"></textarea><button class="sec" id="rs">⬆ Obnovit ze zálohy</button><p class="small" id="msg"></p></div>
  <div class="card"><h3>🗑️ Začít znovu</h3><button class="sec danger" id="rst">Smazat celý postup</button></div>
  <p class="foot-note">Español v1.0 · ${LESSONS.length} lekcí · ${LESSONS.reduce((a, L) => a + L.w.length, 0)} slovíček · ${LESSONS.reduce((a, L) => a + L.s.length, 0)} vět</p>`);
  $('#rate').oninput = e => { S.rate = +e.target.value; $('#rv').textContent = Math.round(S.rate * 100) + ' %'; save(); };
  $('#ua').onchange = e => { S.unlockAll = e.target.checked; save(); };
  $('#cp').onclick = async () => { const code = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); $('#bk').value = code;
    try { await navigator.clipboard.writeText(code); $('#msg').textContent = '✅ Záloha je ve schránce.'; } catch (e) { $('#bk').select(); $('#msg').textContent = 'Kód je v poli výše. Označ ho a zkopíruj.'; } };
  $('#rs').onclick = () => { try { const s = JSON.parse(decodeURIComponent(escape(atob($('#bk').value.trim())))); if (!s.v || !s.items) throw 0; S = Object.assign(blank(), s); save(); $('#msg').textContent = '✅ Postup obnoven.'; } catch (e) { $('#msg').textContent = '❌ Neplatný kód zálohy.'; } };
  let arm = false; $('#rst').onclick = e => { if (!arm) { arm = true; e.target.textContent = 'Opravdu? Ťukni znovu pro smazání'; return; } S = blank(); save(); home(); };
}

home();
