/* Derive navigation from the order of published cards on work.html.
   Static HTML links are supplied as a no-JavaScript / offline fallback. */
(() => {
  'use strict';
  const host = document.querySelector('[data-project-navigation]');
  if (!host || !window.fetch || !window.DOMParser) return;
  const current = location.pathname.split('/').pop() || 'index.html';
  fetch('work.html', { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw new Error('Work page unavailable'); return response.text(); })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const projects = Array.from(doc.querySelectorAll('.project-list > a.project-card[href]'))
        .map(a => ({href:new URL(a.getAttribute('href'),location.href).pathname.split('/').pop(),name:a.querySelector('h3')?.textContent.trim()}))
        .filter(p => p.href && p.name && p.href.endsWith('.html'));
      const idx = projects.findIndex(p => p.href === current);
      if (idx < 0 || projects.length < 2) { if (idx >= 0 && projects.length < 2) host.remove(); return; }
      const inner = host.querySelector('.portfolio-project-navigation__inner');
      if (!inner) return;
      const links = [];
      const add = (direction, target) => {
        if (!target) return;
        const a = document.createElement('a');
        a.href = target.href;
        a.className = 'portfolio-project-navigation__link portfolio-project-navigation__link--' + direction;
        a.setAttribute('aria-label', (direction === 'previous' ? 'Previous project: ' : 'Next project: ') + target.name);
        const arrow = document.createElement('span');
        arrow.className = 'portfolio-project-navigation__arrow';
        arrow.setAttribute('aria-hidden','true');
        arrow.textContent = direction === 'previous' ? '←' : '→';
        const text = document.createElement('span');
        text.className = 'portfolio-project-navigation__copy';
        const label = document.createElement('span');
        label.className = 'portfolio-project-navigation__label';
        label.textContent = direction === 'previous' ? 'Previous Project' : 'Next Project';
        const name = document.createElement('span');
        name.className = 'portfolio-project-navigation__name';
        name.textContent = target.name;
        text.append(label,name);
        direction === 'previous' ? a.append(arrow,text) : a.append(text,arrow);
        links.push(a);
      };
      add('previous',projects[idx-1]);
      add('next',projects[idx+1]);
      if (!links.length) { host.remove(); return; }
      /* Skip DOM changes if the server-built navigation is already identical. */
      const old = Array.from(inner.querySelectorAll('a'));
      if (old.length === links.length && old.every((a,i) => a.getAttribute('href') === links[i].getAttribute('href') && a.querySelector('.portfolio-project-navigation__name')?.textContent === links[i].querySelector('.portfolio-project-navigation__name')?.textContent)) return;
      inner.replaceChildren(...links);
    })
    .catch(() => { /* Keep valid static fallback links when offline. */ });
})();
