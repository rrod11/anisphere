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
    naruto = User(
        username='Naruto', email='naruto@aa.io', first_name="Naruto", last_name="Uzumaki", admin_key="roderick0318", password='narutopassword')
    sasuke = User(
        username='Sasuke', email='sasuke@aa.io', first_name="Sasuke", last_name="Uchiha", admin_key="roderick0318", password='sasukepassword')
    sakura = User(
        username='Sakura', email='sakura@aa.io', first_name="Sakura", last_name="Haruno", admin_key="roderick0318", password='sakurapassword')
    kakashi = User(
        username='Kakashi', email='kakashi@aa.io', first_name="Kakashi", last_name="Hatake", admin_key="roderick0318", password='kakashipassword')
    jiraiya = User(
        username='Jiraiya', email='jaraiya@aa.io', first_name="Jaraiya", last_name="Sensei", admin_key="roderick0318", password='jiraiyapassword')
    hinata = User(
        username='Hinata', email='hinata@aa.io', first_name="Hinata", last_name="Hyuga", admin_key="roderick0318", password='hinatapassword')
    rock = User(
        username='Rock', email='rock@aa.io', first_name="Rock", last_name="Lee", admin_key="roderick0318", password='rockpassword')
    gaara = User(
        username='Gaara', email='gaara@aa.io', first_name="Gara", last_name="of the Desert", admin_key="roderick0318", password='gaarapassword')
    obito = User(
        username='Obito', email='obito@aa.io', first_name="Obito", last_name="Uchiha", admin_key="roderick0318", password='obitopassword')
    madara = User(
        username='Madara', email='madara@aa.io', first_name="Madara", last_name="Uchiha", admin_key="roderick0318", password='madarapassword')
    minato = User(
        username='Minato', email='minato@aa.io', first_name="Minato", last_name="Namikaze", admin_key="roderick0318", password='minatopassword')
    shikamaru = User(
        username='Shikamaru', email='shikamaru@aa.io', first_name="Shikamaru", last_name="Nara", admin_key="roderick0318", password='shikamarupassword')
    neji = User(
        username='Neji', email='neji@aa.io', first_name="Neji", last_name="Hyuga", admin_key="roderick0318", password='nejipassword')
    rimuru = User(
        username='rimuru', email='rimuru@aa.io', first_name="Rimuru", last_name="Tempest", admin_key="roderick0318", password='rimurupassword')


    all_users = [asta, yuno, yami, demo, noelle, mimosa, mereoleona, jack, charmy, luck, nico, nami, brook, sanji, zoro, luffy, naruto, sasuke,
                 sakura, kakashi, jiraiya, hinata, rock, gaara, obito, madara, minato, shikamaru, neji, rimuru]
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
