const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/database/connection')
describe('ONG', () =>{
    beforeEach(async () => {
        await connection.migrate.latest();
    });
      
      afterAll(async () => {
        await connection.migrate.rollback();
        await connection.destroy();
    });

    it('should be able to acreate a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({ 
                name: "APAD4",
                email: "contato@ong.com.br",
                whatsapp: "0000000000",
                city: "Rio do Sul",
                uf: "SC"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});