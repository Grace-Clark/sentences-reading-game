(() => {
  const $ = (id) => document.getElementById(id);

  // Directions shown at the top of each step. Each is auto-played via TTS when
  // the step is entered, and the "Hear directions again" button replays it.
  const DIRECTIONS = {
    listen: "Click each picture. Then press next!",
    phrase: "Read this sentence. Then press next!",
    choose: "Pick the picture that matches the sentence. Then press next!",
  };

  const state = {
    prIndex: 0,
    mainIndex: 0,
    step: "listen", // "listen" | "phrase" | "choose" — for main questions
    score: 0,
    answered: 0,
    total: QUESTIONS.main.length,
    answers: [], // { target, chosen, correct }
    visited: new Set(), // word ids the student has clicked on step 1 of the current question
  };

  // ---------- Audio (Web Speech + recorded files in assets/audio/) ----------
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    voice =
      voices.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|zira|google us english/i.test(v.name)) ||
      voices.find((v) => /en[-_]US/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      voices[0] ||
      null;
  }
  if (synth) {
    pickVoice();
    synth.onvoiceschanged = pickVoice;
  }

  let currentAudio = null;
  function stopAllAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if (synth) synth.cancel();
  }

  function speak(text, opts = {}) {
    if (!synth) return Promise.resolve();
    synth.cancel();
    const trimmed = text.trim();
    const letters = trimmed.match(/[a-zA-Z]/g) || [];
    const lastLetter = (letters[letters.length - 1] || "").toLowerCase();
    const endsInP = lastLetter === "p" && !opts.noEmphasize;
    const speakText = endsInP && !/[.!?,;:]$/.test(trimmed) ? trimmed + "." : text;
    const defaultRate = endsInP ? 0.7 : 0.85;
    return new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(speakText);
      if (voice) u.voice = voice;
      u.lang = "en-US";
      u.rate = opts.rate ?? defaultRate;
      u.pitch = opts.pitch ?? 1.05;
      u.onend = u.onerror = () => resolve();
      synth.speak(u);
    });
  }

  // Try a recorded audio file from assets/audio/<word>.mp3 first; fall back to TTS.
  const audioCache = new Map();
  function tryPlayUrl(url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.addEventListener("ended", () => resolve(true));
      audio.addEventListener("error", () => reject());
      audio.play().then(() => { currentAudio = audio; }).catch(reject);
    });
  }
  async function playWord(word, ttsText, ttsOpts) {
    stopAllAudio();
    const cached = audioCache.get(word);
    if (cached === "none") return speak(ttsText, ttsOpts);
    const exts = cached ? [cached] : ["mp3", "m4a"];
    for (const ext of exts) {
      try {
        await tryPlayUrl(`assets/audio/${word}.${ext}`);
        audioCache.set(word, ext);
        return;
      } catch { /* try next */ }
    }
    audioCache.set(word, "none");
    return speak(ttsText, ttsOpts);
  }

  // ---------- Screen switching ----------
  function showScreen(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
    stopAllAudio();
  }

  // ---------- Picture helper ----------
  function showPicture(el, image) {
    el.innerHTML = "";
    const img = document.createElement("img");
    img.src = `assets/words/${image}`;
    img.alt = "";
    img.className = "pic";
    el.appendChild(img);
  }

  // ---------- Practice (same as Part 1) ----------
  function renderPractice() {
    if (state.prIndex >= QUESTIONS.practice.length) {
      state.mainIndex = 0;
      state.step = "listen";
      renderMain();
      return;
    }
    showScreen("screen-practice");
    const q = QUESTIONS.practice[state.prIndex];
    $("pr-count").textContent = `Practice — ${state.prIndex + 1} of ${QUESTIONS.practice.length}`;
    $("pr-next").classList.add("hidden");

    const grid = $("pr-options");
    grid.innerHTML = "";
    q.options.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "option";
      card.type = "button";
      card.dataset.word = opt.word;
      const inner = document.createElement("div");
      inner.className = "crop";
      showPicture(inner, opt.image);
      card.appendChild(inner);
      card.addEventListener("click", () => handlePracticePick(card, opt, q));
      grid.appendChild(card);
    });

    setTimeout(() => speak(q.prompt), 350);
  }

  function handlePracticePick(card, opt, q) {
    if (card.classList.contains("locked")) return;
    const isCorrect = opt.word === q.target;
    const cards = document.querySelectorAll("#pr-options .option");
    cards.forEach((c) => {
      c.classList.add("locked");
      if (c !== card && c.dataset.word !== q.target) c.classList.add("dim");
    });
    card.classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) {
      const correctCard = document.querySelector(`#pr-options .option[data-word="${q.target}"]`);
      if (correctCard) correctCard.classList.add("correct");
    }
    speak(isCorrect ? `Yes! That's the ${q.target}.` : `That was the ${opt.word}. The ${q.target} is here.`);
    $("pr-next").classList.remove("hidden");
  }

  // ---------- Main question rendering ----------
  function renderMain() {
    if (state.mainIndex >= QUESTIONS.main.length) {
      finish();
      return;
    }
    if (state.step === "listen") renderListen();
    else if (state.step === "phrase") renderPhrase();
    else renderChoose();
  }

  // Step 1 — 6 pictures, audio-only
  function renderListen() {
    showScreen("screen-listen");
    const q = QUESTIONS.main[state.mainIndex];
    $("ls-count").textContent = `Question ${state.mainIndex + 1} of ${QUESTIONS.main.length}`;
    $("ls-score").textContent = `Score: ${state.score}/${state.answered}`;

    state.visited = new Set();
    const nextBtn = $("ls-next");
    nextBtn.disabled = true;

    const grid = $("ls-options");
    grid.innerHTML = "";
    const shuffled = shuffle(q.options.slice());
    state.currentOrder = shuffled.map((o) => o.word); // reuse order on the choose screen
    shuffled.forEach((opt) => {
      const card = document.createElement("button");
      card.className = "option hex-option";
      card.type = "button";
      card.dataset.word = opt.word;
      // opt.audio is an optional override for the audio filename base — used
      // when the recording's filename doesn't match the option's word.
      card.dataset.audio = opt.audio || opt.word;
      const inner = document.createElement("div");
      inner.className = "crop";
      showPicture(inner, opt.image);
      card.appendChild(inner);
      card.addEventListener("click", () => {
        // Clear any prior highlight so a rapid second click doesn't leave the
        // previous card stuck in the speaking state.
        document
          .querySelectorAll("#ls-options .speaking")
          .forEach((c) => c.classList.remove("speaking"));
        card.classList.add("speaking");
        playWord(opt.audio || opt.word, prettify(opt.word)).finally(() => {
          card.classList.remove("speaking");
        });
        card.classList.add("visited");
        state.visited.add(opt.word);
        if (state.visited.size === q.options.length) nextBtn.disabled = false;
      });
      grid.appendChild(card);
    });

    // Auto-play the step-1 direction on every question.
    setTimeout(() => speak(DIRECTIONS.listen), 300);
  }

  // Step 2 — sentence only
  function renderPhrase() {
    showScreen("screen-phrase");
    const q = QUESTIONS.main[state.mainIndex];
    $("ph-count").textContent = `Question ${state.mainIndex + 1} of ${QUESTIONS.main.length}`;
    $("ph-score").textContent = `Score: ${state.score}/${state.answered}`;
    $("ph-target").textContent = q.targetSentence;
    setTimeout(() => speak(DIRECTIONS.phrase), 300);
  }

  // Step 3 — 6 pictures + sentence, student picks
  function renderChoose() {
    showScreen("screen-choose");
    const q = QUESTIONS.main[state.mainIndex];
    $("ch-count").textContent = `Question ${state.mainIndex + 1} of ${QUESTIONS.main.length}`;
    $("ch-score").textContent = `Score: ${state.score}/${state.answered}`;
    $("ch-target").textContent = q.targetSentence;
    $("ch-next").classList.add("hidden");
    setTimeout(() => speak(DIRECTIONS.choose), 300);

    const grid = $("ch-options");
    grid.innerHTML = "";
    // Reuse the order from step 1 so the layout is consistent for the student.
    const order = state.currentOrder || q.options.map((o) => o.word);
    const optByWord = Object.fromEntries(q.options.map((o) => [o.word, o]));
    order.forEach((word) => {
      const opt = optByWord[word];
      if (!opt) return;
      const card = document.createElement("button");
      card.className = "option hex-option";
      card.type = "button";
      card.dataset.word = opt.word;
      card.dataset.audio = opt.audio || opt.word;
      const inner = document.createElement("div");
      inner.className = "crop";
      showPicture(inner, opt.image);
      card.appendChild(inner);
      // Small speaker overlay so the student can replay the picture's audio
      // without picking it as the answer.
      const sp = document.createElement("span");
      sp.className = "option-speaker";
      sp.textContent = "🔊";
      sp.setAttribute("role", "button");
      sp.setAttribute("tabindex", "0");
      sp.setAttribute("aria-label", `Hear ${prettify(opt.word)}`);
      sp.addEventListener("click", (e) => {
        e.stopPropagation();
        document
          .querySelectorAll("#ch-options .speaking")
          .forEach((c) => c.classList.remove("speaking"));
        card.classList.add("speaking");
        playWord(opt.audio || opt.word, prettify(opt.word)).finally(() => {
          card.classList.remove("speaking");
        });
      });
      card.appendChild(sp);
      card.addEventListener("click", () => handleChoosePick(card, opt, q));
      grid.appendChild(card);
    });
  }

  function handleChoosePick(card, opt, q) {
    if (card.classList.contains("locked")) return;
    const isCorrect = opt.word === q.target;
    state.answered += 1;
    if (isCorrect) state.score += 1;
    state.answers.push({ target: q.target, chosen: opt.word, correct: isCorrect });

    const cards = document.querySelectorAll("#ch-options .option");
    cards.forEach((c) => {
      c.classList.add("locked");
      if (c !== card && c.dataset.word !== q.target) c.classList.add("dim");
    });
    card.classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) {
      const correctCard = document.querySelector(`#ch-options .option[data-word="${q.target}"]`);
      if (correctCard) correctCard.classList.add("correct");
    }

    // Feedback uses each option's full sentence form so the student hears a
    // grammatical sentence, e.g. "That was 'The map is in the mud.'" rather
    // than "That was 'map in mud.'".
    const targetSentence = q.targetSentence;
    const chosenSentence = opt.sentence || prettify(opt.audio || opt.word);
    const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
    const trim = (s) => s.replace(/\.$/, "");
    speak(
      isCorrect
        ? `Yes! ${targetSentence}`
        : `That was ${trim(lower(chosenSentence))}. The sentence is ${lower(targetSentence)}`
    );
    $("ch-score").textContent = `Score: ${state.score}/${state.answered}`;
    $("ch-next").classList.remove("hidden");
  }

  // ---------- Finish + report ----------
  function finish() {
    showScreen("screen-done");
    $("final-score").textContent = `${state.score} / ${state.total}`;
    const pct = state.total > 0 ? state.score / state.total : 0;
    let headline = "Nice work!";
    if (pct === 1) headline = "Perfect! 🏆";
    else if (pct >= 0.8) headline = "Great job!";
    else if (pct >= 0.5) headline = "Good try!";
    $("done-headline").textContent = headline;
    $("done-detail").textContent = `You answered ${state.score} of ${state.total} correctly.`;
    renderReport();
  }

  function renderReport() {
    const missed = state.answers.filter((a) => !a.correct);
    const reportEl = $("report");
    reportEl.innerHTML = "";
    if (missed.length === 0) {
      const p = document.createElement("p");
      p.className = "report-empty";
      p.textContent = "No missed trials — every answer was correct!";
      reportEl.appendChild(p);
      return;
    }
    const heading = document.createElement("h3");
    heading.className = "report-heading";
    heading.textContent = `Missed trials (${missed.length})`;
    reportEl.appendChild(heading);

    const table = document.createElement("table");
    table.className = "report-table";
    table.innerHTML = "<thead><tr><th>Sentence</th><th>Picked</th></tr></thead><tbody></tbody>";
    const tbody = table.querySelector("tbody");
    // Build lookups: target -> sentence (correct answer) and word -> sentence
    // (any option). Used to render the full sentence for both columns.
    const sentenceByTarget = Object.fromEntries(QUESTIONS.main.map((q) => [q.target, q.targetSentence]));
    const sentenceByWord = {};
    QUESTIONS.main.forEach((q) =>
      q.options.forEach((o) => {
        sentenceByWord[o.word] = o.sentence || prettify(o.word);
      })
    );
    missed.forEach((a) => {
      const tr = document.createElement("tr");
      const correct = sentenceByTarget[a.target] || prettify(a.target);
      const chosen  = sentenceByWord[a.chosen]  || prettify(a.chosen);
      tr.innerHTML = `<td class="report-word">${correct}</td><td class="report-word report-wrong">${chosen}</td>`;
      tbody.appendChild(tr);
    });
    reportEl.appendChild(table);

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "ghost report-copy";
    copyBtn.textContent = "Copy report";
    copyBtn.addEventListener("click", async () => {
      const lines = [
        `Sentence Reading Game — ${state.score}/${state.total} correct`,
        `Date: ${new Date().toLocaleString()}`,
        "",
        "Missed trials:",
        ...missed.map((a) => `  sentence: ${sentenceByTarget[a.target] || prettify(a.target)} — picked: ${sentenceByWord[a.chosen] || prettify(a.chosen)}`),
      ];
      const text = lines.join("\n");
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy report"), 1500);
      } catch {
        copyBtn.textContent = "Press Ctrl+C";
      }
    });
    reportEl.appendChild(copyBtn);
  }

  // ---------- Utilities ----------
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ---------- Wiring ----------
  $("btn-start").addEventListener("click", () => {
    state.prIndex = 0;
    state.mainIndex = 0;
    state.step = "listen";
    state.score = 0;
    state.answered = 0;
    state.answers = [];
    shuffle(QUESTIONS.main);
    if (synth) {
      const u = new SpeechSynthesisUtterance(" ");
      synth.speak(u);
    }
    renderPractice();
  });

  $("title-hear").addEventListener("click", () => {
    (async () => {
      const lines = [
        "Sentence Reading Game.",
        "Instructions for care givers.",
        "This is a reading test for your child. Please don't help them. We want to see what they know on their own.",
        "After each response, click Next to continue to the next question.",
      ];
      for (const t of lines) {
        await speak(t);
        await new Promise((r) => setTimeout(r, 200));
      }
    })();
  });

  $("pr-next").addEventListener("click", () => {
    state.prIndex += 1;
    renderPractice();
  });
  $("pr-hear").addEventListener("click", () => {
    const q = QUESTIONS.practice[state.prIndex];
    speak(q.prompt);
  });

  $("ls-next").addEventListener("click", () => {
    state.step = "phrase";
    renderMain();
  });
  $("ph-next").addEventListener("click", () => {
    state.step = "choose";
    renderMain();
  });
  $("ch-next").addEventListener("click", () => {
    state.mainIndex += 1;
    state.step = "listen";
    state.currentOrder = null;
    renderMain();
  });

  // Replay the per-step direction.
  $("ls-hear-direction").addEventListener("click", () => speak(DIRECTIONS.listen));
  $("ph-hear-direction").addEventListener("click", () => speak(DIRECTIONS.phrase));
  $("ch-hear-direction").addEventListener("click", () => speak(DIRECTIONS.choose));

  $("btn-restart").addEventListener("click", () => {
    showScreen("screen-title");
  });
})();
