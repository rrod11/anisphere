from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, SelectField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL

class CategoryPostForm(FlaskForm):
  post_id = IntegerField("postId", validators=[DataRequired()])
  category_id = IntegerField("categoryId", validators=[DataRequired()])
  submit  = SubmitField("submit")
