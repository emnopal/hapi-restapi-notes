const failResponse = (
    {
        h,
        data = null,
        status = 'fail',
        message = 'Fail',
        statusCode = 500,
        type = 'application/json',
    },
) => {
    return h.response({
        status: status,
        message: message,
        data: data ?? '',
    }).code(statusCode).type(type);
};

module.exports = failResponse;
