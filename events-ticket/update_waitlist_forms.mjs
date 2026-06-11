import { readFile, writeFile } from 'node:fs/promises';

const waitlistHtml = `<section class="stillness-event-waitlist" id="notify">
  <div class="stillness-event-waitlist__inner">
    <div class="stillness-event-waitlist__copy">
      <span class="stillness-event-waitlist__label">Event Waitlist</span>
      <h2>Stay close to the <em>next gathering.</em></h2>
      <p>Receive early notice when new retreats, cancellations, and intimate Stillness sessions open.</p>
      <div class="stillness-event-waitlist__signals">
        <span>New dates</span>
        <span>Cancellations</span>
        <span>Private releases</span>
      </div>
    </div>
    <div class="stillness-event-waitlist__form-card">
      <span class="stillness-event-waitlist__form-title">Join the list</span>
      <div class="metform-events-wrap">
        [metform form_id="6697"]
      </div>
      <span class="stillness-event-waitlist__note">We respect your inbox. Unsubscribe anytime.</span>
    </div>
  </div>
</section>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400;500;600&display=swap');

:root {
  --event-stone: #0E1B30;
  --event-seafoam: #688F9D;
  --event-wave: #A4B2BA;
  --event-breeze: #D9E8EB;
  --event-cream: #F7F0EC;
}

.stillness-event-waitlist {
  padding: 5.75rem 4rem !important;
  background: var(--event-stone) !important;
  border-top: 0.5px solid rgba(104, 143, 157, 0.15) !important;
  border-bottom: 0.5px solid rgba(104, 143, 157, 0.15) !important;
}

.stillness-event-waitlist,
.stillness-event-waitlist * {
  box-sizing: border-box !important;
}

.stillness-event-waitlist__inner {
  max-width: 1080px !important;
  margin: 0 auto !important;
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 440px) !important;
  gap: 4rem !important;
  align-items: center !important;
}

.stillness-event-waitlist__copy {
  text-align: left !important;
}

.stillness-event-waitlist__label,
.stillness-event-waitlist__form-title {
  display: block !important;
  font-family: 'Jost', sans-serif !important;
  font-size: 0.62rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.28em !important;
  text-transform: uppercase !important;
  color: var(--event-seafoam) !important;
}

.stillness-event-waitlist__label {
  margin: 0 0 1rem !important;
}

.stillness-event-waitlist__form-title {
  margin: 0 0 1.25rem !important;
  color: var(--event-breeze) !important;
}

.stillness-event-waitlist h2 {
  font-family: 'Cormorant Garamond', serif !important;
  font-size: clamp(2rem, 4vw, 3.5rem) !important;
  font-weight: 300 !important;
  color: var(--event-cream) !important;
  margin: 0 0 1rem !important;
  line-height: 1.1 !important;
}

.stillness-event-waitlist h2 em {
  font-style: italic !important;
  color: var(--event-wave) !important;
}

.stillness-event-waitlist p {
  font-family: 'Jost', sans-serif !important;
  font-size: 0.93rem !important;
  color: var(--event-wave) !important;
  max-width: 470px !important;
  margin: 0 !important;
  line-height: 1.85 !important;
}

.stillness-event-waitlist__signals {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 0.75rem !important;
  margin: 2rem 0 0 !important;
}

.stillness-event-waitlist__signals span {
  display: inline-flex !important;
  align-items: center !important;
  min-height: 34px !important;
  padding: 0.55rem 0.9rem !important;
  border: 0.5px solid rgba(104, 143, 157, 0.28) !important;
  border-radius: 2px !important;
  font-family: 'Jost', sans-serif !important;
  font-size: 0.7rem !important;
  font-weight: 300 !important;
  color: var(--event-wave) !important;
}

.stillness-event-waitlist__form-card {
  width: 100% !important;
  padding: 2rem !important;
  border: 0.5px solid rgba(217, 232, 235, 0.16) !important;
  border-radius: 4px !important;
  background: rgba(255, 255, 255, 0.035) !important;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.16) !important;
}

.metform-events-wrap {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 0 0.85rem !important;
}

.metform-events-wrap form,
.metform-events-wrap .mf-form {
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  gap: 0.9rem !important;
  background: transparent !important;
  box-shadow: none !important;
}

.metform-events-wrap form > *,
.metform-events-wrap .mf-form > * {
  margin: 0 !important;
  padding: 0 !important;
  flex: none !important;
  width: auto !important;
}

.metform-events-wrap label,
.metform-events-wrap h2,
.metform-events-wrap h3,
.metform-events-wrap .mf-section-title,
.metform-events-wrap .mf-input-label {
  display: none !important;
}

.metform-events-wrap .mf-input-wrapper,
.metform-events-wrap form > div:not(.mf-btn-wraper):not(.mf-btn-wrapper),
.metform-events-wrap .mf-form > div:not(.mf-btn-wraper):not(.mf-btn-wrapper) {
  flex: 1 1 auto !important;
  width: 100% !important;
  min-width: 0 !important;
  margin: 0 !important;
}

.metform-events-wrap input[type='email'],
.metform-events-wrap .mf-input {
  width: 100% !important;
  min-height: 50px !important;
  background: rgba(255, 255, 255, 0.06) !important;
  border: 0.5px solid rgba(104, 143, 157, 0.35) !important;
  color: var(--event-cream) !important;
  font-family: 'Jost', sans-serif !important;
  font-size: 0.85rem !important;
  font-weight: 300 !important;
  padding: 1rem 1.25rem !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 2px !important;
  transition: border-color 0.3s ease !important;
}

.metform-events-wrap input[type='email']::placeholder,
.metform-events-wrap .mf-input::placeholder {
  color: rgba(164, 178, 186, 0.45) !important;
}

.metform-events-wrap input[type='email']:focus,
.metform-events-wrap .mf-input:focus {
  border-color: rgba(104, 143, 157, 0.65) !important;
}

.metform-events-wrap .mf-btn-wraper,
.metform-events-wrap .mf-btn-wrapper,
.metform-events-wrap .mf-button-wrapper,
.metform-events-wrap .mf-submit,
.metform-events-wrap button {
  display: block !important;
  flex: 0 0 auto !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.metform-events-wrap button[type='submit'],
.metform-events-wrap input[type='submit'],
.metform-events-wrap .metform-btn,
.metform-events-wrap .metform-btn-submit,
.metform-events-wrap .mf-btn,
.metform-events-wrap .mf-btn-wraper button,
.metform-events-wrap .mf-btn-wrapper button,
.metform-events-wrap .mf-button-wrapper button,
.metform-events-wrap .stillness-event-submit-fallback {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  min-height: 50px !important;
  background: var(--event-seafoam) !important;
  border: 0.5px solid var(--event-seafoam) !important;
  color: var(--event-stone) !important;
  font-family: 'Jost', sans-serif !important;
  font-size: 0.68rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.2em !important;
  text-transform: uppercase !important;
  padding: 1rem 1.6rem !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  white-space: nowrap !important;
  border-radius: 2px !important;
  line-height: normal !important;
  box-shadow: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  appearance: none !important;
  -webkit-appearance: none !important;
}

.metform-events-wrap button[type='submit']:hover,
.metform-events-wrap input[type='submit']:hover,
.metform-events-wrap .metform-btn:hover,
.metform-events-wrap .metform-btn-submit:hover,
.metform-events-wrap .mf-btn:hover,
.metform-events-wrap .mf-btn-wraper button:hover,
.metform-events-wrap .mf-btn-wrapper button:hover,
.metform-events-wrap .mf-button-wrapper button:hover,
.metform-events-wrap .stillness-event-submit-fallback:hover {
  background: var(--event-breeze) !important;
  border-color: var(--event-breeze) !important;
}

.stillness-event-waitlist__note {
  display: block !important;
  font-family: 'Jost', sans-serif !important;
  font-size: 0.7rem !important;
  color: rgba(164, 178, 186, 0.42) !important;
  letter-spacing: 0.06em !important;
  line-height: 1.5 !important;
}

@media (max-width: 768px) {
  .stillness-event-waitlist {
    padding: 4rem 1.5rem !important;
  }
  .stillness-event-waitlist__inner {
    grid-template-columns: 1fr !important;
    gap: 2.5rem !important;
  }
  .stillness-event-waitlist__copy,
  .stillness-event-waitlist {
    text-align: center !important;
  }
  .stillness-event-waitlist p {
    margin: 0 auto !important;
  }
  .stillness-event-waitlist__signals {
    justify-content: center !important;
  }
  .stillness-event-waitlist__form-card {
    padding: 1.5rem !important;
  }
}
</style>

<script>
(function() {
  function stillnessEnsureEventSubmit() {
    document.querySelectorAll('.metform-events-wrap form').forEach(function(form) {
      var submit = form.querySelector('button[type="submit"], input[type="submit"], .metform-btn, .metform-btn-submit, .mf-btn');
      if (submit) {
        submit.style.setProperty('display', 'flex', 'important');
        submit.style.setProperty('opacity', '1', 'important');
        submit.style.setProperty('visibility', 'visible', 'important');
        return;
      }

      var fallback = document.createElement('button');
      fallback.type = 'submit';
      fallback.className = 'stillness-event-submit-fallback';
      fallback.textContent = 'Notify Me';
      form.appendChild(fallback);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stillnessEnsureEventSubmit);
  } else {
    stillnessEnsureEventSubmit();
  }
  setTimeout(stillnessEnsureEventSubmit, 800);
  setTimeout(stillnessEnsureEventSubmit, 1800);
})();
</script>`;

const templateUpdates = [
  {
    path: 'events-ticket/single-product-templates/template-single-event-05-waitlist.json',
    title: 'Single Event - 05 Waitlist Form',
  },
  {
    path: 'wordpress/single-event-templates-v1/template-single-event-05-waitlist.json',
    title: 'Single Event - 05 Waitlist Form',
  },
  {
    path: 'events-ticket/templates/template-events-06-catalog-waitlist.json',
    title: 'Events Catalog - 06 Waitlist Form',
  },
  {
    path: 'wordpress/events-templates-v1/template-events-06-catalog-waitlist.json',
    title: 'Events Catalog - 06 Waitlist Form',
  },
  {
    path: 'events-ticket/templates/template-events-07-single-waitlist.json',
    title: 'Single Event - 07 Waitlist Form',
  },
  {
    path: 'wordpress/events-templates-v1/template-events-07-single-waitlist.json',
    title: 'Single Event - 07 Waitlist Form',
  },
];

for (const template of templateUpdates) {
  const raw = await readFile(template.path, 'utf8');
  const data = JSON.parse(raw);
  data.title = template.title;
  data.content[0].elements[0].settings.html = waitlistHtml;
  await writeFile(template.path, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Updated ${template.path}`);
}
