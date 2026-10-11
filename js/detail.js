(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem('theme') || 'light' } catch (e) {}
const tb = $('#themeBtn'), icon = () => tb.innerHTML = `<i class="bi bi-${root.dataset.theme == 'dark' ? 'sun' : 'moon-stars'}"></i>`; icon();
tb.onclick = () => { root.dataset.theme = root.dataset.theme == 'dark' ? 'light' : 'dark'; try { localStorage.setItem('theme', root.dataset.theme) } catch (e) {} icon() };

/* curtain */
const cur = document.createElement('div'); cur.className = 'curtain start'; cur.innerHTML = '<div class="bot"><i class="eye"></i><i class="eye"></i></div>'; document.body.append(cur);
requestAnimationFrame(() => requestAnimationFrame(() => { cur.classList.remove('start'); cur.classList.add('out') }));
document.addEventListener('click', e => { const a = e.target.closest('a[data-go]'); if (!a) return; e.preventDefault(); sessionStorage.setItem('go', 1); cur.classList.remove('out'); cur.classList.add('in'); setTimeout(() => location.href = a.href, 600) });
addEventListener('pageshow', e => { if (e.persisted) cur.className = 'curtain out' });

/* eyes */
let mx = innerWidth / 2, my = 200; addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });
(function look() { $$('.bot').forEach(b => { const r = b.getBoundingClientRect(), dx = mx - r.left - r.width / 2, dy = my - r.top - r.height / 2, d = Math.hypot(dx, dy) || 1, k = Math.min(d / 8, 1) * 5; $$('.eye', b).forEach(e => e.style.transform = `translate(${dx / d * k}px,${dy / d * k}px)`) }); requestAnimationFrame(look) })();

/* reveal + progress */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .12 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 80 + 'ms'; io.observe(el) });
addEventListener('scroll', () => $('#progress').style.width = scrollY / (document.documentElement.scrollHeight - innerHeight) * 100 + '%', { passive: true });
})();
