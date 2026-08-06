# Email Integration Guide

## Overview

The form integration captures leads and can send automated emails. This guide shows how to set up email notifications.

## Email Service Options

### Option 1: SendGrid (Recommended)

**Free tier:** 100 emails/day

1. **Create account:** https://sendgrid.com/free
2. **Get API key:** Settings → API Keys → Create API Key
3. **Add to Vercel:** Dashboard → Settings → Environment Variables

```
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@lrfitmethod.com
```

4. **Install SDK:**
```bash
npm install @sendgrid/mail
```

5. **Update api/leads.js:**
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const { name, email, phone, goal } = req.body;

  try {
    // Send thank you email
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Bem-vindo ao LR Fit Method! 🎯',
      html: `
        <h1>Olá ${name}!</h1>
        <p>Obrigado por se registrar. Em breve entraremos em contato.</p>
        <p>Objetivo: ${goal}</p>
      `,
    });

    // Send notification to admin
    await sgMail.send({
      to: 'admin@lrfitmethod.com',
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Novo Lead: ${name}`,
      html: `
        <p>Nome: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone || 'N/A'}</p>
        <p>Objetivo: ${goal}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
```

### Option 2: Mailgun

**Free tier:** 100 emails/month (then $0.50 per 1000)

1. **Create account:** https://www.mailgun.com/
2. **Get API key:** Domain Settings → API Keys
3. **Add to Vercel:**

```
MAILGUN_API_KEY=key-xxxxx
MAILGUN_DOMAIN=mail.lrfitmethod.com
```

4. **Install SDK:**
```bash
npm install mailgun.js
```

### Option 3: AWS SES

**Free tier:** 62,000 emails/month (in EC2)

1. **Verify sender email:** AWS Console → SES → Verified Identities
2. **Get credentials:** IAM → Access Keys
3. **Add to Vercel:**

```
AWS_SES_ACCESS_KEY=AKIAS...
AWS_SES_SECRET_KEY=wJa...
AWS_SES_REGION=us-east-1
```

### Option 4: Resend (Modern Alternative)

**Free tier:** 100 emails/day

1. **Create account:** https://resend.com
2. **Get API key:** API Tokens
3. **Add to Vercel:**

```
RESEND_API_KEY=re_xxxxx
```

4. **Install SDK:**
```bash
npm install resend
```

5. **Usage:**
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'Welcome to LR Fit Method',
  html: '...',
});
```

## Database Options (Store Leads)

### Option 1: Supabase (PostgreSQL)

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        goal: req.body.goal,
        created_at: new Date(),
      },
    ]);

  if (error) return res.status(400).json({ error });
  return res.status(200).json({ success: true });
}
```

### Option 2: Firebase Firestore

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  // ... other config
});

const db = getFirestore(app);

export default async function handler(req, res) {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      goal: req.body.goal,
      createdAt: new Date(),
    });

    return res.status(200).json({ id: docRef.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

### Option 3: MongoDB Atlas

```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db('lrfit');
    
    const result = await db.collection('leads').insertOne({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      goal: req.body.goal,
      createdAt: new Date(),
    });

    return res.status(200).json({ id: result.insertedId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
}
```

## Email Templates

### Welcome Email Template
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background-color: #D4AF37; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .button { background-color: #D4AF37; color: #1a1a1a; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LR Fit Method</h1>
    </div>
    <div class="content">
      <h2>Bem-vindo, {{name}}! 🎯</h2>
      <p>Obrigado por começar sua jornada de transformação com LR Fit Method.</p>
      
      <p><strong>Próximos passos:</strong></p>
      <ul>
        <li>Verifique seu email para o link de confirmação</li>
        <li>Agende sua avaliação gratuita</li>
        <li>Receba seu plano personalizado</li>
      </ul>
      
      <p>Seu objetivo: <strong>{{goal}}</strong></p>
      
      <a href="https://lrfitmethod.vercel.app" class="button">Voltar ao Site</a>
      
      <p>Qualquer dúvida? Entre em contato pelo WhatsApp ou envie um email.</p>
    </div>
  </div>
</body>
</html>
```

## Testing

### Local Testing
```bash
# Install Mailhog (fake SMTP server)
brew install mailhog
mailhog

# Access at http://localhost:1025
```

### Test with SendGrid
```bash
curl -X POST "https://api.sendgrid.com/v3/mail/send" \
  -H "Authorization: Bearer $SENDGRID_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations": [{
      "to": [{"email": "test@example.com"}]
    }],
    "from": {"email": "noreply@lrfitmethod.com"},
    "subject": "Test",
    "content": [{"type": "text/plain", "value": "Test"}]
  }'
```

## Deliverability Tips

1. **Warm up IP:** Start with low volume, gradually increase
2. **SPF record:** Add to DNS for domain verification
3. **DKIM signature:** Enable in email provider
4. **DMARC policy:** Protect against spoofing
5. **Test emails:** Use EmailOnDeck or similar service
6. **Monitor reputation:** Check with MXToolbox

## GDPR Compliance

- Include unsubscribe link in all emails
- Store consent proof
- Honor opt-out requests within 48 hours
- Keep data only as long as needed
- Ensure HTTPS on all forms

## Monitoring

### Email Analytics
- Open rates
- Click-through rates
- Bounce rates
- Spam complaints

**Tools:**
- SendGrid → Analytics
- Google Analytics → Conversions
- Mixpanel → Event tracking

## Environment Variables Checklist

```
VITE_API_URL=https://lrfitmethod.vercel.app
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@lrfitmethod.com
MONGODB_URI=mongodb+srv://...
```

---

**Ready to send emails?** Choose a service and add to `.env` for local testing, then to Vercel dashboard for production.
