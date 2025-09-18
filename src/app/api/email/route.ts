import { NextResponse } from "next/server";
import { SMTPClient } from "emailjs";
import { render } from "@react-email/render";
import { ContactMail } from "../../../../emails/ContactMail";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message, eventType, eventDate } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    // Create email client
    const client = new SMTPClient({
      user: process.env.GMAIL_USER,
      password: process.env.GMAIL_PASSWORD,
      host: "smtp.gmail.com",
      ssl: true,
      port: 465,
    });

    // Render email template
    const mailContent = await render(
      ContactMail({ 
        name, 
        email, 
        phone, 
        subject, 
        message, 
        eventType, 
        eventDate 
      })
    );

    // Send email
    await client.sendAsync({
      text: `Nova mensagem de ${name} (${email}):\n\n${message}`,
      from: process.env.GMAIL_USER!,
      to: process.env.GMAIL_USER!,
      subject: `[Camila Retrata] ${subject}`,
      attachment: [{ data: mailContent, alternative: true }],
    });

    return NextResponse.json({ 
      success: true, 
      message: "Mensagem enviada com sucesso!" 
    });
    
  } catch (error: any) {
    console.error('Email sending error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Erro ao enviar mensagem. Tente novamente." 
      },
      { status: 500 }
    );
  }
}
