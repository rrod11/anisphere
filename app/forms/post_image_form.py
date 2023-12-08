from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from wtforms import SubmitField, StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, URL

class PostImageForm(FlaskForm):
  post_id = IntegerField("postId", validators=[DataRequired()])
  url = FileField('image', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])
