'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, Clock, AlertCircle, RefreshCw, Globe, FileText, Share2, 
  TrendingUp, Eye, BarChart3, Activity, ArrowUpRight
} from 'lucide-react';

interface ChartPoint {
  label: string;
  value: number;
  x: number;
  y: number;
}

// Generate smooth cubic Bezier path for nodes
function getBezierPath(pts: { x: number; y: number }[]) {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
  
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const curr = pts[i];
    const next = pts[i + 1];
    
    // Control points at 1/3 and 2/3 distance
    const cp1x = curr.x + (next.x - curr.x) / 3;
    const cp1y = curr.y;
    const cp2x = curr.x + (2 * (next.x - curr.x)) / 3;
    const cp2y = next.y;
    
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }
  return d;
}

// Helper to map numeric width percentage to standard Tailwind width classes
const getWidthClass = (barWidth: number) => {
  const rounded = Math.min(100, Math.max(0, Math.round(barWidth / 5) * 5));
  switch (rounded) {
    case 0: return 'w-0';
    case 5: return 'w-[5%]';
    case 10: return 'w-[10%]';
    case 15: return 'w-[15%]';
    case 20: return 'w-[20%]';
    case 25: return 'w-[25%]';
    case 30: return 'w-[30%]';
    case 35: return 'w-[35%]';
    case 40: return 'w-[40%]';
    case 45: return 'w-[45%]';
    case 50: return 'w-[50%]';
    case 55: return 'w-[55%]';
    case 60: return 'w-[60%]';
    case 65: return 'w-[65%]';
    case 70: return 'w-[70%]';
    case 75: return 'w-[75%]';
    case 80: return 'w-[80%]';
    case 85: return 'w-[85%]';
    case 90: return 'w-[90%]';
    case 95: return 'w-[95%]';
    case 100: default: return 'w-full';
  }
};

