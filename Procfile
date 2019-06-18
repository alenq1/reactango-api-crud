release: python manage.py makemigrations && python manage migrate
web: gunicorn fastcrud.wsgi --log-file -
