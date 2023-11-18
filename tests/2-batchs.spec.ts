import chaiHttp from 'chai-http';
import { use, request, expect } from 'chai';
import { ObjectId } from 'bson';
import app from '../src/server';

use(chaiHttp);

describe('Batchs API', () => {
  const BATCHES_URL = '/api/batches';

  const wrongId = 'wrongId';

  describe('Add batch', () => {
    it('should not add batch because boat should not be empty', async () => {
      const { status, body } = await request(app).post(`${BATCHES_URL}`).send({
        boat: '',
      });
      expect(status).to.equal(400);
      expect(body.errors[1]).to.equal('boat should not be empty');
    });

    it('should not add batch because fish must be one of the following values: tilapia, mackerel, grouper ', async () => {
      const { status, body } = await request(app).post(`${BATCHES_URL}`).send({
        boat: new ObjectId(),
        fish: 's',
        amount: 10,
      });
      expect(status).to.equal(400);
      expect(body.errors[0]).to.equal(
        'fish must be one of the following values: tilapia, mackerel, grouper'
      );
    });

    it('should add batch and return success and id', async () => {
      const { status, body } = await request(app).post(`${BATCHES_URL}`).send({
        boat: new ObjectId(),
        fish: 'mackerel',
        amount: 10,
      });

      expect(status).to.equal(201);
      expect(body.success).to.equal(true);
      expect(body.id);
    });
  });

  describe('update batch', () => {
    it('should not update batch because id must be a mongodb id', async () => {
      const { status, body } = await request(app)
        .put(`${BATCHES_URL}/${wrongId}`)
        .send({
          fish: 'grouper',
        });

      expect(status).to.equal(400);
      expect(body.errors[0]).to.equal('id must be a mongodb id');
    });

    it('should not update boat because Boat not found', async () => {
      const { status, body } = await request(app)
        .put(`${BATCHES_URL}/642af16329a29835ac70666d`)
        .send({
          fish: 'grouper',
        });
      expect(status).to.equal(404);
      expect(body.message).to.equal('Batches not found');
    });
  });

  /* describe('delete boat', () => {
    it('should delete boat and return Boat found and deleted successfully', async () => {
      const { status, body } = await request(app).delete(
        `${BATCHES_URL}/${boatId}`
      );

      expect(status).to.equal(200);
      expect(body.message).to.equal('Boat found and deleted successfully');
    });

    it('should not update boat because id must be a mongodb id', async () => {
      const { status, body } = await request(app).delete(
        `${BATCHES_URL}/${wrongId}`
      );

      expect(status).to.equal(400);
      expect(body.errors[0]).to.equal('id must be a mongodb id');
    });

    it('should not delete boat because is already deleted', async () => {
      const { status, body } = await request(app).delete(
        `${BATCHES_URL}/${boatId}`
      );
      expect(status).to.equal(404);
      expect(body.message).to.equal('Boat not found');
    });
  }); */
});
