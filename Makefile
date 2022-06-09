all: clone-repos create-default-dirs docker-build docker-up 
	#restore-db

clone-repos:
	git clone -b develop https://github.com/blockdemy/bam-api.git
	git clone -b develop https://github.com/blockdemy/bam-web-app.git

create-default-dirs:
	mkdir ./bam-api/node_modules/
	mkdir ./bam-web-app/node_modules/

docker-build:
	docker-compose build --no-cache

docker-up:
	docker-compose up -d

# This part was used to charge auto database from dump-sql, path sql was mounted inside container db
#restore-db:
#	docker exec -it bam-stack_db_1 psql -U postgres -f ./sql/pg_all_<SQLScriptName>.sql
