import express, { request } from "express"
import morgan from "morgan"


const app = express()
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

morgan.token('param', function(req) { return JSON.stringify(req.body) })
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
const generateId = () => {
  const randomId = Math.floor(Math.random() * 10000)
  return randomId 
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const currentDate = Date().toLocaleString()
  const numberPeople = persons.length

  response.send('Phone book has info for ' + numberPeople + ' people <br>' + currentDate );
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const info = persons.find(i => i.id === id)
  console.log(id)
  if(info) {
    response.json(info)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const info = persons.find(i => i.id === id)

  response.status(204).end()
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

  const info = {    
    id: generateId(),
    name: body.name,
    number: body.number, 
  }

  persons = persons.concat(info)
  console.log(info)
  response.json(info)
})

const PORT = 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)