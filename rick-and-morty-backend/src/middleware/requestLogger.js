module.exports = function requestLogger(req, res, next) {
  const start = Date.now();
  console.log(`[${new Date().toISOString()}] --> ${req.method} ${req.originalUrl}`);
  if (req.method !== 'GET') {
    console.log('  Body:', JSON.stringify(req.body || {}));
  }
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`[${new Date().toISOString()}] <-- ${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
  });
  next();
};