from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, SelectField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL, InputRequired

class CategoryPostForm(FlaskForm):
  post_id = IntegerField("post_id", validators=[InputRequired()])
  category_id = IntegerField("category_id", validators=[InputRequired()])
