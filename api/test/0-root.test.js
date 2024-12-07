import { expect } from 'chai';
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../app.js';

dotenv.config({ path: '.env.test' }); // Charge les variables de test depuis '.env.test'.

describe('Test Techno\'vice', () => {
    it('should succeed for health route', async () => {
        const { body, status } = await request(app).get('/api').expect(200);
        
        expect(status).to.eq(200);
        expect(body.message).to.eq("Bienvenue sur Techno'vice API");
    });
});