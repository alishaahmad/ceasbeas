(function () {
  
  // this line grabs the main screen area
  const screen = document.getElementById("screen");
  
  //this pulls info from data.js
  const { ACCESS_CODE, dogName, stage2, stage3 } = window.APP_DATA;

  //score n status tracker
  //simple "state" object (we’ll change later with questions & scoring)
  const state = {
    unlocked: false,
    approval: 50,
    ego: 50,
    ragebait: 0,
  };

  // ---------- screen renderers ----------
  // creates login page, so edit inside renderStage1 to edit layout/texts
  function renderStage1() {
    UI.hideHUD();
// this line replaces the screen w this HTML
    screen.innerHTML = ` 
      <h1> CEASER'S SECURITY SYSTEM</h1>
      <p>Protected rottweiler clearance required.</p>

      <!-- com -->
      <div class="field"> 
        <label for="code">Enter 6-digit clearance code</label>
        <input
          id="code"
          class="codeInput"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="6"
          placeholder="______"
        />
        <div class="small">Hint: December. Think carefully 👀</div>
      </div>

      <div class="row">
        <button class="btn primary" id="accessBtn">ACCESS SYSTEM</button>
        <button class="btn" id="panicBtn">panic (do not press)</button>
      </div>

      <div id="error" class="dangerText" style="display:none;"></div>
    `;

    const codeEl = document.getElementById("code");
    const errorEl = document.getElementById("error");
    const accessBtn = document.getElementById("accessBtn");
    const panicBtn = document.getElementById("panicBtn");

    codeEl.addEventListener("input", () => {

  // Only allow numbers and maximum of 6 digits
  codeEl.value = codeEl.value.replace(/\D/g, "").slice(0, 6);

  // Remove previous error message while typing
  errorEl.style.display = "none";
  errorEl.textContent = "";

  // Automatically unlock when correct code is typed
  if (codeEl.value === ACCESS_CODE && !state.unlocked) {
    passAccess();
  }
});

    function failAccess() {
      errorEl.style.display = "block";
      errorEl.textContent = "ACCESS DENIED. Ceaser has been notified.";
      UI.openModal(
        {
          title: "⚠️ ACCESS DENIED",
          text: "Bruhhh try again",
          imgSrc: null
        },
        () => {}
      );
      state.rage = Math.min(99, state.rage + 7);
    }

    function passAccess() {
      state.unlocked = true;
      UI.openModal(
        {
          title: "✅ ACCESS GRANTED",
          text: "Awwh u got it, ok u can continue!",
          imgSrc: null
        },
        () => {
          renderStage2();
        }
      );
    }

    accessBtn.addEventListener("click", () => {
      const entered = codeEl.value.trim();
      if (entered === ACCESS_CODE) passAccess();
      else failAccess();
    });

    codeEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") accessBtn.click();
    });

    panicBtn.addEventListener("click", () => {
      UI.openModal(
        {
          title: "🚨 PANIC BUTTON",
          text: "Ceaser judging u big time rn. Think harder pookie!",
          imgSrc: null
        },
        () => {}
      );
      state.rage = Math.min(99, state.rage + 3);
    });
  }

  function renderStage2() {
    UI.setHUD({ approval: state.approval, ego: state.ego, rage: state.rage });

    screen.innerHTML = `
      <h1>${stage2.title}</h1>
      <p>${stage2.subtitle}</p>

      <hr />

      <p class="small">This evaluation is hosted by: <strong>${dogName}</strong> 🐾</p>

      <div class="row">
        <button class="btn primary" id="beginBtn">${stage2.button}</button>
        <button class="btn" id="dogBtn">show Ceaser credentials</button>
      </div>
    `;

    document.getElementById("beginBtn").addEventListener("click", renderStage3);

    document.getElementById("dogBtn").addEventListener("click", () => {
      UI.openModal(
        {
          title: "📄 CEASER CREDENTIALS",
          text:
            "• Age: 7\n" +
            "• Mix: Rottweiler x Golden Retriever\n" +
            "• Specialty: Intimidation + loyalty\n" +
            "• Current mood: judging.",
          imgSrc: null
        },
        () => {}
      );
    });
  }

  function renderStage3() {
    UI.setHUD({ approval: state.approval, ego: state.ego, rage: state.rage });

    const bulletsHtml = stage3.bullets.map(b => `<li>${b}</li>`).join("");

    screen.innerHTML = `
      <h1>${stage3.title}</h1>
      <ul style="margin: 0 0 14px; color: rgba(245,245,247,0.78); line-height: 1.7;">
        ${bulletsHtml}
      </ul>

      <div class="row">
        <button class="btn primary" id="proceedBtn">${stage3.button}</button>
        <button class="btn" id="backBtn">go back</button>
      </div>

      <p class="small" style="margin-top: 12px;">
        Warning: choosing wrong answers may cause mild emotional damage.
      </p>
    `;

    document.getElementById("backBtn").addEventListener("click", renderStage2);

    // Next step will be the quiz screen (we’ll build it next)
    document.getElementById("proceedBtn").addEventListener("click", () => {
      UI.openModal(
        {
          title: "🏁 Ready?",
          text: "Your trial is about to start.",
          imgSrc: null
        },
        () => {
          // placeholder until we build the quiz screen next
          UI.openModal(
            {
              title: "✅ NEXT UP",
              text: "Quiz screen is next. You’re set up correctly.",
              imgSrc: null
            },
            () => {}
          );
        }
      );
    });
  }

  // ---------- Boot ----------
  renderStage1();
})();