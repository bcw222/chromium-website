var LOOP_SLIDES = true;

function getActiveSlideIndex() {
  var slides = document.getElementsByClassName("slide");
  for (var i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains("shown"))
      return i;
  }
  return -1;
}

function getNextSlideIndex(active, dir, len) {
  var next = active + dir;
  if (LOOP_SLIDES) {
    if (next >= len)
      return next - len;
    if (next < 0)
      return next + len;
  } else {
    if (next > len)
      return active;
    if (next < 0)
      return 0;
  }
  return next;
}

function advanceSlide(dir) {
  var active = getActiveSlideIndex();
  var slides = document.getElementsByClassName("slide");
  var next = getNextSlideIndex(active, dir, slides.length);
  slides[active].classList.remove("shown");
  slides[next].classList.add("shown");
}

function onKeyEvent(e) {
  console.log(e.key);
  if (e.key == "ArrowLeft") {
    advanceSlide(-1);
    e.preventDefault();
  } else if (e.key == "ArrowRight" || e.key == " ") {
    advanceSlide(1);
    e.preventDefault();
  }
}

function addEventHandlers(e) {
  document.body.addEventListener("keydown", onKeyEvent);
}

window.addEventListener("load", addEventHandlers);
