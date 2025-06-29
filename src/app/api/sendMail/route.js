import nodemailer from "nodemailer";

export async function POST(request) {
  // Validate environment variables first
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    console.error("Missing email credentials in environment variables");
    return Response.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'businessEmail', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return Response.json(
        { 
          message: "Missing required fields",
          missingFields,
          error: `${missingFields.join(', ')} are required`
        },
        { status: 400 }
      );
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const emailFields = [
      { label: 'Full Name', value: formData.fullName },
      { label: 'Company Name', value: formData.companyName || 'N/A' },
      { label: 'Business Email', value: formData.businessEmail },
      { label: 'Phone Number', value: formData.phoneNumber },
      { label: 'Job Title', value: formData.jobTitle || 'N/A' },
      { label: 'How did they hear about us', value: formData.source || 'Not specified' }
    ];

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 24px; border-radius: 8px; background-color: #ffffff;">
        <h2 style="border-bottom: 1px solid #f1f1f1; padding-bottom: 12px; text-align: center;">New Contact Submission – Forwardsols</h2>
        ${emailFields.map(field => `<p><strong>${field.label}:</strong> ${field.value}</p>`).join('')}
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #dddddd;" />
        <p style="font-size: 0.9rem; color: #555555;">This message was submitted through the Forwardsols website contact form.</p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"${formData.fullName}" <${formData.businessEmail}>`,
      replyTo: formData.businessEmail,
      to: process.env.GMAIL_USER,
      subject: `New Contact Form Submission from ${formData.fullName}`,
      html: htmlContent,
    });

    return Response.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Email sending failed:", error);
    return Response.json(
      { 
        message: "Failed to send message", 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
