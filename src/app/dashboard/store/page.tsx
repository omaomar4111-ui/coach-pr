'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { Store } from 'lucide-react';

export default function StorePage() {
  return (
    <GenericDashboardView 
      title="متجر CoachPR" 
      description="بيع الجداول الجاهزة والكتب الإلكترونية والميرش الخاص بك للمتابعين مباشرة."
      icon={Store}
      category="الأعمال"
    />
  );
}
