/* Qierah.Co website analytics — Google Analytics 4, consent-first. */
(function () {
  'use strict';
  var ID = 'G-ZJ1F5EQEMG';
  var KEY = 'qierah_analytics_choice_v1';
  var started = false;
  function choice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(value) { try { localStorage.setItem(KEY, value); } catch (e) {} }
  function start() {
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ID);
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
    document.head.appendChild(tag);
  }
  function dismiss() {
    var el = document.getElementById('qierah-analytics-consent');
    if (el) el.remove();
  }
  function choose(value) {
    save(value);
    dismiss();
    if (value === 'yes') start();
    else if (started) window.location.reload();
  }
  function show() {
    dismiss();
    var box = document.createElement('aside');
    box.id = 'qierah-analytics-consent';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Website analytics preferences');
    box.style.cssText = 'position:fixed;bottom:14px;left:14px;right:14px;z-index:9999;max-width:740px;margin:auto;background:#fff;color:#183e47;border:1px solid #c6d9d2;border-radius:13px;box-shadow:0 8px 35px #183e4733;padding:16px 20px;font:14px/1.55 Segoe UI,Arial,sans-serif;';
    var message = document.createElement('p');
    message.style.cssText = 'margin:0 0 12px;';
    message.textContent = 'May we use optional Google Analytics cookies to measure visits and clicks to Etsy? You can decline and still use the whole site. ';
    var policy = document.createElement('a');
    policy.href = location.pathname.indexOf('/shop/') === 0 ? '../privacy-policy.html' : 'privacy-policy.html';
    policy.textContent = 'Privacy details';
    message.appendChild(policy);
    box.appendChild(message);
    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;';
    function button(label, answer) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'cursor:pointer;border:1px solid #174d58;border-radius:7px;padding:8px 18px;font:600 14px Segoe UI,Arial,sans-serif;background:' + (answer === 'yes' ? '#174d58;color:#fff;' : '#fff;color:#174d58;');
      b.addEventListener('click', function () { choose(answer); });
      actions.appendChild(b);
    }
    button('Accept analytics', 'yes');
    button('Decline', 'no');
    box.appendChild(actions);
    document.body.appendChild(box);
  }
  if (choice() === 'yes') start();
  document.addEventListener('DOMContentLoaded', function () {
    if (!choice()) show();
    document.querySelectorAll('[data-qierah-analytics-settings]').forEach(function (element) {
      element.addEventListener('click', function (event) { event.preventDefault(); show(); });
    });
    document.addEventListener('click', function (event) {
      var a = event.target.closest && event.target.closest('a[href]');
      if (!a || !started || typeof window.gtag !== 'function') return;
      var url;
      try { url = new URL(a.href, location.href); } catch (e) { return; }
      if (!/(^|\.)etsy\.com$/i.test(url.hostname)) return;
      window.gtag('event', 'etsy_product_click', {
        link_url: url.href,
        link_text: (a.textContent || '').trim().slice(0, 100),
        page_location: location.href
      });
    });
  });
})();