FROM node:18-alpine

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
COPY --chown=node:node . .

USER node

RUN yarn install --frozen-lockfile

ARG API_URL_ARG
ENV NEXT_PUBLIC_API_URL=${API_URL_ARG}

RUN echo "NEXT_PUBLIC_API_URL:"
RUN echo ${NEXT_PUBLIC_API_URL}

RUN yarn build

EXPOSE 3000
CMD yarn start 