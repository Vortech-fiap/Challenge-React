import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findUserByEmailAndPwd, createUser, setSession } from '../utils/authService'
import Modal from '../components/ui/Modal'
import AuthHero from '../components/auth/AuthHero'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'

export default function AuthPage(){
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [toast, setToast] = useState({ show:false, msg: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useEffect(()=>{
    try{
      const s = JSON.parse(localStorage.getItem('ff_session') || 'null') || JSON.parse(sessionStorage.getItem('ff_session') || 'null');
      if(s && s.email){
        if(s.role === 'organizador') navigate('/organizador')
        else navigate('/inicio')
      }
    }catch(e){ void e }
  },[navigate])

  function showToast(msg){
    setToast({ show:true, msg });
    setTimeout(()=> setToast({ show:false, msg: '' }), 1800);
  }

  function handleLogin({ email, pwd, remember }){
    const u = findUserByEmailAndPwd(email, pwd);
    if(!u){ showToast('Credenciais inválidas ❌'); return; }
  setSession(u, remember);
  showToast('Bem-vindo(a) de volta! ✅');
  setTimeout(()=> navigate(u.role === 'organizador' ? '/organizador' : '/inicio'), 650);
  }

  function handleCadastro({ name, user, email, pwd, organizador }){
    const role = organizador ? 'organizador' : 'comum';
    const res = createUser({ name, user, email, pwd, role });
    if(!res.ok){ showToast('Este email já está cadastrado ⚠️'); return; }
  setSession(res.user, true);
  showToast('Conta criada! 🎉');
  setTimeout(()=> navigate(role === 'organizador' ? '/organizador' : '/inicio'), 700);
  }

  return (
    <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <AuthHero />

        <section className="glass rounded-3xl p-6 md:p-8 shadow-card animate-pop">
          <div className="grid grid-cols-2 rounded-2xl border border-brand-100 overflow-hidden">
            <button
              onClick={()=>setTab('login')}
              className={`tab px-4 py-2 ${tab==='login' ? 'active font-semibold' : 'font-medium text-slate-600 hover:bg-brand-50'}`}
            >
              Entrar
            </button>
            <button
              onClick={()=>setTab('cadastro')}
              className={`tab px-4 py-2 ${tab==='cadastro' ? 'active font-semibold' : 'font-medium text-slate-600 hover:bg-brand-50'}`}
            >
              Criar conta
            </button>
          </div>

          {tab==='login' && (
            <LoginForm onLogin={handleLogin} onForgotPwd={()=>setModalOpen(true)} />
          )}
          {tab==='cadastro' && (
            <SignupForm
              onSignup={handleCadastro}
              onOpenTerms={()=>setTermsOpen(true)}
              onOpenPrivacy={()=>setPrivacyOpen(true)}
              onSwitchToLogin={()=>setTab('login')}
            />
          )}
        </section>
      </div>

      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title="Recuperar senha" size="sm">
        <p className="text-sm text-slate-600">Informe seu email e enviaremos instruções (simulado).</p>
        <input id="resetEmail" type="email" className="mt-3 input w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="voce@email.com" />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={()=>setModalOpen(false)} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 transition">Cancelar</button>
          <button onClick={()=>{ setModalOpen(false); showToast('Se existir uma conta, enviaremos o email 😉'); }} className="rounded-xl bg-brand-600 text-white px-3 py-1.5 text-sm font-semibold hover:bg-brand-700 transition">Enviar</button>
        </div>
      </Modal>

      <Modal open={termsOpen} onClose={()=>setTermsOpen(false)} title="Termos de Uso" size="lg">
        <p>Ao utilizar a plataforma, você concorda em:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Fornecer informações verdadeiras durante o cadastro.</li>
          <li>Não utilizar a aplicação para fins ilícitos.</li>
          <li>Respeitar direitos autorais e de imagem de terceiros.</li>
        </ul>
        <p className="mt-3">Conteúdos e serviços são oferecidos "como estão". Podemos atualizar estes termos a qualquer momento. O uso contínuo após mudanças indica aceitação.</p>
        <p className="mt-3 text-slate-600">Última atualização: {new Date().toLocaleDateString()}</p>
      </Modal>

      <Modal open={privacyOpen} onClose={()=>setPrivacyOpen(false)} title="Política de Privacidade" size="lg">
        <p>Coletamos dados mínimos para autenticação e preferência do usuário (por exemplo, email, nome e times favoritos).</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Armazenamos sessão de forma local (localStorage/sessionStorage) para manter você logada(o).</li>
          <li>Não compartilhamos seus dados com terceiros.</li>
          <li>Você pode solicitar a exclusão da sua conta pelos canais de contato.</li>
        </ul>
        <p className="mt-3">Utilizamos cookies/local storage para melhorar sua experiência. Você pode limpar estes dados a qualquer momento pelo seu navegador.</p>
        <p className="mt-3 text-slate-600">Última atualização: {new Date().toLocaleDateString()}</p>
      </Modal>

      <div id="toast" className={`fixed bottom-4 left-1/2 -translate-x-1/2 ${toast.show?'':'hidden'} rounded-2xl bg-slate-900 text-white px-4 py-2 text-sm shadow-lg`}>{toast.msg}</div>
    </main>
  )
}
