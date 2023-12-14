# from .db import db, environment, SCHEMA, add_prefix_for_prod


# # postcategories = db.Table("postcategories",
# #     db.Column("post_id",db.INTEGER, db.ForeignKey(add_prefix_for_prod("posts.id"))),
# #     db.Column("category_id",db.INTEGER, db.ForeignKey(add_prefix_for_prod("categories.id")))
# # )
# class postcategories(db.Model):
#     __tablename__ = 'postcategories'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

# #     "postcategories",
# #     db.Model.metadata,
# # )
#     id = db.Column(db.Integer, primary_key=True)
#     post_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("posts.id")))
#     category_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("categories.id")))

# # if environment == "production":
# #     postcategories.schema = SCHEMA
# #   categories = db.relationship("Post", back_populates="categories")

# #   categories = db.relationship("Category", back_populates="likes")


#     def to_dict(self):
#         return {
#             'id': self.id,
#             'postId': self.post_id,
#             'categoryId': self.category_id,
#         }
