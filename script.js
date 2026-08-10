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

  const revealTargets = document.querySelectorAll(
    ".about, .split, .layouts, .highlight, .gallery, .purchase, .contact .contact__copy, .form"
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
