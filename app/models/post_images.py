from .db import db, environment, SCHEMA, add_prefix_for_prod

class PostImage(db.Model):
  __tablename__ = "post_images"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  post_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'))
  url = db.Column(db.String(2000), nullable=False)

  post = db.relationship(
    "Post",
    back_populates="images"
  )

  def to_dict(self):
    return {
      "id": self.id,
      "url": self.url,
      "post_id": self.post_id
    }
