/* ═══════════════════════════════════════
   NAV
   ═══════════════════════════════════════ */
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ═══════════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 58, behavior: 'smooth' });
  });
});

/* ═══════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════ */
const revealObs = new IntersectionObserver(
  entries => entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObs.unobserve(entry.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════
   PHOTO PARALLAX
   ═══════════════════════════════════════ */
const photoWrap = document.querySelector('.hero-photo-wrap');
if (photoWrap) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx * 7;
    const dy = (e.clientY - cy) / cy * 5;
    photoWrap.style.transform = `translate(${dx}px, ${dy}px)`;
  }, { passive: true });
}

/* ═══════════════════════════════════════
   PROJECT EXPAND
   ═══════════════════════════════════════ */
const projects = {
  pigeon: {
    org: 'Inside Fox Corporation · OutKick · 2026',
    title: 'OutKick Loyalty Portal Initiative',
    accent: '#E8272A',
    problem: 'OutKick was good at acquiring sports fans. Keeping the ones who actually cared was the harder problem. The super user, the fan who visits daily, engages deeply, and drives community, was declining. Nobody had a clear picture of where the drop-off was happening, or a business case that leadership could act on.',
    approach: 'I partnered across BI, editorial, product, and CRM to analyze behavioral patterns, identify who the super users actually were, and map where the experience was breaking down. I built a data-backed retention playbook for each team, then prototyped an AI-assisted loyalty portal concept using Replit and Claude Code and demoed it live in the final presentation.',
    output: [
      'Retention playbook presented to 15+ stakeholders, including two SVPs, in a full boardroom setting',
      'AI prototype built and demoed live during the final presentation',
      'Framework handed off to product and editorial teams for execution'
    ]
  },
  geolink: {
    org: 'Inside Leaf Home · 2024–2026',
    title: 'GeoLink',
    accent: '#16A34A',
    problem: 'Paid media spend lived on platforms: Meta, TikTok, Nextdoor. CRM revenue lived in a separate system. Nobody could connect the two. Which regions were generating returns? Which weren\'t? Where should next month\'s budget go? Nobody had a reliable answer.',
    approach: 'I built GeoLink from scratch: a proprietary ZIP/DMA attribution system that joined platform spend data to CRM revenue outcomes by geography.',
    output: [
      'ROAS improved 37% year over year through geo-level budget reallocation that was previously impossible to justify',
      'Replaced regional guesswork with a repeatable data model',
      'Established a monthly creative performance reporting workflow across Media and Creative teams'
    ]
  },
  cleannkick: {
    org: 'CUNY Baruch · Blackstone LaunchPad · 2023',
    title: 'Clean N Kick',
    accent: '#F97316',
    photo: 'IMG_9068.jpeg',
    problem: 'New Yorkers are serious about their sneakers. Finding reliable, convenient shoe cleaning in the city is surprisingly hard. Nobody had built the on-demand version of it yet.',
    approach: 'Designed the full business from scratch: service model, pricing strategy, unit economics, customer discovery, competitive analysis, and pitch deck. Built and delivered it independently, under competition pressure.',
    output: [
      'Won $1,000 first place at CUNY Blackstone LaunchPad',
      'Selected as CUNY Clash startup pitch finalist, competing across all CUNY campuses',
      'Validated concept through real customer discovery and unit economics modeling'
    ]
  },
  bball: {
    org: 'Jakarta, Indonesia · 2019–2022',
    title: 'BBALLSTORE.ID',
    accent: '#6366F1',
    problem: 'Indonesian basketball players had limited access to quality gear, and no strong local brand was serving them through social commerce channels.',
    approach: 'Started from scratch. Built a brand using influencer partnerships and marketplace optimization across Tokopedia and Shopee. Managed sourcing, inventory, fulfillment, and marketing end to end.',
    output: [
      'Scaled from zero to $6,500 per month in revenue, starting at 16',
      'Built and ran every part of the operation independently',
      'Ran data-driven marketing campaigns before knowing what to call them'
    ]
  },
  bmcc: {
    org: 'CUNY BMCC · 2024',
    title: 'BMCC Marketing Club',
    accent: '#0052CC',
    photos: ['IMG_0771.jpeg', 'IMG_9080.jpeg'],
    problem: 'BMCC students interested in marketing had no dedicated community, no industry exposure, and no real-world space to develop beyond what a classroom could offer.',
    approach: 'Founded the club from scratch. Built the organizational structure, organized an industry speaker series, created mentorship frameworks, and built a real learning environment while finishing my own degree.',
    output: [
      'Built an active student organization from nothing',
      'Connected students to marketing professionals through an organized speaker series',
      'Established a lasting community and learning environment at CUNY BMCC'
    ]
  }
};

const expand          = document.getElementById('projExpand');
const closeBtn        = document.getElementById('projClose');
const expandOrg       = document.getElementById('expandOrg');
const expandTitle     = document.getElementById('expandTitle');
const expandProb      = document.getElementById('expandProblem');
const expandApp       = document.getElementById('expandApproach');
const expandOut       = document.getElementById('expandOutput');
const expandPhotoRow  = document.getElementById('expandPhotoRow');

let activeCard = null;

function setExpandAccent(color) {
  document.documentElement.style.setProperty('--expand-accent', color);
}

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => {
    const id   = card.dataset.id;
    const data = projects[id];
    if (!data) return;

    if (activeCard === card && expand.classList.contains('open')) {
      closeExpand();
      return;
    }

    document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    activeCard = card;

    setExpandAccent(data.accent || 'var(--accent)');
    expandOrg.textContent   = data.org;
    expandTitle.textContent = data.title;
    expandProb.textContent  = data.problem;
    expandApp.textContent   = data.approach;
    expandOut.innerHTML     = data.output.map(o => `<li>${o}</li>`).join('');

    if (data.photos) {
      expandPhotoRow.innerHTML = data.photos.map(src =>
        `<img src="${src}" class="exp-photo" loading="lazy" onerror="this.parentElement.removeChild(this)">`
      ).join('');
    } else if (data.photo) {
      expandPhotoRow.innerHTML = `<img src="${data.photo}" class="exp-photo" loading="lazy" onerror="this.parentElement.removeChild(this)">`;
    } else {
      expandPhotoRow.innerHTML = '';
    }

    expand.classList.add('open');

    setTimeout(() => {
      const top = expand.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 120);
  });
});

function closeExpand() {
  expand.classList.remove('open');
  document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('active'));
  activeCard = null;
  setExpandAccent('var(--accent)');
}

if (closeBtn) closeBtn.addEventListener('click', closeExpand);
