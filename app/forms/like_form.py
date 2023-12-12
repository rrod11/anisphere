from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, SelectField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL

class LikeForm(FlaskForm):
  post_id = IntegerField("postId", validators=[DataRequired()])
  likes = BooleanField('likes', validators=[DataRequired()])
  user_id = IntegerField("userId", validators=[DataRequired()])
