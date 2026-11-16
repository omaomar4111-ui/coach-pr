'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserPlus, Search, ChevronLeft } from 'lucide-react';

export default function ClientsList() {
  const [clients, setClients] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', phone: '', goal: '', injuries: '' });

  const fetchClients = () => {
    fetch('/api/clients').then(res => res.json()).then(data => setClients(data.clients || []));
  };

  useEffect(() => { fetchClients(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient)
    });
    setIsAdding(false);
    setNewClient({ name: '', phone: '', goal: '', injuries: '' });
    fetchClients();
  };

  return (
    <div className="p-8 bg-[#07040D] min-h-screen text-white font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link href="/dashboard" className="text-[#7C3AED] hover:underline mb-2 inline-block text-sm flex items-center gap-1 font-bold">
            <ChevronLeft size={16} /> العودة للوحة التحكم
          </Link>
          <h1 className="text-3xl font-bold">إدارة العملاء</h1>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-[#7C3AED] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition font-bold text-sm">
          <UserPlus size={18} /> إضافة عميل
        </button>
      </div>

      {/* Add Client Form */}
      {isAdding && (
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-bold mb-4 text-[#a78bfa]">إضافة عميل جديد</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="الاسم" className="bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#7C3AED]" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} />
            <input required placeholder="رقم الهاتف" className="bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#7C3AED]" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} />
            <input placeholder="الهدف (تضخيم / تنشيف)" className="bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#7C3AED]" value={newClient.goal} onChange={e => setNewClient({...newClient, goal: e.target.value})} />
            <input placeholder="إصابات سابقة (مثال: خشونة الركبة)" className="bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#7C3AED]" value={newClient.injuries} onChange={e => setNewClient({...newClient, injuries: e.target.value})} />
            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
              <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-400 hover:text-white text-sm">إلغاء</button>
              <button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-2 rounded-lg font-bold text-sm">حفظ</button>
            </div>
          </form>
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-[#111] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-black/50 border-b border-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-4 font-medium">الاسم</th>
              <th className="p-4 font-medium">الهاتف</th>
              <th className="p-4 font-medium">الهدف</th>
              <th className="p-4 font-medium">الحالة</th>
              <th className="p-4 font-medium">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {clients.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">لا يوجد عملاء مسجلين بعد.</td></tr>
            ) : (
              clients.map(client => (
                <tr key={client.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-bold">{client.name}</td>
                  <td className="p-4 text-gray-400" dir="ltr">{client.phone}</td>
                  <td className="p-4 text-gray-400">{client.goal || 'غير محدد'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${client.subscription_status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {client.subscription_status === 'active' ? 'نشط' : 'متوقف'}
                    </span>
                  </td>
                  <td className="p-4">
                    <Link href={`/dashboard/clients/${client.id}`} className="text-[#7C3AED] hover:underline text-sm font-bold">فتح الملف</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
