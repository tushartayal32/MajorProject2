class ExpressError extends Error {//This is for Express Errors
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;