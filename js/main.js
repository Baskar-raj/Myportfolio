(() => {
/* safety net: if anything below throws, never leave the page invisible */
addEventListener('error', () => document.querySelectorAll('.reveal').forEach(el => el.classList.remove('reveal')));
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ================= DATA (edit me) ================= */
const traits = [["bi-lightbulb","Problem Solver","I enjoy finding practical solutions to complex problems."],["bi-mortarboard","Quick Learner","Always eager to learn and adapt to new technologies."],["bi-people","Team Player","I believe in collaboration and shared growth."],["bi-graph-up-arrow","Growth Mindset","Every challenge is a step towards becoming better."]];
const skills = {Frontend:[["bi-filetype-jsx","React"],["bi-filetype-html","HTML5"],["bi-filetype-css","CSS3"],["bi-filetype-js","JavaScript"]],Backend:[["bi-hexagon","Node.js"],["bi-diagram-3","Express.js"],["bi-filetype-py","Python"],["bi-flask","Flask"]],Database:[["bi-database","MongoDB"],["bi-database-gear","MySQL"],["bi-database-fill","PostgreSQL"]],"Tools & Others":[["bi-git","Git"],["bi-send","Postman"],["bi-code-square","VS Code"],["bi-box-seam","Docker"]]};
const journey = [
 {t:"SSLC",lvl:"School",inst:"Sri Venkatesware Matric Higher Secondary School",yr:"2019",score:"77.4%",pct:77.4,pts:["Scored 77.4% overall in the board exams","Strongest in Mathematics and Science","Where my love for logic and puzzles began"],tags:["Mathematics","Science"],ic:"bi-backpack2"},
 {t:"HSC",lvl:"Higher Secondary",inst:"Sri RamaKrishna Matric Higher Secondary School",yr:"2021",score:"84%",pct:84,pts:["Completed with 78% in a challenging stream","Wrote my first programs here","Decided to pursue computer applications"],tags:["Computer Science","Maths"],ic:"bi-journal-bookmark"},
 {t:"BSc CS",lvl:"Undergraduate",inst:"Adhiparashakthi College of Arts and Science",yr:"2021 - 2024",score:"8.4 CGPA",pct:84,pts:["Learned C, Java, DBMS and web fundamentals","Built mini projects and a first full website","Discovered my interest in full-stack development"],tags:["Java","DBMS","HTML/CSS"],ic:"bi-laptop"},
 {t:"MCA",lvl:"Postgraduate",inst:"VIT Vellore",yr:"2024 - 2026",score:"8.44 CGPA",pct:84.4,pts:["Specialised in the MERN stack and cloud","Built BlueWaves and EduTrack end to end","Earned AWS, Coursera and MongoDB certifications"],tags:["MERN","AWS","REST APIs"],ic:"bi-mortarboard-fill"}];
const certs = [
 {id:"aws",org:"Udemy",color:"#9808ae",t:"FullStack Bootcamp",by:"Udemy",d:"April 2025",lvl:"Foundational",cid:"UC-543ace8c-la78-448b-82ac-aa0eccf9ea 67.pdf",over:"Validates a broad understanding of the AWS Cloud: core services, security, pricing and the shared responsibility model.",tags:["HTML","CSS","JS","Bootstrap","Database"],topics:["Frontend and Backend","Authentication","Core services: HTML.CSS,JS","Pricing models, cost tools and support plans"],verify:"#",pdf:"#"},
 {id:"python-everybody",org:"coursera",color:"#2563EB",t:"React-Native",by:"Meta",d:"Apr 2025",lvl:"Beginner",cid:"COURSERA-XXXXXX",over:"A specialization that takes React-native from the basics to data structures, web data access and databases.",tags:["Python","Data structures","APIs","SQLite","JSON"],topics:["Variables, loops, functions and files","Lists, dictionaries and tuples","Web data: HTTP, JSON, XML and APIs","Databases with SQLite"],verify:"#",pdf:"#"},
 {id:"mongodb-basics",org:"MongoDB",color:"#059669",t:"MongoDB Basics",by:"MongoDB University",d:"Feb 2025",lvl:"Beginner",cid:"MDB-XXXXXX",over:"Introduces the document model and the core operations needed to design and query MongoDB databases.",tags:["NoSQL","CRUD","Aggregation","Indexes","Atlas"],topics:["The document model and schema design","CRUD with filters and operators","Aggregation pipelines","Indexes and MongoDB Atlas"],verify:"#",pdf:"#"}];
const projs = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];   // single source of truth: js/projects-data.js

/* ================= Page transition curtain ================= */
const cur = document.createElement('div'); cur.className = 'curtain'; cur.innerHTML = '<div class="bot"><i class="eye"></i><i class="eye"></i></div>'; document.body.append(cur);
if (sessionStorage.getItem('go')) { cur.classList.add('start'); requestAnimationFrame(() => requestAnimationFrame(() => { cur.classList.remove('start'); cur.classList.add('out'); sessionStorage.removeItem('go') })) }
const go = href => { sessionStorage.setItem('go', 1); cur.classList.remove('out'); cur.classList.add('in'); setTimeout(() => location.href = href, 600) };
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-go]'); if (a) { e.preventDefault(); return go(a.href) }
  const c = e.target.closest('[data-href]'); if (c && !e.target.closest('a,button')) go(c.dataset.href);
});
addEventListener('pageshow', e => { if (e.persisted) cur.className = 'curtain' });

