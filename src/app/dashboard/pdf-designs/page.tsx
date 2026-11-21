'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { FileText } from 'lucide-react';

export default function PdfDesignsPage() {
  return (
    <GenericDashboardView 
      title="تصاميم PDF" 
      description="تخصيص قوالب وتصدير ملفات الـ PDF التدريبية والغذائية بهويتك وشعارك التجاري."
      icon={FileText}
      category="الهوية والذكاء"
    />
  );
}