export default function InteractiveAnalyticsChart({ isRtl }: { isRtl: boolean }) {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const [chartData, setChartData] = useState<any | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [isMock, setIsMock] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/analytics?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setIsMock(data.isMock);
        setChartData(data);
        setSources(data.sources || []);
        setPages(data.pages || []);
        setCountries(data.countries || []);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Fallback mock data
  const activeDataset = chartData || {
    daily: {
      title: isRtl ? 'تحليلات الزيارات اليومية' : 'Daily Traffic Analytics',
      subtitle: isRtl ? 'معدل التصفح والنشاط على مدار الـ 24 ساعة الماضية' : 'User traffic stats tracked across the last 24 hours',
      activeVisitors: 84,
      growth: '+12.4%',
      yLabels: ['2,000', '1,500', '1,000', '0'],
      sparklines: {
        today: { val: '1,842', growth: '+12.4%', path: '', fill: '' },
        week: { val: '9,840', growth: '+8.2%', path: '', fill: '' },
        month: { val: '38,420', growth: '+15.7%', path: '', fill: '' }
      },
      points: [
        { label: '00:00', value: 120, x: 60, y: 175 },
        { label: '01:00', value: 80, x: 77, y: 178 },
        { label: '02:00', value: 50, x: 94, y: 181 },
        { label: '03:00', value: 45, x: 111, y: 181 },
        { label: '04:00', value: 60, x: 128, y: 180 },
        { label: '05:00', value: 90, x: 145, y: 177 },
        { label: '06:00', value: 180, x: 162, y: 169 },
        { label: '07:00', value: 320, x: 179, y: 157 },
        { label: '08:00', value: 540, x: 196, y: 138 },
        { label: '09:00', value: 780, x: 213, y: 117 },
        { label: '10:00', value: 950, x: 230, y: 102 },
        { label: '11:00', value: 1100, x: 247, y: 89 },
        { label: '12:00', value: 1420, x: 263, y: 62 },
        { label: '13:00', value: 1680, x: 280, y: 39 },
        { label: '14:00', value: 1842, x: 297, y: 25 },
        { label: '15:00', value: 1750, x: 314, y: 33 },
        { label: '16:00', value: 1580, x: 331, y: 48 },
        { label: '17:00', value: 1310, x: 348, y: 71 },
        { label: '18:00', value: 1150, x: 365, y: 85 },
        { label: '19:00', value: 980, x: 382, y: 100 },
        { label: '20:00', value: 820, x: 399, y: 114 },
        { label: '21:00', value: 640, x: 416, y: 129 },
        { label: '22:00', value: 450, x: 433, y: 146 },
        { label: '23:00', value: 280, x: 450, y: 161 }
      ],
      pathD: '',
      fillD: ''
    },
    weekly: {
      title: isRtl ? 'تحليلات الزيارات الأسبوعية' : 'Weekly Traffic Analytics',
      subtitle: isRtl ? 'معدل التصفح والنشاط على مدار أيام الأسبوع السبعة' : 'User traffic stats tracked across the seven days of the week',
      activeVisitors: 512,
      growth: '+18.7%',
      yLabels: ['3,000', '2,000', '1,000', '0'],
      sparklines: {
        today: { val: '2,140', growth: '+15.2%', path: '', fill: '' },
        week: { val: '14,890', growth: '+18.7%', path: '', fill: '' },
        month: { val: '46,120', growth: '+22.3%', path: '', fill: '' }
      },
      points: [
        { label: isRtl ? 'الإثنين' : 'Mon', value: 840, x: 60, y: 130 },
        { label: isRtl ? 'الثلاثاء' : 'Tue', value: 1240, x: 125, y: 100 },
        { label: isRtl ? 'الأربعاء' : 'Wed', value: 1890, x: 190, y: 60 },
        { label: isRtl ? 'الخميس' : 'Thu', value: 2420, x: 255, y: 30 },
        { label: isRtl ? 'الجمعة' : 'Fri', value: 1810, x: 320, y: 65 },
        { label: isRtl ? 'السبت' : 'Sat', value: 980, x: 385, y: 120 },
        { label: isRtl ? 'الأحد' : 'Sun', value: 1450, x: 450, y: 85 }
      ],
      pathD: '',
      fillD: ''
    },
    monthly: {
      title: isRtl ? 'تحليلات الزيارات الشهرية' : 'Monthly Traffic Analytics',
      subtitle: isRtl ? 'إجمالي عدد الزيارات للأكاديمية على مدار الـ 6 أشهر الماضية' : 'Total monthly visit counts tracked across the last 6 months',
      activeVisitors: 2840,
      growth: '+25.3%',
      yLabels: ['40,000', '30,000', '20,000', '0'],
      sparklines: {
        today: { val: '1,980', growth: '+9.4%', path: '', fill: '' },
        week: { val: '11,420', growth: '+11.2%', path: '', fill: '' },
        month: { val: '58,400', growth: '+25.3%', path: '', fill: '' }
      },
      points: [
        { label: isRtl ? 'يناير' : 'Jan', value: 8200, x: 60, y: 155 },
        { label: isRtl ? 'فبراير' : 'Feb', value: 12400, x: 138, y: 130 },
        { label: isRtl ? 'مارس' : 'Mar', value: 18900, x: 216, y: 95 },
        { label: isRtl ? 'أبريل' : 'Apr', value: 28400, x: 294, y: 55 },
        { label: isRtl ? 'مايو' : 'May', value: 31200, x: 372, y: 40 },
        { label: isRtl ? 'يونيو' : 'Jun', value: 38420, x: 450, y: 25 }
      ],
      pathD: '',
      fillD: ''
    }
  };

  const currentData = activeDataset[activeTab];

  // Scale x-coordinates for SVG layout (60px to 740px)
  const scaleX = (x: number) => {
    const percent = (x - 60) / (450 - 60);
    return 60 + percent * (740 - 60);
  };

  const rawYValues = currentData.points.map((p: ChartPoint) => p.y);
  const minY = Math.min(...rawYValues);
  const maxY = Math.max(...rawYValues);

  const points = currentData.points.map((pt: ChartPoint) => {
    let scaledY = pt.y;
    if (maxY !== minY) {
      // Map range [minY, 185] to [15, 185]
      const percent = (185 - pt.y) / (185 - minY);
      scaledY = 185 - percent * 170; // 185 - 15 = 170
    }
    return {
      ...pt,
      x: scaleX(pt.x),
      y: scaledY
    };
  });

  let displayPoints = [...points];
  if (displayPoints.length === 1) {
    displayPoints = [
      { ...displayPoints[0], x: 60 },
      { ...displayPoints[0], x: 740 }
    ];
  } else if (displayPoints.length === 0) {
    displayPoints = [
      { label: '00:00', value: 0, x: 60, y: 185 },
      { label: '24:00', value: 0, x: 740, y: 185 }
    ];
  }

  const curvePath = getBezierPath(displayPoints);
  const fillPath = displayPoints.length > 0 
    ? `${curvePath} L ${displayPoints[displayPoints.length - 1].x} 185 L ${displayPoints[0].x} 185 Z`
    : '';

  const formatLabel = (label: string) => {
    if (activeTab === 'daily') {
      const parts = label.split(':');
      const hour = parseInt(parts[0], 10);
      if (!isNaN(hour)) {
        const ampm = hour >= 12 ? (isRtl ? 'م' : 'PM') : (isRtl ? 'ص' : 'AM');
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        return `${hour12} ${ampm}`;
      }
    }
    return label;
  };

  // Secondary lists
  const activeSources = sources.length > 0 ? sources : [
    { name: 'Google Search (Organic)', count: 1842 },
    { name: 'Direct Traffic', count: 1075 },
    { name: 'Social Media (Facebook/IG)', count: 614 },
    { name: 'Referral Links', count: 309 },
    { name: 'WhatsApp', count: 125 }
  ];
  const activePages = pages.length > 0 ? pages : [
    { name: '/ar (الرئيسية)', count: 2450 },
    { name: '/ar/programs/quran-memorization', count: 1820 },
    { name: '/ar/pricing (الأسعار)', count: 980 },
    { name: '/ar/teachers (المعلمون)', count: 850 },
    { name: '/ar/about (من نحن)', count: 420 }
  ];
  const activeCountries = countries.length > 0 ? countries : [
    { name: 'Egypt (مصر)', count: 1540 },
    { name: 'Saudi Arabia (السعودية)', count: 1210 },
    { name: 'United Arab Emirates (الإمارات)', count: 680 },
    { name: 'Qatar (قطر)', count: 320 },
    { name: 'Kuwait (الكويت)', count: 280 }
  ];

  const maxSource = Math.max(...activeSources.map(s => s.count), 1);
  const maxPage = Math.max(...activePages.map(p => p.count), 1);
  const maxCountry = Math.max(...activeCountries.map(c => c.count), 1);
  const totalSourceCount = activeSources.reduce((s, v) => s + v.count, 0);
  const totalPageCount = activePages.reduce((s, v) => s + v.count, 0);
  const totalCountryCount = activeCountries.reduce((s, v) => s + v.count, 0);

  const fmt = (n: number) => new Intl.NumberFormat('en-US').format(n);

  // Stat cards config with specific premium gradients and SVG sparkline paths
  const statCards = [
    {
      key: 'today',
      label: activeTab === 'daily' ? (isRtl ? 'زيارات اليوم' : "Today's Visits") : activeTab === 'weekly' ? (isRtl ? 'أول يوم' : 'Day 1') : (isRtl ? 'بداية الشهر' : 'Start of Month'),
      value: currentData.sparklines.today.val,
      growth: currentData.sparklines.today.growth,
      icon: Eye,
      gradient: 'from-[#FAF6EC] via-white to-[#FDFBF7]',
      accentColor: 'text-[#B8841A]',
      iconColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      sparkPath: 'M0 15 Q12 5, 25 12 T50 4',
      sparkStroke: '#D4A843'
    },
    {
      key: 'week',
      label: activeTab === 'daily' ? (isRtl ? 'إجمالي الأسبوع' : 'This Week') : activeTab === 'weekly' ? (isRtl ? 'إجمالي الفترة' : 'This Period') : (isRtl ? 'إجمالي الربع' : 'This Quarter'),
      value: currentData.sparklines.week.val,
      growth: currentData.sparklines.week.growth,
      icon: BarChart3,
      gradient: 'from-white via-[#F7F9FC] to-[#F0F4FA]/30',
      accentColor: 'text-blue-600',
      iconColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      sparkPath: 'M0 18 C10 8, 20 15, 30 5 C40 10, 45 2, 50 4',
      sparkStroke: '#3B82F6'
    },
    {
      key: 'month',
      label: isRtl ? 'إجمالي المجموع' : 'Total Aggregate',
      value: currentData.sparklines.month.val,
      growth: currentData.sparklines.month.growth,
      icon: TrendingUp,
      gradient: 'from-white via-[#F6FCF8] to-[#EEFAF1]/30',
      accentColor: 'text-emerald-600',
      iconColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      sparkPath: 'M0 14 Q15 2, 30 18 T50 4',
      sparkStroke: '#10B981'
    }
  ];

  const breakdownSections = [
    {
      title: isRtl ? 'مصادر الزيارات' : 'Traffic Sources',
      icon: Share2,
      items: activeSources,
      max: maxSource,
      total: totalSourceCount,
      barColor: 'bg-gradient-to-r from-[#D4A843] to-[#B8841A]',
      trackColor: 'bg-[#F2ECD8]/50',
      accentText: 'text-[#8C6D27]',
      accentBg: 'bg-[#FDFBF7]'
    },
    {
      title: isRtl ? 'الصفحات الأكثر زيارة' : 'Top Pages',
      icon: FileText,
      items: activePages,
      max: maxPage,
      total: totalPageCount,
      barColor: 'bg-gradient-to-r from-blue-500 to-blue-400',
      trackColor: 'bg-blue-100/50',
      accentText: 'text-blue-600',
      accentBg: 'bg-blue-50/50'
    },
    {
      title: isRtl ? 'التوزيع الجغرافي' : 'Top Countries',
      icon: Globe,
      items: activeCountries,
      max: maxCountry,
      total: totalCountryCount,
      barColor: 'bg-gradient-to-r from-emerald-500 to-emerald-400',
      trackColor: 'bg-emerald-100/50',
      accentText: 'text-emerald-600',
      accentBg: 'bg-emerald-50/50'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-white via-[#FCFBF9] to-[#FAF8F4] border border-gold-muted/20 rounded-3xl flex flex-col text-start relative overflow-hidden shadow-[0_20px_50px_rgba(139,115,85,0.06)] transition-all duration-300">
      
      {/* Subtle luxury design pattern background */}
      <div className="absolute inset-0 bg-[url('/images/pattern-8star.svg')] bg-[size:70px_70px] opacity-[0.015] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/3 rounded-full blur-[100px] pointer-events-none" />

      {/* ═══ HEADER SECTION ═══ */}
      <div className="p-5 sm:p-6 pb-0 sm:pb-0 relative z-10">
        <div className="flex flex-col gap-4 mb-5 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/20 flex items-center justify-center shrink-0 shadow-sm">
                  <Activity size={18} className="text-[#8C6D27]" />
                </div>
                <h3 className="font-bold text-midnight text-sm sm:text-base font-primary leading-tight tracking-tight">
                  {currentData.title}
                </h3>
                
                {/* Connection Status Badge */}
                {loading ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold bg-[#FAF6EC] text-stone animate-pulse font-ui shrink-0">
                    <RefreshCw size={9} className="animate-spin text-stone/50" />
                    <span>{isRtl ? 'جاري التحديث...' : 'Refreshing...'}</span>
                  </span>
                ) : isMock ? (
                  <span 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold bg-amber-50/70 text-amber-700 border border-amber-200/50 font-ui cursor-help select-none shrink-0" 
                    title={isRtl ? 'بيانات توضيحية. لربط تحليلات جوجل الحقيقية، اضبط مفتاح التتبع GA_PROPERTY_ID في ملف الإعدادات' : 'Mock statistics view. Connect Google Analytics service account key to load live stats'}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    <span>{isRtl ? 'وضع محاكاة' : 'Simulated'}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50 font-ui select-none shrink-0">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span>{isRtl ? 'متصل مباشر' : 'Live'}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <p className="text-[10px] sm:text-[11px] text-stone/50 font-ui">
                  {currentData.subtitle}
                </p>
                {lastUpdated && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] text-stone/35 font-mono">
                    <Clock size={8} />
                    {lastUpdated.toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
            </div>

            {/* Tab Selector + Refresh */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="inline-flex rounded-xl bg-[#F2ECD8]/40 p-1 border border-gold-muted/15 shadow-inner">
                {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setHoveredIndex(null);
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold tracking-wide font-ui transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-to-b from-gold to-[#B8841A] text-white shadow-[0_4px_12px_rgba(184,132,26,0.15)]'
                        : 'text-stone/60 hover:text-midnight hover:bg-white/55'
                    }`}
                  >
                    {tab === 'daily' ? (isRtl ? 'يومي' : 'Day') : tab === 'weekly' ? (isRtl ? 'أسبوعي' : 'Week') : (isRtl ? 'شهري' : 'Month')}
                  </button>
                ))}
              </div>
              <button
                onClick={fetchAnalytics}
                disabled={loading}
                className="p-2 rounded-lg text-stone/40 hover:text-gold hover:bg-gold/5 border border-transparent hover:border-gold/15 transition-all duration-300 disabled:opacity-30"
                title={isRtl ? 'تحديث البيانات' : 'Refresh data'}
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ STAT CARDS WITH MINI TRENDS ═══ */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6 mb-5 sm:mb-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.key} 
                className={`p-2.5 sm:p-4 md:p-5 rounded-2xl bg-gradient-to-br ${card.gradient} border border-gold-muted/15 flex flex-col md:flex-row items-center md:items-center text-center md:text-start gap-2 sm:gap-3 hover:border-gold-muted hover:shadow-[0_10px_30px_rgba(139,115,85,0.04)] transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Micro trend graphic watermark in background */}
                <div className="absolute bottom-1 right-2 w-12 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none hidden md:block">
                  <svg viewBox="0 0 50 20" className="w-full h-full">
                    <path d={card.sparkPath} fill="none" stroke={card.sparkStroke} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl border ${card.iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon size={14} className="stroke-[1.5] sm:hidden" />
                  <Icon size={18} className="stroke-[1.5] hidden sm:block" />
                </div>
                <div className="flex-1 min-w-0 text-center md:text-start w-full">
                  <span className="text-[7.5px] sm:text-[9.5px] text-stone/45 font-bold font-ui block uppercase tracking-wider leading-tight truncate">
                    {card.label}
                  </span>
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start sm:items-baseline gap-0.5 sm:gap-1.5 mt-0.5 sm:mt-1">
                    <p className="text-sm sm:text-lg md:text-2xl font-bold text-midnight font-primary leading-tight tracking-tight">{card.value}</p>
                    <span className={`text-[7.5px] sm:text-[9.5px] font-bold font-mono px-1 rounded bg-white/70 shadow-sm border border-gold-muted/5 ${
                      card.growth === 'live' ? 'text-emerald-500' : card.growth.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {card.growth === 'live' ? 'Live' : card.growth}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Point Details Readout Strip */}
      <div className="mx-5 sm:mx-6 mb-4 p-3 rounded-xl bg-gold/5 border border-gold-muted/15 min-h-[44px] flex items-center justify-between transition-all duration-300 relative z-10">
        {hoveredIndex !== null ? (
          <div className={`w-full flex items-center justify-between gap-4 text-xs font-ui ${isRtl ? 'flex-row-reverse text-right' : 'flex-row text-start'}`}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-midnight">
                {activeTab === 'daily' ? (isRtl ? 'التوقيت:' : 'Time:') : activeTab === 'weekly' ? (isRtl ? 'اليوم:' : 'Day:') : (isRtl ? 'الشهر:' : 'Month:')}
              </span>
              <span className="text-[#8C6D27] font-bold font-mono">
                {formatLabel(displayPoints[hoveredIndex].label)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-midnight">
                {isRtl ? 'الزيارات الكلية:' : 'Total Visits:'}
              </span>
              <span className="text-midnight font-bold font-mono text-sm">
                {fmt(displayPoints[hoveredIndex].value)}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-stone/50">
                {isRtl ? 'الحالة:' : 'Status:'}
              </span>
              <span className="text-emerald-600 font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[9px] uppercase tracking-wide">
                {isRtl ? 'مستقر' : 'Stable'}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full text-center text-[10px] text-stone/40 font-ui flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-gold animate-ping"></div>
            <span>
              {isRtl 
                ? 'حرك مؤشر الماوس فوق نقاط الشارت لعرض التحليلات التفصيلية بالساعة' 
                : 'Hover over the chart points to inspect detailed hourly analytics'}
            </span>
          </div>
        )}
      </div>

      {/* ═══ CHART SECTION ═══ */}
      <div className="px-3 sm:px-6 pb-3">
        <div className="flex-grow flex flex-col justify-end min-h-[220px] sm:min-h-[280px] md:min-h-[320px] relative">
          {currentData.points.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-stone/35">
              <div className="w-14 h-14 rounded-2xl bg-stone/5 flex items-center justify-center mb-3">
                <AlertCircle size={22} className="text-stone/30" />
              </div>
              <span className="text-xs font-semibold font-ui">{isRtl ? 'لا توجد بيانات حركة مرور مسجلة بعد' : 'No traffic stats captured yet'}</span>
              <span className="text-[10px] text-stone/25 mt-1 font-ui">{isRtl ? 'ستظهر البيانات فور الاتصال بتحليلات جوجل' : 'Data will appear once Google Analytics is connected'}</span>
            </div>
          ) : (
            <svg className="w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-visible" viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="chartLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D4A843" />
                  <stop offset="50%" stopColor="#B8841A" />
                  <stop offset="100%" stopColor="#D4A843" />
                </linearGradient>
                <linearGradient id="chartFillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A843" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#D4A843" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gridGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#DDD0B3" stopOpacity="0" />
                  <stop offset="10%" stopColor="#DDD0B3" stopOpacity="0.2" />
                  <stop offset="90%" stopColor="#DDD0B3" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#DDD0B3" stopOpacity="0" />
                </linearGradient>
                <filter id="lineGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#B8841A" floodOpacity="0.32" />
                </filter>
              </defs>
              
              {/* Horizontal gridlines with gradient fade */}
              {[35, 85, 135, 185].map((y, i) => (
                <line key={`h-${i}`} x1="50" y1={y} x2="770" y2={y} stroke="url(#gridGradient)" strokeWidth={y === 185 ? '0.8' : '0.5'} strokeDasharray={y === 185 ? 'none' : '4 4'} />
              ))}

              {/* Left Y-axis Grid Labels */}
              <g className="select-none pointer-events-none text-[8.5px] font-ui" fill="#8C7A68" opacity="0.6" textAnchor="end">
                {currentData.yLabels.map((label: string, i: number) => (
                  <text key={i} x="42" y={35 + i * 50 + 3}>{label}</text>
                ))}
              </g>

              {/* Spline Area Fill */}
              <path d={fillPath} fill="url(#chartFillGradient)" className="transition-all duration-500" />

              {/* Spline Line Stroke with Drop Glow Shadow */}
              <path d={curvePath} stroke="url(#chartLineGradient)" strokeWidth="3.5" fill="none" filter="url(#lineGlow)" strokeLinecap="round" className="transition-all duration-500" />

              {/* Draw Interactive Nodes (Hidden by default, shown ONLY on hover) */}
              {(() => {
                return displayPoints.map((pt, i) => {
                  const isHovered = hoveredIndex === i;
                  if (!isHovered) return (
                    <g key={i}>
                      {/* Invisible columns for mouse triggers */}
                      <rect
                        x={pt.x - 14}
                        y={15}
                        width="28"
                        height="195"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onTouchStart={() => setHoveredIndex(i)}
                        onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 1500)}
                      />
                    </g>
                  );

                  return (
                    <g key={i}>
                      {/* Vertical line guideline laser on hover */}
                      <line 
                        x1={pt.x} y1={25} x2={pt.x} y2={185} 
                        stroke="#B8841A" strokeWidth="1" strokeDasharray="3 3" opacity="0.4"
                      />

                      {/* Outer pulse glow circle on hover */}
                      <circle cx={pt.x} cy={pt.y} r="10" fill="#B8841A" opacity="0.3" className="animate-ping" />

                      {/* Outer stroke circle point node */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r="6" 
                        fill="#FFFFFF" 
                        stroke="#B8841A" 
                        strokeWidth="3" 
                        className="transition-all duration-200 cursor-pointer shadow-md"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onTouchStart={() => setHoveredIndex(i)}
                        onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 1500)}
                      />

                      {/* Value label on top of hovered node */}
                      <text
                        x={pt.x}
                        y={pt.y - 12}
                        textAnchor="middle"
                        fill="#1C1812"
                        fontSize="9.5"
                        className="select-none pointer-events-none font-bold font-ui text-[9.5px]"
                      >
                        {fmt(pt.value)}
                      </text>

                      {/* Invisible columns for mouse triggers */}
                      <rect
                        x={pt.x - 14}
                        y={15}
                        width="28"
                        height="195"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onTouchStart={() => setHoveredIndex(i)}
                        onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 1500)}
                      />
                    </g>
                  );
                });
              })()}
              
              {/* Bottom X-axis Labels */}
              {displayPoints.map((pt, i) => {
                const showOnMobile = activeTab !== 'daily' || i % 4 === 0 || i === displayPoints.length - 1;
                return (
                  <text 
                    key={i}
                    x={pt.x} 
                    y="202" 
                    fill={hoveredIndex === i ? '#B8841A' : '#8C7A68'} 
                    fontSize="8"
                    textAnchor="middle"
                    className={`select-none pointer-events-none transition-colors duration-200 font-ui text-[8px] ${
                      hoveredIndex === i ? 'font-bold' : 'font-medium'
                    } ${showOnMobile ? '' : 'hidden sm:block'}`}
                  >
                    {formatLabel(pt.label)}
                  </text>
                );
              })}
            </svg>
          )}
        </div>
      </div>

      {/* ═══ ANALYTICS BREAKDOWN SECTION ═══ */}
      <div className="border-t border-gold-muted/15 mx-5 sm:mx-6"></div>
      
      <div className="p-5 sm:p-6 pt-5 sm:pt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {breakdownSections.map((section, sectionIdx) => {
            const SectionIcon = section.icon;
            return (
              <div key={sectionIdx} className="space-y-4">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl ${section.accentBg} border border-gold-muted/10 flex items-center justify-center shadow-sm`}>
                      <SectionIcon size={15} className={section.accentText} />
                    </div>
                    <h4 className="font-bold text-midnight text-xs sm:text-sm font-primary tracking-tight">
                      {section.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-stone/40 font-mono font-bold">
                    {fmt(section.total)}
                  </span>
                </div>

                {/* Ranked Items Leaderboard */}
                <div className="space-y-3">
                  {section.items.map((item, i) => {
                    const percentage = Math.round((item.count / section.total) * 100);
                    const barWidth = (item.count / section.max) * 100;
                    return (
                      <div key={i} className="group p-2 rounded-xl hover:bg-white hover:shadow-[0_4px_20px_rgba(139,115,85,0.03)] border border-transparent hover:border-gold-muted/10 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          {/* Rank Badge */}
                          <div className={`w-6 h-6 rounded-lg ${i === 0 ? 'bg-gold/10' : 'bg-stone/5'} flex items-center justify-center shrink-0 border border-gold-muted/5`}>
                            <span className={`text-[9px] font-bold font-mono ${i === 0 ? 'text-[#8C6D27]' : 'text-stone/40'}`}>
                              {i + 1}
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className={`flex items-center justify-between gap-2 mb-1.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                              <span className={`text-[11px] font-semibold font-ui truncate ${i === 0 ? 'text-midnight font-bold' : 'text-stone/75'}`}>
                                {item.name}
                              </span>
                              <div className={`flex items-center gap-1.5 shrink-0 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                                <span className="text-[11px] font-bold font-mono text-midnight">{fmt(item.count)}</span>
                                <span className={`text-[8.5px] font-bold font-mono px-1.5 py-0.5 rounded-full ${section.accentBg} ${section.accentText} border border-gold-muted/5`}>
                                  {percentage}%
                                </span>
                              </div>
                            </div>
                            
                            {/* Progress Bar with RTL mirroring */}
                            <div className={`w-full h-1.5 ${section.trackColor} rounded-full overflow-hidden relative shadow-inner`}>
                              <div 
                                className={`h-full rounded-full ${section.barColor} transition-all duration-1000 ease-out absolute ${
                                  isRtl ? 'right-0' : 'left-0'
                                } ${getWidthClass(barWidth)}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
