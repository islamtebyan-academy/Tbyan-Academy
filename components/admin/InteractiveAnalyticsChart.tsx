'use client';

import React, { useState, useEffect } from 'react';
import { Users, Clock, AlertCircle, RefreshCw, Globe, FileText, Share2, TrendingUp } from 'lucide-react';

interface ChartPoint {
  label: string;
  value: number;
  x: number;
  y: number;
}

interface TabData {
  title: string;
  subtitle: string;
  activeVisitors: number;
  growth: string;
  yLabels: string[];
  sparklines: {
    today: { val: string; growth: string; path: string; fill: string };
    week: { val: string; growth: string; path: string; fill: string };
    month: { val: string; growth: string; path: string; fill: string };
  };
  points: ChartPoint[];
  pathD: string;
  fillD: string;
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

export default function InteractiveAnalyticsChart({ isRtl }: { isRtl: boolean }) {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const [chartData, setChartData] = useState<any | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [isMock, setIsMock] = useState(true);
  const [loading, setLoading] = useState(true);

  async function fetchAnalytics() {
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
      }
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, [isRtl]);

  // Fallbacks if loading or missing
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
        { label: '00:00', value: 142, x: 60, y: 170 },
        { label: '04:00', value: 384, x: 138, y: 145 },
        { label: '08:00', value: 928, x: 216, y: 100 },
        { label: '12:00', value: 1842, x: 294, y: 35 },
        { label: '16:00', value: 1240, x: 372, y: 75 },
        { label: '20:00', value: 680, x: 450, y: 115 }
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

  // Scale x-coordinates from standard width (480) to full-width (800)
  const scaleX = (x: number) => {
    const percent = (x - 60) / (450 - 60);
    return 60 + percent * (740 - 60);
  };

  const points = currentData.points.map((pt: ChartPoint) => ({
    ...pt,
    x: scaleX(pt.x)
  }));

  // Handle single data point or empty arrays gracefully
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

  // Secondary dynamic lists
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

