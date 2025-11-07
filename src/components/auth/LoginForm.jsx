import { emailRegex } from '../../utils/authService'

export default function LoginForm({ onLogin, onForgotPwd }){
  function handleSubmit(ev){
    ev.preventDefault();
    const form = ev.target;
    const email = form.loginEmail.value.trim();
    const pwd = form.loginPwd.value;
    const remember = form.remember.checked;

    form.querySelectorAll('.err').forEach(el => el.classList.remove('show'));

    let ok = true;
    if(!emailRegex.test(email)) { ok = false; form.querySelector('#loginEmailErr').classList.add('show'); }
    if(!pwd) { ok = false; form.querySelector('#loginPwdErr').classList.add('show'); }
    if(!ok) return;

    onLogin?.({ email, pwd, remember });
  }

  function togglePwd(){
    const el = document.querySelector('#loginPwd');
    if(!el) return;
    el.type = el.type === 'password' ? 'text' : 'password';
  }

  return (
    <form onSubmit={handleSubmit} id="formLogin" className="mt-6 space-y-4" autoComplete="on" noValidate>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input id="loginEmail" name="loginEmail" type="email" className="input w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="voce@email.com" required />
        <p className="err text-xs text-rose-600 mt-1" id="loginEmailErr">Informe um email válido.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
        <div className="relative">
          <input id="loginPwd" name="loginPwd" type="password" className="input w-full rounded-xl border border-slate-200 px-3 py-2 pr-10" placeholder="••••••••" required />
          <button type="button" onClick={togglePwd} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">👁️</button>
        </div>
        <p className="err text-xs text-rose-600 mt-1" id="loginPwdErr">Informe sua senha.</p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input id="remember" name="remember" type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
          Lembrar de mim
        </label>
        <button type="button" id="btnReset" onClick={onForgotPwd} className="text-brand-700 font-semibold hover:underline">Esqueci a senha</button>
      </div>

      <button className="w-full rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2.5 font-semibold hover:from-brand-700 hover:to-brand-600 transition-all shadow hover:shadow-lg hover:-translate-y-0.5">Entrar</button>

      <div className="flex items-center gap-3 my-2"><div className="h-px flex-1 bg-slate-200"></div></div>
    </form>
  )
}
