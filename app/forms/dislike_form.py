from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, SelectField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL

class DislikeForm(FlaskForm):
  post_id = IntegerField("postId", validators=[DataRequired()])
  dislikes = BooleanField('likes', validators=[DataRequired()])
  user_id = IntegerField("userId", validators=[DataRequired()])
