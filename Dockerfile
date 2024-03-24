FROM ruby:3.2.2

# Install Node.js, npm, yarn
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get update && apt-get install -y nodejs && apt-get clean && rm -rf /var/lib/apt/lists/*

# Verify installation
RUN node --version
RUN npm --version

# RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
# RUN apt-get update -qq && apt-get install -y nodejs npm vim
# RUN gem install bundler && gem install rails && npm install -g yarn
# RUN npm install -g @vue/cli

# Install Nginx
RUN apt-get update && apt-get install -y nginx vim && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN npm install -g npm@10.5.0
RUN gem install bundler && gem install rails && npm install -g yarn

RUN mkdir /app
WORKDIR /app
COPY . .
RUN cd /app && bundle install

RUN mkdir -p /var/www/todosapp.com/html

RUN rm -f /etc/nginx/sites-enabled/default
RUN cp /app/docker/nginx.conf /etc/nginx/sites-enabled/todosapp.conf

EXPOSE 80 3000

COPY docker/start-app /usr/local/bin/start-app
RUN chmod +x /usr/local/bin/start-app

ENTRYPOINT [ "start-app" ]