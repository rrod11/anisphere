from flask_wtf import FlaskForm
from flask_wtf.file import  FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, SelectField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired, Length, URL
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    description = StringField("description", validators=[DataRequired()])
    # image = StringField("Image URL", validators=[DataRequired(), URL()])
    image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired()])
    submit = SubmitField("Create Post")
