import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { 
  Bot, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  TrendingUp, 
  CreditCard 
} from 'lucide-react';

export const metadata = {
  title: 'PR Agent | منصة خدمة العملاء الذكية وأتمتة المبيعات للتجارة الإلكترونية',
  description: 'إيجنت ذكاء اصطناعي سعودي ومصري متخصص في إغلاق المبيعات، الرد الفوري على تعليقات إنستجرام، وتدقيق إيصالات إنستاباي بنسبة 100% بدون تدخل بشري.',
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PR Agent",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "650",
      "priceCurrency": "EGP"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <div className="min-h-screen bg-[#07040D] text-white selection:bg-indigo-600 font-sans" dir="rtl">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo size="md" />

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="/inbox" className="hover:text-white transition">صندوق الوارد الموحد</Link>
            <Link href="/fleet" className="hover:text-white transition">أسطول الإيجنتس</Link>
            <Link href="/pipeline" className="hover:text-white transition">مراحل الطلبات (CRM)</Link>
            <Link href="/pricing" className="hover:text-white transition">الأسعار</Link>
            <Link href="/settings" className="hover:text-white transition">الإعدادات</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/inbox" 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center gap-2"
            >
              <span>دخول المنصة</span>
              <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-28">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-8">
            <Sparkles size={16} className="text-indigo-400" />
            المنصة الأولى لأتمتة مبيعات الشات في مصر والشرق الأوسط
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            ودّع بطء الرد وتشتت الشات. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              حوّل كل تعليق ورسالة لأوردر فوري.
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            منصة <strong className="text-white">PR Agent</strong> توفر لمتاجرك إيجنت ذكاء اصطناعي فاهم اللهجة المصرية والعربية، يرد في أقل من 3 ثوانٍ، يستخرج الأوردرات، ويدقق إيصالات إنستاباي بنظام الرؤية البصرية.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link 
              href="/inbox" 
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
            >
              ابدأ تجربتك المجانية <ArrowLeft size={20} />
            </Link>
            <Link 
              href="/pricing" 
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              استعرض الباقات (من 650 ج.م)
            </Link>
          </div>

          {/* Social Proof & Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/10 text-gray-400 text-sm">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>رد فوري &lt; 3 ثوانٍ</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>فحص إنستاباي بالذكاء البصري</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4 text-pink-400" />
              <span>Comment-to-DM أوتوماتيكي</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>+35% تحويل مبيعات</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">أسطول إيجنتس متخصص</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              10 إيجنتس مستقلين: من قناص التعليقات ومسؤول المبيعات إلى خبير استخراج العناوين واسترجاع السلات المتروكة.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">تدقيق إيصالات إنستاباي والمحافظ</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              تحليل سكرين شوت التحويل بالذكاء الاصطناعي (Gemini Vision) لمطابقة المبلغ ورقم العملية ومنع الاحتيال وتكرار الصور.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">راوتر ذكي متعدد النماذج (0$ تكلفة)</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              توجيه آلي للطلبات بين Groq Llama للسرعة الفائقة وGemini للرؤية مع Fallback محلي يضمن استمرارية الخدمة 100%.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <Logo size="sm" />
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-white transition">الأسعار</Link>
            <Link href="/privacy" className="hover:text-white transition">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition">شروط الخدمة</Link>
            <Link href="/settings" className="hover:text-white transition">الإعدادات</Link>
          </div>
          <div>© 2026 PR Agent. جميع الحقوق محفوظة.</div>
        </div>
      </footer>
    </div>
  );
}
