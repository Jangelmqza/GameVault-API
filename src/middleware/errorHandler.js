const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${err.message}`);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        error: {
            message: message,
            status: statusCode,
            path: req.originalUrl,
            timestamp: new Date().toISOString()
        }
    });
};

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: {
            message: 'Ruta no encontrada',
            status: 404,
            path: req.originalUrl
        }
    });
};

module.exports = { errorHandler, notFoundHandler };
