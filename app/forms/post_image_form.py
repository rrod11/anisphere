from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class PostImageForm(FlaskForm):
  image = FileField('image', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])
