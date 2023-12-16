from .db import db, environment, SCHEMA, add_prefix_for_prod



class Thread(db.Model):
    __tablename__ = 'threads'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2500))
    user_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='SET NULL') )
    post_id = db.Column(db.INTEGER, db.ForeignKey(add_prefix_for_prod("posts.id"), ondelete='SET NULL') )
    fan = db.Column(db.Boolean(), nullable=False, default=False)
    hater = db.Column(db.Boolean(), nullable=False, default=False)
    debate = db.Column(db.Boolean(), nullable=False, default=False)

    replies = db.relationship("Reply", back_populates="thread")

    threadlikes = db.relationship("ThreadLike", back_populates="thread")



    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'userId': self.user_id,
            'threadlikes': [threadlike.to_dict() for threadlike in self.threadlikes],
            "replies": [reply.to_dict() for reply in self.replies],
            "fan": self.fan,
            "hater": self.hater,
            "debate": self.debate,

        }
