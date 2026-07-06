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
    preview: 'ProjectPigeon_EricMarlie.pdf',
    pdf: 'ProjectPigeon_EricMarlie.pdf',
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
    preview: 'https://docs.google.com/presentation/d/1uvB2J5J2wXGzVsE7wP29-a-98h6GPGzH/embed?start=false&loop=false&rm=minimal',
    links: [
      { label: 'View Presentation →', url: 'https://docs.google.com/presentation/d/1uvB2J5J2wXGzVsE7wP29-a-98h6GPGzH/edit?usp=sharing' }
    ],
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
    splitPreview: {
      photo: 'IMG_9068.jpeg',
      iframe: 'https://view.officeapps.live.com/op/embed.aspx?src=https://raw.githubusercontent.com/eriicsalim77/Portofolio/claude/eric-portfolio-updates-VF0hP/CLEAN%20N%20KICK%20FINAL%20DECK.pptx'
    },
    links: [
      { label: 'Download Deck →', url: 'CLEAN N KICK FINAL DECK.pptx' }
    ],
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
    socialCards: [
      { platform: 'Instagram', handle: '@bballstore.id', stat: '9K followers', url: 'https://www.instagram.com/bballstore.id/', color: '#E1306C' },
      { platform: 'Tokopedia', handle: 'bballstore', stat: 'Official store', url: 'https://www.tokopedia.com/bballstore', color: '#42B549' }
    ],
    links: [
      { label: 'Instagram · 9K followers', url: 'https://www.instagram.com/bballstore.id/' },
      { label: 'Shop on Tokopedia', url: 'https://www.tokopedia.com/bballstore' }
    ],
    problem: 'Indonesian basketball players had limited access to quality gear, and no strong local brand was serving them through social commerce channels.',
    approach: 'Started from scratch. Built a brand using influencer partnerships and marketplace optimization across Tokopedia and Shopee. Managed sourcing, inventory, fulfillment, and marketing end to end.',
    output: [
      'Scaled from zero to $6,500 per month in revenue, starting at 16',
      'Built and ran every part of the operation independently',
      'Ran data-driven marketing campaigns before knowing what to call them'
    ]
  },
  creative: {
    org: 'Inside Leaf Home · 2025',
    title: 'Annual Creative Performance Report',
    accent: '#16A34A',
    preview: 'LHWS_2025_CreativeReport_Social.pdf',
    pdf: 'LHWS_2025_CreativeReport_Social.pdf',
    problem: 'With more than 400 unique Meta creatives and $7M in annual media spend for Leaf Home Water Solutions, evaluating creative performance at scale was challenging. Asset naming was inconsistent, performance data was fragmented across Tableau, Excel, and advertising platforms, and there was no standardized framework to identify which creative themes, formats, messaging, and creators consistently drove business results or should guide 2026 creative strategy.',
    approach: 'I authored Leaf Home Water Solutions\' annual creative performance report by querying campaign performance data with SQL, extracting and validating data from Tableau, and building an Excel-based workflow to clean, standardize, and categorize more than 400 creatives across 150+ naming variations. Working closely with the Media, Analytics, and Creative teams, I synthesized performance trends into clear, data-backed recommendations for 2026 creative planning.',
    output: [
      'Authored a cross-functional strategic report evaluating 400+ creatives representing $7M in Meta advertising spend',
      'Established a standardized creative taxonomy for analyzing performance across formats, messaging, concepts, creators, and campaign types',
      'Delivered data-backed recommendations that informed 2026 creative planning across Media, Creative, and Product teams',
      'Consolidated thousands of performance records into an executive-ready report that enabled faster cross-functional decision-making'
    ]
  },
  bmcc: {
    org: 'CUNY BMCC · 2024',
    title: 'BMCC Marketing Club',
    accent: '#0052CC',
    photos: ['IMG_0771.jpeg', 'IMG_9080.jpeg'],
    links: [
      { label: 'Instagram · @mcbmcc', url: 'https://www.instagram.com/mcbmcc/' }
    ],
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
const expandPhotoRow      = document.getElementById('expandPhotoRow');
const expandPDFRow        = document.getElementById('expandPDFRow');
const expandPreview       = document.getElementById('expandPreview');
const expandLinksRow      = document.getElementById('expandLinksRow');
const expandSplitPreview  = document.getElementById('expandSplitPreview');
const expandSocialCards   = document.getElementById('expandSocialCards');

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

    if (data.preview) {
      const isSlides = data.preview.includes('google.com/presentation');
      expandPreview.innerHTML = `<iframe src="${data.preview}" class="${isSlides ? 'preview-slides' : 'preview-pdf'}" allowfullscreen loading="lazy"></iframe>`;
    } else {
      expandPreview.innerHTML = '';
    }

    if (data.splitPreview) {
      expandSplitPreview.innerHTML =
        `<img src="${data.splitPreview.photo}" loading="lazy" onerror="this.style.display='none'">` +
        `<iframe src="${data.splitPreview.iframe}" loading="lazy" allowfullscreen></iframe>`;
    } else {
      expandSplitPreview.innerHTML = '';
    }

    if (data.socialCards) {
      expandSocialCards.innerHTML = data.socialCards.map(c =>
        `<a href="${c.url}" target="_blank" rel="noopener noreferrer" class="social-card" style="--sc-color:${c.color}">
          <div class="sc-platform">${c.platform}</div>
          <div class="sc-handle">${c.handle}</div>
          ${c.stat ? `<div class="sc-stat">${c.stat}</div>` : ''}
          <div class="sc-arrow">View →</div>
        </a>`
      ).join('');
    } else {
      expandSocialCards.innerHTML = '';
    }

    if (data.photos) {
      expandPhotoRow.innerHTML = data.photos.map(src =>
        `<img src="${src}" class="exp-photo" loading="lazy" onerror="this.parentElement.removeChild(this)">`
      ).join('');
    } else if (data.photo && !data.splitPreview) {
      expandPhotoRow.innerHTML = `<img src="${data.photo}" class="exp-photo" loading="lazy" onerror="this.parentElement.removeChild(this)">`;
    } else {
      expandPhotoRow.innerHTML = '';
    }

    expandLinksRow.innerHTML = data.links
      ? data.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn-link">${l.label}</a>`).join('')
      : '';

    expandPDFRow.innerHTML = data.pdf
      ? `<a href="${data.pdf}" target="_blank" rel="noopener noreferrer" class="btn-pdf">View PDF →</a>`
      : '';

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
