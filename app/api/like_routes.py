from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from datetime import date
from app.forms import LikeForm
from random import randint
from app.models import db, Like



like_routes = Blueprint("likes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@like_routes.route("/all")
def get_all_likes():
    """get all the likes and return them """
    all_likes = Like.query.all()
    see_likes = [like.to_dict() for like in all_likes]
    print(see_likes)
    print(all_likes)

    return {"likes": see_likes}
    # return { "like": see_likes}

@like_routes.route('/post/<int:id>')
def get_likes_for_post(id):
    likes = Like.query.filter(like.post_id == id).all()

    if likes != None:
        return jsonify([like.to_dict() for like in likes])


@like_routes.route("/<int:id>")
def get_like_by_id(id):
    """return a single like by the id passed to the route"""
    one_like = Like.query.get(id)
    # one_like = [like for like in seed_likes if like["id"] == id ]
    print(one_like)
    # return render_template("feed.html", likes=[one_like] )
    return one_like.to_dict()


@like_routes.route("/<int:postId>/new", methods=["POST"])
@login_required
def create_new_like(postId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = LikeForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_like= Like(
            likes=form.data["likes"],
            post_id=form.data["post_id"],
            user_id=form.data["user_id"],
        )
        print(new_like)
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@like_routes.route("/<int:id>/edit", methods=['PUT'])
@login_required
def update_like(id):
    """UPDATE like"""
    like = Like.query.get(id)
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        like_to_update = like.query.get(id)
        if(like_to_update):
            like_to_update.post_id=form.data["post_id"]
            like_to_update.likes=form.data["likes"]
            like_to_update.user_id=form.data["user_id"]

    db.session.commit()
    return like_to_update.to_dict()


@like_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_like(id):

    like = Like.query.get(id)

    if like:
        db.session.delete(like)
        db.session.commit()
        return f"Congrats you successfully DELETED like # {like.id}"

    return "Sorry No like Was DELETED"
