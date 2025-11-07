export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getUsers() {
  try { return JSON.parse(localStorage.getItem('ff_users') || '[]'); } catch { return []; }
}
export function setUsers(list) { localStorage.setItem('ff_users', JSON.stringify(list)); }

export function setSession(user, remember) {
  const data = { email: user.email, name: user.name, user: user.user, role: user.role || 'comum', ts: Date.now() };
  if (remember) localStorage.setItem('ff_session', JSON.stringify(data));
  else sessionStorage.setItem('ff_session', JSON.stringify(data));
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem('ff_session')) || JSON.parse(sessionStorage.getItem('ff_session'));
  } catch { return null; }
}

export function findUserByEmailAndPwd(email, pwd) {
  const users = getUsers();
  return users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.pwd === pwd) || null;
}

export function createUser({ name, user, email, pwd, role='comum' }) {
  const users = getUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { ok: false, message: 'Este email já está cadastrado' };
  const newUser = { name, user, email, pwd, role, createdAt: Date.now() };
  users.push(newUser); setUsers(users);
  return { ok: true, user: newUser };
}
