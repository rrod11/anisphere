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

    posts = db.relationship("Post", back_populates="user")

    reviews = db.relationship("Review", back_populates="user", cascade="all, delete-orphan")

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
            'email': self.email
        }
