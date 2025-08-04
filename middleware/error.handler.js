const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Oops! Something went wrong on our end. Please try again later.';

    res.status(statusCode).json({
        success: false,
        error: message
    });

    next();
};

export default errorHandler;