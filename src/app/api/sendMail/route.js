import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { fullName, email, company, phone, job, source } = await request.json();

    // Validate input
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email and phone are required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    const emailUser = "zaynobusiness@gmail.com";
    const emailPass = "edem guoz gter rhwy";

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        { error: 'Email configuration is missing' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content with HTML formatting
    const mailOptions = {
      from: emailUser,
      to: emailUser, // Send to yourself
      replyTo: email, // Reply to the person who filled the form
      subject: 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="color: #555; margin-top: 0;">Contact Details</h3>
            
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Job Title:</strong> ${job || 'Not provided'}</p>
            <p><strong>How they heard about us:</strong> ${source || 'Not provided'}</p>
          </div>
          
          <p style="text-align: center; color: #777; font-size: 12px;">
            This message was sent via your website contact form on ${new Date().toLocaleDateString()}
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}