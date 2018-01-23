import schedule from './schedule';
import db from '../db/database';


beforeAll(async (done) => {
  const queryText = (
    `INSERT INTO price_alerts(game_id, email, price)
    VALUES
      ('UP1004-CUSA00419_00-GTAVDIGITALDOWNL', 'testUser@anEmail.com', '1.99'),
      ('UP0002-CUSA05969_00-CODWWIITHEGAME01', 'testUser@anEmail.com', '300.99'),
      ('UP0006-CUSA05770_00-BATTLEFRONTII000', 'testUser@anEmail.com', '1.99')
      ON CONFLICT
      DO NOTHING`
  );
  const seedStubData = await db.query(queryText);
  done()
})

afterAll(async (done) => {
  const removeStubData = await db.query(`DELETE FROM price_alerts WHERE email = 'testUser@anEmail.com'`);
  done();
})

describe('schedule.js', () => {
  it('should handle sample current price alerts', async () => {
    const status = await schedule.updateInfoAndInformUsers();
    expect(status).toBeInstanceOf(Object);
    expect(status.expiredAlerts.length).toEqual(0);
    status.currentGames.forEach(game => {
      if (game.title === 'Call of Duty®: WWII') {
        expect(game.onSale).toBe(true);
      }
      if (game.title === 'Grand Theft Auto V') {
        expect(game.onSale).toBe(false);
      }
      if (game.title === 'STAR WARS™ Battlefront™ II: Elite Trooper Deluxe Edition') {
        expect(game.onSale).toBe(false);
      }
    });
  });
});
