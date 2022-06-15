FROM postgres:14-alpine

# Variables needed at runtime to configure postgres and run the initdb scripts
ENV POSTGRES_DB ''
ENV POSTGRES_USER ''
ENV POSTGRES_PASSWORD ''

# Copy in the load-extensions script
COPY postgres-extentions.sh /docker-entrypoint-initdb.d/
