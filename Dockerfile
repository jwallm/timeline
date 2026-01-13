#FROM node:20
FROM node:22

# Install basic development tools
#RUN apt update && apt install -y less man-db sudo
## new stuff ##
WORKDIR /home/jasonm/projects/node_practice

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=9000
EXPOSE 9000

# Ensure default `node` user has access to `sudo`
#ARG USERNAME=node
#RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
#ENV DEVCONTAINER=true

CMD ["npm", "start"]
