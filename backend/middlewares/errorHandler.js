
module.exports = (err, req, res, next) => {
    // console.log(process.env.NODE_ENV);
    // console.log(err.message);
    // console.log(err.stack);
    // console.log(res.statusCode);
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({
        code: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}