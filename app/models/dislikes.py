from .db import db, environment, SCHEMA, add_prefix_for_prod

class Dislike(db.Model):
  __tablename__ = "dislikes"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  post_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'))
  dislikes = db.Column(db.Boolean(2000), nullable=False)

  post = db.relationship("Post", back_populates="dislikes")

  def to_dict(self):
    return {
      "id": self.id,
      "dislikes": self.dislikes,
      "post_id": self.post_id
    }
