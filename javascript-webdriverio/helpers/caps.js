const iosCaps = {
  platformName: 'iOS',
  automationName: 'XCUITest',
  deviceName: process.env.IOS_DEVICE_NAME || 'iphone11promax',
  platformVersion: process.env.IOS_PLATFORM_VERSION || '15.4',
  app: undefined 
};

const iosWebCaps = {
  platformName: 'iOS',
  automationName: 'XCUITest',
  deviceName: process.env.IOS_DEVICE_NAME || 'iphone11promax',
  platformVersion: process.env.IOS_PLATFORM_VERSION || '15.4',
  browserName: 'Safari'
};

const DEFAULT_ANDROID_DEVICE_NAME = process.env.SAUCE ||'emulator-5554';
const DEFAULT_ANDROID_PLATFORM_VERSION = process.env.SAUCE || '11' ;

const androidCaps = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
  platformVersion:
    process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
  app: undefined || '/Users/hathitrang/Downloads/Goodreads_v2.37.0.apk',
  appWaitActivity: '*',
  appPackage: "com.goodreads"
};

const androidWebCaps = {
  platformName: 'Android',
  automationName: 'UiAutomator2',
  deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
  platformVersion:
    process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
  browserName: 'chrome'
};

const serverConfig = {
  path: '/wd/hub',
  host: '0.0.0.0',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'info'
};

const androidOptions = Object.assign(
  {
    capabilities: androidCaps
  },
  serverConfig
);

const iosOptions = Object.assign(
  {
    capabilities: iosCaps
  },
  serverConfig
);

const androidWebOptions = Object.assign(
  {
    capabilities: androidWebCaps
  },
  serverConfig
);

const iosWebOptions = Object.assign(
  {
    capabilities: iosWebCaps
  },
  serverConfig
);

module.exports = {
  androidOptions,
  iosOptions,
  androidWebOptions,
  iosWebOptions
};
