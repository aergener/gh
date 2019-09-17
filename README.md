# Run Locally
```
docker-compose up --build
```

# Swagger
Once the server is running locally, navigate to http://localhost:3000/api/ for Swagger documentation 

# Assumptions
- `Role.maxAmount`
  - From the instructions, "maxAmount is the maximum amount of money a user with that role is allowed to send."
  - This is ambiguous; it could mean the max a user can send for all time, for each period (month), or for a single transaction.
  - For the purposes of the exercise, I will assume that `maxAmount` is the maximum a user can spend for _all time_
- Negative transactions
  - For the purposes of this exercise, I will assume that negative transactions are _reversals_ of previous transactions
  - This means that negative transactions should decrease the total transaction count, and subtract for the users spent amount
  - For simplicity, the code here will not enforce that negative transactions have a matching positive transaction

# Run tests
In the running docker container simply run `npm test`

(After the image is built, `docker-compose run api ash` will get you an interactive docker container)
