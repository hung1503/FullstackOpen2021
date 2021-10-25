require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook') 

const app = express()

app.use(express.static('build'))
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger);
app.use(morgan('tiny'));
app.use(cors())

morgan.token('param', function(req) { return JSON.stringify(req.body) })

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(per => {
      response.json(per)
  })
})

app.get('/info', (request, response) => {
  const currentDate = Date().toLocaleString()
  Phonebook.find({}).then(person => {
    const num = person.length;
    response.send(
      `<div>
        <p>Phonebook has info for ${num} people</p>
        <p>${currentDate}</p>
      </div>`
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const sameName = persons.find(per => per.name === body.name)
  if(!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  } else if(sameName) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const info = new Phonebook({    
    name: body.name,
    number: body.number, 
  })

  info.save().then(savedPer => {
    response.json(savedPer)
  })
})

app.put('api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Phonebook.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPer => {
      response.json(updatedPer)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})