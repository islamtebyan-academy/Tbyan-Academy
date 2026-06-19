import React from 'react';
import Link from 'next/link';
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
  AlertTriangle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { updateStudentSubscription } from '@/app/actions/students';

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
      <div className="text-start border-b border-gold/15 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-midnight font-primary">
          {isRtl ? 'إدارة الطلاب والاشتراكات' : 'Students & Subscriptions'}
        </h2>
        <p className="text-stone/70 text-xs mt-1.5 font-ui">
          {isRtl ? 'متابعة سجلات الطلاب المنتسبين، الباقات النشطة، وتواريخ الصلاحية يدوياً' : 'Track applicant registrations, update manual subscription durations, and assign statuses.'}
        </p>
      </div>

      {/* Filters Card */}
      <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 p-6 rounded-xl relative overflow-hidden pattern-overlay shadow-[0_8px_30px_rgba(139,115,85,0.05)]">
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
              className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 pl-10 pr-4 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui placeholder:text-stone/40"
            />
          </div>

          {/* Program filter */}
          <div>
            <select
              name="program"
              title={isRtl ? 'المسار الدراسي' : 'Program Track'}
              defaultValue={program}
              className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
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
              className="w-full bg-white border border-gold-muted/20 text-midnight py-2.5 px-3 rounded-lg text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
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
              className="flex-1 btn-gold text-midnight py-2.5 px-4 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-gold/10 font-ui hover:scale-[1.02]"
            >
              <Filter size={13} />
              <span>{isRtl ? 'تصفية' : 'Filter'}</span>
            </button>
            <Link
              href={`/${locale}/admin/students`}
              className="px-3.5 py-2.5 bg-[#F2ECD8]/30 hover:bg-[#F2ECD8]/50 text-stone border border-gold-muted/20 hover:border-gold/30 rounded-lg text-xs font-semibold flex items-center justify-center transition-all font-ui"
            >
              {isRtl ? 'إعادة تعيين' : 'Reset'}
            </Link>
          </div>
        </form>
      </div>

      {/* Main Table Card */}
      <div className="bg-gradient-to-br from-white to-[#FDFAF3]/40 border border-gold-muted/15 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(139,115,85,0.08)] text-start relative pattern-overlay">
        <div className="overflow-x-auto no-scrollbar">
          {students && students.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gold-muted/15 bg-gradient-to-r from-[#FDFAF3] to-white text-stone/85 text-[10px] uppercase font-bold tracking-wider font-ui">
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
                    <tr key={student.id} className="hover:bg-[#FDFAF3]/60 border-b border-gold-muted/5 transition-colors">
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
                        <Link
                          href={`/${locale}/admin/students?query=${query}&program=${program}&status=${status}&plan=${plan}&id=${student.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-gold/5 hover:bg-gold text-gold hover:text-white border border-gold/20 hover:border-gold transition-all duration-300 shadow-sm"
                        >
                          <Edit3 size={12} />
                          <span>{isRtl ? 'تعديل' : 'Edit'}</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20 text-stone/50 text-xs font-semibold bg-[#FDFAF3]/40">
              {isRtl ? 'لم يتم العثور على أي طلاب مطابقين لشروط البحث.' : 'No students matching the filter options were found.'}
            </div>
          )}
        </div>
      </div>

      {/* Selected Student Editing Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-end animate-fade-in">
          {/* Backdrop close link */}
          <Link 
            href={`/${locale}/admin/students?query=${query}&program=${program}&status=${status}&plan=${plan}`}
            className="absolute inset-0 cursor-default"
          />
          
          {/* Drawer Shell */}
          <div className="w-full max-w-lg h-full bg-gradient-to-b from-[#FDFAF3] to-white border-l border-gold-muted/20 p-8 shadow-2xl relative flex flex-col text-start overflow-y-auto animate-slide-in pattern-overlay">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gold-muted/15 mb-6 relative z-10">
              <div>
                <h3 className="text-lg font-bold text-midnight font-primary">{isRtl ? 'تعديل بيانات واشتراك الطالب' : 'Edit Student Details'}</h3>
                <p className="text-[10px] text-gold uppercase tracking-widest font-bold font-mono mt-0.5">
                  ID: {selectedStudent.id.substring(0, 8)}...
                </p>
              </div>
              <Link
                href={`/${locale}/admin/students?query=${query}&program=${program}&status=${status}&plan=${plan}`}
                className="w-8 h-8 rounded-full bg-[#FDFAF3]/80 border border-gold-muted/15 hover:bg-[#F2ECD8]/50 flex items-center justify-center text-stone hover:text-midnight transition-colors"
              >
                <X size={15} />
              </Link>
            </div>

            {/* Profile Overview */}
            <div className="p-4 rounded-xl bg-white border border-gold-muted/15 space-y-3 mb-6 relative z-10 shadow-sm">
              <div>
                <span className="text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'الاسم الكامل للطالب' : 'Student Name'}</span>
                <p className="text-base font-bold text-midnight font-primary mt-0.5">{selectedStudent.full_name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</span>
                  <p className="text-xs text-stone font-mono mt-0.5 truncate">{selectedStudent.email}</p>
                </div>
                <div>
                  <span className="text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'البرنامج الدراسي' : 'Program Track'}</span>
                  <p className="text-xs text-stone font-ui mt-0.5 truncate">{getProgramLabel(selectedStudent.program)} ({selectedStudent.frequency})</p>
                </div>
              </div>
              {selectedStudent.goals && (
                <div>
                  <span className="text-[9px] text-stone/65 uppercase font-bold tracking-wider font-ui">{isRtl ? 'الأهداف والخلفية التعليمية' : 'Background & Goals'}</span>
                  <p className="text-xs text-stone/80 mt-1.5 leading-relaxed max-h-24 overflow-y-auto whitespace-pre-wrap font-ui description-justify-start">
                    {selectedStudent.goals}
                  </p>
                </div>
              )}
            </div>

            {/* Edit Form */}
            <form action={updateStudentSubscription as any} className="space-y-6 flex-grow flex flex-col justify-between relative z-10">
              <input type="hidden" name="studentId" value={selectedStudent.id} />
              <input type="hidden" name="locale" value={locale} />

              <div className="space-y-5">
                {/* 1. Academic Status */}
                <div className="space-y-2">
                  <label htmlFor="student-status-select" className="block text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                    {isRtl ? 'حالة الطالب الأكاديمية' : 'Academic Status'}
                  </label>
                  <select
                    id="student-status-select"
                    name="status"
                    title={isRtl ? 'حالة الطالب الأكاديمية' : 'Academic Status'}
                    defaultValue={selectedStudent.status}
                    className="w-full bg-white border border-gold-muted/20 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                  >
                    <option value="pending">{isRtl ? 'قيد الانتظار / حجز تمهيدي' : 'Pending Assessment'}</option>
                    <option value="scheduled">{isRtl ? 'تم الجدولة والاتفاق' : 'Scheduled / Assigned'}</option>
                    <option value="active">{isRtl ? 'نشط ومستمر بالحصص' : 'Active Student'}</option>
                    <option value="inactive">{isRtl ? 'غير نشط / ملغي' : 'Inactive / Paused'}</option>
                  </select>
                </div>

                {/* Divider */}
                <div className="border-t border-gold-muted/15 my-2" />

                {/* 2. Manual Sub Plan */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="subscription-plan-select" className="block text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                      {isRtl ? 'باقة الاشتراك' : 'Subscription Tier'}
                    </label>
                    <select
                      id="subscription-plan-select"
                      name="subscriptionPlan"
                      title={isRtl ? 'باقة الاشتراك' : 'Subscription Tier'}
                      defaultValue={selectedStudent.subscription_plan || 'none'}
                      className="w-full bg-white border border-gold-muted/20 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                    >
                      <option value="none">{isRtl ? 'بدون اشتراك' : 'No Membership'}</option>
                      <option value="starter">{isRtl ? 'باقة Starter' : 'Starter Tier'}</option>
                      <option value="standard">{isRtl ? 'باقة Standard' : 'Standard Tier'}</option>
                      <option value="intensive">{isRtl ? 'باقة Intensive' : 'Intensive Tier'}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subscription-status-select" className="block text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                      {isRtl ? 'حالة الاشتراك' : 'Subscription Status'}
                    </label>
                    <select
                      id="subscription-status-select"
                      name="subscriptionStatus"
                      title={isRtl ? 'حالة الاشتراك' : 'Subscription Status'}
                      defaultValue={selectedStudent.subscription_status || 'pending'}
                      className="w-full bg-white border border-gold-muted/20 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                    >
                      <option value="pending">{isRtl ? 'انتظار الدفع' : 'Pending Payment'}</option>
                      <option value="active">{isRtl ? 'نشط وصالح' : 'Active & Paid'}</option>
                      <option value="paused">{isRtl ? 'مؤجل / موقوف مؤقتاً' : 'Paused'}</option>
                      <option value="expired">{isRtl ? 'منتهي الصلاحية' : 'Expired'}</option>
                    </select>
                  </div>
                </div>

                {/* 3. Subscription Start & End Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="starts-at-input" className="block text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                      {isRtl ? 'تاريخ البدء' : 'Start Date'}
                    </label>
                    <input
                      type="date"
                      id="starts-at-input"
                      name="startsAt"
                      title={isRtl ? 'تاريخ البدء' : 'Start Date'}
                      placeholder="YYYY-MM-DD"
                      defaultValue={selectedStudent.subscription_starts_at ? selectedStudent.subscription_starts_at.split('T')[0] : ''}
                      className="w-full bg-white border border-gold-muted/20 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="ends-at-input" className="block text-[10px] font-bold uppercase tracking-widest text-stone/75 font-ui">
                      {isRtl ? 'تاريخ الانتهاء' : 'Expiry Date'}
                    </label>
                    <input
                      type="date"
                      id="ends-at-input"
                      name="endsAt"
                      title={isRtl ? 'تاريخ الانتهاء' : 'Expiry Date'}
                      placeholder="YYYY-MM-DD"
                      defaultValue={selectedStudent.subscription_ends_at ? selectedStudent.subscription_ends_at.split('T')[0] : ''}
                      className="w-full bg-white border border-gold-muted/20 text-midnight py-3 px-4 rounded-lg text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all font-ui"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-gold-muted/15 mt-6 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 btn-gold text-midnight font-bold py-3.5 px-4 rounded-lg text-sm transition-all hover:scale-[1.02] cursor-pointer text-center font-ui shadow-md shadow-gold/10"
                >
                  {isRtl ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
                <Link
                  href={`/${locale}/admin/students?query=${query}&program=${program}&status=${status}&plan=${plan}`}
                  className="px-5 py-3.5 bg-[#F2ECD8]/40 hover:bg-[#F2ECD8]/60 text-stone border border-gold-muted/20 hover:border-gold-muted/35 rounded-lg text-sm font-semibold text-center transition-colors font-ui"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

