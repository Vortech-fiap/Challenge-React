import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getSession, getUsers, setUsers } from '../utils/authService'
import jsPDF from 'jspdf'
import Modal from '../components/ui/Modal'
import ProfileHeader from '../components/perfil/ProfileHeader'
import ProfileInfoForm from '../components/perfil/ProfileInfoForm'
import ProfilePreferences from '../components/perfil/ProfilePreferences'
import ProfileSecurity from '../components/perfil/ProfileSecurity'
import DangerZone from '../components/perfil/DangerZone'

export default function Perfil(){
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    user: '',
    email: '',
    phone: '',
    cityState: '',
    bio: '',
    notifEmail: false,
    notifPush: false,
    notifNewsletter: false,
    favorites: ['#Corinthians', '#Palmeiras', '#Santos', '#SeleçãoBrasileira']
  });
  const [editing, setEditing] = useState(false);
  const [sec, setSec] = useState({ current: '', next: '', next2: '' });
  const [secMsg, setSecMsg] = useState({ type: '', msg: '' });
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const s = getSession();
    if(!s) return;
    const users = getUsers();
    const full = users.find(u => u.email?.toLowerCase() === s.email?.toLowerCase());
    const profileKey = `ff_profile_${s.email}`;
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(profileKey) || '{}'); } catch { saved = {}; }
    setForm(prev => ({
      ...prev,
      name: full?.name || s.name || '',
      user: full?.user || s.user || '',
      email: s.email || '',
      phone: saved.phone || '',
      cityState: saved.cityState || '',
      bio: saved.bio || '',
      notifEmail: !!saved.notifEmail,
      notifPush: !!saved.notifPush,
      notifNewsletter: !!saved.notifNewsletter,
      favorites: Array.isArray(saved.favorites) && saved.favorites.length ? saved.favorites : prev.favorites
    }));
  }, []);

  function updateField(key, value){ setForm(f => ({ ...f, [key]: value })); }
  function updateFavorites(nextFavs){ setForm(f => ({ ...f, favorites: nextFavs })); }
  function toggleNotif(key, value){ setForm(f => ({ ...f, [key]: value })); }

  function handleSaveProfile(){
    const s = getSession(); if(!s) return;
    const profileKey = `ff_profile_${s.email}`;
    const payload = {
      phone: form.phone,
      cityState: form.cityState,
      bio: form.bio,
      notifEmail: form.notifEmail,
      notifPush: form.notifPush,
      notifNewsletter: form.notifNewsletter,
      favorites: form.favorites,
    };
    localStorage.setItem(profileKey, JSON.stringify(payload));
    setEditing(false);
  }

  function handleExportPDF(){
    const doc = new jsPDF();
    const margin = 14;
    let y = margin;
    doc.setFont('helvetica','bold'); doc.setFontSize(16);
    doc.text('Meus Dados', margin, y);
    y += 8;
    doc.setDrawColor(124,58,237); doc.line(margin, y, 200 - margin, y);
    y += 10;

    doc.setFont('helvetica','normal'); doc.setFontSize(12);
    const lines = [
      `Nome: ${form.name || '-'}`,
      `Username: ${form.user || '-'}`,
      `Email: ${form.email || '-'}`,
      `Telefone: ${form.phone || '-'}`,
      `Cidade/Estado: ${form.cityState || '-'}`,
      `Bio: ${form.bio || '-'}`,
      `Notificações: Email=${form.notifEmail ? 'Sim':'Não'}, Push=${form.notifPush ? 'Sim':'Não'}, Newsletter=${form.notifNewsletter ? 'Sim':'Não'}`,
      `Times favoritos: ${Array.isArray(form.favorites) ? form.favorites.join(', ') : '-'}`
    ];
    lines.forEach((line) => {
      const splitted = doc.splitTextToSize(line, 200 - margin*2);
      doc.text(splitted, margin, y);
      y += 8 + (splitted.length-1)*6;
      if(y > 280){ doc.addPage(); y = margin; }
    });
    doc.save('meus-dados.pdf');
  }

  function handleUpdatePassword(){
    setSecMsg({ type:'', msg:'' });
    const s = getSession();
    if(!s){ setSecMsg({ type:'error', msg:'Sessão expirada. Faça login novamente.' }); return; }
    const users = getUsers();
    const idx = users.findIndex(u => u.email?.toLowerCase() === s.email?.toLowerCase());
    if(idx < 0){ setSecMsg({ type:'error', msg:'Conta não encontrada.' }); return; }

    if(!sec.current || !sec.next || !sec.next2){ setSecMsg({ type:'error', msg:'Preencha todos os campos de senha.' }); return; }
    if(sec.next.length < 6){ setSecMsg({ type:'error', msg:'A nova senha deve ter pelo menos 6 caracteres.' }); return; }
    if(sec.next !== sec.next2){ setSecMsg({ type:'error', msg:'As senhas novas não coincidem.' }); return; }

    const user = users[idx];
    if(user.pwd !== sec.current){ setSecMsg({ type:'error', msg:'Senha atual incorreta.' }); return; }

    users[idx] = { ...user, pwd: sec.next };
    setUsers(users);
    setSec({ current:'', next:'', next2:'' });
    setSecMsg({ type:'success', msg:'Senha alterada com sucesso.' });
  }

  function confirmDeleteAccount(){
    const s = getSession();
    if(!s){ return; }
    const users = getUsers();
    const remaining = users.filter(u => u.email?.toLowerCase() !== s.email?.toLowerCase());
    setUsers(remaining);
    try { localStorage.removeItem(`ff_profile_${s.email}`); } catch(e){ void e }
    try { localStorage.removeItem('ff_session'); } catch(e){ void e }
    try { sessionStorage.removeItem('ff_session'); } catch(e){ void e }
    setDeleteOpen(false);
    navigate('/');
  }

  return (
    <Layout>
      <div className="flex items-start gap-3">
        <span className="text-2xl">👤</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Meu Perfil</h1>
          <p className="text-sm text-slate-500">Gerencie suas informações, preferências e segurança</p>
        </div>
      </div>
      <ProfileHeader name={form.name} user={form.user} editing={editing} onSave={handleSaveProfile} onExport={handleExportPDF} />
      <section className="grid gap-6 lg:grid-cols-3">
        <ProfileInfoForm form={form} editing={editing} onChange={updateField} onEnableEdit={()=>setEditing(true)} onSave={handleSaveProfile} />
        <div className="space-y-6">
          <ProfilePreferences form={form} editing={editing} onChangeFavorites={updateFavorites} onToggleNotif={toggleNotif} onSave={handleSaveProfile} />

          <ProfileSecurity sec={sec} secMsg={secMsg} onChange={(patch)=>setSec(s=>({...s, ...patch}))} onUpdatePassword={handleUpdatePassword} />

          <DangerZone onDelete={()=>setDeleteOpen(true)} />
        </div>
      </section>
      <Modal
        open={deleteOpen}
        onClose={()=>setDeleteOpen(false)}
        title="Excluir conta"
        size="sm"
        footer={[
          <button key="cancel" onClick={()=>setDeleteOpen(false)} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 transition">Cancelar</button>,
          <button key="delete" onClick={()=>confirmDeleteAccount()} className="rounded-xl bg-rose-600 text-white px-3 py-1.5 text-sm font-semibold hover:bg-rose-700 transition">Realmente excluir</button>
        ]}
      >
        <p className="text-sm">Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.</p>
      </Modal>
    </Layout>
  )
}