const path = require('path');

if (process.env.SAUCE_LABS) {
  exports.iosTestApp = 'http://appium.github.io/appium/assets/TestApp7.1.app.zip';
  exports.androidGoodreads = 'https://apkpure.com/goodreads/com.goodreads/download?from=details#:~:text=Goodreads_v2.37.0-,Build,-8_apkpure.com.apk';
} else {
  exports.iosTestApp = path.resolve(__dirname, '..', '..', 'apps', '');
  exports.androidGoodreads = path.resolve(__dirname, '..', '..', 'apps', 'Goodreads_v2.37.0.apk');
}
