# DJango+Angular

## Prima installazione

```bash
mkdir backend && cd backend
source env/bin/activate
pip install django djangorestframework django-cors-headers requests whitenoise djangorestframework-simplejwt
pip freeze > requirements.txt
```

Creazione progetto DJango
```bash
django-admin startproject config .
django-admin startapp accounts
./manage.py makemigrations
./manage.py migrate

./manage.py createsuperuser --username admin --email admin@example.com

./manage.py runserver
```

## Utilizzo

```bash
cd backend
source env/bin/activate
pip -r requirements.txt
```
Se è il primo utilizzo, occorre importare le dipendenze
```bash
pip -r requirements.txt
```