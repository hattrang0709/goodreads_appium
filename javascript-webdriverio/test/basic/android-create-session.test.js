const assert = require("assert");
const { result } = require("lodash");
const webdriverio = require('webdriverio');
const androidOptions = require('../../helpers/caps').androidOptions;
const app = require('../../helpers/apps').androidGoodreads;
const expect = require('chai').assert;

androidOptions.capabilities.app = app;

describe('Create Android session', function () {
  let driver;

  before(async function () {
    driver = await webdriverio.remote(androidOptions);
  });

  it('TC001-Log in', async function () {
    // click "Log in" link
    const lnk_login = await driver.$('//android.widget.TextView[@resource-id="com.goodreads:id/sign_in_button"]');
    await lnk_login.click();

    //enter email and password
    const txt_email = await driver.$('//android.widget.EditText[@resource-id="com.goodreads:id/email"]');
    await txt_email.setValue('hattrang0709@gmail.com');
    const txt_pass = await driver.$('//android.widget.EditText[@resource-id="com.goodreads:id/password"]');
    await txt_pass.setValue('123456789');

    //click Log in button
    const btn_login = await driver.$('//android.widget.Button[@resource-id="com.goodreads:id/login_button"]');
    await btn_login.click();

    //check user log in successfully
    const logo = await driver.$('//android.widget.ImageView[@resource-id="com.goodreads:id/image"]');
    await logo.waitForDisplayed({ reverse: true });
    const txt_welcome = await driver.$('//android.widget.TextView[@resource-id="com.goodreads:id/title"]')
    await txt_welcome.waitForDisplayed({timeout: 4000, reverse: true});
    await txt_welcome.waitForExist({ timeout: 5000 })
    const mgs_welcome = await txt_welcome.getText();
    assert.strictEqual(mgs_welcome, 'Get started with Goodreads');

  });

  it('TC002-Search books', async function () {

    // enter "Search" textbox 
    const txt_search = await driver.$('//android.widget.TextView[@content-desc="Edit box: double tap to search for books, title, author or ISBN"]');
    await txt_search.click();
    const tb_search= await driver.$('//android.widget.EditText[@resource-id="com.goodreads:id/search_text"]');
    await tb_search.setValue('JJJJJ');
    driver.execute('mobile:performEditorAction',{action:'search'})

    const btn_want_to_read = await driver.$("//android.widget.TextView[@resource-id='com.goodreads:id/wtr_unshelvedStatus']");
    await btn_want_to_read.waitForDisplayed();

    await driver.touchAction({
      action: 'tap',
      x: 182,
      y: 571
    });

    const lbl_title_book = await driver.$('//android.widget.TextView[@resource-id="com.goodreads:id/book_info_title"]');
    await lbl_title_book.waitForDisplayed();
    const title_book = await lbl_title_book.getText();

    const lbl_author_book = await driver.$('//android.widget.TextView[@resource-id="com.goodreads:id/book_info_author"]');
    const author_book = await lbl_author_book.getText()

    let result = false;
    if(title_book.includes("JJJJJ")==true|| author_book.includes("JJJJJ")==true){
      result = true; 
    }
    assert.strictEqual(result, true);
    
  });

  it('TC003-Making the book as "Want a read"', async function () {

    const btn_wanToRead_uncheck = await driver.$('//android.widget.TextView[@resource-id="com.goodreads:id/wtr_unshelvedStatus"]');
    await btn_wanToRead_uncheck.waitForDisplayed(2000);
    await btn_wanToRead_uncheck.click();
    //check isChecked()
    const btn_wanToRead_checked = await driver.$('//android.widget.TextView[@resource-id="com.goodreads:id/wtr_shelvedStatus"]');
    const temp = await btn_wanToRead_checked.getAttribute('content-desc');

    let result = false;
    if(temp.includes("selected")==true){
      result = true;
    }

    assert.strictEqual(result, true);

    // remove book want to read
    await driver.touchAction({
      action: 'tap',
      x: 549,
      y: 1523
    });

    await driver.pause(2000)
    const lnk_remove = await driver.$('//android.widget.Button[@resource-id="com.goodreads:id/remove_from_my_books"]');
    // await lnk_remove.waitForExist({ timeout: 5000 });
    await lnk_remove.click();

    const btn_remove = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
    await btn_remove.click();
  });

  after(async function () {
    return await driver.deleteSession();
  });
});
