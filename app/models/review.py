from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(2000), nullable=False)
    post_id = db.Column(db.INTEGER,db.ForeignKey(add_prefix_for_prod("posts.id"), ondelete='CASCADE') ,nullable=False)
    user_id = db.Column(db.INTEGER,db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE') , nullable=False)
    rating = db.Column(db.INTEGER, nullable=False)


    user = db.relationship("User", back_populates="reviews")

    posts = db.relationship("Post", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'review': self.review,
            'postId': self.post_id,
            'userId': self.user_id,
            'rating': self.rating,
        }
