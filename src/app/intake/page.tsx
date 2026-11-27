'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  UploadCloud, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck, 
  Dumbbell, 
  Calendar, 
  Activity, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  FileCode,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

export default function ClientIntakeReportPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // General Info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('26');
  const [heightCm, setHeightCm] = useState('178');
  const [weightKg, setWeightKg] = useState('82');
  const [primaryGoal, setPrimaryGoal] = useState<'hypertrophy' | 'fat_loss' | 'strength' | 'rehab_posture'>('hypertrophy');
  const [preferredDays, setPreferredDays] = useState<number>(4);

  // Injury & Medical Condition
  const [hasInjury, setHasInjury] = useState<'no' | 'yes'>('no');
  const [injuryLocation, setInjuryLocation] = useState('');
  const [injuryDetails, setInjuryDetails] = useState('');
  
  // File Upload State (Mandatory if hasInjury === 'yes')
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; type: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<any | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setTimeout(() => {
      const newFiles = Array.from(files).map(f => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        type: f.name.split('.').pop()?.toUpperCase() || 'FILE'
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
      toast.success(`تم إرفاق ${newFiles.length} ملف/أشعة بنجاح!`);
    }, 800);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      toast.error('يرجى كتابة الاسم ورقم الهاتف للمتابعة');
      return;
    }

    if (hasInjury === 'yes' && uploadedFiles.length === 0) {
      toast.error('⚠️ نظراً لوجود إصابة، يلزم رفع صورة التقرير الطبي أو الأشعة/التحاليل لحمايتك قبل تصميم البرنامج');
      return;
    }

    const reportData = {
      clientCode: `ATH-${Math.floor(Math.random() * 9000 + 1000)}`,
      fullName,
      phone,
      age: Number(age),
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      primaryGoal,
      preferredDays,
      hasInjury: hasInjury === 'yes',
      injuryLocation: hasInjury === 'yes' ? injuryLocation : 'لا توجد إصابات',
      injuryDetails: hasInjury === 'yes' ? injuryDetails : 'سليم تماماً وجاهز للضغط العضلي العالي',
      uploadedFiles,
      submittedAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setSubmittedReport(reportData);
    setStep(3);
    toast.success('تم إرسال التقرير بنجاح إلى مدربك المباشر في CoachPR!');
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-[#7C3AED] py-6 sm:py-12 px-4" dir="rtl">
      
      {/* Top Header */}
      <header className="max-w-xl mx-auto flex items-center justify-between border-b border-white/5 pb-4 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#d4f60b] flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-black" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">
            Coach<span className="text-[#d4f60b]">PR</span>
          </span>
        </Link>
        <div className="text-left font-mono">
          <span className="text-[11px] text-[#d4f60b] bg-[#d4f60b]/10 border border-[#d4f60b]/20 px-2.5 py-1 rounded-full font-bold">
            استمارة الفحص الطبي والبدني للاعب
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto">
        {step !== 3 ? (
          <div className="bg-card border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#d4f60b] font-bold mb-1">
                <span>الخطوة {step} من 2</span>
                <span>&bull;</span>
                <span>فحص NASM الطبي الشامل</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {step === 1 ? 'بياناتك البدنية وأهدافك التدريبية' : 'الفحص الصحي وتقارير الإصابات والأشعة'}
              </h1>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                يقوم مدربك بمراجعة هذا التقرير لصياغة نظام تمرين وتغذية مخصص لك بضغطة زر واحدة.
              </p>
            </div>

            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmitReport} className="space-y-4">
              
              {/* STEP 1: Basic Bio & Goal */}
              {step === 1 && (
                <>
                  <div>
                    <label className="text-xs font-bold text-white/80 block mb-1.5">الاسم ثلاثي <span className="text-[#d4f60b]">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="عمر حسن السيد"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#d4f60b]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white/80 block mb-1.5">رقم الواتساب للتواصل وإرسال البرنامج <span className="text-[#d4f60b]">*</span></label>
                    <input
                      type="tel"
                      required
                      placeholder="01012345678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-white/30 focus:outline-none focus:border-[#d4f60b]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1.5">السن</label>
                      <input
                        type="number"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:border-[#d4f60b] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1.5">الطول (سم)</label>
                      <input
                        type="number"
                        value={heightCm}
                        onChange={e => setHeightCm(e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:border-[#d4f60b] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1.5">الوزن الحالي (كجم)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={weightKg}
                        onChange={e => setWeightKg(e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:border-[#d4f60b] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1.5">هدفك الرياضي الأساسي</label>
                      <select
                        value={primaryGoal}
                        onChange={(e: any) => setPrimaryGoal(e.target.value)}
                        className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#d4f60b] outline-none"
                      >
                        <option value="hypertrophy">بناء وتضخيم عضلات صافية (Hypertrophy)</option>
                        <option value="fat_loss">تنشيف وخسارة دهون مع شد الجسم</option>
                        <option value="strength">زيادة القوة البدنية ورفع الأوزان</option>
                        <option value="rehab_posture">تصحيح انحناءات القوام وتأهيل حركي</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1.5">الأيام المتاحة للتدريب أسبوعياً</label>
                      <select
                        value={preferredDays}
                        onChange={e => setPreferredDays(Number(e.target.value))}
                        className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#d4f60b] outline-none font-mono"
                      >
                        <option value={3}>3 أيام أسبوعياً (Full Body / PPL)</option>
                        <option value={4}>4 أيام أسبوعياً (Upper / Lower)</option>
                        <option value={5}>5 أيام أسبوعياً (FST-7 Olympia Split)</option>
                        <option value={6}>6 أيام أسبوعياً (Push-Pull-Legs x2)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#7C3AED]/25 mt-4"
                  >
                    <span>المتابعة إلى الفحص الطبي والإصابات</span>
                    <ArrowRight size={16} />
                  </button>
                </>
              )}

              {/* STEP 2: Medical Assessment & Mandatory Upload */}
              {step === 2 && (
                <>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-white/90 block">
                      هل تعاني حالياً أو سابقاً من أي إصابة، ألم في المفاصل، أو قيود حركية؟ <span className="text-[#d4f60b]">*</span>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setHasInjury('no')}
                        className={`p-3.5 rounded-2xl border text-center transition flex items-center justify-center gap-2 cursor-pointer ${
                          hasInjury === 'no' 
                            ? 'bg-[#152417] border-emerald-500 text-emerald-300 font-black' 
                            : 'bg-surface border-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        <Check size={16} />
                        <span className="text-xs">سليم تماماً (لا توجد إصابات)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasInjury('yes')}
                        className={`p-3.5 rounded-2xl border text-center transition flex items-center justify-center gap-2 cursor-pointer ${
                          hasInjury === 'yes' 
                            ? 'bg-[#29121c] border-rose-500 text-rose-300 font-black' 
                            : 'bg-surface border-white/5 text-white/50 hover:text-white'
                        }`}
                      >
                        <AlertTriangle size={16} />
                        <span className="text-xs">نعم، لدي إصابة أو ألم</span>
                      </button>
                    </div>
                  </div>

                  {/* If HAS INJURY: Mandatory Fields + File Upload */}
                  {hasInjury === 'yes' ? (
                    <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4 animate-in fade-in">
                      <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                        <ShieldAlert size={16} />
                        <span>بروتوكول السلامة الطبية (NASM Injury Protection)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-white/80 block mb-1">مكان الإصابة أو الألم:</label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: غضروف الركبة اليمنى، أو وتر الكتف"
                            value={injuryLocation}
                            onChange={e => setInjuryLocation(e.target.value)}
                            className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-400 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-white/80 block mb-1">طبيعة الألم والتشخيص:</label>
                          <input
                            type="text"
                            placeholder="مثال: ألم عند النزول لأسفل في السكوات فقط"
                            value={injuryDetails}
                            onChange={e => setInjuryDetails(e.target.value)}
                            className="w-full bg-[#181524] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-rose-400 outline-none"
                          />
                        </div>
                      </div>

                      {/* Mandatory File Upload Box */}
                      <div className="space-y-2 pt-1">
                        <label className="text-xs font-bold text-white flex items-center justify-between">
                          <span>رفع تقرير الأشعة، الرنين المغناطيسي (MRI)، أو التحاليل: <span className="text-rose-400">* إلزامي</span></span>
                          <span className="text-[10px] text-white/40 font-mono">يدعم PDF, PNG, JPG, DICOM</span>
                        </label>

                        <label className="border-2 border-dashed border-rose-500/40 hover:border-rose-400 bg-rose-950/10 rounded-2xl p-4 text-center cursor-pointer transition block">
                          <UploadCloud className="w-8 h-8 text-rose-400 mx-auto mb-1.5" />
                          <span className="text-xs text-white font-bold block">اضغط هنا لرفع الأشعة أو التحاليل من الموبايل</span>
                          <span className="text-[10px] text-white/40">يلزم تقديم مستند طبي لحمايتك قبل تعديل التمارين بالذكاء الاصطناعي</span>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.png,.jpg,.jpeg,.dcm"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            {uploadedFiles.map((file, i) => (
                              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-surface border border-white/5 text-xs">
                                <div className="flex items-center gap-2">
                                  <FileCheck size={14} className="text-emerald-400" />
                                  <span className="font-bold text-white truncate max-w-[200px]">{file.name}</span>
                                  <span className="text-[10px] text-white/40 font-mono">({file.size})</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(i)}
                                  className="text-white/40 hover:text-rose-400 text-xs"
                                >
                                  حذف ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* If NO INJURY */
                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                      <p className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 size={15} /> الحالة البدنية مؤهلة ومثالية (Fit for Intense Training)
                      </p>
                      <p className="text-[11px] text-white/60">
                        سيتم توجيه طلبك فوراً لبناء نظام FST-7 المتكامل مع استغلال كامل الـ <strong>{preferredDays} أيام</strong> المختارة بأقصى كفاءة دون عوائق حركية.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition"
                    >
                      رجوع
                    </button>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="flex-1 py-3.5 rounded-2xl bg-[#d4f60b] hover:bg-[#c2e207] text-black font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#d4f60b]/20"
                    >
                      {isUploading ? 'جارِ رفع الملفات...' : 'إرسال التقرير للمدرب لتصميم البرنامج 🚀'}
                    </button>
                  </div>
                </>
              )}

            </form>
          </div>
        ) : (
          /* STEP 3: Success Confirmation & Unique Client Code */
          <div className="bg-card border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-emerald-400 font-bold block">تم استلام التقرير الطبي بنجاح!</span>
              <h2 className="text-2xl font-black text-white">كود اللاعب الخاص بك:</h2>
              <div className="inline-block px-5 py-2 rounded-2xl bg-surface border border-[#d4f60b]/30 font-mono text-xl font-black text-[#d4f60b] tracking-wider my-2 shadow-inner">
                {submittedReport?.clientCode}
              </div>
              <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                أعطِ هذا الكود لكابتنك، وسيقوم النظام الذكي بسحب بياناتك والملفات المرفقة وتصميم برنامجك التدريبي والتغذية بضغطة زر خلال 60 ثانية!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-right space-y-2 font-mono">
              <div className="flex justify-between text-white/70">
                <span>الاسم:</span>
                <span className="font-bold text-white">{submittedReport?.fullName}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>الأيام المتاحة:</span>
                <span className="font-bold text-[#d4f60b]">{submittedReport?.preferredDays} أيام أسبوعياً</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>حالة الإصابة:</span>
                <span className={`font-bold ${submittedReport?.hasInjury ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {submittedReport?.hasInjury ? `يوجد (${submittedReport.injuryLocation})` : 'سليم وجاهز'}
                </span>
              </div>
              {submittedReport?.uploadedFiles?.length > 0 && (
                <div className="flex justify-between text-white/70">
                  <span>الأشعة المرفقة:</span>
                  <span className="font-bold text-white">{submittedReport.uploadedFiles.length} ملفات تم فحصها</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg shadow-[#7C3AED]/30 transition"
              >
                <span>دخول تطبيق اللاعب PWA</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-xl mx-auto text-center text-white/30 text-[11px] mt-10">
        منظومة الفحص الصحي الآمنة — CoachPR &copy; 2026
      </footer>
    </div>
  );
}
