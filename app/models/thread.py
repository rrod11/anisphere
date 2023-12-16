from .db import db, environment, SCHEMA, add_prefix_for_prod



class Thread(db.Model):
    __tablename__ = 'threads'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2500))
    user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='SET NULL') )


    replies = db.relationship("Reply", back_populates="thread")

    threadlikes = db.relationship("ThreadLike", back_populates="thread")



    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'userId': self.user_id,
            'threadlikes': [threadlike.to_dict() for threadlike in self.threadlikes],
            'dislikes': [dislike.to_dict() for dislike in self.dislikes],
            "replies": [reply.to_dict() for reply in self.replies],

        }
