from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
  __tablename__ = "likes"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  post_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'))
  likes = db.Column(db.Boolean(2000), nullable=False)

  post = db.relationship("Post", back_populates="likes")

  def to_dict(self):
    return {
      "id": self.id,
      "likes": self.likes,
      "post_id": self.post_id
    }
