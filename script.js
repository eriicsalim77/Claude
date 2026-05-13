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
    problem: 'OutKick is exceptional at acquiring sports fans — but it struggled to keep them. Users came, consumed content, and left. The "super user" who visits daily and drives community was declining, and nobody had a clear picture of why or where the drop-off was happening.',
    approach: 'I partnered cross-functionally with BI, editorial, product, and finance to analyze behavioral data. We mapped who the super users actually were, traced their journey, surfaced the specific drop-off points, and built a data-backed retention playbook with a clear recommendation for each team.',
    output: [
      'Senior-leadership-ready presentation pitched to 15+ stakeholders — including 2 SVPs — in a full boardroom setting',
      'AI-assisted MVP prototyped on Replit and Claude Code, demoed live during the final presentation — unsolicited',
      'Retention strategy framework handed off to product and editorial teams for execution'
    ]
  },
  geolink: {
    org: 'Leaf Home · 2024–2026',
    title: 'GeoLink',
    problem: 'Paid media spend lived on platforms — Meta, TikTok, Nextdoor. CRM revenue lived in a separate system. Nobody could connect the dots: which regions were actually generating returns, which weren\'t, and where to shift budget next month.',
    approach: 'Built GeoLink from scratch — a proprietary ZIP/DMA attribution system in Excel that joined platform spend data to CRM revenue outcomes by geography. For the first time, the media team had a single view of regional performance across all three channels.',
    output: [
      'Improved ROAS 37% YoY by enabling geo-level budget reallocation that was previously impossible to justify with data',
      'Ended the guesswork on regional allocation — decisions backed by a clear, repeatable data model',
      'Established a monthly creative performance reporting workflow across Media and Creative teams'
    ]
  },
  cleannkick: {
    org: 'CUNY Baruch · Blackstone Launchpad · 2023',
    title: 'Clean N Kick',
    problem: 'New Yorkers are obsessed with their sneakers — but finding reliable, convenient shoe cleaning in the city is surprisingly hard. No one had built the "Uber for sneaker care," and the market gap was obvious once you looked.',
    approach: 'Designed an on-demand shoe cleaning service targeting NYC. Built the full business model, unit economics, pricing strategy, pitch deck, and MVP concept from scratch — independently, under competition pressure.',
    output: [
      'Won $1,000 first place at CUNY Blackstone Launchpad competition',
      'Selected as CUNY Clash startup pitch finalist — competed against student ventures across all CUNY campuses',
      'Validated concept through customer discovery, competitive analysis, and unit economics modeling'
    ]
  },
  bball: {
    org: 'Jakarta, Indonesia · 2019–2022',
    title: 'BBALLSTORE.ID',
    problem: 'Indonesian basketball players had limited access to quality gear, and no strong local brand was serving them through social commerce channels. The demand was real — the supply wasn\'t.',
    approach: 'Started at 16. No capital, no investors, no playbook. Built a basketball e-commerce brand using influencer partnerships and marketplace optimization across Tokopedia and Shopee. Managed every part of the operation independently.',
    output: [
      'Scaled from zero to Rp96M ($6,500/month) in revenue — starting at age 16, independently',
      'Built and ran all operations end-to-end: sourcing, inventory, fulfillment, and marketing',
      'Ran data-driven marketing campaigns before I knew what to call them'
    ]
  },
  bmcc: {
    org: 'CUNY BMCC · 2024',
    title: 'BMCC Marketing Club',
    problem: 'BMCC students interested in marketing had no dedicated community, no industry exposure, and no real-world space to develop their skills beyond what a classroom could offer.',
    approach: 'Founded the BMCC Marketing Club from scratch — built the structure, organized industry speaker events, created mentorship frameworks, and built a genuine learning environment while finishing my own degree.',
    output: [
      'Built an active student organization from zero — no existing infrastructure, no template',
      'Connected students to marketing professionals through an organized speaker series',
      'Established a lasting community and learning environment at CUNY BMCC'
    ]
  }
};

const expand     = document.getElementById('projExpand');
const closeBtn   = document.getElementById('projClose');
const expandOrg  = document.getElementById('expandOrg');
const expandTitle = document.getElementById('expandTitle');
const expandProb  = document.getElementById('expandProblem');
const expandApp   = document.getElementById('expandApproach');
const expandOut   = document.getElementById('expandOutput');

let activeCard = null;

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.id;
    const data = projects[id];
    if (!data) return;

    if (activeCard === card && expand.classList.contains('open')) {
      closeExpand();
      return;
    }

    document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    activeCard = card;

    expandOrg.textContent   = data.org;
    expandTitle.textContent = data.title;
    expandProb.textContent  = data.problem;
    expandApp.textContent   = data.approach;
    expandOut.innerHTML = data.output.map(o => `<li>${o}</li>`).join('');

    expand.classList.add('open');

    setTimeout(() => {
      expand.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  });
});

function closeExpand() {
  expand.classList.remove('open');
  document.querySelectorAll('.proj-card').forEach(c => c.classList.remove('active'));
  activeCard = null;
}

closeBtn.addEventListener('click', closeExpand);
