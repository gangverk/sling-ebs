FROM node:8.6.0
RUN npm install --global yarn
COPY . /usr/sling
WORKDIR /usr/sling
RUN yarn install --pure-lockfile
EXPOSE 9000
RUN yarn build
CMD ["yarn","server"]
