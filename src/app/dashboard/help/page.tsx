'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <GenericDashboardView 
      title="مركز المساعدة والدعم الفني" 
      description="أدلة الاستخدام السريعة، الأسئلة الشائعة، والتواصل المباشر مع فريق الدعم الفني."
      icon={HelpCircle}
      category="الإعدادات والاشتراك"
    />
  );
}
