# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


# class User(db.Model, UserMixin):
#     __tablename__ = 'users'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(40), nullable=False, unique=True)
#     email = db.Column(db.String(255), nullable=False, unique=True)
#     hashed_password = db.Column(db.String(255), nullable=False)

#     # posts = db.relationship("Post", back_populates="user")

#     # reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")

#     @property
#     def password(self):
#         return self.hashed_password

#     @password.setter
#     def password(self, password):
#         self.hashed_password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'username': self.username,
#             'email': self.email,
#         }



from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'



    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    admin_key = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    # created_at = db.Column(db.Date, nullable=False, default=date.today())
    # updated_at = db.Column(db.Date, nullable=False, default=date.today())

    # posts = db.relationship("Post", back_populates="user")
    posts = db.relationship("Post")

    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")

    likes = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")

    dislikes = db.relationship("Dislike", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.first_name,
            'lastname': self.last_name,
            'username': self.username,
            'adminKey': self.admin_key,
            'email': self.email,
            "posts": [post.to_dict() for post in self.posts],
            "reviews": [review.to_dict() for review in self.reviews],
            "likes": [like.to_dict() for like in self.likes],
            "dislikes": [dislike.to_dict() for dislike in self.dislike],
        }
