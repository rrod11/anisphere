from flask_wtf import FlaskForm
from flask_wtf.file import  FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, URL
# from app.api.aws_helpers import ALLOWED_EXTENSIONS
# from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    post_id = IntegerField("PostId", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    submit = SubmitField("Submit Review")
