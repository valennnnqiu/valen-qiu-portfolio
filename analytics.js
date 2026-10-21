/* Google Analytics 4 for the whole portfolio.
   1. Paste the Measurement ID of THIS site's GA4 web stream below (looks like G-XXXXXXXXXX).
   2. Every page loads this file; nothing is sent until the ID is filled in or on localhost.
   index.html is a single-page app, so goto() calls window.trackPage(page) to report each in-page view;
   the standalone case-study pages report themselves on load. GA4 derives views, users and
   average engagement time per page from those page_view events. */
(function () {
  var GA_ID = 'G-TNS8R6TNFK';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var ready = /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX' &&
    !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (!ready) { window.trackPage = function () {}; return; }

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: false });

  // in-page views of index.html, mapped to stable virtual paths (wander/ matches its standalone page on purpose)
  var PAGES = {
    home:   { path: '',          title: 'Valen Qiu - Home' },
    about:  { path: 'about',     title: 'Valen Qiu - About' },
    zepto:  { path: 'zepto-lab', title: 'Valen Qiu - Zepto Lab' },
    wander: { path: 'wander/',   title: 'Valen Qiu - Wander' }
  };
  var isSpa = !!document.getElementById('page-home');
  var base = location.pathname.replace(/index\.html$/, '');
  var last = null;

  function send(path, title) {
    if (path === last) return;
    last = path;
    gtag('event', 'page_view', {
      page_title: title,
      page_path: path,
      page_location: location.origin + path
    });
  }

  window.trackPage = function (page) {
    var p = PAGES[page];
    if (p) send(base + p.path, p.title);
  };

  // first view: the SPA's landing page (honouring a #about style deep link), or the standalone page itself
  if (isSpa) {
    var h = location.hash.replace('#', '');
    window.trackPage(PAGES[h] ? h : 'home');
  } else {
    send(location.pathname, document.title);
  }

  // clicks: one event per link/button press, with its label and destination
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a,button');
    if (!el) return;
    var label = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    var href = el.getAttribute('href') || '';
    gtag('event', 'ui_click', {
      link_text: label || el.className.toString().slice(0, 40),
      link_url: href.slice(0, 200),
      page_path: last || location.pathname
    });
  }, true);
})();
