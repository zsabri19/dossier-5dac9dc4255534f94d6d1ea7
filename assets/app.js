/* ============================================================
   THE DOSSIER — interaction layer
   EOI-10-1/092025/1/009 · GWALPHA × NASTP
   ============================================================ */
(() => {
  'use strict';

  /* ---------- data ---------- */
  const STAGES = [
    {
      no: '00', name: 'Intake', tag: 'Where do you fit?',
      purpose: 'Source ventures and establish eligibility before any programme capacity is committed.',
      actions: 'Application against the five technology areas and NASTP entry rules. Vertical + working-cluster tagging. Founder consent, conflict check and initial problem statement.',
      evidence: 'Eligibility decision · fit record · initial evidence checklist · proceed / defer / decline rationale',
      owner: 'Operator prepares the record. GWALPHA retains park admission authority.'
    },
    {
      no: '01', name: 'Assess', tag: 'Who needs this?',
      purpose: 'Build a written picture of the founder, team and venture — not a committee impression.',
      actions: 'Supsindex FPA at intake; GEB and EEA inputs where relevant; human review of team, venture evidence and institutional fit. Assessment informs decisions; it never decides alone.',
      evidence: 'Founder / team profile · consent record · interpretation note · prioritised capability gaps',
      owner: 'Supsindex assessment layer + programme board review.'
    },
    {
      no: '02', name: 'Stabilize', tag: 'What would have to be true?',
      purpose: 'Put governance, ownership and decision discipline in place before growth work begins.',
      actions: 'ClarityOS six-question session. Ownership and role clarity. 30-day stabilization plan with owners and dates. Founder leadership work with the academic anchor.',
      evidence: 'Action plan · governance / conflict actions · baseline for review',
      owner: 'ClarityOS lead with the academia & leadership anchor.'
    },
    {
      no: '03', name: 'Build', tag: 'What is the advantage?',
      purpose: 'Convert the stabilized venture into product, commercial hypothesis and team capability.',
      actions: 'Technical and product sprints. Customer discovery. Mentor clinics matched to cluster need. IP and compliance triage. Commercial planning.',
      evidence: 'Milestone record · product / technical evidence · customer hypothesis and next experiment',
      owner: 'Operator coordinates; named partners contribute within agreed availability.'
    },
    {
      no: '04', name: 'Validate', tag: 'Which ecosystem?',
      purpose: 'Test the venture against real customers, real tests and real institutional requirements.',
      actions: 'Customer, technical and pilot validation. Cybersecurity and dual-use review where applicable. Industry problem framing and commercial feedback.',
      evidence: 'Test / customer evidence · pilot brief or reasoned stop · updated risk and assumption log',
      owner: 'Industry and corridor partners may facilitate reviews and introductions. No outcome is promised.'
    },
    {
      no: '05', name: 'Ready', tag: 'What is the pathway? What next?',
      purpose: 'Prepare one documented, appropriate route onward — not a generic demo day.',
      actions: 'Pathway selection: workshare, suitable tenancy, sponsored challenge, investor review, GCC exploration or graduation. Readiness pack assembled and handed over with a named follow-up owner.',
      evidence: 'Readiness pack · decision record · warm handover and follow-up owner',
      owner: 'Programme board recommends. GWALPHA decides park-related pathways.'
    }
  ];

  const TRINITY = {
    supsindex: {
      id: 'supsindex', name: 'Supsindex', sub: 'Istanbul, Türkiye',
      role: 'International assessment & methodology · 15 marks',
      entity: 'Yanus Solutions Limited Liability Company',
      contact: 'Seyed Abdolhassan Johari, Founder & CEO',
      bullets: [
        'FPA (Founder Personality Assessment) at intake and screening.',
        'GEB and EEA inputs for team dynamics and capability gaps at stabilization.',
        'Dynamic diagnostic tracking at quarterly milestone gates.',
        'Diagnostic risk-profile certification pack for investment readiness.',
        'Standard enterprise administration seat at zero software licence cost.',
        'Access to international faculty for cross-border masterclasses and clinics.'
      ],
      boundary: 'Assessment informs, it does not decide admission, investment or graduation. Ambassador commissions are disclosed separately from the operator fee. IP in the assessment engine remains with Supsindex.',
      status: 'Sent · signed return pending.',
      cls: 'pill--ok'
    },
    ikl: {
      id: 'ikl', name: 'IKL', sub: 'Lahore, Pakistan',
      role: 'Academia & executive leadership anchor · 15 marks',
      entity: 'Institute of Knowledge and Leadership',
      contact: 'Syed Nasser, General Manager',
      bullets: [
        'Founder leadership and governance modules: decision discipline, role clarity, team management, conflict handling.',
        'Executive training and meeting facilities in Lahore for cohort sessions, subject to availability.',
        'Leadership practitioner / fellow bench for 1-on-1 founder clinics.',
        'Permissioned talent and alumni introductions for ventures ready to recruit.',
        'Joint executive-readiness certification, wording subject to separate approval.'
      ],
      boundary: 'Facility, faculty and certification commitments are subject to availability and a definitive agreement. No accreditation or degree-awarding status is asserted.',
      status: 'Selected academia anchor. LOI sent; signed return pending.',
      cls: 'pill--ok'
    },
    medad: {
      id: 'medad', name: 'Medad', sub: 'Muscat, Oman',
      role: 'Industry commercialization & investment review · 15 marks',
      entity: 'Medad Innovation & Future Technologies',
      contact: 'Authorized signatory — name to be inserted from the executed copy',
      bullets: [
        'Structured commercial feedback on customer, market and route-to-market questions.',
        'Periodic investor-readiness and commercialization clinics.',
        'Initial review of qualified programme referrals against agreed readiness criteria.',
        'Possible market, corporate or investment introductions where appropriate.',
        'No fee charged solely for an initial review of a programme referral.'
      ],
      boundary: 'No investment, pilot, purchase or offtake is promised. Any engagement is subject to Medad’s independent due diligence. "First look" is not exclusivity.',
      status: 'LOI sent; signed return pending.',
      cls: 'pill--warn'
    },
    techo: {
      id: 'techo', name: 'Tech Oman', sub: 'Muscat, Oman',
      role: 'GCC corridor & industry problem framing · value-add',
      entity: 'Tech Oman Platform',
      contact: 'Named coordinator to be inserted from the executed copy',
      bullets: [
        'Identify enterprise and ecosystem problem statements across the five technology areas.',
        'Market exploration and route-to-market context for readiness-qualified ventures.',
        'Virtual and hybrid mentor / ecosystem sessions with GCC contributors.',
        'Pilot pathway exploration where mutual fit exists.',
        'Kept deliberately distinct from Medad’s industry and commercial-review role.'
      ],
      boundary: 'No GCC market access, registration, pilot, joint venture or procurement is guaranteed. Corridor activity is credited once — never double-counted with the industry lane.',
      status: 'LOI sent; signed return pending.',
      cls: 'pill--warn'
    }
  };

  const COSTS = [
    { label: 'Centre / programme manager', sub: 'Daily operations and delivery ownership', v: 350000 },
    { label: 'Programme lead / author', sub: 'Fractional architecture, stage gates, executive interface', v: 250000 },
    { label: 'Coordinator / CRM administration', sub: 'Intake, scheduling, minutes, dashboard', v: 150000 },
    { label: 'Shared mentor pool', sub: 'Technical and founder clinics across five verticals', v: 300000 },
    { label: 'Partner / academia coordination', sub: 'Partner cadence and evidence tracking', v: 100000 },
    { label: 'Programme delivery, materials, tools', sub: 'Sessions, worksheets, approved tooling', v: 100000 },
    { label: 'Legal / compliance / IP clinic', sub: 'Reserved allowance, as-needed capacity', v: 50000 },
    { label: 'Domestic travel / corridor light', sub: 'Park and local partner coordination', v: 50000 }
  ];

  const DOCS = [
    { cat: 'exec', kind: 'Executive', title: 'Bid narrative', desc: 'The core value proposition, scope and what success looks like for GWALPHA and NASTP.', href: 'docs/01_Executive/Bid_Narrative.html', meta: 'Part I · narrative' },
    { cat: 'exec', kind: 'Executive', title: '25 Sep presentation spine', desc: 'Eight-slide speaking order for the opening presentation window.', href: 'docs/01_Executive/25Sep_Presentation_Spine.html', meta: 'Presentation aid' },
    { cat: 'tech', kind: 'Technical', title: 'Programme design', desc: 'Six-stage venture journey, clarity questions, vertical × cluster map and safeguards.', href: 'docs/02_Technical/Programme_Design.html', meta: 'Part II · 5 marks' },
    { cat: 'tech', kind: 'Technical', title: 'Founder development', desc: 'Leadership, judgement and execution readiness embedded in venture progress.', href: 'docs/02_Technical/Founder_Development.html', meta: 'Part II · scope (c)' },
    { cat: 'tech', kind: 'Technical', title: 'Operating model', desc: 'Governance, decision rights, cadence, controls, mobilisation and transition.', href: 'docs/02_Technical/Operating_Model.html', meta: 'Part I · 10 marks' },
    { cat: 'tech', kind: 'Technical', title: 'Community & ecosystem profile', desc: 'Documented May 2026 ecosystem work, kept distinct from a graduated portfolio claim.', href: 'docs/02_Technical/Community_and_Ecosystem_Profile.html', meta: 'Part I · 10 marks' },
    { cat: 'tech', kind: 'Personnel', title: 'Lead architect capability annex', desc: 'Zeeshan Sabri’s programme-fit experience, kept distinct from WiseDezine company history.', href: 'docs/02_Technical/Lead_Architect_Capability_Annex.html', meta: 'Key personnel' },
    { cat: 'tech', kind: 'Personnel', title: 'Delivery team structure', desc: 'Prospective role-based team mapped line-for-line to the working cost stack.', href: 'docs/02_Technical/Delivery_Team_Structure.html', meta: 'Operations' },
    { cat: 'tech', kind: 'Technical', title: 'Site & layout schedule', desc: 'One campus: Delta 1–6 plus AI-expansion buildings 7–9, mapped to the seven clusters.', href: 'docs/02_Technical/Site_and_Layout_Schedule.html', meta: 'Page 24 schedule' },
    { cat: 'tech', kind: 'Technical', title: 'Engagement parameters', desc: 'Term, mobilisation, division of responsibility, financial framework and handover.', href: 'docs/02_Technical/Engagement_Parameters.html', meta: 'Part II · 3 marks' },
    { cat: 'tech', kind: 'Technical', title: 'Value added — Clarity-to-Pathway', desc: 'Quarterly aggregated park learning loop, privacy-protective by design.', href: 'docs/02_Technical/Value_Added.html', meta: 'Part II · 2 marks' },
    { cat: 'loi', kind: 'LOI · International', title: 'Supsindex', desc: 'Yanus Solutions LLC. FPA / GEB / EEA, gate tracking and diagnostic certification.', href: 'docs/03_Partners/Final_LOIs/LOI_01_Supsindex_NASTP_WiseDezine.html', meta: 'Sent · return pending' },
    { cat: 'loi', kind: 'LOI · Academia', title: 'IKL', desc: 'Institute of Knowledge & Leadership. Founder leadership, governance and facilities.', href: 'docs/03_Partners/Final_LOIs/LOI_02_IKL_NASTP_WiseDezine.html', meta: 'Sent · return pending' },
    { cat: 'loi', kind: 'LOI · Industry', title: 'Medad Innovation & Future Technologies', desc: 'Commercial validation, investor-readiness clinics and qualified venture review.', href: 'docs/03_Partners/Final_LOIs/LOI_03_Medad_NASTP_WiseDezine.html', meta: 'Sent · return pending' },
    { cat: 'loi', kind: 'LOI · Corridor', title: 'Tech Oman Platform', desc: 'GCC problem framing, market exploration and pilot pathway exploration.', href: 'docs/03_Partners/Final_LOIs/LOI_04_Tech_Oman_NASTP_WiseDezine.html', meta: 'Sent · return pending' },
    { cat: 'loi', kind: 'LOI · Academia', title: 'IoBM', desc: 'Institute of Business Management. Faculty mentoring, SSKIC sourcing and research commercialization.', href: 'docs/03_Partners/Final_LOIs/LOI_05_IoBM_NASTP_WiseDezine.html', meta: 'Sent · return pending' },
    { cat: 'part', kind: 'Partner review', title: 'Forensics & ClarityOS lens', desc: 'Evidence boundaries, contribution mapping and the six-question application.', href: 'docs/03_Partners/Partner_Forensics_and_ClarityOS_Lens.html', meta: 'Internal' },
    { cat: 'comm', kind: 'Commercial', title: 'Cost-to-serve & pricing schedule', desc: 'Eight cost lines, overhead, visible margin and the 24-month term arithmetic.', href: 'docs/04_Commercial/Commercial_Schedule.html', meta: 'Separate envelope' },
    { cat: 'evid', kind: 'Evidence', title: 'Evidence index', desc: 'The claim-to-document matrix required by the EOI, with status per row.', href: 'docs/05_Evidence_and_Forms/Evidence_Index.html', meta: 'Outer package' },
    { cat: 'evid', kind: 'Evidence', title: 'Applicant profile form', desc: 'WiseDezine legal particulars, separated from programme capability.', href: 'docs/05_Evidence_and_Forms/Applicant_Profile.html', meta: 'Part I · 15 marks' },
    { cat: 'evid', kind: 'Evidence', title: 'Cover letter', desc: 'Submission cover letter to the procurement directorate, with signatory fields.', href: 'docs/05_Evidence_and_Forms/Cover_Letter.html', meta: 'Outer package' },
    { cat: 'evid', kind: 'Evidence', title: 'Declarations', desc: 'Non-blacklisting, correctness and related-party / Supsindex commission disclosure.', href: 'docs/05_Evidence_and_Forms/Declarations.html', meta: 'Unsigned form' },
    { cat: 'evid', kind: 'Evidence', title: 'WiseDezine information request', desc: 'The exact company records required to close the applicant fields.', href: 'docs/05_Evidence_and_Forms/WiseDezine_Information_Request.md', meta: 'Input request' },
    { cat: 'seal', kind: 'Seal', title: 'Final status matrix', desc: 'One-page completion view across applicant, partners, technical and commercial.', href: 'docs/06_Review_and_Seal/Final_Status_Matrix.html', meta: 'Status' },
    { cat: 'seal', kind: 'Seal', title: 'Assembly checklist', desc: 'Ordered release checks before the package is sealed and exported.', href: 'docs/06_Review_and_Seal/Final_Assembly_Checklist.md', meta: 'Checklist' },
    { cat: 'seal', kind: 'Seal', title: 'Submission binder map', desc: 'How the working documents assemble into the outer, technical and financial envelopes.', href: 'docs/06_Review_and_Seal/Submission_Binder_Map.md', meta: 'Assembly' },
    { cat: 'seal', kind: 'Seal', title: 'Source reconciliation', desc: 'Editorial decisions, claim boundaries and the sources behind them.', href: 'docs/06_Review_and_Seal/Source_Reconciliation.md', meta: 'Internal' }
  ];

  const CHECKS = [
    { id: 'c1', t: 'WiseDezine legal identity', d: 'Exact registered name, SECP incorporation record, directors / shareholders and registered address.' },
    { id: 'c2', t: 'Authorized signatory', d: 'Signatory name, designation and written authority to bind the applicant.' },
    { id: 'c3', t: 'Tax and GST position', d: 'NTN, current taxpayer status, STRN / GST registration and the applicable fee treatment.' },
    { id: 'c4', t: 'Financial statements', d: 'Three completed years, or every available year since incorporation if the company is younger.' },
    { id: 'c5', t: 'Supsindex LOI return', d: 'Signed partner-reviewed version, with the legal entity name and address as provided.' },
    { id: 'c6', t: 'IKL LOI return', d: 'Signed copy with named institutional focal point.' },
    { id: 'c7', t: 'Medad LOI return', d: 'Signed copy with the authorized signatory’s full name and title inserted.' },
    { id: 'c8', t: 'Tech Oman LOI return', d: 'Signed copy with the named coordinator and signatory inserted.' },
    { id: 'c9', t: 'IoBM LOI return', d: 'The additional letter has been sent to Prof. Dr. Muhammad Abbas; file the signed original.' },
    { id: 'c10', t: 'Supsindex commission disclosure', d: 'Current founder price, commission rate, recipient and trigger, with consent / alternative pathway.' },
    { id: 'c11', t: 'CVs and availability', d: 'Zeeshan Sabri source CV plus availability; named staff only once confirmed.' },
    { id: 'c12', t: 'Site plan confirmation', d: 'GWALPHA-confirmed room allocation, floor area, utilities, access and cluster mapping.' },
    { id: 'c13', t: 'Commercial finalisation', d: 'Approved fee, 24-month value, invoice terms, tax / GST and CAPEX allocation.' },
    { id: 'c14', t: 'Declarations signed', d: 'Non-blacklisting, correctness, conflict disclosure and the tender confidentiality form.' }
  ];

  const nf = new Intl.NumberFormat('en-US');

  /* ---------- reveal ---------- */
  const reveal = () => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
  };

  /* ---------- rail + progress ---------- */
  const nav = () => {
    const items = [...document.querySelectorAll('.rail__item')];
    const secs = items.map(i => document.getElementById(i.dataset.target)).filter(Boolean);
    const prog = document.querySelector('.progress');
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      if (prog) prog.style.width = (p * 100) + '%';
      let cur = secs[0];
      const y = h.scrollTop + window.innerHeight * 0.32;
      secs.forEach(s => { if (s.offsetTop <= y) cur = s; });
      items.forEach(i => i.classList.toggle('is-active', i.dataset.target === (cur && cur.id)));
    };
    items.forEach(i => i.addEventListener('click', () => {
      const el = document.getElementById(i.dataset.target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* ---------- ClarityOS stage flow ---------- */
  const flow = () => {
    const wrap = document.querySelector('.flow');
    const panel = document.querySelector('.stage-panel');
    if (!wrap || !panel) return;
    STAGES.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'stage' + (i === 0 ? ' is-active' : '');
      b.type = 'button';
      b.innerHTML = `<span class="stage__no">${s.no}</span><div class="stage__name">${s.name}</div><div class="stage__tag">${s.tag}</div>`;
      b.addEventListener('click', () => show(i));
      wrap.appendChild(b);
    });
    const show = (i) => {
      [...wrap.children].forEach((c, j) => c.classList.toggle('is-active', i === j));
      const s = STAGES[i];
      panel.innerHTML =
        `<h3>${s.no} · ${s.name}</h3><p class="lede" style="color:rgba(244,240,230,.82);max-width:62ch">${s.purpose}</p>
         <dl class="stage-panel__grid">
           <div><dt>What happens</dt><dd>${s.actions}</dd></div>
           <div><dt>Gate evidence / decision</dt><dd>${s.evidence}</dd></div>
           <div><dt>Who holds it</dt><dd>${s.owner}</dd></div>
           <div><dt>Clarity question</dt><dd>${s.tag}</dd></div>
         </dl>`;
      panel.classList.add('is-open');
    };
    show(0);
  };

  /* ---------- trinity triangle ---------- */
  const trinity = () => {
    const svgHost = document.getElementById('tri-svg');
    const detail = document.getElementById('tri-detail');
    const bar = document.querySelector('.score-bar');
    if (!svgHost || !detail) return;

    const nodes = [
      { id: 'supsindex', x: 130, y: 34,  label: 'INTERNATIONAL' },
      { id: 'ikl',       x: 34,  y: 214, label: 'ACADEMIA' },
      { id: 'medad',     x: 226, y: 214, label: 'INDUSTRY' }
    ];
    const link = (a, b) => `<line class="tri-line" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`;

    svgHost.innerHTML =
      `<svg viewBox="0 0 260 260" class="tri-svg" role="img" aria-label="The forty-five mark partner trinity">
         ${link(nodes[0], nodes[1])}${link(nodes[1], nodes[2])}${link(nodes[2], nodes[0])}
         <circle class="tri-core" cx="130" cy="154" r="34"/>
         <text class="tri-core-label" x="130" y="150">45 MARK</text>
         <text class="tri-core-label" x="130" y="163">TRINITY</text>
         ${nodes.map(n => `<g class="tri-node" data-id="${n.id}" tabindex="0" role="button" aria-label="${n.label}">
            <circle cx="${n.x}" cy="${n.y}" r="27"/>
            <text x="${n.x}" y="${n.y + 3}" text-anchor="middle">${n.label}</text>
          </g>`).join('')}
       </svg>`;

    const show = (id) => {
      const d = TRINITY[id];
      [...svgHost.querySelectorAll('.tri-node')].forEach(n => n.classList.toggle('is-active', n.dataset.id === id));
      detail.innerHTML =
        `<h3>${d.name} <span style="font-family:var(--sans);font-size:.8rem;color:rgba(244,240,230,.45);font-weight:400">— ${d.sub}</span></h3>
         <div class="tri-detail__role">${d.role}</div>
         <p class="small" style="color:rgba(244,240,230,.62);margin-bottom:14px">${d.entity} · ${d.contact}</p>
         <ul>${d.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
         <p class="small" style="color:rgba(244,240,230,.55);border-top:1px solid rgba(255,255,255,.12);padding-top:12px"><strong style="color:var(--gold-2)">Boundary —</strong> ${d.boundary}</p>
         <p style="margin-top:14px"><span class="pill ${d.cls}">${d.status}</span></p>`;
    };
    svgHost.querySelectorAll('.tri-node').forEach(n => {
      n.addEventListener('click', () => show(n.dataset.id));
      n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(n.dataset.id); } });
      n.addEventListener('mouseenter', () => show(n.dataset.id));
    });
    show('supsindex');

    // secondary lane: Tech Oman sits outside the triangle as the value-add corridor
    const extra = document.getElementById('trinity-extra');
    if (extra) {
      const d = TRINITY.techo;
      extra.innerHTML =
        `<h3>${d.name} <span style="font-family:var(--sans);font-size:.8rem;color:rgba(244,240,230,.45);font-weight:400">— ${d.sub}</span></h3>
         <div class="tri-detail__role">${d.role}</div>
         <p class="small" style="color:rgba(244,240,230,.62);margin-bottom:14px">${d.entity} · ${d.contact}</p>
         <ul>${d.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
         <p class="small" style="color:rgba(244,240,230,.55);border-top:1px solid rgba(255,255,255,.12);padding-top:12px"><strong style="color:var(--gold-2)">Boundary —</strong> ${d.boundary}</p>
         <p style="margin-top:14px"><span class="pill ${d.cls}">${d.status}</span></p>`;
    }

    if (bar) {
      const io = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) { bar.classList.add('is-on'); io.disconnect(); }
      }, { threshold: .5 });
      io.observe(bar);
    }
  };

  /* ---------- cost stack ---------- */
  const costStack = () => {
    const host = document.getElementById('cost-stack');
    const eq = document.getElementById('cost-eq');
    if (!host) return;
    const direct = COSTS.reduce((a, c) => a + c.v, 0);
    const overhead = Math.round(direct * 0.10);
    const loaded = direct + overhead;
    const margin = Math.round(loaded * 0.15);
    const fee = loaded + margin;
    const max = Math.max(...COSTS.map(c => c.v));

    const rows = COSTS.map(c => `
      <div class="stack__row">
        <div class="stack__label">${c.label}<small>${c.sub}</small></div>
        <div class="stack__val tnum">${nf.format(c.v)}</div>
        <div class="stack__track"><div class="stack__fill" data-w="${(c.v / max) * 100}"></div></div>
      </div>`).join('');

    host.innerHTML = rows + `
      <div class="stack__row is-sum">
        <div class="stack__label">Direct delivery subtotal</div>
        <div class="stack__val tnum">${nf.format(direct)}</div>
        <div class="stack__track"><div class="stack__fill" data-w="100"></div></div>
      </div>`;

    if (eq) {
      eq.innerHTML = `
        <div class="eq__head">Cost-to-serve reconciliation · PKR / month</div>
        <div class="eq__line"><span>Direct delivery (8 lines)</span><span class="tnum">${nf.format(direct)}</span></div>
        <div class="eq__line"><span>Overhead allowance · 10%</span><span class="tnum">+ ${nf.format(overhead)}</span></div>
        <div class="eq__line"><span>Loaded cost</span><span class="tnum">${nf.format(loaded)}</span></div>
        <div class="eq__line"><span>Visible operator margin · 15%</span><span class="tnum">+ ${nf.format(margin)}</span></div>
        <div class="eq__line eq__line--big"><span>Working core fee</span><span class="tnum">${nf.format(fee)}</span></div>
        <div class="eq__head" style="margin-top:22px">24-month term · before applicable tax</div>
        <div class="eq__line"><span>Monthly core fee</span><span class="tnum">${nf.format(fee)}</span></div>
        <div class="eq__line"><span>Year-1 equivalent</span><span class="tnum">${nf.format(fee * 12)}</span></div>
        <div class="eq__line"><span>24-month total</span><span class="tnum">${nf.format(fee * 24)}</span></div>
        <div class="eq__line eq__line--big"><span>Tax / GST rate</span><span class="eq__blank">&nbsp;</span></div>
        <div class="eq__line"><span>Invoice cadence</span><span class="eq__blank">&nbsp;</span></div>`;
    }

    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        host.querySelectorAll('.stack__fill').forEach((f, i) => {
          setTimeout(() => { f.style.width = f.dataset.w + '%'; }, i * 70);
        });
        io.disconnect();
      }
    }, { threshold: .25 });
    io.observe(host);
  };

  /* ---------- checklist ---------- */
  const checklist = () => {
    const host = document.getElementById('checklist');
    const fill = document.getElementById('check-fill');
    const lab = document.getElementById('check-label');
    if (!host) return;
    const KEY = 'nastp-dossier-checks-v1';
    let state = {};
    try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) { state = {}; }

    host.innerHTML = CHECKS.map(c => `
      <div class="check${state[c.id] ? ' is-done' : ''}" data-id="${c.id}" role="checkbox" tabindex="0" aria-checked="${!!state[c.id]}">
        <div class="check__box"><svg viewBox="0 0 16 16" fill="none" stroke="#F4F0E6" stroke-width="2.4"><path d="M3 8.5l3.2 3.2L13 5"/></svg></div>
        <div class="check__body"><strong>${c.t}</strong><span>${c.d}</span></div>
        <span class="pill ${state[c.id] ? 'pill--ok' : 'pill--hold'}">${state[c.id] ? 'Done' : 'Open'}</span>
      </div>`).join('');

    const refresh = () => {
      const done = CHECKS.filter(c => state[c.id]).length;
      if (fill) fill.style.width = (done / CHECKS.length * 100) + '%';
      if (lab) lab.innerHTML = `<span>${done} of ${CHECKS.length} closed</span><span>${CHECKS.length - done} remaining</span>`;
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    };

    host.querySelectorAll('.check').forEach(el => {
      const toggle = () => {
        const id = el.dataset.id;
        state[id] = !state[id];
        el.classList.toggle('is-done', !!state[id]);
        el.setAttribute('aria-checked', String(!!state[id]));
        const p = el.querySelector('.pill');
        p.className = 'pill ' + (state[id] ? 'pill--ok' : 'pill--hold');
        p.textContent = state[id] ? 'Done' : 'Open';
        refresh();
      };
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
    refresh();
  };

  /* ---------- document library ---------- */
  const library = () => {
    const grid = document.getElementById('docgrid');
    const bar = document.getElementById('filterbar');
    const count = document.getElementById('doc-count');
    if (!grid || !bar) return;
    const cats = [
      { id: 'all', l: 'All' }, { id: 'exec', l: 'Executive' }, { id: 'tech', l: 'Technical' },
      { id: 'loi', l: 'LOIs' }, { id: 'part', l: 'Partners' }, { id: 'comm', l: 'Commercial' },
      { id: 'evid', l: 'Evidence' }, { id: 'seal', l: 'Seal' }
    ];
    bar.innerHTML = cats.map((c, i) => `<button class="chip${i === 0 ? ' is-on' : ''}" data-cat="${c.id}" type="button">${c.l}</button>`).join('');

    const render = (cat) => {
      const list = cat === 'all' ? DOCS : DOCS.filter(d => d.cat === cat);
      grid.innerHTML = list.map(d => `
        <a class="doc" href="${d.href}" target="_blank" rel="noopener">
          <div class="doc__kind">${d.kind}</div>
          <div class="doc__title">${d.title}</div>
          <div class="doc__desc">${d.desc}</div>
          <div class="doc__meta"><span>${d.meta}</span><span>Open &rarr;</span></div>
        </a>`).join('');
      if (count) count.textContent = list.length + ' document' + (list.length === 1 ? '' : 's');
    };
    bar.querySelectorAll('.chip').forEach(ch => ch.addEventListener('click', () => {
      bar.querySelectorAll('.chip').forEach(c => c.classList.remove('is-on'));
      ch.classList.add('is-on');
      render(ch.dataset.cat);
    }));
    render('all');
  };

  /* ---------- live clock in masthead ---------- */
  const clock = () => {
    const el = document.getElementById('build-stamp');
    if (!el) return;
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    el.textContent = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
  };

  document.addEventListener('DOMContentLoaded', () => {
    reveal(); nav(); flow(); trinity(); costStack(); checklist(); library(); clock();
  });
})();