  return (
    <div className="lg:col-span-3 w-full bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-6 flex flex-col text-start relative overflow-hidden pattern-overlay shadow-xl transition-all duration-300">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 relative z-10 w-full">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="font-bold text-midnight text-sm font-primary">
              {currentData.title}
            </h3>
            
            {loading ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8.5px] font-bold bg-[#FAF6EC] text-stone animate-pulse font-ui">
                <RefreshCw size={8} className="animate-spin text-stone/50" />
                <span>{isRtl ? 'جاري التحديث...' : 'Refreshing...'}</span>
              </span>
            ) : isMock ? (
              <span 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8.5px] font-bold bg-[#FAF6EC] text-[#8C6D27] border border-[#E2D2B5] font-ui cursor-help select-none" 
                title={isRtl ? 'بيانات توضيحية. لربط تحليلات جوجل الحقيقية، اضبط مفتاح التتبع GA_PROPERTY_ID في ملف الإعدادات' : 'Mock statistics view. Connect Google Analytics service account key to load live stats'}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8841A]"></span>
                <span>{isRtl ? 'وضع محاكاة' : 'Simulated View'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 font-ui select-none">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>{isRtl ? 'متصل مباشر' : 'Live Connected'}</span>
              </span>
            )}
          </div>
          <p className="text-[10px] text-stone/60 mt-0.5 font-ui">
            {currentData.subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="inline-flex rounded-full bg-[#F2ECD8]/45 p-1 border border-gold-muted/15 shadow-inner shrink-0 self-start">
          {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setHoveredIndex(null);
              }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider font-ui transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gold text-white shadow-sm shadow-gold/10'
                  : 'text-stone hover:text-midnight'
              }`}
            >
              {tab === 'daily' ? (isRtl ? 'اليومي' : 'Daily') : tab === 'weekly' ? (isRtl ? 'الأسبوعي' : 'Weekly') : (isRtl ? 'الشهري' : 'Monthly')}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Cards stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
        {[
          { key: 'today', label: activeTab === 'daily' ? (isRtl ? 'زيارات اليوم' : 'Today') : activeTab === 'weekly' ? (isRtl ? 'اليوم الأول' : 'Day 1') : (isRtl ? 'بداية الشهر' : 'Start Month'), spark: currentData.sparklines.today },
          { key: 'week', label: activeTab === 'daily' ? (isRtl ? 'إجمالي الأسبوع' : 'This Week') : activeTab === 'weekly' ? (isRtl ? 'إجمالي الشهر' : 'This Month') : (isRtl ? 'إجمالي الربع' : 'This Quarter'), spark: currentData.sparklines.week },
          { key: 'month', label: isRtl ? 'توقعات النمو' : 'Projected Growth', spark: currentData.sparklines.month }
        ].map((card) => (
          <div key={card.key} className="p-4 rounded-2xl bg-white border border-gold-muted/15 space-y-2 hover:border-gold transition-all duration-300 flex items-center justify-between shadow-sm relative overflow-hidden group">
            <div className="space-y-1 relative z-10 text-start">
              <span className="text-[9px] text-stone/50 font-bold font-ui block uppercase tracking-wider">
                {card.label}
              </span>
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl font-bold text-midnight font-primary">{card.spark.val}</p>
                <span className="text-[9px] text-emerald-600 font-bold font-mono">{card.spark.growth}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Beautiful Spline Area Chart */}
      <div className="flex-grow flex flex-col justify-end min-h-72 relative pt-2">
        {currentData.points.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-stone/40 text-xs">
            <AlertCircle size={20} className="mb-2" />
            <span>{isRtl ? 'لا توجد بيانات حركة مرور مسجلة بعد' : 'No traffic stats captured yet'}</span>
          </div>
        ) : (
          <svg className="w-full h-full min-h-72 overflow-visible" viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="splineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="[stop-color:#B8841A] [stop-opacity:0.25]" />
                <stop offset="100%" className="[stop-color:#B8841A] [stop-opacity:0.0]" />
              </linearGradient>
              <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Horizontal gridlines */}
            <line x1="50" y1="35" x2="770" y2="35" stroke="#DDD0B3" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
            <line x1="50" y1="85" x2="770" y2="85" stroke="#DDD0B3" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
            <line x1="50" y1="135" x2="770" y2="135" stroke="#DDD0B3" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
            <line x1="50" y1="185" x2="770" y2="185" stroke="#DDD0B3" strokeWidth="0.8" opacity="0.5" />

            {/* Left Y-axis Grid Labels */}
            <g className="select-none pointer-events-none text-[8.5px] font-mono fill-stone/60" textAnchor="end">
              <text x="42" y="38">{currentData.yLabels[0]}</text>
              <text x="42" y="88">{currentData.yLabels[1]}</text>
              <text x="42" y="138">{currentData.yLabels[2]}</text>
              <text x="42" y="188">{currentData.yLabels[3]}</text>
            </g>

            {/* Vertical grid lines at each point position */}
            {displayPoints.map((pt, index) => (
              <line
                key={`v-grid-${index}`}
                x1={pt.x}
                y1="25"
                x2={pt.x}
                y2="185"
                stroke="#DDD0B3"
                strokeWidth="0.4"
                strokeDasharray="2 2"
                opacity="0.15"
              />
            ))}

            {/* Hover Vertical Guideline bar */}
            {hoveredIndex !== null && (
              <line 
                x1={displayPoints[hoveredIndex].x} 
                y1="25" 
                x2={displayPoints[hoveredIndex].x} 
                y2="185" 
                stroke="#D4A843" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
                className="transition-all duration-300"
              />
            )}
            
            {/* Gradient Spline Fill */}
            <path d={fillPath} fill="url(#splineGradient)" className="transition-all duration-700" />
            
            {/* Golden Spline Path line */}
            <path d={curvePath} stroke="#B8841A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700" />
            
            {/* Interactive Data Nodes */}
            {displayPoints.map((pt, i) => (
              <g key={i}>
                {/* Invisible touch/hover expand circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="18"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                
                {/* Visual circle element */}
                <circle 
                  cx={pt.x} 
                  cy={pt.y} 
                  r={hoveredIndex === i ? 6.5 : 4.5} 
                  fill={hoveredIndex === i ? '#D4A843' : '#B8841A'} 
                  stroke="#FDFAF3" 
                  strokeWidth={hoveredIndex === i ? 2 : 1.5} 
                  filter={hoveredIndex === i ? 'url(#nodeGlow)' : ''} 
                  className="transition-all duration-200 pointer-events-none"
                />
              </g>
            ))}
            
            {/* Bottom X-axis Labels */}
            {displayPoints.map((pt, i) => (
              <text 
                key={i}
                x={pt.x} 
                y="202" 
                fill={hoveredIndex === i ? '#B8841A' : '#8C7A68'} 
                fontSize="8.5" 
                fontWeight={hoveredIndex === i ? 'bold' : 'normal'}
                textAnchor="middle"
                fontFamily="var(--font-ui)"
                className="transition-colors duration-200 select-none pointer-events-none"
              >
                {pt.label}
              </text>
            ))}

            {/* Interactive Tooltip details */}
            {hoveredIndex !== null && (
              <foreignObject
                x={displayPoints[hoveredIndex].x - 60}
                y={displayPoints[hoveredIndex].y - 65}
                width="120"
                height="56"
                className="pointer-events-none overflow-visible"
              >
                <div className="bg-[#1C1812]/95 backdrop-blur-md border border-gold/30 p-2 rounded-xl shadow-xl text-[9px] text-[#FDFAF3] flex flex-col gap-0.5 justify-center relative animate-fade-in">
                  {/* Tiny arrow pointing down */}
                  <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1C1812] border-r border-b border-gold/30 rotate-45" />
                  <div className="font-bold text-gold text-start leading-none border-b border-gold-muted/10 pb-1 mb-1">
                    {displayPoints[hoveredIndex].label}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-start leading-none">
                    <Users size={8} className="text-gold" />
                    <span>{isRtl ? 'الزيارات:' : 'Visits:'} {displayPoints[hoveredIndex].value}</span>
                  </div>
                </div>
              </foreignObject>
            )}
          </svg>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gold-muted/10 my-6 pt-6 relative z-10"></div>

      {/* Three detailed columns with real data from Google Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-start">
        
        {/* Column 1: Traffic Sources */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#8C6D27]">
            <Share2 size={16} className="text-gold" />
            <h4 className="font-bold text-midnight text-xs font-primary">
              {isRtl ? 'مصادر الزيارات الحقيقية' : 'Live Traffic Sources'}
            </h4>
          </div>
          <div className="space-y-3">
            {activeSources.map((source, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-stone font-ui">{source.name}</span>
                  <span className="text-midnight font-mono">{source.count}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gold-muted/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#A08850] to-gold transition-all duration-1000"
                    style={{ width: `${(source.count / maxSource) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Top Viewed Pages */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#8C6D27]">
            <FileText size={16} className="text-gold" />
            <h4 className="font-bold text-midnight text-xs font-primary">
              {isRtl ? 'الأقسام الأكثر تفاعلاً' : 'Most Visited Pages'}
            </h4>
          </div>
          <div className="space-y-3">
            {activePages.map((page, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-stone font-ui font-mono truncate max-w-[180px] direction-ltr block">{page.name}</span>
                  <span className="text-midnight font-mono">{page.count}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gold-muted/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#A08850] to-[#C0A870] transition-all duration-1000"
                    style={{ width: `${(page.count / maxPage) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Geographic Distribution */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#8C6D27]">
            <Globe size={16} className="text-gold" />
            <h4 className="font-bold text-midnight text-xs font-primary">
              {isRtl ? 'التوزيع الجغرافي (الدول)' : 'Geographic Audience'}
            </h4>
          </div>
          <div className="space-y-3">
            {activeCountries.map((country, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-stone font-ui">{country.name}</span>
                  <span className="text-midnight font-mono">{country.count}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gold-muted/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-copper to-gold-hi transition-all duration-1000"
                    style={{ width: `${(country.count / maxCountry) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
