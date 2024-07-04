//Thu Jul 04 2024 12:44:38 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let obj = {
  "state": null,
  "subscription_android_monthly": "com.surgeapp.premium.monthly",
  "pricing_group": null,
  "subscription_android_quarterly": "com.surgeapp.premium.quarterly",
  "subscription_android_weekly": "premium_weekly_1",
  "premium": true,
  "subscription_ios_weekly": "com.surgeapp.surge.premium.lvl1.weekly",
  "expiration": "2099-09-09",
  "subscription_ios_yearly": "com.surgeapp.surge.premium.lvl2.yearly",
  "subscription_ios_quarterly": "com.surgeapp.surge.premium.lvl2.quarterly",
  "subscription_android_yearly": "com.surgeapp.premium.yearly",
  "subscription_ios_monthly": "com.surgeapp.surge.premium.lvl1.monthly"
};
$done({
  "body": JSON.stringify(obj),
  "status": 200
});