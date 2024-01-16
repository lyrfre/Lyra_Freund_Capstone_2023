#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':

    fake = Faker()
    with app.app_context():
        # User.query.delete()
        db.create_all()
        print("Starting seed...")
        # Seed code goes here!'
        users = []
        for n in range (20):
            user = User(username = fake.name(), password_hash = "123", email = fake.email())
            users.append(user)
        db.session.add_all(users)
        db.session.commit()


