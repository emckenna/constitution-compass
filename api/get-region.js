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
    // Get the user's IP address from the request
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;

    // For development, use a default IP
    const clientIp = ip === '::1' || ip === '127.0.0.1' ? '8.8.8.8' : ip;

    // Fetch region data from ipapi.co
    const response = await fetch(`https://ipapi.co/${clientIp}/json/`);

    if (!response.ok) {
      throw new Error('Failed to fetch region data');
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