/* ================= Render ================= */
$('#traits').innerHTML = traits.map(t => `<div class="cardx trait tilt reveal"><i class="bi ${t[0]}"></i><div><b>${t[1]}</b><p>${t[2]}</p></div></div>`).join('');
$('#skillGrid').innerHTML = Object.entries(skills).map(([k, v]) => `<div class="col-sm-6 reveal"><div class="cardx sk tilt"><h6>${k}</h6><div class="items">${v.map(i => `<div><i class="bi ${i[0]}"></i>${i[1]}</div>`).join('')}</div></div></div>`).join('');
const certDoc = c => `<div class="certdoc" style="--c:${c.color}"><div class="cd-in"><small>CERTIFICATE OF COMPLETION</small><span class="cd-org">${c.org}</span><p>This is to certify that</p><h4>Baskar Raj</h4><p>has successfully completed</p><b>${c.t}</b><div class="cd-foot"><span>${c.d}</span><i class="bi bi-patch-check-fill"></i><span>${c.by}</span></div></div><img src="img/certs/${c.id}.png" alt="${c.t} certificate" onerror="this.remove()"></div>`;
$('#certGrid').innerHTML = certs.map((c, i) => `<div class="col-md-6 col-xl-4 reveal"><article class="cardx certcard tilt h-100" style="--c:${c.color}"><button class="cprev" data-open="${i}" aria-label="View ${c.t} full size">${certDoc(c)}<span class="zoom"><i class="bi bi-arrows-fullscreen"></i> Full view</span></button><div class="p-3 d-flex flex-column flex-grow-1"><div class="d-flex justify-content-between align-items-center mb-2"><span class="lvl-pill">${c.lvl}</span><small class="text-muted"><i class="bi bi-calendar3 me-1"></i>${c.d}</small></div><h5 class="fw-bold mb-0">${c.t}</h5><small class="text-muted">${c.by}</small><p class="small text-muted mt-2">${c.over}</p><div class="cid"><i class="bi bi-upc-scan"></i>${c.cid}</div><div class="mt-2">${c.tags.slice(0, 4).map((t, k) => `<span class="tag ${k % 2 ? 'a' : ''}">${t}</span>`).join('')}</div><div class="d-flex gap-2 mt-auto pt-3"><button class="btn btn-brand btn-pill btn-sm" data-open="${i}"><i class="bi bi-eye me-1"></i>Full view</button><a data-go href="certificates/${c.id}.html" class="btn btn-outline-brand btn-pill btn-sm">Details <i class="bi bi-arrow-right ms-1"></i></a></div></div></article></div>`).join('');
let ci = 0, cm; const getModal = () => cm || (cm = window.bootstrap ? new bootstrap.Modal($('#certModal')) : null);
function certShow(i) {
  ci = (i + certs.length) % certs.length; const c = certs[ci];
  $('#certView').innerHTML = `<div class="col-lg-7"><div class="cview" style="--c:${c.color}">${certDoc(c)}</div></div><div class="col-lg-5"><span class="lvl-pill">${c.lvl}</span><h3 class="fw-bold mt-2 mb-0">${c.t}</h3><p class="text-muted">${c.by}</p><div class="meta" style="margin:14px 0"><div class="cardx"><small>Issued</small><b>${c.d}</b></div><div class="cardx"><small>Credential ID</small><b>${c.cid}</b></div></div><p class="small text-muted">${c.over}</p><h6 class="small fw-bold">What I covered</h6><ul class="small text-muted ps-3">${c.topics.map(t => `<li>${t}</li>`).join('')}</ul><div class="mb-3">${c.tags.map((t, k) => `<span class="tag ${k % 2 ? 'a' : ''}">${t}</span>`).join('')}</div><div class="d-flex flex-wrap gap-2"><a href="${c.verify}" class="btn btn-brand btn-pill btn-sm"><i class="bi bi-patch-check me-1"></i>Verify</a><a href="${c.pdf}" class="btn btn-outline-brand btn-pill btn-sm"><i class="bi bi-download me-1"></i>PDF</a><a data-go href="certificates/${c.id}.html" class="btn btn-outline-brand btn-pill btn-sm">Details page</a><span class="ms-auto d-flex gap-2"><button class="fab" style="width:36px;height:36px" data-cn="-1" aria-label="Previous"><i class="bi bi-chevron-left"></i></button><button class="fab" style="width:36px;height:36px" data-cn="1" aria-label="Next"><i class="bi bi-chevron-right"></i></button></span></div></div>`;
}
document.addEventListener('click', e => { const o = e.target.closest('[data-open]'); if (o) { certShow(+o.dataset.open); getModal()?.show() } const n = e.target.closest('[data-cn]'); if (n) certShow(ci + +n.dataset.cn) });
$('#certModal').addEventListener('keydown', e => { if (e.key == 'ArrowRight') certShow(ci + 1); if (e.key == 'ArrowLeft') certShow(ci - 1) });
$('#projGrid').innerHTML = projs.length ? projs.map(p => `<div class="col-md-6 col-xl-4 pitem reveal" data-cat="${p.cat}"><article class="cardx proj tilt h-100" data-href="projects.html?id=${p.id}"><div class="banner ${p.cls}">${p.cover ? `<img class="cover" src="${p.cover}" alt="${p.t} project preview" loading="lazy" onerror="this.remove()">` : ''}<span class="win"><i></i><i></i><i></i></span>${p.star ? '<span class="badge-f">Featured</span>' : ''}<i class="bi ${p.ic} big"></i></div><div class="p-3 d-flex flex-column flex-grow-1"><small class="text-muted">${p.sub} &middot; ${p.yr}</small><h5>${p.t}</h5><p>${p.d}</p><div class="mb-3">${p.tags.slice(0, 4).map((t, i) => `<span class="tag ${i % 2 ? 'a' : ''}">${t}</span>`).join('')}</div><div class="d-flex gap-2 mt-auto"><a data-go href="projects.html?id=${p.id}" class="btn btn-brand btn-pill btn-sm">Case study <i class="bi bi-arrow-right ms-1"></i></a><a href="${p.repo || '#'}" ${p.repo ? 'target="_blank" rel="noopener"' : ''} class="btn btn-outline-brand btn-pill btn-sm" aria-label="GitHub"><i class="bi bi-github"></i></a></div></div></article></div>`).join('') : '<p class="text-muted">Project data not loaded. Check that js/projects-data.js is linked before js/main.js.</p>';

