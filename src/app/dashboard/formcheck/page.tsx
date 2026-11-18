'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Upload, 
  Video, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Send,
  Sparkles,
  Volume2
} from 'lucide-react';

interface FormCheckItem {
  id: string;
  clientName: string;
  exercise: string;
  videoUrl: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
  aiPreliminaryCheck: {
    barPathDeviation: string;
    lumbarFlexionRisk: 'low' | 'moderate' | 'high';
    depthAssessment: string;
  };
  coachFeedback?: {
    text: string;
    voiceDurationSec?: number;
    recordedAt?: string;
  };
}

export default function FormCheckReviewPage() {
  const [selectedItem, setSelectedItem] = useState<FormCheckItem>({
    id: 'fc-101',
    clientName: 'طارق حسام',
    exercise: 'سكوات حر بالبار (Barbell Back Squat) - 120 كج',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-weights-in-a-gym-42617-large.mp4',
    submittedAt: 'منذ ساعتين',
    status: 'pending',
    aiPreliminaryCheck: {
      barPathDeviation: 'انحراف طفيف للأمام في أدنى نقطة (Bottom Position)',
      lumbarFlexionRisk: 'moderate',
      depthAssessment: 'العمق ممتاز (Parallel + 2cm)'
    }
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [voiceRecordedDuration, setVoiceRecordedDuration] = useState<number>(0);
  const [writtenNotes, setWrittenNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle Video Playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Voice Note Recording Simulation
  const handleToggleVoiceRecord = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setVoiceRecordedDuration(0);
      const interval = setInterval(() => {
        setVoiceRecordedDuration(prev => {
          if (prev >= 60) {
            clearInterval(interval);
            setIsRecordingVoice(false);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
      (window as any)._voiceTimer = interval;
    } else {
      clearInterval((window as any)._voiceTimer);
      setIsRecordingVoice(false);
    }
  };

  const handleSendFeedback = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessToast(true);
      setSelectedItem(prev => ({
        ...prev,
        status: 'reviewed',
        coachFeedback: {
          text: writtenNotes,
          voiceDurationSec: voiceRecordedDuration > 0 ? voiceRecordedDuration : undefined,
          recordedAt: 'الآن'
        }
      }));
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6 sm:p-8 bg-[#07040D] min-h-screen text-white max-w-6xl mx-auto font-sans" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <Link href="/dashboard" className="text-[#7C3AED] hover:underline mb-2 inline-block text-sm flex items-center gap-1 font-bold">
            <ChevronLeft size={16} /> العودة للوحة التحكم
          </Link>
          <h1 className="text-3xl font-black tracking-tight">مختبر تقييم التكنيك (Form Check Pro)</h1>
          <p className="text-xs text-slate-400 mt-1">مراجعة فيديوهات المتدربين مع تحليل مسار البار والتسجيل الصوتي المباشر</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Video Player & AI Marker Overlay */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#0E081D] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="p-3 bg-[#140C2A] border-b border-white/[0.06] flex justify-between items-center text-xs">
              <span className="font-bold text-white flex items-center gap-2">
                <Video size={16} className="text-purple-400" /> {selectedItem.exercise}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{selectedItem.submittedAt}</span>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-[9/16] sm:aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video 
                ref={videoRef}
                src={selectedItem.videoUrl}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Play / Pause Overlay Button */}
              <button 
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-purple-600/80 hover:bg-purple-600 flex items-center justify-center text-white backdrop-blur-md transition shadow-2xl"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="mr-0.5" />}
              </button>

              {/* AI Real-time Trajectory Indicator */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-purple-500/40 rounded-xl p-2.5 text-[11px] space-y-1">
                <div className="flex items-center gap-1 text-purple-400 font-bold">
                  <Sparkles size={13} /> فحص الذكاء الاصطناعي الأولي
                </div>
                <p className="text-slate-300">مسار البار: {selectedItem.aiPreliminaryCheck.barPathDeviation}</p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-slate-400">إجهاد أسفل الظهر:</span>
                  <span className="text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded text-[10px]">
                    متوسط (تحتاج فرد الصدر)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Coach Review & Voice Note Recorder */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0E081D] border border-white/[0.08] rounded-2xl p-5 shadow-2xl space-y-5">
            <div>
              <span className="text-[10px] text-purple-400 font-bold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/30">
                المتدرب: {selectedItem.clientName}
              </span>
              <h2 className="text-lg font-bold text-white mt-2">تسجيل الملاحظات والتوجيه الصوتي</h2>
              <p className="text-xs text-slate-400 mt-1">سجل ملاحظتك الصوتية لتصل للمتدرب مباشرة على تطبيقه</p>
            </div>

            {/* Voice Recorder Box */}
            <div className={`p-4 rounded-xl border transition ${
              isRecordingVoice 
                ? 'bg-rose-950/20 border-rose-500/50' 
                : 'bg-[#150D2A] border-white/5'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleVoiceRecord}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition shadow-lg ${
                      isRecordingVoice 
                        ? 'bg-rose-600 animate-pulse text-white' 
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isRecordingVoice ? <MicOff size={22} /> : <Mic size={22} />}
                  </button>
                  <div>
                    <p className="text-xs font-bold text-white">
                      {isRecordingVoice ? 'جاري التسجيل الصوتي...' : 'التسجيل الصوتي (Voice Note)'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {voiceRecordedDuration > 0 
                        ? `تم تسجيل: 00:${voiceRecordedDuration.toString().padStart(2, '0')}` 
                        : 'اضغط للبدء بالكلام'}
                    </p>
                  </div>
                </div>

                {voiceRecordedDuration > 0 && !isRecordingVoice && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                    <Volume2 size={13} /> جاهز للإرسال
                  </span>
                )}
              </div>
            </div>

            {/* Text Coaching Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">ملاحظات كتابية إضافية:</label>
              <textarea
                value={writtenNotes}
                onChange={e => setWrittenNotes(e.target.value)}
                placeholder="اكتب توجيهات الكوتش هنا... (مثال: اضغط بكعب رجلك وافرد صدرك قبل النزول)"
                rows={4}
                className="w-full bg-[#150D2A] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Submit Feedback Button */}
            <div>
              <button
                onClick={handleSendFeedback}
                disabled={isSubmitting || (!writtenNotes.trim() && voiceRecordedDuration === 0)}
                className="w-full bg-[#10B981] hover:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed text-black font-black text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950"
              >
                <Send size={15} /> 
                {isSubmitting ? 'جاري إرسال التوجيهات...' : 'اعتماد وإرسال التقييم للمتدرب'}
              </button>
            </div>

            {/* Feedback Sent Toast */}
            {showSuccessToast && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <CheckCircle2 size={16} />
                <span>تم إرسال التقييم الصوتي والكتابي لـ {selectedItem.clientName} بنجاح!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
