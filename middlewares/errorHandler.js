export const errorHandler = (error, req, res, next) => { 
    const { status = 500, message = "Server Error!" } = error
    res.status(status).json({
        message
    });
};
