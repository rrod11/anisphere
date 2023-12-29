from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from datetime import date
from app.forms import DislikeForm
from random import randint
from app.models import db, Dislike



dislike_routes = Blueprint("dislikes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@dislike_routes.route("/all")
def get_all_dislikes():
    """get all the dislikes and return them """
    all_dislikes = Dislike.query.all()
    see_dislikes = [dislike.to_dict() for dislike in all_dislikes]


    return {"dislikes": see_dislikes}


@dislike_routes.route('/post/<int:id>')
def get_dislikes_for_post(id):
    dislikes = Dislike.query.filter(dislike.post_id == id).all()

    if dislikes != None:
        return jsonify([dislike.to_dict() for dislike in dislikes])


@dislike_routes.route("/<int:id>")
def get_dislike_by_id(id):
    """return a single dislike by the id passed to the route"""
    one_dislike = Dislike.query.get(id)

    return one_dislike.to_dict()


@dislike_routes.route("/<int:postId>/new", methods=["POST"])
@login_required
def create_new_dislike(postId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = DislikeForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_dislike= Dislike(
            dislikes=form.data["dislikes"],
            post_id=form.data["post_id"],
            user_id=form.data["user_id"],
        )

        db.session.add(new_dislike)
        db.session.commit()
        return new_dislike.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@dislike_routes.route("/<int:id>/edit", methods=['PUT'])
@login_required
def update_dislike(id):
    """UPDATE like"""
    dislike = Dislike.query.get(id)
    form = DislikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    dislike_to_update = Dislike.query.get(id)
    if(dislike_to_update):
        dislike_to_update.post_id=form.data["post_id"]
        dislike_to_update.dislikes=form.data["dislikes"]
        dislike_to_update.user_id=form.data["user_id"]

    db.session.commit()
    return dislike_to_update.to_dict()


@dislike_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_dislike(id):

    dislike = Dislike.query.get(id)

    if dislike:
        db.session.delete(dislike)
        db.session.commit()
        return f"Congrats you successfully DELETED like # {dislike.id}"

    return "Sorry No dislike Was DELETED"
