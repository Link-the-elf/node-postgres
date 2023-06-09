const {Router} = require('express')
const router = Router()

const { 
  getPerson,
  createPerson, 
  deletePerson,
  getAllPersons,
} = require('../controllers/person.controller.js')

router
  .route('/')
  .get(getAllPersons)
  .post(createPerson)

router
  .route('/:id')
  .get(getPerson)
  .delete(deletePerson)

module.exports = router