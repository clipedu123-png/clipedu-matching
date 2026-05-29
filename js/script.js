// ── responsive build marker (verify cache freshness in console) ──
console.log('[CLIPEDU] responsive build: 2026-05-27-v3 · viewport='+window.innerWidth+'px');

// nav scroll state
const hdr = document.getElementById('hdr');
const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

// Mobile hamburger toggle
(function setupNavToggle(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const backdrop = document.getElementById('navBackdrop');
  if(!toggle || !links || !backdrop) return;
  const close = ()=>{
    toggle.classList.remove('open');
    links.classList.remove('open');
    backdrop.classList.remove('visible');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','메뉴 열기');
  };
  const open = ()=>{
    toggle.classList.add('open');
    links.classList.add('open');
    backdrop.classList.add('visible');
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','메뉴 닫기');
  };
  toggle.addEventListener('click', ()=>{
    toggle.classList.contains('open') ? close() : open();
  });
  const navClose = document.getElementById('navClose');
  if(navClose) navClose.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')) {
      e.preventDefault();
      close();
      const target = document.querySelector(href);
      if(target) {
        setTimeout(()=>{
          target.scrollIntoView({behavior: 'smooth'});
          window.history.pushState(null, null, href);
        }, 150);
      }
    }
  }));
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
  // Auto-close if resized back to desktop
  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', (e)=>{ if(e.matches) close(); });
})();

// ── Scroll Spy (GNB highlight on scroll) ──
(function setupScrollSpy(){
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveLink = () => {
    let currentSection = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if(rect.top <= 150 && rect.bottom > 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, {passive: true});
  updateActiveLink();
})();

// ── Supabase Integration ──
(function setupSupabase(){
  const SUPABASE_URL = 'https://hmngogjpyyuzgioepfbq.supabase.co';
  const SUPABASE_KEY = 'sb_publishable__BBoHpZH8UbeFprLmzPPzA_sIYGGaUU';

  // Supabase 자격증명이 설정되지 않으면 폼 제출만 alert로 처리
  if(!SUPABASE_URL.includes('supabase') || !SUPABASE_KEY) {
    console.warn('⚠️ Supabase 설정이 필요합니다. 폼 제출은 기본 alert로만 작동합니다.');
    const form = document.getElementById('applyForm');
    if(form) {
      form.addEventListener('submit', (e)=>{
        e.preventDefault();
        alert('감사합니다! 24시간 내 연락드리겠습니다.\n\n(현재 Supabase DB 설정 대기 중)');
        form.reset();
      });
    }
    return;
  }

  // Supabase가 window에 로드되었는지 확인
  if(!window.supabase) {
    console.error('Supabase 라이브러리가 로드되지 않았습니다.');
    return;
  }

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const form = document.getElementById('applyForm');
  if(!form) return;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '제출 중...';

    try {
      const formData = new FormData(form);
      const interests = Array.from(formData.getAll('interest'));

      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          academy: formData.get('academy'),
          phone: formData.get('phone'),
          address: formData.get('address'),
          interests: interests,
          message: formData.get('message') || null
        });

      if(error) throw error;

      // 성공 메시지
      submitBtn.textContent = '신청이 완료되었습니다! 🎉';
      submitBtn.style.backgroundColor = 'var(--accent-2)';
      form.reset();

      setTimeout(()=>{
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
      }, 3000);

    } catch(err) {
      console.error('Supabase 제출 에러:', err);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.\n' + err.message);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
})();

// reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  });
},{threshold:0.14});
document.querySelectorAll('.reveal').forEach((el)=>io.observe(el));

// How sticky — progress dots + step in-view highlight
const steps = document.querySelectorAll('.how-step');
const dots = document.querySelectorAll('.how-dot');
const howIo = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(e.isIntersecting){
      const n = parseInt(e.target.dataset.step,10);
      steps.forEach(s=>s.classList.toggle('in-view', parseInt(s.dataset.step,10)===n));
      dots.forEach(d=>d.classList.toggle('active', parseInt(d.dataset.dot,10)===n));
    }
  });
},{rootMargin:'-45% 0px -45% 0px',threshold:0});
steps.forEach(s=>howIo.observe(s));

