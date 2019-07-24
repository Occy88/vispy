import django_heroku

"""
Django settings for ai_secure project.
Generated by 'django-admin startproject' using Django 2.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MASTER_BASE_DIR = os.path.dirname(__file__)
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v8ojti^$1m0ys%*q#qv*b9(+6)am3)^t1n601$rhk!6m2#&rmi'
API_KEY_SECRET = 'ti^$0ys%1m0ys%n601$rhk!*q#q1$rhk!6m2#&m0ys%'
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# for later when we get to deployment
# DEBUG = False
# TEMPLATE_DEBUG = DEBUG
# if ENV_ROLE == 'development':
#     DEBUG = True
#     TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['ai_secure.herokuapp.com', '*']
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = False  # Application definition
ADMINS = (('octavio', 'octavio.delser@gmail.com'),)
INSTALLED_APPS = [
    'accounts.apps.AccountsConfig',
    'visualizer.apps.RegisterTruckDeliveryConfig',
    'knn_backend.apps.StockManagerConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'guardian'
]

MIDDLEWARE = [
    'ai_secure.middleware.LoginRequiredMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ai_secure.urls'
AUTHENTICATION_BACKENDS = ('django.contrib.auth.backends.ModelBackend', 'guardian.backends.ObjectPermissionBackend')
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'), ''],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
DATABASES = {

    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'ai_secure',
        'USER': 'ai_secure_user',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'POST': '',
    }

}

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
LANGUAGES = [('fr', 'French'), ('it', 'Italiano'), ('es', 'Espanol'), ('en-us', 'english')]
TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

# TOO LOOK AT LATER IF REQUIRED
#
STAFF_URLS = {
    r'^accounts/manager/[\s\S]*',
}
LOGIN_URL = '/accounts/login/'
LOGIN_REDIRECT_URL = '/ai_secure/'
LOGIN_EXEMPT_URLS = {
}

REST_FRAMEWORK = {
    # 'DEFAULT_RENDERER_CLASSES': (
    #     'rest_framework.renderers.JSONRenderer',
    # ),
    # 'DEFAULT_PARSER_CLASSES': (
    #     'rest_framework.parsers.JSONParser',
    # ),
    # 'DEFAULT_AUTHENTICATION_CLASSES': (
    #     'rest_framework.authentication.BasicAuthentication',
    #     'rest_framework.authentication.SessionAuthentication',
    # )
}

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'ai_secure@gmail.com'
EMAIL_HOST_PASSWORD = 'ai_secure@2019'
EMAIL_USE_TLS = True
SERVER_EMAIL = EMAIL_HOST_USER

#STATIC_URL = 'ai_secure.herokuapp.com/'
STATIC_URL = 'http://127.0.0.1:8080/'
STATICFILES_DIRS = ['dist']

# for deployment: unhash the bellow,
# unhash the above
# and all is good.
#django_heroku.settings(locals())
