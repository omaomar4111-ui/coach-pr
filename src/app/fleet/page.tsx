'use client';

import { useState } from 'react';
import { 
  Users, 
  Bot, 
  Search, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Filter,
  Flame,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function FleetPage() {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [search, setSearch] = useState('');

  // 52 Active Enterprise Agents Pool
  const fleetData = [
    { id: '1', name: 'عمر فاروق', dept: 'Sales & Conversion', role: 'Team Lead', status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 34 },
    { id: '2', name: 'سارة الجندي', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 7, max: 15, rating: '4.8', resolved: 28 },
    { id: '3', name: 'يوسف الشريف', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.9', resolved: 31 },
    { id: '4', name: 'مريم رضوان', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 8, max: 15, rating: '5.0', resolved: 42 },
    { id: '5', name: 'أحمد كمال', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 4, max: 15, rating: '4.7', resolved: 22 },
    { id: '6', name: 'نور الشناوي', dept: 'Sales & Conversion', role: 'Specialist', status: 'AWAY', active: 2, max: 15, rating: '4.8', resolved: 19 },
    { id: '7', name: 'محمود الباز', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 26 },
    { id: '8', name: 'فاطمة زكي', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 24 },
    { id: '9', name: 'خالد منصور', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 3, max: 15, rating: '4.7', resolved: 18 },
    { id: '10', name: 'ياسمين حسن', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 33 },
    { id: '11', name: 'كريم عثمان', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 20 },
    { id: '12', name: 'هدى شاكر', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.9', resolved: 29 },
    { id: '13', name: 'مصطفى صلاح', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.8', resolved: 27 },
    { id: '14', name: 'دينا فاروق', dept: 'Sales & Conversion', role: 'Specialist', status: 'AWAY', active: 1, max: 15, rating: '4.7', resolved: 14 },
    { id: '15', name: 'علي إبراهيم', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.9', resolved: 25 },
    { id: '16', name: 'رنا رمضان', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 7, max: 15, rating: '5.0', resolved: 38 },
    { id: '17', name: 'إبراهيم نجيب', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 21 },
    { id: '18', name: 'منى حمدي', dept: 'Sales & Conversion', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 30 },
    
    // Support Fleet
    { id: '19', name: 'طارق جمال', dept: 'Customer Support', role: 'Team Lead', status: 'ONLINE', active: 8, max: 15, rating: '4.9', resolved: 45 },
    { id: '20', name: 'سلمى فتحي', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.8', resolved: 36 },
    { id: '21', name: 'هيثم عبد الله', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 7, max: 15, rating: '4.7', resolved: 31 },
    { id: '22', name: 'أميرة سامي', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.9', resolved: 29 },
    { id: '23', name: 'ماجد توفيق', dept: 'Customer Support', role: 'Specialist', status: 'AWAY', active: 2, max: 15, rating: '4.6', resolved: 18 },
    { id: '24', name: 'ريم زهران', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.8', resolved: 32 },
    { id: '25', name: 'وائل الديب', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 37 },
    { id: '26', name: 'شروق النجار', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 23 },
    { id: '27', name: 'سامح نبيل', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.7', resolved: 27 },
    { id: '28', name: 'رانيا ممدوح', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 34 },
    { id: '29', name: 'شريف علام', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 8, max: 15, rating: '5.0', resolved: 41 },
    { id: '30', name: 'بسمة عادل', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 26 },
    { id: '31', name: 'مروان يحيى', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 4, max: 15, rating: '4.7', resolved: 22 },
    { id: '32', name: 'نجلاء مراد', dept: 'Customer Support', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 35 },

    // VIP Fleet
    { id: '33', name: 'تامر سراج', dept: 'VIP & High-Ticket', role: 'Team Lead', status: 'ONLINE', active: 4, max: 10, rating: '5.0', resolved: 18 },
    { id: '34', name: 'هالة بركات', dept: 'VIP & High-Ticket', role: 'Specialist', status: 'ONLINE', active: 3, max: 10, rating: '4.9', resolved: 15 },
    { id: '35', name: 'أشرف عبد الرحيم', dept: 'VIP & High-Ticket', role: 'Specialist', status: 'ONLINE', active: 5, max: 10, rating: '5.0', resolved: 22 },
    { id: '36', name: 'غادة سمير', dept: 'VIP & High-Ticket', role: 'Specialist', status: 'ONLINE', active: 3, max: 10, rating: '4.9', resolved: 14 },
    { id: '37', name: 'حسام غالي', dept: 'VIP & High-Ticket', role: 'Specialist', status: 'ONLINE', active: 4, max: 10, rating: '5.0', resolved: 19 },
    { id: '38', name: 'مروة صبري', dept: 'VIP & High-Ticket', role: 'Specialist', status: 'ONLINE', active: 2, max: 10, rating: '4.8', resolved: 12 },
    { id: '39', name: 'رامي الجيار', dept: 'VIP & High-Ticket', role: 'Specialist', status: 'AWAY', active: 1, max: 10, rating: '4.9', resolved: 9 },
    { id: '40', name: 'داليا قاسم', dept: 'VIP & High-Ticket', role: 'Specialist', status: 'ONLINE', active: 4, max: 10, rating: '5.0', resolved: 20 },

    // Escalations & Claims
    { id: '41', name: 'زياد بدر', dept: 'Escalations & Claims', role: 'Team Lead', status: 'ONLINE', active: 5, max: 8, rating: '4.9', resolved: 16 },
    { id: '42', name: 'نهى خيري', dept: 'Escalations & Claims', role: 'Specialist', status: 'ONLINE', active: 4, max: 8, rating: '4.8', resolved: 14 },
    { id: '43', name: 'حازم فؤاد', dept: 'Escalations & Claims', role: 'Specialist', status: 'ONLINE', active: 6, max: 8, rating: '4.9', resolved: 19 },
    { id: '44', name: 'لبنى سليم', dept: 'Escalations & Claims', role: 'Specialist', status: 'ONLINE', active: 3, max: 8, rating: '4.7', resolved: 11 },
    { id: '45', name: 'مدحت صادق', dept: 'Escalations & Claims', role: 'Specialist', status: 'ONLINE', active: 5, max: 8, rating: '4.8', resolved: 15 },
    { id: '46', name: 'شيرين عزمي', dept: 'Escalations & Claims', role: 'Specialist', status: 'ONLINE', active: 4, max: 8, rating: '4.9', resolved: 13 },

    // Logistics & Dispatch
    { id: '47', name: 'وليد خليل', dept: 'Logistics & Dispatch', role: 'Team Lead', status: 'ONLINE', active: 7, max: 15, rating: '4.8', resolved: 38 },
    { id: '48', name: 'إنجي وجدي', dept: 'Logistics & Dispatch', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 33 },
    { id: '49', name: 'أيمن لطفي', dept: 'Logistics & Dispatch', role: 'Specialist', status: 'ONLINE', active: 5, max: 15, rating: '4.7', resolved: 28 },
    { id: '50', name: 'شادي محروس', dept: 'Logistics & Dispatch', role: 'Specialist', status: 'ONLINE', active: 8, max: 15, rating: '4.9', resolved: 42 },
    { id: '51', name: 'مي عيسى', dept: 'Logistics & Dispatch', role: 'Specialist', status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 24 },
    { id: '52', name: 'عصام عبد الفتاح', dept: 'Logistics & Dispatch', role: 'Specialist', status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 31 }
  ];

  const filtered = fleetData.filter(agent => {
    const matchesDept = selectedDept === 'ALL' || agent.dept === selectedDept;
    const matchesSearch = agent.name.includes(search) || agent.dept.includes(search);
    return matchesDept && matchesSearch;
  });

  const totalActiveChats = fleetData.reduce((sum, a) => sum + a.active, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8" dir="rtl">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-7 h-7 text-emerald-400" />
            مركز إدارة وتوزيع الفريق والإيجنتس (52 Active Agents)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            مراقبة وتوزيع الحمل الذكي (Smart Load Balancing) لأكثر من 50 إيجنت يخدمون مئات العملاء لحظياً
          </p>
        </div>

        <Link
          href="/inbox"
          className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة لصندوق الوارد</span>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">إجمالي قوة الأسطول</span>
          <div className="text-2xl font-extrabold text-white mt-1">52 إيجنت متخصص</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">48 متصل حالياً (Live)</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">المحادثات النشطة قيد المعالجة</span>
          <div className="text-2xl font-extrabold text-white mt-1">{totalActiveChats} عميل متزامن</div>
          <span className="text-[11px] text-teal-400 mt-1 block">موزعة بالتساوي بمتوسط 5 محادثات/إيجنت</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">نسبة إشغال السعة الكلية</span>
          <div className="text-2xl font-extrabold text-white mt-1">36.5%</div>
          <span className="text-[11px] text-blue-400 mt-1 block">تتسع لأكثر من 750 محادثة متزامنة</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">متوسط تقييم رضا العملاء</span>
          <div className="text-2xl font-extrabold text-white mt-1 flex items-center gap-1.5">
            <span>4.88</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">بناءً على 1,420 تقييم اليوم</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['ALL', 'Sales & Conversion', 'Customer Support', 'VIP & High-Ticket', 'Escalations & Claims', 'Logistics & Dispatch'].map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                selectedDept === dept
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {dept === 'ALL' ? 'الكل (52)' : dept}
            </button>
          ))}
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          <input
            type="text"
            placeholder="بحث عن إيجنت بالاسم أو التخصص..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Agents Grid (50+ Cards) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(agent => (
          <div key={agent.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-emerald-400">
                    {agent.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                    <p className="text-[11px] text-slate-400">{agent.role}</p>
                  </div>
                </div>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${agent.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 mb-4">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">القسم:</span>
                  <span className="font-medium text-emerald-400">{agent.dept}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">المحادثات الحالية:</span>
                  <span className="font-bold text-white">{agent.active} / {agent.max}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">أُنجز اليوم:</span>
                  <span className="font-semibold text-slate-200">{agent.resolved} عميل</span>
                </div>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-2 border border-slate-800">
                <div 
                  className={`h-full rounded-full ${agent.active > 10 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${(agent.active / agent.max) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>الحمل: {Math.round((agent.active / agent.max) * 100)}%</span>
                <span className="flex items-center gap-1 text-amber-400">
                  ★ {agent.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
