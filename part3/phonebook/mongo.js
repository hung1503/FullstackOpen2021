import mongoose from "mongoose";


const password = process.argv[2]
const phoneName = process.argv[3]
const phoneNumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.9jclw.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String, 
    minLength: 2, 
    required: true
  },
  number: {
    type: String, 
    minLength:10, 
    required: true
  },
  date: Date,
})

const Phonebook = mongoose.model('phonebook', phoneBookSchema)

const people = new Phonebook({
  name: phoneName, 
  number: phoneNumber,
})

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 3) {
  console.log("Phonebook: ")
  Phonebook.find({}).then(result => {
    result.forEach(note => {
      console.log(note.name + " " + note.number)
    })
    mongoose.connection.close()
  })
} else if(process.argv.length > 3) {
  people.save().then(result => {
    console.log('added ' + phoneName + ' number ' + phoneNumber + ' to phonebook')
    mongoose.connection.close()
  })
}

// Phonebook.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })