'use client';

import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Globe, 
  Save, 
  Sparkles,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [name, setName] = useState('كوتش تامر');
  const [brandName, setBrandName] = useState('CoachPR');
  const [phone, setPhone] = useState('01012345678');
  const [email, setEmail] = useState('coach.tamer@coachpr.site');
  const [bio, setBio] = useState('مدرب كمال أجسام وقوة بدنية معتمد، متخصص في تحضير البطولات وتعديل القوام وإعادة تأهيل إصابات المفاصل.');
  const [instagram, setInstagram] = useState('@coachtamer');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('تم حفظ وتحديث بيانات الملف الشخصي والهوية بنجاح!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans" dir="rtl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <User className="text-[#a78bfa]" /> الملف الشخصي والهوية التجارية
        </h1>
        <p className="text-xs text-white/50 mt-1">
          تخصيص بيانات المدرب، الاسم التجاري، وروابط التواصل التي تظهر للاعبين في تطبيق الـ PWA.
        </p>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-6 pb-6 border-b border-white/5">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#7C3AED] to-[#a855f7] border-2 border-[#7C3AED] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-[#7C3AED]/30">
              PR
            </div>
            <button className="absolute -bottom-1 -left-1 bg-[#1e1338] border border-[#7C3AED]/50 text-[#c4b5fd] p-2 rounded-xl hover:bg-[#7C3AED] hover:text-white transition">
              <Camera size={14} />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-xs text-[#a78bfa] font-mono mt-0.5">{brandName} &bull; مدرب محترف معتمد</p>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mt-2 inline-flex items-center gap-1">
              <ShieldCheck size={11} /> حساب موثق PRO
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-white/60 block mb-1.5">اسم المدرب</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 block mb-1.5">اسم العلامة التجارية (Brand)</label>
              <input
                type="text"
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-white/60 block mb-1.5">رقم الهاتف (الواتساب)</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 block mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#181524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-white/60 block mb-1.5">النبذة التعريفية (Bio)</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-[#181524] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#7C3AED]"
            />
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-[#7C3AED]/30 cursor-pointer"
            >
              <Save size={14} /> حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
