FROM tiangolo/uvicorn-gunicorn:python3.10

ENV PYTHONUNBUFFERED True

RUN apt update && apt install -y make && apt install libpq-dev


WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip3 install -r requirements.txt

COPY . /app/

# Make port 80 available to the world outside this container
EXPOSE 8000

ENV PORT 8000
# Set the Python path to the current directory
ENV PYTHONPATH /app

CMD exec uvicorn main:app  --reload --host 0.0.0.0 --port $PORT 
