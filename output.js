//Sun Jul 07 2024 06:55:13 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (typeof $response !== "undefined" && $response.body) {
  let body = JSON.parse($response.body);
  function modifyObject(_0x549159) {
    for (let _0x67e54b in _0x549159) {
      if (_0x549159.hasOwnProperty(_0x67e54b)) {
        if (typeof _0x549159[_0x67e54b] === "object" && _0x549159[_0x67e54b] !== null) modifyObject(_0x549159[_0x67e54b]);else switch (_0x67e54b) {
          case "is_free":
            _0x549159[_0x67e54b] = 1;
            break;
          case "is_vip":
            _0x549159[_0x67e54b] = 0;
            break;
          case "free_status":
            _0x549159[_0x67e54b] = 1;
            break;
        }
      }
    }
  }
  modifyObject(body);
  $response.body = JSON.stringify(body);
}
$done({
  "body": $response.body
});