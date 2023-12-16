from .db import db, environment, SCHEMA, add_prefix_for_prod

class ThreadLike(db.Model):
  __tablename__ = "threadlikes"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.INTEGER, primary_key=True)
  thread_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('threads.id'), ondelete='CASCADE'))
  user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'))
  likes = db.Column(db.Boolean(), nullable=False)

  thread = db.relationship("Thread", back_populates="threadlikes")




  def to_dict(self):
    return {
      "id": self.id,
      "thread_id": self.thread_id,
      "user_id": self.user_id,
    }
