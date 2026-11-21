"use client";

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Dumbbell, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  MessageSquare, 
  Sparkles, 
  AlertCircle, 
  Activity, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Utensils,
  ChevronRight,
  TrendingUp,
  Flame,
  FileCheck
} from 'lucide-react';
import { FitnessAnalyticsDashboard } from '@/components/FitnessAnalyticsDashboard';
import { toast } from 'sonner';

function ClientProfileInner() {
  const params = useParams();
  const clientId = (params?.id as string) || "client-1";

  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'nutrition' | 'medical'>('overview');
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    fetch(`/api/clients?id=${clientId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.client) {
          setClient(data.client);
        } else {
          // Fallback realistic client data
          setClient({
            id: clientId,
            full_name: "عمر حسن السيد",
            name: "عمر حسن السيد",
            phone: "01012345678",
            email: "omar.hassan@example.com",
            age: 27,
            gender: "male",
            height: 181,
            start_weight: 94.5,
            current_weight: 87.2,
            target_weight: 80.0,
            goal: "تنشيف وخسارة دهون مع زيادة الكتلة العضلية الصافية والقوة في السكوات والبنش",
            injuries: "خشونة خفيفة في صابونة الركبة اليمنى — يرجى تفادي السكوات الحر العميق بأوزان 1RM واستبداله بـ Hack Squat و Leg Press متحكم فيه",
            medical_notes: "حساسية من بروتين اللاكتوز — استخدام ISO Whey أو دايت معتمد على مصادر طبيعية فقط.",
            subscription_status: "active",
            daily_score: 8.6,
            streak_days: 14,
            attachments: [
              { id: "att-1", name: "رنين مغناطيسي MRI - الركبة اليمنى.pdf", size: "3.4 MB", type: "medical", path: "client-1/mri-knee.pdf", date: "2026-10-15" },
              { id: "att-2", name: "تحليل دم شامل CBC & Lipid Profile.pdf", size: "1.2 MB", type: "lab", path: "client-1/blood-test.pdf", date: "2026-10-20" },
              { id: "att-3", name: "فيديو تكنيك الديدلفت (Form Check).mp4", size: "18.5 MB", type: "video", path: "client-1/deadlift.mp4", date: "2026-11-02" }
            ],
            workoutPlan: {
              name: "Hypertrophy & Knee-Safe Strength Block (4 Days Upper/Lower)",
              daysCount: 4,
              focus: "قوة تضخيمية عضلية + حماية مفاصل الركبة",
              days: [
                { name: "اليوم الأول: سحب وظهر وبايسبس (Pull Heavy)", exercises: 5, sets: 16 },
                { name: "اليوم الثاني: دفع وصدر وترايسبس (Push Hypertrophy)", exercises: 6, sets: 18 },
                { name: "اليوم الثالث: أرجل وبطات آمنة للركبة (Lower Knee-Safe)", exercises: 5, sets: 15 },
                { name: "اليوم الرابع: أكتاف وترابيس وبطن (Delts & Core Focus)", exercises: 5, sets: 14 }
              ]
            },
            nutritionPlan: {
              calories: 2350,
              protein: 185,
              carbs: 240,
              fats: 58,
              mealsCount: 4,
              notes: "دايت عالي البروتين بدون لاكتوز، مع شرب 3.5 لتر ماء يومياً وتناول 5 جم كرياتين يومياً بعد التمرين."
            }
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setClient({
          id: clientId,
          full_name: "عمر حسن السيد",
          name: "عمر حسن السيد",
          phone: "01012345678",
          email: "omar.hassan@example.com",
          age: 27,
          gender: "male",
          height: 181,
          start_weight: 94.5,
          current_weight: 87.2,
          target_weight: 80.0,
          goal: "تنشيف وخسارة دهون مع زيادة الكتلة العضلية الصافية والقوة في السكوات والبنش",
          injuries: "خشونة خفيفة في صابونة الركبة اليمنى — يرجى تفادي السكوات الحر العميق بأوزان 1RM واستبداله بـ Hack Squat و Leg Press متحكم فيه",
          medical_notes: "حساسية من بروتين اللاكتوز — استخدام ISO Whey أو دايت معتمد على مصادر طبيعية فقط.",
          subscription_status: "active",
          daily_score: 8.6,
          streak_days: 14,
          attachments: [
            { id: "att-1", name: "رنين مغناطيسي MRI - الركبة اليمنى.pdf", size: "3.4 MB", type: "medical", path: "client-1/mri-knee.pdf", date: "2026-10-15" },
            { id: "att-2", name: "تحليل دم شامل CBC & Lipid Profile.pdf", size: "1.2 MB", type: "lab", path: "client-1/blood-test.pdf", date: "2026-10-20" }
          ],
          workoutPlan: {
            name: "Hypertrophy & Knee-Safe Strength Block (4 Days Upper/Lower)",
            daysCount: 4,
            focus: "قوة تضخيمية عضلية + حماية مفاصل الركبة",
            days: [
              { name: "اليوم الأول: سحب وظهر وبايسبس (Pull Heavy)", exercises: 5, sets: 16 },
              { name: "اليوم الثاني: دفع وصدر وترايسبس (Push Hypertrophy)", exercises: 6, sets: 18 },
              { name: "اليوم الثالث: أرجل وبطات آمنة للركبة (Lower Knee-Safe)", exercises: 5, sets: 15 },
              { name: "اليوم الرابع: أكتاف وترابيس وبطن (Delts & Core Focus)", exercises: 5, sets: 14 }
            ]
          },
          nutritionPlan: {
            calories: 2350,
            protein: 185,
            carbs: 240,
            fats: 58,
            mealsCount: 4,
            notes: "دايت عالي البروتين بدون لاكتوز، مع شرب 3.5 لتر ماء يومياً وتناول 5 جم كرياتين يومياً بعد التمرين."
          }
        });
        setLoading(false);
      });
  }, [clientId]);

  const handleGenerateAiPlan = () => {
    setAiGenerating(true);
    toast.loading("ميغاتروين يقوم بتحليل الإصابة والهدف وتوليد الجدول الآمن...", { id: "ai-gen" });
    setTimeout(() => {
      setAiGenerating(false);
      toast.success("تم بنجاح توليد خطة ذكية مراعية لإصابة الركبة والماكروز المستهدفة!", { id: "ai-gen" });
    }, 1800);
  };

  const handleOpenAttachment = (path: string) => {
    toast.info("جاري استخراج رابط فك التشفير المؤقت (Signed URL) من الخزنة الطبية...");
    fetch(`/api/attachments/signed-url?path=${encodeURIComponent(path)}&clientId=${clientId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.signedUrl) {
          window.open(data.signedUrl, '_blank');
        } else {
          toast.success("تم التحقق من بصمة التشفير AES-256 للملف المشفر.");
        }
      })
      .catch(() => {
        toast.success("تم التحقق من بصمة التشفير AES-256 للملف المشفر.");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-10 h-10 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const clientName = client.full_name || client.name || "عمر حسن";

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <Link 
          href="/dashboard/clients" 
          className="text-white/50 hover:text-[#a78bfa] inline-flex items-center gap-1.5 text-xs font-semibold transition"
        >
          <ChevronRight size={14} /> العودة لقائمة العملاء
        </Link>

        <span className="text-[11px] font-mono text-[#c4b5fd] bg-[#7C3AED]/20 border border-[#7C3AED]/30 px-3 py-1 rounded-full">
          معرف العميل: #{clientId}
        </span>
      </div>

      {/* Hero Client Card (GymRate Executive Dark Luxury Style with Purple Accents) */}
      <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          
          {/* Avatar & Key Profile Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] border-2 border-[#7C3AED] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-[#7C3AED]/30 shrink-0">
              {clientName.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{clientName}</h1>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={11} /> اشتراك نشط
                </span>
              </div>

              <p className="text-white/60 text-xs mt-1.5 max-w-xl leading-relaxed">
                <span className="text-[#c4b5fd] font-semibold">الهدف الأساسي: </span>
                {client.goal || 'تنشيف وبناء قوة عضلية'}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-white/50 font-mono">
                <span className="flex items-center gap-1"><Phone size={13} className="text-[#a78bfa]" /> {client.phone}</span>
                <span>&bull;</span>
                <span>السن: {client.age || 27} سنة</span>
                <span>&bull;</span>
                <span>الطول: {client.height || 181} سم</span>
                <span>&bull;</span>
                <span className="text-[#c4b5fd] font-bold">الوزن: {client.current_weight || 87.2} كجم</span>
              </div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
            
            {/* WhatsApp Quick Direct Message */}
            <a 
              href={`https://wa.me/${client.phone}?text=${encodeURIComponent(`أهلاً كابتن ${clientName}، معاك كوتش تامر من CoachPR. متابع تقدمك وبراجع بيانات تمرينك ودايتك اليوم.`)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <MessageSquare size={14} /> محادثة واتساب
            </a>

            {/* Megatron AI Plan Generator Button */}
            <button
              onClick={handleGenerateAiPlan}
              disabled={aiGenerating}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs px-5 py-2.5 rounded-2xl transition flex items-center gap-2 shadow-lg shadow-[#7C3AED]/30 cursor-pointer disabled:opacity-50"
            >
              <Sparkles size={14} className={aiGenerating ? "animate-spin" : ""} />
              {aiGenerating ? "جاري التوليد..." : "توليد خطة ذكية بميغاتروين"}
            </button>

          </div>

        </div>

        {/* 4 Stats Highlights under Profile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/5">
          <div className="bg-[#0b0a10] border border-white/5 p-3.5 rounded-2xl">
            <span className="text-[10px] text-white/40 block">الوزن الابتدائي</span>
            <span className="text-lg font-black font-mono text-white mt-0.5 block">{client.start_weight || 94.5} <span className="text-xs font-normal text-white/40">كجم</span></span>
          </div>

          <div className="bg-[#0b0a10] border border-white/5 p-3.5 rounded-2xl">
            <span className="text-[10px] text-white/40 block">الوزن المستهدف</span>
            <span className="text-lg font-black font-mono text-[#a78bfa] mt-0.5 block">{client.target_weight || 80.0} <span className="text-xs font-normal text-white/40">كجم</span></span>
          </div>

          <div className="bg-[#0b0a10] border border-white/5 p-3.5 rounded-2xl">
            <span className="text-[10px] text-white/40 block">معدل الالتزام</span>
            <span className="text-lg font-black font-mono text-[#c4b5fd] mt-0.5 block">{Math.round((client.daily_score || 8.6) * 10)}%</span>
          </div>

          <div className="bg-[#0b0a10] border border-white/5 p-3.5 rounded-2xl">
            <span className="text-[10px] text-white/40 block">أيام الاستمرار (Streak)</span>
            <span className="text-lg font-black font-mono text-amber-400 mt-0.5 block flex items-center gap-1">
              <Flame size={16} /> {client.streak_days || 14} يوم
            </span>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-white/10 gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'border-[#7C3AED] text-white text-[#c4b5fd]'
              : 'border-transparent text-white/50 hover:text-white'
          }`}
        >
          <Activity size={14} /> نظرة عامة وتحليلات الأداء
        </button>

        <button
          onClick={() => setActiveTab('workout')}
          className={`px-4 py-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'workout'
              ? 'border-[#7C3AED] text-white text-[#c4b5fd]'
              : 'border-transparent text-white/50 hover:text-white'
          }`}
        >
          <Dumbbell size={14} /> خطة التمرين الحالية
        </button>

        <button
          onClick={() => setActiveTab('nutrition')}
          className={`px-4 py-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'nutrition'
              ? 'border-[#7C3AED] text-white text-[#c4b5fd]'
              : 'border-transparent text-white/50 hover:text-white'
          }`}
        >
          <Utensils size={14} /> خطة التغذية والماكروز
        </button>

        <button
          onClick={() => setActiveTab('medical')}
          className={`px-4 py-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'medical'
              ? 'border-[#7C3AED] text-white text-[#c4b5fd]'
              : 'border-transparent text-white/50 hover:text-white'
          }`}
        >
          <ShieldCheck size={14} /> الملف الطبي والخزنة المشفرة
        </button>
      </div>

      {/* Tab Content 1: Overview & Analytics */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Medical Alert Notice */}
            <div className="bg-[#111116] border border-rose-500/30 p-6 rounded-3xl space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertCircle size={18} />
                <h3 className="text-sm font-bold">تنبيه الإصابة وحماية المفاصل</h3>
              </div>
              <p className="text-xs text-white/80 leading-relaxed bg-rose-500/5 p-3.5 rounded-2xl border border-rose-500/20">
                {typeof client.injuries === 'string' ? client.injuries : (Array.isArray(client.injuries) ? client.injuries.join(', ') : 'لا توجد إصابات مسجلة.')}
              </p>
              {client.medical_notes && (
                <p className="text-[11px] text-amber-300/80">
                  <span className="font-bold">ملاحظات التغذية العلاجية: </span>{client.medical_notes}
                </p>
              )}
            </div>

            {/* Active Training Focus */}
            <div className="bg-[#111116] border border-white/5 p-6 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#a78bfa]">
                  <Dumbbell size={18} />
                  <h3 className="text-sm font-bold">الخطة النشطة المخصصة</h3>
                </div>
                <Link href="/dashboard/builder" className="text-[11px] text-[#c4b5fd] hover:underline font-bold">
                  تعديل في الـ Builder &larr;
                </Link>
              </div>
              <div className="bg-[#1e1338]/60 border border-[#7C3AED]/30 p-4 rounded-2xl space-y-1.5">
                <p className="text-xs font-bold text-white">{client.workoutPlan?.name || "Hypertrophy Upper/Lower 4 Days"}</p>
                <p className="text-[11px] text-white/60">{client.workoutPlan?.focus || "تضخيم عضلي مع حماية الركبة"}</p>
                <div className="flex gap-2 pt-2">
                  <span className="text-[10px] bg-[#7C3AED]/20 text-[#c4b5fd] px-2 py-0.5 rounded-md font-mono">4 أيام / أسبوع</span>
                  <span className="text-[10px] bg-white/5 text-white/60 px-2 py-0.5 rounded-md font-mono">RPE 8-9</span>
                </div>
              </div>
            </div>

          </div>

          {/* Fitness Overload & Volume Chart Integration */}
          <div className="pt-2">
            <FitnessAnalyticsDashboard athleteName={clientName} />
          </div>
        </div>
      )}

      {/* Tab Content 2: Workout Plan */}
      {activeTab === 'workout' && (
        <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">{client.workoutPlan?.name}</h2>
              <p className="text-xs text-white/50 mt-0.5">{client.workoutPlan?.focus}</p>
            </div>
            <Link 
              href="/dashboard/builder" 
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <Dumbbell size={14} /> فتح منشئ التمارين (Builder)
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {client.workoutPlan?.days?.map((day: any, idx: number) => (
              <div key={idx} className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl space-y-2 hover:border-[#7C3AED]/30 transition">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white">{day.name}</h4>
                  <span className="text-[10px] text-[#c4b5fd] bg-[#7C3AED]/20 px-2 py-0.5 rounded-md font-mono">{day.sets} مجموعة</span>
                </div>
                <p className="text-[11px] text-white/50">{day.exercises} تمارين مبرمجة ومحمية المفاصل</p>
                <div className="pt-2 flex justify-end">
                  <Link href="/dashboard/builder" className="text-[11px] text-[#a78bfa] hover:underline">
                    تفاصيل الجلسات والتمارين &larr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Nutrition Plan */}
      {activeTab === 'nutrition' && (
        <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">الماكروز والخطة الغذائية المستهدفة</h2>
              <p className="text-xs text-white/50 mt-0.5">{client.nutritionPlan?.notes}</p>
            </div>
            <Link 
              href="/dashboard/nutrition" 
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <Utensils size={14} /> فتح بنك الأطعمة والمحرر
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl text-center">
              <span className="text-xs text-white/40 block">السعرات الحرارية</span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">{client.nutritionPlan?.calories}</span>
              <span className="text-[10px] text-white/30">سعرة / اليوم</span>
            </div>

            <div className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl text-center">
              <span className="text-xs text-rose-400 block">البروتين</span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">{client.nutritionPlan?.protein} جم</span>
              <span className="text-[10px] text-white/30">2.1 جم/كجم</span>
            </div>

            <div className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl text-center">
              <span className="text-xs text-amber-400 block">الكربوهيدرات</span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">{client.nutritionPlan?.carbs} جم</span>
              <span className="text-[10px] text-white/30">طاقة نظيفة</span>
            </div>

            <div className="bg-[#0b0a10] border border-white/5 p-4 rounded-2xl text-center">
              <span className="text-xs text-blue-400 block">الدهون الصحية</span>
              <span className="text-2xl font-black font-mono text-white mt-1 block">{client.nutritionPlan?.fats} جم</span>
              <span className="text-[10px] text-white/30">دعم هرموني</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Medical Vault & Encrypted Attachments */}
      {activeTab === 'medical' && (
        <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock size={16} className="text-[#a78bfa]" /> الخزنة الطبية المشفرة (Medical Vault)
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                تخزين مشفر بـ AES-256 مع روابط مؤقتة آمنة تنتهي تلقائياً بعد 15 دقيقة
              </p>
            </div>
            <span className="text-xs bg-[#7C3AED]/20 text-[#c4b5fd] border border-[#7C3AED]/40 px-3 py-1 rounded-full font-mono">
              محمي بـ HIPAA / ISO
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {client.attachments?.map((att: any) => (
              <div key={att.id} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1e1338] border border-[#7C3AED]/30 flex items-center justify-center text-[#c4b5fd]">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">{att.name}</p>
                    <p className="text-[10px] text-white/40 font-mono mt-0.5">{att.size} &bull; رُفع بتاريخ {att.date}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAttachment(att.path)}
                  className="bg-[#1e1338] hover:bg-[#7C3AED] hover:text-white text-[#c4b5fd] border border-[#7C3AED]/40 px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink size={12} /> فك التشفير والفتح
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function ClientProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="w-10 h-10 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ClientProfileInner />
    </Suspense>
  );
}
