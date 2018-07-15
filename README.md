# Kafka NodeJS Example

## Introduction
![Demonstration](https://raw.githubusercontent.com/anthonyhastings/kafka-nodejs-example/master/images/kafka-nodejs-example.gif)

This repository showcases an example of using Kafka with NodeJS. In this example, we use Kafka as a messaging system for inserting hypothetical sales into a database. Instead of our sales endpoint hitting the database directly, it pushes sale data to Kafka, thus acting as a 'producer'. We spin up a 'consumer' that will take data from Kafka and push it into the database.

## Instructions
This demonstration assumes you already have `docker` and `docker-compose` installed. The steps are as follows:

1) Using `docker-compose`, spin up all containers (Zookeeper, Kafka, Database, Producer and Consumer):
```shell
docker-compose up
```

2) Post a request to the sales endpoint specifying a total amount for the sale:
```shell
curl -X POST \
  http://localhost:8080/sales \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d total=123.45
```

3) Verify that Kafka received the data, and passed it to the consumer, which then added the sale to the database:
```shell
curl -X GET http://localhost:8080/sales
```

Upon first run, this last command should return JSON containing an initial seed record for the database, along with the sale posted in the previous step.
```json
[{"id":1,"uuid":"675867b9-e318-44be-8560-774e59601340","total":"10.66","sale_date":"2018-07-15T22:25:14.930Z","created_at":"2018-07-15T22:25:14.930Z"},{"id":2,"uuid":"7da94758-ea1e-4eed-af85-877bf421e2dd","total":"123.45","sale_date":"2018-07-15T22:25:31.364Z","created_at":"2018-07-15T22:25:31.403Z"}]
```