### Resources

-   [Docker Installation Guide](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

### Installation

```bash
# Remove the existing Docker installation
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
# Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Check the installation
sudo docker run hello-world
```

```bash
# Clone the repository
git clone https://github.com/gargmegham/ShieldPeer.git

# Change the directory
cd ShieldPeer/bot

# Create a virtual environment
sudo vi .env

# Make the rebuild script executable
sudo chmod +x rebuild.sh

# Build the Docker image and run the container
sudo ./rebuild.sh

# Check the logs
sudo docker logs shield-peer-bot

# Access the container
sudo docker exec -it shield-peer-bot /bin/bash

# Restart the container
sudo docker restart shield-peer-bot
```
