FROM python:3.8

MAINTAINER tanvir002700@gmail.com

RUN apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
     build-essential \
     python3-dev \
     libevent-dev \
     python-dev \
     libffi-dev \
     binutils \
     libproj-dev \
     gdal-bin

RUN mkdir /app
WORKDIR /app
COPY ./api /app/api
COPY ./.env .env
RUN pip install -r api/requirements.txt

EXPOSE 8000
CMD python api/manage.py runserver 0.0.0.0:8000
