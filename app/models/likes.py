from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
  __tablename__ = "likes"

  # __table_args__ = (db.UniqueConstraint("post_id", "user_id", name="post_user_d"))
  __table_args__ = (db.UniqueConstraint("post_id", "user_id"),)

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  post_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'))
  user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'))
  likes = db.Column(db.Boolean(), nullable=False)

  post = db.relationship("Post", back_populates="likes")

  user = db.relationship("User", back_populates="likes")

  # UniqueConstraint("post_id", "user_id", name="pul")

  def to_dict(self):
    return {
      "id": self.id,
      "likes": self.likes,
      "post_id": self.post_id,
      "user_id": self.user_id,
    }
