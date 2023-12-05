from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_categories():
    seed_category1= Category( name="Action" )
    seed_category2 = Category(name="Adventure", )
    seed_category3 = Category(name="Comedy")
    seed_category4 = Category(name="Drama")
    seed_category5 = Category(name="Harem")
    seed_category6 = Category(name="Horror")
    seed_category7 = Category(name="Historical")
    seed_category8 = Category(name="Parody")
    seed_category9 = Category(name="Romance")
    seed_category10 = Category(name="Psychological")
    seed_category11 = Category(name="Sci-Fi")
    seed_category12 = Category(name="School")



    all_posts = [seed_category1, seed_category2, seed_category3, seed_category4, seed_category5, seed_category6, seed_category7, seed_category8, seed_category9, seed_category10, seed_category11, seed_category12]
    add_products = [db.session.add(post) for post in all_posts]
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
