import chaiHttp from 'chai-http';
import { use, request, expect } from 'chai';
import app from '../src/server';

use(chaiHttp);

describe('Boats API', () => {
  const BOATS_URL = '/api/boats';
  const wrongId = 'wrongId';

  describe('Add boat', () => {
    it('should not add boat because name should not be empty', async () => {
      const { status, body } = await request(app).post(`${BOATS_URL}`).send({
        name: '',
      });
      expect(status).to.equal(400);
      expect(body.errors[0]).to.equal('name should not be empty');
    });

    it('should add boat and return success and id', async () => {
      const { status, body } = await request(app).post(`${BOATS_URL}`).send({
        name: 'boat test',
      });

      expect(status).to.equal(201);
      expect(body.success).to.equal(true);
      expect(body.id);
    });
  });

  describe('update boat', () => {
    it('should not update boat because id must be a mongodb id', async () => {
      const { status, body } = await request(app)
        .put(`${BOATS_URL}/${wrongId}`)
        .send({
          name: 'boat update test',
        });

      expect(status).to.equal(400);
      expect(body.errors[0]).to.equal('id must be a mongodb id');
    });

    it('should not update boat because Boat not found', async () => {
      const { status, body } = await request(app)
        .put(`${BOATS_URL}/642af16329a29835ac70666d`)
        .send({
          name: 'boat update test',
        });
      expect(status).to.equal(404);
      expect(body.message).to.equal('Boat not found');
    });
  });

  describe('delete boat', () => {
    it('should not update boat because id must be a mongodb id', async () => {
      const { status, body } = await request(app).delete(
        `${BOATS_URL}/${wrongId}`
      );

      expect(status).to.equal(400);
      expect(body.errors[0]).to.equal('id must be a mongodb id');
    });

    it('should not delete boat because Boat not found', async () => {
      const { status, body } = await request(app).delete(
        `${BOATS_URL}/642af16329a29835ac70666d`
      );
      expect(status).to.equal(404);
      expect(body.message).to.equal('Boat not found');
    });
  });
});
