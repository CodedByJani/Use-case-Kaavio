const app = document.getElementById("app");

let userType = null;
let currentPoll = null;
let votedPolls = new Set();

let polls = [
  { id: 1, title: "Paras vuodenaika?", options: ["Kesä", "Talvi", "Kevät", "Syksy"], votes: [2, 3, 1, 0] },
];

function renderLogin() {
  app.innerHTML = `
    <h1 class="text-center mb-4"><strong>Äänestyssovellus</strong></h1>
    <h1 class="text-center mb-4">Kirjaudu sisään</h1>
    <div class="d-grid gap-3">
      <button class="btn btn-primary" onclick="login('user')">Kirjaudu käyttäjänä</button>
      <button class="btn btn-secondary" onclick="login('admin')">Kirjaudu ylläpitäjänä</button>
    </div>
  `;
}

function login(type) {
  userType = type;
  renderMain();
}

function logout() {
  userType = null;
  votedPolls.clear();
  renderLogin();
}

function renderMain() {
  app.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>${userType === 'admin' ? "Ylläpitäjän hallintapaneeli" : "Äänestykset"}</h2>
      <button class="btn btn-outline-danger" onclick="logout()">Kirjaudu ulos</button>
    </div>
  `;

  if (userType === "admin") {
    renderAdminControls();
  } else {
    renderPollList();
  }
}

function renderPollList() {
  if (polls.length === 0) {
    app.innerHTML += `<p>Ei äänestyksiä saatavilla</p>`;
    return;
  }

  polls.forEach((poll, index) => {
    app.innerHTML += `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${poll.title}</h5>
          <button class="btn btn-sm btn-success me-2" onclick="renderVote(${index})">Äänestä</button>
          <button class="btn btn-sm btn-info" onclick="renderResults(${index})">Katso tulos</button>
        </div>
      </div>
    `;
  });
}

function renderVote(index) {
  const poll = polls[index];
  if (votedPolls.has(poll.id)) {
    alert("Olet jo äänestänyt");
    return;
  }

  currentPoll = index;
  app.innerHTML = `
    <h3>${poll.title}</h3>
    <form id="voteForm" class="mt-3">
      ${poll.options.map((opt, i) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="vote" value="${i}" id="opt${i}" required>
          <label class="form-check-label" for="opt${i}">${opt}</label>
        </div>
      `).join("")}
      <button class="btn btn-primary mt-3" type="submit">Äänestä</button>
      <button class="btn btn-secondary mt-3 ms-2" onclick="renderMain()">Peruuta</button>
    </form>
  `;

  document.getElementById("voteForm").onsubmit = function(e) {
    e.preventDefault();
    const selected = parseInt(document.querySelector('input[name="vote"]:checked').value);
    polls[currentPoll].votes[selected]++;
    votedPolls.add(polls[currentPoll].id);
    alert("Ääni tallennettu");
    renderMain();
  };
}

function renderResults(index) {
  const poll = polls[index];
  const total = poll.votes.reduce((a, b) => a + b, 0);
  app.innerHTML = `
    <h3>${poll.title}</h3>
    <ul class="list-group mt-3">
      ${poll.options.map((opt, i) => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${opt}
          <span class="badge bg-primary">${poll.votes[i]} ääntä (${total > 0 ? Math.round(poll.votes[i] / total * 100) : 0}%)</span>
        </li>
      `).join("")}
    </ul>
    <button class="btn btn-secondary mt-3" onclick="renderMain()">Takaisin</button>
  `;
}

function renderAdminControls() {
  app.innerHTML += `
    <button class="btn btn-success mb-3" onclick="renderNewPollForm()">Luo uusi äänestys</button>
    ${polls.length === 0 ? "<p>Ei äänestyksiä</p>" : ""}
    <div id="pollList"></div>
  `;

  const list = document.getElementById("pollList");

  polls.forEach((poll, index) => {
    list.innerHTML += `
      <div class="card">
        <div class="card-body d-flex justify-content-between align-items-center">
          <span>${poll.title}</span>
          <button class="btn btn-danger btn-sm" onclick="deletePoll(${index})">Poista</button>
        </div>
      </div>
    `;
  });
}

function renderNewPollForm() {
  app.innerHTML = `
    <h3>Luo uusi äänestys</h3>
    <form id="newPollForm" class="mt-3">
      <div class="mb-3">
        <label for="title" class="form-label">Otsikko</label>
        <input type="text" class="form-control" id="title" required />
      </div>
      <div id="optionsContainer" class="mb-3">
        <label class="form-label">Vaihtoehdot</label>
        <div class="vote-option"><input type="text" class="form-control" required /><button type="button" class="btn btn-danger btn-sm" onclick="removeOption(this)">X</button></div>
        <div class="vote-option"><input type="text" class="form-control" required /><button type="button" class="btn btn-danger btn-sm" onclick="removeOption(this)">X</button></div>
      </div>
      <button type="button" class="btn btn-secondary mb-3" onclick="addOption()">Lisää vaihtoehto</button><br/>
      <button class="btn btn-primary" type="submit">Tallenna</button>
      <button class="btn btn-secondary ms-2" onclick="renderMain()">Peruuta</button>
    </form>
  `;

  document.getElementById("newPollForm").onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const optionInputs = Array.from(document.querySelectorAll("#optionsContainer input"));
    const options = optionInputs.map(i => i.value.trim()).filter(Boolean);

    if (!title || options.length < 2) {
      alert("Täytä kaikki kentät ja vähintään kaksi vaihtoehtoa");
      return;
    }

    polls.push({ id: Date.now(), title, options, votes: Array(options.length).fill(0) });
    renderMain();
  };
}

function addOption() {
  const div = document.createElement("div");
  div.className = "vote-option";
  div.innerHTML = `<input type="text" class="form-control" required /><button type="button" class="btn btn-danger btn-sm" onclick="removeOption(this)">X</button>`;
  document.getElementById("optionsContainer").appendChild(div);
}

function removeOption(btn) {
  btn.parentElement.remove();
}

function deletePoll(index) {
  if (confirm("Haluatko varmasti poistaa tämän äänestyksen?")) {
    polls.splice(index, 1);
    renderMain();
  }
}

renderLogin();