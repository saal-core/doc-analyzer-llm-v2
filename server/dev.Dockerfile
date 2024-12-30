FROM node:20-alpine

RUN mkdir /app
WORKDIR /app

COPY ["package.json", "./"]

EXPOSE  80

RUN yarn
COPY prisma ./prisma
# COPY ["prisma-setup.sh", "./"]
# RUN sh prisma-setup.sh

CMD ["yarn", "run", "dev"]