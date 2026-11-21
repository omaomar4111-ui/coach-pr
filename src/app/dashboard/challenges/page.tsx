'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { Zap } from 'lucide-react';

export default function ChallengesPage() {
  return (
    <GenericDashboardView 
      title="تحديات المشتركين" 
      description="إطلاق ومتابعة تحديات التحول البدني (8 أسابيع أو 12 أسبوع) ولوحة المتصدرين."
      icon={Zap}
      category="الأعمال"
    />
  );
}
