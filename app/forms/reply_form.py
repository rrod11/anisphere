from flask_wtf import FlaskForm
from flask_wtf.file import  FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, URL



class ReplyForm(FlaskForm):
    reply = StringField("reply", validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    thread_id = IntegerField("ThreadId", validators=[DataRequired()])
    submit = SubmitField("Submit Review")
