'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, Clock, AlertCircle } from 'lucide-react';

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

export default function InteractiveAnalyticsChart({ isRtl }: { isRtl: boolean }) {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dataset: Record<'daily' | 'weekly' | 'monthly', TabData> = {
    daily: {
      title: isRtl ? 'تحليلات الزيارات اليومية' : 'Daily Traffic Analytics',
      subtitle: isRtl ? 'معدل التصفح والنشاط على مدار الـ 24 ساعة الماضية' : 'User traffic stats tracked across the last 24 hours',
      activeVisitors: 84,
      growth: '+12.4%',
      yLabels: ['2,000', '1,500', '1,000', '0'],
      sparklines: {
        today: { val: '1,842', growth: '+12.4%', path: 'M0 15 Q12 5, 25 12 T50 3', fill: 'M0 15 Q12 5, 25 12 T50 3 L 50 20 L 0 20 Z' },
        week: { val: '9,840', growth: '+8.2%', path: 'M0 18 C10 8, 20 15, 30 5 C40 10, 45 2, 50 4', fill: 'M0 18 C10 8, 20 15, 30 5 C40 10, 45 2, 50 4 L 50 20 L 0 20 Z' },
        month: { val: '38,420', growth: '+15.7%', path: 'M0 14 Q15 2, 30 18 T50 4', fill: 'M0 14 Q15 2, 30 18 T50 4 L 50 20 L 0 20 Z' }
      },
      points: [
        { label: '00:00', value: 142, x: 60, y: 170 },
        { label: '04:00', value: 384, x: 138, y: 145 },
        { label: '08:00', value: 928, x: 216, y: 100 },
        { label: '12:00', value: 1842, x: 294, y: 35 },
        { label: '16:00', value: 1240, x: 372, y: 75 },
        { label: '20:00', value: 680, x: 450, y: 115 }
      ],
      pathD: 'M 60 170 C 90 160, 110 155, 138 145 C 166 135, 190 115, 216 100 C 242 85, 270 50, 294 35 C 318 20, 350 60, 372 75 C 394 90, 420 105, 450 115',
      fillD: 'M 60 170 C 90 160, 110 155, 138 145 C 166 135, 190 115, 216 100 C 242 85, 270 50, 294 35 C 318 20, 350 60, 372 75 C 394 90, 420 105, 450 115 L 450 185 L 60 185 Z'
    },
    weekly: {
      title: isRtl ? 'تحليلات الزيارات الأسبوعية' : 'Weekly Traffic Analytics',
      subtitle: isRtl ? 'معدل التصفح والنشاط على مدار أيام الأسبوع السبعة' : 'User traffic stats tracked across the seven days of the week',
      activeVisitors: 512,
      growth: '+18.7%',
      yLabels: ['3,000', '2,000', '1,000', '0'],
      sparklines: {
        today: { val: '2,140', growth: '+15.2%', path: 'M0 18 Q12 10, 25 8 T50 14', fill: 'M0 18 Q12 10, 25 8 T50 14 L 50 20 L 0 20 Z' },
        week: { val: '14,890', growth: '+18.7%', path: 'M0 12 Q15 2, 30 18 T50 5', fill: 'M0 12 Q15 2, 30 18 T50 5 L 50 20 L 0 20 Z' },
        month: { val: '46,120', growth: '+22.3%', path: 'M0 10 Q12 18, 25 6 T50 2', fill: 'M0 10 Q12 18, 25 6 T50 2 L 50 20 L 0 20 Z' }
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
      pathD: 'M 60 130 C 85 115, 105 110, 125 100 C 145 90, 170 75, 190 60 C 215 45, 240 35, 255 30 C 275 25, 300 55, 320 65 C 345 75, 365 105, 385 120 C 410 135, 430 100, 450 85',
      fillD: 'M 60 130 C 85 115, 105 110, 125 100 C 145 90, 170 75, 190 60 C 215 45, 240 35, 255 30 C 275 25, 300 55, 320 65 C 345 75, 365 105, 385 120 C 410 135, 430 100, 450 85 L 450 185 L 60 185 Z'
    },
    monthly: {
      title: isRtl ? 'تحليلات الزيارات الشهرية' : 'Monthly Traffic Analytics',
      subtitle: isRtl ? 'إجمالي عدد الزيارات للأكاديمية على مدار الـ 6 أشهر الماضية' : 'Total monthly visit counts tracked across the last 6 months',
      activeVisitors: 2840,
      growth: '+25.3%',
      yLabels: ['40,000', '30,000', '20,000', '0'],
      sparklines: {
        today: { val: '1,980', growth: '+9.4%', path: 'M0 12 Q12 18, 25 10 T50 4', fill: 'M0 12 Q12 18, 25 10 T50 4 L 50 20 L 0 20 Z' },
        week: { val: '11,420', growth: '+11.2%', path: 'M0 15 Q15 5, 30 12 T50 2', fill: 'M0 15 Q15 5, 30 12 T50 2 L 50 20 L 0 20 Z' },
        month: { val: '58,400', growth: '+25.3%', path: 'M0 16 Q15 2, 35 12 T50 6', fill: 'M0 16 Q15 2, 35 12 T50 6 L 50 20 L 0 20 Z' }
      },
      points: [
        { label: isRtl ? 'يناير' : 'Jan', value: 8200, x: 60, y: 155 },
        { label: isRtl ? 'فبراير' : 'Feb', value: 12400, x: 138, y: 130 },
        { label: isRtl ? 'مارس' : 'Mar', value: 18900, x: 216, y: 95 },
        { label: isRtl ? 'أبريل' : 'Apr', value: 28400, x: 294, y: 55 },
        { label: isRtl ? 'مايو' : 'May', value: 31200, x: 372, y: 40 },
        { label: isRtl ? 'يونيو' : 'Jun', value: 38420, x: 450, y: 25 }
      ],
      pathD: 'M 60 155 C 90 145, 115 140, 138 130 C 168 120, 190 110, 216 95 C 246 80, 270 65, 294 55 C 324 45, 345 45, 372 40 C 402 35, 425 30, 450 25',
      fillD: 'M 60 155 C 90 145, 115 140, 138 130 C 168 120, 190 110, 216 95 C 246 80, 270 65, 294 55 C 324 45, 345 45, 372 40 C 402 35, 425 30, 450 25 L 450 185 L 60 185 Z'
    }
  };

  const currentData = dataset[activeTab];

  return (
    <div className="lg:col-span-2 bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-3xl p-6 flex flex-col text-start relative overflow-hidden pattern-overlay shadow-xl transition-all duration-300">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 relative z-10">
        <div>
          <h3 className="font-bold text-midnight text-sm font-primary flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{currentData.title}</span>
          </h3>
          <p className="text-[10px] text-stone/60 mt-0.5 font-ui">
            {currentData.subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="inline-flex rounded-full bg-[#F2ECD8]/45 p-1 border border-gold-muted/15 shadow-inner">
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

      {/* Mini Cards stats with dynamic calculations */}
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

      {/* Interactive Spline Area Chart Wrapper */}
      <div className="flex-grow flex flex-col justify-end min-h-64 relative pt-2">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <line x1="50" y1="35" x2="455" y2="35" stroke="#DDD0B3" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <line x1="50" y1="85" x2="455" y2="85" stroke="#DDD0B3" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <line x1="50" y1="135" x2="455" y2="135" stroke="#DDD0B3" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          <line x1="50" y1="185" x2="455" y2="185" stroke="#DDD0B3" strokeWidth="0.8" opacity="0.5" />

          {/* Left Y-axis Grid Labels */}
          <g className="select-none pointer-events-none text-[8.5px] font-mono fill-stone/60" textAnchor="end">
            <text x="42" y="38">{currentData.yLabels[0]}</text>
            <text x="42" y="88">{currentData.yLabels[1]}</text>
            <text x="42" y="138">{currentData.yLabels[2]}</text>
            <text x="42" y="188">{currentData.yLabels[3]}</text>
          </g>

          {/* Vertical grid lines at each point position */}
          {currentData.points.map((pt, index) => (
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
              x1={currentData.points[hoveredIndex].x} 
              y1="25" 
              x2={currentData.points[hoveredIndex].x} 
              y2="185" 
              stroke="#D4A843" 
              strokeWidth="1.5" 
              strokeDasharray="4 4" 
              className="transition-all duration-300"
            />
          )}
          
          {/* Gradient Spline Fill */}
          <path d={currentData.fillD} fill="url(#splineGradient)" className="transition-all duration-700" />
          
          {/* Golden Spline Path line */}
          <path d={currentData.pathD} stroke="#B8841A" strokeWidth="3" strokeLinecap="round" className="transition-all duration-700" />
          
          {/* Interactive Interactive Data Nodes */}
          {currentData.points.map((pt, i) => (
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
          {currentData.points.map((pt, i) => (
            <text 
              key={i}
              x={pt.x} 
              y="198" 
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

           {/* Interactive Tooltip as SVG foreignObject to avoid inline HTML styles lint warnings */}
          {hoveredIndex !== null && (
            <foreignObject
              x={currentData.points[hoveredIndex].x - 45}
              y={currentData.points[hoveredIndex].y - 56}
              width="90"
              height="50"
              className="pointer-events-none overflow-visible"
            >
              <div className="bg-[#22314b] border border-gold/30 p-1.5 rounded-lg shadow-lg text-[8px] text-ivory flex flex-col gap-0.5 justify-center relative">
                {/* Tiny arrow pointing down */}
                <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#22314b] border-r border-b border-gold/30 rotate-45" />
                <div className="font-bold text-gold-hi text-start leading-none">
                  {currentData.points[hoveredIndex].label}
                </div>
                <div className="flex items-center gap-1 font-mono text-start leading-none">
                  <Users size={8} className="text-gold" />
                  <span>{isRtl ? 'الزيارات:' : 'Visits:'} {currentData.points[hoveredIndex].value}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-stone/40 text-start leading-none">
                  <Clock size={8} />
                  <span>{isRtl ? 'بقاء: 14د' : 'Stay: 14m'}</span>
                </div>
              </div>
            </foreignObject>
          )}
        </svg>
      </div>
    </div>
  );
}
