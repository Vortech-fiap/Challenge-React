import { emailRegex } from '../../utils/authService'

export default function SignupForm({ onSignup, onOpenTerms, onOpenPrivacy, onSwitchToLogin }){
  function handleSubmit(ev){
    ev.preventDefault();
    const form = ev.target;
    form.querySelectorAll('.err').forEach(el => el.classList.remove('show'));

    const name = form.cadNome.value.trim();
    const user = form.cadUser.value.trim();
    const email = form.cadEmail.value.trim();
    const pwd = form.cadPwd.value;
    const pwd2 = form.cadPwd2.value;
    const termos = form.cadTermos.checked;
    const organizador = !!form.cadOrg?.checked;

    let ok = true;
    if(!name) ok = (form.querySelector('#cadNomeErr').classList.add('show'), false);
    if(!user) ok = (form.querySelector('#cadUserErr').classList.add('show'), false);
    if(!emailRegex.test(email)) ok = (form.querySelector('#cadEmailErr').classList.add('show'), false);
    if(!pwd || pwd.length < 6) ok = (form.querySelector('#cadPwdErr').classList.add('show'), false);
    if(pwd !== pwd2) ok = (form.querySelector('#cadPwd2Err').classList.add('show'), false);
    if(!termos) ok = (form.querySelector('#cadTermosErr').classList.add('show'), false);
    if(!ok) return;

    onSignup?.({ name, user, email, pwd, organizador });
  }

  function togglePwd(id){
    const el = document.querySelector(id);
    if(!el) return;
    el.type = el.type === 'password' ? 'text' : 'password';
  }

  return (
    <form onSubmit={handleSubmit} id="formCadastro" className="mt-6 space-y-4" autoComplete="on" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
          <input id="cadNome" name="cadNome" type="text" className="input w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Seu nome completo" required />
          <p className="err text-xs text-rose-600 mt-1" id="cadNomeErr">Informe seu nome.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input id="cadUser" name="cadUser" type="text" className="input w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="@usuario" required />
          <p className="err text-xs text-rose-600 mt-1" id="cadUserErr">Informe um username.</p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input id="cadEmail" name="cadEmail" type="email" className="input w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="voce@email.com" required />
        <p className="err text-xs text-rose-600 mt-1" id="cadEmailErr">Informe um email válido.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
          <div className="relative">
            <input id="cadPwd" name="cadPwd" type="password" className="input w-full rounded-xl border border-slate-200 px-3 py-2 pr-10" placeholder="mínimo 6 caracteres" required />
            <button type="button" onClick={()=>togglePwd('#cadPwd')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">👁️</button>
          </div>
          <p className="err text-xs text-rose-600 mt-1" id="cadPwdErr">A senha precisa ter pelo menos 6 caracteres.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar senha</label>
          <input id="cadPwd2" name="cadPwd2" type="password" className="input w-full rounded-xl border border-slate-200 px-3 py-2" required />
          <p className="err text-xs text-rose-600 mt-1" id="cadPwd2Err">As senhas não coincidem.</p>
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input id="cadOrg" name="cadOrg" type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
        <span>Sou organizador(a)</span>
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input id="cadTermos" name="cadTermos" type="checkbox" className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
        <span>
          Li e aceito os{' '}
          <button type="button" onClick={onOpenTerms} className="text-brand-700 font-semibold hover:underline">Termos de Uso</button>{' '}
          e a{' '}
          <button type="button" onClick={onOpenPrivacy} className="text-brand-700 font-semibold hover:underline">Política de Privacidade</button>.
        </span>
      </label>
      <p className="err text-xs text-rose-600" id="cadTermosErr">Você precisa aceitar os termos.</p>

      <button className="w-full rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2.5 font-semibold hover:from-brand-700 hover:to-brand-600 transition-all shadow hover:shadow-lg hover:-translate-y-0.5">Criar conta</button>

      <p className="text-xs text-slate-500 text-center">Já tem conta? <button type="button" onClick={onSwitchToLogin} className="text-brand-700 font-semibold hover:underline">Entrar</button></p>
    </form>
  )
}
