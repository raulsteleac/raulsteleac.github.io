document.addEventListener("DOMContentLoaded", () => {
  // ── Email copy-to-clipboard ─────────────────────────────────
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    const email = emailLink.href.replace("mailto:", "");
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        let toast = document.getElementById("email-toast");
        if (!toast) {
          toast = document.createElement("div");
          toast.id = "email-toast";
          document.body.appendChild(toast);
        }
        toast.textContent = `${email} copied to clipboard`;
        toast.classList.add("show");
        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => toast.classList.remove("show"), 2500);
      });
    });
  }

  // ── Scroll fade-in ──────────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  const targets = [
    ...document.querySelectorAll(".publications h2"),
    ...document.querySelectorAll("ol.bibliography li"),
    ...document.querySelectorAll(".post h2"),
    ...document.querySelectorAll(".news table tr"),
  ];

  targets.forEach((el, i) => {
    el.classList.add("fade-in");
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    observer.observe(el);
  });
});
