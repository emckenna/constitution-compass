export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try Vercel's built-in geolocation headers first
    const country = req.headers['x-vercel-ip-country'] || null;
    const region = req.headers['x-vercel-ip-country-region'] || null;
    const city = req.headers['x-vercel-ip-city'] || null;
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;

    // If Vercel headers are available, use them (faster and more reliable)
    if (country && region) {
      return res.status(200).json({
        ip: ip,
        region: region,
        country: country,
        city: city || 'Unknown',
      });
    }

    // Fallback to ipapi.co for non-Vercel environments
    const clientIp = ip === '::1' || ip === '127.0.0.1' ? '8.8.8.8' : ip;

    const response = await fetch(`https://ipapi.co/${clientIp}/json/`, {
      headers: {
        'User-Agent': 'Constitution-Compass/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`ipapi.co returned ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      ip: clientIp,
      region: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
    });
  } catch (error) {
    console.error('Error getting region:', error);
    return res.status(500).json({
      error: 'Failed to get region',
      message: error.message
    });
  }
}
