from flask_wtf import FlaskForm
from flask_wtf.file import  FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, SelectField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL
# from app.api.aws_helpers import ALLOWED_EXTENSIONS
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class ThreadForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description")
    post_id = IntegerField("PostId", validators=[DataRequired()])
    user_id= IntegerField("userId", validators=[DataRequired()])
    fan = BooleanField("fan")
    hater = BooleanField("hater")
    debate = BooleanField("debate")
    submit = SubmitField("Submit Review")
