FROM oven/bun:1
WORKDIR /app

# Must start and end with "/" (e.g. "/bsq/bsml-docs/"). Bakes the prefix into
# the built asset URLs, since the reverse proxy in front of this forwards the
# full request path instead of stripping it.
ARG BASE_PATH=/
ENV BASE_PATH=$BASE_PATH

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 80
CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0", "--port", "80"]
