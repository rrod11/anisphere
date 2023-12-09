from flask import Blueprint, render_template, redirect, request
from flask_login import login_required, current_user
# from ..posts import posts as seed_posts
from app.forms import PostForm
from datetime import date
from random import randint
from app.models import db, Post, User, PostImage
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


post_routes = Blueprint("posts", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@post_routes.route("/all")
def get_all_posts():
    """get all the posts and return them """
    all_posts = Post.query.all()
    see_posts = [post.to_dict() for post in all_posts]
    print(see_posts)
    print(all_posts)
    # sorted_posts = sorted(seed_posts, key=lambda post: post["date"], reverse=True)
    # return render_template("feed.html", posts=all_posts)
    return {"posts": see_posts}
    # return { "post": see_posts}


@post_routes.route("/<int:id>")
def get_post_by_id(id):
    """return a single post by the id passed to the route"""
    one_post = Post.query.get(id)
    # one_post = [post for post in seed_posts if post["id"] == id ]
    print(one_post)
    # return render_template("feed.html", posts=[one_post] )
    return one_post


@post_routes.route("/new", methods=["GET", "POST"])
@login_required
def create_new_post():
    """ route that handles displaying a form on get requests and
    handles post submission on post requests"""
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    formread = form.__dict__.items()
    print("🐍 File: api/post_routes.py | Line: 55 | create_new_post ~ formread",formread)

    if form.validate_on_submit():
        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
            return upload



        new_post = Post(

            title=form.data["title"],
            image=upload["url"],
            description=form.data["description"],
            user_id=form.data["user_id"],
        )
        print(new_post)
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()


    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



@post_routes.route("/<int:id>/edit", methods=["GET",'PUT'])
@login_required
def update_post(id):
    """Update a Post"""
    post = Post.query.get(id)
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # formread = form.__dict__.items()
    # print("🐍 File: api/post_routes.py | Line: 92 | update_post ~ form",formread)

    if form.validate_on_submit():
        # gets a ref to the resource we want to update
        post_to_update = Post.query.get(id)
        postread = post_to_update.__dict__.items()
        print("🐍 File: api/post_routes.py | Line: 97 | update_post ~ postread",postread)

        if post_to_update:
            post_to_update.description = form.data["description"]
            post_to_update.user_id = form.data["user_id"]
            post_to_update.title = form.data["title"]

            db.session.commit()
        # if form.data["image"]:
        #     print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!EUREKA")
                # file_to_delete = remove_file_from_s3(post_to_update.image)
                # image = form.data['image']
                # image.filename = get_unique_filename(image.filename)
                # upload = upload_file_to_s3(image)
                # post_to_update.image=upload["url"],
            #     if "url" not in upload:
            # return upload
                # new_image = PostImage(
                #     post_id=int(id),
                #     url=upload["url"],
                # )
                # post_to_update.image = form.data["image"]
            # db.session.add(new_image)
        else:
            return {"errors": ["not_found : Product not found."]}, 401
        db.session.commit()
        return post_to_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@post_routes.route("/<int:id>/delete", methods=["GET", "DELETE"])
def delete_post(id):
    post_to_delete = Post.query.get(id)


    file_to_delete = remove_file_from_s3(post_to_delete.image)

    if file_to_delete is True:
        db.session.delete(post_to_delete)
        db.session.commit()
        return {"message": f"Successfully deleted Product {post_to_delete.id} - {post_to_delete.title}"}

    else:
        print(file_to_delete)
        return "<h1>File delete error!</h1>"
