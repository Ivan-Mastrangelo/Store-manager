module.exports = (error, req, res, _next) => {
    if (error.status) return res.status(error.status).json({ message: error.message });
    res.status(500).json({ message: `internal server error: ${error.message}` });
};