/* project filter */
const cats = ['All', ...new Set(projs.map(p => p.cat))];
$('#pFilters').innerHTML = cats.map((c, i) => `<button class="${i ? '' : 'on'}" data-c="${c}">${c}</button>`).join('');
$('#pFilters').onclick = e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('#pFilters button').forEach(x => x.classList.toggle('on', x == b));
  $$('.pitem').forEach(el => {
    const show = b.dataset.c == 'All' || el.dataset.cat == b.dataset.c;
    if (show) { el.classList.remove('d-none'); requestAnimationFrame(() => el.classList.remove('out')) } else { el.classList.add('out'); setTimeout(() => el.classList.add('d-none'), 350) }
  });
};

/* ================= Journey map + detail card ================= */
const F = [.06, .36, .66, .96], road = $('#road'), jbox = $('.journey'), walker = $('#walker');
$('#stops').innerHTML = journey.map((j, i) => `<button class="cardx stop" data-i="${i}"><i class="bi ${j.ic}"></i><div><b>${j.t}</b>${j.score}</div></button>`).join('');
let ji = -1, wq = F[0];
const pt = q => { const p = road.getPointAtLength(road.getTotalLength() * q), b = jbox.getBoundingClientRect(); return { x: p.x / 900 * b.width, y: p.y / 260 * b.height } };
function layout() {
  const b = jbox.getBoundingClientRect();
  $$('.stop').forEach((s, i) => { const p = pt(F[i]); s.style.left = Math.min(Math.max(p.x - 60, 0), b.width - s.offsetWidth) + 'px'; s.style.top = Math.max(p.y - s.offsetHeight - 24, 0) + 'px' });
  const p = pt(wq); walker.style.left = p.x - 22 + 'px'; walker.style.top = p.y - 48 + 'px';
}
function walkTo(q) { const from = wq, t0 = performance.now(); (function step(t) { const k = Math.min((t - t0) / 1000, 1), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; wq = from + (q - from) * e; layout(); if (k < 1) requestAnimationFrame(step) })(t0) }
function show(i) {
  i = (i + journey.length) % journey.length; const j = journey[i], dir = i >= ji; ji = i;
  $$('.stop').forEach((s, k) => s.classList.toggle('on', k == i)); walkTo(F[i]);
  $('#jCard').innerHTML = `<div class="body"><span class="lvl">${j.lvl} &middot; ${j.yr}</span><h3>${j.t}</h3><p class="small text-muted mb-1"><i class="bi bi-building me-1"></i>${j.inst}</p><div class="d-flex justify-content-between small mt-3"><span>Result</span><b>${j.score}</b></div><div class="meter"><i></i></div><ul>${j.pts.map(p => `<li>${p}</li>`).join('')}</ul><div>${j.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div></div><div class="jnav"><button data-d="-1" aria-label="Previous"><i class="bi bi-chevron-left"></i></button><button data-d="1" aria-label="Next"><i class="bi bi-chevron-right"></i></button></div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => { const m = $('.meter i'); if (m) m.style.width = j.pct + '%' }));
}
$('#stops').onclick = e => { const s = e.target.closest('.stop'); if (s) show(+s.dataset.i) };
$('#jCard').onclick = e => { const b = e.target.closest('[data-d]'); if (b) show(ji + +b.dataset.d) };
addEventListener('resize', layout); show(0); setTimeout(layout, 300);

/* ================= Theme, reveal, tilt ================= */
const root = document.documentElement, tb = $('#themeBtn');
const setTheme = t => { root.dataset.theme = t; tb.innerHTML = `<i class="bi bi-${t == 'dark' ? 'sun' : 'moon-stars'}"></i>`; try { localStorage.setItem('theme', t) } catch (e) {} };
try { setTheme(localStorage.getItem('theme') || 'light') } catch (e) {}
tb.onclick = () => setTheme(root.dataset.theme == 'dark' ? 'light' : 'dark');
$('#topBtn').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const el = e.target; el.classList.add('in'); io.unobserve(el); if (el !== jbox && el.classList.contains('reveal')) setTimeout(() => { el.classList.remove('reveal', 'in'); el.style.transitionDelay = '' }, 1200) } }), { threshold: .15 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el) });
io.observe(jbox); jbox.classList.add('reveal');
$$('.tilt').forEach(c => {
  c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)` });
  c.addEventListener('mouseleave', () => c.style.transform = '');
});

