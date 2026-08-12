(() => {
  const header = document.querySelector(".header");
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");
  const form = document.getElementById("lead-form");

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger?.addEventListener("click", () => {
    const open = burger.classList.toggle("is-open");
    nav?.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger?.classList.remove("is-open");
      nav.classList.remove("is-open");
      burger?.setAttribute("aria-expanded", "false");
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = form.querySelector(".form__success");
    const note = form.querySelector(".form__note");
    if (success) {
      success.hidden = false;
      if (note) note.hidden = true;
    }
    form.reset();
  });

  const slider = document.querySelector("[data-slider]");
  if (slider) {
    const track = slider.querySelector(".plans-slider__track");
    const slides = [...slider.querySelectorAll(".plan-card")];
    const prev = slider.querySelector(".plans-slider__arrow--prev");
    const next = slider.querySelector(".plans-slider__arrow--next");
    const dotsWrap = slider.querySelector(".plans-slider__dots");
    let index = 0;

    const go = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
      dotsWrap.querySelectorAll("button").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });
    };

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Планировка ${i + 1}`);
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => go(i));
      dotsWrap.append(dot);
    });

    prev?.addEventListener("click", () => go(index - 1));
    next?.addEventListener("click", () => go(index + 1));

    let startX = 0;
    track.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    });
  }

  const revealTargets = document.querySelectorAll(
    ".about, .split, .plans, .highlight, .location__intro, .location__map-wrap, .location__live, .gallery, .purchase, .contact .contact__copy, .form"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
