from .db import db, environment, SCHEMA, add_prefix_for_prod


class PostCategory(db.Model):
    __tablename__ = 'postCategories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("posts.id")))
    category_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("categories.id")))




    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.post_id,
            'categoryId': self.category_id,
        }
