import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  BookOpen, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import InteractiveAnalyticsChart from '@/components/admin/InteractiveAnalyticsChart';

interface DashboardHomeProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardHomePage({ params }: DashboardHomeProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  const supabase = await createClient();

  // 1. Fetch counts & metrics
  const { count: coursesCount } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true });

  const { count: studentsCount } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true });

  const { count: activeSubscriptionsCount } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true })
    .eq('subscription_status', 'active');

  const { count: adminsCount } = await supabase
    .from('admin_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('active', true);

  // 2. Fetch recent student bookings
  const { data: recentStudents } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  // Helper formatting for program translation
  const getProgramLabel = (prog: string) => {
    switch (prog) {
      case 'quran': return isRtl ? 'القرآن والتجويد' : 'Quran & Tajweed';
      case 'arabic': return isRtl ? 'اللغة العربية' : 'Classical Arabic';
      case 'islamic': return isRtl ? 'العلوم الشرعية' : 'Islamic Studies';
      default: return prog;
    }
  };

  const getStatusBadge = (status: string) => {
    let bg = 'bg-copper/10 text-copper border border-copper/30';
    let label = isRtl ? 'قيد الانتظار' : 'Pending';

    if (status === 'active' || status === 'scheduled') {
      bg = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      label = isRtl ? 'نشط / مجدول' : 'Active / Scheduled';
    } else if (status === 'inactive') {
      bg = 'bg-taupe/10 text-taupe border border-taupe/20';
      label = isRtl ? 'غير نشط' : 'Inactive';
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider ${bg}`}>
        {label}
      </span>
    );
  };


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gold/15 pb-5 sm:pb-6">
        <div className="text-start">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
            {isRtl ? 'لوحة الأداء والمتابعة' : 'Performance Dashboard'}
          </h2>
          <p className="text-stone/70 text-[11px] sm:text-xs mt-1 sm:mt-1.5 font-ui">
            {isRtl ? 'متابعة حية لتسجيلات الطلاب، نمو الكورسات، وتحليلات أداء الأكاديمية' : 'Live overview of student enrollments, catalog growth, and insights.'}
          </p>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {(() => {
          const getWidthClass = (val: number, max: number) => {
            if (!val) return 'w-0';
            const percentage = Math.min(10, Math.max(1, Math.round((val / max) * 10)));
            switch (percentage) {
              case 1: return 'w-[10%]';
              case 2: return 'w-[20%]';
              case 3: return 'w-[30%]';
              case 4: return 'w-[40%]';
              case 5: return 'w-[50%]';
              case 6: return 'w-[60%]';
              case 7: return 'w-[70%]';
              case 8: return 'w-[80%]';
              case 9: return 'w-[90%]';
              case 10: default: return 'w-full';
            }
          };

          return [
            {
              title: isRtl ? 'إجمالي الكورسات المتاحة' : 'Total Course Catalog',
              value: coursesCount || 0,
              icon: BookOpen,
              color: 'text-gold border-gold/20 bg-gold/5',
              sub: isRtl ? 'برامج دراسية معتمدة' : 'Accredited programs',
              progress: `${getWidthClass(coursesCount || 0, 50)} bg-gold`,
            },
            {
              title: isRtl ? 'طلبات التسجيل الجديدة' : 'Pending Registrations',
              value: studentsCount || 0,
              icon: Users,
              color: 'text-[#22314b] border-[#22314b]/15 bg-[#22314b]/5',
              sub: isRtl ? 'طلاب بانتظار التقييم' : 'Awaiting academic reviews',
              progress: `${getWidthClass(studentsCount || 0, 100)} bg-[#22314b]`,
            },
            {
              title: isRtl ? 'الاشتراكات الفعالة' : 'Active Subscriptions',
              value: activeSubscriptionsCount || 0,
              icon: UserCheck,
              color: 'text-emerald-600 border-emerald-600/15 bg-emerald-600/5',
              sub: isRtl ? 'طلاب مستمرون بالحصص' : 'Regular studying students',
              progress: `${getWidthClass(activeSubscriptionsCount || 0, 100)} bg-emerald-600`,
            },
            {
              title: isRtl ? 'مسؤولي المنصة' : 'Active Administrators',
              value: adminsCount || 0,
              icon: ShieldCheck,
              color: 'text-copper border-copper/15 bg-copper/5',
              sub: isRtl ? 'مشرفين بصلاحيات كاملة' : 'Authorized coordinators',
              progress: `${getWidthClass(adminsCount || 0, 5)} bg-copper`,
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(139,115,85,0.05)] relative overflow-hidden group hover:border-gold hover:shadow-[0_15px_35px_rgba(139,115,85,0.1)] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Top Accent Gold Bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-muted/20 via-gold-hi to-gold-muted/20 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Radial gradient glow */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/3 rounded-full blur-xl pointer-events-none group-hover:bg-gold/8 transition-colors" />

                <div className="flex items-center justify-between gap-2 sm:gap-4 relative z-10 mb-3 sm:mb-4">
                  <div className="space-y-0.5 sm:space-y-1 text-start min-w-0">
                    <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-wider text-stone/50 font-ui block truncate">
                      {stat.title}
                    </span>
                    <p className="text-xl sm:text-3xl font-bold text-midnight font-primary mt-0.5 sm:mt-1 tracking-tight">{stat.value}</p>
                  </div>
                  {/* Luxury double-bordered circular icon badge */}
                  <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:scale-110 relative z-10 p-2 sm:p-2.5 shadow-sm shrink-0 ${stat.color}`}>
                    <Icon size={18} className="stroke-[1.5] sm:hidden" />
                    <Icon size={22} className="stroke-[1.5] hidden sm:block" />
                  </div>
                </div>

                {/* Progress & Subtitle details */}
                <div className="space-y-2 relative z-10 border-t border-gold-muted/10 pt-3">
                  <div className="w-full h-1 bg-[#F2ECD8]/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${stat.progress}`} />
                  </div>
                  <div className="text-[9.5px] text-stone/60 font-medium font-ui text-start">
                    {stat.sub}
                  </div>
                </div>
              </div>
            );
          });
        })()}
      </div>

      {/* Main analytics panels */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {/* Interactive Google Analytics Chart */}
        <InteractiveAnalyticsChart isRtl={isRtl} />
      </div>

      {/* Recent Student Registrations Table */}
      <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-start shadow-xl relative overflow-hidden pattern-overlay">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h3 className="font-bold text-midnight text-xs sm:text-sm font-primary">
              {isRtl ? 'أحدث طلبات تسجيل الطلاب' : 'Recent Student Bookings'}
            </h3>
            <p className="text-[10px] text-stone/60 mt-0.5 font-ui">
              {isRtl ? 'آخر 5 طلبات تقديم مسجلة للمحاضرات التقييمية المجانية' : 'Review details and manage the latest subscription entries.'}
            </p>
          </div>
          <Link
            href={`/${locale}/portal/students`}
            className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-hi font-bold transition-colors font-ui"
          >
            <span>{isRtl ? 'عرض كافة الاشتراكات' : 'View all records'}</span>
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </Link>
        </div>

        {recentStudents && recentStudents.length > 0 ? (
          <>
            {/* ═══ Desktop Table View ═══ */}
            <div className="hidden md:block overflow-x-auto no-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gold/20 text-stone/60 text-[10px] uppercase font-bold tracking-wider font-ui">
                    <th className="py-4 text-start pr-4">{isRtl ? 'اسم الطالب' : 'Student Name'}</th>
                    <th className="py-4 text-start">{isRtl ? 'البرنامج الدراسي' : 'Academic Program'}</th>
                    <th className="py-4 text-start">{isRtl ? 'الدولة / المنطقة' : 'Country'}</th>
                    <th className="py-4 text-start">{isRtl ? 'تاريخ التسجيل' : 'Date Joined'}</th>
                    <th className="py-4 text-start">{isRtl ? 'حالة الاشتراك' : 'Status'}</th>
                    <th className="py-4 text-end pl-4">{isRtl ? 'الإجراء' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10 text-sm text-stone/90">
                  {recentStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gold/5 border-b border-gold/5 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="font-bold text-midnight font-primary text-base">{student.full_name}</div>
                        <div className="text-[11px] text-stone/50 mt-0.5 font-mono">{student.email}</div>
                      </td>
                      <td className="py-4 font-semibold text-xs font-ui text-stone">
                        {getProgramLabel(student.program)}
                      </td>
                      <td className="py-4 text-stone/80 text-xs font-ui">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="text-gold" />
                          <span>{student.country || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="py-4 text-stone/80 text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-gold" />
                          <span>{new Date(student.created_at).toLocaleDateString(locale)}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        {getStatusBadge(student.status)}
                      </td>
                      <td className="py-4 text-end pl-4">
                        <Link
                          href={`/${locale}/portal/students?id=${student.id}`}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold bg-gold/5 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold transition-all duration-300 shadow-sm font-ui"
                        >
                          <span>{isRtl ? 'إدارة الاشتراك' : 'Manage'}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ═══ Mobile Card View ═══ */}
            <div className="md:hidden space-y-3">
              {recentStudents.map((student) => (
                <div key={student.id} className="p-3.5 rounded-xl bg-white border border-gold-muted/15 hover:border-gold/20 transition-all duration-300 space-y-3">
                  {/* Student Name & Status Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold text-midnight font-primary text-sm truncate">{student.full_name}</div>
                      <div className="text-[10px] text-stone/40 mt-0.5 font-mono truncate">{student.email}</div>
                    </div>
                    {getStatusBadge(student.status)}
                  </div>
                  
                  {/* Details Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gold-muted/10">
                    <div className="text-start">
                      <span className="text-[8px] uppercase font-bold tracking-wider text-stone/35 font-ui block">{isRtl ? 'البرنامج' : 'Program'}</span>
                      <span className="text-[10px] font-semibold text-stone/70 font-ui mt-0.5 block truncate">{getProgramLabel(student.program)}</span>
                    </div>
                    <div className="text-start">
                      <span className="text-[8px] uppercase font-bold tracking-wider text-stone/35 font-ui block">{isRtl ? 'الدولة' : 'Country'}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={9} className="text-gold shrink-0" />
                        <span className="text-[10px] font-semibold text-stone/70 font-ui truncate">{student.country || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="text-start">
                      <span className="text-[8px] uppercase font-bold tracking-wider text-stone/35 font-ui block">{isRtl ? 'التاريخ' : 'Date'}</span>
                      <span className="text-[10px] font-semibold text-stone/70 font-mono mt-0.5 block">{new Date(student.created_at).toLocaleDateString(locale)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/${locale}/portal/students?id=${student.id}`}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold bg-gold/5 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold transition-all duration-300 font-ui"
                  >
                    <span>{isRtl ? 'إدارة الاشتراك' : 'Manage Student'}</span>
                    <ArrowRight size={12} className={isRtl ? 'rotate-180' : ''} />
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-10 sm:py-12 border border-dashed border-gold/20 rounded-2xl text-stone/50 text-[11px] sm:text-xs font-semibold font-ui bg-[#FDFAF3]/30">
            {isRtl ? 'لا توجد تسجيلات طلاب مسجلة حتى الآن.' : 'No student registration records found in Supabase.'}
          </div>
        )}
      </div>
    </div>
  );
}
