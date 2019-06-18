release: python manage.py makemigrations && python manage.py migrate
web: gunicorn fastcrud.wsgi --log-file -
