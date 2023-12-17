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
    noelle= User(
        username='Noelle', email='noelle@aa.io', first_name="Noelle", last_name="Silva", admin_key="roderick0318",password='noellepassword')
    mimosa = User(
        username='Mimoda', email='mimosa@aa.io', first_name="Mimosa", last_name="Vermillion", admin_key="roderick0318", password='mimosapassword')
    mereoleona = User(
        username='Mereaoleona', email='mereoleona@aa.io',first_name="Mereoleona", last_name="Vermillion", admin_key="roderick0318",password='mereoleonapassword')
    jack = User(
        username='JackTheRipper', email='jack@aa.io',first_name="Jack", last_name="The Ripper", password='jackpassword')
    charmy= User(
        username='Charmy', email='charmy@aa.io', first_name="Charmy", last_name="Pappitson", admin_key="roderick0318",password='charmypassword')
    luck = User(
        username='Luck', email='luck@aa.io', first_name="Luck", last_name="Voltia", admin_key="roderick0318", password='luckpassword')
    nico = User(
        username='Nico', email='nico@aa.io', first_name="Nico", last_name="Robin", admin_key="roderick0318", password='nicopassword')
    nami = User(
        username='Nami', email='nami@aa.io', first_name="Nami", last_name="Okamura", admin_key="roderick0318", password='namipassword')
    brook = User(
        username='Brook', email='brook@aa.io', first_name="Humming", last_name="Brook", admin_key="roderick0318", password='brookpassword')
    sanji = User(
        username='Sanji', email='sanji@aa.io', first_name="Sanji", last_name="Germa", admin_key="roderick0318", password='sanjipassword')
    zoro = User(
        username='Zoro', email='zoro@aa.io', first_name="Roronoa", last_name="Zoro", admin_key="roderick0318", password='zoropassword')
    luffy = User(
        username='Luffy', email='luffy@aa.io', first_name="Monkey D", last_name="Luffy", admin_key="roderick0318", password='luffypassword')


    all_users = [asta, yuno, yami, demo, noelle, mimosa, mereoleona, jack, charmy, luck, nico, nami, brook, sanji, zoro, luffy]
    add_users = [db.session.add(user) for user in all_users]
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
