export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({ 
    message: 'API Laura Diet 2.0 fonctionne !',
    timestamp: new Date().toISOString(),
    routes: [
      '/api/reviews',
      '/api/prices', 
      '/api/recipes',
      '/api/infoaddrecipes'
    ]
  });
}