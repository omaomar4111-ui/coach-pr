'use client';

import { useState } from 'react';
import { 
  Users, 
  Bot, 
  Search, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Filter,
  Flame,
  Star,
  Globe,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function FleetPage() {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [search, setSearch] = useState('');

  // 65 Specialized Enterprise Agents Pool across 5 Platforms
  const fleetData = [
    // Sales & Conversion (22 Agents)
    { id: '1', name: 'عمر فاروق', dept: 'Sales & Conversion', role: 'Team Lead Sales', platforms: ['WhatsApp', 'Instagram'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 38, specialty: 'إغلاق صفقات ومبيعات الجواكت' },
    { id: '2', name: 'سارة الجندي', dept: 'Sales & Conversion', role: 'Fashion Consultant', platforms: ['Instagram', 'Messenger'], status: 'ONLINE', active: 7, max: 15, rating: '4.8', resolved: 32, specialty: 'تنسيق ألوان وأطقم رجالي' },
    { id: '3', name: 'يوسف الشريف', dept: 'Sales & Conversion', role: 'Senior Closer', platforms: ['WhatsApp'], status: 'ONLINE', active: 8, max: 15, rating: '5.0', resolved: 41, specialty: 'عروض الخصم للقطعتين' },
    { id: '4', name: 'مريم رضوان', dept: 'Sales & Conversion', role: 'Conversion Specialist', platforms: ['WhatsApp', 'Telegram'], status: 'ONLINE', active: 5, max: 15, rating: '4.9', resolved: 29, specialty: 'حجز المقاسات النادرة' },
    { id: '5', name: 'أحمد كمال', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['Messenger'], status: 'ONLINE', active: 4, max: 15, rating: '4.7', resolved: 24, specialty: 'متابعة السلات المتروكة' },
    { id: '6', name: 'نور الشناوي', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['Instagram'], status: 'AWAY', active: 3, max: 15, rating: '4.8', resolved: 30, specialty: 'الرد على ستوري وإنستغرام DM' },
    { id: '7', name: 'محمود الباز', dept: 'Sales & Conversion', role: 'Senior Closer', platforms: ['WhatsApp', 'WebChat'], status: 'ONLINE', active: 5, max: 15, rating: '4.9', resolved: 27, specialty: 'مبيعات الكاش والتقسيط' },
    { id: '8', name: 'فاطمة زكي', dept: 'Sales & Conversion', role: 'Fashion Advisor', platforms: ['WhatsApp'], status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 35, specialty: 'إقناع وتأكيد بيانات العميل' },
    { id: '9', name: 'خالد منصور', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['Telegram'], status: 'ONLINE', active: 3, max: 15, rating: '4.8', resolved: 19, specialty: 'قنوات وتليجرام برودكاست' },
    { id: '10', name: 'ياسمين حسن', dept: 'Sales & Conversion', role: 'Senior Closer', platforms: ['Instagram', 'WhatsApp'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 34, specialty: 'حملات التخفيضات والإعلانات' },
    { id: '11', name: 'كريم عثمان', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['Messenger'], status: 'ONLINE', active: 5, max: 15, rating: '4.7', resolved: 26, specialty: 'عملاء إعلانات فيسبوك' },
    { id: '12', name: 'هدى شاكر', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 6, max: 15, rating: '4.8', resolved: 31, specialty: 'تأكيد أوردرات المحافظات' },
    { id: '13', name: 'مصطفى صلاح', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['Instagram'], status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 36, specialty: 'بيع بدائل المنتجات المنتهية' },
    { id: '14', name: 'دينا فاروق', dept: 'Sales & Conversion', role: 'Fashion Advisor', platforms: ['WebChat'], status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 22, specialty: 'زوار الموقع والمحادثة الحية' },
    { id: '15', name: 'علي إبراهيم', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 5, max: 15, rating: '4.7', resolved: 28, specialty: 'تسجيل مسودات الطلبات' },
    { id: '16', name: 'رنا رمضان', dept: 'Sales & Conversion', role: 'Senior Closer', platforms: ['Instagram', 'Messenger'], status: 'ONLINE', active: 8, max: 15, rating: '5.0', resolved: 44, specialty: 'العملاء المترددين' },
    { id: '17', name: 'إبراهيم نجيب', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 23, specialty: 'طلبات هدايا وشحن خاص' },
    { id: '18', name: 'منى حمدي', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['WhatsApp', 'Telegram'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 33, specialty: 'عروض نهاية الأسبوع' },
    { id: '19', name: 'طارق نبيل', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['Messenger'], status: 'ONLINE', active: 5, max: 15, rating: '4.7', resolved: 25, specialty: 'محادثات ريلز وفيسبوك بوست' },
    { id: '20', name: 'سلمى حجازي', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['Instagram'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 31, specialty: 'مبيعات الكولكشن الشتوي' },
    { id: '21', name: 'زياد جلال', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 29, specialty: 'تأكيد المقاسات بالوزن والطول' },
    { id: '22', name: 'نادية سليم', dept: 'Sales & Conversion', role: 'Sales Specialist', platforms: ['WhatsApp', 'WebChat'], status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 37, specialty: 'سرعة الإقناع وحجز المنتجات' },

    // Customer Care (16 Agents)
    { id: '23', name: 'طارق جمال', dept: 'Customer Care', role: 'Team Lead Support', platforms: ['WhatsApp', 'Messenger'], status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 48, specialty: 'جدول المقاسات ودليل التلبيس' },
    { id: '24', name: 'سلمى فتحي', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Instagram'], status: 'ONLINE', active: 6, max: 15, rating: '4.8', resolved: 36, specialty: 'استفسارات خامات وأقمشة القطن' },
    { id: '25', name: 'هيثم عبد الله', dept: 'Customer Care', role: 'Care Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 5, max: 15, rating: '4.7', resolved: 30, specialty: 'تعديل عنوان الشحن قبل الخروج' },
    { id: '26', name: 'أميرة سامي', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Messenger', 'WebChat'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 35, specialty: 'مواعيد عمل الفروع والتسليم' },
    { id: '27', name: 'ماجد توفيق', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Telegram'], status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 24, specialty: 'إرسال صور طبيعية للمنتج من المخزن' },
    { id: '28', name: 'ريم زهران', dept: 'Customer Care', role: 'Care Specialist', platforms: ['WhatsApp', 'Instagram'], status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 39, specialty: 'طرق العناية وغسيل الجاكيت الجلد' },
    { id: '29', name: 'وائل الديب', dept: 'Customer Care', role: 'Care Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 6, max: 15, rating: '4.8', resolved: 33, specialty: 'تغيير موعد استلام الشحنة' },
    { id: '30', name: 'شروق النجار', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Instagram'], status: 'ONLINE', active: 5, max: 15, rating: '4.7', resolved: 28, specialty: 'المقاسات المحيرة وتجارب المشترين' },
    { id: '31', name: 'سامح نبيل', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Messenger'], status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 27, specialty: 'شرح سياسة الاستبدال خلال 14 يوم' },
    { id: '32', name: 'رانيا ممدوح', dept: 'Customer Care', role: 'Care Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 34, specialty: 'فحص توفر الألوان البديلة' },
    { id: '33', name: 'شريف علام', dept: 'Customer Care', role: 'Senior Care', platforms: ['WhatsApp', 'WebChat'], status: 'ONLINE', active: 7, max: 15, rating: '5.0', resolved: 42, specialty: 'حل معوقات إتمام الدفع' },
    { id: '34', name: 'بسمة عادل', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Telegram'], status: 'ONLINE', active: 4, max: 15, rating: '4.7', resolved: 22, specialty: 'إجابات الأسئلة الشائعة فوراً' },
    { id: '35', name: 'مروان يحيى', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Messenger'], status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 29, specialty: 'تتبع خط سير المندوب' },
    { id: '36', name: 'نجلاء مراد', dept: 'Customer Care', role: 'Care Specialist', platforms: ['Instagram', 'WhatsApp'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 35, specialty: 'استفسارات شهادات الضمان' },
    { id: '37', name: 'باسل رشيد', dept: 'Customer Care', role: 'Care Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 26, specialty: 'تأكيد بيانات البوليسة' },
    { id: '38', name: 'يمنى قدري', dept: 'Customer Care', role: 'Care Specialist', platforms: ['WebChat'], status: 'ONLINE', active: 4, max: 15, rating: '4.8', resolved: 25, specialty: 'مساعدة كبار السن في الحجز' },

    // VIP & High-Ticket (10 Agents)
    { id: '39', name: 'تامر سراج', dept: 'VIP & High-Ticket', role: 'VIP Manager', platforms: ['WhatsApp'], status: 'ONLINE', active: 4, max: 10, rating: '5.0', resolved: 21, specialty: 'خدمة كبار الشخصيات والشحن الخاص' },
    { id: '40', name: 'هالة بركات', dept: 'VIP & High-Ticket', role: 'Concierge Specialist', platforms: ['WhatsApp', 'Instagram'], status: 'ONLINE', active: 3, max: 10, rating: '4.9', resolved: 17, specialty: 'حجوزات ملابس المناسبات والأعراس' },
    { id: '41', name: 'أشرف عبد الرحيم', dept: 'VIP & High-Ticket', role: 'Corporate Sales', platforms: ['WhatsApp'], status: 'ONLINE', active: 4, max: 10, rating: '5.0', resolved: 19, specialty: 'أوردرات الجملة وتجهيز الشركات' },
    { id: '42', name: 'غادة سمير', dept: 'VIP & High-Ticket', role: 'Private Stylist', platforms: ['Instagram'], status: 'ONLINE', active: 3, max: 10, rating: '4.9', resolved: 16, specialty: 'أطقم مخصصة لكبار العملاء' },
    { id: '43', name: 'حسام غالي', dept: 'VIP & High-Ticket', role: 'VIP Relations', platforms: ['WhatsApp'], status: 'ONLINE', active: 4, max: 10, rating: '5.0', resolved: 18, specialty: 'خصومات حصرية وهدايا VIP' },
    { id: '44', name: 'مروة صبري', dept: 'VIP & High-Ticket', role: 'Concierge Specialist', platforms: ['Telegram', 'WhatsApp'], status: 'ONLINE', active: 3, max: 10, rating: '4.9', resolved: 15, specialty: 'خدمة التوصيل السريع لنفس اليوم' },
    { id: '45', name: 'رامي الجيار', dept: 'VIP & High-Ticket', role: 'Corporate Sales', platforms: ['WebChat'], status: 'ONLINE', active: 4, max: 10, rating: '4.8', resolved: 14, specialty: 'عقود التوريد والفواتير الضريبية' },
    { id: '46', name: 'داليا قاسم', dept: 'VIP & High-Ticket', role: 'Private Stylist', platforms: ['Instagram', 'WhatsApp'], status: 'ONLINE', active: 3, max: 10, rating: '5.0', resolved: 20, specialty: 'معاينة منزلية للعملاء المميزين' },
    { id: '47', name: 'سامي الألفي', dept: 'VIP & High-Ticket', role: 'VIP Relations', platforms: ['WhatsApp'], status: 'ONLINE', active: 3, max: 10, rating: '4.9', resolved: 16, specialty: 'إهداءات خاصة وحجز مسبق للكولكشن' },
    { id: '48', name: 'لمياء الجوهري', dept: 'VIP & High-Ticket', role: 'Concierge Specialist', platforms: ['Messenger'], status: 'ONLINE', active: 4, max: 10, rating: '5.0', resolved: 18, specialty: 'متابعة ما بعد استلام الأوردرات الفاخرة' },

    // Escalations & Claims (8 Agents)
    { id: '49', name: 'زياد بدر', dept: 'Escalations & Claims', role: 'Escalations Head', platforms: ['WhatsApp', 'Messenger'], status: 'ONLINE', active: 4, max: 8, rating: '4.9', resolved: 19, specialty: 'احتواء العملاء الغاضبين وحل المشكلات' },
    { id: '50', name: 'نهى خيري', dept: 'Escalations & Claims', role: 'Claims Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 3, max: 8, rating: '4.8', resolved: 14, specialty: 'استرجاع الأموال الفوري وتأكيد الحساب' },
    { id: '51', name: 'حازم فؤاد', dept: 'Escalations & Claims', role: 'Quality Audit', platforms: ['Instagram'], status: 'ONLINE', active: 4, max: 8, rating: '4.9', resolved: 16, specialty: 'تعويضات المنتجات المتضررة للشحن' },
    { id: '52', name: 'لبنى سليم', dept: 'Escalations & Claims', role: 'Claims Specialist', platforms: ['Messenger'], status: 'ONLINE', active: 3, max: 8, rating: '4.7', resolved: 13, specialty: 'التحقيق في شكاوى تأخير المندوب' },
    { id: '53', name: 'مدحت صادق', dept: 'Escalations & Claims', role: 'Legal & Policy', platforms: ['WebChat'], status: 'ONLINE', active: 4, max: 8, rating: '4.8', resolved: 15, specialty: 'حماية المستهلك والسياسات الرسمية' },
    { id: '54', name: 'شيرين عزمي', dept: 'Escalations & Claims', role: 'Claims Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 3, max: 8, rating: '4.9', resolved: 17, specialty: 'إصدار قسائم تعويض مجانية للعميل' },
    { id: '55', name: 'معتز الدمرداش', dept: 'Escalations & Claims', role: 'Escalations Specialist', platforms: ['Telegram'], status: 'ONLINE', active: 3, max: 8, rating: '4.8', resolved: 15, specialty: 'إعادة شحن أوردر بديل فوري مجاناً' },
    { id: '56', name: 'إلهام السواح', dept: 'Escalations & Claims', role: 'Quality Audit', platforms: ['Instagram'], status: 'ONLINE', active: 4, max: 8, rating: '4.9', resolved: 18, specialty: 'مراجعة أسباب استرجاع الشحنات' },

    // Logistics & Dispatch (5 Agents)
    { id: '57', name: 'وليد خليل', dept: 'Logistics & Dispatch', role: 'Logistics Lead', platforms: ['WhatsApp'], status: 'ONLINE', active: 6, max: 15, rating: '4.9', resolved: 44, specialty: 'تنسيق شركات الشحن (بوسطة/أرامكس)' },
    { id: '58', name: 'إنجي وجدي', dept: 'Logistics & Dispatch', role: 'Dispatch Coordinator', platforms: ['WhatsApp', 'Messenger'], status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 38, specialty: 'تصحيح العناوين الناقصة وأرقام الهواتف' },
    { id: '59', name: 'أيمن لطفي', dept: 'Logistics & Dispatch', role: 'Field Tracking', platforms: ['Telegram'], status: 'ONLINE', active: 6, max: 15, rating: '4.7', resolved: 32, specialty: 'توجيه مندوب التوصيل لمكان العميل' },
    { id: '60', name: 'شادي محروس', dept: 'Logistics & Dispatch', role: 'Dispatch Coordinator', platforms: ['WebChat'], status: 'ONLINE', active: 7, max: 15, rating: '4.9', resolved: 40, specialty: 'إصدار بوالص الشحن السريع بالباركود' },
    { id: '61', name: 'عصام عبد الفتاح', dept: 'Logistics & Dispatch', role: 'Logistics Specialist', platforms: ['WhatsApp'], status: 'ONLINE', active: 5, max: 15, rating: '4.8', resolved: 35, specialty: 'إدارة مخزون الفروع وتسليم المحافظات' },

    // Night Shift AI Guard (4 Autonomous Bots)
    { id: '62', name: 'بوت المبيعات الذكي (Gemini Pro)', dept: 'Night Shift AI Guard', role: 'AI Autonomous Closer', platforms: ['WhatsApp', 'Instagram', 'Messenger', 'Telegram', 'WebChat'], status: 'ONLINE', active: 18, max: 100, rating: '5.0', resolved: 210, specialty: 'الرد اللحظي 24/7 وتسجيل الطلبات آلياً' },
    { id: '63', name: 'بوت خدمة العملاء والأسعار (Flash)', dept: 'Night Shift AI Guard', role: 'AI Care Bot', platforms: ['WhatsApp', 'Instagram'], status: 'ONLINE', active: 22, max: 100, rating: '4.9', resolved: 245, specialty: 'الإجابة الفورية عن الكتالوج والشحن' },
    { id: '64', name: 'بوت استخراج العناوين والفواتير', dept: 'Night Shift AI Guard', role: 'AI Extraction Engine', platforms: ['WhatsApp', 'Telegram'], status: 'ONLINE', active: 14, max: 100, rating: '5.0', resolved: 180, specialty: 'تحويل رسائل العنوان لمسودة طلب بـ JSON' },
    { id: '65', name: 'بوت التحويل الإشرافي (Handover Bot)', dept: 'Night Shift AI Guard', role: 'AI Triage & Router', platforms: ['WhatsApp', 'Instagram', 'Messenger', 'Telegram', 'WebChat'], status: 'ONLINE', active: 9, max: 100, rating: '4.9', resolved: 125, specialty: 'توزيع العميل فوراً على الإيجنت البشري المناسب' }
  ];

  const filtered = fleetData.filter(agent => {
    const matchesDept = selectedDept === 'ALL' || agent.dept === selectedDept;
    const matchesPlatform = selectedPlatform === 'ALL' || agent.platforms.includes(selectedPlatform as any);
    const matchesSearch = agent.name.includes(search) || agent.dept.includes(search) || agent.specialty.includes(search);
    return matchesDept && matchesPlatform && matchesSearch;
  });

  const totalActiveChats = fleetData.reduce((sum, a) => sum + a.active, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8" dir="rtl">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-7 h-7 text-emerald-400" />
            مركز إدارة وتوزيع الأسطول (65 Specialized Enterprise Agents)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            مراقبة وتوزيع الحمل الذكي عبر 5 قنوات: WhatsApp و Instagram و Messenger و Telegram و WebChat
          </p>
        </div>

        <Link
          href="/inbox"
          className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة لصندوق الوارد</span>
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">إجمالي الأسطول المفعل</span>
          <div className="text-2xl font-extrabold text-white mt-1">65 إيجنت وبوت ذكي</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">موزعين على 5 قنوات تواصل</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">المحادثات المتزامنة قيد المعالجة</span>
          <div className="text-2xl font-extrabold text-white mt-1">{totalActiveChats} محادثة حية</div>
          <span className="text-[11px] text-teal-400 mt-1 block">توزيع ذكي بحسب التخصص والقناة</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">القنوات المتصلة</span>
          <div className="text-2xl font-extrabold text-white mt-1">5 منصات موحدة</div>
          <span className="text-[11px] text-blue-400 mt-1 block">WhatsApp / IG / Messenger / TG / Web</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">متوسط تقييم رضا العملاء</span>
          <div className="text-2xl font-extrabold text-white mt-1 flex items-center gap-1.5">
            <span>4.91</span>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block">بناءً على لهجة مصرية احترافية</span>
        </div>
      </div>

      {/* Filters by Dept & Platform */}
      <div className="max-w-7xl mx-auto bg-slate-900/80 p-4 rounded-2xl border border-slate-800 mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['ALL', 'Sales & Conversion', 'Customer Care', 'VIP & High-Ticket', 'Escalations & Claims', 'Logistics & Dispatch', 'Night Shift AI Guard'].map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedDept === dept
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {dept === 'ALL' ? 'كل الأقسام (65)' : dept}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="بحث بالاسم أو التخصص..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Platform Sub-filter */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> فلترة المنصة:
          </span>
          {['ALL', 'WhatsApp', 'Instagram', 'Messenger', 'Telegram', 'WebChat'].map(plat => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                selectedPlatform === plat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {plat === 'ALL' ? 'جميع المنصات' : plat}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid (65 Cards) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(agent => (
          <div key={agent.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-emerald-400">
                    {agent.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white truncate max-w-[150px]">{agent.name}</h3>
                    <p className="text-[11px] text-slate-400">{agent.role}</p>
                  </div>
                </div>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${agent.status === 'ONLINE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              </div>

              {/* Platform Badges */}
              <div className="flex flex-wrap gap-1 mb-3">
                {agent.platforms.map(p => (
                  <span key={p} className="text-[9px] bg-slate-950 text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded">
                    {p}
                  </span>
                ))}
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 mb-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                <div className="flex justify-between">
                  <span className="text-slate-400">التخصص:</span>
                  <span className="font-medium text-emerald-400 text-right truncate max-w-[150px]">{agent.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">محادثات جارية:</span>
                  <span className="font-bold text-white">{agent.active} / {agent.max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">تم إنجازه:</span>
                  <span className="font-semibold text-slate-200">{agent.resolved} عميل</span>
                </div>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-1.5 border border-slate-800">
                <div 
                  className={`h-full rounded-full ${agent.active / agent.max > 0.6 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${(agent.active / agent.max) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>استهلاك السعة: {Math.round((agent.active / agent.max) * 100)}%</span>
                <span className="flex items-center gap-1 text-amber-400">
                  ★ {agent.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
