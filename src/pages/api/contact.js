// pages/api/contact.js - For Next.js Pages Router
// OR app/api/contact/route.js - For Next.js App Router

import nodemailer from 'nodemailer';

// Simple rate limiting store (in production, consider using Redis)
const rateLimitStore = new Map();

const rateLimit = (ip, limit = 5, windowMs = 15 * 60 * 1000) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }
  
  const requests = rateLimitStore.get(ip).filter(time => time > windowStart);
  
  if (requests.length >= limit) {
    return false;
  }
  
  requests.push(now);
  rateLimitStore.set(ip, requests);
  return true;
};

const createTransporter = () => {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });
  }
  
  // Alternative SMTP configuration
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const validateContactForm = (data) => {
  const { name, email, subject, message } = data;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!subject || subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
};

const sanitizeInput = (str) => {
  return str.replace(/[<>]/g, '');
};

const getClientIP = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress ||
         '127.0.0.1';
};

// For Next.js Pages Router (12 and below)
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (!rateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.'
      });
    }

    const { name, email, subject, message } = req.body;

    // Validate input
    const validationErrors = validateContactForm(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name.trim()),
      email: email.trim().toLowerCase(),
      subject: sanitizeInput(subject.trim()),
      message: sanitizeInput(message.trim())
    };

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: 'hetchavadiya@gmail.com',
      subject: `Contact Form: ${sanitizedData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Contact Form Submission</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background-color: #f8f9fa; 
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px 20px; 
              border-radius: 8px; 
              margin-bottom: 20px; 
              text-align: center;
            }
            .header h1 { margin: 0; font-size: 24px; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; }
            .content { 
              background-color: #ffffff; 
              padding: 30px; 
              border-radius: 8px; 
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .field { 
              margin-bottom: 20px; 
              border-bottom: 1px solid #e9ecef;
              padding-bottom: 15px;
            }
            .field:last-child { border-bottom: none; margin-bottom: 0; }
            .label { 
              font-weight: 600; 
              color: #495057; 
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 8px;
              display: block;
            }
            .value { 
              padding: 12px 15px; 
              background-color: #f8f9fa; 
              border-radius: 6px; 
              font-size: 16px;
              border-left: 4px solid #667eea;
            }
            .message-content { 
              white-space: pre-wrap; 
              line-height: 1.8;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              padding: 20px;
              color: #6c757d;
              font-size: 14px;
            }
            @media (max-width: 600px) {
              .container { padding: 10px; }
              .content { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
              <p>Received on ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Name</span>
                <div class="value">${sanitizedData.name}</div>
              </div>
              <div class="field">
                <span class="label">✉️ Email</span>
                <div class="value">${sanitizedData.email}</div>
              </div>
              <div class="field">
                <span class="label">📋 Subject</span>
                <div class="value">${sanitizedData.subject}</div>
              </div>
              <div class="field">
                <span class="label">💬 Message</span>
                <div class="value message-content">${sanitizedData.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from your website's contact form.</p>
              <p>Reply directly to this email to respond to ${sanitizedData.name}.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}
Message: ${sanitizedData.message}

Received on: ${new Date().toLocaleString()}
      `,
      replyTo: sanitizedData.email
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// For Next.js 13+ App Router - uncomment this section if using App Router
/*
export async function POST(request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '127.0.0.1';
    
    if (!rateLimit(clientIP)) {
      return Response.json({
        success: false,
        error: 'Too many requests. Please try again later.'
      }, { status: 429 });
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    const validationErrors = validateContactForm(body);
    if (validationErrors.length > 0) {
      return Response.json({
        success: false,
        errors: validationErrors
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name.trim()),
      email: email.trim().toLowerCase(),
      subject: sanitizeInput(subject.trim()),
      message: sanitizeInput(message.trim())
    };

    // Create transporter
    const transporter = createTransporter();
    await transporter.verify();

    // Email options (same as above)
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: 'hetchavadiya@gmail.com',
      subject: `Contact Form: ${sanitizedData.subject}`,
      html: // Same HTML template as above
      replyTo: sanitizedData.email
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);

    return Response.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    return Response.json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    }, { status: 500 });
  }
}
*/