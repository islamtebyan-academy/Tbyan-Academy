import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validatedData = contactSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Development mode log fallback
      console.log('--- DEVELOPMENT MODE CONTACT LOG ---');
      console.log('RESEND_API_KEY is not defined. Outputting contact payload:');
      console.log(JSON.stringify(validatedData, null, 2));
      console.log('-----------------------------------');

      return NextResponse.json({
        success: true,
        message: 'Message received (Log transport fallback).',
        data: validatedData,
      });
    }

    const resend = new Resend(apiKey);

    // Send confirmation to the sender
    const senderEmailResponse = await resend.emails.send({
      from: 'Islam Tebyan Academy <support@islamtebyan.com>',
      to: validatedData.email,
      subject: 'We have received your message — Islam Tebyan Academy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #B8841A; background-color: #FDFAF3;">
          <h2 style="color: #091521; border-bottom: 2px solid #B8841A; padding-bottom: 10px;">Message Received</h2>
          <p>Dear <strong>${validatedData.name}</strong>,</p>
          <p>Assalamu Alaikum,</p>
          <p>We have successfully received your inquiry regarding <strong>"${validatedData.subject}"</strong>. Our administrative team will review your message and get back to you within 12 hours.</p>
          <p>A copy of your message is displayed below for reference:</p>
          <div style="background: #F2ECD8; border-left: 4px solid #B8841A; padding: 12px; margin: 15px 0; font-style: italic;">
            ${validatedData.message}
          </div>
          <hr style="border: 0; border-top: 1px solid #DDD0B3; margin-top: 20px;" />
          <p style="font-size: 11px; color: #8C7A68; text-align: center;">Islam Tebyan Academy • London, UK</p>
        </div>
      `,
    });

    // Notify the admin team
    const adminEmailResponse = await resend.emails.send({
      from: 'System <alerts@islamtebyan.com>',
      to: 'admin@islamtebyan.com',
      subject: `[Contact Form] ${validatedData.subject}`,
      html: `
        <h3>New Contact Inquiry</h3>
        <p><strong>Sender details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${validatedData.name}</li>
          <li><strong>Email:</strong> ${validatedData.email}</li>
          <li><strong>Subject:</strong> ${validatedData.subject}</li>
        </ul>
        <p><strong>Message content:</strong></p>
        <blockquote style="background: #F2ECD8; border-left: 5px solid #B8841A; padding: 10px; margin: 15px 0;">
          ${validatedData.message}
        </blockquote>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Emails dispatched successfully.',
      senderEmailId: senderEmailResponse.data?.id,
      adminEmailId: adminEmailResponse.data?.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error('Unhandled contact API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
