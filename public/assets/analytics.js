/* Microsoft Clarity: explicit opt-in; no visitor identifiers or link parameters. */
(function () {
  'use strict';
  var KEY = 'portfolio-analytics-consent-v1';
  var PROJECT = 'z4svxgutc1';
  var loaded = false;
  var choice = null;
  var privacySignal = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  try { choice = localStorage.getItem(KEY); } catch (_) {}

  function start() {
    if (loaded || privacySignal || choice !== 'granted') return;
    loaded = true;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/' + PROJECT;
    document.head.appendChild(script);
  }

  function init() {
    var style = document.createElement('style');
    style.textContent = '#analytics-consent{position:fixed;inset:auto 16px 16px auto;z-index:10000;max-width:400px;width:calc(100% - 32px);box-sizing:border-box;padding:20px;background:#fff;color:#101828;border:1px solid #cbd5e1;border-radius:16px;box-shadow:0 8px 32px #10182826;font:14px/1.5 system-ui,sans-serif}#analytics-consent[hidden]{display:none}#analytics-consent h2{font-size:18px;font-weight:700;margin:0 0 8px}#analytics-consent p{margin:0 0 12px}#analytics-consent a{color:#2444d6;text-decoration:underline}#analytics-consent button,#analytics-settings{font:inherit;cursor:pointer;border:1px solid #64748b;border-radius:8px;padding:9px 12px;background:white;color:#101828}#analytics-consent .analytics-actions{display:flex;flex-wrap:wrap;gap:8px}#analytics-consent button[data-choice="granted"]{background:#2444d6;color:white;border-color:#2444d6}#analytics-consent button:focus-visible,#analytics-settings:focus-visible{outline:3px solid #315cff;outline-offset:3px}#analytics-settings{display:block;margin:20px auto;font:12px/1.4 system-ui,sans-serif}';
    document.head.appendChild(style);
    var panel = document.createElement('section');
    panel.id = 'analytics-consent';
    panel.setAttribute('aria-labelledby', 'analytics-title');
    panel.setAttribute('data-clarity-mask', 'true');
    panel.innerHTML = '<h2 id="analytics-title" tabindex="-1">Privacidad y analítica</h2><p>Si aceptas, Carlos Meza utilizará Microsoft Clarity para analizar visitas, clics y desplazamientos mediante mapas de calor y grabaciones de sesión. Clarity puede tratar datos técnicos como dirección IP, navegador y dispositivo, y utilizar cookies de analítica. Los campos sensibles se enmascaran. No activamos almacenamiento publicitario.</p><p>Puedes rechazar sin afectar tu navegación y retirar tu permiso en “Privacidad y cookies”, al pie de la página. <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Privacidad de Microsoft</a>.</p><p id="analytics-signal" hidden>Tu navegador solicita no realizar seguimiento. Respetamos esa preferencia y mantenemos Clarity desactivado.</p><div class="analytics-actions"><button type="button" data-choice="denied">Rechazar</button><button type="button" data-choice="granted">Aceptar analítica</button></div>';
    var settings = document.createElement('button');
    settings.type = 'button';
    settings.id = 'analytics-settings';
    settings.textContent = 'Privacidad y cookies';
    settings.setAttribute('aria-controls', panel.id);
    panel.hidden = choice === 'granted' || choice === 'denied' || privacySignal;
    settings.setAttribute('aria-expanded', String(!panel.hidden));
    document.body.appendChild(panel);
    document.body.appendChild(settings);
    if (privacySignal) {
      panel.querySelector('#analytics-signal').hidden = false;
      panel.querySelector('[data-choice="granted"]').disabled = true;
    }
    settings.addEventListener('click', function () {
      panel.hidden = !panel.hidden;
      settings.setAttribute('aria-expanded', String(!panel.hidden));
      if (!panel.hidden) panel.querySelector('h2').focus();
    });
    panel.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-choice]');
      if (!button) return;
      choice = button.getAttribute('data-choice');
      try { localStorage.setItem(KEY, choice); } catch (_) {}
      panel.hidden = true;
      settings.setAttribute('aria-expanded', 'false');
      settings.focus();
      if (choice === 'granted') start();
      else if (loaded) {
        window.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
        window.clarity('consent', false);
        // Reload unloads the recorder; the persisted rejection prevents reloading it.
        window.location.reload();
      }
    });
    document.addEventListener('click', function (event) {
      if (!loaded || choice !== 'granted') return;
      var link = event.target.closest('a[href]');
      if (!link) return;
      var url = new URL(link.href, location.href);
      var name;
      if (url.origin === location.origin && /-case(?:\.html)?$/.test(url.pathname)) name = 'ver_caso_estudio';
      else if (url.origin === location.origin && /\.pdf$/i.test(url.pathname)) name = 'abrir_cv';
      else if (url.hostname === 'wa.me' || url.protocol === 'mailto:') name = 'contactar';
      if (name) window.clarity('event', name);
    });
    start();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
