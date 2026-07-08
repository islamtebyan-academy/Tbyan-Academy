import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { 
  Users, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  X,
  CreditCard,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Bell
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { updateStudentSubscription, deleteStudent } from '@/app/actions/students';
import PortalButton from '@/components/admin/PortalButton';
import DeleteConfirmButton from '@/components/admin/DeleteConfirmButton';
import SubmitButton from '@/components/admin/SubmitButton';

interface StudentsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    query?: string;
    program?: string;
    status?: string;
    plan?: string;
    id?: string;
  }>;
}

export default async function StudentsPage({ params, searchParams }: StudentsPageProps) {
  const { locale } = await params;
  const isRtl = locale === 'ar';
  
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || '';
  const program = resolvedSearchParams.program || 'all';
  const status = resolvedSearchParams.status || 'all';
  const plan = resolvedSearchParams.plan || 'all';
  const selectedStudentId = resolvedSearchParams.id || '';

  const supabase = await createClient();

  // 1. Build Query for Students
  let dbQuery = supabase.from('students').select('*');

  if (query) {
    dbQuery = dbQuery.or(`full_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`);
  }
  if (program !== 'all') {
    dbQuery = dbQuery.eq('program', program);
  }
  if (status !== 'all') {
    dbQuery = dbQuery.eq('status', status);
  }
  if (plan !== 'all') {
    dbQuery = dbQuery.eq('subscription_plan', plan);
  }

  const { data: students, error } = await dbQuery.order('created_at', { ascending: false });

  // 2. Fetch Selected Student for Editing
  let selectedStudent = null;
  if (selectedStudentId) {
    const { data } = await supabase
      .from('students')
      .select('*')
      .eq('id', selectedStudentId)
      .single();
    selectedStudent = data;
  }

  // 3. Compute Near-Expiry Students
  const now = new Date();
  const nearExpiryStudents = students?.filter(student => {
    if (student.subscription_plan === 'none' || student.subscription_status !== 'active' || !student.subscription_ends_at) {
      return false;
    }
    const endsAt = new Date(student.subscription_ends_at);
    const diffTime = endsAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
  }) || [];

  const getProgramLabel = (prog: string) => {
    switch (prog) {
      case 'quran': return isRtl ? 'القرآن والتجويد' : 'Quran & Tajweed';
      case 'arabic': return isRtl ? 'اللغة العربية' : 'Classical Arabic';
      case 'islamic': return isRtl ? 'العلوم الشرعية' : 'Islamic Studies';
      default: return prog;
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    let bg = 'bg-copper/10 text-copper border border-copper/30';
    let label = isRtl ? 'قيد الانتظار' : 'Pending';

    if (status === 'active' || status === 'scheduled') {
      bg = 'bg-emerald-600/10 text-emerald-700 border border-emerald-600/20';
      label = isRtl ? 'نشط' : 'Active';
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
    <div className="space-y-8 relative">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gold/15 pb-6 gap-4 text-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
            {isRtl ? 'إدارة الطلاب والاشتراكات' : 'Students & Subscriptions'}
          </h2>
          <p className="text-stone/70 text-xs mt-1.5 font-ui">
            {isRtl ? 'متابعة سجلات الطلاب المنتسبين، الباقات النشطة، وتواريخ الصلاحية يدوياً' : 'Track applicant registrations, update manual subscription durations, and assign statuses.'}
          </p>
        </div>

        {/* Prominent Notification Widget */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F4EFEB] border border-white/50 shadow-[4px_4px_8px_#d1c9c4,-4px_-4px_8px_#ffffff] transition-all duration-300">
            <div className="relative">
              <div className={`w-9 h-9 rounded-full bg-[#F4EFEB] shadow-[inset_2px_2px_4px_#d1c9c4,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center ${nearExpiryStudents.length > 0 ? 'text-amber-600' : 'text-stone/30'}`}>
                <Bell size={18} className={nearExpiryStudents.length > 0 ? 'animate-pulse' : ''} />
              </div>
              {nearExpiryStudents.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm font-mono animate-pulse">
                  {nearExpiryStudents.length}
                </span>
              )}
            </div>
            <div className="text-start min-w-[120px]">
              <span className="block text-[9px] font-bold text-stone/50 uppercase tracking-wider font-ui leading-none">
                {isRtl ? 'حالة التنبيهات' : 'System Alerts'}
              </span>
              <span className="block text-xs font-bold text-midnight font-primary mt-1">
                {nearExpiryStudents.length > 0 
                  ? (isRtl ? `${nearExpiryStudents.length} تنبيه نشط` : `${nearExpiryStudents.length} active alerts`)
                  : (isRtl ? 'لا توجد تنبيهات' : 'No active alerts')
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expiry Alerts Banner */}
      {nearExpiryStudents.length > 0 && (
        <div className="bg-[#F4EFEB] border border-white/50 shadow-[inset_4px_4px_8px_#d1c9c4,inset_-4px_-4px_8px_#ffffff] rounded-2xl p-5 text-start animate-fade-in relative z-10">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F4EFEB] border border-white/40 text-amber-700 rounded-lg shrink-0 shadow-[2px_2px_4px_#d1c9c4,-2px_-2px_4px_#ffffff] flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
            <div className="space-y-3 flex-grow">
              <div>
                <h4 className="text-sm font-bold text-midnight font-primary">
                  {isRtl 
                    ? `تنبيه: هناك ${nearExpiryStudents.length} طلاب تقترب باقاتهم من الانتهاء (خلال 3 أيام)` 
                    : `Alert: ${nearExpiryStudents.length} subscriptions are expiring within 3 days`}
                </h4>
                <p className="text-xs text-stone/70 font-ui mt-0.5">
                  {isRtl 
                    ? 'يرجى التواصل معهم لتجديد الاشتراك ومتابعة سير الحصص الدراسية.' 
                    : 'Please contact them to renew their subscription and keep their schedule active.'}
                </p>
              </div>

              {/* List of Near-Expiry Students */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nearExpiryStudents.map((s) => {
                  const endsAt = new Date(s.subscription_ends_at!);
                  const diffTime = endsAt.getTime() - now.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  const cleanPhone = s.phone ? s.phone.replace(/\D/g, '') : '';
                  
                  return (
                    <div key={s.id} className="p-3 bg-[#F4EFEB] border border-white/50 rounded-xl flex items-center justify-between gap-2 shadow-[4px_4px_8px_#d1c9c4,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1c9c4,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-midnight truncate">{s.full_name}</div>
                        <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                          {isRtl ? `باقي ${diffDays} يوم` : `${diffDays} days left`}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 shrink-0">
                        {/* WhatsApp direct link */}
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#F4EFEB] text-emerald-600 hover:text-emerald-800 shadow-[2px_2px_4px_#d1c9c4,-2px_-2px_4px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1c9c4,inset_-1px_-1px_2px_#ffffff] transition-all flex items-center justify-center shrink-0"
                            title={isRtl ? 'تواصل عبر الواتساب' : 'Contact on WhatsApp'}
                          >
                            <Phone size={11} />
                          </a>
                        )}
                        {/* Email link */}
                        <a
                          href={`mailto:${s.email}?subject=${encodeURIComponent(isRtl ? 'تنبيه انتهاء باقة الاشتراك - أكاديمية إسلام تبيان' : 'Subscription Expiration Alert - Islam Tebyan Academy')}`}
                          className="p-1.5 rounded-lg bg-[#F4EFEB] text-gold hover:text-midnight shadow-[2px_2px_4px_#d1c9c4,-2px_-2px_4px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1c9c4,inset_-1px_-1px_2px_#ffffff] transition-all flex items-center justify-center shrink-0"
                          title={isRtl ? 'تواصل عبر البريد' : 'Contact via Email'}
                        >
                          <Mail size={11} />
                        </a>
                        {/* Edit Link */}
                        <Link
                          href={`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}&id=${s.id}`}
                          className="p-1.5 rounded-lg bg-[#F4EFEB] text-amber-700 hover:text-midnight shadow-[2px_2px_4px_#d1c9c4,-2px_-2px_4px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1c9c4,inset_-1px_-1px_2px_#ffffff] transition-all flex items-center justify-center shrink-0"
                          title={isRtl ? 'تعديل وحفظ الاشتراك' : 'Edit Subscription'}
                        >
                          <Edit3 size={11} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Card */}
      <div className="bg-[#F4EFEB] border border-white/50 p-6 rounded-2xl relative overflow-hidden pattern-overlay shadow-[8px_8px_16px_#d1c9c4,-8px_-8px_16px_#ffffff]">
        <form method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gold">
              <Search size={15} />
            </div>
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder={isRtl ? 'ابحث بالاسم، البريد أو الهاتف...' : 'Search by name, email, phone...'}
              className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_2px_2px_5px_#d1c9c4,inset_-2px_-2px_5px_#ffffff] text-midnight py-2.5 pl-10 pr-4 rounded-xl text-xs focus:outline-none focus:border-gold/30 transition-all font-ui placeholder:text-stone/40"
            />
          </div>

          {/* Program filter */}
          <div>
            <select
              name="program"
              title={isRtl ? 'المسار الدراسي' : 'Program Track'}
              defaultValue={program}
              className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_2px_2px_5px_#d1c9c4,inset_-2px_-2px_5px_#ffffff] text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold/30 transition-all font-ui"
            >
              <option value="all">{isRtl ? 'كافة البرامج' : 'All Programs'}</option>
              <option value="quran">{isRtl ? 'القرآن والتجويد' : 'Quran & Tajweed'}</option>
              <option value="arabic">{isRtl ? 'اللغة العربية' : 'Classical Arabic'}</option>
              <option value="islamic">{isRtl ? 'العلوم الشرعية' : 'Islamic Studies'}</option>
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              name="status"
              title={isRtl ? 'حالة الطالب' : 'Student Status'}
              defaultValue={status}
              className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_2px_2px_5px_#d1c9c4,inset_-2px_-2px_5px_#ffffff] text-midnight py-2.5 px-3 rounded-xl text-xs focus:outline-none focus:border-gold/30 transition-all font-ui"
            >
              <option value="all">{isRtl ? 'كل الحالات' : 'All Statuses'}</option>
              <option value="pending">{isRtl ? 'قيد الانتظار' : 'Pending'}</option>
              <option value="scheduled">{isRtl ? 'مجدول' : 'Scheduled'}</option>
              <option value="active">{isRtl ? 'نشط' : 'Active'}</option>
              <option value="inactive">{isRtl ? 'غير نشط' : 'Inactive'}</option>
            </select>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-grow bg-gold text-midnight font-bold py-2.5 px-4 rounded-xl text-xs transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[4px_4px_8px_rgba(189,155,115,0.3),-4px_-4px_8px_#ffffff] cursor-pointer text-center flex items-center justify-center gap-1.5 font-ui"
            >
              <Filter size={13} />
              <span>{isRtl ? 'تصفية' : 'Filter'}</span>
            </button>
            <Link
              href={`/${locale}/portal/students`}
              className="px-3.5 py-2.5 bg-[#F4EFEB] text-stone hover:text-midnight font-semibold rounded-xl text-xs transition-all shadow-[4px_4px_8px_#d1c9c4,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1c9c4,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-center font-ui"
            >
              {isRtl ? 'إعادة تعيين' : 'Reset'}
            </Link>
          </div>
        </form>
      </div>

      {/* Main Table Card */}
      <div className="bg-[#F4EFEB] border border-white/50 rounded-2xl overflow-hidden shadow-[12px_12px_24px_#d1c9c4,-12px_-12px_24px_#ffffff] text-start relative pattern-overlay">
        {students && students.length > 0 ? (
          <>
            {/* ═══ Desktop Table View ═══ */}
            <div className="hidden md:block overflow-x-auto no-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gold-muted/15 bg-[#F4EFEB] text-stone/85 text-[10px] uppercase font-bold tracking-wider font-ui">
                    <th className="py-4 px-6 text-start">{isRtl ? 'اسم الطالب / معلوماته' : 'Student Name'}</th>
                    <th className="py-4 px-4 text-start">{isRtl ? 'المسار الدراسي' : 'Program Track'}</th>
                    <th className="py-4 px-4 text-start">{isRtl ? 'الدولة والوقت' : 'Origin / Timezone'}</th>
                    <th className="py-4 px-4 text-start">{isRtl ? 'الباقة الاشتراكية' : 'Subscription Details'}</th>
                    <th className="py-4 px-4 text-start">{isRtl ? 'الحالة الأكاديمية' : 'Status'}</th>
                    <th className="py-4 px-6 text-end">{isRtl ? 'خيارات' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-muted/10 text-sm text-stone/90 font-ui">
                  {students.map((student) => {
                    let planColor = 'text-stone bg-[#F2ECD8]/45 border-gold-muted/20';
                    if (student.subscription_plan === 'starter') planColor = 'text-copper bg-copper/5 border-copper/30';
                    if (student.subscription_plan === 'standard') planColor = 'text-white bg-navy border-navy';
                    if (student.subscription_plan === 'intensive') planColor = 'text-gold bg-gold/5 border-gold/35 shadow-sm';

                    let subStatusColor = 'text-copper';
                    if (student.subscription_status === 'active') subStatusColor = 'text-emerald-700 font-semibold';
                    if (student.subscription_status === 'expired') subStatusColor = 'text-taupe';

                    return (
                      <tr key={student.id} className="hover:bg-[#FDFAF3]/30 border-b border-gold-muted/5 transition-colors">
                        {/* Name & Contact */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-midnight font-primary text-base">{student.full_name}</div>
                          <div className="space-y-0.5 mt-1.5">
                            <div className="flex items-center gap-1.5 text-xs text-stone/60 font-mono">
                              <Mail size={12} className="text-gold" />
                              <span>{student.email}</span>
                            </div>
                            {student.phone && (
                              <div className="flex items-center gap-1.5 text-[11px] text-stone/50 font-mono">
                                <Phone size={12} className="text-gold" />
                                <span>{student.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Course details */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-xs text-midnight">
                            {getProgramLabel(student.program)}
                          </div>
                          <div className="text-[10px] text-stone/70 mt-1 space-y-0.5">
                            <div>{student.frequency} • {student.duration}</div>
                            {student.gender_preference && (
                              <div className="text-gold/80 capitalize">{isRtl ? 'المعلم المفضل:' : 'Teacher:'} {student.gender_preference}</div>
                            )}
                          </div>
                        </td>

                        {/* Origin & Timezone */}
                        <td className="py-4 px-4 text-xs text-stone/80">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-gold" />
                            <span>{student.country || 'N/A'}</span>
                          </div>
                          <div className="text-[10px] text-stone/40 font-mono mt-1">
                            {student.timezone || 'UTC'}
                          </div>
                        </td>

                        {/* Manual Subscription details */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${planColor}`}>
                              {student.subscription_plan === 'none' ? (isRtl ? 'لا يوجد باقة' : 'No Membership') : student.subscription_plan}
                            </span>
                            {student.subscription_plan !== 'none' && (
                              <span className={`text-[10px] font-bold ${subStatusColor} uppercase`}>
                                ({student.subscription_status})
                              </span>
                            )}
                          </div>
                          {student.subscription_plan !== 'none' && (
                            <div className="text-[9px] text-stone/45 font-mono mt-1.5 space-y-0.5">
                              <div>{isRtl ? 'يبدأ:' : 'Starts:'} {formatDate(student.subscription_starts_at)}</div>
                              <div>{isRtl ? 'ينتهي:' : 'Ends:'} {formatDate(student.subscription_ends_at)}</div>
                            </div>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          {getStatusBadge(student.status)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-end">
                          <PortalButton
                            href={`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}&id=${student.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-gold/5 hover:bg-gold text-gold hover:text-midnight border border-gold/20 hover:border-gold transition-all duration-300 shadow-sm font-ui"
                            icon={<Edit3 size={12} />}
                          >
                            <span>{isRtl ? 'تعديل' : 'Edit'}</span>
                          </PortalButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ═══ Mobile Card View ═══ */}
            <div className="md:hidden space-y-4 p-4">
              {students.map((student) => {
                let planColor = 'text-stone bg-[#F2ECD8]/45 border-gold-muted/20';
                if (student.subscription_plan === 'starter') planColor = 'text-copper bg-copper/5 border-copper/30';
                if (student.subscription_plan === 'standard') planColor = 'text-white bg-navy border-navy';
                if (student.subscription_plan === 'intensive') planColor = 'text-gold bg-gold/5 border-gold/35 shadow-sm';

                let subStatusColor = 'text-copper';
                if (student.subscription_status === 'active') subStatusColor = 'text-emerald-700 font-semibold';
                if (student.subscription_status === 'expired') subStatusColor = 'text-taupe';

                return (
                  <div key={student.id} className="p-4 rounded-xl bg-[#F4EFEB] border border-white/50 shadow-[6px_6px_12px_#d1c9c4,-6px_-6px_12px_#ffffff] space-y-4">
                    {/* Header: Name and Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-midnight font-primary text-base leading-snug">{student.full_name}</div>
                        <div className="space-y-0.5 mt-1">
                          <div className="flex items-center gap-1 text-[10.5px] text-stone/50 font-mono">
                            <Mail size={11} className="text-gold shrink-0" />
                            <span className="truncate">{student.email}</span>
                          </div>
                          {student.phone && (
                            <div className="flex items-center gap-1 text-[10.5px] text-stone/40 font-mono">
                              <Phone size={11} className="text-gold shrink-0" />
                              <span>{student.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0">
                        {getStatusBadge(student.status)}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gold-muted/10">
                      {/* Program Track */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-stone/40 font-ui block">{isRtl ? 'المسار الدراسي' : 'Program Track'}</span>
                        <div className="font-bold text-xs text-midnight leading-tight">{getProgramLabel(student.program)}</div>
                        <div className="text-[10px] text-stone/60">{student.frequency} • {student.duration}</div>
                      </div>

                      {/* Origin & Timezone */}
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-stone/40 font-ui block">{isRtl ? 'الدولة والمنطقة' : 'Origin & Timezone'}</span>
                        <div className="flex items-center gap-1 text-xs text-stone/70">
                          <MapPin size={11} className="text-gold shrink-0" />
                          <span className="font-medium">{student.country || 'N/A'}</span>
                        </div>
                        <div className="text-[10px] text-stone/40 font-mono">{student.timezone || 'UTC'}</div>
                      </div>
                    </div>

                    {/* Subscription Details (Full width sub-section within the card) */}
                    <div className="p-3 rounded-lg bg-[#F4EFEB] shadow-[inset_2px_2px_5px_#d1c9c4,inset_-2px_-2px_5px_#ffffff] border border-white/40 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-stone/45 font-ui">{isRtl ? 'تفاصيل الباقة' : 'Membership details'}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-block text-[8px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded border ${planColor}`}>
                            {student.subscription_plan === 'none' ? (isRtl ? 'لا يوجد باقة' : 'No Membership') : student.subscription_plan}
                          </span>
                          {student.subscription_plan !== 'none' && (
                            <span className={`text-[9px] font-bold ${subStatusColor} uppercase`}>
                              ({student.subscription_status})
                            </span>
                          )}
                        </div>
                      </div>

                      {student.subscription_plan !== 'none' && (
                        <div className="grid grid-cols-2 gap-2 text-[9px] text-stone/50 font-mono pt-1.5 border-t border-gold-muted/5">
                          <div><span className="font-ui text-stone/40">{isRtl ? 'البدء: ' : 'Starts: '}</span>{formatDate(student.subscription_starts_at)}</div>
                          <div><span className="font-ui text-stone/40">{isRtl ? 'الانتهاء: ' : 'Ends: '}</span>{formatDate(student.subscription_ends_at)}</div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2">
                      <PortalButton
                        href={`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}&id=${student.id}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold bg-[#F4EFEB] text-gold hover:text-midnight shadow-[2px_2px_4px_#d1c9c4,-2px_-2px_4px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1c9c4,inset_-1px_-1px_2px_#ffffff] transition-all duration-300 font-ui cursor-pointer"
                        icon={<Edit3 size={12} />}
                      >
                        <span>{isRtl ? 'تعديل بيانات واشتراك الطالب' : 'Edit subscription'}</span>
                      </PortalButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-stone/50 text-xs font-semibold bg-[#FDFAF3]/40">
            {isRtl ? 'لم يتم العثور على أي طلاب مطابقين لشروط البحث.' : 'No students matching the filter options were found.'}
          </div>
        )}
      </div>

      {/* Selected Student Editing Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-[#0c1322]/65 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
          {/* Backdrop close link */}
          <Link 
            href={`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}`}
            className="absolute inset-0 cursor-default"
          />
          
          {/* Modal Box */}
          <div className="w-full max-w-4xl max-h-[100vh] bg-[#F4EFEB] rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-[0_20px_50px_rgba(12,19,34,0.3)] border border-[#d1c9c4]/30 relative flex flex-col text-start overflow-y-auto md:overflow-hidden animate-scale-in pattern-overlay no-scrollbar">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 md:pb-6 border-b border-gold-muted/15 mb-4 md:mb-6 relative z-10">
              <div>
                <h3 className="text-base md:text-lg font-bold text-midnight font-primary">{isRtl ? 'تعديل بيانات واشتراك الطالب' : 'Edit Student Details'}</h3>
                <p className="text-[9px] md:text-[10px] text-gold uppercase tracking-widest font-bold font-mono mt-0.5">
                  ID: {selectedStudent.id.substring(0, 8)}...
                </p>
              </div>
              <Link
                href={`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}`}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#F4EFEB] shadow-[4px_4px_8px_#d1c9c4,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1c9c4,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-stone hover:text-midnight transition-all duration-200"
              >
                <X size={14} />
              </Link>
            </div>

            {/* Grid Layout: Side-by-Side (Rectangular, Responsive) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 items-start relative z-10">
              
              {/* Column 1: Profile Overview & Danger Zone */}
              <div className="space-y-4 md:space-y-6">
                {/* Profile Overview (Neumorphic Inset) */}
                <div className="bg-[#F4EFEB] shadow-[inset_4px_4px_8px_#d1c9c4,inset_-4px_-4px_8px_#ffffff] md:shadow-[inset_6px_6px_12px_#d1c9c4,inset_-6px_-6px_12px_#ffffff] rounded-xl md:rounded-2xl p-4 md:p-6 space-y-3 md:space-y-4 text-start">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[8px] md:text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'الاسم الكامل للطالب' : 'Student Name'}</span>
                      <p className="text-sm md:text-base font-bold text-midnight font-primary mt-0.5">{selectedStudent.full_name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a 
                        href={`mailto:${selectedStudent.email}?subject=${encodeURIComponent(isRtl ? 'أكاديمية إسلام تبيان - متابعة دراسية' : 'Islam Tebyan Academy - Academic Follow-up')}`}
                        className="p-1.5 rounded-lg bg-[#F4EFEB] text-gold hover:text-midnight shadow-[2px_2px_4px_#d1c9c4,-2px_-2px_4px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1c9c4,inset_-1px_-1px_2px_#ffffff] transition-all flex items-center justify-center shrink-0"
                        title={isRtl ? 'إرسال بريد إلكتروني' : 'Send Email'}
                      >
                        <Mail size={11} />
                      </a>
                      {selectedStudent.phone && (
                        <a 
                          href={`https://wa.me/${selectedStudent.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#F4EFEB] text-emerald-600 hover:text-emerald-800 shadow-[2px_2px_4px_#d1c9c4,-2px_-2px_4px_#ffffff] hover:shadow-[inset_1px_1px_2px_#d1c9c4,inset_-1px_-1px_2px_#ffffff] transition-all flex items-center justify-center shrink-0"
                          title={isRtl ? 'متابعة عبر الواتساب' : 'Follow up on WhatsApp'}
                        >
                          <Phone size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-gold-muted/10">
                    {/* Program Track */}
                    <div>
                      <span className="text-[8px] md:text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'البرنامج الدراسي' : 'Program Track'}</span>
                      <p className="text-[11px] md:text-xs text-midnight font-bold mt-0.5 leading-tight">{getProgramLabel(selectedStudent.program)} ({selectedStudent.frequency})</p>
                    </div>

                    {/* Origin / Timezone */}
                    <div>
                      <span className="text-[8px] md:text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'الدولة والمنطقة' : 'Origin & Timezone'}</span>
                      <p className="text-[11px] md:text-xs text-stone mt-0.5 leading-tight truncate" title={`${selectedStudent.country || 'N/A'} • ${selectedStudent.timezone || 'UTC'}`}>{selectedStudent.country || 'N/A'} • {selectedStudent.timezone || 'UTC'}</p>
                    </div>

                    {/* Email Display */}
                    <div className="col-span-2">
                      <span className="text-[8px] md:text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</span>
                      <p className="text-[11px] md:text-xs text-stone font-mono mt-0.5 truncate" title={selectedStudent.email}>{selectedStudent.email}</p>
                    </div>
                  </div>

                  {selectedStudent.goals && (
                    <div className="pt-2 border-t border-gold-muted/10">
                      <span className="text-[8px] md:text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'الأهداف والخلفية' : 'Background & Goals'}</span>
                      <p className="text-[10px] md:text-[11px] text-stone/85 mt-1 max-h-12 md:max-h-24 overflow-y-auto whitespace-pre-wrap font-ui description-justify-start pr-1 no-scrollbar">
                        {selectedStudent.goals}
                      </p>
                    </div>
                  )}
                </div>

                {/* Danger Zone (Delete Form) */}
                <div className="border border-rose-500/10 bg-rose-500/5 p-3 md:p-4 rounded-xl md:rounded-2xl flex justify-between items-center text-start gap-2">
                  <div className="min-w-0">
                    <h4 className="text-[10px] md:text-xs font-bold text-rose-700 font-ui">{isRtl ? 'منطقة الخطورة' : 'Danger Zone'}</h4>
                    <p className="text-[8px] md:text-[10px] text-stone/60 font-ui truncate">{isRtl ? 'حذف هذا الطالب نهائياً.' : 'Permanently remove student.'}</p>
                  </div>
                  <form action={async () => {
                    'use server';
                    await deleteStudent(selectedStudent.id, locale);
                    redirect(`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}`);
                  }}>
                    <DeleteConfirmButton isRtl={isRtl} size={13} />
                  </form>
                </div>
              </div>

              {/* Column 2: Edit Form */}
              <form 
                action={async (formData: FormData) => {
                  'use server';
                  await updateStudentSubscription(formData);
                  redirect(`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}`);
                }} 
                className="space-y-4 md:space-y-6 flex flex-col justify-between h-full"
              >
                <input type="hidden" name="studentId" value={selectedStudent.id} />
                <input type="hidden" name="locale" value={locale} />

                <div className="space-y-4 md:space-y-5">
                  {/* 1. Academic Status */}
                  <div className="space-y-1 md:space-y-2">
                    <label htmlFor="student-status-select" className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                      {isRtl ? 'حالة الطالب الأكاديمية' : 'Academic Status'}
                    </label>
                    <select
                      id="student-status-select"
                      name="status"
                      title={isRtl ? 'حالة الطالب الأكاديمية' : 'Academic Status'}
                      defaultValue={selectedStudent.status}
                      className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_1.5px_1.5px_3px_#d1c9c4,inset_-1.5px_-1.5px_3px_#ffffff] text-midnight py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:border-gold/30 transition-all font-ui"
                    >
                      <option value="pending">{isRtl ? 'قيد الانتظار / حجز تمهيدي' : 'Pending Assessment'}</option>
                      <option value="scheduled">{isRtl ? 'تم الجدولة والاتفاق' : 'Scheduled / Assigned'}</option>
                      <option value="active">{isRtl ? 'نشط ومستمر بالحصص' : 'Active Student'}</option>
                      <option value="inactive">{isRtl ? 'غير نشط / ملغي' : 'Inactive / Paused'}</option>
                    </select>
                  </div>

                  {/* 2. Manual Sub Plan */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1 md:space-y-2">
                      <label htmlFor="subscription-plan-select" className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                        {isRtl ? 'باقة الاشتراك' : 'Subscription Tier'}
                      </label>
                      <select
                        id="subscription-plan-select"
                        name="subscriptionPlan"
                        title={isRtl ? 'باقة الاشتراك' : 'Subscription Tier'}
                        defaultValue={selectedStudent.subscription_plan || 'none'}
                        className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_1.5px_1.5px_3px_#d1c9c4,inset_-1.5px_-1.5px_3px_#ffffff] text-midnight py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:border-gold/30 transition-all font-ui"
                      >
                        <option value="none">{isRtl ? 'بدون اشتراك' : 'No Membership'}</option>
                        <option value="starter">{isRtl ? 'باقة Starter' : 'Starter Tier'}</option>
                        <option value="standard">{isRtl ? 'باقة Standard' : 'Standard Tier'}</option>
                        <option value="intensive">{isRtl ? 'باقة Intensive' : 'Intensive Tier'}</option>
                      </select>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <label htmlFor="subscription-status-select" className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                        {isRtl ? 'حالة الاشتراك' : 'Subscription Status'}
                      </label>
                      <select
                        id="subscription-status-select"
                        name="subscriptionStatus"
                        title={isRtl ? 'حالة الاشتراك' : 'Subscription Status'}
                        defaultValue={selectedStudent.subscription_status || 'pending'}
                        className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_1.5px_1.5px_3px_#d1c9c4,inset_-1.5px_-1.5px_3px_#ffffff] text-midnight py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:border-gold/30 transition-all font-ui"
                      >
                        <option value="pending">{isRtl ? 'انتظار الدفع' : 'Pending Payment'}</option>
                        <option value="active">{isRtl ? 'نشط وصالح' : 'Active & Paid'}</option>
                        <option value="paused">{isRtl ? 'مؤجل / موقوف مؤقتاً' : 'Paused'}</option>
                        <option value="expired">{isRtl ? 'منتهي الصلاحية' : 'Expired'}</option>
                      </select>
                    </div>
                  </div>

                  {/* 3. Subscription Start & End Dates */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-1 md:space-y-2">
                      <label htmlFor="starts-at-input" className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                        {isRtl ? 'تاريخ البدء' : 'Start Date'}
                      </label>
                      <input
                        type="date"
                        id="starts-at-input"
                        name="startsAt"
                        title={isRtl ? 'تاريخ البدء' : 'Start Date'}
                        placeholder="YYYY-MM-DD"
                        defaultValue={selectedStudent.subscription_starts_at ? selectedStudent.subscription_starts_at.split('T')[0] : ''}
                        className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_1.5px_1.5px_3px_#d1c9c4,inset_-1.5px_-1.5px_3px_#ffffff] text-midnight py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:border-gold/30 transition-all font-ui"
                      />
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <label htmlFor="ends-at-input" className="block text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                        {isRtl ? 'تاريخ الانتهاء' : 'Expiry Date'}
                      </label>
                      <input
                        type="date"
                        id="ends-at-input"
                        name="endsAt"
                        title={isRtl ? 'تاريخ الانتهاء' : 'Expiry Date'}
                        placeholder="YYYY-MM-DD"
                        defaultValue={selectedStudent.subscription_ends_at ? selectedStudent.subscription_ends_at.split('T')[0] : ''}
                        className="w-full bg-[#F4EFEB] border border-white/40 shadow-[inset_1.5px_1.5px_3px_#d1c9c4,inset_-1.5px_-1.5px_3px_#ffffff] text-midnight py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:border-gold/30 transition-all font-ui"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="pt-4 md:pt-6 border-t border-gold-muted/15 flex gap-2 md:gap-3 items-center">
                  <SubmitButton
                    isRtl={isRtl}
                    className="flex-grow bg-gold text-midnight font-bold py-2.5 md:py-3.5 px-4 rounded-lg md:rounded-xl text-xs md:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] shadow-[4px_4px_8px_rgba(189,155,115,0.35),-4px_-4px_8px_rgba(255,255,255,0.7)] cursor-pointer text-center font-ui"
                  />
                  <Link
                    href={`/${locale}/portal/students?query=${query}&program=${program}&status=${status}&plan=${plan}`}
                    className="px-4 md:px-5 py-2.5 md:py-3.5 bg-[#F4EFEB] text-stone hover:text-midnight font-semibold rounded-lg md:rounded-xl text-xs md:text-sm transition-all shadow-[4px_4px_8px_#d1c9c4,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#d1c9c4,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center text-center font-ui"
                  >
                    {isRtl ? 'إلغاء' : 'Cancel'}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

