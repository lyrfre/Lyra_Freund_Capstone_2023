#!/usr/bin/env python3


# Standard library imports
from models import User, Translation, Input_word, Output_word, Favorite
from flask import request, render_template, session
from flask_restful import Resource
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# db = SQLAlchemy(app)


# Local imports
from config import app, db, api
# Add your model imports
import requests
import json

global apikey,host


apikey = "dece7a6889mshffb715215b5fbcbp177abbjsne5ad58168072"
host = "google-translate1.p.rapidapi.com"


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        print(username)
        password = data['password']
        user = User.query.filter(User.username == username).first()
        print(user.id)
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {
            'error': 'Unauthorized'
            }, 401
    
api.add_resource(Login, '/login')
    
# check session 
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {
                'message': '401: Not Authorized'
                }, 401

api.add_resource(CheckSession, '/check_session')

# logout
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message':'204: No Content'}
    
api.add_resource(Logout, '/logout')

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


def language_list():

    url = "https://google-translate1.p.rapidapi.com/language/translate/v2/languages"

    headers = {
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "dece7a6889mshffb715215b5fbcbp177abbjsne5ad58168072",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    lang_list = response.json()
    print(lang_list)
    return lang_list, 200

def detect_language(text):

    try:
        url = "https://google-translate1.p.rapidapi.com/language/translate/v2/detect"
        text = text.replace(' ','%20')
        payload = f'q={text}'
        headers = {
            "content-type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/gzip",
            "X-RapidAPI-Key": "dece7a6889mshffb715215b5fbcbp177abbjsne5ad58168072",
            "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
        }

        response = requests.post(url, data=payload, headers=headers)

        detect_lang = response.json()
        print(detect_lang)
        return detect_lang
    except ValueError as e:
            print(e.__str__())
            return{
                "error": "validation errors"
            }, 400

def translate_text(text, l2, l1 = "en"):

    try:
        url = "https://google-translate1.p.rapidapi.com/language/translate/v2"
        payload = f"q={text}&target={l2}&source={l1}"
        headers = {
            "content-type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "application/gzip",
            "X-RapidAPI-Key": "dece7a6889mshffb715215b5fbcbp177abbjsne5ad58168072",
            "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
        }
        response = requests.post(url, data=payload, headers=headers)
        translated_text = response.json()
        print(translated_text)
        # {'data': {'translations': [{'translatedText': 'Hola'}]}}
        return translated_text["data"]["translations"][0], 200
    except ValueError as e:
            print(e.__str__())
            return{
                "error": "validation errors"
            }, 400 
    
    
class API(Resource):
    def get(self):
        return language_list()
    
    # def post(self):
    #     data = request.get_json()
    #     text = data["text"]
    #     return detect_language(text)
    
    def post(self):
        data = request.get_json()
        text = data["text"]
        new_word = Input_word(
            input_language = 'en',
            input_word = text
        )
        db.session.add(new_word)
        db.session.commit()
        l1 = data["l1"]
        l2 = data["l2"]
        new_translation = translate_text(text, l2, l1)
        print(new_translation[0]["translatedText"])
        new_output_word = Output_word( output_language = l2, output_word = new_translation[0]["translatedText"])
        db.session.add(new_output_word)
        db.session.commit()
        try:
            if session["user_id"]:
                translation_instance = Translation(user_id = session["user_id"], input_word = new_word, output_word = new_output_word )
                db.session.add(translation_instance)
                db.session.commit()
        except Exception as e:
            print(e.__str__())
        return new_translation
    
api.add_resource(API, "/translate")


class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200
    
    # Create new user/sign up
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                username = data["username"],
                _password_hash = data["password"],
                email = data["email"]
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except Exception as e:
            print(e.__str__())
            return{
                "errors":["validation errors"]
            }, 400
        
api.add_resource(Users, "/users")

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id = id).first()
        return user.to_dict(), 200
    
    def patch(self, id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return {
                "error": "User not found"
            }, 404
        data = request.get_json()

        try:
            for key in data:
                setattr(user, key, data[key])
            db.session.add(user)
            db.session.commit()
        except ValueError as e:
            print(e.__str__())
            return{
                "error": "validation errors"
            }, 400
        
        return user.to_dict(), 200
    
    def delete(self, id):
        user = User.query.filter_by(id = id).first()
        if not user:
            return {
                "error": "User not found"
            }, 404
        db.session.delete(user)
        db.session.commit()
        return "", 204
    
api.add_resource(UserById, "/users/<int:id>")

class Favorites(Resource):
    def get(self):
        favorites = [ user.to_dict() for user in Favorite.query.filter_by(user_id = session["user_id"]).all()]
        return favorites, 200
    
    def post(self):
        data = request.get_json()
        try:
            new_favorite = Favorite(
                user_id = data["user_id"],
                input_word = data["input_word"],
                output_word = data["output_word"]
            )
            db.session.add(new_favorite)
            db.session.commit()
            return new_favorite.to_dict(), 201
        except Exception as e:
            print(e.__str__())
            return{
                "errors":["validation errors"]
            }, 400
        
    

api.add_resource(Favorites, "/favorites")

# class Translations(Resource):
#     def get(self, user_id):
#         translations = [translation.to_dict() for translation in Translation.query.filter_by(user_id = user_id).all()]
#         return translations
    
#     def post(self):
#         data = request.json()
#         try:


# api.add_resource(, "/favorites")


# call api functions inside Translations, Outputs & Inputs to post to those tables similar to API class.





# api.add_resource(Translations, "/user-translations")
# Views go here! use either route!
# @app.errorhandler(404)
# def not_found(e):
#     return render_template("index.html")

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

