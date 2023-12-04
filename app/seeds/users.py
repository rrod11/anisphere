from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    asta= User(
        username='Asta', email='asta@aa.io', first_name="Asta", last_name="Staria", admin_key="roderick0318",password='astapassword')
    yuno = User(
        username='Yuno', email='yuno@aa.io', first_name="Yuno", last_name="Grinberryall", admin_key="roderick0318", password='yunopassword')
    yami = User(
        username='Yami', email='yami@aa.io',first_name="Yami", last_name="Sukehiro", admin_key="roderick0318",password='yamipassword')
    demo = User(
        username='DemoUser', email='demo@aa.io',first_name="Demodio", last_name="Demonination", password='password')

    db.session.add(asta)
    db.session.add(yuno)
    db.session.add(yami)
    db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