// Map ↔ list sync
const regions = document.querySelectorAll('.map-region');
const rows = document.querySelectorAll('.region-row');
function highlight(id){
  regions.forEach(r=>r.classList.toggle('active', r.dataset.region===id));
  rows.forEach(r=>r.classList.toggle('active', r.dataset.region===id));
}
function clearHighlight(){
  regions.forEach(r=>r.classList.remove('active'));
  rows.forEach(r=>r.classList.remove('active'));
}
regions.forEach(r=>{
  r.addEventListener('mouseenter', ()=>highlight(r.dataset.region));
  r.addEventListener('mouseleave', clearHighlight);
});
rows.forEach(r=>{
  r.addEventListener('mouseenter', ()=>highlight(r.dataset.region));
  r.addEventListener('mouseleave', clearHighlight);
});

// Sticky CTA — show after hero scrolled past, hide near apply
const sticky = document.getElementById('stickyCta');
const applyEl = document.getElementById('apply');
const heroEl = document.querySelector('.hero');
function syncSticky(){
  if(!sticky || !applyEl || !heroEl) return;
  const past = window.scrollY > heroEl.offsetTop + heroEl.offsetHeight - 100;
  const applyRect = applyEl.getBoundingClientRect();
  const inApply = applyRect.top < window.innerHeight*0.7 && applyRect.bottom > 0;
  sticky.classList.toggle('visible', past && !inApply);
}
window.addEventListener('scroll', syncSticky, {passive:true});
syncSticky();

// Reviews phone — inject real KakaoTalk images + seamless rolling
(function setupReviewPhone(){
  const mock = document.getElementById('phoneMock');
  const track = document.getElementById('phoneTrack');
  if(!mock || !track) return;
  const conversations = [
    {prefix:'KakaoTalk_20260526_104809704', count:29},
    {prefix:'KakaoTalk_20260526_104856837', count:30},
    {prefix:'KakaoTalk_20260526_104858910', count:11}
  ];
  const base = encodeURIComponent('message img').replace(/%2F/g,'/');
  const all = [];
  conversations.forEach((c)=>{
    for(let i=0;i<c.count;i++){
      const suffix = i===0 ? '' : '_'+String(i).padStart(2,'0');
      all.push(`${base}/${c.prefix}${suffix}.png`);
    }
  });
  const SETS = 2;
  let loaded = 0, started = false;
  const total = all.length * SETS;
  const start = ()=>{
    if(started) return;
    started = true;
    measure();
    mock.classList.add('ready');
  };
  for(let s=0;s<SETS;s++){
    all.forEach((src, idx)=>{
      const img = document.createElement('img');
      img.src = src;
      img.alt = s===0 ? '원장님과의 카카오톡 대화' : '';
      if(s>0) img.setAttribute('aria-hidden','true');
      img.decoding = 'async';
      img.loading = (s===0 && idx<6) ? 'eager' : 'lazy';
      const done = ()=>{loaded++; if(loaded>=total) start();};
      img.addEventListener('load', done);
      img.addEventListener('error', done);
      track.appendChild(img);
    });
  }
  setTimeout(start, 8000); // safety
  function measure(){
    const singleSetH = track.scrollHeight / SETS;
    // ~50 px/s — relaxed reading pace
    const duration = Math.min(600, Math.max(180, singleSetH / 50));
    mock.style.setProperty('--scroll-duration', `${duration}s`);
  }
  window.addEventListener('resize', measure);
})();

// Header hide on scroll (mobile only, ≤1024px)
(()=>{
  const hdr = document.getElementById('hdr');
  let prevScrollY = 0;
  let scrollTimeout;

  const updateHeader = ()=>{
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > prevScrollY;

    if(window.innerWidth <= 1024){
      if(isScrollingDown && currentScrollY > 100){
        hdr.classList.add('hide-on-scroll');
      } else {
        hdr.classList.remove('hide-on-scroll');
      }
    } else {
      hdr.classList.remove('hide-on-scroll');
    }

    prevScrollY = currentScrollY;
  };

  window.addEventListener('scroll', ()=>{
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateHeader, 50);
  }, {passive:true});

  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 1024){
      hdr.classList.remove('hide-on-scroll');
    }
  });
})();

// Form submit (placeholder)
const form = document.getElementById('applyForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('신청이 접수됐어요. 24시간 안에 매칭부서가 연락드릴게요.');
  });
}
