// Vercel serverless function — Insulflo contact form → GoHighLevel
// Runs server-side so the token is never exposed to the browser.
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   GHL_API_TOKEN   = Private Integration token from Insulflo's GHL sub-account
//                     (scopes: contacts.write, opportunities.write)
//   GHL_LOCATION_ID = that sub-account's Location ID
const GHL_BASE = 'https://services.leadconnectorhq.com';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    if (!process.env.GHL_API_TOKEN || !process.env.GHL_LOCATION_ID) {
      res.status(500).json({ error: 'GHL not configured' });
      return;
    }

    // Parse JSON body (Vercel usually parses it; read the raw stream as a fallback).
    let body = req.body;
    if (!body || typeof body === 'string') {
      const raw =
        typeof body === 'string'
          ? body
          : await new Promise((resolve) => {
              let d = '';
              req.on('data', (c) => (d += c));
              req.on('end', () => resolve(d));
            });
      try {
        body = JSON.parse(raw || '{}');
      } catch {
        body = {};
      }
    }

    const {
      name = '',
      phone = '',
      email = '',
      service = '',
      message = '',
    } = body;

    if (!phone && !email) {
      res.status(400).json({ error: 'Phone or email required' });
      return;
    }

    const headers = {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
      Version: '2021-07-28',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // Create/update the contact (dedupes by phone/email within the location).
    const [first, ...rest] = String(name).trim().split(/\s+/);
    const upsert = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        firstName: first || 'Website',
        lastName: rest.join(' ') || 'Lead',
        phone,
        email,
        source: 'Insulflo Website',
        tags: ['website-lead', ...(service ? [service] : [])],
      }),
    });

    const data = await upsert.json();
    if (!upsert.ok) {
      res.status(502).json({ error: `GHL ${upsert.status}` });
      return;
    }
    const contact = data.contact || data;

    // Attach the service + project details as a readable note.
    const details = [
      service && `Service: ${service}`,
      message && `Message: ${message}`,
    ]
      .filter(Boolean)
      .join('\n');

    if (details && contact.id) {
      await fetch(`${GHL_BASE}/contacts/${contact.id}/notes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ body: `Website form:\n${details}` }),
      }).catch(() => {});
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
