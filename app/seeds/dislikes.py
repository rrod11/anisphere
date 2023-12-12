

from app.models import db, Dislike, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint

likeChoice= [False, True]


# Adds a seed_dislikes
def seed_dislikes():
    seed_dislikes1= Dislike(dislikes=True, user_id=1, post_id=randint(1, 123))
    seed_dislikes2 = Dislike(dislikes=True, user_id=2, post_id=randint(1, 123))
    seed_dislikes3 = Dislike(dislikes=True, user_id=3,post_id=randint(1, 123))
    seed_dislikes4 = Dislike(dislikes=True, user_id=4,post_id=randint(1, 123))
    seed_dislikes5 = Dislike(dislikes=choice(likeChoice), user_id=5,post_id=randint(1, 123))
    seed_dislikes6 = Dislike(dislikes=choice(likeChoice), user_id=6,post_id=randint(1, 123))
    seed_dislikes7 = Dislike(dislikes=choice(likeChoice), user_id=7,post_id=randint(1, 123))
    seed_dislikes8 = Dislike(dislikes=choice(likeChoice), user_id=8,post_id=randint(1, 123))
    seed_dislikes9 = Dislike(dislikes=choice(likeChoice), user_id=9,post_id=randint(1, 123))
    seed_dislikes10 = Dislike(dislikes=choice(likeChoice), user_id=10,post_id=randint(1, 123))


    all_dislikes = [seed_dislikes1, seed_dislikes2, seed_dislikes3, seed_dislikes4,
                    seed_dislikes5, seed_dislikes6,
                   seed_dislikes7, seed_dislikes8, seed_dislikes9, seed_dislikes10,
                   ]
    add_dislikes = [db.session.add(dislikes) for dislikes in all_dislikes]
    db.session.commit()


def undo_dislikes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dislikes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dislikes"))

    db.session.commit()
