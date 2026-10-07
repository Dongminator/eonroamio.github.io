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

(function () {
  var phone = window.matchMedia('(max-width:900px)');
  var cards = document.querySelectorAll('.flip');
  function size(card) {
    var inner = card.querySelector('.flip-in');
    var face = card.querySelector(card.classList.contains('on') ? '.back' : '.front');
    inner.style.height = phone.matches ? face.offsetHeight + 'px' : '';
  }
  function sizeAll() { cards.forEach(size); }
  cards.forEach(function (card) {
    var btn = card.querySelector('.flip-btn');
    var front = card.querySelector('.front');
    var back = card.querySelector('.back');
    card.addEventListener('click', function () {
      var on = card.classList.toggle('on');
      btn.setAttribute('aria-expanded', String(on));
      front.setAttribute('aria-hidden', String(on));
      back.setAttribute('aria-hidden', String(!on));
      size(card);
    });
  });
  sizeAll();
  window.addEventListener('resize', sizeAll);
  if (document.fonts) document.fonts.ready.then(sizeAll);
})();