/* hero counters */
const cio = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cio.unobserve(e.target); const to = +e.target.dataset.to, t0 = performance.now(); (function s(t) { const k = Math.min((t - t0) / 1400, 1); e.target.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(s) })(t0) }), { threshold: .6 });
$$('.count').forEach(c => cio.observe(c));

/* ================= Indicators ================= */
const secs = $$('main section'), dots = $('#dots');
dots.innerHTML = secs.map(s => `<a href="#${s.id}" title="${s.id}"></a>`).join('');
let current = secs[0];

/* ================= Eye tracking ================= */
const bots = $$('.bot'); let mx = innerWidth / 2, my = innerHeight / 2, override = null, ot;
addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; override = null });
const touch = e => { const t = e.touches[0]; if (t) { mx = t.clientX; my = t.clientY; override = null } };
addEventListener('touchstart', touch, { passive: true }); addEventListener('touchmove', touch, { passive: true });
(function look() {
  const tx = override ? override.x : mx, ty = override ? override.y : my;
  bots.forEach(b => { const r = b.getBoundingClientRect(), dx = tx - (r.left + r.width / 2), dy = ty - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1, k = Math.min(d / 8, 1) * 5;
    $$('.eye', b).forEach(e => e.style.transform = `translate(${dx / d * k}px,${dy / d * k}px)`) });
  requestAnimationFrame(look);
})();

