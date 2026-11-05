/* Passcode gate. Loaded first in the <head> of every page.
   No valid unlock in this browser -> send the visitor to password.html and bring them back after.
   Front-end only: it keeps casual visitors out, it is not real security on a static site. */
(function () {
  /* Site-wide switch: true locks every page. Leave false to lock only the pages whose
     <script src=".../gate.js" data-gate> tag carries the data-gate attribute. */
  var ENABLED = false;
  if (!ENABLED && !document.currentScript.hasAttribute('data-gate')) return;
  var KEY = 'vq-auth';
  try { if (sessionStorage.getItem(KEY) === '1') return; } catch (e) {}
  try { if (localStorage.getItem(KEY) === '1') return; } catch (e) {}
  var base = document.currentScript.src.replace(/gate\.js(\?.*)?$/, '');
  var here = location.pathname + location.search + location.hash;
  document.documentElement.style.visibility = 'hidden';
  location.replace(base + 'password.html?next=' + encodeURIComponent(here));
})();
