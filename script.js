import { saveContactMessage } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const tema = document.createElement("button");
  tema.textContent = "🌙 Tema";
  tema.style.position = "fixed";
  tema.style.right = "20px";
  tema.style.bottom = "20px";
  tema.style.zIndex = "1000";
  document.body.appendChild(tema);

  tema.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", document.body.classList.contains("dark"));
  };

  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }

  const stil = document.createElement("style");
  stil.textContent = `
    .dark { background:#0f1115 !important; color:#e5e7eb !important; }

    .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6,
    .dark p, .dark span, .dark li, .dark dt, .dark dd, .dark small,
    .dark strong, .dark em, .dark label, .dark textarea,
    .dark .naslov, .dark .home p,
    .dark .mudja-naslov, .dark .serbian-naslov, .dark .radbrad-naslov,
    .dark .blitz-naslov, .dark .jack-naslov, .dark .mk-naslov,
    .dark .gta-naslov, .dark .rdr-naslov, .dark .gow-naslov, .dark .got-naslov {
      color:#e5e7eb !important;
    }

    .dark a { color:#7cc7ff !important; }
    .dark a:hover { color:#b8e2ff !important; }

    .dark input, .dark textarea, .dark select {
      background:#121622 !important;
      color:#e5e7eb !important;
      border-color:#2a3142 !important;
    }

    .dark .btn-primary {
      background:#1f6feb !important;
      border-color:#1f6feb !important;
    }
  `;
  document.head.appendChild(stil);

  const f = document.querySelector("footer");
  if (f) {
    const s = document.createElement("span");
    f.append(" | ");
    f.appendChild(s);
    setInterval(() => (s.textContent = new Date().toLocaleTimeString()), 1000);
  }


  const form = document.querySelector(".mini-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector("textarea").value.trim();

      if (!name || !email || !message) {
        alert("Popuni sva polja!");
        return;
      }

      try {
        await saveContactMessage({ name, email, message });
        alert("✅ Poruka je spašena u Firestore!");
        form.reset();
     } catch (err) {
  console.error("FIRESTORE ERROR:", err);
  alert("❌ FIRESTORE GREŠKA:\n" + (err?.message || err));
}

    });
  }

  const top = document.createElement("button");
  top.textContent = "▲";
  top.style.position = "fixed";
  top.style.bottom = "60px";
  top.style.right = "20px";
  top.style.display = "none";
  top.style.zIndex = "9999";

  document.body.appendChild(top);
  top.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  window.addEventListener("scroll", () => {
    top.style.display = window.scrollY > 300 ? "inline" : "none";
  });
});
