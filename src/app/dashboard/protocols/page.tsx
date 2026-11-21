'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { Zap } from 'lucide-react';

export default function ProtocolsPage() {
  return (
    <GenericDashboardView 
      title="منشئ بروتوكول التحسين" 
      description="إنشاء وتخصيص بروتوكولات المكملات الغذائية والاستشفاء العضلي المتقدمة."
      icon={Zap}
      category="الخطط"
    />
  );
}
