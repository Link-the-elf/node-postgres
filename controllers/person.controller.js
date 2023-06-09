const db = require('../db.js')

const getAllPersons = async (req, res) => {
  try {
    const persons = await db.query('SELECT * FROM person')
    res.status(200).json(persons.rows)
  } catch {
    res.status(500).json({"errors": {"person": "error getting persons"}})
  }
}

const createPerson = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({"errors": {"name": "name cannot be empty"}})
  }

  if (!req.body.surname) {
    return res.status(400).json({"errors": {"surname": "surname cannot be empty"}})
  }

  try {
    const person = await db.query(
      `INSERT INTO person (name, surname) values ($1, $2) RETURNING *`, 
      [req.body.name, req.body.surname]
    )
    res.status(201).json(person.rows[0])
  } catch {
    res.status(500).json({"errors": {"person": "error creating person"}})
  }
}

const getPerson = async (req, res) => {
  try {
    const person = await db.query('SELECT * FROM person WHERE id = $1', [req.params.id])
    res.status(200).json(person.rows[0])
  } catch {
    res.status(500).json({"errors": {"person": "error getting person"}})
  }
}

const deletePerson = async (req, res) => {
  try {
    const person = await db.query('DELETE FROM person WHERE id = $1', [req.params.id])
    res.sendStatus(204)
  } catch {
    res.status(500).json({"errors": {"person": "error deleting person"}})
  }
}

module.exports = {
  getPerson,
  deletePerson,
  createPerson,
  getAllPersons,
}