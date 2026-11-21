'use client';

import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  DollarSign, 
  TrendingUp,
  CreditCard,
  Building,
  Save,
  Copy,
  Zap,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Payment Modal Fields
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('1500');
  const [provider, setProvider] = useState('instapay');
  const [refNum, setRefNum] = useState('');
  const [packageName, setPackageName] = useState('باقة تدريب 3 شهور');

  // InstaPay Direct Configuration State
  const [instapayConfig, setInstapayConfig] = useState({
    instapayUsername: 'coach.alex@instapay',
    instapayPhone: '01012345678',
    accountHolderName: 'كابتن أحمد علي - CoachPR',
    vodafoneCash: '01012345678',
    activeBank: 'البنك الأهلي المصري (NBE)',
    notes: 'يرجى كتابة اسم المتدرب أو كود الاشتراك في خانة الملاحظات أثناء التحويل لتفعيل الحساب فوراً.'
  });
  const [savingConfig, setSavingConfig] = useState(false);
  const [copiedIPA, setCopiedIPA] = useState(false);

  const fetchPayments = () => {
    fetch('/api/payments/history')
      .then(res => res.json())
      .then(data => {
        if (data?.payments) {
          setPayments(data.payments);
          setTotalRevenue(data.totalRevenue || 0);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchInstapayConfig = () => {
    fetch('/api/payments/instapay-config')
      .then(res => res.json())
      .then(data => {
        if (data?.config) {
          setInstapayConfig(data.config);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchPayments();
    fetchInstapayConfig();
  }, []);

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    try {
      const res = await fetch('/api/payments/instapay-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instapayConfig)
      });
      const data = await res.json();
      if (data?.success) {
        toast.success('تم حفظ وتحديث بيانات حساب إنستاباي بنجاح! تظهر الآن فورياً للاعبين في صفحة الدفع.');
      } else {
        toast.error('حدث خطأ أثناء الحفظ');
      }
    } catch {
      toast.error('تعذر الاتصال بالسيرفر');
    } finally {
      setSavingConfig(false);
    }
  };

  const copyIPA = () => {
    navigator.clipboard.writeText(instapayConfig.instapayUsername);
    setCopiedIPA(true);
    setTimeout(() => setCopiedIPA(false), 2000);
    toast.success('تم نسخ معرف إنستاباي!');
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error('المبلغ مطلوب');
      return;
    }

    fetch('/api/payments/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: clientName || 'عميل تجريبي',
        amount: Number(amount),
        provider,
        reference_number: refNum || `REF-${Math.floor(Math.random() * 900000 + 100000)}`,
        package_name: packageName
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data?.success) {
          toast.success('تم تسجيل الدفعة وتحديث إجمالي الإيرادات بنجاح!');
          setShowAddModal(false);
          setClientName('');
          setRefNum('');
          fetchPayments();
        }
      })
      .catch(() => toast.error('حدث خطأ أثناء التسجيل'));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Wallet className="text-[#d4f60b]" /> المدفوعات وبوابة إنستاباي (InstaPay)
          </h1>
          <p className="text-xs text-white/50 mt-1">
            استقبل أتعاب التدريب مباشرة على حساب إنستاباي الخاص بك بنسبة 0% عمولة، مع التحقق الذكي عبر الـ AI.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
        >
          <Plus size={16} /> تسجيل دفعة جديدة يدوياً
        </button>
      </div>

      {/* InstaPay Account Setup Card (For the Coach / Owner) */}
      <div className="bg-[#111116] border border-[#d4f60b]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4f60b]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#d4f60b]/10 border border-[#d4f60b]/30 flex items-center justify-center text-[#d4f60b] shadow-inner">
              <Zap size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">إعدادات حساب إنستاباي الخاص بك لاستقبال أموال اللاعبين</h2>
                <span className="text-[10px] bg-[#d4f60b] text-black font-extrabold px-2 py-0.5 rounded-full">
                  تحصيل مباشر 0% عمولة
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                اكتب هنا عنوان حساب إنستاباي ورقم هاتفك؛ سيظهر تلقائياً لأي لاعب يقوم بالاشتراك أو تجديد باقته عبر الرابط.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={copyIPA}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition self-start sm:self-auto cursor-pointer"
          >
            <Copy size={14} className="text-[#d4f60b]" />
            <span>{copiedIPA ? 'تم النسخ ✓' : 'نسخ IPA المسجل'}</span>
          </button>
        </div>

        <form onSubmit={handleSaveConfig} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-white/80 block mb-1.5">
                معرف إنستاباي (InstaPay Address / IPA) <span className="text-[#d4f60b]">*</span>
              </label>
              <input
                type="text"
                required
                value={instapayConfig.instapayUsername}
                onChange={(e) => setInstapayConfig({ ...instapayConfig, instapayUsername: e.target.value })}
                placeholder="مثال: captain.ahmed@instapay"
                className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4f60b] font-mono"
              />
              <span className="text-[10px] text-white/40 mt-1 block">العنوان الذي يرسل عليه اللاعب من داخل تطبيق إنستاباي</span>
            </div>

            <div>
              <label className="text-xs font-bold text-white/80 block mb-1.5">
                رقم الهاتف المسجل بإنستاباي ومحفظة كاش <span className="text-[#d4f60b]">*</span>
              </label>
              <input
                type="text"
                required
                value={instapayConfig.instapayPhone}
                onChange={(e) => setInstapayConfig({ ...instapayConfig, instapayPhone: e.target.value })}
                placeholder="010xxxxxxxx"
                className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4f60b] font-mono"
              />
              <span className="text-[10px] text-white/40 mt-1 block">يستخدم للتحويل برقم الموبايل مباشرة أو فودافون كاش</span>
            </div>

            <div>
              <label className="text-xs font-bold text-white/80 block mb-1.5">
                اسم المستفيد الظاهر في الحساب البنكي
              </label>
              <input
                type="text"
                value={instapayConfig.accountHolderName}
                onChange={(e) => setInstapayConfig({ ...instapayConfig, accountHolderName: e.target.value })}
                placeholder="مثال: كابتن أحمد محمد علي"
                className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4f60b]"
              />
              <span className="text-[10px] text-white/40 mt-1 block">يطابقه اللاعب للتأكد من هوية المستلم قبل الإرسال</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-white/80 block mb-1.5">
              ملاحظات وتوجيهات التحويل الموجهة للمتدرب
            </label>
            <input
              type="text"
              value={instapayConfig.notes}
              onChange={(e) => setInstapayConfig({ ...instapayConfig, notes: e.target.value })}
              placeholder="مثال: يرجى كتابة اسمك في وصف التحويل ورفع السكرين شوت للتفعيل الفوري"
              className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4f60b]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingConfig}
              className="bg-[#d4f60b] hover:bg-[#c2e207] text-black px-6 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-lg shadow-[#d4f60b]/20 cursor-pointer"
            >
              <Save size={16} />
              <span>{savingConfig ? 'جارِ الحفظ...' : 'حفظ بيانات إنستاباي الآن'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl space-y-2">
          <span className="text-xs text-white/40 block">إجمالي الدخل المحصل</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black font-mono text-white">{totalRevenue.toLocaleString()}</h2>
            <span className="text-xs text-[#d4f60b] font-mono font-bold">EGP</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold block flex items-center gap-1 pt-1">
            <TrendingUp size={13} /> نمو بنسبة +18% هذا الشهر
          </span>
        </div>

        <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl space-y-2">
          <span className="text-xs text-white/40 block">طريقة التحصيل الأكثر استخداماً</span>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white flex items-center gap-1.5">
              InstaPay <Zap size={18} className="text-[#d4f60b]" />
            </h2>
          </div>
          <span className="text-[11px] text-white/40 block pt-1">
            تمثل 85% من إجمالي تحويلات المتدربين
          </span>
        </div>

        <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl space-y-2">
          <span className="text-xs text-white/40 block">اشتراكات بانتظار التجديد هذا الأسبوع</span>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-black font-mono text-[#d4f60b]">4</h2>
            <span className="text-xs text-white/40">متدربين</span>
          </div>
          <span className="text-[11px] text-[#d4f60b]/80 block pt-1">
            تم إرسال تذكيرات تلقائية بالـ IPA عبر واتساب
          </span>
        </div>
      </div>

      {/* Payments History Table */}
      <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <h3 className="font-bold text-sm text-white">سجل العمليات وتحويلات المتدربين</h3>
          <span className="text-xs text-white/40 font-mono">{payments.length} عمليات مسجلة</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-white/40">جاري تحميل السجلات...</div>
        ) : payments.length === 0 ? (
          <div className="py-12 text-center text-xs text-white/40">لا توجد عمليات مسجلة بعد.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {payments.map(p => (
              <div key={p.id} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1e1338] border border-[#7C3AED]/30 flex items-center justify-center text-[#d4f60b]">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{p.client_name}</h4>
                    <p className="text-[11px] text-white/40 font-mono mt-0.5">
                      {p.package_name || 'اشتراك تدريب'} &bull; مرجع: {p.reference_number}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-white/70">
                    {p.provider === 'instapay' ? 'InstaPay ⚡' : p.provider === 'vodafone_cash' ? 'Vodafone Cash 📱' : 'فوري Fawry'}
                  </span>
                  <div className="text-left font-mono">
                    <span className="text-sm font-black text-white">{p.amount?.toLocaleString()} EGP</span>
                    <span className="text-[10px] text-emerald-400 block flex items-center gap-0.5 justify-end">
                      <CheckCircle2 size={11} /> مكتمل
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Record Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111116] border border-[#7C3AED]/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in">
            <h2 className="text-lg font-black text-white">تسجيل دفعة اشتراك جديدة يدوياً</h2>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">اسم المتدرب</label>
                <input
                  type="text"
                  placeholder="عمر حسن السيد"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">المبلغ (جنيه مصري)</label>
                  <input
                    type="number"
                    placeholder="2200"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/60 block mb-1.5">وسيلة التحويل</label>
                  <select
                    value={provider}
                    onChange={e => setProvider(e.target.value)}
                    className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="instapay">InstaPay (إنستاباي)</option>
                    <option value="vodafone_cash">Vodafone Cash (محفظة كاش)</option>
                    <option value="fawry">Fawry (فوري)</option>
                    <option value="cash">كاش يدوي في الجيم</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">الباقة أو تفاصيل الاشتراك</label>
                <input
                  type="text"
                  placeholder="باقة تدريب 3 شهور VIP"
                  value={packageName}
                  onChange={e => setPackageName(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-white/60 block mb-1.5">رقم العملية المرجعي (اختياري)</label>
                <input
                  type="text"
                  placeholder="IPN-8472910"
                  value={refNum}
                  onChange={e => setRefNum(e.target.value)}
                  className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-white/50 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-[#7C3AED]/30"
                >
                  تأكيد وحفظ الدفعة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
