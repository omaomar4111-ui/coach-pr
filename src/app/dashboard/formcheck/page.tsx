"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Video, 
  Mic, 
  Play, 
  Pause, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Send, 
  AlertTriangle, 
  ArrowLeft,
  Volume2,
  BookmarkPlus,
  Bot,
  User,
  Activity
} from "lucide-react";
import confetti from "canvas-confetti";

interface FormCheckItem {
  id: string;
  clientName: string;
  exerciseName: string;
  date: string;
  videoDurationSec: number;
  status: "pending" | "reviewed";
  notesAtSeconds: {
    second: number;
    text: string;
    hasVoiceNote: boolean;
  }[];
}

interface ChatMessage {
  id: string;
  sender: "coach" | "ai";
  text: string;
  time: string;
}

export default function FormCheckAndAIStudioPage() {
  const [activeTab, setActiveTab] = useState<"formcheck" | "aichat">("formcheck");

  // Form check state
  const [currentVideoTime, setCurrentVideoTime] = useState(4); // paused at 4s
  const [isPlaying, setIsPlaying] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceRecorded, setVoiceRecorded] = useState(false);

  const [formCheckSubmissions, setFormCheckSubmissions] = useState<FormCheckItem[]>([
    {
      id: "fc-1",
      clientName: "كريم أحمد مصطفى",
      exerciseName: "Barbell Back Squat (اسكوات خلفي)",
      date: "اليوم · 11:45 صباحاً",
      videoDurationSec: 18,
      status: "pending",
      notesAtSeconds: [
        { second: 4, text: "الركبتين بتقفل للداخل خفيف عند الصعود. حاول تفتح ركبتيك لبرة وتضغط بكامل باطن رجلك.", hasVoiceNote: true }
      ]
    },
    {
      id: "fc-2",
      clientName: "عمر فاروق عبد الله",
      exerciseName: "Romanian Deadlift (ديدليفت روماني)",
      date: "أمس · 6:30 مساءً",
      videoDurationSec: 15,
      status: "reviewed",
      notesAtSeconds: [
        { second: 6, text: "تكنيك ممتاز ومستقيم، بس حافظ على رقبتك في خط مستقيم مع عمودك الفقري.", hasVoiceNote: false }
      ]
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<FormCheckItem>(formCheckSubmissions[0]);

  // AI Assistant Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "أهلاً يا كابتن عمر! أنا CoachPRB AI Co-Pilot. جاهز لمساعدتك في تحليل أداء المتدربين، اقتراح تمارين بديلة، أو صياغة رسائل تحفيزية للعملاء المعرضين للتسرب.",
      time: "10:00 ص"
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Form check note submission
  const handleAddTimelineNote = () => {
    if (!newNoteText.trim() && !voiceRecorded) return;

    const newNote = {
      second: currentVideoTime,
      text: newNoteText || "تسجيل صوتي توجيهي على هذه الثانية.",
      hasVoiceNote: voiceRecorded
    };

    const updated = {
      ...selectedSubmission,
      notesAtSeconds: [...selectedSubmission.notesAtSeconds, newNote],
      status: "reviewed" as const
    };

    setSelectedSubmission(updated);
    setFormCheckSubmissions(prev => prev.map(s => s.id === updated.id ? updated : s));
    setNewNoteText("");
    setVoiceRecorded(false);

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    alert("تم حفظ الملاحظة وإرسال التوجيه الصوتي للعميل مباشرة في تطبيقه!");
  };

  // AI Chat submission
  const handleSendAiPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "coach",
      text: inputPrompt,
      time: "الآن"
    };

    setChatMessages(prev => [...prev, userMsg]);
    const promptBackup = inputPrompt;
    setInputPrompt("");
    setIsAiTyping(true);

    setTimeout(() => {
      let aiReply = "تم استلام طلبك يا كابتن. قمت بمراجعة بيانات العميل والجدول، وكل المؤشرات تدعم هذا التعديل.";

      if (promptBackup.includes("بديل") || promptBackup.includes("إصابة")) {
        aiReply = "💡 توصية المدرب الذكي: بالنسبة للديدليفت لعميل يعاني من أسفل الظهر، أفضل بديل آمن هو (Trap Bar Deadlift مع رفع البار على بلوكس) أو (Hip Thrust بالجهاز) لتقليل عزم الدوران على الفقرات القطنية بنسبة 40%.";
      } else if (promptBackup.includes("تسرب") || promptBackup.includes("رسالة")) {
        aiReply = "📩 مسودة رسالة واتساب مقترحة للعميل (محمود حسن): 'وحش يا محمود! لاحظت غيابك عن تسجيل آخر يومين، طمني عليك كل حاجة تمام؟ الجيم مستنيك النهاردة وعندنا هدف عايزين نكسره سوا، كلمني لو محتاج أي تعديل في الجدول!'";
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: aiReply,
          time: "الآن"
        }
      ]);
      setIsAiTyping(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0A0612] text-white flex flex-col font-sans" dir="rtl">
      {/* Top Header */}
      <header className="bg-[#110A1E] border-b border-purple-900/30 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>لوحة التحكم</span>
          </Link>
          <div className="h-5 w-[1px] bg-purple-900/40" />
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-[#A78BFA]" />
            <h1 className="font-heading font-black text-lg text-white">
              استوديو الفورم تشيك والذكاء الاصطناعي <span className="text-xs bg-[#7C3AED] text-white px-2 py-0.5 rounded-full font-sans font-bold">Sprint 4</span>
            </h1>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-[#140C24] p-1 rounded-xl border border-purple-900/40">
          <button
            onClick={() => setActiveTab("formcheck")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "formcheck" ? "bg-[#7C3AED] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            مراجعة الفورم تشيك بالفيديو
          </button>
          <button
            onClick={() => setActiveTab("aichat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === "aichat" ? "bg-[#7C3AED] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            مساعد CoachPRB AI
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* VIEW 1: FORM CHECK VIDEO STUDIO */}
        {activeTab === "formcheck" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Submissions List (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#140C24] p-4 rounded-2xl border border-purple-900/30">
                <h3 className="text-sm font-bold text-white mb-1">فيديوهات المتدربين الجديدة ({formCheckSubmissions.length})</h3>
                <p className="text-xs text-slate-400">اختر فيديو الرفعة لمراجعته وترك فويس نوت على الثانية المحددة</p>
              </div>

              <div className="space-y-2">
                {formCheckSubmissions.map((sub) => {
                  const isSelected = selectedSubmission.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubmission(sub)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition space-y-2 ${
                        isSelected 
                          ? "bg-[#1C1133] border-[#7C3AED] shadow-lg shadow-purple-900/30"
                          : "bg-[#140C24] border-purple-900/20 hover:border-purple-600/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{sub.clientName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          sub.status === "pending" 
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                            : "bg-purple-600/20 text-purple-200 border border-purple-600/30"
                        }`}>
                          {sub.status === "pending" ? "بانتظار مراجعتك" : "تمت المراجعة ✓"}
                        </span>
                      </div>

                      <div className="text-xs text-[#A78BFA] font-semibold">{sub.exerciseName}</div>

                      <div className="text-[10px] text-slate-500 flex justify-between">
                        <span>{sub.date}</span>
                        <span>المدة: {sub.videoDurationSec} ثانية</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Medical Disclaimer Box */}
              <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-2xl text-[11px] text-amber-200/90 leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>إخلاء مسؤولية طبي ورياضي:</span>
                </div>
                <p>مراجعة الفورم والزوايا هي أداة تدريبية استرشادية لتحسين التكنيك وتقليل احتمالية الإصابات، وليست تشخيصاً طبياً بديلاً عن طبيب العظام أو العلاج الطبيعي.</p>
              </div>
            </div>

            {/* Right: Interactive Video Player & Timeline Review (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#140C24] border border-purple-900/30 rounded-2xl p-4 sm:p-6 space-y-4">
                
                {/* Video Mockup with Pose Angle Overlays */}
                <div className="relative aspect-video bg-black/90 rounded-2xl overflow-hidden border border-purple-900/40 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                  {/* Pose estimation graphic mock */}
                  <div className="text-center space-y-2 relative z-10">
                    <Activity className="w-12 h-12 text-[#A78BFA] mx-auto animate-pulse" />
                    <div className="text-xs text-slate-300">
                      فيديو تمرين: <span className="font-bold text-white">{selectedSubmission.exerciseName}</span> ({selectedSubmission.clientName})
                    </div>
                    <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-purple-500/40 px-3 py-1 rounded-full text-[11px] text-[#A78BFA]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>زاوية الركبة عند الثانية {currentVideoTime}s: 88° (عمق ممتاز)</span>
                    </div>
                  </div>

                  {/* Timeline overlay bar */}
                  <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center gap-3 bg-[#0A0612]/80 backdrop-blur-md p-2.5 rounded-xl border border-purple-900/40 text-xs">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg text-white"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max={selectedSubmission.videoDurationSec}
                        value={currentVideoTime}
                        onChange={(e) => setCurrentVideoTime(parseInt(e.target.value))}
                        className="w-full accent-[#7C3AED] cursor-pointer"
                      />
                      <span className="font-mono text-[11px] text-slate-400">
                        00:{currentVideoTime < 10 ? `0${currentVideoTime}` : currentVideoTime} / 00:{selectedSubmission.videoDurationSec}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline Notes List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400">ملاحظات المدرب على الفيديو:</h4>
                  {selectedSubmission.notesAtSeconds.map((note, idx) => (
                    <div key={idx} className="bg-[#110A1E] p-3 rounded-xl border border-purple-900/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#7C3AED]/20 text-[#A78BFA] px-2 py-0.5 rounded font-mono font-bold">
                          00:{note.second < 10 ? `0${note.second}` : note.second}
                        </span>
                        <span className="text-white">{note.text}</span>
                      </div>
                      {note.hasVoiceNote && (
                        <span className="text-[10px] bg-purple-600/20 text-purple-300 border border-purple-600/30 px-2 py-0.5 rounded flex items-center gap-1">
                          <Volume2 className="w-3 h-3" /> فويس نوت مدمج
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Note & Voice Recorder Box */}
                <div className="bg-[#110A1E] p-4 rounded-xl border border-purple-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <BookmarkPlus className="w-4 h-4 text-[#A78BFA]" />
                      <span>إضافة توجيه عند الثانية (00:{currentVideoTime < 10 ? `0${currentVideoTime}` : currentVideoTime}):</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setIsRecordingVoice(!isRecordingVoice);
                        if (!isRecordingVoice) {
                          setTimeout(() => {
                            setIsRecordingVoice(false);
                            setVoiceRecorded(true);
                          }, 2500);
                        }
                      }}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                        isRecordingVoice 
                          ? "bg-rose-600 text-white animate-pulse" 
                          : voiceRecorded 
                            ? "bg-purple-700 text-white" 
                            : "bg-[#17102A] text-slate-300 border border-purple-900/40 hover:text-white"
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>{isRecordingVoice ? "جاري التسجيل..." : voiceRecorded ? "تم تسجيل الفويس ✓" : "سجل فويس نوت"}</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="اكتب ملاحظة التكنيك (مثلاً: ركز على ثبات الحوض في هذا النزول)..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="flex-1 bg-[#17102A] border border-purple-900/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
                    />
                    <button
                      onClick={handleAddTimelineNote}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-md shadow-purple-900/40"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>إرسال التوجيه للعميل</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: AI ASSISTANT CHATROOM */}
        {activeTab === "aichat" && (
          <div className="bg-[#140C24] border border-purple-900/30 rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto flex flex-col h-[75vh]">
            <div className="pb-4 border-b border-purple-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C3AED] to-indigo-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">مساعد التدريب الذكي (CoachPRB AI)</h3>
                  <p className="text-[11px] text-slate-400">مساعدك في صياغة الخطط، اقتراح البدائل، والتنبيه بالمتسربين</p>
                </div>
              </div>
              <span className="text-xs bg-purple-600/10 text-purple-300 border border-purple-600/20 px-2.5 py-1 rounded-full font-bold">
                متصل وجاهز للعمل
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === "coach" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === "coach" ? "bg-purple-900 text-white" : "bg-[#7C3AED] text-white"
                  }`}>
                    {msg.sender === "coach" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed ${
                    msg.sender === "coach" 
                      ? "bg-[#7C3AED] text-white rounded-tl-none" 
                      : "bg-[#110A1E] text-slate-200 border border-purple-900/30 rounded-tr-none"
                  }`}>
                    {msg.text}
                    <div className="text-[10px] text-slate-400 mt-1 text-left">{msg.time}</div>
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex items-center gap-2 text-xs text-purple-400 font-bold animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span>CoachPRB AI يكتب الرد...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts Suggestions */}
            <div className="flex flex-wrap gap-2 py-2 border-t border-purple-900/20">
              {[
                "اقترح بديل تمرين ديدليفت لإصابة أسفل الظهر",
                "لخص لي العملاء المعرضين للتسرب هذا الأسبوع",
                "صيغ رسالة تحفيزية لعميل متخاذل"
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputPrompt(p)}
                  className="text-[11px] bg-[#110A1E] hover:bg-[#1C1133] border border-purple-900/40 text-purple-300 px-3 py-1 rounded-full transition"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleSendAiPrompt} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="اسأل CoachPRB AI عن أي شيء في خططك أو عملائك..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="flex-1 bg-[#110A1E] border border-purple-900/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7C3AED]"
              />
              <button
                type="submit"
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-purple-900/40"
              >
                <span>إرسال</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
