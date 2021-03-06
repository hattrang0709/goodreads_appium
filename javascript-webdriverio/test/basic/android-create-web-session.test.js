const webdriverio = require('webdriverio');
const androidOptions = require('../../helpers/caps').androidWebOptions;
const assert = require('chai').assert;

describe('Create Chrome web session', function () {
  let client;

  before(async function () {
    client = await webdriverio.remote(androidOptions);
  });

  after(async function () {
    return await client.deleteSession();
  });

});
