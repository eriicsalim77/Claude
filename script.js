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
    org: 'Fox Corporation · OutKick · 2026',
    title: 'Project Pigeon',
    accent: '#E8272A',
    problem: 'OutKick is great at acquiring sports fans. Keeping them was the harder problem. Users came, consumed content, and left. The super user — the fan who visits daily, engages deeply, and drives community — was declining. Nobody had a clear picture of why, or where the drop-off was happening.',
    approach: 'I partnered cross-functionally with BI, editorial, product, and finance to analyze behavioral data patterns. We identified who the super users actually were, mapped their journey through the product, surfaced the specific drop-off points, and built a data-backed retention playbook with a clear recommendation for each team.',
    output: [
      'Senior-leadership-ready presentation pitched to 15 or more stakeholders, including 2 SVPs, in a full boardroom setting',
      'AI-assisted MVP prototyped on Replit and Claude Code, demoed live during the final presentation — nobody asked for it, the problem needed it',
      'Retention strategy framework handed off to product and editorial teams for execution'
    ]
  },
  geolink: {
    org: 'Leaf Home · 2024–2026',
    title: 'GeoLink',
    accent: '#16A34A',
    problem: 'Paid media spend lived on platforms — Meta, TikTok, Nextdoor. CRM revenue lived in a separate system. Nobody could connect the two. Which regions were generating returns? Which were not? Where should next month\'s budget go? Nobody had a reliable answer.',
    approach: 'Built GeoLink from scratch — a proprietary ZIP/DMA attribution system that joined platform spend data to CRM revenue outcomes by geography. For the first time, the media team had a single view of regional performance across all three channels.',
    output: [
      'Improved ROAS 37% year over year through geo-level budget reallocation that was previously impossible to justify with data',
      'Replaced guesswork on regional allocation with a clear, repeatable data model',
      'Established a monthly creative performance reporting workflow across Media and Creative teams'
    ]
  },
  cleannkick: {
    org: 'CUNY Baruch · Blackstone Launchpad · 2023',
    title: 'Clean N Kick',
    accent: '#F97316',
    problem: 'New Yorkers are serious about their sneakers. Finding reliable, convenient shoe cleaning in the city is surprisingly hard. Nobody had built the on-demand version of it yet.',
    approach: 'Designed an on-demand shoe cleaning service targeting New York City. Built the full business model, unit economics, pricing strategy, pitch deck, and MVP concept from scratch, independently, under competition pressure.',
    output: [
      'Won $1,000 first place at CUNY Blackstone Launchpad',
      'Selected as CUNY Clash startup pitch finalist, competing against student ventures across all CUNY campuses',
      'Validated concept through customer discovery, competitive analysis, and unit economics modeling'
    ]
  },
  bball: {
    org: 'Jakarta, Indonesia · 2019–2022',
    title: 'BBALLSTORE.ID',
    accent: '#6366F1',
    problem: 'Indonesian basketball players had limited access to quality gear, and no strong local brand was serving them through social commerce channels. The demand was real. The supply was not.',
    approach: 'Started at 16 with no capital and no playbook. Built a basketball e-commerce brand using influencer partnerships and marketplace optimization across Tokopedia and Shopee. Managed sourcing, inventory, fulfillment, and marketing independently.',
    output: [
      'Scaled from zero to $6,500 per month in revenue, starting at age 16',
      'Built and ran all operations end to end — independently',
      'Ran data-driven marketing campaigns before knowing what to call them'
    ]
  },
  bmcc: {
    org: 'CUNY BMCC · 2024',
    title: 'BMCC Marketing Club',
    accent: '#0052CC',
    problem: 'BMCC students interested in marketing had no dedicated community, no industry exposure, and no real-world space to develop beyond what a classroom could offer.',
    approach: 'Founded the BMCC Marketing Club from scratch. Built the structure, organized industry speaker events, created mentorship frameworks, and built a genuine learning environment — while finishing his own degree.',
    output: [
      'Built an active student organization from zero with no existing infrastructure',
      'Connected students to marketing professionals through an organized speaker series',
      'Established a lasting community and learning environment at CUNY BMCC'
    ]
  }
};

const expand      = document.getElementById('projExpand');
const closeBtn    = document.getElementById('projClose');
const expandOrg   = document.getElementById('expandOrg');
const expandTitle = document.getElementById('expandTitle');
const expandProb  = document.getElementById('expandProblem');
const expandApp   = document.getElementById('expandApproach');
const expandOut   = document.getElementById('expandOutput');

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

    expand.classList.add('open');

    setTimeout(() => {
      expand.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  });
});

function closeExpand() {
  expand.classList.remove('open');
  document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('active'));
  activeCard = null;
  setExpandAccent('var(--accent)');
}

if (closeBtn) closeBtn.addEventListener('click', closeExpand);
