# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Install Supervisor and other necessary packages
RUN apt-get -y update && \
    apt-get -y upgrade && \
    apt-get -y install supervisor

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Run Supervisor to manage your script
CMD ["/usr/bin/supervisord"]
