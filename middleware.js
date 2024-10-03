const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be loggoed in to create listing!");
        return res.redirect("/login");
    }
    next();//if the user authenticated call the next
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){ //if the current user is the owner only that it can edit the listing
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body); //This line of code means that we create a listing schema in joi,On that req.body satisfy all the conditon that we define in our joi schema 
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
} 

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body); //This line of code means that we create a listing schema in joi,On that req.body satisfy all the conditon that we define in our joi schema 
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }

} 
module.exports.isReviewAuthor = async(req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currUser._id)){ 
        req.flash("error", "You are not the author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}