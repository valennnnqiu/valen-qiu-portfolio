/* Passcode gate. Loaded first in the <head> of every page.
   No valid unlock in this browser -> send the visitor to password.html and bring them back after.
   Front-end only: it keeps casual visitors out, it is not real security on a static site. */
(function () {
  /* Flip to true once password.html has the real passcode hash (CONFIG.passHash). */
  var ENABLED = true;
  if (!ENABLED) return;
  var KEY = 'vq-auth';
  try { if (sessionStorage.getItem(KEY) === '1') return; } catch (e) {}
  try { if (localStorage.getItem(KEY) === '1') return; } catch (e) {}
  var base = document.currentScript.src.replace(/gate\.js(\?.*)?$/, '');
  var here = location.pathname + location.search + location.hash;
  document.documentElement.style.visibility = 'hidden';
  location.replace(base + 'password.html?next=' + encodeURIComponent(here));
})();
