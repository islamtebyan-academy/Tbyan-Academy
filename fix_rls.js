const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic .env parser
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value.trim();
      }
    }
  }
}

loadEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixRLS() {
  console.log('Fixing RLS policies on admin_profiles table...');

  // We can execute SQL queries by calling Supabase RPC or running a direct query.
  // But wait, Supabase JS client doesn't have a direct sql() method.
  // Wait! How did we run SQL? The user ran it in the Supabase SQL editor.
  // But can we drop and recreate the policies by using standard supabase queries? No, DDL commands must be run via SQL Editor or a custom Postgres function.
  // Wait, does the user have access to the SQL Editor? Yes! They already ran the SQL script there earlier!
  // Let's check if we can write the SQL commands clearly for them to run in the SQL Editor, OR we can check if there's an RPC or another way.
  // Since running in the SQL Editor is the standard and safest way for DDL, we will give them the exact SQL code to copy and run in the SQL Editor.
  // Wait, let's also make sure we explain exactly why it failed (RLS infinite recursion on select).
}

console.log("SQL to run in Supabase SQL Editor:");
console.log(`
-- 1. إنشاء دالة للتحقق من صلاحية المشرف العام وتجنب التكرار اللانهائي (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role = 'super_admin' AND active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. حذف السياسات القديمة المتداخلة
DROP POLICY IF EXISTS "Active admins can view profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Super Admins can manage profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can view their own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Super Admins can view all profiles" ON public.admin_profiles;

-- 3. إنشاء السياسات الجديدة السليمة باستخدام الدالة لمنع أي تكرار (Infinite Recursion)
-- السياسة أ: السماح لأي مشرف بقراءة بيانات حسابه الشخصي فقط
CREATE POLICY "Admins can view their own profile" ON public.admin_profiles
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

-- السياسة ب: السماح للمشرف العام بقراءة كافة الحسابات
CREATE POLICY "Super Admins can view all profiles" ON public.admin_profiles
    FOR SELECT TO authenticated
    USING (public.is_super_admin());

-- السياسة ج: السماح للمشرف العام بإجراء كافة العمليات (تعديل، إضافة، حذف)
CREATE POLICY "Super Admins can manage profiles" ON public.admin_profiles
    FOR ALL TO authenticated
    USING (public.is_super_admin());
`);
}
