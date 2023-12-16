from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from datetime import date
from app.forms import LikeForm
from random import randint
from app.models import db, ThreadLike



threadlikes_routes = Blueprint("likes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@threadlikes_routes.route("/all")
def get_all_threadlikes():
    """get all the threadlikes and return them """
    all_threadlikes = Threadlike.query.all()
    see_threadlikes = [threadlike.to_dict() for threadlike in all_threadlikes]
    print(see_threadlikes)
    print(all_threadlikes)

    return {"likes": see_likes}
    # return { "like": see_likes}

@threadlikes_routes.route('/post/<int:id>')
def get_threadlikes_for_post(id):
    threadlikes = Threadlike.query.filter(threadlike.thread_id == id).all()

    if threadlikes != None:
        return jsonify([threadlike.to_dict() for threadlike in threadlikes])


@threadlikes_routes.route("/<int:id>")
def get_threadlike_by_id(id):
    """return a single threadlike by the id passed to the route"""
    one_threadlike = Threadlike.query.get(id)
    # one_like = [like for like in seed_likes if like["id"] == id ]
    print(one_like)
    # return render_template("feed.html", likes=[one_like] )
    return one_threadlike.to_dict()


@threadlikes_routes.route("/<int:threadId>/new", methods=["POST"])
@login_required
def create_new_like(threadId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = ThreadlikeForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_threadlike= ThreadLike(
            likes=form.data["likes"],
            thread_id=form.data["thread_id"],
            user_id=form.data["user_id"],
        )
        print(new_threadlike)
        db.session.add(new_threadlike)
        db.session.commit()
        return new_threadlike.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@threadlikes_routes.route("/<int:id>/edit", methods=['PUT'])
@login_required
def update_like(id):
    """UPDATE threadlike"""
    threadlike = Threadlike.query.get(id)
    form = LikeForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    threadlike_to_update = Threadlike.query.get(id)
    if(threadlike_to_update):
        threadlike_to_update.thread_id=form.data["thread_id"]
        threadlike_to_update.likes=form.data["likes"]
        threadlike_to_update.user_id=form.data["user_id"]

    db.session.commit()
    return threadlike_to_update.to_dict()


@threadlikes_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_threadlike(id):

    threadlike = Threadlike.query.get(id)

    if like:
        db.session.delete(threadlike)
        db.session.commit()
        return f"Congrats you successfully DELETED threadlike # {threadlike.id}"

    return "Sorry No threadlike Was DELETED"
