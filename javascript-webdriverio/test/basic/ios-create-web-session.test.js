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
    await driver.hideKeyboard();
  });

    it('TC001- Log in with valid account', async function () {
      
      const goodreads_title = await driver.$("//header[@class='logo']");
      await goodreads_title.waitForDisplayed({timeout: 4000});

      const btn_signInWithEmail = await driver.$("//a[text()='Sign in with email']");
      await btn_signInWithEmail.click();

      const txt_email = await driver.$("//input[@id='ap_email']");
      await txt_email.waitForDisplayed(3000);
      await txt_email.setValue("hattrang0709@gmail.com");

      const txt_pass = await driver.$("//input[@id='ap_password']");
      await txt_pass.setValue("123456789");

      const btn_signIn = await driver.$("//input[@class='a-button-input']");
      await btn_signIn.click();

      const icon_search = await driver.$("//button[@class='siteHeader__searchIcon gr-iconButton']");
      await icon_search.waitForClickable();

      const title = await driver.getTitle();
      assert.equal(title, 'Recent updates | Goodreads');
    });

    it('TC002-Search books', async function () {
    
    const icon_search = await driver.$("//button[@class='siteHeader__searchIcon gr-iconButton']");
    await icon_search.click();

    const txt_search = await driver.$("//input[@class='searchBox__input searchBox__input--primaryNavSeparateLine']");
    await txt_search.setValue("everything sad is untrue");
    driver.hideKeyboard('pressKey', 'go');

    //check value returned

    const book_list = await driver.$$("//ul[@class='bookList searchResults']/li");
    let result = false;
    for(let i = 1; i<= book_list.length; i++){
      const xpath = "//ul[@class='bookList searchResults']/li["+i+"]//cite[@class='bookTitle']/a";
      const lbl_title_book = await driver.$("" + xpath);
      const book_title = await lbl_title_book.getText();
      if(book_title.includes("Everything Sad Is Untrue")==true){
        result = true;
      }
    }
    assert.strictEqual(result, true);
    });

    it('TC003-Making the book as "Want a read"', async function () {

      const lbl_title = await driver.$("//cite[@class='bookTitle']/a[1]");
      await lbl_title.click();

      const img_cover_book = await driver.$("//div[@class='mainBookCover']/img");
      await img_cover_book.waitForDisplayed({timeout: 5000});

      const btn_want_to_read = await driver.$("//button[@class='areaPrimary']/span");
      await btn_want_to_read.click();

      const icon_arrow = await driver.$("//button[@class='areaPrimary shelfWant']/span");
      const result = await icon_arrow.isDisplayed();

      assert.strictEqual(result, true);

      const btn_want_to_read_checked = await driver.$("//button[@class='areaPrimary shelfWant']/span");
      await btn_want_to_read_checked.click();

      const lnk_remove_from_Shelves = await driver.$("//li[@data-action='delete' and contains(text(), 'Remove from Shelves')]");
      await lnk_remove_from_Shelves.click();

      const btn_remove = await driver.$("//li[@data-action='delete' and contains(@class, 'slideUpMenuItem remove')]");
      await btn_remove.click();

    });

    after(async function () {
      return await driver.deleteSession();
    });


});
