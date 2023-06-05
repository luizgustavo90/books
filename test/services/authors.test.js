let authors = require('../../services/authors.js')
let { describe, it, expect } = require('@jest/globals')

describe('Test authors list', () => {
        
    it('Should return a authors list', async () => {
        const dataReturn = await authors.list()
        expect(dataReturn.data.length).toBeGreaterThan(0)
    })

    it('Sould upload a author file', async () => {
        
    const mockInfo =
    [
        'author\r',
        'Luciano Ramalho\r',
        'Osvaldo Santana Neto\r',
        'David Beazley\r',
        'Chetan Giridhar\r',
        'Brian K. Jones\r',
        'J.K Rowling\r',
    ]

        const returned = await authors.upload(mockInfo)
        expect(returned).toEqual({"message": {"message": "Author created successfully"}})
    })

})
