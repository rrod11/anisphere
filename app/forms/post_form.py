from flask_wtf import FlaskForm
from flask_wtf.file import  FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, URL
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    description = StringField("description", validators=[DataRequired()])
    # image = StringField("Image URL", validators=[DataRequired(), URL()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    categories = SelectField("Categories", choices=[])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired()])
    submit = SubmitField("Create Post")
