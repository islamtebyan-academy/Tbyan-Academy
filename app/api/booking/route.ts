import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

const bookingSchema = z.object({
  program: z.enum(['quran', 'arabic', 'islamic']),
  frequency: z.enum(['1x', '2x', '3x']),
  duration: z.enum(['30min', '45min', '60min']),
  timezone: z.string().min(1),
  genderPreference: z.enum(['any', 'male', 'female']),
  studentName: z.string().min(2),
  studentEmail: z.string().email(),
  studentAge: z.enum(['child', 'teen', 'adult']),
  studentGoals: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    let body = await request.json();
    
    // Map homepage/contact direct form fields to the strict wizard bookingSchema
    if ('firstName' in body || 'whatsapp' in body) {
      const ageNum = parseInt(body.age) || 20;
      let studentAge: 'child' | 'teen' | 'adult' = 'adult';
      if (ageNum < 13) studentAge = 'child';
      else if (ageNum < 18) studentAge = 'teen';

      let program: 'quran' | 'arabic' | 'islamic' = 'quran';
      if (body.course === 'arabic') {
        program = 'arabic';
      } else if (['fiqh', 'aqidah', 'logic', 'literature'].includes(body.course)) {
        program = 'islamic';
      }

      body = {
        program,
        frequency: body.frequency || '2x',
        duration: body.duration || '45min',
        timezone: body.timezone || 'UTC',
        genderPreference: body.preferredTeacher || 'any',
        studentName: `${body.firstName || ''} ${body.lastName || ''}`.trim() || 'Direct Inquiry',
        studentEmail: body.email,
        studentAge,
        studentGoals: `[WhatsApp: ${body.whatsapp || 'N/A'}] [Country: ${body.country || 'N/A'}] [Gender: ${body.gender || 'N/A'}] ${body.message || ''}`.trim(),
      };
    }

    // Validate with Zod
    const validatedData = bookingSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Development mode log-only fallback
      console.log('--- DEVELOPMENT MODE BOOKING LOG ---');
      console.log('RESEND_API_KEY is not defined. Outputting booking payload:');
      console.log(JSON.stringify(validatedData, null, 2));
      console.log('------------------------------------');

      return NextResponse.json({
        success: true,
        message: 'Booking received (Log transport fallback).',
        data: validatedData,
      });
    }

    const resend = new Resend(apiKey);

    // Send confirmation to the student
    const studentEmailResponse = await resend.emails.send({
      from: 'Islam Tebyan Academy <support@islamtebyan.com>',
      to: validatedData.studentEmail,
      subject: 'Free Trial Session Scheduled — Islam Tebyan Academy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #B8841A; background-color: #FDFAF3;">
          <h2 style="color: #091521; border-bottom: 2px solid #B8841A; padding-bottom: 10px;">Welcome to Islam Tebyan Academy</h2>
          <p>Assalamu Alaikum <strong>${validatedData.studentName}</strong>,</p>
          <p>We have successfully received your booking request for a free 1-on-1 trial session. Here is a summary of your preferences:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
            <tr style="background-color: #F2ECD8;">
              <th style="padding: 8px; text-align: left; border: 1px solid #DDD0B3;">Program</th>
              <td style="padding: 8px; border: 1px solid #DDD0B3; text-transform: capitalize;">${validatedData.program}</td>
            </tr>
            <tr>
              <th style="padding: 8px; text-align: left; border: 1px solid #DDD0B3;">Frequency</th>
              <td style="padding: 8px; border: 1px solid #DDD0B3;">${validatedData.frequency}</td>
            </tr>
            <tr style="background-color: #F2ECD8;">
              <th style="padding: 8px; text-align: left; border: 1px solid #DDD0B3;">Duration</th>
              <td style="padding: 8px; border: 1px solid #DDD0B3;">${validatedData.duration}</td>
            </tr>
            <tr>
              <th style="padding: 8px; text-align: left; border: 1px solid #DDD0B3;">Time Zone</th>
              <td style="padding: 8px; border: 1px solid #DDD0B3;">${validatedData.timezone}</td>
            </tr>
            <tr style="background-color: #F2ECD8;">
              <th style="padding: 8px; text-align: left; border: 1px solid #DDD0B3;">Scholar Preference</th>
              <td style="padding: 8px; border: 1px solid #DDD0B3; text-transform: capitalize;">${validatedData.genderPreference} teacher</td>
            </tr>
          </table>
          <p>An academic coordinator will email you within 12 hours with your Zoom link, time slots, and the details of your assigned teacher.</p>
          <p>If you have any questions in the meantime, please feel free to reply directly to this email.</p>
          <hr style="border: 0; border-top: 1px solid #DDD0B3; margin-top: 20px;" />
          <p style="font-size: 11px; color: #8C7A68; text-align: center;">Islam Tebyan Academy • London, UK</p>
        </div>
      `,
    });

    // Notify the admin team
    const adminEmailResponse = await resend.emails.send({
      from: 'System <alerts@islamtebyan.com>',
      to: 'admin@islamtebyan.com',
      subject: `[New Trial Booking] ${validatedData.studentName} (${validatedData.program})`,
      html: `
        <h3>New 1-on-1 Trial Booking Request Received</h3>
        <p><strong>Student Details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${validatedData.studentName}</li>
          <li><strong>Email:</strong> ${validatedData.studentEmail}</li>
          <li><strong>Age Group:</strong> ${validatedData.studentAge}</li>
          <li><strong>Program:</strong> ${validatedData.program}</li>
          <li><strong>Frequency:</strong> ${validatedData.frequency}</li>
          <li><strong>Duration:</strong> ${validatedData.duration}</li>
          <li><strong>Time Zone:</strong> ${validatedData.timezone}</li>
          <li><strong>Teacher Preference:</strong> ${validatedData.genderPreference}</li>
        </ul>
        <p><strong>Learning Goals / Background:</strong></p>
        <blockquote style="background: #F2ECD8; border-left: 5px solid #B8841A; padding: 10px; margin: 15px 0;">
          ${validatedData.studentGoals}
        </blockquote>
        <p>Coordinator action required: Assign a qualified teacher and email the student within 12 hours.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Emails dispatched successfully.',
      studentEmailId: studentEmailResponse.data?.id,
      adminEmailId: adminEmailResponse.data?.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error('Unhandled booking API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
