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
COPY . /app
RUN pip install -r requirements.txt
RUN pip install gunicorn
RUN touch .env

EXPOSE 8000
CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "config.wsgi"]
