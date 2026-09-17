// Chathura Lakmina Portfolio - Interactive Script 2025/2026
document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }

  // 2. Custom Interactive Cursor (Desktop)
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorOutline = document.getElementById('custom-cursor-outline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      if (typeof gsap !== 'undefined') {
        gsap.to(cursorOutline, {
          x: posX,
          y: posY,
          duration: 0.15,
          ease: 'power2.out'
        });
      } else {
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
      }
    });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .skill-card, .project-card, .ai-quick-chip');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorOutline.style.borderColor = 'rgba(6, 182, 212, 0.8)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(168, 85, 247, 0.6)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // 3. Multi-phrase Typewriter Effect
  const typingElement = document.getElementById('typing-text');
  const typewriterPhrases = [
    "Full-Stack Software Engineer",
    "Google Gemini AI & LLM Architect",
    "React 19 & TypeScript Developer",
    "Local-First Desktop & POS Engineer",
    "Flutter Cross-Platform Mobile Specialist"
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function runTypewriter() {
    if (!typingElement) return;
    const currentText = typewriterPhrases[phraseIdx];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typingElement.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 40 : 100;

    if (!isDeleting && charIdx === currentText.length) {
      isDeleting = true;
      speed = 2200; // Pause at full phrase
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
      speed = 400;
    }

    setTimeout(runTypewriter, speed);
  }
  runTypewriter();

  // 4. Dynamic Age Calculation (Birthday: June 7, 2002)
  function computeAge() {
    const bday = new Date('2002-06-07');
    const today = new Date();
    let age = today.getFullYear() - bday.getFullYear();
    const monthDiff = today.getMonth() - bday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    const ageEl = document.getElementById('my-age');
    if (ageEl) ageEl.textContent = age;
  }
  computeAge();

  // 5. Rotating Footer Phrase
  const footerPhraseEl = document.getElementById('footer-rotating-phrase');
  const footerPhrases = [
    "Building high-impact solutions with passion & clean code",
    "Local-First Speed · Multimodal Intelligence · Sleek UX",
    "Let's create something extraordinary together",
    "Innovating with AI, React 19, Flutter & Java"
  ];
  let footerPhraseIdx = 0;

  setInterval(() => {
    if (!footerPhraseEl) return;
    footerPhraseEl.style.opacity = '0';
    setTimeout(() => {
      footerPhraseIdx = (footerPhraseIdx + 1) % footerPhrases.length;
      footerPhraseEl.textContent = footerPhrases[footerPhraseIdx];
      footerPhraseEl.style.opacity = '1';
    }, 400);
  }, 4500);

  // 6. Project Category Filtering
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'text-white');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active', 'text-white');
      btn.classList.remove('text-slate-400');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Copy-to-Clipboard Functionality
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  function showToast(msg) {
    if (!toastNotification) return;
    if (toastMessage) toastMessage.textContent = msg;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3000);
  }

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = 'chathuhiru45@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy email.');
      });
    });
  });

  // 8. Mobile Navigation Drawer
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  let isMobileNavOpen = false;

  function toggleMobileNav() {
    isMobileNavOpen = !isMobileNavOpen;
    if (isMobileNavOpen) {
      mobileNavDrawer.classList.remove('opacity-0', 'pointer-events-none');
      mobileNavDrawer.classList.add('opacity-100', 'pointer-events-auto');
      if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
      }
      document.body.style.overflow = 'hidden';
    } else {
      mobileNavDrawer.classList.add('opacity-0', 'pointer-events-none');
      mobileNavDrawer.classList.remove('opacity-100', 'pointer-events-auto');
      if (hamburgerIcon) {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
      }
      document.body.style.overflow = 'auto';
    }
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', toggleMobileNav);
  }
  mobileNavItems.forEach(item => item.addEventListener('click', () => {
    if (isMobileNavOpen) toggleMobileNav();
  }));

  // 9. Floating Chathura.AI Assistant Logic
  const aiChatToggle = document.getElementById('ai-chat-toggle');
  const heroAiBtn = document.getElementById('hero-ai-btn');
  const openAiChatBtn = document.getElementById('open-ai-chat-btn');
  const aiChatWindow = document.getElementById('ai-chat-window');
  const aiChatClose = document.getElementById('ai-chat-close');
  const aiUserInput = document.getElementById('ai-user-input');
  const aiSendBtn = document.getElementById('ai-send-btn');
  const aiChatMessages = document.getElementById('ai-chat-messages');
  const quickChips = document.querySelectorAll('.ai-quick-chip');

  function openAiChat() {
    if (aiChatWindow) {
      aiChatWindow.classList.add('active');
      if (aiUserInput) aiUserInput.focus();
    }
  }

  function closeAiChat() {
    if (aiChatWindow) aiChatWindow.classList.remove('active');
  }

  if (aiChatToggle) aiChatToggle.addEventListener('click', () => {
    if (aiChatWindow && aiChatWindow.classList.contains('active')) {
      closeAiChat();
    } else {
      openAiChat();
    }
  });

  if (heroAiBtn) heroAiBtn.addEventListener('click', openAiChat);
  if (openAiChatBtn) openAiChatBtn.addEventListener('click', openAiChat);
  if (aiChatClose) aiChatClose.addEventListener('click', closeAiChat);

  // AI Knowledge Engine
  function generateAiResponse(inputQuery) {
    const q = inputQuery.toLowerCase().trim();

    if (q.includes('finflow') || q.includes('microfinance') || q.includes('credit')) {
      return `🏦 <strong>FinFlow Pro</strong> is Chathura's flagship local-first Micro-Finance Management ERP and AI Credit Risk Operating System. Engineered with <strong>React 19, TypeScript, Dexie.js (IndexedDB), and Google Gemini AI</strong>, it features 4-factor multi-weighted AI credit scoring, a bilingual Gemini AI financial copilot, 6-month predictive cashflow modeling, automated email dispatch, and Windows .NET desktop packaging with SHA-256 data integrity. <br><br><a href="https://github.com/Chathura0607/FinFlow-Pro" target="_blank" class="text-cyan-400 underline">View GitHub Repository &rarr;</a>`;
    }

    if (q.includes('zenexis') || q.includes('pos') || q.includes('retail') || q.includes('printer')) {
      return `⚡ <strong>Zenexis POS</strong> is an ultra-responsive offline-first Desktop POS designed for retail communication hubs, printing centers, and repair shops in Sri Lanka. Built with <strong>Electron 34, React 19, TypeScript, and ESC/POS thermal printer engine</strong>, it supports 80mm/58mm printing with CODE128 barcodes, 7-stage repair tracking with 1-click WhatsApp customer notices, telco reloads, and P&L financial analytics. <br><br><a href="https://github.com/Chathura0607/Zenexis_POS" target="_blank" class="text-cyan-400 underline">View GitHub Repository &rarr;</a>`;
    }

    if (q.includes('museum') || q.includes('flutter') || q.includes('mobile') || q.includes('ar') || q.includes('3d')) {
      return `🏛️ <strong>Museum AI Companion</strong> is an interactive <strong>Flutter (Dart)</strong> mobile app powered by <strong>Google Gemini Generative AI</strong>. It offers real-time artifact identification, 3D model exhibit exploration with AR, Text-to-Speech (TTS) audio guides, and full bilingual Sinhala & English localization. <br><br><a href="https://github.com/Chathura0607/Museum_App" target="_blank" class="text-cyan-400 underline">View GitHub Repository &rarr;</a>`;
    }

    if (q.includes('gss') || q.includes('name generator') || q.includes('fmcg') || q.includes('vision') || q.includes('oda')) {
      return `🚀 <strong>GSS ODA AI Product Name Standardizer</strong> is a multimodal AI vision tool built with <strong>Gemini 2.0 Flash</strong> for Operational Data Analysts. It ingests packaging images, PDFs, and ZIP files to enforce the official 9-part formula and 49 container types dictionary, backed by a 7-day browser vault and Excel exports. <br><br><a href="https://github.com/Chathura0607/GSS-ODA-AI-Name-Generator" target="_blank" class="text-cyan-400 underline">View GitHub Repository &rarr;</a>`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('available')) {
      return `📬 You can connect with Chathura directly via:<br>
      • <strong>Email:</strong> <a href="mailto:chathuhiru45@gmail.com" class="text-cyan-400">chathuhiru45@gmail.com</a><br>
      • <strong>WhatsApp:</strong> <a href="https://wa.me/94770464448" target="_blank" class="text-emerald-400">+94 77 046 4448</a><br>
      • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/chathura-lakmina-72368b322/" target="_blank" class="text-purple-400">Chathura Lakmina</a><br>
      He is currently <strong>available for hire & freelance collaborations!</strong>`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('tech')) {
      return `💻 <strong>Chathura's Core Tech Stack:</strong><br>
      • <strong>Languages:</strong> TypeScript, JavaScript, Java, Python, Dart, C#<br>
      • <strong>Frontend:</strong> React 19, Next.js, Tailwind CSS, Vite<br>
      • <strong>Mobile & Desktop:</strong> Flutter, Electron.js, JavaFX<br>
      • <strong>AI & Vision:</strong> Google Gemini 2.0 Flash, Multimodal LLM prompts<br>
      • <strong>Databases:</strong> Dexie.js (IndexedDB), MySQL, Firebase Firestore`;
    }

    if (q.includes('who') || q.includes('about') || q.includes('chathura') || q.includes('experience')) {
      return `👨‍💻 <strong>Chathura Lakmina</strong> is a 22-year-old Full-Stack Software Engineer & AI Solutions Specialist from Sri Lanka with a Diploma in Software Engineering from IJSE. He specializes in enterprise architectures, local-first zero-server software, and AI-driven platforms.`;
    }

    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('machn') || q.includes('machan') || q.includes('ayubowan')) {
      return `👋 Hi there! Machan, I'm Chathura's AI assistant. How can I help you? You can ask about his projects (FinFlow Pro, Zenexis POS, Museum App), tech skills, or contact info!`;
    }

    return `🤖 Thanks for your query! Chathura is a Full-Stack & AI developer specializing in React 19, TypeScript, Flutter, Java, and Google Gemini AI. You can explore his featured projects above or contact him at <a href="mailto:chathuhiru45@gmail.com" class="text-cyan-400">chathuhiru45@gmail.com</a>.`;
  }

  function appendChatMessage(sender, text) {
    if (!aiChatMessages) return;
    const msgDiv = document.createElement('div');
    if (sender === 'user') {
      msgDiv.className = 'bg-purple-600/30 p-3 rounded-2xl rounded-tr-none border border-purple-500/30 text-white text-xs leading-relaxed ml-auto max-w-[85%]';
      msgDiv.textContent = text;
    } else {
      msgDiv.className = 'bg-white/5 p-3.5 rounded-2xl rounded-tl-none border border-white/10 text-slate-200 text-xs leading-relaxed max-w-[90%]';
      msgDiv.innerHTML = text;
    }
    aiChatMessages.appendChild(msgDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }

  function handleAiSend(queryText) {
    const text = queryText || (aiUserInput ? aiUserInput.value.trim() : '');
    if (!text) return;

    appendChatMessage('user', text);
    if (aiUserInput) aiUserInput.value = '';

    // Typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'bg-white/5 p-2.5 rounded-xl text-slate-400 text-xs inline-flex items-center gap-1.5 border border-white/5';
    typingIndicator.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"></span><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>';
    aiChatMessages.appendChild(typingIndicator);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const response = generateAiResponse(text);
      appendChatMessage('bot', response);
    }, 600);
  }

  if (aiSendBtn) {
    aiSendBtn.addEventListener('click', () => handleAiSend());
  }

  if (aiUserInput) {
    aiUserInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAiSend();
    });
  }

  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) handleAiSend(prompt);
    });
  });

  // 10. AI Simulator Auto Stream in AI Hub
  const simChatStream = document.getElementById('simulation-chat-stream');
  const simScenarios = [
    [
      { role: 'user', text: 'Run credit risk underwriting on customer NIC: 982341120V with $5,000 collateral.' },
      { role: 'ai', text: '🤖 [FinFlow AI Engine] Computing 4-Factor Weighted Index: DTI Score: 88/100, Collateral Margin: 142%, Risk Tier: LOW. Suggested Approval: $4,200 @ 14% p.a.' }
    ],
    [
      { role: 'user', text: 'Analyze museum exhibit artifact QR code #ART-409 via Gemini Vision.' },
      { role: 'ai', text: '🏛️ [Museum AI Companion] Identified: 12th Century Polonnaruwa Bronze Buddha Statue. Rendering 3D AR Model & triggering Sinhala audio guide.' }
    ],
    [
      { role: 'user', text: 'Generate ESC/POS dual token for repair ticket #ZX-MOB-1042.' },
      { role: 'ai', text: '⚡ [Zenexis POS] ESC/POS Thermal stream generated with CODE128 barcode. WhatsApp pickup notice staged for +9477...!' }
    ]
  ];

  let simIndex = 0;
  function runAiSimulator() {
    if (!simChatStream) return;
    simChatStream.innerHTML = '';
    const currentScenario = simScenarios[simIndex];

    currentScenario.forEach((item, idx) => {
      setTimeout(() => {
        const bubble = document.createElement('div');
        if (item.role === 'user') {
          bubble.className = 'bg-cyan-500/15 border border-cyan-500/30 p-3 rounded-2xl rounded-tr-none text-xs text-cyan-200 ml-auto max-w-[85%] font-mono transition-all duration-300';
          bubble.innerHTML = `<strong>User:</strong> ${item.text}`;
        } else {
          bubble.className = 'bg-purple-500/15 border border-purple-500/30 p-3.5 rounded-2xl rounded-tl-none text-xs text-purple-200 max-w-[90%] font-mono transition-all duration-300';
          bubble.innerHTML = `${item.text}`;
        }
        simChatStream.appendChild(bubble);
      }, idx * 1400);
    });

    simIndex = (simIndex + 1) % simScenarios.length;
  }

  runAiSimulator();
  setInterval(runAiSimulator, 7500);

  // 11. Contact Form Submission Handling & Confetti
  const contactForm = document.getElementById('main-contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formSubmitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const originalContent = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Sending Message...';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formSubmitBtn.innerHTML = '<i class="fa fa-check mr-2"></i> Message Sent Successfully!';
          formSubmitBtn.classList.remove('from-purple-600', 'to-indigo-600');
          formSubmitBtn.classList.add('bg-emerald-600');

          // Trigger Confetti Celebration
          if (typeof confetti === 'function') {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          }

          showToast('Thank you! Your message has been sent to Chathura.');
          contactForm.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        formSubmitBtn.innerHTML = '<i class="fa fa-exclamation-triangle mr-2"></i> Submission Error';
        formSubmitBtn.classList.remove('from-purple-600', 'to-indigo-600');
        formSubmitBtn.classList.add('bg-red-600');
        showToast('Submission error. Please email directly to chathuhiru45@gmail.com');
      } finally {
        setTimeout(() => {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = originalContent;
          formSubmitBtn.classList.remove('bg-emerald-600', 'bg-red-600');
          formSubmitBtn.classList.add('from-purple-600', 'to-indigo-600');
        }, 5000);
      }
    });
  }

});
