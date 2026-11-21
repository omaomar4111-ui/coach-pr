'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { Store } from 'lucide-react';

export default function PartnersPage() {
  return (
    <GenericDashboardView 
      title="برنامج الشركاء" 
      description="إدارة الخصومات والشراكات مع شركات المكملات والصالات الرياضية ومتاجر الأغذية الصحية."
      icon={Store}
      category="الأعمال"
    />
  );
}
