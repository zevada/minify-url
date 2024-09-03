#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE url (id BIGSERIAL PRIMARY KEY, long_url VARCHAR(2048));
EOSQL