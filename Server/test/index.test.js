const app = require('../src/App')
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", ()=> {
    describe('GET /rickandmorty/character/:id', ()=> {
        it('Responde con status: 200', async ()=> {
            await agent.get('/rickandmorty/character/1').expect(200);
        })
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async ()=> {
            const response = (await agent.get('/rickandmorty/character/1')).body;
            expect(response).toHaveProperty("id")
            expect(response).toHaveProperty("name")
            expect(response).toHaveProperty("species")
            expect(response).toHaveProperty("gender")
            expect(response).toHaveProperty("status")
            expect(response).toHaveProperty("origin")
            expect(response).toHaveProperty("image")
        }) 
        it('Si hay un error responde con status: 500', async ()=> {
            await agent.get('/rickandmorty/character/1434634').expect(500);
        })
    })
    describe("GET /rickandmorty/login", ()=> {
        it('El login fue exitoso!', async ()=> {
            const response = (await agent.get('/rickandmorty/login?email=tomasbaldi@gmail.com&password=tomas98')).body;
            expect(response.access).toEqual(true)
        })
        it('El login fue rechazado!', async ()=> {
            const response = (await agent.get('/rickandmorty/login?email=tom@gmail.com&password=tom98')).body;
            expect(response.access).toEqual(false)
        })
    })
    describe("POST /rickandmorty/fav", ()=> {
        const char1 = {id: '4', nombre: 'Tomas'}
        const char2 = {id: '2', nombre: 'Manuel'}
        it('Devuelve elemento enviado por body', async ()=> {
            const response = (await agent.post('/rickandmorty/fav').send(char1)).body;
            expect(response).toContainEqual(char1)
        })
        it('Devuelve ambos elementos', async ()=> {
            const response = (await agent.post('/rickandmorty/fav').send(char2)).body;
            expect(response).toContainEqual(char1)
            expect(response).toContainEqual(char2)
        })
    })
    describe("DELETE /rickandmorty/fav/:id", ()=> {
        const char1 = {id: '4', nombre: 'Tomas'}
        const char2 = {id: '2', nombre: 'Manuel'}
        it('Devuelve el arreglo correspondiente si no se elimina ningun char', async ()=> {
            const response = (await agent.delete('/rickandmorty/fav/4534')).body;
            expect(response).toContainEqual(char1)
            expect(response).toContainEqual(char2)
        })
        it('Elimina el char correspondiente', async ()=> {
            const response = (await agent.delete('/rickandmorty/fav/2')).body;
            expect(response).toContainEqual(char2)
        })
    })
})