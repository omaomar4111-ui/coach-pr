'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { Mic } from 'lucide-react';

export default function VoiceAiPage() {
  return (
    <GenericDashboardView 
      title="صوت الذكاء (Voice AI)" 
      description="استنساخ صوتك بواسطة الذكاء الاصطناعي لإرسال ملاحظات صوتية فورية وتشجيعية للاعبين."
      icon={Mic}
      category="الهوية والذكاء"
    />
  );
}
