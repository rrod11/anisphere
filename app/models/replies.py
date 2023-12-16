from .db import db, environment, SCHEMA, add_prefix_for_prod


class Reply(db.Model):
    __tablename__ = 'replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reply = db.Column(db.String(2000), nullable=False)
    thread_id = db.Column(db.INTEGER,db.ForeignKey(add_prefix_for_prod("threads.id"), ondelete='CASCADE') ,nullable=False)
    user_id = db.Column(db.INTEGER,db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='CASCADE') , nullable=False)



    thread = db.relationship("Thread", back_populates="replies")

    def to_dict(self):
        return {
            'id': self.id,
            'reply': self.reply,
            'threadId': self.thread_id,
            'userId': self.user_id,


        }
