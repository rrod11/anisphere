from app.models import db, PostCategory, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_postCategories():
    seed_postcategory1= PostCategory( post_id="1", category_id="2" )
    seed_postcategory2 = PostCategory(post_id="3", category_id="1", )
    seed_postcategory3 = PostCategory(post_id="2", category_id="2")
    seed_postcategory4 = PostCategory(post_id="1", category_id="3")


    all_postCategories = [seed_postcategory1, seed_postcategory2, seed_postcategory3, seed_postcategory4]
    add_postCategories = [db.session.add(postCat) for postCat in all_postCategories]
    db.session.commit()


def undo_postCategories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.postCategories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM postCategories"))

    db.session.commit()
