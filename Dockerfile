# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

ARG NG_APP_API_URL
ARG MY_ENV

ENV NG_APP_API_URL=${NG_APP_API_URL}
ENV MY_ENV=${MY_ENV}

RUN node config.js

RUN npm run build

# Fix ngx-env.js path in index.html file for nginx serving
RUN sed -i 's|/ngx-env.js|ngx-env.js|g' dist/*/browser/index.html  

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx --from=build /app/dist/*/browser /usr/share/nginx/html

USER nginx

EXPOSE 8000

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]