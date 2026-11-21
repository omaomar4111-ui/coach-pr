'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { Sliders } from 'lucide-react';

export default function PackagesSetupPage() {
  return (
    <GenericDashboardView 
      title="حزم التهيئة" 
      description="إعداد وتخصيص باقات استقبال اللاعبين الجدد ونماذج التحليل الأولي."
      icon={Sliders}
      category="الخطط"
    />
  );
}
