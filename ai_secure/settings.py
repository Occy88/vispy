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
SECRET_KEY = '<A Random Collection of Characters Here>'
# SECURITY WARNING: don't run with debug turned on in production!
# ENV_ROLE = 'production'
ENV_ROLE = 'development'
if ENV_ROLE == 'production':
    print("PRODUCTION")
    BASE_URL = 'http://localhost:8080/staticfiles/'
    DEBUG = False
    HEROKU = True
else:
    print("DEVELOPMENT")
    # BASE_URL = 'http://localhost:8080/staticfiles/'
    BASE_URL = 'http://localhost:8080/'
    DEBUG = True
    HEROKU = False
TEMPLATE_DEBUG = DEBUG
if HEROKU:
    BASE_URL = "https://ai_secure.herokuapp.com/"

    print("SETTING SSL SECURE REDIRECT")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
else:

    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    SECURE_SSL_REDIRECT = False
ALLOWED_HOSTS = ['*']
# Application definition
ADMINS = (('octavio', 'octavio.delser@gmail.com'),)
INSTALLED_APPS = [
    'accounts.apps.AccountsConfig',
    'company_manager.apps.CompanyManagerConfig',
    'code_env_manager.apps.CodeEnvManager',
    'frontend.apps.VisualizerConfig',
    'knn_backend.apps.StockManagerConfig',
    'general_backend.apps.GeneralBackendConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'rest_framework',
    'guardian',
    'webpack_loader',

]
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

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
LANGUAGES = [{'code': 'en-us', 'name': 'english'},
             {'code': 'fr', 'name': 'French'},
             {'code': 'it', 'name': 'Italiano'},
             {'code': 'es', 'name': 'Espanol'}]

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
LOGIN_REDIRECT_URL = '/home/dashboard'
LOGIN_EXEMPT_URLS = {
    '/',
    '',
    'sw.js',
    'manifest.webmanifest',
    'icons/*'
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
# CONSTANTS FOR DIFFERENT APPS
COMPANY_OBJECT_PERMISSION = "company_manager.company_employee"
COMPANY_IN_APP_PERMISSION = "company_employee"
# models
COMPANY_MODEL = "company_manager.Company"
COMPANY_INSTANCE = "company_manager.models.Company"

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'some_email@gmail.com'
EMAIL_HOST_PASSWORD = 'some password'
EMAIL_USE_TLS = True
SERVER_EMAIL = EMAIL_HOST_USER

# STATICFILES_DIRS = ['dist']
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = ['dist']
STATIC_URL = BASE_URL

# PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if HEROKU:
    print("HEROKU  ")
    django_heroku.settings(locals(), logging=True)
