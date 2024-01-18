from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from datetime import datetime
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

from config import db


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable = False)
    email = db.Column(db.String)

    translations = db.relationship("Translation", back_populates = "user")
    favorites = db.relationship("Favorite", back_populates = "user")
    serialize_rules = ('-translations.user',)

    @validates("username")
    def validate_name(self, key, username):
        if not username:
            raise ValueError("Must input username")
        return username
    
    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Must provide email")
        return email
    
    def __repr__(self):
        return f'<User {self.id}: {self.username}>'
    


    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
class Input_word(db.Model, SerializerMixin):
    __tablename__ = "input_words"

    id = db.Column(db.Integer, primary_key = True)
    input_language = db.Column(db.String)
    input_word = db.Column(db.String)
    translations = db.relationship("Translation", back_populates = "input_word")
    # favorites = db.relationship("Favorite", back_populates = "input_word")
    def __repr__(self):
        return f'<Input_word {self.id}: {self.input_word}>'

class Output_word(db.Model, SerializerMixin):
    __tablename__ = "output_words"

    id = db.Column(db.Integer, primary_key = True)
    output_language = db.Column(db.String)
    output_word = db.Column(db.String)
    translations = db.relationship("Translation", back_populates = "output_word")
    # favorites = db.relationship("Favorite", back_populates = "output_word")
#     serialize_rules = ('-translations.input_word',)

#     serialize_rules = ('-translations.output_word',)
    def __repr__(self):
        return f'<Output_word {self.id}: {self.output_word}>'


class Translation(db.Model, SerializerMixin):
    __tablename__ = "translations"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    input_word_id = db.Column(db.Integer, db.ForeignKey("input_words.id"), nullable = False)
    output_word_id = db.Column(db.Integer, db.ForeignKey("output_words.id"), nullable = False)

    input_word = db.relationship("Input_word", back_populates = "translations")
    output_word = db.relationship("Output_word", back_populates = "translations")
    user = db.relationship("User", back_populates = 'translations')

    serialize_rules= ("-user.translations", "-input_word.translations", "-output_word.translations",)


    def __repr__(self):
        return f'<Translation {self.input_word}: {self.output_word}>'
    
class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable = False)
    input_word = db.Column(db.String, nullable = False)
    output_word = db.Column(db.String, nullable = False)

    # input_word = db.relationship("Input_word", back_populates = "favorites")
    # output_word = db.relationship("Output_word", back_populates = "favorites")
    user = db.relationship("User", back_populates = 'favorites')

    serialize_rules= ("-user.favorites",)

    def __repr__(self):
        return f'<Favorite {self.input_word}: {self.output_word}'

