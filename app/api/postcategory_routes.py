from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from datetime import date
from app.forms import CategoryPostForm
from random import randint
from app.models import db, postcategories



postcategories_routes = Blueprint("postcategories", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@postcategories_routes.route("/all")
def get_all_postCategories():
    """get all the postcategories and return them """
    all_postCategories = postcategories.query.all()
    see_postCategories = [postcategories.to_dict() for postCategories in all_postCategories]
    print(see_postCategories)
    print(all_postCategories)

    return {"postcategories": see_postcategories}
    # return { "postcategories": see_postcategories}

@postcategories_routes.route('/post/<int:id>')
def get_postCategories_for_post(id):
    postCategories = postcategories.query.filter(postcategories.post_id == id).all()

    if postcategories != None:
        return jsonify([postCategories.to_dict() for postCategories in postCategories])


@postcategories_routes.route("/<int:id>")
def get_postCategories_by_id(id):
    """return a single postcategories by the id passed to the route"""
    one_postCategories = postcategories.query.get(id)
    # one_postcategories = [postcategories for postcategories in seed_postcategories if postcategories["id"] == id ]
    print(one_postCategories)
    # return render_template("feed.html", postcategories=[one_postcategories] )
    return one_postCategories.to_dict()


@postcategories_routes.route("/<int:postId>/new", methods=["POST"])
@login_required
def create_new_postcategories(postId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = CategoryPostForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_postCategories= postcategories(
            post_id=postId,
            category_id=form.data["category_id"],
        )
        print(new_postCategories)
        db.session.add(new_postCategories)
        db.session.commit()
        return new_postCategories.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@postcategories_routes.route("/<int:id>/edit", methods=['PUT'])
@login_required
def update_postCategories(id):
    """UPDATE postCategories"""
    postCategories = postcategories.query.get(id)
    form = postCategoriesForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    postCategories_to_update = postcategories.query.get(id)
    if(postCategories_to_update):
        postCategories_to_update.post_id=form.data["post_id"]
        postCategories_to_update.user_id=form.data["user_id"]

    db.session.commit()
    return postCategories_to_update.to_dict()


@postcategories_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_postCategories(id):

    postCategories = postcategories.query.get(id)

    if postCategories:
        db.session.delete(postCategories)
        db.session.commit()
        return f"Congrats you successfully DELETED postcategories # {postCategories.id}"

    return "Sorry No postcategories Was DELETED"
