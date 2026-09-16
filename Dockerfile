# ---- Build ----
FROM oven/bun:1 AS build
WORKDIR /app

# Must start and end with "/" (e.g. "/bsq/bsml-docs/"). Bakes the prefix into
# the built asset URLs and the nginx location block below, for reverse
# proxies that forward the full request path instead of stripping it.
ARG BASE_PATH=/
ENV BASE_PATH=$BASE_PATH

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build
RUN sed "s#__BASE_PATH__#${BASE_PATH}#g" nginx.conf.template > /app/nginx.conf

# ---- Serve ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
