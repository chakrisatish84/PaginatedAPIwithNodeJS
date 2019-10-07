const express = require('express')
const app = express()

const users = [
    { id: 1, name: 'satish' },
    { id: 2, name: 'satish1' },
    { id: 3, name: 'satish2' },
    { id: 4, name: 'satish3' },
    { id: 5, name: 'satish4' },
    { id: 6, name: 'satish5' },
    { id: 7, name: 'satish6' },
    { id: 8, name: 'satish6' },
    { id: 9, name: 'satish6' },
    { id: 10, name: 'satish6' },
    { id: 11, name: 'satish6' },
    { id: 12, name: 'satish6' },
    { id: 13, name: 'satish6' }

]

const posts = [
    { id: 1, name: 'satish' },
    { id: 2, name: 'satish1' },
    { id: 3, name: 'satish2' },
    { id: 4, name: 'satish3' },
    { id: 5, name: 'satish4' },
    { id: 6, name: 'satish5' },
    { id: 7, name: 'satish6' },
    { id: 8, name: 'satish6' },
    { id: 9, name: 'satish6' },
    { id: 10, name: 'satish6' },
    { id: 11, name: 'satish6' },
    { id: 12, name: 'satish6' },
    { id: 13, name: 'satish6' }

]

app.get('/users', paginatedResults(users), (req, res) => {   
    res.json(res.paginatedResults)
})

app.get('/posts', paginatedResults(posts), (req, res) => {    
    res.json(res.paginatedResults)
})

function paginatedResults(model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.results = model.slice(startIndex, endIndex);

        res.paginatedResults = results;
        next();
    }
}

app.listen(4000);