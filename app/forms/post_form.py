from flask_wtf import FlaskForm
from flask_wtf.file import  FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, SelectField
from wtforms.validators import DataRequired, Length, URL
from app.api.routes.aws_helpers import ALLOWED_EXTENSIONS
from ..api.routes.AWS_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    description = StringField("Description", validators=[DataRequired()])
    # image = StringField("Image URL", validators=[DataRequired(), URL()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    categories = SelectField("Categories", choices=[])
    submit = SubmitField("Create Post")
