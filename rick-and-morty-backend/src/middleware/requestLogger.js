module.exports = function requestLogger(req, res, next) {
    const start = Date.now();
    console.log(`[${new Date().toISOString()}] --> ${req.method} ${req.originalUrl}`);
    if (req.method !== 'GET') {
        const body = JSON.stringify(req.body || {})
        const cleanBody = body.replace(/\s+/g, ' ')
            .replace(/\\n/g, '')
            .replace(/\\"/g, '"');
        console.log('  Body:', cleanBody);
    }
    res.on('finish', () => {
        const ms = Date.now() - start;
        console.log(`[${new Date().toISOString()}] <-- ${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
    });
    next();
};