

from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a seed_reviews
def seed_reviews():
    seed_review1= Review(review='Literally the best anime to ever exist stop gawking and go give it a watch', user_id='1', post_id="1", rating="5")
    seed_review2 = Review(review='An amazing watch you will not regret taking the time out your day', user_id='2', post_id="3", rating="5")
    seed_review3 = Review(review='I was hooked from the jump cant wait for the next season', user_id='3',post_id="2", rating="5")
    seed_review4 = Review(review='Just give up your day its amazing', user_id='4',post_id="1", rating="5")

    all_reviews = [seed_review1, seed_review2, seed_review3, seed_review4]
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