/* ================= Scroll: guide avatar zig-zags left <-> right ================= */
const guide = $('#guide'), bubble = $('#bubble'), gbot = $('.bot', guide);
let lastHint = '', bt, side = 'left', tt, lastCur = null, pk;
const isM = () => innerWidth < 992;
const gx = s => s == 'right' ? innerWidth - (isM() ? 116 : 126) : 0;
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight, p = Math.min(scrollY / max, 1);
  $('#progress').style.width = p * 100 + '%'; $('#trackFill').style.height = p * 100 + '%';
  const gy = isM() ? 90 + p * (innerHeight - 210) : 110 + p * (innerHeight - 330); guide.style.top = gy + 'px';
  $('#topBtn').classList.toggle('show', scrollY > 500);

  current = secs.filter(s => s.getBoundingClientRect().top < innerHeight * .4).pop() || secs[0];
  $$('#side nav a,.topbar .nav-link').forEach(a => a.classList.toggle('active', a.getAttribute('href') == '#' + current.id));
  $$('#dots a').forEach(a => a.classList.toggle('active', a.getAttribute('href') == '#' + current.id));

  if (current !== lastCur) { lastCur = current; const sd = $('#side'); sd.classList.add('peek'); clearTimeout(pk); pk = setTimeout(() => sd.classList.remove('peek'), 1800) }
  const ns = secs.indexOf(current) % 2 ? 'right' : 'left';
  if (ns != side) {  // travel to the other side, eyes lead the way
    side = ns; guide.classList.add('travel'); guide.classList.toggle('right', side == 'right'); guide.style.setProperty('--gx', gx(side) + 'px');
    override = { x: side == 'right' ? innerWidth : 0, y: gy }; clearTimeout(tt); tt = setTimeout(() => guide.classList.remove('travel'), 1150);
  } else { const n = secs[secs.indexOf(current) + 1], r = (n || current).getBoundingClientRect(); override = { x: innerWidth / 2, y: Math.max(r.top, 0) + 40 } }
  clearTimeout(ot); ot = setTimeout(() => override = null, 1400);

  const hint = current.dataset.hint;
  if (hint != lastHint) { lastHint = hint; bubble.textContent = hint; setTimeout(() => bubble.classList.add('show'), 600); gbot.classList.add('happy'); clearTimeout(bt); bt = setTimeout(() => { bubble.classList.remove('show'); gbot.classList.remove('happy') }, 3000) }
}
addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', () => { guide.style.setProperty('--gx', gx(side) + 'px'); onScroll() }); onScroll();
gbot.onclick = () => { const n = secs[secs.indexOf(current) + 1]; (n || secs[0]).scrollIntoView({ behavior: 'smooth' }) };
setTimeout(() => { bubble.textContent = "Hi! Scroll with me"; bubble.classList.add('show'); setTimeout(() => bubble.classList.remove('show'), 2800) }, 900);

window.__ok = true;   // tells index.html the script ran fully
$('#form').addEventListener('submit', e => { e.preventDefault(); e.target.classList.add('was-validated'); if (e.target.checkValidity()) { $('#sent').textContent = 'Message sent. Thank you!'; e.target.reset(); e.target.classList.remove('was-validated') } });
})();
