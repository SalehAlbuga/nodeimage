FROM library/node:10.14

ENV IMAGE_VAR "from Docker"

# ssh
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "$SSH_PASSWD" | chpasswd 

COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin

RUN mkdir /code
WORKDIR /code

ADD . .

RUN npm install

EXPOSE 8000 2222

CMD cron && \
    /bin/init.sh && \
    node server.js 