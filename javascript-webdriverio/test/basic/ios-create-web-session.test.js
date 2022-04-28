const webdriverio = require('webdriverio');
const iosOptions = require('../../helpers/caps').iosWebOptions;
const assert = require('chai').assert;


describe('Create Safari session', function () {

  before(async function () {
    driver = await webdriverio.remote(iosOptions);
  });

  it('should create and destroy IOS Safari session', async function () {
    await driver.url('https://www.goodreads.com/user/sign_in');
    const title = await driver.getTitle();
    assert.equal(title, 'Sign In');
  });

    it('TC001- Log in with valid account', async function () {
      // const dimension = driver.getWindowRect();
      // const startX = (dimension.width * 0.5);
      // const startY = (dimension.height * 0.8);

      // const endX = (dimension.width * 0.5);
      // const endY = (dimension.height * 03);
      
      //  driver.touchAction([ 
      //    {action: 'press', x: startX, y: startY}, {
      //      action: 'moveTo', x: endX, y: endY},
      //        'release', 'perform' ]);
      // var result = driver.touchPerform([
      //   { action: 'press', options: { x: startX, y: startY }},
      //   { action: 'wait', options: { ms: 4000 }},
      //   { action: 'moveTo', options: { x: endX, y: endY }},
      //   { action: 'release' }
      // ]);

      // var result = driver.execute('mobile: scroll', [{direction: "down", element: lnk_signIn}]);
      

      // const lnk_signIn = driver.$("//a[text()='Sign In']");
      // driver.execute('mobile: scroll', {direction: 'down', element: driver.$("//a[text()='Sign In']")});

      // await driver.execute(
      //   'mobile:scroll',{
      //     element: driver.$("//a[text()='Sign In']"),
      //     direction: 'down',
      //     precent:2.0,
      //   }
      // )

      // const scrollViewRect = await driver.getElementRect(await driver.$('//a[@class="siteHeader__logo"]'));
      // const centerX = scrollViewRect.x + (scrollViewRect.width / 2);
      // const startY = scrollViewRect.y + (scrollViewRect.height * 0.9);
      // const endY = scrollViewRect.y;

      // for (let scrolls = 0; scrolls < 5; scrolls++) {
      //   await driver.performActions([
      //     {
      //       type: 'pointer',
      //       id: 'finger1',
      //       parameters: {pointerType: 'touch'},
      //       actions: [
      //         {type: 'pointerMove', duration: 0, x: centerX, y: startY},
      //         {type: 'pointerDown', button: 0},
      //         {type: 'pause', duration: 3000},
      //         {type: 'pointerMove', duration: 500, x: centerX, y: endY},
      //         {type: 'pointerUp', button: 0},
      //       ],
      //     },
      //   ]);

      //   if (await $("//a[text()='Sign In']").isDisplayed()) {
      //   }
      // }

      // const lnk_signIn = driver.$("//a[text()='Sign In']");
      // await lnk_signIn.waitForDisplayed();
      // await lnk_signIn.click();

      const goodreads_title = await driver.$("//header[@class='logo']");
      await goodreads_title.waitForDisplayed({timeout: 4000});

      const btn_signInWithEmail = driver.$("//a[text()='Sign in with email']");
      await btn_signInWithEmail.click();

      const txt_email = driver.$("//input[@id='ap_email']");
      await txt_email.setValue("hattrang0709@gmail.com");

      const txt_pass = driver.$("//input[@id='ap_password']");
      await txt_pass.setValue("123456789");

      const btn_signIn = driver.$("//input[@id='signInSubmit']");
      btn_signIn.click();

      const title = await driver.getTitle();
      assert.equal(title, 'Goodreads Sign in');
    });

    it('TC002-Search books', async function () {




    });

    after(async function () {
      return await driver.deleteSession();
    });


});
