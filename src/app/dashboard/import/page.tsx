'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { FileText } from 'lucide-react';

export default function ImportPage() {
  return (
    <GenericDashboardView 
      title="مركز الاستيراد" 
      description="استيراد بيانات المشتركين والجداول السابقة من ملفات Excel و Google Sheets."
      icon={FileText}
      category="العملاء"
    />
  );
}
