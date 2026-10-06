(function () {
  var menu = document.getElementById('menu');
  var openBtn = document.getElementById('menu-open');
  function setOpen(open) {
    menu.hidden = !open;
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  openBtn.addEventListener('click', function () { setOpen(true); });
  document.getElementById('menu-close').addEventListener('click', function () { setOpen(false); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
})();
