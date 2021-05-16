SERVELESS POC

### Stack:

```
NODE
TYPESCRIPT
SERVELESS
EXPRESS
KAFKA
DYNAMODB
```

### Diagram:

![image](https://user-images.githubusercontent.com/7029523/118404289-b7a6e200-b648-11eb-94a0-b45d4b779064.png)

### Steps:

Clone this repository

```git clone https://github.com/celfons/aws-lambda.git```

Install dependencies

```npm```

Run this project

```npm run start```

Ready! Go to [localhost:3000](localhost:3000)

### API'S:

```
curl --location --request GET 'http://localhost:3000/v1/subscriptions'

curl --location --request POST 'http://localhost:3000/v1/subscriptions' \
--header 'Content-Type: application/json' \
--data-raw '{
  "customerId": "0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba",
  "offerId": "0fa109e0-0ff1-4ff2-b28e-2bb1a18b15ba",
  "startDate": "2021-05-02",
  "duration": "DAYS",
  "period": "30"
}'

```

### JOB

```rate(1 minute) - serveless.yml```

# Author

**Marcel Fonseca Resende de Oliveira**
