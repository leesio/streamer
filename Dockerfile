FROM mhart/alpine-node:8

WORKDIR /app
COPY . .

RUN yarn

ENV PORT=80

EXPOSE 80
CMD ["yarn", "start"]
