import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07040D] text-white selection:bg-[#7C3AED] font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white">Coach<span className="text-[#7C3AED]">PRB</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="/dashboard" className="hover:text-white transition">لوحة الكوتش</Link>
            <Link href="/quiz" className="hover:text-white transition">استبيان التقييم</Link>
            <Link href="/pricing" className="hover:text-white transition">الباقات</Link>
          </div>
          <Link href="/dashboard" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            ابدأ الآن
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#a78bfa] text-sm font-medium mb-8">
            <Zap size={16} /> المنصة الأولى لتدريب الأبطال في الشرق الأوسط
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            ودّع فوضى الإكسل. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#a78bfa]">
              درّب أبطالك باحترافية.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            منصة CoachPRB توفر للمدربين والرياضيين جداول تمرين تفاعلية، حساب دقيق للماكروز، 
            ونظام فحص تكنيك (Form Check) متطور. كل ما تحتاجه في مكان واحد.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quiz" className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2">
              ابدأ تجربتك المجانية <ArrowLeft size={20} />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
              لوحة تحكم الكوتش
            </Link>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-[#7C3AED]/50 transition-colors group">
            <div className="w-12 h-12 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center text-[#7C3AED] mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">PWA سريع للمتدرب</h3>
            <p className="text-gray-400 leading-relaxed text-sm">تطبيق خفيف يفتح من المتصفح مباشرة، يعمل بدون إنترنت ويسجل التمارين بسلاسة.</p>
          </div>

          <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-[#7C3AED]/50 transition-colors group">
            <div className="w-12 h-12 bg-[#10B981]/10 rounded-2xl flex items-center justify-center text-[#10B981] mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">حماية المفاصل والإصابات</h3>
            <p className="text-gray-400 leading-relaxed text-sm">نظام ذكي يستبعد التمارين الخطرة تلقائياً بناءً على سجل إصابات المتدرب.</p>
          </div>

          <div className="bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-[#7C3AED]/50 transition-colors group">
            <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center text-[#3B82F6] mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">فحص التكنيك (Form Check)</h3>
            <p className="text-gray-400 leading-relaxed text-sm">ارفع فيديو تمرينك، والكوتش يعلق بالصوت على الثانية المحددة لتصحيح وضعيتك.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
