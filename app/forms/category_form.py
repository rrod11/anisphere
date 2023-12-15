from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, SelectField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Length, URL

class CategoryForm(FlaskForm):
  name = StringField("name", validators=[DataRequired()])
