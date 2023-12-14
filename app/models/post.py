from .db import db, environment, SCHEMA, add_prefix_for_prod



class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, unique=True)
    description = db.Column(db.String(2500), nullable=False)
    image = db.Column(db.String(2000))
    user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='SET NULL') )
    categories_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("categories.id"), ondelete='SET NULL'))


    reviews = db.relationship("Review", back_populates="posts", cascade="all, delete-orphan")

    images = db.relationship("PostImage", back_populates="post")

    likes = db.relationship("Like", back_populates="post")

    dislikes = db.relationship("Dislike", back_populates="post")

    categories = db.relationship("Category", secondary=add_prefix_for_prod("postcategories"), back_populates="posts")



    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            "image": self.image,
            'userId': self.user_id,
            'likes': [like.to_dict() for like in self.likes],
            'dislikes': [dislike.to_dict() for dislike in self.dislikes],
            "images": [image.to_dict() for image in self.images],
            "reviews": [review.to_dict() for review in self.reviews],
            "categories": [category.to_dict() for category in self.categories]
        }
