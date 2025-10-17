(function(){
  // Year in footer
  const y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if(toggle && links){
    toggle.addEventListener('click', () =>{
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', (!open).toString());
    });
  }

  // Accordion
  document.querySelectorAll('[data-accordion] .accordion__item').forEach(item=>{
    const btn = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__content');
    btn?.addEventListener('click', ()=>{
      const isActive = item.classList.contains('active');
      document.querySelectorAll('[data-accordion] .accordion__item').forEach(i=>i.classList.remove('active'));
      if(!isActive){ item.classList.add('active'); }
      // ensure height recalculation
      if(panel){ panel.style.maxHeight = item.classList.contains('active') ? '200px' : '0px'; }
    });
  });

  // Contact form validation
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  form?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name')||'').trim();
    const email = String(data.get('email')||'').trim();
    const message = String(data.get('message')||'').trim();

    if(!name || !email || !message){
      setNote('Please fill out all fields.');
      return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setNote('Enter a valid email address.');
      return;
    }
    setNote('Thanks! We\'ll be in touch shortly.');
    form.reset();
  });

  function setNote(msg){ if(note){ note.textContent = msg; } }
})();
