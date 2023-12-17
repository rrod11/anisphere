from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from datetime import date
from app.forms import ThreadForm
from random import randint
from app.models import db, Thread


thread_routes = Blueprint("threads", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@thread_routes.route("/all")
def get_all_threads():
    """get all the threads and return them """
    all_threads = Thread.query.all()
    see_threads = [thread.to_dict() for thread in all_threads]
    print(see_threads)
    print(all_threads)
    # sorted_threads = sorted(seed_threads, key=lambda Thread: Thread["date"], reverse=True)
    # return render_template("feed.html", threads=all_threads)
    return {"threads": see_threads}
    # return { "Thread": see_threads}

@thread_routes.route('/post/<int:id>')
def get_threads_for_post(id):
    threads = Thread.query.filter(Thread.post_id == id).all()

    if threads != None:
        return jsonify([thread.to_dict() for thread in threads])


@thread_routes.route("/<int:id>")
def get_Thread_by_id(id):
    """return a single Thread by the id passed to the route"""
    one_Thread = Thread.query.get(id)
    # one_Thread = [Thread for Thread in seed_threads if Thread["id"] == id ]
    print(one_Thread)
    # return render_template("feed.html", threads=[one_Thread] )
    return one_Thread.to_dict()


@thread_routes.route("/<int:postId>/new", methods=["POST"])
@login_required
def create_new_Thread(postId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = ThreadForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_Thread= Thread(
            title=form.data["title"],
            description=form.data["description"],
            post_id=form.data["post_id"],
            user_id=form.data["user_id"],
            fan=form.data["fan"],
            hater=form.data["hater"],
            debate=form.data["debate"],
        )
        print(new_Thread)
        db.session.add(new_Thread)
        db.session.commit()
        return new_Thread.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@thread_routes.route("/<int:id>/edit", methods=['PUT'])
@login_required
def update_Thread(id):
    """UPDATE Thread"""
    Thread = Thread.query.get(id)
    form = ThreadForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        Thread_to_update = Thread.query.get(id)
        if(Thread_to_update):
            Thread_to_update.post_id=form.data["post_id"]
            Thread_to_update.user_id=form.data["user_id"]
            Thread_to_update.title=form.data["title"]
            Thread_to_update.description=form.data["description"]
            Thread_to_update.fan=form.data["fan"]
            Thread_to_update.hater=form.data["hater"]
            Thread_to_update.debate=form.data["debate"]

    db.session.commit()
    return Thread_to_update.to_dict()


@thread_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_Thread(id):

    thread = Thread.query.get(id)

    if thread:
        db.session.delete(thread)
        db.session.commit()
        return f"Congrats you successfully DELETED Thread # {thread.id}"

    return "Sorry No Thread Was DELETED"
