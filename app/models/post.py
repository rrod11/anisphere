from .db import db, environment, SCHEMA, add_prefix_for_prod
from .postCategory import postcategories
# from .postCategory import PostCategory

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2500), nullable=False)
    image = db.Column(db.String(250), nullable=False)
    # user_id = db.Column(db.INTEGER)
    # user_id = db.Column(db.INTEGER, db.ForeignKey("users.id"))
    user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='SET NULL') , nullable=False)
    categories_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("categories.id")),nullable=False)


    reviews = db.relationship("Review", back_populates="posts", cascade="all, delete-orphan")

    # user = db.relationship("User", back_populates="posts")

    categories = db.relationship("Category", secondary=postcategories, back_populates="posts")
    # categories = db.relationship("Category", secondary=add_prefix_for_prod("postCategories"), back_populates="posts")



    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            "image": self.image,
            'userId': self.user_id,
            # 'categoriesId': self.categories_id,
            "reviews": [review.to_dict() for review in self.reviews],
            # "user": self.user.to_dict(),
        }
