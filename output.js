//Tue Jul 09 2024 12:16:08 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("阿里云社区"),
  ckName = "aliyunWeb_data",
  controlTime = ($.isNode() ? process.env.aliyunWeb_time : $.getdata("aliyunWeb_time")) || "12",
  controlScene = ($.isNode() ? process.env.aliyunWeb_scene : $.getdata("aliyunWeb_scene")) || "false",
  controlStock = ($.isNode() ? process.env.aliyunWeb_stock : $.getdata("aliyunWeb_stock")) || "false",
  Notify = 1,
  notify = $.isNode() ? require("./sendNotify") : "";
let envSplitor = ["@"];
var userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "";
let userList = [],
  userIdx = 0,
  userCount = 0;
const taskGroup = [{
  code: "",
  name: "我的社区"
}, {
  code: "ecs",
  name: "弹性计算"
}, {
  code: "computenest",
  name: "计算巢"
}, {
  code: "yitian",
  name: "倚天"
}, {
  code: "cloudnative",
  name: "云原生"
}, {
  code: "storage",
  name: "云存储"
}, {
  code: "luoshen",
  name: "飞天洛神云网络"
}, {
  code: "database",
  name: "数据库"
}, {
  code: "polardb",
  name: "PolarDB开源"
}, {
  code: "bigdata",
  name: "大数据与机器学习"
}, {
  code: "modelscope",
  name: "ModelScope模型即服务"
}, {
  code: "viapi",
  name: "视觉智能"
}, {
  code: "iot",
  name: "物联网"
}, {
  code: "devops",
  name: "云效DevOps"
}, {
  code: "aliyun_linux",
  name: "龙蜥操作系统"
}, {
  code: "modelstudio",
  name: "百炼大模型"
}, {
  code: "tongyi",
  name: "通义大模型"
}];
$.is_debug = ($.isNode() ? process.env.IS_DEDUG : $.getdata("is_debug")) || "false";
$.notifyList = [];
$.notifyMsg = [];
let pendingScore = 0,
  userScore = 0,
  sceneId = "",
  resourceFrom = "",
  sectionId = "",
  ip = "";
