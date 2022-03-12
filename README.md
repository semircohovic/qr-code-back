#Redis
pokretanje redis containera
docker run --name my-redis -p 6379:6379 -d redis

odraditi poslije ovoga ipconfig
uzeti ip adresu i staviti u .env REDIS_HOST

radimo prvo docker build . dva puta

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
