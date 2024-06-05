# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install Supervisor
RUN apt-get -y update && \
    apt-get -y upgrade

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Ensure Python 3.11 is the default Python version
RUN ln -sf /usr/local/bin/python3.11 /usr/bin/python3 && \
    ln -sf /usr/local/bin/pip3.11 /usr/bin/pip3

# Make supervisord.conf available in the correct directory
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Run Supervisor to manage your script
CMD ["/usr/bin/supervisord"]
