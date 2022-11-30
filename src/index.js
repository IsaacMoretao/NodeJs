const express = requere("express");
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((custumer) => custumer.cpf === cpf);

  if(!customer) {
    return response.ststus(400).json({ error: "Customer not found" });
  }

  request.customer = customer;

  return next()
}

function getBalance(statement) {
  
}


app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Costumer already exists!" });
  }


  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
});

// app.use(verifyIfExistsAccountCPF);

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
   
})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = {
    description,
    amount,
    created_at: new Date(),
    type: "credito"
  }
  
  customer.statement.push(statementOperation);
  
})


app.listen(4000);