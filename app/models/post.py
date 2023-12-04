from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(2500), nullable=False)
    userId = db.Column(db.String(40), nullable=False, unique=True)
    categoriesId = db.Column(db.String(255), nullable=False)




    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'userId': self.userId,
            'categoriesId': self.categoriesId,
        }
