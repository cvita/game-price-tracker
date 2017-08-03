const { Chromeless } = require('chromeless');


async function performCommonUseCaseAndTakeScreenshot() {
  const chromeless = new Chromeless({ remote: false });

  const screenshot = await chromeless
    .goto('http://localhost:3000')
    .type('bioshock the collection', 'input[id="gameInput"]')
    .wait('#gameInputButton')
    .click('#gameInputButton')
    .wait('#selectButton')
    .click('#selectButton')
    .wait('.img-fluid')
    .type('chris.vita@gmail.com', 'input[type="email"]')
    .click('.btn-success')
    .wait(150)
    .click('button.gamePriceTrackerButton')
    .wait(150)
    .screenshot();

  console.log(screenshot);
  await chromeless.end();
}

performCommonUseCaseAndTakeScreenshot().catch(console.error.bind(console));
