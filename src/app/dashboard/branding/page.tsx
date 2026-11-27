'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Palette, 
  Upload, 
  Smartphone, 
  Monitor, 
  Check, 
  Sparkles, 
  Save, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Image as ImageIcon,
  Flame,
  Dumbbell,
  Award,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { DEFAULT_BRANDING, TenantBranding, isValidHexColor } from '@/lib/branding';

export default function BrandingStudioPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // Form State
  const [brandName, setBrandName] = useState('كوتش تامر سيف');
  const [coachTitle, setCoachTitle] = useState('مدرب لياقة بدنية معتمد NASM & Olympia Coach');
  const [welcomeMessage, setWelcomeMessage] = useState('عاش يا بطل! جاهز لتمرين اليوم؟');
  const [primaryColor, setPrimaryColor] = useState('#D4F60B');
  const [secondaryColor, setSecondaryColor] = useState('#7C3AED');
  const [logoUrl, setLogoUrl] = useState('/brand-pr-logo.png');
  const [appIconUrl, setAppIconUrl] = useState('/brand-pr-logo.png');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  // Preset palettes
  const colorPresets = [
    { name: 'Neon Lime & Royal Purple (CoachPR Default)', primary: '#D4F60B', secondary: '#7C3AED' },
    { name: 'Cyber Cyan & Electric Violet', primary: '#06B6D4', secondary: '#8B5CF6' },
    { name: 'Volt Gold & Crimson Fire', primary: '#FACC15', secondary: '#EF4444' },
    { name: 'Emerald Beast & Dark Slate', primary: '#10B981', secondary: '#6366F1' },
    { name: 'Titan Orange & Neon Amber', primary: '#F97316', secondary: '#EC4899' },
  ];

  useEffect(() => {
    async function loadBranding() {
      try {
        const res = await fetch('/api/branding');
        const json = await res.json();
        if (json.success && json.branding) {
          const b: TenantBranding = json.branding;
          setBrandName(b.brandName || 'كوتش تامر سيف');
          setCoachTitle(b.coachTitle || DEFAULT_BRANDING.coachTitle);
          setWelcomeMessage(b.welcomeMessage || DEFAULT_BRANDING.welcomeMessage);
          setPrimaryColor(b.primaryColor || '#D4F60B');
          setSecondaryColor(b.secondaryColor || '#7C3AED');
          if (b.logoUrl) setLogoUrl(b.logoUrl);
          if (b.appIconUrl) setAppIconUrl(b.appIconUrl);
        }
      } catch (err) {
        console.warn('Failed to load branding:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBranding();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'icon') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الملف يجب ألا يتجاوز 5 ميجابايت');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    if (type === 'logo') setUploadingLogo(true);
    else setUploadingIcon(true);

    try {
      const res = await fetch('/api/branding/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (type === 'logo') setLogoUrl(data.url);
        else setAppIconUrl(data.url);
        toast.success(`تم رفع ${type === 'logo' ? 'شعار البراند' : 'أيقونة التطبيق'} بنجاح!`);
      } else {
        toast.error(data.error || 'فشل في رفع الصورة');
      }
    } catch (err) {
      toast.error('حدث خطأ أثناء رفع الصورة');
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingIcon(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidHexColor(primaryColor) || !isValidHexColor(secondaryColor)) {
      toast.error('يرجى التأكد من كتابة كود لون سداسي صحيح (مثل #D4F60B)');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/branding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          coachTitle,
          welcomeMessage,
          primaryColor,
          secondaryColor,
          logoUrl,
          appIconUrl
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('تم حفظ هوية البراند وتحديث تطبيق اللاعب بنجاح!');
      } else {
        toast.error(data.error || 'فشل في حفظ التعديلات');
      }
    } catch (err) {
      toast.error('حدث خطأ أثناء حفظ الهوية');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = () => {
    setBrandName(DEFAULT_BRANDING.brandName);
    setCoachTitle(DEFAULT_BRANDING.coachTitle);
    setWelcomeMessage(DEFAULT_BRANDING.welcomeMessage);
    setPrimaryColor(DEFAULT_BRANDING.primaryColor);
    setSecondaryColor(DEFAULT_BRANDING.secondaryColor);
    setLogoUrl(DEFAULT_BRANDING.logoUrl || '/brand-pr-logo.png');
    setAppIconUrl(DEFAULT_BRANDING.appIconUrl || '/brand-pr-logo.png');
    toast.info('تمت استعادة الهوية الافتراضية');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles size={14} /> White Label Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            استوديو تخصيص هوية التطبيق للمدربين
          </h1>
          <p className="text-xs text-text-secondary mt-1 max-w-2xl">
            خصص واجهة وتطبيق المتدربين الخاص بك بالكامل (الاسم، الشعار، الألوان التفاعلية، ورسالة الترحيب). تظل هوية منصة CoachPR الأساسية ولوحة التحكم آمنة ومحمية.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-white bg-surface hover:bg-white/10 border border-border transition flex items-center gap-1.5"
          >
            <RotateCcw size={13} /> استعادة الافتراضي
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Studio Controls Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* 1. Basic Brand Info */}
            <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-border pb-3">
                <Palette size={16} className="text-primary" /> البيانات الأساسية للعلامة التجارية
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/70 block mb-1.5">اسم البراند / الأكاديمية</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    placeholder="مثال: Tamer Seif Pro Team"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary transition"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-white/70 block mb-1.5">اللقب المهني للمدرب</label>
                  <input
                    type="text"
                    value={coachTitle}
                    onChange={e => setCoachTitle(e.target.value)}
                    placeholder="مدرب معتمد NASM / كابتن كمال أجسام"
                    className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white/70 block mb-1.5">رسالة الترحيب اليومية للاعب في التطبيق</label>
                <input
                  type="text"
                  value={welcomeMessage}
                  onChange={e => setWelcomeMessage(e.target.value)}
                  placeholder="عاش يا بطل! جاهز لكسر أرقام جديدة النهاردة؟"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary transition"
                />
              </div>
            </div>

            {/* 2. Visual Assets Upload (Logo & App Icon) */}
            <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-border pb-3">
                <ImageIcon size={16} className="text-primary" /> الشعارات والأيقونات (PNG, WEBP, SVG)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Brand Logo */}
                <div className="bg-surface/60 border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                  <span className="text-xs font-bold text-white/80">شعار البراند (Logo)</span>
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center p-2 overflow-hidden shadow-inner">
                    <img src={logoUrl} alt="Brand Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={e => handleFileUpload(e, 'logo')}
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadingLogo}
                    className="w-full bg-card hover:bg-white/5 border border-border text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload size={13} /> {uploadingLogo ? 'جارِ الرفع...' : 'تغيير الشعار'}
                  </button>
                  <span className="text-[10px] text-text-secondary">الحد الأقصى 5MB (خلفية شفافة مفضلة)</span>
                </div>

                {/* App PWA Icon */}
                <div className="bg-surface/60 border border-border rounded-2xl p-4 flex flex-col items-center text-center space-y-3">
                  <span className="text-xs font-bold text-white/80">أيقونة شاشة الموبايل (PWA Icon)</span>
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center p-2 overflow-hidden shadow-inner">
                    <img src={appIconUrl} alt="App Icon" className="max-w-full max-h-full object-contain" />
                  </div>
                  <input
                    type="file"
                    ref={iconInputRef}
                    onChange={e => handleFileUpload(e, 'icon')}
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => iconInputRef.current?.click()}
                    disabled={uploadingIcon}
                    className="w-full bg-card hover:bg-white/5 border border-border text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload size={13} /> {uploadingIcon ? 'جارِ الرفع...' : 'تغيير الأيقونة'}
                  </button>
                  <span className="text-[10px] text-text-secondary">مربعة الأبعاد 512x512 أو 192x192</span>
                </div>

              </div>
            </div>

            {/* 3. Color Accents & Presets */}
            <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-border pb-3">
                <Palette size={16} className="text-primary" /> الألوان التفاعلية لتطبيق المتدربين
              </h2>

              {/* Color Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-white/70 block mb-1.5">لون الأزرار والتفاعل الأساسي (Primary Accent)</label>
                  <div className="flex items-center gap-3 bg-surface border border-border rounded-xl p-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value.toUpperCase())}
                      className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="flex-1 bg-transparent border-0 text-xs font-mono font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-white/70 block mb-1.5">اللون الثانوي والتمييز (Secondary Accent)</label>
                  <div className="flex items-center gap-3 bg-surface border border-border rounded-xl p-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={e => setSecondaryColor(e.target.value.toUpperCase())}
                      className="w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={e => setSecondaryColor(e.target.value)}
                      className="flex-1 bg-transparent border-0 text-xs font-mono font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Palette Quick Presets */}
              <div>
                <label className="text-xs font-bold text-text-secondary block mb-2">قوالب ألوان احترافية جاهزة:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {colorPresets.map(preset => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        setPrimaryColor(preset.primary);
                        setSecondaryColor(preset.secondary);
                        toast.info(`تم تفعيل باليت: ${preset.name}`);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-surface hover:bg-white/5 border border-border text-right text-xs transition cursor-pointer"
                    >
                      <span className="text-white font-medium text-[11px] truncate">{preset.name}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.primary }}></span>
                        <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.secondary }}></span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Boundary Notice */}
              <div className="p-3.5 rounded-2xl bg-surface/50 border border-white/5 flex items-start gap-2 text-[11px] text-text-secondary">
                <ShieldCheck size={16} className="text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>حماية الهوية الأساسية:</strong> تظل خلفية الشاشة السوداء الفحمية (#07060C) والأسطح المعتمدة ثابتة لضمان أقصى تباين وسهولة قراءة أثناء التمارين تحت إضاءة الجيم.
                </span>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary hover:bg-[#c2e205] text-black px-8 py-3 rounded-2xl font-black text-xs transition flex items-center gap-2 shadow-[0_0_20px_rgba(212,246,11,0.35)] cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Save size={15} /> {saving ? 'جارِ الحفظ والتعميم...' : 'حفظ وتطبيق الهوية فوراً'}
              </button>
            </div>

          </form>
        </div>

        {/* Right / Live Interactive Preview Studio (5 Cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Eye size={15} className="text-primary" /> المعاينة الحية لتطبيق اللاعب
            </h3>
            
            {/* Viewport Toggles */}
            <div className="flex items-center gap-1 bg-card border border-border p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-bold transition ${
                  previewDevice === 'mobile' ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'
                }`}
              >
                <Smartphone size={14} /> موبايل
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg text-xs flex items-center gap-1 font-bold transition ${
                  previewDevice === 'desktop' ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'
                }`}
              >
                <Monitor size={14} /> ديسكتوب
              </button>
            </div>
          </div>

          {/* Interactive Frame Simulator */}
          <div className={`mx-auto transition-all duration-300 ${previewDevice === 'mobile' ? 'max-w-[340px]' : 'w-full'}`}>
            <div className="rounded-[36px] border-4 border-[#24242B] bg-[#07060C] overflow-hidden shadow-2xl p-4 space-y-4 text-white">
              
              {/* Sim Phone Top Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#111116] border border-white/10 flex items-center justify-center p-1 overflow-hidden">
                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white leading-tight">{brandName}</h4>
                    <p className="text-[10px] text-text-secondary truncate max-w-[130px]">{coachTitle}</p>
                  </div>
                </div>
                <div 
                  className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </div>

              {/* Sim Welcome Banner */}
              <div 
                className="p-3.5 rounded-2xl border flex items-center justify-between"
                style={{ 
                  backgroundColor: '#111116',
                  borderColor: `${primaryColor}40`
                }}
              >
                <div>
                  <span className="text-[10px] font-bold block" style={{ color: primaryColor }}>
                    رسالة المدرب اليوم
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">{welcomeMessage}</p>
                </div>
                <Flame size={18} style={{ color: primaryColor }} />
              </div>

              {/* Sim Today Workout Card */}
              <div className="bg-[#111116] border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-white/5 text-white/70 px-2 py-0.5 rounded-full font-bold">
                    اليوم: السبت
                  </span>
                  <span className="text-xs font-bold" style={{ color: secondaryColor }}>
                    4 تمارين متبقية
                  </span>
                </div>
                <div>
                  <h5 className="text-sm font-black text-white">Push Day &bull; بنش وتراي</h5>
                  <p className="text-[11px] text-text-secondary mt-0.5">التركيز على الضخامة والقوة</p>
                </div>
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer"
                  style={{ 
                    backgroundColor: primaryColor, 
                    color: '#090A0A'
                  }}
                >
                  <Dumbbell size={14} /> ابدأ التمرين الآن
                </button>
              </div>

              {/* Sim Progress Indicators */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#111116] border border-white/5">
                  <span className="text-[10px] text-text-secondary block">الالتزام الأسبوعي</span>
                  <span className="text-base font-black" style={{ color: primaryColor }}>100%</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111116] border border-white/5">
                  <span className="text-[10px] text-text-secondary block">الرقم القياسي (PR)</span>
                  <span className="text-base font-black" style={{ color: secondaryColor }}>140 كجم</span>
                </div>
              </div>

              {/* Sim Bottom Navigation */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-around text-text-secondary text-[10px]">
                <div className="flex flex-col items-center gap-1 font-bold" style={{ color: primaryColor }}>
                  <Dumbbell size={14} />
                  <span>التمارين</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <TrendingUp size={14} />
                  <span>التقدم</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <MessageSquare size={14} />
                  <span>الكوتش</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
