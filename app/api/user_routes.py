from flask import Blueprint, jsonify
from flask_login import login_required, logout_user, current_user
from app.models import db, User

user_routes = Blueprint('users', __name__)


@user_routes.route('/all')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delAccount(id):
    user = User.query.get(id)
    logout_user()
    if user:
        db.session.delete(user)
        db.session.commit()
        return { "message": "delete successful" }
    return "No User Exists"
