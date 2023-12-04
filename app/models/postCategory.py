# from .db import db, environment, SCHEMA, add_prefix_for_prod


# class PostCategory(db.Model):
#     __tablename__ = 'postCategories'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     postId = db.Column(db.Integer())
#     categoryId = db.Column(db.Integer(), nullable=False)




#     def to_dict(self):
#         return {
#             'id': self.id,
#             'postId': self.postId,
#             'categoryId': self.categoryId,
#         }
