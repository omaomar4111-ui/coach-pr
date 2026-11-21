'use client';
import { GenericDashboardView } from '@/components/GenericDashboardView';
import { Users } from 'lucide-react';

export default function ReferralsPage() {
  return (
    <GenericDashboardView 
      title="نظام الإحالات" 
      description="مكافأة المتدربين على ترشيح أصدقائهم، وتوليد أكواد الخصم الحصرية."
      icon={Users}
      category="الأعمال"
    />
  );
}
