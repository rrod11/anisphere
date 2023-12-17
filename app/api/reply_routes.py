from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from datetime import date
from app.forms import replyForm
from random import randint
from app.models import db, Reply
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


reply_routes = Blueprint("replies", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@reply_routes.route("/all")
def get_all_replies():
    """get all the replies and return them """
    all_replies = Reply.query.all()
    see_replies = [reply.to_dict() for reply in all_replies]
    print(see_replies)
    print(all_replies)
    # sorted_replies = sorted(seed_replies, key=lambda reply: reply["date"], reverse=True)
    # return render_template("feed.html", replies=all_replies)
    return {"replies": see_replies}
    # return { "reply": see_replies}

@reply_routes.route('/thread/<int:id>')
def get_revs_for_post(id):
    replies = Reply.query.filter(Reply.thread_id == id).all()

    if replies != None:
        return jsonify([rev.to_dict() for rev in replies])


@reply_routes.route("/<int:id>")
def get_reply_by_id(id):
    """return a single reply by the id passed to the route"""
    one_reply = Reply.query.get(id)
    # one_reply = [reply for reply in seed_replies if reply["id"] == id ]
    print(one_reply)
    # return render_template("feed.html", replies=[one_reply] )
    return one_reply.to_dict()


@reply_routes.route("/<int:threadId>/new", methods=["POST"])
@login_required
def create_new_reply(threadId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = ReplyForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_reply= reply(
            reply=form.data["reply"],
            thread_id=form.data["thread_id"],
            user_id=form.data["user_id"],
        )
        print(new_reply)
        db.session.add(new_reply)
        db.session.commit()
        return new_reply.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@reply_routes.route("/<int:id>/edit", methods=['PUT'])
@login_required
def update_reply(id):
    """UPDATE reply"""
    reply = reply.query.get(id)
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        reply_to_update = reply.query.get(id)
        if(reply_to_update):
            reply_to_update.thread_id=form.data["thread_id"]
            reply_to_update.user_id=form.data["user_id"]
            reply_to_update.reply=form.data["reply"]
    db.session.commit()
    return reply_to_update.to_dict()


@reply_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_reply(id):

    reply = reply.query.get(id)

    if reply:
        db.session.delete(reply)
        db.session.commit()
        return f"Congrats you successfully DELETED reply # {reply.id}"

    return "Sorry No reply Was DELETED"
