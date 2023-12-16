from app.models import db, Thread, environment, SCHEMA
from random import choice, sample, randint
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_threads():
    seed_thread1= Thread(title="Best Ever", description=".", user_id=randint(1, 10), post_id=randint(1,22), fan=True)
    seed_thread2= Thread(title="Crazy Plot",  user_id=randint(1, 10) , description=".", post_id=randint(1,22), fan=True)
    seed_thread3 = Thread(title="Im addicted",  user_id=randint(1, 10), description="  .", post_id=randint(1,22), fan=True)
    seed_thread4 = Thread(title="Top of the top",  user_id=randint(1, 10),  description=".", post_id=randint(1,22), fan=True)
    seed_thread5 = Thread(title="Better than life",  user_id=randint(1, 10), description=".", post_id=randint(1,22), fan=True)
    seed_thread6 = Thread(title="Cant even begin to explain",  user_id=randint(1, 10), description="", post_id=randint(1,22), fan=True)
    seed_thread7 = Thread(title="They did that",  user_id=randint(1, 10), description="", post_id=randint(1,22), fan=True)
    seed_thread8 = Thread(title="10/10",  user_id=randint(1, 10),  description="", post_id=randint(1,22), fan=True)
    seed_thread9 = Thread(title="i'd definitely watch again",  user_id=randint(1, 10),  description="", post_id=randint(1,22), fan=True)
    seed_thread10 = Thread(title="where do i sign up",  user_id=randint(1, 10), description="", post_id=randint(1,22), fan=True)




    all_threads = [seed_thread1, seed_thread2, seed_thread3, seed_thread4, seed_thread5, seed_thread6,
                 seed_thread7, seed_thread8, seed_thread9, seed_thread10,
                ]
    add_threads = [db.session.add(thread) for thread in all_threads]
    db.session.commit()


def undo_threads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM threads"))

    db.session.commit()
