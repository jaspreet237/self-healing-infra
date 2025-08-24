FROM python:3.10-slim

# Install Ansible and dependencies
RUN pip install --no-cache-dir ansible requests docker

# Install community.docker collection
RUN ansible-galaxy collection install community.docker

WORKDIR /app
COPY playbook.yml /app/playbook.yml

ENTRYPOINT ["ansible-playbook", "/app/playbook.yml"]

