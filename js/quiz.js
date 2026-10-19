(function () {
  
  const QUIZ = {
    title: "Esőerdő kvíz",
    description: "10 kérdés az esőerdőkről, kérdésenként egy helyes válasz. Sok sikert!",
    shuffleQuestions: true,
    shuffleAnswers: true,
    questions: [
  {
    q: "Hol találhatók a trópusi esőerdők leginkább?",
    answers: [
      "A sarkvidékeken",
      "Az Egyenlítő közelében",
      "A sivatagok közepén",
      "A magas hegycsúcsokon"
    ],
    correct: 1,
    explain: "A trópusi esőerdők főként az Egyenlítő közelében találhatók, ahol egész évben meleg és csapadékos az időjárás."
  },
  {
    q: "Melyik állat él az esőerdőkben?",
    answers: [
      "Jegesmedve",
      "Pingvin",
      "Majom",
      "Fóka"
    ],
    correct: 2,
    explain: "Sok majomfaj él az esőerdőkben, ahol a fákon mozogva táplálékot keresnek és menedéket találnak."
  },
  {
    q: "Milyen az időjárás a trópusi esőerdőkben?",
    answers: [
      "Hideg és száraz",
      "Meleg és csapadékos",
      "Fagyos és szeles",
      "Havas és hideg"
    ],
    correct: 1,
    explain: "A trópusi esőerdőkben egész évben meleg van, és gyakran esik az eső."
  },
  {
    q: "Melyik a világ legnagyobb trópusi esőerdeje?",
    answers: [
      "Az Amazonas esőerdeje",
      "A Fekete-erdő",
      "A Sherwoodi erdő",
      "A Kongói erdő"
    ],
    correct: 0,
    explain: "Az Amazonas esőerdeje Dél-Amerikában található, és a világ legnagyobb trópusi esőerdeje."
  },
  {
    q: "Melyik kontinensen található az Amazonas esőerdeje?",
    answers: [
      "Afrikában",
      "Európában",
      "Dél-Amerikában",
      "Ausztráliában"
    ],
    correct: 2,
    explain: "Az Amazonas esőerdeje Dél-Amerikában terül el, főként Brazília területén."
  },
  {
    q: "Melyik növény található meg az esőerdőkben?",
    answers: [
      "Orchidea",
      "Tulipán",
      "Levendula",
      "Hóvirág"
    ],
    correct: 0,
    explain: "Sok orchideafaj él a trópusi esőerdőkben, és közülük több a fák ágain növekszik."
  },
  {
    q: "Miért fontosak az esőerdők a Föld számára?",
    answers: [
      "Mert műanyagot termelnek",
      "Mert segítik a szén-dioxid megkötését és a víz körforgását",
      "Mert megszüntetik az összes vihart",
      "Mert havat készítenek"
    ],
    correct: 1,
    explain: "Az esőerdők növényei szén-dioxidot vesznek fel, és az erdők fontos szerepet játszanak a víz körforgásában."
  },
  {
    q: "Melyik állat mozog lassan a fák ágain, és sok időt tölt fejjel lefelé lógva?",
    answers: [
      "Lajhár",
      "Gepárd",
      "Zebra",
      "Jegesmedve"
    ],
    correct: 0,
    explain: "A lajhár lassú mozgású emlős, amely ideje nagy részét a fákon tölti."
  },
  {
    q: "Mi veszélyezteti leginkább az esőerdőket?",
    answers: [
      "Az erdőirtás",
      "A túl sok hó",
      "A jéghegyek",
      "A sarki fény"
    ],
    correct: 0,
    explain: "Az erdőirtás során fákat vágnak ki, például mezőgazdasági területek és legelők kialakítása miatt."
  },
  {
    q: "Melyik állat élhet az esőerdők folyóiban?",
    answers: [
      "Delfin",
      "Piraja",
      "Rozmár",
      "Pingvin"
    ],
    correct: 1,
    explain: "A piraják Dél-Amerika édesvízi folyóiban élő halak, köztük az Amazonas medencéjében is."
  }
],
    messages: [
      { min: 100, text: "Hibátlan! Gratulálok!" },
      { min: 60,  text: "Szép eredmény, jó úton jársz." },
      { min: 0,   text: "Még van mit gyakorolni – próbáld újra!" }
    ]
  };
  

  const root = document.getElementById("kviz");
  const $ = s => root.querySelector(s);
  const shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  let questions = [], index = 0, score = 0, answered = false;

  $("[data-title]").textContent = QUIZ.title;
  $("[data-desc]").textContent = QUIZ.description;

  function show(name) {
    root.querySelectorAll("[data-screen]").forEach(s => { s.hidden = s.dataset.screen !== name; });
  }

  function start() {
    questions = QUIZ.shuffleQuestions ? shuffle(QUIZ.questions) : [...QUIZ.questions];
    index = 0; score = 0; show("game"); render();
  }

  function render() {
    answered = false;
    const item = questions[index];
    $("[data-counter]").textContent = (index + 1) + ". kérdés / " + questions.length;
    $("[data-live]").textContent = "Pontszám: " + score;
    $("[data-progress]").style.width = (index / questions.length * 100) + "%";
    $("[data-question]").textContent = item.q;
    $("[data-explain]").hidden = true;
    const next = $("[data-next]");
    next.disabled = true;
    next.textContent = index === questions.length - 1 ? "Eredmény megtekintése" : "Következő kérdés";

    const list = item.answers.map((text, i) => ({ text, ok: i === item.correct }));
    const box = $("[data-answers]");
    box.innerHTML = "";
    (QUIZ.shuffleAnswers ? shuffle(list) : list).forEach(a => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "kviz__answer";
      b.textContent = a.text;
      b.dataset.ok = a.ok;
      b.addEventListener("click", () => choose(b));
      box.appendChild(b);
    });
  }

  function choose(btn) {
    if (answered) return;
    answered = true;
    const ok = btn.dataset.ok === "true";
    if (ok) score++;
    root.querySelectorAll(".kviz__answer").forEach(b => {
      b.disabled = true;
      if (b.dataset.ok === "true") b.classList.add("is-correct");
    });
    if (!ok) btn.classList.add("is-wrong");
    const exp = questions[index].explain;
    if (exp) { $("[data-explain]").textContent = exp; $("[data-explain]").hidden = false; }
    $("[data-live]").textContent = "Pontszám: " + score;
    $("[data-next]").disabled = false;
    $("[data-next]").focus();
  }

  function finish() {
    $("[data-progress]").style.width = "100%";
    const pct = Math.round(score / questions.length * 100);
    $("[data-final]").textContent = score + " / " + questions.length + " (" + pct + "%)";
    $("[data-msg]").textContent = QUIZ.messages.find(m => pct >= m.min).text;
    show("result");
  }

  $("[data-start]").addEventListener("click", start);
  $("[data-restart]").addEventListener("click", start);
  $("[data-next]").addEventListener("click", () => { index < questions.length - 1 ? (index++, render()) : finish(); });
})();