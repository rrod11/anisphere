from flask import Blueprint, render_template, redirect
from flask_login import login_required, current_user
from datetime import date
from random import randint
from app.models import db, Review
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


review_routes = Blueprint("reviews", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@review_routes.route("/all")
def get_all_reviews():
    """get all the reviews and return them """
    all_reviews = Review.query.all()
    see_reviews = [review.to_dict() for review in all_reviews]
    print(see_reviews)
    print(all_reviews)
    # sorted_reviews = sorted(seed_reviews, key=lambda review: review["date"], reverse=True)
    # return render_template("feed.html", reviews=all_reviews)
    return {"reviews": see_reviews}
    # return { "review": see_reviews}


@review_routes.route("/<int:id>")
def get_review_by_id(id):
    """return a single review by the id passed to the route"""
    one_review = Review.query.get(id)
    # one_review = [review for review in seed_reviews if review["id"] == id ]
    print(one_review)
    # return render_template("feed.html", reviews=[one_review] )
    return one_review


@review_routes.route("/<int:postId>/new", methods=["POST"])
@login_required
def create_new_review(postId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = ReviewForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_review= Review(
            review=form.data["review"],
            post_id=form.data["post_id"],
            rating=form.data["rating"],
            user_id=form.data["user_id"]
        )
        print(new_review)
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@review_routes.route("/<int:id>/edit", methods=['PUT', 'review'])
@login_required
def update_review(id):
    review = Review.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.product_id=form.data["product_id"]
        review.user_id=form.data["user_id"]
        review.review=form.data["review"]
        review.rating=form.data["rating"]

    db.session.commit()
    return review.to_dict()


@review_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_review(id):

    review = Review.query.get(id)

    if review:
        db.session.delete(review)
        db.session.commit()
        return f"Congrats you successfully DELETED review # {review.id}"

    return "Sorry No Review Was DELETED"
