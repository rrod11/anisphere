from .db import db, environment, SCHEMA, add_prefix_for_prod
from .postCategory import postcategories


class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    posts = db.relationship("Post", secondary=postcategories, back_populates="categories")
    # posts = db.relationship("Post", secondary=add_prefix_for_prod("postcategories"), back_populates="categories")





    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            "posts": [post.to_dict() for post in self.posts],
        }
