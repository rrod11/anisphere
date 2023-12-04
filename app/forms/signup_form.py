from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def email_is_email(form, field):
    # Checking if user exists
    def findValue(item):
        if "@" in item:
            return True
        else:
            return False
    email = field.data
    user = findValue(email)

    if not user:
        raise ValidationError('Please use a valid email')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists,  email_is_email])
    adminKey = StringField('admin Key')
    password = StringField('password', validators=[DataRequired()])
