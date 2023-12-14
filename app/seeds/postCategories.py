from app.models import db, postcategories, environment, SCHEMA
from sqlalchemy.sql import text


# # Adds a demo user, you can add other users here if you want
def seed_postcategories():
    seed_postcategory1= postcategories( post_id="1", category_id="2" )
    seed_postcategory2 = postcategories(post_id="3", category_id="1" )
    seed_postcategory3 = postcategories(post_id="2", category_id="2")
    seed_postcategory4 = postcategories(post_id="4", category_id="3")


    all_postcategories = [seed_postcategory1, seed_postcategory2, seed_postcategory3, seed_postcategory4]
    add_postcategories = [db.session.add(postCat) for postCat in all_postcategories]
    db.session.commit()


def undo_postcategories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.postcategories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM postcategories"))

    db.session.commit()
