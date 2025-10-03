module.exports = async function handler(req, res) {
  return res.status(200).json({
    hasApiKey: !!process.env.GEMINI_API_KEY,
    keyLength: process.env.GEMINI_API_KEY?.length || 0,
    nodeVersion: process.version
  });
};
