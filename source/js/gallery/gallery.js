!(function (e) {
  (e.fn.navList = function () {
    var t = e(this);
    return (
      ($a = t.find("a")),
      (b = []),
      $a.each(function () {
        var t = e(this),
          a = Math.max(0, t.parents("li").length - 1),
          i = t.attr("href"),
          o = t.attr("target");
        b.push(
          '<a class="link depth-' +
            a +
            '"' +
            ("undefined" != typeof o && "" != o ? ' target="' + o + '"' : "") +
            ("undefined" != typeof i && "" != i ? ' href="' + i + '"' : "") +
            '><span class="indent-' +
            a +
            '"></span>' +
            t.text() +
            "</a>",
        );
      }),
      b.join("")
    );
  }),
    (e.fn.panel = function (t) {
      if (0 == this.length) {
        return i;
      }
      if (this.length > 1) {
        for (var a = 0; a < this.length; a++) {
          e(this[a]).panel(t);
        }
        return i;
      }
      var l,
        i = e(this),
        o = e("body"),
        n = e(window),
        r = i.attr("id");
      return (
        (l = e.extend(
          {
            delay: 0,
            hideOnClick: !1,
            hideOnEscape: !1,
            hideOnSwipe: !1,
            resetScroll: !1,
            resetForms: !1,
            side: null,
            target: i,
            visibleClass: "visible",
          },
          t,
        )),
        "jQuery" != typeof l.target && (l.target = e(l.target)),
        (i._hide = function (e) {
          l.target.hasClass(l.visibleClass) &&
            (e && (e.preventDefault(), e.stopPropagation()),
            l.target.removeClass(l.visibleClass),
            window.setTimeout(function () {
              l.resetScroll && i.scrollTop(0),
                l.resetForms &&
                  i.find("form").each(function () {
                    this.reset();
                  });
            }, l.delay));
        }),
        i
          .css("-ms-overflow-style", "-ms-autohiding-scrollbar")
          .css("-webkit-overflow-scrolling", "touch"),
        l.hideOnClick &&
          (i.find("a").css("-webkit-tap-highlight-color", "rgba(0,0,0,0)"),
          i.on("click", "a", function (t) {
            var a = e(this),
              o = a.attr("href"),
              n = a.attr("target");
            o &&
              "#" != o &&
              "" != o &&
              o != "#" + r &&
              (t.preventDefault(),
              t.stopPropagation(),
              i._hide(),
              window.setTimeout(function () {
                "_blank" == n ? window.open(o) : (window.location.href = o);
              }, l.delay + 10));
          })),
        i.on("touchstart", function (e) {
          (i.touchPosX = e.originalEvent.touches[0].pageX),
            (i.touchPosY = e.originalEvent.touches[0].pageY);
        }),
        i.on("touchmove", function (e) {
          if (null !== i.touchPosX && null !== i.touchPosY) {
            var t = i.touchPosX - e.originalEvent.touches[0].pageX,
              a = i.touchPosY - e.originalEvent.touches[0].pageY,
              o = i.outerHeight(),
              n = i.get(0).scrollHeight - i.scrollTop();
            if (l.hideOnSwipe) {
              var r = !1,
                s = 20,
                c = 50;
              switch (l.side) {
                case "left":
                  r = s > a && a > -1 * s && t > c;
                  break;
                case "right":
                  r = s > a && a > -1 * s && -1 * c > t;
                  break;
                case "top":
                  r = s > t && t > -1 * s && a > c;
                  break;
                case "bottom":
                  r = s > t && t > -1 * s && -1 * c > a;
              }
              if (r) {
                return (
                  (i.touchPosX = null), (i.touchPosY = null), i._hide(), !1
                );
              }
            }
            ((i.scrollTop() < 0 && 0 > a) ||
              (n > o - 2 && o + 2 > n && a > 0)) &&
              (e.preventDefault(), e.stopPropagation());
          }
        }),
        i.on("click touchend touchstart touchmove", function (e) {
          e.stopPropagation();
        }),
        i.on("click", 'a[href="#' + r + '"]', function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            l.target.removeClass(l.visibleClass);
        }),
        o.on("click touchend", function (e) {
          i._hide(e);
        }),
        o.on("click", 'a[href="#' + r + '"]', function (e) {
          e.preventDefault(),
            e.stopPropagation(),
            l.target.toggleClass(l.visibleClass);
        }),
        l.hideOnEscape &&
          n.on("keydown", function (e) {
            27 == e.keyCode && i._hide(e);
          }),
        i
      );
    }),
    (e.fn.placeholder = function () {
      if ("undefined" != typeof document.createElement("input").placeholder) {
        return e(this);
      }
      if (0 == this.length) {
        return a;
      }
      if (this.length > 1) {
        for (var t = 0; t < this.length; t++) {
          e(this[t]).placeholder();
        }
        return a;
      }
      var a = e(this);
      return (
        a
          .find("input[type=text],textarea")
          .each(function () {
            var t = e(this);
            ("" == t.val() || t.val() == t.attr("placeholder")) &&
              t.addClass("polyfill-placeholder").val(t.attr("placeholder"));
          })
          .on("blur", function () {
            var t = e(this);
            t.attr("name").match(/-polyfill-field$/) ||
              ("" == t.val() &&
                t.addClass("polyfill-placeholder").val(t.attr("placeholder")));
          })
          .on("focus", function () {
            var t = e(this);
            t.attr("name").match(/-polyfill-field$/) ||
              (t.val() == t.attr("placeholder") &&
                t.removeClass("polyfill-placeholder").val(""));
          }),
        a.find("input[type=password]").each(function () {
          var t = e(this),
            a = e(
              e("<div>")
                .append(t.clone())
                .remove()
                .html()
                .replace(/type="password"/i, 'type="text"')
                .replace(/type=password/i, "type=text"),
            );
          "" != t.attr("id") && a.attr("id", t.attr("id") + "-polyfill-field"),
            "" != t.attr("name") &&
              a.attr("name", t.attr("name") + "-polyfill-field"),
            a
              .addClass("polyfill-placeholder")
              .val(a.attr("placeholder"))
              .insertAfter(t),
            "" == t.val() ? t.hide() : a.hide(),
            t.on("blur", function (e) {
              e.preventDefault();
              var a = t
                .parent()
                .find("input[name=" + t.attr("name") + "-polyfill-field]");
              "" == t.val() && (t.hide(), a.show());
            }),
            a
              .on("focus", function (e) {
                e.preventDefault();
                var t = a
                  .parent()
                  .find(
                    "input[name=" +
                      a.attr("name").replace("-polyfill-field", "") +
                      "]",
                  );
                a.hide(), t.show().focus();
              })
              .on("keypress", function (e) {
                e.preventDefault(), a.val("");
              });
        }),
        a
          .on("submit", function () {
            a.find("input[type=text],input[type=password],textarea").each(
              function (t) {
                var a = e(this);
                a.attr("name").match(/-polyfill-field$/) && a.attr("name", ""),
                  a.val() == a.attr("placeholder") &&
                    (a.removeClass("polyfill-placeholder"), a.val(""));
              },
            );
          })
          .on("reset", function (t) {
            t.preventDefault(),
              a.find("select").val(e("option:first").val()),
              a.find("input,textarea").each(function () {
                var a,
                  t = e(this);
                switch ((t.removeClass("polyfill-placeholder"), this.type)) {
                  case "submit":
                  case "reset":
                    break;
                  case "password":
                    t.val(t.attr("defaultValue")),
                      (a = t
                        .parent()
                        .find(
                          "input[name=" + t.attr("name") + "-polyfill-field]",
                        )),
                      "" == t.val()
                        ? (t.hide(), a.show())
                        : (t.show(), a.hide());
                    break;
                  case "checkbox":
                  case "radio":
                    t.attr("checked", t.attr("defaultValue"));
                    break;
                  case "text":
                  case "textarea":
                    t.val(t.attr("defaultValue")),
                      "" == t.val() &&
                        (t.addClass("polyfill-placeholder"),
                        t.val(t.attr("placeholder")));
                    break;
                  default:
                    t.val(t.attr("defaultValue"));
                }
              });
          }),
        a
      );
    }),
    (e.prioritize = function (t, a) {
      var i = "__prioritize";
      "jQuery" != typeof t && (t = e(t)),
        t.each(function () {
          var o,
            t = e(this),
            n = t.parent();
          if (0 != n.length) {
            if (t.data(i)) {
              if (a) {
                return;
              }
              (o = t.data(i)), t.insertAfter(o), t.removeData(i);
            } else {
              if (!a) {
                return;
              }
              if (((o = t.prev()), 0 == o.length)) {
                return;
              }
              t.prependTo(n), t.data(i, o);
            }
          }
        });
    });
})(jQuery);
var skel = (function () {
  var t = {
    breakpointIds: null,
    events: {},
    isInit: !1,
    obj: { attachments: {}, breakpoints: {}, head: null, states: {} },
    sd: "/",
    state: null,
    stateHandlers: {},
    stateId: "",
    vars: {},
    DOMReady: null,
    indexOf: null,
    isArray: null,
    iterate: null,
    matchesMedia: null,
    extend: function (e, n) {
      t.iterate(n, function (i) {
        t.isArray(n[i])
          ? (t.isArray(e[i]) || (e[i] = []), t.extend(e[i], n[i]))
          : "object" == typeof n[i]
            ? ("object" != typeof e[i] && (e[i] = {}), t.extend(e[i], n[i]))
            : (e[i] = n[i]);
      });
    },
    newStyle: function (t) {
      var e = document.createElement("style");
      return (e.type = "text/css"), (e.innerHTML = t), e;
    },
    _canUse: null,
    canUse: function (e) {
      t._canUse || (t._canUse = document.createElement("div"));
      var n = t._canUse.style,
        i = e.charAt(0).toUpperCase() + e.slice(1);
      return (
        e in n ||
        "Moz" + i in n ||
        "Webkit" + i in n ||
        "O" + i in n ||
        "ms" + i in n
      );
    },
    on: function (e, n) {
      var i = e.split(/[\s]+/);
      return (
        t.iterate(i, function (e) {
          var a = i[e];
          if (t.isInit) {
            if ("init" == a) {
              return void n();
            }
            if ("change" == a) {
              n();
            } else {
              var r = a.charAt(0);
              if ("+" == r || "!" == r) {
                var o = a.substring(1);
                if (o in t.obj.breakpoints) {
                  if ("+" == r && t.obj.breakpoints[o].active) {
                    n();
                  } else {
                    if ("!" == r && !t.obj.breakpoints[o].active) {
                      return void n();
                    }
                  }
                }
              }
            }
          }
          t.events[a] || (t.events[a] = []), t.events[a].push(n);
        }),
        t
      );
    },
    trigger: function (e) {
      return t.events[e] && 0 != t.events[e].length
        ? (t.iterate(t.events[e], function (n) {
            t.events[e][n]();
          }),
          t)
        : void 0;
    },
    breakpoint: function (e) {
      return t.obj.breakpoints[e];
    },
    breakpoints: function (e) {
      function n(t, e) {
        (this.name = this.id = t),
          (this.media = e),
          (this.active = !1),
          (this.wasActive = !1);
      }
      return (
        (n.prototype.matches = function () {
          return t.matchesMedia(this.media);
        }),
        (n.prototype.sync = function () {
          (this.wasActive = this.active), (this.active = this.matches());
        }),
        t.iterate(e, function (i) {
          t.obj.breakpoints[i] = new n(i, e[i]);
        }),
        window.setTimeout(function () {
          t.poll();
        }, 0),
        t
      );
    },
    addStateHandler: function (e, n) {
      t.stateHandlers[e] = n;
    },
    callStateHandler: function (e) {
      var n = t.stateHandlers[e]();
      t.iterate(n, function (e) {
        t.state.attachments.push(n[e]);
      });
    },
    changeState: function (e) {
      t.iterate(t.obj.breakpoints, function (e) {
        t.obj.breakpoints[e].sync();
      }),
        (t.vars.lastStateId = t.stateId),
        (t.stateId = e),
        (t.breakpointIds =
          t.stateId === t.sd ? [] : t.stateId.substring(1).split(t.sd)),
        t.obj.states[t.stateId]
          ? (t.state = t.obj.states[t.stateId])
          : ((t.obj.states[t.stateId] = { attachments: [] }),
            (t.state = t.obj.states[t.stateId]),
            t.iterate(t.stateHandlers, t.callStateHandler)),
        t.detachAll(t.state.attachments),
        t.attachAll(t.state.attachments),
        (t.vars.stateId = t.stateId),
        (t.vars.state = t.state),
        t.trigger("change"),
        t.iterate(t.obj.breakpoints, function (e) {
          t.obj.breakpoints[e].active
            ? t.obj.breakpoints[e].wasActive || t.trigger("+" + e)
            : t.obj.breakpoints[e].wasActive && t.trigger("-" + e);
        });
    },
    generateStateConfig: function (e, n) {
      var i = {};
      return (
        t.extend(i, e),
        t.iterate(t.breakpointIds, function (e) {
          t.extend(i, n[t.breakpointIds[e]]);
        }),
        i
      );
    },
    getStateId: function () {
      var e = "";
      return (
        t.iterate(t.obj.breakpoints, function (n) {
          var i = t.obj.breakpoints[n];
          i.matches() && (e += t.sd + i.id);
        }),
        e
      );
    },
    poll: function () {
      var e = "";
      (e = t.getStateId()),
        "" === e && (e = t.sd),
        e !== t.stateId && t.changeState(e);
    },
    _attach: null,
    attach: function (e) {
      var n = t.obj.head,
        i = e.element;
      return i.parentNode && i.parentNode.tagName
        ? !1
        : (t._attach || (t._attach = n.firstChild),
          n.insertBefore(i, t._attach.nextSibling),
          e.permanent && (t._attach = i),
          !0);
    },
    attachAll: function (e) {
      var n = [];
      t.iterate(e, function (t) {
        n[e[t].priority] || (n[e[t].priority] = []),
          n[e[t].priority].push(e[t]);
      }),
        n.reverse(),
        t.iterate(n, function (e) {
          t.iterate(n[e], function (i) {
            t.attach(n[e][i]);
          });
        });
    },
    detach: function (t) {
      var e = t.element;
      return t.permanent ||
        !e.parentNode ||
        (e.parentNode && !e.parentNode.tagName)
        ? !1
        : (e.parentNode.removeChild(e), !0);
    },
    detachAll: function (e) {
      var n = {};
      t.iterate(e, function (t) {
        n[e[t].id] = !0;
      }),
        t.iterate(t.obj.attachments, function (e) {
          e in n || t.detach(t.obj.attachments[e]);
        });
    },
    attachment: function (e) {
      return e in t.obj.attachments ? t.obj.attachments[e] : null;
    },
    newAttachment: function (e, n, i, a) {
      return (t.obj.attachments[e] = {
        id: e,
        element: n,
        priority: i,
        permanent: a,
      });
    },
    init: function () {
      t.initMethods(),
        t.initVars(),
        t.initEvents(),
        (t.obj.head = document.getElementsByTagName("head")[0]),
        (t.isInit = !0),
        t.trigger("init");
    },
    initEvents: function () {
      t.on("resize", function () {
        t.poll();
      }),
        t.on("orientationChange", function () {
          t.poll();
        }),
        t.DOMReady(function () {
          t.trigger("ready");
        }),
        window.onload && t.on("load", window.onload),
        (window.onload = function () {
          t.trigger("load");
        }),
        window.onresize && t.on("resize", window.onresize),
        (window.onresize = function () {
          t.trigger("resize");
        }),
        window.onorientationchange &&
          t.on("orientationChange", window.onorientationchange),
        (window.onorientationchange = function () {
          t.trigger("orientationChange");
        });
    },
    initMethods: function () {
      document.addEventListener
        ? !(function (e, n) {
            t.DOMReady = n();
          })("domready", function () {
            function t(t) {
              for (r = 1; (t = n.shift()); ) {
                t();
              }
            }
            var e,
              n = [],
              i = document,
              a = "DOMContentLoaded",
              r = /^loaded|^c/.test(i.readyState);
            return (
              i.addEventListener(
                a,
                (e = function () {
                  i.removeEventListener(a, e), t();
                }),
              ),
              function (t) {
                r ? t() : n.push(t);
              }
            );
          })
        : !(function (e, n) {
            t.DOMReady = n();
          })("domready", function (t) {
            function e(t) {
              for (h = 1; (t = i.shift()); ) {
                t();
              }
            }
            var n,
              i = [],
              a = !1,
              r = document,
              o = r.documentElement,
              s = o.doScroll,
              c = "DOMContentLoaded",
              d = "addEventListener",
              u = "onreadystatechange",
              l = "readyState",
              f = s ? /^loaded|^c/ : /^loaded|c/,
              h = f.test(r[l]);
            return (
              r[d] &&
                r[d](
                  c,
                  (n = function () {
                    r.removeEventListener(c, n, a), e();
                  }),
                  a,
                ),
              s &&
                r.attachEvent(
                  u,
                  (n = function () {
                    /^c/.test(r[l]) && (r.detachEvent(u, n), e());
                  }),
                ),
              (t = s
                ? function (e) {
                    self != top
                      ? h
                        ? e()
                        : i.push(e)
                      : (function () {
                          try {
                            o.doScroll("left");
                          } catch (n) {
                            return setTimeout(function () {
                              t(e);
                            }, 50);
                          }
                          e();
                        })();
                  }
                : function (t) {
                    h ? t() : i.push(t);
                  })
            );
          }),
        Array.prototype.indexOf
          ? (t.indexOf = function (t, e) {
              return t.indexOf(e);
            })
          : (t.indexOf = function (t, e) {
              if ("string" == typeof t) {
                return t.indexOf(e);
              }
              var n,
                i,
                a = e ? e : 0;
              if (!this) {
                throw new TypeError();
              }
              if (((i = this.length), 0 === i || a >= i)) {
                return -1;
              }
              for (0 > a && (a = i - Math.abs(a)), n = a; i > n; n++) {
                if (this[n] === t) {
                  return n;
                }
              }
              return -1;
            }),
        Array.isArray
          ? (t.isArray = function (t) {
              return Array.isArray(t);
            })
          : (t.isArray = function (t) {
              return "[object Array]" === Object.prototype.toString.call(t);
            }),
        Object.keys
          ? (t.iterate = function (t, e) {
              if (!t) {
                return [];
              }
              var n,
                i = Object.keys(t);
              for (n = 0; i[n] && e(i[n], t[i[n]]) !== !1; n++) {}
            })
          : (t.iterate = function (t, e) {
              if (!t) {
                return [];
              }
              var n;
              for (n in t) {
                if (
                  Object.prototype.hasOwnProperty.call(t, n) &&
                  e(n, t[n]) === !1
                ) {
                  break;
                }
              }
            }),
        window.matchMedia
          ? (t.matchesMedia = function (t) {
              return "" == t ? !0 : window.matchMedia(t).matches;
            })
          : window.styleMedia || window.media
            ? (t.matchesMedia = function (t) {
                if ("" == t) {
                  return !0;
                }
                var e = window.styleMedia || window.media;
                return e.matchMedium(t || "all");
              })
            : window.getComputedStyle
              ? (t.matchesMedia = function (t) {
                  if ("" == t) {
                    return !0;
                  }
                  var e = document.createElement("style"),
                    n = document.getElementsByTagName("script")[0],
                    i = null;
                  (e.type = "text/css"),
                    (e.id = "matchmediajs-test"),
                    n.parentNode.insertBefore(e, n),
                    (i =
                      ("getComputedStyle" in window &&
                        window.getComputedStyle(e, null)) ||
                      e.currentStyle);
                  var a =
                    "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                  return (
                    e.styleSheet
                      ? (e.styleSheet.cssText = a)
                      : (e.textContent = a),
                    "1px" === i.width
                  );
                })
              : (t.matchesMedia = function (t) {
                  if ("" == t) {
                    return !0;
                  }
                  var e,
                    n,
                    i,
                    a,
                    r = { "min-width": null, "max-width": null },
                    o = !1;
                  for (i = t.split(/\s+and\s+/), e = 0; e < i.length; e++) {
                    (n = i[e]),
                      "(" == n.charAt(0) &&
                        ((n = n.substring(1, n.length - 1)),
                        (a = n.split(/:\s+/)),
                        2 == a.length &&
                          ((r[a[0].replace(/^\s+|\s+$/g, "")] = parseInt(a[1])),
                          (o = !0)));
                  }
                  if (!o) {
                    return !1;
                  }
                  var s = document.documentElement.clientWidth,
                    c = document.documentElement.clientHeight;
                  return (null !== r["min-width"] && s < r["min-width"]) ||
                    (null !== r["max-width"] && s > r["max-width"]) ||
                    (null !== r["min-height"] && c < r["min-height"]) ||
                    (null !== r["max-height"] && c > r["max-height"])
                    ? !1
                    : !0;
                }),
        navigator.userAgent.match(/MSIE ([0-9]+)/) &&
          RegExp.$1 < 9 &&
          (t.newStyle = function (t) {
            var e = document.createElement("span");
            return (
              (e.innerHTML = '&nbsp;<style type="text/css">' + t + "</style>"),
              e
            );
          });
    },
    initVars: function () {
      var e,
        n,
        i,
        a = navigator.userAgent;
      (e = "other"),
        (n = 0),
        (i = [
          ["firefox", /Firefox\/([0-9\.]+)/],
          ["bb", /BlackBerry.+Version\/([0-9\.]+)/],
          ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/],
          ["opera", /OPR\/([0-9\.]+)/],
          ["opera", /Opera\/([0-9\.]+)/],
          ["edge", /Edge\/([0-9\.]+)/],
          ["safari", /Version\/([0-9\.]+).+Safari/],
          ["chrome", /Chrome\/([0-9\.]+)/],
          ["ie", /MSIE ([0-9]+)/],
          ["ie", /Trident\/.+rv:([0-9]+)/],
        ]),
        t.iterate(i, function (t, i) {
          return a.match(i[1])
            ? ((e = i[0]), (n = parseFloat(RegExp.$1)), !1)
            : void 0;
        }),
        (t.vars.browser = e),
        (t.vars.browserVersion = n),
        (e = "other"),
        (n = 0),
        (i = [
          [
            "ios",
            /([0-9_]+) like Mac OS X/,
            function (t) {
              return t.replace("_", ".").replace("_", "");
            },
          ],
          [
            "ios",
            /CPU like Mac OS X/,
            function (t) {
              return 0;
            },
          ],
          ["wp", /Windows Phone ([0-9\.]+)/, null],
          ["android", /Android ([0-9\.]+)/, null],
          [
            "mac",
            /Macintosh.+Mac OS X ([0-9_]+)/,
            function (t) {
              return t.replace("_", ".").replace("_", "");
            },
          ],
          ["windows", /Windows NT ([0-9\.]+)/, null],
          ["bb", /BlackBerry.+Version\/([0-9\.]+)/, null],
          ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/, null],
        ]),
        t.iterate(i, function (t, i) {
          return a.match(i[1])
            ? ((e = i[0]),
              (n = parseFloat(i[2] ? i[2](RegExp.$1) : RegExp.$1)),
              !1)
            : void 0;
        }),
        (t.vars.os = e),
        (t.vars.osVersion = n),
        (t.vars.IEVersion =
          "ie" == t.vars.browser ? t.vars.browserVersion : 99),
        (t.vars.touch =
          "wp" == t.vars.os
            ? navigator.msMaxTouchPoints > 0
            : !!("ontouchstart" in window)),
        (t.vars.mobile =
          "wp" == t.vars.os ||
          "android" == t.vars.os ||
          "ios" == t.vars.os ||
          "bb" == t.vars.os);
    },
  };
  return t.init(), t;
})();
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
      ? (module.exports = e())
      : (t.skel = e());
})(this, function () {
  return skel;
});
!(function (e) {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)",
  }),
    e(function () {
      var o = e(window),
        i = e("body");
      e("#wrapper");
      if (
        (skel.vars.IEVersion < 12 && i.addClass("ie"),
        skel.vars.mobile && i.addClass("touch"),
        skel.canUse("transition"))
      ) {
        i.addClass("loading"),
          o.on("load", function () {
            window.setTimeout(function () {
              i.removeClass("loading");
            }, 100);
          });
        var t;
        o.on("resize", function () {
          window.clearTimeout(t),
            i.addClass("resizing"),
            (t = window.setTimeout(function () {
              i.removeClass("resizing");
            }, 100));
        });
      }
      o.scrollTop(0), e("form").placeholder();
      var a = e(".panel");
      a.each(function () {
        var o = e(this),
          n = e('[href="#' + o.attr("id") + '"]'),
          t = e('<div class="closer" />').appendTo(o);
        t.on("click", function (e) {
          o.trigger("---hide");
        }),
          o
            .on("click", function (e) {
              e.stopPropagation();
            })
            .on("---toggle", function () {
              o.hasClass("active")
                ? o.triggerHandler("---hide")
                : o.triggerHandler("---show");
            })
            .on("---show", function () {
              i.hasClass("content-active") && a.trigger("---hide"),
                o.addClass("active"),
                n.addClass("active"),
                i.addClass("content-active");
            })
            .on("---hide", function () {
              o.removeClass("active"),
                n.removeClass("active"),
                i.removeClass("content-active");
            }),
          n
            .removeAttr("href")
            .css("cursor", "pointer")
            .on("click", function (e) {
              e.preventDefault(), e.stopPropagation(), o.trigger("---toggle");
            });
      }),
        i.on("click", function (e) {
          i.hasClass("content-active") &&
            (e.preventDefault(), e.stopPropagation(), a.trigger("---hide"));
        }),
        o.on("keyup", function (e) {
          27 == e.keyCode &&
            i.hasClass("content-active") &&
            (e.preventDefault(), e.stopPropagation(), a.trigger("---hide"));
        });
      var r = e("#header");
      r.find("a").each(function () {
        var o = e(this),
          i = o.attr("href");
        i &&
          "#" != i.charAt(0) &&
          o
            .removeAttr("href")
            .css("cursor", "pointer")
            .on("click", function (e) {
              e.preventDefault(),
                e.stopPropagation(),
                (window.location.href = i);
            });
      });
      var s = e("#footer");
      s.find(".copyright").each(function () {
        var o = e(this),
          i = o.parent(),
          n = i.parent().children().last();
        skel
          .on("+medium", function () {
            o.appendTo(n);
          })
          .on("-medium", function () {
            o.appendTo(i);
          });
      });
      var c = e("#main");
      c.children(".thumb").each(function () {
        var t,
          o = e(this),
          i = o.find(".image"),
          n = i.children("img");
        0 != i.length &&
          ((t = n.data("position")) && i.css("background-position", t),
          n.hide(),
          skel.vars.IEVersion < 11 &&
            o.css("cursor", "pointer").on("click", function () {
              i.trigger("click");
            }));
      }),
        c.poptrox({
          baseZIndex: 20000,
          caption: function (e) {
            var o = "";
            return (
              e.nextAll().each(function () {
                o += this.outerHTML;
              }),
              o
            );
          },
          fadeSpeed: 300,
          onPopupClose: function () {
            i.removeClass("modal-active");
          },
          onPopupOpen: function () {
            i.addClass("modal-active");
          },
          overlayOpacity: 0,
          popupCloserText: "",
          popupHeight: 150,
          popupLoaderText: "",
          popupSpeed: 300,
          popupWidth: 150,
          selector: ".thumb > a.image",
          usePopupCaption: !0,
          usePopupCloser: !0,
          usePopupDefaultStyling: !1,
          usePopupForceClose: !0,
          usePopupLoader: !0,
          usePopupNav: !0,
          windowMargin: 50,
        }),
        skel
          .on("-xsmall", function () {
            c[0]._poptrox.windowMargin = 50;
          })
          .on("+xsmall", function () {
            c[0]._poptrox.windowMargin = 0;
          });
    });
})(jQuery);
!(function (e) {
  (e.fn.poptrox_disableSelection = function () {
    return e(this)
      .css("user-select", "none")
      .css("-khtml-user-select", "none")
      .css("-moz-user-select", "none")
      .css("-o-user-select", "none")
      .css("-webkit-user-select", "none");
  }),
    (e.fn.poptrox = function (o) {
      function t() {
        (i = e(window).width()), (s = e(window).height() + r.windowHeightPad);
        var o = Math.abs(x.width() - x.outerWidth()),
          t = Math.abs(x.height() - x.outerHeight()),
          p = (w.width(), w.height(), i - 2 * r.windowMargin - o),
          n = s - 2 * r.windowMargin - t;
        x.css("min-width", r.popupWidth).css("min-height", r.popupHeight),
          v.children().css("max-width", p).css("max-height", n);
      }
      if (0 == this.length) {
        return e(this);
      }
      if (this.length > 1) {
        for (var p = 0; p < this.length; p++) {
          e(this[p]).poptrox(o);
        }
        return e(this);
      }
      var i,
        s,
        r = e.extend(
          {
            preload: !1,
            baseZIndex: 1000,
            fadeSpeed: 300,
            overlayColor: "#000000",
            overlayOpacity: 0.6,
            overlayClass: "poptrox-overlay",
            windowMargin: 50,
            windowHeightPad: 0,
            selector: "a",
            caption: null,
            parent: "body",
            popupSpeed: 300,
            popupWidth: 200,
            popupHeight: 100,
            popupIsFixed: !1,
            useBodyOverflow: !1,
            usePopupEasyClose: !0,
            usePopupForceClose: !1,
            usePopupLoader: !0,
            usePopupCloser: !0,
            usePopupCaption: !1,
            usePopupNav: !1,
            usePopupDefaultStyling: !0,
            popupBackgroundColor: "#FFFFFF",
            popupTextColor: "#000000",
            popupLoaderTextSize: "2em",
            popupCloserBackgroundColor: "#000000",
            popupCloserTextColor: "#FFFFFF",
            popupCloserTextSize: "20px",
            popupPadding: 10,
            popupCaptionHeight: 60,
            popupCaptionTextSize: null,
            popupBlankCaptionText: "(untitled)",
            popupCloserText: "&#215;",
            popupLoaderText: "&bull;&bull;&bull;&bull;",
            popupClass: "poptrox-popup",
            popupSelector: null,
            popupLoaderSelector: ".loader",
            popupCloserSelector: ".closer",
            popupCaptionSelector: ".caption",
            popupNavPreviousSelector: ".nav-previous",
            popupNavNextSelector: ".nav-next",
            onPopupClose: null,
            onPopupOpen: null,
          },
          o,
        ),
        n = e(this),
        a = e("body"),
        l = e('<div class="' + r.overlayClass + '"></div>'),
        u = e(window),
        d = [],
        h = 0,
        g = !1,
        f = new Array();
      r.usePopupLoader || (r.popupLoaderSelector = null),
        r.usePopupCloser || (r.popupCloserSelector = null),
        r.usePopupCaption || (r.popupCaptionSelector = null),
        r.usePopupNav ||
          ((r.popupNavPreviousSelector = null),
          (r.popupNavNextSelector = null));
      var x;
      x = e(
        r.popupSelector
          ? r.popupSelector
          : '<div class="' +
              r.popupClass +
              '">' +
              (r.popupLoaderSelector
                ? '<div class="loader">' + r.popupLoaderText + "</div>"
                : "") +
              '<div class="pic"></div>' +
              (r.popupCaptionSelector ? '<div class="caption"></div>' : "") +
              (r.popupCloserSelector
                ? '<span class="closer">' + r.popupCloserText + "</span>"
                : "") +
              (r.popupNavPreviousSelector
                ? '<div class="nav-previous"></div>'
                : "") +
              (r.popupNavNextSelector ? '<div class="nav-next"></div>' : "") +
              "</div>",
      );
      var v = x.find(".pic"),
        w = e(),
        b = x.find(r.popupLoaderSelector),
        m = x.find(r.popupCaptionSelector),
        C = x.find(r.popupCloserSelector),
        y = x.find(r.popupNavNextSelector),
        S = x.find(r.popupNavPreviousSelector),
        P = y.add(S);
      if (
        r.usePopupDefaultStyling &&
        (x
          .css("background", r.popupBackgroundColor)
          .css("color", r.popupTextColor)
          .css("padding", r.popupPadding + "px"),
        m.length > 0 &&
          (x.css("padding-bottom", r.popupCaptionHeight + "px"),
          m
            .css("position", "absolute")
            .css("left", "0")
            .css("bottom", "0")
            .css("width", "100%")
            .css("text-align", "center")
            .css("height", r.popupCaptionHeight + "px")
            .css("line-height", r.popupCaptionHeight + "px"),
          r.popupCaptionTextSize && m.css("font-size", popupCaptionTextSize)),
        C.length > 0 &&
          C.html(r.popupCloserText)
            .css("font-size", r.popupCloserTextSize)
            .css("background", r.popupCloserBackgroundColor)
            .css("color", r.popupCloserTextColor)
            .css("display", "block")
            .css("width", "40px")
            .css("height", "40px")
            .css("line-height", "40px")
            .css("text-align", "center")
            .css("position", "absolute")
            .css("text-decoration", "none")
            .css("outline", "0")
            .css("top", "0")
            .css("right", "-40px"),
        b.length > 0 &&
          b
            .html("")
            .css("position", "relative")
            .css("font-size", r.popupLoaderTextSize)
            .on("startSpinning", function (o) {
              var t = e("<div>" + r.popupLoaderText + "</div>");
              t
                .css("height", Math.floor(r.popupHeight / 2) + "px")
                .css("overflow", "hidden")
                .css("line-height", Math.floor(r.popupHeight / 2) + "px")
                .css("text-align", "center")
                .css(
                  "margin-top",
                  Math.floor(
                    (x.height() -
                      t.height() +
                      (m.length > 0 ? m.height() : 0)) /
                      2,
                  ),
                )
                .css("color", r.popupTextColor ? r.popupTextColor : "")
                .on("xfin", function () {
                  t.fadeTo(300, 0.5, function () {
                    t.trigger("xfout");
                  });
                })
                .on("xfout", function () {
                  t.fadeTo(300, 0.05, function () {
                    t.trigger("xfin");
                  });
                })
                .trigger("xfin"),
                b.append(t);
            })
            .on("stopSpinning", function (e) {
              var o = b.find("div");
              o.remove();
            }),
        2 == P.length)
      ) {
        P.css("font-size", "75px")
          .css("text-align", "center")
          .css("color", "#fff")
          .css("text-shadow", "none")
          .css("height", "100%")
          .css("position", "absolute")
          .css("top", "0")
          .css("opacity", "0.35")
          .css("cursor", "pointer")
          .css("box-shadow", "inset 0px 0px 10px 0px rgba(0,0,0,0)")
          .poptrox_disableSelection();
        var k, T;
        r.usePopupEasyClose
          ? ((k = "100px"), (T = "100px"))
          : ((k = "75%"), (T = "25%")),
          y
            .css("right", "0")
            .css("width", k)
            .html(
              '<div style="position: absolute; height: 100px; width: 125px; top: 50%; right: 0; margin-top: -50px;">&gt;</div>',
            ),
          S.css("left", "0")
            .css("width", T)
            .html(
              '<div style="position: absolute; height: 100px; width: 125px; top: 50%; left: 0; margin-top: -50px;">&lt;</div>',
            );
      }
      return (
        u.on("resize orientationchange", function () {
          t();
        }),
        m.on("update", function (e, o) {
          (o && 0 != o.length) || (o = r.popupBlankCaptionText), m.html(o);
        }),
        C.css("cursor", "pointer").on("click", function (e) {
          return (
            e.preventDefault(),
            e.stopPropagation(),
            x.trigger("poptrox_close"),
            !0
          );
        }),
        y.on("click", function (e) {
          e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_next");
        }),
        S.on("click", function (e) {
          e.stopPropagation(),
            e.preventDefault(),
            x.trigger("poptrox_previous");
        }),
        l
          .css("position", "fixed")
          .css("left", 0)
          .css("top", 0)
          .css("z-index", r.baseZIndex)
          .css("width", "100%")
          .css("height", "100%")
          .css("text-align", "center")
          .css("cursor", "pointer")
          .appendTo(r.parent)
          .prepend(
            '<div style="display:inline-block;height:100%;vertical-align:middle;"></div>',
          )
          .append(
            '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:' +
              r.overlayColor +
              ";opacity:" +
              r.overlayOpacity +
              ";filter:alpha(opacity=" +
              100 * r.overlayOpacity +
              ');"></div>',
          )
          .hide()
          .on("touchmove", function (e) {
            return !1;
          })
          .on("click", function (e) {
            e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_close");
          }),
        x
          .css("display", "inline-block")
          .css("vertical-align", "middle")
          .css("position", "relative")
          .css("z-index", 1)
          .css("cursor", "auto")
          .appendTo(l)
          .hide()
          .on("poptrox_next", function () {
            var e = h + 1;
            e >= d.length && (e = 0), x.trigger("poptrox_switch", [e]);
          })
          .on("poptrox_previous", function () {
            var e = h - 1;
            0 > e && (e = d.length - 1), x.trigger("poptrox_switch", [e]);
          })
          .on("poptrox_reset", function () {
            t(),
              x.data("width", r.popupWidth).data("height", r.popupHeight),
              b.hide().trigger("stopSpinning"),
              m.hide(),
              C.hide(),
              P.hide(),
              v.hide(),
              w.attr("src", "").detach();
          })
          .on("poptrox_open", function (e, o) {
            return g
              ? !0
              : ((g = !0),
                r.useBodyOverflow && a.css("overflow", "hidden"),
                r.onPopupOpen && r.onPopupOpen(),
                x.addClass("loading"),
                void l.fadeTo(r.fadeSpeed, 1, function () {
                  x.trigger("poptrox_switch", [o, !0]);
                }));
          })
          .on("poptrox_switch", function (o, p, i) {
            var s;
            if (!i && g) {
              return !0;
            }
            if (
              ((g = !0),
              x
                .addClass("loading")
                .css("width", x.data("width"))
                .css("height", x.data("height")),
              m.hide(),
              w.attr("src") && w.attr("src", ""),
              w.detach(),
              (s = d[p]),
              (w = s.object),
              w.off("load"),
              v.css("text-indent", "-9999px").show().append(w),
              "ajax" == s.type
                ? e.get(s.src, function (e) {
                    w.html(e), w.trigger("load");
                  })
                : w.attr("src", s.src),
              "image" != s.type)
            ) {
              var n, a;
              (n = s.width),
                (a = s.height),
                "%" == n.slice(-1) &&
                  (n =
                    (parseInt(n.substring(0, n.length - 1)) / 100) * u.width()),
                "%" == a.slice(-1) &&
                  (a =
                    (parseInt(a.substring(0, a.length - 1)) / 100) *
                    u.height()),
                w
                  .css("position", "relative")
                  .css("outline", "0")
                  .css("z-index", r.baseZIndex + 100)
                  .width(n)
                  .height(a);
            }
            b.trigger("startSpinning").fadeIn(300),
              x.show(),
              r.popupIsFixed
                ? (x
                    .removeClass("loading")
                    .width(r.popupWidth)
                    .height(r.popupHeight),
                  w.load(function () {
                    w.off("load"),
                      b.hide().trigger("stopSpinning"),
                      m.trigger("update", [s.captionText]).fadeIn(r.fadeSpeed),
                      C.fadeIn(r.fadeSpeed),
                      v
                        .css("text-indent", 0)
                        .hide()
                        .fadeIn(r.fadeSpeed, function () {
                          g = !1;
                        }),
                      (h = p),
                      P.fadeIn(r.fadeSpeed);
                  }))
                : w.load(function () {
                    t(), w.off("load"), b.hide().trigger("stopSpinning");
                    var e = w.width(),
                      o = w.height(),
                      i = function () {
                        m
                          .trigger("update", [s.captionText])
                          .fadeIn(r.fadeSpeed),
                          C.fadeIn(r.fadeSpeed),
                          v
                            .css("text-indent", 0)
                            .hide()
                            .fadeIn(r.fadeSpeed, function () {
                              g = !1;
                            }),
                          (h = p),
                          P.fadeIn(r.fadeSpeed),
                          x
                            .removeClass("loading")
                            .data("width", e)
                            .data("height", o)
                            .css("width", "auto")
                            .css("height", "auto");
                      };
                    e == x.data("width") && o == x.data("height")
                      ? i()
                      : x.animate(
                          { width: e, height: o },
                          r.popupSpeed,
                          "swing",
                          i,
                        );
                  }),
              "image" != s.type && w.trigger("load");
          })
          .on("poptrox_close", function () {
            return g && !r.usePopupForceClose
              ? !0
              : ((g = !0),
                x.hide().trigger("poptrox_reset"),
                r.onPopupClose && r.onPopupClose(),
                void l.fadeOut(r.fadeSpeed, function () {
                  r.useBodyOverflow && a.css("overflow", "auto"), (g = !1);
                }));
          })
          .trigger("poptrox_reset"),
        r.usePopupEasyClose
          ? (m.on("click", "a", function (e) {
              e.stopPropagation();
            }),
            x.css("cursor", "pointer").on("click", function (e) {
              e.stopPropagation(),
                e.preventDefault(),
                x.trigger("poptrox_close");
            }))
          : x.on("click", function (e) {
              e.stopPropagation();
            }),
        u.keydown(function (e) {
          if (x.is(":visible")) {
            switch (e.keyCode) {
              case 37:
              case 32:
                if (r.usePopupNav) {
                  return x.trigger("poptrox_previous"), !1;
                }
                break;
              case 39:
                if (r.usePopupNav) {
                  return x.trigger("poptrox_next"), !1;
                }
                break;
              case 27:
                return x.trigger("poptrox_close"), !1;
            }
          }
        }),
        n.find(r.selector).each(function (o) {
          var t,
            p,
            i = e(this),
            s = i.find("img"),
            n = i.data("poptrox");
          if ("ignore" != n && i.attr("href")) {
            if (
              ((t = {
                src: i.attr("href"),
                captionText: s.attr("title"),
                width: null,
                height: null,
                type: null,
                object: null,
                options: null,
              }),
              r.caption)
            ) {
              if ("function" == typeof r.caption) {
                c = r.caption(i);
              } else {
                if ("selector" in r.caption) {
                  var a;
                  (a = i.find(r.caption.selector)),
                    "attribute" in r.caption
                      ? (c = a.attr(r.caption.attribute))
                      : ((c = a.html()), r.caption.remove === !0 && a.remove());
                }
              }
            } else {
              c = s.attr("title");
            }
            if (((t.captionText = c), n)) {
              var l = n.split(",");
              0 in l && (t.type = l[0]),
                1 in l &&
                  ((p = l[1].match(/([0-9%]+)x([0-9%]+)/)),
                  p && 3 == p.length && ((t.width = p[1]), (t.height = p[2]))),
                2 in l && (t.options = l[2]);
            }
            if (!t.type) {
              switch (
                ((p = t.src.match(/\/\/([a-z0-9\.]+)\/.*/)),
                (!p || p.length < 2) && (p = [!1]),
                p[1])
              ) {
                case "api.soundcloud.com":
                  t.type = "soundcloud";
                  break;
                case "youtu.be":
                  t.type = "youtube";
                  break;
                case "vimeo.com":
                  t.type = "vimeo";
                  break;
                case "wistia.net":
                  t.type = "wistia";
                  break;
                case "bcove.me":
                  t.type = "bcove";
                  break;
                default:
                  t.type = "image";
              }
            }
            switch (((p = t.src.match(/\/\/[a-z0-9\.]+\/(.*)/)), t.type)) {
              case "iframe":
                (t.object = e('<iframe src="" frameborder="0"></iframe>')),
                  t.object
                    .on("click", function (e) {
                      e.stopPropagation();
                    })
                    .css("cursor", "auto"),
                  (t.width && t.height) ||
                    ((t.width = "600"), (t.height = "400"));
                break;
              case "ajax":
                (t.object = e('<div class="poptrox-ajax"></div>')),
                  t.object
                    .on("click", function (e) {
                      e.stopPropagation();
                    })
                    .css("cursor", "auto")
                    .css("overflow", "auto"),
                  (t.width && t.height) ||
                    ((t.width = "600"), (t.height = "400"));
                break;
              case "soundcloud":
                (t.object = e(
                  '<iframe scrolling="no" frameborder="no" src=""></iframe>',
                )),
                  (t.src =
                    "//w.soundcloud.com/player/?url=" +
                    escape(t.src) +
                    (t.options ? "&" + t.options : "")),
                  (t.width = "600"),
                  (t.height = "166");
                break;
              case "youtube":
                (t.object = e(
                  '<iframe src="" frameborder="0" allowfullscreen="1"></iframe>',
                )),
                  (t.src =
                    "//www.youtube.com/embed/" +
                    p[1] +
                    (t.options ? "?" + t.options : "")),
                  (t.width && t.height) ||
                    ((t.width = "800"), (t.height = "480"));
                break;
              case "vimeo":
                (t.object = e(
                  '<iframe src="" frameborder="0" allowFullScreen="1"></iframe>',
                )),
                  (t.src =
                    "//player.vimeo.com/video/" +
                    p[1] +
                    (t.options ? "?" + t.options : "")),
                  (t.width && t.height) ||
                    ((t.width = "800"), (t.height = "480"));
                break;
              case "wistia":
                (t.object = e(
                  '<iframe src="" frameborder="0" allowFullScreen="1"></iframe>',
                )),
                  (t.src =
                    "//fast.wistia.net/" +
                    p[1] +
                    (t.options ? "?" + t.options : "")),
                  (t.width && t.height) ||
                    ((t.width = "800"), (t.height = "480"));
                break;
              case "bcove":
                (t.object = e(
                  '<iframe src="" frameborder="0" allowFullScreen="1" width="100%"></iframe>',
                )),
                  (t.src =
                    "//bcove.me/" + p[1] + (t.options ? "?" + t.options : "")),
                  (t.width && t.height) ||
                    ((t.width = "640"), (t.height = "360"));
                break;
              default:
                if (
                  ((t.object = e(
                    '<img src="" alt="" style="vertical-align:bottom" />',
                  )),
                  r.preload)
                ) {
                  var p = document.createElement("img");
                  (p.src = t.src), f.push(p);
                }
                (t.width = i.attr("width")), (t.height = i.attr("height"));
            }
            "file:" == window.location.protocol &&
              t.src.match(/^\/\//) &&
              (t.src = "http:" + t.src),
              d.push(t),
              s.removeAttr("title"),
              i
                .removeAttr("href")
                .css("cursor", "pointer")
                .css("outline", 0)
                .on("click", function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    x.trigger("poptrox_open", [o]);
                });
          }
        }),
        n.prop("_poptrox", r),
        n
      );
    });
})(jQuery);
!(function (factory) {
  "function" == typeof define && define.amd
    ? define(["jquery"], factory)
    : "object" == typeof exports
      ? (module.exports = factory(require("jquery")))
      : factory(jQuery);
})(function ($) {
  var dispatch = $.event.dispatch || $.event.handle,
    special = $.event.special,
    uid1 = "D" + +new Date(),
    uid2 = "D" + (+new Date() + 1);
  (special.scrollstart = {
    setup: function (data) {
      var timer,
        _data = $.extend({ latency: special.scrollstop.latency }, data),
        handler = function (evt) {
          var _self = this,
            _args = arguments;
          timer
            ? clearTimeout(timer)
            : ((evt.type = "scrollstart"), dispatch.apply(_self, _args)),
            (timer = setTimeout(function () {
              timer = null;
            }, _data.latency));
        };
      $(this).bind("scroll", handler).data(uid1, handler);
    },
    teardown: function () {
      $(this).unbind("scroll", $(this).data(uid1));
    },
  }),
    (special.scrollstop = {
      latency: 250,
      setup: function (data) {
        var timer,
          _data = $.extend({ latency: special.scrollstop.latency }, data),
          handler = function (evt) {
            var _self = this,
              _args = arguments;
            timer && clearTimeout(timer),
              (timer = setTimeout(function () {
                (timer = null),
                  (evt.type = "scrollstop"),
                  dispatch.apply(_self, _args);
              }, _data.latency));
          };
        $(this).bind("scroll", handler).data(uid2, handler);
      },
      teardown: function () {
        $(this).unbind("scroll", $(this).data(uid2));
      },
    });
});
