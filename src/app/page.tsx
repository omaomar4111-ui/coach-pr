import Link from "next/link";
import { Dumbbell, ShieldCheck, Activity, Users, ArrowLeft, Sparkles, CheckCircle2, Star, Zap, Flame, Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07040D] text-white selection:bg-purple-900 selection:text-white" dir="rtl">
      
      {/* 1. Header / Navbar with CoachPRB Logo */}
      <header className="border-b border-white/[0.06] px-6 py-5 max-w-[1280px] mx-auto flex items-center justify-between sticky top-0 bg-[#0A0514]/90 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] flex items-center justify-center shadow-lg shadow-purple-900/40">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-black text-xl tracking-wider text-white">
              COACH<span className="text-[#A78BFA]">PRB</span>
            </span>
            <span className="text-[10px] text-purple-300 block -mt-1 font-medium">سجّل رقمك. غيّر جسمك.</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/quiz" className="text-gray-400 hover:text-white transition-colors">استبيان التقييم (Intake)</Link>
          <Link href="/book" className="text-gray-400 hover:text-white transition-colors">حجز مكالمة استشارة</Link>
          <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">باقات التدريب</Link>
          <Link href="/apply" className="text-purple-400 hover:text-purple-300 transition-colors">ترشيح كوتش (Pilot)</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] shadow-lg shadow-purple-900/40 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>لوحة تحكم الكوتش</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative px-6 pt-20 pb-24 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/40 text-purple-300 text-xs font-semibold">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>منصة التدريب الرياضي والمتابعة الذكية الأولى في مصر والشرق الأوسط</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white">
            ودّع فوضى الإكسيل وشات الواتساب.{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              درّب أبطالك باحترافية كاملة.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            منصة CoachPRB توفر للمدربين والرياضيين جداول تمارين تفاعلية، حساب دقيق للماكروز والسعرات،
            فحص تكنيك التمارين (Form Check)، ونظام حماية المفاصل وسجل الإصابات.
          </p>

          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <Link
              href="/quiz"
              className="px-8 py-3.5 rounded-xl text-white font-bold text-sm bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] transition-all hover:scale-105 shadow-xl shadow-purple-900/40 flex items-center gap-2"
            >
              <span>ابدأ تقييمك الرياضي الآن 🚀</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span>لوحة الكوتش للمدربين</span>
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-20 text-right">
          <div className="p-6 rounded-2xl bg-[#0E081D] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">جداول تدريب وتغذية ذكية</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تصميم برامج التمرين (PPL, Upper/Lower, FST-7) محسوبة بالـ RPE وتحديد دقيق لجرامات البروتين والكارب والدهون.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E081D] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">حماية المفاصل وسجل الإصابات</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              نظام استبعاد تلقائي للتمارين الخطرة لمرضى الانزلاق الغضروفي وآلام الركبة والكتف مع اقتراح البدائل الآمنة.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0E081D] border border-white/[0.08] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">تطبيق PWA سريع للمتدرب</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تطبيق موبايل خفيف ومثبت على الآيفون والأندرويد لتسجيل أوزان التمرين ومتابعة الوجبات دون استهلاك ذاكرة الهاتف.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center text-xs text-slate-500">
        CoachPRB — المنصة المتكاملة لإدارة أبطال الكوتشينج الرياضي © 2026. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
