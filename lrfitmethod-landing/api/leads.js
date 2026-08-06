/**
 * Vercel Serverless Function: Lead Capture API
 * Handles form submissions and sends email notifications
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, goal } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Log lead data (for demonstration)
    console.log('📝 New Lead:', {
      name,
      email,
      phone: phone || 'N/A',
      goal,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    });

    // TODO: Integrate email service (SendGrid, Mailgun, AWS SES, etc.)
    // For now, we'll just log and return success

    // Store lead in database (optional)
    // await saveLead({ name, email, phone, goal });

    // Send thank you email (when email service is configured)
    // await sendThankYouEmail(email, name);

    // Send notification email to admin
    // await sendAdminNotification({ name, email, phone, goal });

    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      leadId: `lead_${Date.now()}`,
    });
  } catch (error) {
    console.error('❌ Lead capture error:', error);

    return res.status(500).json({
      error: 'Failed to process lead',
      message: error.message,
    });
  }
}
