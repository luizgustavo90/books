let books = require('../../services/books.js')
let { describe, it, expect } = require('@jest/globals')
let { faker } = require('@faker-js/faker')

describe('Books list', () => {
    const dataTest =
    {
        "data": [
            {
                "id": 1,
                "book": "Desafio Backend com Node.js e SQLite",
                "edition": 1,
                "year": 2022,
                "authors": [
                    "Luiz Gustavo Souza",
                    "Marco Almeida"
                ]
            },
            {
                "id": 10,
                "book": "Desafio Backend com Node.js e SQLite",
                "edition": 2,
                "year": 2023,
                "authors": [
                    "Luiz Gustavo Souza",
                    "Marco Almeida",
                    "Beatriz Nascimento"
                ]
            }
        ],
        "meta": {}
    }

    it('Should return a books list filtered by BOOK (value as LIKE in database)', async () => {
        const params = {
            book: 'Desafio'
        }
        const dataTestBook = {
            "data": [
                {
                    "id": 1,
                    "book": "Desafio Backend com Node.js e SQLite",
                    "edition": 1,
                    "year": 2022,
                    "authors": [
                        "Luiz Gustavo Souza",
                        "Marco Almeida"
                    ]
                },
                {
                    "id": 10,
                    "book": "Desafio Backend com Node.js e SQLite",
                    "edition": 2,
                    "year": 2023,
                    "authors": [
                        "Luiz Gustavo Souza",
                        "Marco Almeida",
                        "Beatriz Nascimento"
                    ]
                }
            ],
            "meta": {
                "book": "Desafio"
            }
        }
        const dataReturn = await books.list(params)
        expect(dataReturn).toEqual(dataTestBook)
    })

    it('Should return a books list filtered by EDITION ', async () => {
        const params = {
            edition: 1
        }
        const dataTestBook = {

            "data": [
                {
                    "id": 1,
                    "book": "Desafio Backend com Node.js e SQLite",
                    "edition": 1,
                    "year": 2022,
                    "authors": [
                        "Luiz Gustavo Souza",
                        "Marco Almeida"
                    ]
                }
            ],
            "meta": {
                "edition": 1
            }

        }
        const dataReturn = await books.list(params)
        expect(dataReturn).toEqual(dataTestBook)
    })

    it('Should return a books list filtered by YEAR ', async () => {
        const params = {
            year: 2022
        }
        const dataTestBook = {
            "data": [
                {
                    "id": 1,
                    "book": "Desafio Backend com Node.js e SQLite",
                    "edition": 1,
                    "year": 2022,
                    "authors": [
                        "Luiz Gustavo Souza",
                        "Marco Almeida"
                    ]
                }
            ],
            "meta": {
                "year": 2022
            }
        }
        const dataReturn = await books.list(params)
        expect(dataReturn).toEqual(dataTestBook)
    })

    it('Should return a books list filtered by AUTHOR ', async () => {
        const params = {
            author: "Marco Almeida"
        }
        const dataTestBook = {
            "data": [
                {
                    "id": 1,
                    "book": "Desafio Backend com Node.js e SQLite",
                    "edition": 1,
                    "year": 2022,
                    "authors": [
                        "Luiz Gustavo Souza",
                        "Marco Almeida"
                    ]
                },
                {
                    "id": 10,
                    "book": "Desafio Backend com Node.js e SQLite",
                    "edition": 2,
                    "year": 2023,
                    "authors": [
                        "Luiz Gustavo Souza",
                        "Marco Almeida",
                        "Beatriz Nascimento"
                    ]
                }
            ],
            "meta": {
                "author": "Marco Almeida"
            }
        }
        const dataReturn = await books.list(params)
        expect(dataReturn).toEqual(dataTestBook)
    })


    it('Should return a books list with all books ', async () => {
        const params = {}
        const dataReturn = await books.list(params)
        expect(dataReturn.data.length).toBeGreaterThan(0)
    })

    it('Should insert a new book', async () => {
        const dataInsert = {
            "name": faker.internet.userName(),
            "edition": faker.number.int(),
            "year": faker.number.int({ min: 1900, max: 2023 }),
            "authors": [
                1,
                3
            ]
        }

        const messageReturn = { "message": "Book created successfully" }
        const dataReturn = books.insert(dataInsert)
        expect(dataReturn).toEqual(messageReturn)
    })

    it('Should update a book', async() =>{
        const id = 11

        const dataUpdate = {
            "name": faker.internet.userName(),
            "edition": faker.number.int(),
            "year": faker.number.int({ min: 1900, max: 2023 }),
            "authors": [
                1,
                3
            ]
        }
        const dataReturn = await books.update(id,dataUpdate)
        const messageReturn = {"message":"Book updated successfully"}
        expect(dataReturn).toEqual(messageReturn)

    })

})