FROM mongo:latest

WORKDIR /data/db

VOLUME [ "/data/db" ]

COPY motorola_phones_processed.json /docker-entrypoint-initdb.d/motorola_phones_data.json
COPY init-db.sh /docker-entrypoint-initdb.d/init-db.sh

RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh

EXPOSE 27017:27017

CMD ["/docker-entrypoint-initdb.d/init-db.sh"]
