import Link from "next/link";
import { Bot, ScanEye, KanbanSquare, ArrowLeft, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e0918] text-white" dir="rtl">
      {/* Hero */}
      <section className="relative px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">
              منصة خدمة العملاء الأولى بالذكاء الاصطناعي
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            ضاعف مبيعات متجرك مع{" "}
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent font-semibold">
              أسطول من الإيجنتس الأذكياء
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            أتمت خدمة العملاء، افحص تحويلات إنستاباي بالرؤية البصرية، واستخرج
            الأوردرات بضغطة زر. كل ده في منصة واحدة.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl text-white font-semibold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(30deg, #fd8925, #ff0c00)",
                boxShadow: "0 0 40px rgba(255, 60, 0, 0.4)",
              }}
            >
              🚀 ابدأ مجاناً الآن
            </Link>
            <Link
              href="/inbox"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
            >
              📺 شاهد الديمو
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto">
            {[
              { value: "0", label: "جنيه رسوم تأسيس" },
              { value: "+800", label: "متجر يثق بنا" },
              { value: "+60", label: "ميزة في مكان واحد" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#1a1624] border border-[#3e3a46]"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16">
            كل ما تحتاجه في مكان واحد
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: "10 إيجنتس أذكياء",
                desc: "مبيعات، كاشير، شحن، شكاوى - كلهم يفهمون العامية المصرية.",
              },
              {
                icon: ScanEye,
                title: "Vision AI",
                desc: "افحص سكرينات إنستاباي وفودافون كاش في ثانيتين.",
              },
              {
                icon: KanbanSquare,
                title: "CRM Pipeline",
                desc: "تابع الأوردرات من 'معلق' لـ 'تم التسليم' بضغطة زر.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-[#1a1624] border border-[#3e3a46] hover:border-purple-500/50 transition-all"
              >
                <f.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-purple-600/20 to-orange-600/20 border border-purple-500/30">
          <h2 className="text-3xl md:text-5xl font-light mb-6">
            جاهز تضاعف مبيعاتك؟
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            باقات تبدأ من 650 ج.م/شهر
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all"
            style={{
              background: "linear-gradient(30deg, #fd8925, #ff0c00)",
            }}
          >
            عرض كل الباقات <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500">
        <p>© 2025 PR Agent - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}
