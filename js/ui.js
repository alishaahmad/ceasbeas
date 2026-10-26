window.UI = (function () {
  const overlay = document.getElementById("overlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalImg = document.getElementById("modalImg");
  const modalContinue = document.getElementById("modalContinue");
  const modalClose = document.getElementById("modalClose");

  let continueHandler = null;

  function openModal({ title, text, imgSrc = null, imgAlt = "" }, onContinue) {
    modalTitle.textContent = title || "⚠️";
    modalText.textContent = text || "";

    if (imgSrc) {
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt || "";
      modalImg.hidden = false;
    } else {
      modalImg.hidden = true;
      modalImg.removeAttribute("src");
      modalImg.alt = "";
    }

    continueHandler = typeof onContinue === "function" ? onContinue : null;
    overlay.hidden = false;
  }

  function closeModal() {
    overlay.hidden = true;
    continueHandler = null;
  }

  modalContinue.addEventListener("click", () => {
    const fn = continueHandler;
    closeModal();
    if (fn) fn();
  });

  modalClose.addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  function setHUD({ approval, ego, rage }) {
    const hud = document.getElementById("hud");
    const a = document.getElementById("approval");
    const e = document.getElementById("ego");
    const r = document.getElementById("rage");
    hud.hidden = false;
    a.textContent = String(approval);
    e.textContent = String(ego);
    r.textContent = String(rage);
  }

  function hideHUD() {
    document.getElementById("hud").hidden = true;
  }

  return { openModal, closeModal, setHUD, hideHUD };
})();