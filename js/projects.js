/* projects.js : renders projects.html?id=<id> from window.PROJECTS (js/projects-data.js). */
(() => {
const P = window.PROJECTS;
if (!P) { document.getElementById('app').innerHTML = '<div class="container-xl py-5 my-5 text-center"><h1 class="h3">Project data not loaded</h1><p class="text-muted">Check that <code>js/projects-data.js</code> exists and is linked before <code>js/projects.js</code> in projects.html.</p></div>'; return }

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const id = new URLSearchParams(location.search).get('id'), i = Math.max(P.findIndex(p => p.id == id), 0), p = P[i], app = $('#app');
if (id && !P.some(x => x.id == id)) { app.innerHTML = `<div class="container-xl text-center py-5 my-5"><h1 class="fw-bold">Project not found</h1><p class="text-muted">No project has that id.</p>${P.map(x => `<a data-go href="projects.html?id=${x.id}" class="btn btn-outline-brand btn-pill m-1">${x.t}</a>`).join('')}</div>`; document.title = 'Not found | Baskar Raj' }
else {
document.title = `${p.t} | Baskar Raj`;
const tags = l => l.map(t => `<span class="ptag">${t}</span>`).join('');
const mock = (cap, src, fit) => `<div class="smock ${p.cls}"><span class="sb"><i></i><i></i><i></i></span><em></em><u></u><u></u><u></u><small>${cap}</small>${src ? `<img ${fit === 'contain' ? 'class="fit" ' : ''}src="${src}" alt="${cap}" onerror="this.remove()">` : ''}</div>`;
const next = P[(i + 1) % P.length], prev = P[(i - 1 + P.length) % P.length];
const secs = [];
const sec = (k, title, body) => { secs.push([k, title]); return `<section class="psec" id="${k}"><h2 class="sh reveal"><b>${String(secs.length).padStart(2, '0')}</b>${title}</h2>${body}</section>` };
const mth = m => `<span class="mth ${m.toLowerCase()}">${m}</span>`;
const liveHref = p.live || '#live';

const main =
sec('overview', 'Overview', `<p class="reveal text-muted" style="max-width:760px">${p.over}</p><div class="row g-3 mt-1"><div class="col-md-6 reveal"><div class="pcard h-100"><h6><i class="bi bi-exclamation-circle"></i>The problem</h6><p>${p.prob}</p></div></div><div class="col-md-6 reveal"><div class="pcard h-100"><h6><i class="bi bi-check2-circle"></i>The solution</h6><p>${p.sol}</p></div></div></div><div class="goals reveal">${p.goals.map(g => `<div><i class="bi bi-bullseye"></i>${g}</div>`).join('')}</div>`) +
sec('live', 'Live preview', `<div class="d-flex flex-wrap gap-2 justify-content-between mb-3 reveal"><div class="devs"><button class="on" data-w="100%"><i class="bi bi-laptop"></i> Desktop</button><button data-w="768px"><i class="bi bi-tablet"></i> Tablet</button><button data-w="390px"><i class="bi bi-phone"></i> Mobile</button></div>${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="btn btn-outline-brand btn-pill btn-sm">Open in new tab <i class="bi bi-box-arrow-up-right ms-1"></i></a>` : ''}</div><div class="bframe reveal" id="bframe"><div class="bbar"><span class="sb"><i></i><i></i><i></i></span><div class="url"><i class="bi bi-lock-fill me-1"></i>${p.live || 'your-live-demo-url.com'}</div></div><div class="bview">${p.live ? `<iframe title="${p.t} live preview" loading="lazy" src="${p.live}"></iframe>` : `<div class="empty"><i class="bi bi-rocket-takeoff"></i><b>Live demo goes here</b><span>Set <code>live:"https://..."</code> for "${p.id}" in <code>js/projects-data.js</code> and this frame loads your site.</span></div>`}</div></div><small class="text-muted d-block mt-2">If a site blocks embedding, use "Open in new tab".</small>`) +
sec('shots', 'Screenshots', `<div class="row g-3">${p.shots.map((s, k) => `<div class="col-sm-6 reveal"><figure class="shotf" data-k="${k}">${mock(s[0], s[1], s[2])}<figcaption>${s[0]}<i class="bi bi-arrows-fullscreen"></i></figcaption></figure></div>`).join('')}</div>${p.real ? '' : `<small class="text-muted d-block mt-2">Save real screenshots as <code>${p.shots[0][1]}</code> and so on; they replace the placeholders automatically.</small>`}`) +
sec('demo', 'Demo and resources', `<div class="row g-3"><div class="col-lg-7 reveal"><div class="vidframe">${p.video ? `<iframe src="${p.video}" title="${p.t} demo video" loading="lazy" allowfullscreen></iframe>` : `<div class="vidph"><i class="play bi bi-play-fill"></i><b>Demo video placeholder</b><span>Set <code>video:"https://www.youtube.com/embed/ID"</code> for "${p.id}" in <code>js/projects-data.js</code>.</span></div>`}</div></div>
 <div class="col-lg-5 reveal"><div class="pcard cred h-100 ${p.demo.user ? '' : 'ph'}"><h6><i class="bi bi-key"></i>Demo access${p.demo.user ? '' : '<span class="phb">placeholder</span>'}</h6>
  <div class="row-c"><small>Username</small><code>${p.demo.user || 'demo@example.com'}</code><button data-copy="${p.demo.user}" aria-label="Copy username"><i class="bi bi-clipboard"></i></button></div>
  <div class="row-c"><small>Password</small><code>${p.demo.pass || '••••••••'}</code><button data-copy="${p.demo.pass}" aria-label="Copy password"><i class="bi bi-clipboard"></i></button></div>
  <div class="rlinks">${p.links.map(l => l[1] ? `<a class="rlink" href="${l[1]}" target="_blank" rel="noopener"><i class="bi bi-link-45deg"></i>${l[0]}</a>` : `<span class="rlink ph">${l[0]} <em>add link</em></span>`).join('')}</div></div></div></div>`) +
sec('users', 'Users and journey', `<div class="row g-3">${p.users.map(u => `<div class="col-md-${12 / Math.min(p.users.length, 3)} reveal"><div class="pcard ucard h-100"><span class="uic"><i class="bi ${u[0]}"></i></span><b>${u[1]}</b><small>${u[2]}</small><ul>${u[3].map(x => `<li>${x}</li>`).join('')}</ul></div></div>`).join('')}</div><div class="steps reveal">${p.steps.map((s, k) => `<div><span>${k + 1}</span><b>${s[0]}</b><small>${s[1]}</small></div>`).join('')}</div>`) +
sec('features', 'Key features', `<div class="row g-3">${p.feats.map(f => `<div class="col-md-6 reveal"><div class="pcard feat2 tilt"><i class="bi ${f[0]}"></i><div><b>${f[1]}</b><p>${f[2]}</p></div></div></div>`).join('')}</div>`) +
sec('arch', 'Tech stack and architecture', `<div class="ptechs mb-4 reveal">${p.tech.map(t => `<div><span><i class="${t[0]}"></i></span>${t[1]}</div>`).join('')}</div><div class="arch reveal">${p.arch.map((a, k) => `${k ? '<div class="link"><i></i></div>' : ''}<div class="layer"><div class="lh"><i class="bi ${a[1]}"></i>${a[0]}</div>${a[2].map(x => `<span>${x}</span>`).join('')}</div>`).join('')}</div>`) +
sec('api', p.apiT, `<div class="tbl reveal">${p.api.map(r => `<div>${mth(r[0])}<code>${r[1]}</code><span>${r[2]}</span></div>`).join('')}</div>`) +
sec('data', p.schT, `<div class="row g-3">${p.sch.map(s => `<div class="col-md-6 reveal"><div class="pcard schema h-100"><b>${s[0]}</b><div>${s[1].split(/, (?![^{\[]*[}\]])/).map(f => `<code>${f}</code>`).join('')}</div></div></div>`).join('')}</div>`) +
sec('code', 'Code highlight', `<div class="codew reveal"><div class="ct"><span class="sb"><i></i><i></i><i></i></span><em>${p.code.f}</em><small>${p.code.l}</small><button id="copy"><i class="bi bi-clipboard"></i> Copy</button></div><pre><code id="codeTxt"></code></pre></div>`) +
sec('quality', 'Quality and delivery', `<div class="row g-3">${p.qual.map(q => `<div class="col-md-6 reveal"><div class="pcard qc h-100"><i class="bi ${q[0]}"></i><b>${q[1]}</b><p>${q[2]}</p></div></div>`).join('')}</div>`) +
sec('timeline', 'Development timeline', `<div class="tl">${p.time.map(t => `<div class="reveal"><i></i><b>${t[0]}</b><span>${t[1]}</span></div>`).join('')}</div>`) +
sec('learn', 'Challenges and learnings', `<div class="accordion reveal" id="ch">${p.chal.map((c, k) => `<div class="accordion-item"><h3 class="accordion-header"><button class="accordion-button ${k ? 'collapsed' : ''}" data-bs-toggle="collapse" data-bs-target="#c${k}">${c[0]}</button></h3><div id="c${k}" class="accordion-collapse collapse ${k ? '' : 'show'}" data-bs-parent="#ch"><div class="accordion-body small text-muted">${c[1]}</div></div></div>`).join('')}</div>`) +
sec('next', "What's next", `<ul class="fut reveal">${p.fut.map(f => `<li><i class="bi bi-arrow-up-right-circle"></i>${f}</li>`).join('')}</ul>`);

app.style.cssText = `--pc:${p.pc};--pc2:${p.pc2}`;
app.innerHTML = `
<section class="phero"><i class="orb o1"></i><i class="orb o2"></i><div class="container-xl"><div class="row align-items-center g-5">
 <div class="col-lg-6 reveal"><div class="crumb"><a data-go href="index.html#projects">Projects</a> / ${p.t}</div><span class="stt"><i class="pdot"></i>${p.status} &middot; ${p.yr}</span>
  <h1>${p.t}</h1><h2 class="psub">${p.sub}</h2><p class="ptag-l">${p.tag}</p><div class="mb-4">${tags(p.tags)}</div>
  <a href="${liveHref}" ${p.live ? 'target="_blank" rel="noopener"' : ''} class="btn btn-pc btn-pill me-2"><i class="bi bi-box-arrow-up-right me-1"></i>Live demo</a><a href="${p.repo || '#'}" ${p.repo ? 'target="_blank" rel="noopener"' : ''} class="btn btn-outline-brand btn-pill me-2"><i class="bi bi-github me-1"></i>Source code</a><a href="#shots" class="btn btn-outline-brand btn-pill"><i class="bi bi-images me-1"></i>Screenshots</a></div>
 <div class="col-lg-6 reveal"><div class="devices"><div class="lap">${mock(p.shots[0][0], p.shots[0][1], p.shots[0][2])}</div><div class="phn">${mock(...(p.phone || p.shots[1]))}</div></div></div>
</div></div></section>
<div class="container-xl"><div class="pstrip reveal">${p.stats.map(s => `<div><b data-n="${s[0]}">${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>
<div class="row g-4 mt-1"><div class="col-lg-8 order-2 order-lg-1">${main}
 <div class="row g-3 mt-2 reveal"><div class="col-6"><div class="pcard pn"><a data-go href="projects.html?id=${prev.id}"><small><i class="bi bi-arrow-left"></i> Previous</small><b>${prev.t}</b></a></div></div><div class="col-6"><div class="pcard pn text-end"><a data-go href="projects.html?id=${next.id}"><small>Next <i class="bi bi-arrow-right"></i></small><b>${next.t}</b></a></div></div></div></div>
 <aside class="col-lg-4 order-1 order-lg-2"><div class="snap"><div class="pcard"><h6>Project snapshot</h6>
  <dl><div><dt>Role</dt><dd>${p.role}</dd></div><div><dt>Duration</dt><dd>${p.dur}</dd></div><div><dt>Team</dt><dd>${p.team}</dd></div><div><dt>Year</dt><dd>${p.yr}</dd></div></dl>
  <div class="d-grid gap-2"><a href="${liveHref}" ${p.live ? 'target="_blank" rel="noopener"' : ''} class="btn btn-pc btn-pill btn-sm">Live demo</a><a href="${p.repo || '#'}" class="btn btn-outline-brand btn-pill btn-sm">Source code</a></div></div>
  <nav class="toc pcard d-none d-lg-block"><h6>On this page</h6>${secs.map(s => `<a href="#${s[0]}">${s[1]}</a>`).join('')}</nav></div></aside></div></div>`;

$('#codeTxt').textContent = p.code.s;
$$('[data-copy]').forEach(b => b.onclick = () => { if (!b.dataset.copy) return; navigator.clipboard?.writeText(b.dataset.copy); b.innerHTML = '<i class="bi bi-check2"></i>'; setTimeout(() => b.innerHTML = '<i class="bi bi-clipboard"></i>', 1400) });
$('#copy').onclick = e => { navigator.clipboard?.writeText(p.code.s); e.currentTarget.innerHTML = '<i class="bi bi-check2"></i> Copied'; setTimeout(() => $('#copy').innerHTML = '<i class="bi bi-clipboard"></i> Copy', 1600) };
$$('.devs button').forEach(b => b.onclick = () => { $$('.devs button').forEach(x => x.classList.toggle('on', x == b)); $('#bframe').style.maxWidth = b.dataset.w });
let k = 0, modal; const getModal = () => modal || (modal = window.bootstrap ? new bootstrap.Modal($('#shotModal')) : null);
const showShot = n => { k = (n + p.shots.length) % p.shots.length; $('#shotCap').textContent = `${p.t}: ${p.shots[k][0]} (${k + 1}/${p.shots.length})`; $('#shotBig').innerHTML = mock(p.shots[k][0], p.shots[k][1], p.shots[k][2]) };
$$('.shotf').forEach(f => f.onclick = () => { showShot(+f.dataset.k); getModal()?.show() });
$$('[data-s]').forEach(b => b.onclick = () => showShot(k + +b.dataset.s));
$('#shotModal').addEventListener('keydown', e => { if (e.key == 'ArrowRight') showShot(k + 1); if (e.key == 'ArrowLeft') showShot(k - 1) });
$$('.tilt').forEach(c => { c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-3px)` }); c.addEventListener('mouseleave', () => c.style.transform = '') });
/* count-up stats */
const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cio.unobserve(e.target); const m = e.target.dataset.n.match(/^(\d+)(.*)$/); if (!m) return; const to = +m[1], t0 = performance.now(); (function s(t) { const q = Math.min((t - t0) / 1200, 1); e.target.textContent = Math.round(to * (1 - Math.pow(1 - q, 3))) + m[2]; if (q < 1) requestAnimationFrame(s) })(t0) }), { threshold: .6 });
$$('.pstrip b').forEach(b => cio.observe(b));
/* table of contents scroll-spy */
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('.toc a').forEach(a => a.classList.toggle('on', a.getAttribute('href') == '#' + e.target.id)) }), { rootMargin: '-30% 0px -60% 0px' });
$$('.psec').forEach(s => spy.observe(s));
}
})();