async function main() {
  try {
    $.log("\n================== 任务 ==================\n");
    for (let _0xf06bea of userList) {
      console.log("🔷账号" + _0xf06bea.index + " >> Start work");
      console.log("随机延迟" + _0xf06bea.getRandomTime() + "秒");
      const _0x4f798b = Date.now();
      userScore = (await _0xf06bea.interactData()) ?? {};
      if (_0xf06bea.ckStatus) {
        if (_0x4f798b < new Date(new Date().setHours(Math.floor(controlTime), 0, 0, 0)).getTime()) {
          for (let _0x30488f of taskGroup) {
            const _0x4cdf83 = await _0xf06bea.getUserSpaceSignInDetail(_0x30488f.code),
              _0xba33b4 = await _0xf06bea.getTasks(_0x4cdf83);
            await _0xf06bea.signin(_0xba33b4, _0x30488f.name);
            await $.wait(_0xf06bea.getRandomTime());
            const _0x7499d7 = await _0xf06bea.assessSignInBonusQualification(_0x4cdf83, _0x30488f.name);
            await $.wait(_0xf06bea.getRandomTime());
            _0x7499d7 && (await _0xf06bea.receiveSignInBonus(_0x4cdf83, _0x30488f.name), await $.wait(_0xf06bea.getRandomTime()));
          }
          const _0x472fcc = await _0xf06bea.getEbooks();
          await $.wait(_0xf06bea.getRandomTime());
          const _0x40cc0e = await _0xf06bea.getCsrfToken(_0x472fcc, "ebook");
          await $.wait(_0xf06bea.getRandomTime());
          await _0xf06bea.addBookComment(_0x472fcc, _0x40cc0e);
          await $.wait(_0xf06bea.getRandomTime());
          for (let _0x375b02 = 0; _0x375b02 < 5; _0x375b02++) {
            const _0x3d0eeb = await _0xf06bea.getArticles();
            await $.wait(_0xf06bea.getRandomTime());
            await _0xf06bea.likeOrNotLike(_0x3d0eeb, "aliyun-public-like", 0);
            await $.wait(_0xf06bea.getRandomTime());
            await _0xf06bea.likeOrNotLike(_0x3d0eeb, "aliyun-public-favorite", 0);
            await $.wait(_0xf06bea.getRandomTime());
            _0x375b02 === 0 && (await _0xf06bea.addComment(_0x3d0eeb), await $.wait(_0xf06bea.getRandomTime()), await _0xf06bea.likeOrNotLike(_0x3d0eeb, "aliyun-public-share", 0), await $.wait(_0xf06bea.getRandomTime()));
            const _0x4bf920 = await _0xf06bea.getAsks();
            await $.wait(_0xf06bea.getRandomTime());
            if (_0x4bf920 && _0x4bf920?.["id"]) {
              const _0x4bf957 = await _0xf06bea.getCsrfToken(_0x4bf920.id, "ask");
              await $.wait(_0xf06bea.getRandomTime());
              const _0x3f160b = await _0xf06bea.getAskDetail(_0x4bf920);
              await $.wait(_0xf06bea.getRandomTime());
              _0x3f160b && (await _0xf06bea.voteAnswer(_0x4bf920.id, _0x3f160b, _0x4bf957, 1), await $.wait(_0xf06bea.getRandomTime()));
            }
          }
          JSON.parse(controlScene) && (await _0xf06bea.doScene(), await $.wait(_0xf06bea.getRandomTime()));
          JSON.parse(controlStock) && (await _0xf06bea.getGroupItems());
          pendingScore = await _0xf06bea.getUserTotalPendingScore();
          $.title = "获得待领取积分: " + pendingScore;
          DoubleLog("🎉 当前积分: " + userScore + ", 待领取积分: " + pendingScore);
        } else {
          for (let _0x16d7ec of taskGroup) {
            const _0x3d3ca4 = await _0xf06bea.getUserSpaceSignInDetail(_0x16d7ec.code),
              _0x24c7ff = await _0xf06bea.assessSignInBonusQualification(_0x3d3ca4, _0x16d7ec.name);
            await $.wait(_0xf06bea.getRandomTime());
            _0x24c7ff && (await _0xf06bea.receiveSignInBonus(_0x3d3ca4, _0x16d7ec.name), await $.wait(_0xf06bea.getRandomTime()));
          }
          pendingScore = await _0xf06bea.getUserTotalPendingScore();
          await $.wait(_0xf06bea.getRandomTime());
          await _0xf06bea.collect();
          await $.wait(_0xf06bea.getRandomTime());
          await $.wait(_0xf06bea.getRandomTime());
          const _0x25676d = (await _0xf06bea.getFavors()) ?? [];
          await $.wait(_0xf06bea.getRandomTime());
          if (_0x25676d.length) {
            for (let _0x49723c of _0x25676d) {
              await _0xf06bea.likeOrNotLike(_0x49723c.objectId, "aliyun-public-like", 1);
              await $.wait(_0xf06bea.getRandomTime());
              await _0xf06bea.likeOrNotLike(_0x49723c.objectId, "aliyun-public-favorite", 1);
              await $.wait(_0xf06bea.getRandomTime());
            }
          }
          JSON.parse(controlStock) && (await _0xf06bea.getGroupItems());
          let _0xee6ba2 = (await _0xf06bea.interactData()) ?? {};
          $.title = "本次运行共获得" + (pendingScore || 0) + "积分";
          DoubleLog("🎉 领取积分: " + pendingScore + ", 当前积分: " + _0xee6ba2);
        }
      } else {
        $.notifyMsg.push("⛔️ 账号" + (_0xf06bea.userName || _0xf06bea.index) + " >> Check ck error!");
      }
      $.notifyList.push({
        id: _0xf06bea.index,
        avatar: _0xf06bea.avatar,
        message: $.notifyMsg
      });
      $.notifyMsg = [];
    }
  } catch (_0x8f2c3c) {
    $.log("⛔️ main run error => " + _0x8f2c3c);
    throw new Error("⛔️ main run error => " + _0x8f2c3c);
  }
}
class UserInfo {
  constructor(_0x1ac43c) {
    this.index = ++userIdx;
    this.token = _0x1ac43c.token || _0x1ac43c;
    this.userId = _0x1ac43c.userId;
    this.userName = _0x1ac43c.userName;
    this.avatar = _0x1ac43c.avatar;
    this.ckStatus = true;
    this.baseUrl = "";
    this.host = "https://developer.aliyun.com/developer/api";
    this.headers = {
      Cookie: this.token,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Referer: "https://developer.aliyun.com/"
    };
    this.getRandomTime = () => randomInt(1, 2);
    this.fetch = async _0x18b9b3 => {
      try {
        if (typeof _0x18b9b3 === "string") {
          _0x18b9b3 = {
            url: _0x18b9b3
          };
        }
        if (_0x18b9b3?.["url"]?.["startsWith"]("/")) {
          _0x18b9b3.url = this.host + _0x18b9b3.url;
        }
        const _0x428d08 = await Request({
          ..._0x18b9b3,
          headers: _0x18b9b3.headers || this.headers,
          url: _0x18b9b3.url || this.baseUrl
        });
        debug(_0x428d08, _0x18b9b3?.["url"]?.["replace"](/\/+$/, "")["substring"](_0x18b9b3?.["url"]?.["lastIndexOf"]("/") + 1));
        if (_0x428d08?.["code"] == 40001) {
          throw new Error(_0x428d08?.["message"] || "用户需要去登录");
        }
        return _0x428d08;
      } catch (_0x10220a) {
        this.ckStatus = false;
        $.log("⛔️ 请求发起失败！" + _0x10220a);
      }
    };
  }
  async getUser() {
    try {
      const _0x4ff1b7 = {
        url: "/my/user/getUser",
        type: "get"
      };
      await this.fetch(_0x4ff1b7);
    } catch (_0x5e1672) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x5e1672);
    }
  }
  async assessSignInBonusQualification(_0x26868c, _0x336e18) {
    try {
      const _0x2d310a = {
        url: "/sign/assessSignInBonusQualification",
        type: "get",
        params: {
          taskGroupId: _0x26868c
        }
      };
      let _0x90db25 = await this.fetch(_0x2d310a);
      return _0x90db25?.["data"];
    } catch (_0x3dacf6) {
      this.ckStatus = false;
      $.log("⛔️ 查询领奖条件失败! " + _0x3dacf6);
    }
  }
  async receiveSignInBonus(_0x4194ed, _0x2327f3) {
    try {
      const _0x3af2ea = {
        url: "/sign/receiveSignInBonus",
        type: "post",
        dataType: "form",
        body: {
          taskGroupId: _0x4194ed
        }
      };
      let _0x51dc72 = await this.fetch(_0x3af2ea);
      if (_0x51dc72?.["code"] == "200") {
        const _0x1d4a91 = _0x51dc72?.["data"] || 0;
        $.log("✅ 抽奖 - " + (_0x2327f3 || "default") + ": 获得 " + _0x1d4a91 + " 积分");
      } else {
        $.log("⛔️ 抽奖 - " + (_0x2327f3 || "default") + ": " + _0x51dc72?.["message"]);
      }
    } catch (_0xfa9611) {
      this.ckStatus = false;
      $.log("⛔️ 抽奖失败! " + _0xfa9611);
    }
  }
  async getUserSpaceSignInDetail(_0x5ef9ae) {
    try {
      const _0x3bcfd0 = {
        url: "/sign/getUserSpaceSignInDetail",
        type: "get",
        params: {
          excode: _0x5ef9ae
        }
      };
      let _0x3c70ce = await this.fetch(_0x3bcfd0);
      const _0x4b8dd2 = _0x3c70ce?.["data"]?.["taskGroupId"];
      return _0x4b8dd2;
    } catch (_0x19286e) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x19286e);
    }
  }
  async getTasks(_0xd065e9) {
    try {
      const _0x35cf75 = {
        url: "/task/getTaskGroup?groupId=" + _0xd065e9,
        type: "get"
      };
      let _0x46757d = await this.fetch(_0x35cf75);
      const _0x81ae8a = _0x46757d?.["data"]?.["taskList"];
      let _0x3635ef = {};
      if (_0x81ae8a.length) {
        const _0x518e42 = new Date().getTime();
        for (let _0x2189b6 of _0x81ae8a) {
          if (_0x518e42 >= _0x2189b6.gmtEnableStart && _0x518e42 <= _0x2189b6.gmtEnableEnd) {
            const _0x306552 = JSON.parse(_0x2189b6.finishRule.replace(/&quot;/g, "\""));
            _0x3635ef.actionCode = _0x306552.actions[0].actionCode;
            _0x3635ef.activityCode = _0x306552.actions[0].actionCode;
            _0x3635ef.objectId = _0x306552.actions[0].objectId;
          }
        }
      }
      return _0x3635ef;
    } catch (_0x2b79ef) {
      this.ckStatus = false;
      $.log("⛔️ 获取签到任务列表失败! " + _0x2b79ef);
    }
  }
  async signin(_0x386b13, _0x309b10) {
    try {
      const _0x298a82 = {
        url: "/task/actionLog",
        type: "post",
        dataType: "form",
        body: _0x386b13
      };
      let _0x29560f = await this.fetch(_0x298a82);
      $.log("✅ 签到 - " + (_0x309b10 || "default") + ": " + _0x29560f?.["message"]);
    } catch (_0x801e4d) {
      this.ckStatus = false;
      $.log("⛔️ 签到失败! " + _0x801e4d);
    }
  }
  async getArticles() {
    try {
      const _0x35a2bb = Math.floor(Math.random() * 31) + 1,
        _0x5c7e25 = {
          url: "https://developer.aliyun.com/group/aliware/article_hot?pageNum=" + _0x35a2bb,
          type: "get"
        };
      let _0x42d901 = await this.fetch(_0x5c7e25);
      const _0x3db5fd = $.Cheerio.load(_0x42d901),
        _0xc495dd = _0x3db5fd(".community-detail-content"),
        _0x1d5a43 = _0xc495dd.find(".community-list").map((_0x5f3fcf, _0x5afe09) => {
          return {
            id: _0x3db5fd(_0x5afe09).find(".feed-item").attr("data-id"),
            name: _0x3db5fd(_0x5afe09).find(".feed-item-content-title h3").text()
          };
        }).get(),
        _0x45e6b3 = _0x1d5a43[Math.floor(Math.random() * _0x1d5a43.length)],
        {
          id: _0x38c8df,
          name: _0x181c8f
        } = _0x45e6b3;
      $.log("✅ 随机获取文章id: " + _0x38c8df + ", 标题: " + _0x181c8f);
      return _0x38c8df;
    } catch (_0x1f1bfc) {
      this.ckStatus = false;
      $.log("⛔️ 获取文章列表失败! " + _0x1f1bfc);
    }
  }
  async getEbooks() {
    try {
      const _0x2a0119 = Math.floor(Math.random() * 501) + 1,
        _0x3fb476 = {
          url: "https://developer.aliyun.com/ebook/index/__0_0_0_" + _0x2a0119,
          type: "get"
        };
      let _0x432bbc = await this.fetch(_0x3fb476);
      const _0x3d7134 = $.Cheerio.load(_0x432bbc),
        _0x349242 = _0x3d7134(".ebook-home-list"),
        _0x5a470a = _0x349242.find(".ebook-home-item").map((_0x3ef2f3, _0x32b8b1) => {
          return {
            id: _0x3d7134(_0x32b8b1).attr("href").replace("/ebook/", ""),
            name: _0x3d7134(_0x32b8b1).find(".ebook-home-title").text()
          };
        }).get(),
        _0x5cce4c = _0x5a470a[Math.floor(Math.random() * _0x5a470a.length)],
        {
          id: _0x4a4deb,
          name: _0x356903
        } = _0x5cce4c;
      $.log("✅ 随机电子书id: " + _0x4a4deb + ", 标题: " + _0x356903);
      return _0x4a4deb;
    } catch (_0x6b9f57) {
      this.ckStatus = false;
      $.log("⛔️ 获取电子书列表失败! " + _0x6b9f57);
    }
  }
  async getAsks() {
    try {
      const _0x40d031 = Math.floor(Math.random() * 31) + 1,
        _0x26e4e3 = {
          url: "https://developer.aliyun.com/ask?pageNum=" + _0x40d031,
          type: "get"
        };
      let _0x2da29e = await this.fetch(_0x26e4e3);
      const _0x41c984 = $.Cheerio.load(_0x2da29e),
        _0x201a0b = _0x41c984(".askProduct-list"),
        _0x3bb6b9 = _0x201a0b.find(".askProduct-item").map((_0x1ecf7c, _0x8a2ccb) => {
          return {
            id: _0x41c984(_0x8a2ccb).attr("data-id") || "",
            name: _0x41c984(_0x8a2ccb).find(".askProduct-item-title-text h3").text() || "",
            answer: parseInt(_0x41c984(_0x8a2ccb).find(".askProduct-item-info-answer").text()) || ""
          };
        }).filter((_0x44bef0, _0x38d816) => _0x38d816.answer > 0).get(),
        _0x585806 = _0x3bb6b9[Math.floor(Math.random() * _0x3bb6b9.length)];
      if (_0x585806?.["id"] && _0x585806?.["name"]) {
        const {
          id: _0x4179c9,
          name: _0x50dd4b
        } = _0x585806;
        $.log("✅ 随机获取问答id: " + _0x4179c9 + ", 标题: " + _0x50dd4b);
        return _0x585806;
      }
      return null;
    } catch (_0x2ffe15) {
      this.ckStatus = false;
      $.log("⛔️ 获取问答列表失败! " + _0x2ffe15);
    }
  }
  async getAskDetail(_0xab5b81) {
    try {
      const _0x24c636 = {
        url: "https://developer.aliyun.com/ask/" + _0xab5b81.id,
        type: "get"
      };
      let _0x44c553 = await this.fetch(_0x24c636);
      const _0x37e384 = $.Cheerio.load(_0x44c553),
        _0x5b7553 = _0x37e384(".answer-list"),
        _0x105bbe = _0x5b7553.find(".answer-item").map((_0x3874e1, _0x3003a6) => {
          return {
            id: _0x37e384(_0x3003a6).attr("data-id") || ""
          };
        }).get(),
        _0x17bded = _0x105bbe[Math.floor(Math.random() * _0xab5b81.answer)];
      if (_0x17bded) {
        const {
          id: _0x113738
        } = _0x17bded;
        $.log("✅ 随机获取问题问答id: " + _0x113738);
        return _0x113738;
      }
      return null;
    } catch (_0x57667e) {
      this.ckStatus = false;
      $.log("⛔️ 随机获取问题问答失败! " + _0x57667e);
    }
  }
  async likeOrNotLike(_0x52f0f4, _0x259d18, _0xac88cd) {
    try {
      const _0x263fb9 = {
        url: "https://ucc.aliyun.com/uccPagingComponent/likeOrNotLike",
        type: "get",
        params: {
          bizCategory: "yq-article",
          actionCode: _0x259d18,
          objectId: _0x52f0f4,
          status: _0xac88cd,
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0x263fb9);
      let _0x59e4d5 = "文章" + (_0xac88cd === 1 ? "取消" : "");
      if (_0x259d18 === "aliyun-public-like") {
        _0x59e4d5 += "点赞";
      } else {
        if (_0x259d18 === "aliyun-public-favorite") {
          _0x59e4d5 += "收藏";
        } else {
          _0x259d18 === "aliyun-public-share" && (_0x59e4d5 += "分享");
        }
      }
      $.log("✅ " + _0x59e4d5 + "成功: " + _0x52f0f4);
    } catch (_0x5c6310) {
      this.ckStatus = false;
      $.log("⛔️ " + taskType + "失败! " + _0x5c6310);
    }
  }
  async getCsrfToken(_0x584696, _0x460045) {
    try {
      const _0x4556d6 = {
          url: "https://developer.aliyun.com/csrfToken",
          type: "get",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/" + _0x460045 + "/" + _0x584696
          }
        },
        _0x58c4c9 = await this.fetch(_0x4556d6);
      return _0x58c4c9?.["token"];
    } catch (_0x54542d) {
      this.ckStatus = false;
      $.log("⛔️ 获取 csrf 失败! " + _0x54542d);
    }
  }
  async voteAnswer(_0x359189, _0x11e17a, _0x32e490, _0x4905d8) {
    try {
      const _0x3e1d91 = {
        url: "https://developer.aliyun.com/developer/api/my/ask/voteAnswer",
        type: "post",
        dataType: "form",
        headers: {
          Cookie: this.token,
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
          Referer: "https://developer.aliyun.com/ask/" + _0x359189
        },
        params: {
          p_csrf: _0x32e490
        },
        body: {
          id: _0x11e17a,
          votes: _0x4905d8
        }
      };
      await this.fetch(_0x3e1d91);
      $.log("✅ 回答点赞: " + _0x359189 + "-" + _0x11e17a);
    } catch (_0x54f511) {
      this.ckStatus = false;
      $.log("⛔️ 回答点赞失败! " + _0x54f511);
    }
  }
  async addBookComment(_0x3db742, _0x3675fb) {
    try {
      const _0x4e123b = {
          url: "https://developer.aliyun.com/developer/api/ebook/mark/add",
          type: "post",
          dataType: "json",
          headers: {
            Cookie: this.token,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 AliApp(Aliyun/6.7.1) WindVane/8.7.2 1170x2532 WK",
            Referer: "https://developer.aliyun.com/ebook/" + _0x3db742
          },
          params: {
            p_csrf: _0x3675fb
          },
          body: {
            eBookId: _0x3db742,
            score: 10,
            content: "很棒的一本书"
          }
        },
        _0x495f4f = await this.fetch(_0x4e123b);
      _0x495f4f?.["code"] == "200" ? $.log("✅ 评价电子书: " + _0x3db742) : $.log("⛔️ 评价电子书失败! " + _0x495f4f?.["message"]);
    } catch (_0x5ab4c3) {
      this.ckStatus = false;
      $.log("⛔️ 评价电子书失败! " + _0x5ab4c3);
    }
  }
  async getFavors() {
    try {
      const _0x1533e8 = {
          url: "https://developer.aliyun.com/developer/api/my/subscribe/listUserFavor",
          type: "get",
          params: {
            pageNum: 1,
            pageSize: 10,
            type: 1
          }
        },
        _0x29c254 = await this.fetch(_0x1533e8),
        {
          list: _0x4a91e9
        } = _0x29c254?.["data"];
      if (_0x4a91e9.length) {
        $.log("✅ 开始取消文章的点赞与收藏记录");
        return _0x4a91e9;
      }
      return [];
    } catch (_0x27ae28) {
      this.ckStatus = false;
      $.log("⛔️ " + (type === "aliyun-public-like" ? "文章点赞" : "文章收藏") + "失败! " + _0x27ae28);
    }
  }
  async addComment(_0x46bae0) {
    try {
      const _0x11431e = {
        url: "https://ucc.aliyun.com/uccPagingComponent/addComment",
        type: "get",
        params: {
          content: encodeURIComponent("感谢博主的分享"),
          objectId: _0x46bae0,
          bizCategory: "yq-comment-type-article",
          commentType: 0,
          sourceAppCode: "developer-ecology",
          sourceBizCategory: "developer-ecology-group",
          uccCsrfToken: await this.getUccCsrfToken(),
          callback: getCallback()
        }
      };
      await this.fetch(_0x11431e);
      $.log("✅ 文章评论: " + _0x46bae0);
    } catch (_0x27caae) {
      this.ckStatus = false;
      $.log("⛔️ 文章点赞失败! " + _0x27caae);
    }
  }
  async doScene() {
    const _0x79c646 = this.token.match(new RegExp("c_csrf=([^;]*)"))[1];
    await this.getSceneList();
    await $.wait(this.getRandomTime());
    const _0x1f912c = await this.getSceneDetailPageInfoById();
    await $.wait(this.getRandomTime());
    if (_0x1f912c) {
      await this.getSceneStartPageInfoById();
      await $.wait(this.getRandomTime());
      await this.startSceneById(_0x79c646);
      await $.wait(this.getRandomTime());
      resourceFrom === "1" && sectionId && (await this.createResourceById(_0x79c646), await $.wait(this.getRandomTime()));
      resourceFrom === "2" && (await this.closeSceneById(_0x79c646), await $.wait(this.getRandomTime()));
    } else {
      await this.doScene();
    }
  }
  async getSceneList() {
    try {
      const _0x251524 = Math.floor(Math.random() * 27) + 1,
        _0x5bfc42 = 21,
        _0x5859be = {
          url: "https://developer.aliyun.com/adc/api/getSceneList",
          type: "get",
          params: {
            tags: encodeURIComponent(","),
            difficulty: "",
            orderBy: "useCountTotal",
            pageNum: _0x251524,
            pageSize: _0x5bfc42
          },
          headers: {
            Cookie: this.headers.Cookie,
            Referer: "https://developer.aliyun.com/adc/labs/",
            "User-Agent": this.headers["User-Agent"]
          }
        },
        _0x3a8a9d = await this.fetch(_0x5859be),
        _0x4c0486 = _0x3a8a9d?.["data"]?.["list"];
      if (_0x4c0486.length) {
        const _0x2b0f17 = _0x4c0486[Math.floor(Math.random() * _0x4c0486.length)];
        sceneId = _0x2b0f17?.["id"];
        $.log("✅ 获取场景: " + _0x2b0f17.name + "[" + sceneId + "]");
      } else {
        $.log("⛔️ 获取场景失败! " + e);
      }
    } catch (_0x2faa05) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景失败! " + _0x2faa05);
    }
  }
  async getSceneDetailPageInfoById() {
    try {
      const _0x4a9f67 = {
          url: "https://developer.aliyun.com/adc/api/getSceneDetailPageInfoById",
          type: "get",
          params: {
            id: sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/" + sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x411030 = await this.fetch(_0x4a9f67),
        {
          buttonCode: _0x262df9
        } = _0x411030?.["data"]?.["developerAdcExperienceStatusVO"];
      return _0x262df9 === "1" ? ($.log("✅ 确认场景状态: " + _0x411030?.["data"]?.["id"]), _0x411030?.["data"]?.["id"]) : ($.log("⛔️ 确认场景状态: " + _0x411030?.["data"]?.["id"] + " 已完成，将重新获取场景"), null);
    } catch (_0x55a48a) {
      this.ckStatus = false;
      $.log("⛔️ 确认场景状态失败! " + _0x55a48a);
    }
  }
  async getSceneStartPageInfoById() {
    try {
      const _0x3f0ac3 = {
          url: "https://developer.aliyun.com/adc/api/getSceneStartPageInfoById",
          type: "get",
          params: {
            id: sceneId
          },
          headers: {
            cookie: this.headers.Cookie,
            referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId,
            "user-agent": this.headers["User-Agent"]
          }
        },
        _0x488836 = await this.fetch(_0x3f0ac3);
      ip = _0x488836?.["data"]?.["ip"];
      _0x488836?.["data"]?.["resourceFrom"]["indexOf"]("1") > -1 ? resourceFrom = "1" : resourceFrom = "2";
      _0x488836?.["data"]?.["resourceCardInfoDTOList"]["length"] && (sectionId = _0x488836?.["data"]?.["resourceCardInfoDTOList"][0]?.["id"]);
      $.log("✅ 获取场景初始化信息: " + sceneId);
    } catch (_0x46a0b2) {
      this.ckStatus = false;
      $.log("⛔️ 获取场景初始化信息失败! " + _0x46a0b2);
    }
  }
  async startSceneById(_0x261eb8) {
    try {
      const _0x2ac010 = {
          url: "https://developer.aliyun.com/adc/api/startSceneById",
          type: "post",
          dataType: "form",
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x261eb8,
            "X-XSRF-TOKEN": _0x261eb8,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          },
          params: {
            p_csrf: _0x261eb8
          },
          body: {
            id: sceneId,
            resourceFrom: resourceFrom
          }
        },
        _0x3bfb1d = await this.fetch(_0x2ac010),
        {
          code: _0x503983,
          message: _0x197cf2
        } = _0x3bfb1d;
      console.log((_0x503983 === "200" ? "✅" : "⛔️") + " 开始场景: " + sceneId + ", " + _0x197cf2);
    } catch (_0x439317) {
      this.ckStatus = false;
      $.log("⛔️ 开始场景失败! " + _0x439317);
    }
  }
  async closeSceneById(_0x2e9e46) {
    try {
      const _0x41bf4f = {
          url: "https://developer.aliyun.com/adc/api/closeSceneById",
          type: "post",
          dataType: "form",
          body: {
            sceneId: sceneId,
            forceClose: "true"
          },
          params: {
            p_csrf: _0x2e9e46
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x2e9e46,
            "X-XSRF-TOKEN": _0x2e9e46,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x5adcb5 = await this.fetch(_0x41bf4f),
        {
          code: _0x44ef95,
          message: _0x45ec67
        } = _0x5adcb5;
      console.log((_0x44ef95 === "200" ? "✅" : "⛔️") + " 结束场景: " + sceneId + ", " + _0x45ec67);
    } catch (_0xcb9087) {
      this.ckStatus = false;
      $.log("⛔️ 结束场景失败! " + _0xcb9087);
    }
  }
  async createResourceById(_0x3c7c8b) {
    try {
      const _0x2d1adc = {
          url: "https://developer.aliyun.com/adc/api/createResourceById",
          type: "post",
          dataType: "form",
          body: {
            id: sceneId,
            sectionId: sectionId,
            ip: ip
          },
          params: {
            p_csrf: _0x3c7c8b
          },
          headers: {
            Host: "developer.aliyun.com",
            H_csrf: _0x3c7c8b,
            "X-XSRF-TOKEN": _0x3c7c8b,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0x2c6c90 = await this.fetch(_0x2d1adc);
      _0x2c6c90?.["data"] && console.log("✅ 开始创建场景资源: " + sceneId);
    } catch (_0x1d9b4d) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x1d9b4d);
    }
  }
  async getResourceCardInfoById() {
    try {
      const _0x40952f = {
          url: "https://developer.aliyun.com/adc/api/getResourceCardInfoById",
          type: "get",
          params: {
            sceneId: sceneId,
            sectionId: sectionId
          },
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            Cookie: this.token,
            Referer: "https://developer.aliyun.com/adc/scenario/exp/" + sceneId
          }
        },
        _0xdcb18f = await this.fetch(_0x40952f),
        {
          code: _0x5e23b5,
          data: _0x317dd7
        } = _0xdcb18f;
      if (_0x5e23b5 === "200" && _0x317dd7) {
        if (_0x317dd7?.["status"] !== "RUNNING") {
          await $.wait(this.getRandomTime());
          await this.getResourceCardInfoById();
        } else {
          console.log("✅ 创建场景资源完毕: " + sceneId);
          return true;
        }
      }
    } catch (_0x479640) {
      this.ckStatus = false;
      $.log("⛔️ 创建场景资源失败! " + _0x479640);
    }
  }
  async getGroupItems() {
    try {
      const _0x1e71c7 = {
          url: "/lm/getGroupItems?pageNum=1&pageSize=50",
          type: "get"
        },
        _0x57f037 = await this.fetch(_0x1e71c7),
        {
          list: _0x43a2d1
        } = _0x57f037?.["data"];
      if (_0x43a2d1.length) {
        $.log("✅ 开始查询库存:");
        for (let _0x541f8f of _0x43a2d1) {
          $.log("🎁 " + _0x541f8f.itemTitle.replace(/【.*?】/g, "") + ": " + _0x541f8f.points + " 分【" + (_0x541f8f.status === 0 ? "可兑换" : "积分不足") + "】");
        }
      }
    } catch (_0x14c205) {
      $.log("⛔️ 查询待收获积分列表失败! " + _0x14c205);
    }
  }
  async interactData() {
    try {
      const _0x53853f = {
        url: "/my/score/getUserScore?appCode=developer",
        type: "get"
      };
      let _0x517834 = await this.fetch(_0x53853f);
      return _0x517834?.["data"];
    } catch (_0x2e9250) {
      $.log("⛔️ 查询待收获积分列表失败! " + _0x2e9250);
    }
  }
  async getUserTotalPendingScore() {
    try {
      const _0x41a394 = {
        url: "/score/pending/getUserTotalPendingScore?appCode=developer",
        type: "get"
      };
      let _0x44b8b2 = await this.fetch(_0x41a394);
      $.log("✅ 待领取积分: " + _0x44b8b2?.["data"]);
      return _0x44b8b2?.["data"];
    } catch (_0x54b1c7) {
      $.log("⛔️ 查询待领取积分失败! " + _0x54b1c7);
    }
  }
  async collect() {
    try {
      const _0x11bf4f = {
        url: "/score/pending/receiveAllPendingScore?appCode=developer",
        type: "get"
      };
      let _0x205caa = await this.fetch(_0x11bf4f);
      $.log("✅ 收取积分: " + _0x205caa?.["data"]);
      return _0x205caa?.["data"];
    } catch (_0x2c073f) {
      $.log("⛔️ 收取积分失败! " + _0x2c073f);
    }
  }
  async getUccCsrfToken() {
    try {
      const _0x3ff1f3 = {
        url: "https://ucc.aliyun.com/uccPagingComponent/getUser",
        type: "get",
        params: {
          uccCsrfToken: "",
          callback: getCallback()
        }
      };
      let _0x2c4e0b = await this.fetch(_0x3ff1f3);
      const _0x399c2a = _0x2c4e0b.indexOf("{"),
        _0xfdd279 = _0x2c4e0b.lastIndexOf("}"),
        _0x4a17ee = _0x2c4e0b.substring(_0x399c2a, _0xfdd279 + 1),
        _0x3cf503 = JSON.parse(_0x4a17ee);
      return _0x3cf503.data.uccCsrfToken;
    } catch (_0x3a6eff) {
      $.log("⛔️ 获取UccCsrfToken失败! " + _0x3a6eff);
    }
  }
}
function getCallback() {
  return "jsonp_" + Date.now() + "_" + Math.ceil(100000 * Math.random());
}
async function getCookie() {
  if ($request && $request.method === "OPTIONS") {
    return;
  }
  const _0xf4c92a = ObjectKeys2LowerCase($request.headers),
    _0x1ac2fc = _0xf4c92a.cookie,
    _0x163cf1 = $.toObj($response.body);
  if (!_0x163cf1?.["data"]) {
    $.msg($.name, "⛔️ 获取Cookie失败!", "");
    return;
  }
  const {
      nickname: _0x4110d7,
      avatar: _0x2d8e0a
    } = _0x163cf1?.["data"],
    _0x14bc52 = {
      userId: _0x4110d7,
      avatar: _0x2d8e0a,
      token: _0x1ac2fc,
      userName: _0x4110d7
    };
  userCookie = userCookie ? JSON.parse(userCookie) : [];
  const _0x514b1a = userCookie.findIndex(_0x28b35d => _0x28b35d.userId == _0x14bc52.userId);
  userCookie[_0x514b1a] ? userCookie[_0x514b1a] = _0x14bc52 : userCookie.push(_0x14bc52);
  $.setjson(userCookie, ckName);
  $.msg($.name, "🎉" + _0x14bc52.userName + "更新token成功!", "");
}
async function loadModule() {
  try {
    $.Cheerio = await loadCheerio();
    return $.Cheerio ? true : false;
  } catch (_0x5b54c6) {
    throw new Error("⛔️ loadModule run error => " + _0x5b54c6);
  }
}
async function checkEnv() {
  try {
    const _0x4f4daa = envSplitor.find(_0x307927 => userCookie.includes(_0x307927)) || envSplitor[0];
    userCookie = $.toObj(userCookie) || userCookie.split(_0x4f4daa);
    userList.push(...userCookie.map(_0x485907 => new UserInfo(_0x485907)).filter(Boolean));
    userCount = userList.length;
    console.log("共找到" + userCount + "个账号");
    return true;
  } catch (_0x549e81) {
    throw new Error("⛔️ checkEnv run error => " + _0x549e81);
  }
}
async function Request(_0x55bdc1) {
  if (typeof _0x55bdc1 === "string") {
    _0x55bdc1 = {
      url: _0x55bdc1
    };
  }
  try {
    if (!_0x55bdc1?.["url"]) {
      throw new Error("[发送请求] 缺少 url 参数");
    }
    let {
      url: _0x55e140,
      type: _0x2d2c43,
      headers = {},
      body: _0x30cf2d,
      params: _0x12f725,
      dataType = "form",
      resultType = "data"
    } = _0x55bdc1;
    const _0x97816e = _0x2d2c43 ? _0x2d2c43?.["toLowerCase"]() : "body" in _0x55bdc1 ? "post" : "get",
      _0x293b8c = _0x55e140.concat(_0x97816e === "post" ? "?" + $.queryStr(_0x12f725) : ""),
      _0x2d5146 = _0x55bdc1.timeout ? $.isSurge() ? _0x55bdc1.timeout / 1000 : _0x55bdc1.timeout : 10000;
    if (dataType === "json") {
      headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    const _0x35979a = _0x30cf2d && dataType == "form" ? $.queryStr(_0x30cf2d) : $.toStr(_0x30cf2d),
      _0x3cd2ec = {
        ..._0x55bdc1,
        ...(_0x55bdc1?.["opts"] ? _0x55bdc1.opts : {}),
        url: _0x293b8c,
        headers: headers,
        ...(_0x97816e === "post" && {
          body: _0x35979a
        }),
        ...(_0x97816e === "get" && _0x12f725 && {
          params: _0x12f725
        }),
        timeout: _0x2d5146
      },
      _0x1f2562 = $.http[_0x97816e.toLowerCase()](_0x3cd2ec).then(_0x1a02ba => resultType == "data" ? $.toObj(_0x1a02ba.body) || _0x1a02ba.body : $.toObj(_0x1a02ba) || _0x1a02ba).catch(_0x3fb56d => $.log("⛔️ 请求发起失败！原因为: " + _0x3fb56d));
    return Promise.race([new Promise((_0x536475, _0x244841) => setTimeout(() => _0x244841("当前请求已超时"), _0x2d5146)), _0x1f2562]);
  } catch (_0x546b8) {
    console.log("⛔️ 请求发起失败！原因为: " + _0x546b8);
  }
}
function randomInt(_0x165852, _0x1af416) {
  return Math.round(Math.random() * (_0x1af416 - _0x165852) + _0x165852);
}
function DoubleLog(_0x150676) {
  if (_0x150676 && $.isNode()) {
    console.log("" + _0x150676);
    $.notifyMsg.push("" + _0x150676);
  } else {
    _0x150676 && (console.log("" + _0x150676), $.notifyMsg.push("" + _0x150676));
  }
}
function debug(_0x7f9ee6, _0x4dc3d3 = "debug") {
  $.is_debug === "true" && ($.log("\n-----------" + _0x4dc3d3 + "------------\n"), $.log(typeof _0x7f9ee6 == "string" ? _0x7f9ee6 : $.toStr(_0x7f9ee6) || "debug error => t=" + _0x7f9ee6), $.log("\n-----------" + _0x4dc3d3 + "------------\n"));
}
async function SendMsgList(_0x4d9f49) {
  await Promise.allSettled(_0x4d9f49?.["map"](_0x2c5824 => SendMsg(_0x2c5824.message.join("\n"), _0x2c5824.avatar)));
}
async function SendMsg(_0x590eea, _0xcc749c) {
  _0x590eea && (0 < Notify ? $.isNode() ? await notify.sendNotify($.name, _0x590eea) : $.msg($.name, $.title || "", _0x590eea, {
    "media-url": _0xcc749c
  }) : console.log(_0x590eea));
}
function ObjectKeys2LowerCase(_0x45dd99) {
  _0x45dd99 = Object.fromEntries(Object.entries(_0x45dd99).map(([_0x52adc4, _0x109784]) => [_0x52adc4.toLowerCase(), _0x109784]));
  return new Proxy(_0x45dd99, {
    get: function (_0x492077, _0x5f15d2, _0x109abd) {
      return Reflect.get(_0x492077, _0x5f15d2.toLowerCase(), _0x109abd);
    },
    set: function (_0x15b944, _0x44d833, _0x597ce5, _0x333946) {
      return Reflect.set(_0x15b944, _0x44d833.toLowerCase(), _0x597ce5, _0x333946);
    }
  });
}
async function loadCheerio() {
  let _0x162def = ($.isNode() ? process.env.Cheerio_code : $.getdata("Cheerio_code")) || "";
  if (_0x162def && Object.keys(_0x162def).length) {
    console.log("✅" + $.name + ":缓存中存在Cheerio模块,跳过下载");
    eval(_0x162def);
    return createCheerio();
  }
  console.log("🚀" + $.name + ":开始下载Cheerio模块");
  return new Promise(async _0x3321a0 => {
    $.getScript("https://mirror.ghproxy.com/https://raw.githubusercontent.com/Yuheng0101/X/main/Utils/cheerio.js").then(_0x2fca4e => {
      $.setdata(_0x2fca4e, "Cheerio_code");
      eval(_0x2fca4e);
      const _0x591abf = createCheerio();
      console.log("✅Cheerio模块加载成功,请继续");
      _0x3321a0(_0x591abf);
    });
  });
}
!(async () => {
  if (typeof $request != "undefined") {
    await getCookie();
  } else {
    if (!(await loadModule())) {
      throw new Error("⛔️ 加载模块失败，请检查模块路径是否正常");
    }
    if (!(await checkEnv())) {
      throw new Error("⛔️ 未检测到ck，请添加环境变量");
    }
    if (userList.length > 0) {
      await main();
    }
  }
})().catch(_0x524eeb => $.notifyMsg.push(_0x524eeb.message || _0x524eeb)).finally(async () => {
  await SendMsgList($.notifyList);
  $.done({
    ok: 1
  });
});
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, r) => {
        s.call(this, t, (t, s, a) => {
          t ? r(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t)) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, r) => e(r));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        r = r ? r.replace(/\n/g, "").trim() : r;
        let a = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        a = a ? 1 * a : 20;
        a = e && e.timeout ? e.timeout : a;
        const [i, o] = r.split("@"),
          n = {
            url: `http://${o}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: a
            },
            headers: {
              "X-Key": i,
              Accept: "*/*"
            },
            timeout: a
          };
        this.post(n, (t, e, r) => s(r));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          r = !s && this.fs.existsSync(e);
        if (!s && !r) {
          return {};
        }
        {
          const r = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(r));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          r = !s && this.fs.existsSync(e),
          a = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, a) : r ? this.fs.writeFileSync(e, a) : this.fs.writeFileSync(t, a);
      }
    }
    lodash_get(t, e, s = void 0) {
      const r = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let a = t;
      for (const t of r) if (a = Object(a)[t], void 0 === a) {
        return s;
      }
      return a;
    }
    lodash_set(t, e, s) {
      Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, r) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[r + 1]) >> 0 == +e[r + 1] ? [] : {}, t)[e[e.length - 1]] = s);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, r] = /^@(.*?)\.(.*?)$/.exec(t),
          a = s ? this.getval(s) : "";
        if (a) {
          try {
            const t = JSON.parse(a);
            e = t ? this.lodash_get(t, r, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, r, a] = /^@(.*?)\.(.*?)$/.exec(e),
          i = this.getval(r),
          o = r ? "null" === i ? null : i || "{}" : "{}";
        try {
          const e = JSON.parse(o);
          this.lodash_set(e, a, t);
          s = this.setval(JSON.stringify(e), r);
        } catch (e) {
          const i = {};
          this.lodash_set(i, a, t);
          s = this.setval(JSON.stringify(i), r);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.get(t, (t, s, r) => {
            !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, r);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let s = require("iconv-lite");
          this.initGotEnv(t);
          this.got(t).on("redirect", (t, e) => {
            try {
              if (t.headers["set-cookie"]) {
                const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                s && this.ckjar.setCookieSync(s, null);
                e.cookieJar = this.ckjar;
              }
            } catch (t) {
              this.logErr(t);
            }
          }).then(t => {
            const {
                statusCode: r,
                statusCode: a,
                headers: i,
                rawBody: o
              } = t,
              n = s.decode(o, this.encoding);
            e(null, {
              status: r,
              statusCode: a,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: r,
              response: a
            } = t;
            e(r, a, a && s.decode(a.rawBody, this.encoding));
          });
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient[s](t, (t, s, r) => {
            !t && s && (s.body = r, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, r);
          });
          break;
        case "Quantumult X":
          t.method = s;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            } = t;
            e(null, {
              status: s,
              statusCode: r,
              headers: a,
              body: i,
              bodyBytes: o
            }, i, o);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let r = require("iconv-lite");
          this.initGotEnv(t);
          const {
            url: a,
            ...i
          } = t;
          this.got[s](a, i).then(t => {
            const {
                statusCode: s,
                statusCode: a,
                headers: i,
                rawBody: o
              } = t,
              n = r.decode(o, this.encoding);
            e(null, {
              status: s,
              statusCode: a,
              headers: i,
              rawBody: o,
              body: n
            }, n);
          }, t => {
            const {
              message: s,
              response: a
            } = t;
            e(s, a, a && r.decode(a.rawBody, this.encoding));
          });
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let r = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in r) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[e] : ("00" + r[e]).substr(("" + r[e]).length)));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let r = t[s];
        null != r && "" !== r && ("object" == typeof r && (r = JSON.stringify(r)), e += `${s}=${r}&`);
      }
      e = e.substring(0, e.length - 1);
      return e;
    }
    msg(e = t, s = "", r = "", a) {
      const i = t => {
        switch (typeof t) {
          case void 0:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                return {
                  url: t
                };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return {
                  "open-url": t
                };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                return {
                  url: t.url || t.openUrl || t["open-url"]
                };
              case "Loon":
                return {
                  openUrl: t.openUrl || t.url || t["open-url"],
                  mediaUrl: t.mediaUrl || t["media-url"]
                };
              case "Quantumult X":
                return {
                  "open-url": t["open-url"] || t.url || t.openUrl,
                  "media-url": t["media-url"] || t.mediaUrl,
                  "update-pasteboard": t["update-pasteboard"] || t.updatePasteboard
                };
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(e, s, r, i(a));
            break;
          case "Quantumult X":
            $notify(e, s, r, i(a));
          case "Node.js":
        }
      }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        r && t.push(r);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, t.stack);
      }
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(t, e);
}