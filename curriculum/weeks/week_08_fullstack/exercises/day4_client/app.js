const api = location.origin.replace(/:\d+$/, ':3000'); // assume API on 3000
let token = localStorage.getItem('token');

const els = {
  status: document.getElementById('status'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  login: document.getElementById('login'),
  register: document.getElementById('register'),
  logout: document.getElementById('logout'),
  title: document.getElementById('title'),
  add: document.getElementById('add'),
  list: document.getElementById('list'),
  create: document.getElementById('create'),
};

function setStatus(msg, isError=false) {
  els.status.textContent = msg || '';
  els.status.className = isError ? 'error' : '';
}

function updateAuthUI() {
  const loggedIn = !!token;
  els.logout.style.display = loggedIn ? '' : 'none';
  els.create.style.display = loggedIn ? '' : 'none';
}

async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${api}${path}`, { ...opts, headers });
  if (!res.ok) throw new Error(`${res.status}: ${(await res.text())}`);
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

async function loadTasks() {
  try {
    const data = await apiFetch('/tasks');
    els.list.innerHTML = '';
    data.forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${t.title}</span> <button data-id="${t.id}">Delete</button>`;
      li.querySelector('button').onclick = () => removeTask(t.id);
      els.list.appendChild(li);
    });
    setStatus('Loaded tasks');
  } catch (e) {
    setStatus(e.message, true);
  }
}

async function addTask() {
  try {
    const title = els.title.value.trim();
    await apiFetch('/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) });
    els.title.value = '';
    await loadTasks();
  } catch (e) {
    setStatus(e.message, true);
  }
}

async function removeTask(id) {
  try {
    await apiFetch(`/tasks/${id}`, { method: 'DELETE' });
    await loadTasks();
  } catch (e) {
    setStatus(e.message, true);
  }
}

async function doAuth(route) {
  try {
    const email = els.email.value.trim();
    const password = els.password.value;
    const res = await apiFetch(`/auth/${route}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    token = res.token;
    localStorage.setItem('token', token);
    updateAuthUI();
    await loadTasks();
  } catch (e) { setStatus(e.message, true); }
}

els.login.onclick = () => doAuth('login');
els.register.onclick = () => doAuth('register');
els.logout.onclick = () => { token = null; localStorage.removeItem('token'); updateAuthUI(); els.list.innerHTML=''; };
els.add.onclick = addTask;

updateAuthUI();
if (token) loadTasks();
