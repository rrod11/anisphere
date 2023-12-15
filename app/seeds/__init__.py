from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .categories import seed_categories, undo_categories
from .reviews import seed_reviews, undo_reviews
from .likes import seed_likes, undo_likes
from .dislikes import seed_dislikes, undo_dislikes
from .postCategories import seed_postcategories, undo_postcategories

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_reviews()
        undo_postcategories()
        undo_likes()
        undo_dislikes()
        undo_posts()
        undo_users()
        undo_categories()
    seed_categories()
    seed_users()
    seed_posts()
    seed_dislikes()
    seed_likes()
    seed_postcategories()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_postcategories()
    undo_likes()
    undo_dislikes()
    undo_posts()
    undo_users()
    undo_categories()
    # Add other undo functions here
