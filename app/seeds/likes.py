

from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint

likeChoice= [False, True]


# Adds a seed_likes
def seed_likes():
    seed_likes1= Like(likes=True, user_id=1, post_id=randint(1, 25))
    seed_likes2 = Like(likes=True, user_id=2, post_id=randint(1, 25))
    seed_likes3 = Like(likes=True, user_id=3,post_id=randint(1, 25))
    seed_likes4 = Like(likes=True, user_id=4,post_id=randint(1, 25))
    seed_likes5 = Like(likes=choice(likeChoice), user_id=5,post_id=randint(1, 25))
    seed_likes6 = Like(likes=choice(likeChoice), user_id=6,post_id=randint(1, 25))
    seed_likes7 = Like(likes=choice(likeChoice), user_id=7,post_id=randint(1, 25))
    seed_likes8 = Like(likes=choice(likeChoice), user_id=8,post_id=randint(1, 25))
    seed_likes9 = Like(likes=choice(likeChoice), user_id=9,post_id=randint(1, 25))
    seed_likes10 = Like(likes=choice(likeChoice), user_id=10,post_id=randint(1, 25))


    all_likes = [seed_likes1, seed_likes2, seed_likes3, seed_likes4,
                 seed_likes5, seed_likes6,
                   seed_likes7, seed_likes8, seed_likes9, seed_likes10,
                   ]
    add_likes = [db.session.add(likes) for likes in all_likes]
    db.session.commit()


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
