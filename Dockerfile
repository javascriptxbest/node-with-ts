FROM node:lts-stretch-slim

ENV NODE_ENV=production
ENV PORT=7654
ENV LOG="/dev/stdout"
ENV NODE_OPTIONS="--max_old_space_size=4096"

WORKDIR /app

COPY . /app

# install dependencies
RUN npm install
RUN npm run build

EXPOSE 7654
ENTRYPOINT ["node", "dist/web.js"]
