import Link from "next/link";
import { Bot, ScanEye, KanbanSquare, ArrowLeft, Sparkles, CheckCircle2, Star, Zap, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e0918] text-white" dir="rtl">
      
      {/* 1. Header / Navbar with Professional Logo */}
      <header className="border-b border-[#251f33] px-6 py-5 max-w-[1280px] mx-auto flex items-center justify-between">
        <Logo showSubtitle={true} size="md" />

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/flows" className="text-gray-400 hover:text-white transition-colors">المسارات التفاعلية</Link>
          <Link href="/pipeline" className="text-gray-400 hover:text-white transition-colors">إدارة المبيعات (CRM)</Link>
          <Link href="/fleet" className="text-gray-400 hover:text-white transition-colors">أسطول الإيجنتس</Link>
          <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">الباقات والأسعار</Link>
          <Link href="/settings" className="text-gray-400 hover:text-white transition-colors">الإعدادات</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/inbox"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-orange-950/40 hover:scale-105 transition-all"
            style={{
              background: "linear-gradient(30deg, #fd8925, #ff0c00)",
            }}
          >
            دخول المنصة 🚀
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative px-6 pt-20 pb-24 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">
              منصة خدمة العملاء الأولى بالذكاء الاصطناعي في مصر والشرق الأوسط
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tight">
            ضاعف مبيعات متجرك مع{" "}
            <span className="bg-gradient-to-r from-purple-400 via-orange-300 to-orange-400 bg-clip-text text-transparent font-semibold">
              أسطول من الإيجنتس الأذكياء
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-extralight">
            أتمتة كاملة للرد على تعليقات إنستجرام (Comment-to-DM)، فحص إيصالات إنستاباي بالرؤية البصرية،
            وتوزيع الأوردرات في CRM Pipeline فوري دون أي تأخير على العميل.
          </p>

          <div className="flex gap-4 justify-center flex-wrap mb-16">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl text-white font-semibold transition-all hover:scale-105 shadow-xl shadow-orange-900/30"
              style={{
                background: "linear-gradient(30deg, #fd8925, #ff0c00)",
              }}
            >
              🚀 ابدأ مجاناً الآن
            </Link>
            <Link
              href="/inbox"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
            >
              📺 معاينة لوحة التحكم
            </Link>
          </div>

          {/* 3. Product Live Workspace Preview (Inbox Screenshot Simulation) */}
          <div className="relative mx-auto max-w-5xl rounded-3xl p-3 bg-gradient-to-b from-purple-500/30 via-[#1a1624]/60 to-[#0e0918] border border-purple-500/30 shadow-2xl shadow-purple-950/60">
            <div className="rounded-2xl bg-[#0e0918] border border-[#2b2538] overflow-hidden text-right">
              {/* Fake Browser Toolbar */}
              <div className="px-4 py-3 border-b border-[#251f33] bg-[#140f20] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono text-gray-400 px-6 py-1 rounded-lg bg-[#0e0918] border border-[#2b2538]">
                  https://pr-agent-ai.vercel.app/inbox
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE REALTIME
                </div>
              </div>

              {/* Fake Live Inbox Layout Preview */}
              <div className="grid grid-cols-12 h-[340px] text-xs">
                {/* Chat list */}
                <div className="col-span-4 border-l border-[#251f33] bg-[#110c1c] p-3 space-y-2">
                  <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-white">
                    <div className="flex justify-between font-semibold"><span>@salma_style</span><span className="text-[10px] text-purple-300">الآن</span></div>
                    <div className="text-gray-300 truncate mt-1">بكام وسعر الشحن كام؟</div>
                    <div className="text-[10px] text-purple-300 mt-1">🤖 تم الرد عبر إنستجرام DM</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#171224] border border-[#251f33] text-gray-300">
                    <div className="flex justify-between font-semibold"><span>عميل واتساب (5678)</span><span className="text-[10px] text-gray-500">14:12</span></div>
                    <div className="text-gray-400 truncate mt-1">تم تحويل 1,450 ج.م ومرفق الإيصال</div>
                    <div className="text-[10px] text-emerald-400 mt-1">✓ إيصال إنستاباي معتمد (Vision AI)</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#171224] border border-[#251f33] text-gray-300">
                    <div className="flex justify-between font-semibold"><span>محمد طارق</span><span className="text-[10px] text-gray-500">13:45</span></div>
                    <div className="text-gray-400 truncate mt-1">عايز أطلب كود خصم للقطعتين</div>
                    <div className="text-[10px] text-orange-400 mt-1">🤖 سارة طارق (Sales Lead)</div>
                  </div>
                </div>

                {/* Chat messages viewport */}
                <div className="col-span-8 p-4 flex flex-col justify-between bg-[#0e0918]">
                  <div className="space-y-3">
                    <div className="text-left">
                      <div className="inline-block p-3 rounded-2xl bg-[#1e182d] text-gray-200 border border-[#2e2642] max-w-sm">
                        [تعليق إنستجرام على ريلز #102]: بكام وسعر الشحن كام؟
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-block p-3 rounded-2xl bg-purple-600 text-white max-w-md shadow-lg shadow-purple-900/30">
                        أهلاً بيك يا فندم! 🌸 بخصوص الأسعار، كل المنتجات وتفاصيلها وخصومات النهاردة موجودة في الكتالوج هنا، والتوصيل متاح لجميع المحافظات خلال 24 لـ 48 ساعة مع كود خصم PR10.
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center font-mono">
                      ✓ [كريم ممدوح - Vision AI]: تم فحص ومطابقة إيصال إنستاباي بمبلغ 1,450 ج.م بنجاح
                    </div>
                  </div>
                  <div className="border-t border-[#251f33] pt-2 flex items-center justify-between text-gray-400">
                    <span>الرد الآلي مفعل بواسطة أسطول 10 إيجنتس</span>
                    <Link href="/inbox" className="text-purple-400 hover:underline">افتح صندوق الوارد الكامل ←</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Trusted By Brands Strip */}
          <div className="mt-20 pt-10 border-t border-white/5">
            <span className="text-xs uppercase tracking-widest text-gray-500 block mb-6 font-semibold">
              موثوق من قبل أكثر من 800+ متجر إلكتروني وبراند في مصر
            </span>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="text-lg font-bold text-gray-300 tracking-wider">LAVENDER FASHION</span>
              <span className="text-lg font-bold text-gray-300 tracking-wider">CAIRO KICKS</span>
              <span className="text-lg font-bold text-gray-300 tracking-wider">URBAN WEAR EG</span>
              <span className="text-lg font-bold text-gray-300 tracking-wider">GLOW COSMETICS</span>
              <span className="text-lg font-bold text-gray-300 tracking-wider">ALEX JEWELRY</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            {[
              { value: "0", label: "جنيه رسوم تأسيس وربط" },
              { value: "+800", label: "متجر يضاعف مبيعاته معنا" },
              { value: "3 ثوانٍ", label: "متوسط سرعة الرد على التعليقات" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#1a1624] border border-[#3e3a46]"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Features Section */}
      <section className="px-6 py-20 border-t border-white/5 bg-[#120d1f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider block mb-2">قدرات ذكية فائقة</span>
            <h2 className="text-4xl font-light text-white">كل ما يحتاجه متجرك ليعمل ذاتياً 24/7</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "10 إيجنتس مستقلين",
                desc: "سارة للمبيعات، منى لإنستجرام، كريم للتحصيلات، كابتن هيثم للشحن، وطارق للسلات المتروكة.",
              },
              {
                icon: ScanEye,
                title: "Vision AI لإنستاباي",
                desc: "فحص فوري لسكرينات إنستاباي وفودافون كاش لمنع النصب والتأكد من استلام المبلغ في ثوانٍ.",
              },
              {
                icon: KanbanSquare,
                title: "CRM Pipeline كانبان",
                desc: "تتبع كل أوردر من أول تعليق حتى التسليم لشركة الشحن، مع مزامنة مع Webhooks و Google Sheets.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-[#1a1624] border border-[#3e3a46] hover:border-purple-500/50 transition-all text-right space-y-4"
              >
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 inline-block">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-extralight">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section (Real Social Proof) */}
      <section className="px-6 py-24 max-w-6xl mx-auto text-right">
        <div className="text-center mb-16">
          <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider block mb-2">تجارب حقيقية</span>
          <h2 className="text-4xl font-light text-white">ماذا يقول أصحاب المتاجر عن PR Agent؟</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "خاصية Comment-to-DM خلتنا نرد في 3 ثواني على أي ريلز ينزل، المبيعات زادت بنسبة 45% في أول أسبوعين بدون ما نعين موظف جديد.",
              author: "م/ أحمد زهران",
              role: "مؤسس براند ملابس بالقاهرة",
              rating: 5
            },
            {
              quote: "كنا بنتعرض لعمليات نصب بإيصالات إنستاباي مفبركة بالفوتوشوب. إيجنت كريم ممدوح فحص كل تحويل وأنقذنا من خسارة آلاف الجنيهات.",
              author: "سارة خليل",
              role: "مديرة مبيعات متجر إلكترونيات",
              rating: 5
            },
            {
              quote: "وفرنا راتب 3 موظفين خدمة عملاء للشفت الليلي، والـ Uptime مستمر 24 ساعة دون أي شكوى أو تأخير في استلام الأوردرات.",
              author: "كريم عثمان",
              role: "صاحب متجر مستحضرات تجميل",
              rating: 5
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#1a1624] border border-[#3e3a46] space-y-4">
              <div className="flex items-center gap-1 text-orange-400">
                {[...Array(item.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-orange-400" />
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-extralight">
                &quot;{item.quote}&quot;
              </p>
              <div className="pt-4 border-t border-white/10">
                <span className="text-sm font-semibold text-white block">{item.author}</span>
                <span className="text-xs text-gray-500 block">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-orange-600/20 border border-purple-500/30">
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            جاهز تضاعف مبيعات متجرك وتوفر تكاليف التشغيل؟
          </h2>
          <p className="text-gray-300 mb-8 text-lg font-extralight">
            باقات تبدأ من 650 ج.م/شهر فقط مع ضمان استرجاع الأموال 14 يوماً.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all shadow-xl shadow-orange-900/40"
            style={{
              background: "linear-gradient(30deg, #fd8925, #ff0c00)",
            }}
          >
            عرض كل الباقات والأسعار <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-white/10 py-12 px-6 max-w-[1280px] mx-auto text-center text-gray-500 text-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Logo size="sm" />
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">عن المنصة</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">الأسعار</Link>
            <Link href="/settings" className="hover:text-white transition-colors">الإعدادات</Link>
            <Link href="/contact" className="hover:text-white transition-colors">تواصل معنا</Link>
          </div>
        </div>
        <p>© 2026 PR Agent — منصة خدمة العملاء والتجارة الذكية بالذكاء الاصطناعي. جميع الحقوق محفوظة.</p>
      </footer>

    </div>
  );
}
