'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserPlus, Search, ChevronRight, Dumbbell, ArrowRight, ShieldCheck, Phone, Target, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientsList() {
  const [clients, setClients] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', phone: '', goal: '', injuries: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchClients = () => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setClients(data.clients || []))
      .catch(() => toast.error('تعذر جلب قائمة اللاعبين'));
  };

  useEffect(() => { fetchClients(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      });
      if (res.ok) {
        toast.success('تمت إضافة البطل بنجاح! ⚡', {
          description: `تم تسجيل ${newClient.name}، ويمكنك الآن تصميم جدوله التدريبي.`
        });
        setIsAdding(false);
        setNewClient({ name: '', phone: '', goal: '', injuries: '' });
        fetchClients();
      } else {
        toast.error('حدث خطأ أثناء الإضافة', { description: 'يرجى المحاولة مرة أخرى.' });
      }
    } catch (err) {
      toast.error('تعذر الاتصال بالخادم', { description: 'تحقق من اتصال الإنترنت.' });
    }
  };

  const filteredClients = clients.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone?.includes(searchQuery)
  );

  return (
    <div className="p-6 sm:p-10 bg-background min-h-screen text-white font-sans selection:bg-[#d4f60b] selection:text-black" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-6">
        <div>
          <Link href="/dashboard" className="text-white/40 hover:text-[#d4f60b] mb-2 inline-flex items-center gap-1.5 text-xs font-semibold transition">
            <ArrowRight size={14} /> العودة للوحة التحكم
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">إدارة اللاعبين والمشتركين</h1>
          <p className="text-xs text-white/50 mt-1">قائمة الرياضيين، أهدافهم، وتتبع التزامهم بتمارين CoachPR</p>
        </div>

        <button 
          onClick={() => setIsAdding(!isAdding)} 
          className="bg-[#d4f60b] hover:bg-[#c2e205] text-black px-4 py-2.5 rounded-2xl flex items-center gap-2 font-extrabold text-xs shadow-lg shadow-[#d4f60b]/20 cursor-pointer transition"
        >
          <UserPlus size={16} /> إضافة لاعب جديد
        </button>
      </div>

      {/* Add Client Card */}
      {isAdding && (
        <div className="bg-card p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-[#d4f60b]">
            <Sparkles size={18} />
            <h2 className="text-lg font-bold text-white">تسجيل بيانات بطل جديد</h2>
          </div>

          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-white/70 font-semibold">اسم اللاعب بالكامل</label>
              <input 
                required 
                placeholder="مثال: أحمد عبد الله" 
                className="w-full bg-surface border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#d4f60b] transition text-xs" 
                value={newClient.name} 
                onChange={e => setNewClient({...newClient, name: e.target.value})} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/70 font-semibold">رقم الواتساب للتواصل والتقارير</label>
              <input 
                required 
                placeholder="مثال: 01012345678" 
                className="w-full bg-surface border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#d4f60b] transition text-xs" 
                value={newClient.phone} 
                onChange={e => setNewClient({...newClient, phone: e.target.value})} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/70 font-semibold">الهدف التدريبي</label>
              <input 
                placeholder="تضخيم عضلي صافي / تنشيف ودهون أقل" 
                className="w-full bg-surface border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#d4f60b] transition text-xs" 
                value={newClient.goal} 
                onChange={e => setNewClient({...newClient, goal: e.target.value})} 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/70 font-semibold">إصابات سابقة أو تنبيهات طبية</label>
              <input 
                placeholder="خشونة ركبة خفيفة / إصابة كتف قديمة" 
                className="w-full bg-surface border border-white/10 rounded-2xl p-3 text-white focus:outline-none focus:border-[#d4f60b] transition text-xs" 
                value={newClient.injuries} 
                onChange={e => setNewClient({...newClient, injuries: e.target.value})} 
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2.5 mt-2">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)} 
                className="px-4 py-2 text-white/50 hover:text-white text-xs font-semibold"
              >
                إلغاء
              </button>
              <button 
                type="submit" 
                className="bg-[#d4f60b] hover:bg-[#c2e205] text-black px-6 py-2.5 rounded-2xl font-black text-xs transition"
              >
                تأكيد وحفظ اللاعب
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <Search className="w-4 h-4 text-white/40 absolute right-4 top-3.5" />
        <input 
          type="text"
          placeholder="ابحث بالاسم أو رقم الهاتف..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-card border border-white/10 rounded-2xl pr-11 pl-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#d4f60b] transition"
        />
      </div>

      {/* Clients Cards Table */}
      <div className="bg-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-surface border-b border-white/10 text-white/50 text-[11px]">
              <tr>
                <th className="p-4 font-semibold">الاسم</th>
                <th className="p-4 font-semibold">الهاتف</th>
                <th className="p-4 font-semibold">الهدف</th>
                <th className="p-4 font-semibold">الحالة</th>
                <th className="p-4 font-semibold text-center">الإجراءات والتحليلات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-white/40">
                    لا يوجد لاعبين مطابقين للبحث. يمكنك إضافة لاعب جديد الآن.
                  </td>
                </tr>
              ) : (
                filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition">
                    <td className="p-4 font-bold text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-[#d4f60b] font-black text-xs">
                        {client.name ? client.name.charAt(0) : 'ب'}
                      </div>
                      <span>{client.name}</span>
                    </td>
                    <td className="p-4 text-white/60 font-mono" dir="ltr">{client.phone}</td>
                    <td className="p-4 text-white/60">{client.goal || 'تضخيم وتطوير القوة'}</td>
                    <td className="p-4">
                      <span className="bg-[#161c10] border border-[#d4f60b]/30 text-[#d4f60b] px-2.5 py-1 rounded-xl text-[10px] font-bold">
                        نشط ومتابع
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link 
                        href={`/dashboard/clients/${client.id}`}
                        className="bg-surface hover:bg-[#d4f60b] hover:text-black border border-white/10 text-[#d4f60b] px-3.5 py-1.5 rounded-xl text-xs font-bold transition inline-flex items-center gap-1"
                      >
                        البيانات والتطور التدريبي
                        <ChevronRight size={14} className="rotate-180" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
