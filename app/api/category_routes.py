from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from datetime import date
from app.forms import CategoryForm
from random import randint
from app.models import db, Category



category_routes = Blueprint("categories", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@category_routes.route("/all")
def get_all_categories():
    """get all the categories and return them """
    all_categories = Category.query.all()
    see_categories = [category.to_dict() for category in all_categories]
    print(see_categories)
    print(all_categories)

    return {"categories": see_categories}
    # return {"categories": all_categories}
    # return { "category": see_categories}

@category_routes.route('/post/<int:id>')
def get_categories_for_post(id):
    categories = category.query.filter(category.post_id == id).all()

    if categories != None:
        return jsonify([category.to_dict() for category in categories])


@category_routes.route("/<int:id>")
def get_category_by_id(id):
    """return a single category by the id passed to the route"""
    one_category = category.query.get(id)
    # one_category = [category for category in seed categories if category["id"] == id ]
    print(one_category)
    # return render_template("feed.html", categories=[one_category] )
    return one_category.to_dict()


@category_routes.route("/new", methods=["POST"])
@login_required
def create_new_category(postId):
    """ route that handles displaying a form that
    handles post submission on post requests"""
    form = categoryForm()
    form['csrf_token'].data = request.cookies["csrf_token"]



    if form.validate_on_submit():
        new_category= category(
            name=form.data["name"],
        )
        print(new_category)
        db.session.add(new_category)
        db.session.commit()
        return new_category.to_dict()



    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@category_routes.route("/<int:id>/edit", methods=['PUT'])
@login_required
def update_category(id):
    """UPDATE category"""
    category = category.query.get(id)
    form = categoryForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    category_to_update = Category.query.get(id)
    if(category_to_update):
        category_to_update.idd=form.data["id"]
        category_to_update.name=form.data["name"]

    db.session.commit()
    return category_to_update.to_dict()


@category_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_category(id):

    category = Category.query.get(id)

    if category:
        db.session.delete(category)
        db.session.commit()
        return f"Congrats you successfully DELETED category # {category.id}"

    return "Sorry No category Was DELETED"
