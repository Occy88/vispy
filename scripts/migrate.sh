#!/usr/bin/env bash

python3 manage.py makemigrations general_backend
python3 manage.py migrate general_backend
python3 manage.py makemigrations accounts
python3 manage.py migrate accounts
python3 manage.py makemigrations knn_backend;
python3 manage.py migrate knn_backend;
python3 manage.py makemigrations company_manager;
python3 manage.py migrate company_manager;
python3 manage.py makemigrations frontend;
python3 manage.py migrate frontend;
python3 manage.py makemigrations;
python3 manage.py migrate;
