const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review reference from the Listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review itself
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");


    // Redirect to the listing page
    res.redirect(`/listings/${id}`);
};