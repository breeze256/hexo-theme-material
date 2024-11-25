(function () {
  var M = {
    frameRate: 150,
    animationTime: 400,
    stepSize: 120,
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    accelerationDelta: 20,
    accelerationMax: 1,
    keyboardSupport: true,
    arrowScroll: 50,
    touchpadSupport: true,
    fixedBackground: true,
    excluded: "",
  };
  var y = M;
  var w = false;
  var t = false;
  var i = { x: 0, y: 0 };
  var b = false;
  var A = document.documentElement;
  var e;
  var E;
  var R = [];
  var N = /^Mac/.test(navigator.platform);
  var s = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    spacebar: 32,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
  };
  var y = M;
  function T() {
    if (y.keyboardSupport) {
      g("keydown", x);
    }
  }
  function P() {
    if (b || !document.body) {
      return;
    }
    b = true;
    var aa = document.body;
    var Z = document.documentElement;
    var U = window.innerHeight;
    var ac = aa.scrollHeight;
    A = document.compatMode.indexOf("CSS") >= 0 ? Z : aa;
    e = aa;
    T();
    if (top != self) {
      t = true;
    } else {
      if (ac > U && (aa.offsetHeight <= U || Z.offsetHeight <= U)) {
        var Y = document.createElement("div");
        Y.style.cssText =
          "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" +
          A.scrollHeight +
          "px";
        document.body.appendChild(Y);
        var X;
        var ab = function () {
          if (X) {
            return;
          }
          X = setTimeout(function () {
            if (w) {
              return;
            }
            Y.style.height = "0";
            Y.style.height = A.scrollHeight + "px";
            X = null;
          }, 500);
        };
        setTimeout(ab, 10);
        var W = { attributes: true, childList: true, characterData: false };
        E = new B(ab);
        E.observe(aa, W);
        if (A.offsetHeight <= U) {
          var V = document.createElement("div");
          V.style.clear = "both";
          aa.appendChild(V);
        }
      }
    }
    if (!y.fixedBackground && !w) {
      aa.style.backgroundAttachment = "scroll";
      Z.style.backgroundAttachment = "scroll";
    }
  }
  function c() {
    E && E.disconnect();
    a(F, n);
    a("mousedown", p);
    a("keydown", x);
  }
  var H = [];
  var h = false;
  var o = Date.now();
  function Q(Z, ab, aa) {
    C(ab, aa);
    if (y.accelerationMax != 1) {
      var W = Date.now();
      var V = W - o;
      if (V < y.accelerationDelta) {
        var X = (1 + 50 / V) / 2;
        if (X > 1) {
          X = Math.min(X, y.accelerationMax);
          ab *= X;
          aa *= X;
        }
      }
      o = Date.now();
    }
    H.push({
      x: ab,
      y: aa,
      lastX: ab < 0 ? 0.99 : -0.99,
      lastY: aa < 0 ? 0.99 : -0.99,
      start: Date.now(),
    });
    if (h) {
      return;
    }
    var U = Z === document.body;
    var Y = function (ad) {
      var ac = Date.now();
      var ak = 0;
      var aj = 0;
      for (var af = 0; af < H.length; af++) {
        var am = H[af];
        var al = ac - am.start;
        var ae = al >= y.animationTime;
        var ag = ae ? 1 : al / y.animationTime;
        if (y.pulseAlgorithm) {
          ag = k(ag);
        }
        var ai = (am.x * ag - am.lastX) >> 0;
        var ah = (am.y * ag - am.lastY) >> 0;
        ak += ai;
        aj += ah;
        am.lastX += ai;
        am.lastY += ah;
        if (ae) {
          H.splice(af, 1);
          af--;
        }
      }
      if (U) {
        window.scrollBy(ak, aj);
      } else {
        if (ak) {
          Z.scrollLeft += ak;
        }
        if (aj) {
          Z.scrollTop += aj;
        }
      }
      if (!ab && !aa) {
        H = [];
      }
      if (H.length) {
        G(Y, Z, 1000 / y.frameRate + 1);
      } else {
        h = false;
      }
    };
    G(Y, Z, 0);
    h = true;
  }
  function n(X) {
    if (!b) {
      P();
    }
    var Y = X.target;
    var W = J(Y);
    if (!W || X.defaultPrevented || X.ctrlKey) {
      return true;
    }
    if (
      m(e, "embed") ||
      (m(Y, "embed") && /\.pdf/i.test(Y.src)) ||
      m(e, "object")
    ) {
      return true;
    }
    var V = -X.wheelDeltaX || X.deltaX || 0;
    var U = -X.wheelDeltaY || X.deltaY || 0;
    if (N) {
      if (X.wheelDeltaX && r(X.wheelDeltaX, 120)) {
        V = -120 * (X.wheelDeltaX / Math.abs(X.wheelDeltaX));
      }
      if (X.wheelDeltaY && r(X.wheelDeltaY, 120)) {
        U = -120 * (X.wheelDeltaY / Math.abs(X.wheelDeltaY));
      }
    }
    if (!V && !U) {
      U = -X.wheelDelta || 0;
    }
    if (X.deltaMode === 1) {
      V *= 40;
      U *= 40;
    }
    if (!y.touchpadSupport && S(U)) {
      return true;
    }
    if (Math.abs(V) > 1.2) {
      V *= y.stepSize / 120;
    }
    if (Math.abs(U) > 1.2) {
      U *= y.stepSize / 120;
    }
    Q(W, V, U);
    X.preventDefault();
    l();
  }
  function x(V) {
    var ac = V.target;
    var aa =
      V.ctrlKey ||
      V.altKey ||
      V.metaKey ||
      (V.shiftKey && V.keyCode !== s.spacebar);
    if (!document.contains(e)) {
      e = document.activeElement;
    }
    var W = /^(textarea|select|embed|object)$/i;
    var X = /^(button|submit|radio|checkbox|file|color|image)$/i;
    if (
      W.test(ac.nodeName) ||
      (m(ac, "input") && !X.test(ac.type)) ||
      m(e, "video") ||
      q(V) ||
      ac.isContentEditable ||
      V.defaultPrevented ||
      aa
    ) {
      return true;
    }
    if (
      (m(ac, "button") || (m(ac, "input") && X.test(ac.type))) &&
      V.keyCode === s.spacebar
    ) {
      return true;
    }
    var Y,
      ae = 0,
      ad = 0;
    var Z = J(e);
    var ab = Z.clientHeight;
    if (Z == document.body) {
      ab = window.innerHeight;
    }
    switch (V.keyCode) {
      case s.up:
        ad = -y.arrowScroll;
        break;
      case s.down:
        ad = y.arrowScroll;
        break;
      case s.spacebar:
        Y = V.shiftKey ? 1 : -1;
        ad = -Y * ab * 0.9;
        break;
      case s.pageup:
        ad = -ab * 0.9;
        break;
      case s.pagedown:
        ad = ab * 0.9;
        break;
      case s.home:
        ad = -Z.scrollTop;
        break;
      case s.end:
        var U = Z.scrollHeight - Z.scrollTop - ab;
        ad = U > 0 ? U + 10 : 0;
        break;
      case s.left:
        ae = -y.arrowScroll;
        break;
      case s.right:
        ae = y.arrowScroll;
        break;
      default:
        return true;
    }
    Q(Z, ae, ad);
    V.preventDefault();
    l();
  }
  function p(U) {
    e = U.target;
  }
  var z = (function () {
    var U = 0;
    return function (V) {
      return V.uniqueID || (V.uniqueID = U++);
    };
  })();
  var j = {};
  var O;
  function l() {
    clearTimeout(O);
    O = setInterval(function () {
      j = {};
    }, 1 * 1000);
  }
  function d(V, U) {
    for (var W = V.length; W--; ) {
      j[z(V[W])] = U;
    }
    return U;
  }
  function J(Z) {
    var W = [];
    var U = document.body;
    var V = A.scrollHeight;
    do {
      var Y = j[z(Z)];
      if (Y) {
        return d(W, Y);
      }
      W.push(Z);
      if (V === Z.scrollHeight) {
        var aa = I(A) && I(U);
        var X = aa || D(A);
        if ((t && K(A)) || (!t && X)) {
          return d(W, u());
        }
      } else {
        if (K(Z) && D(Z)) {
          return d(W, Z);
        }
      }
    } while ((Z = Z.parentElement));
  }
  function K(U) {
    return U.clientHeight + 10 < U.scrollHeight;
  }
  function I(U) {
    var V = getComputedStyle(U, "").getPropertyValue("overflow-y");
    return V !== "hidden";
  }
  function D(U) {
    var V = getComputedStyle(U, "").getPropertyValue("overflow-y");
    return V === "scroll" || V === "auto";
  }
  function g(V, U) {
    window.addEventListener(V, U, false);
  }
  function a(V, U) {
    window.removeEventListener(V, U, false);
  }
  function m(V, U) {
    return (V.nodeName || "").toLowerCase() === U.toLowerCase();
  }
  function C(U, V) {
    U = U > 0 ? 1 : -1;
    V = V > 0 ? 1 : -1;
    if (i.x !== U || i.y !== V) {
      i.x = U;
      i.y = V;
      H = [];
      o = 0;
    }
  }
  var f;
  if (window.localStorage && localStorage.SS_deltaBuffer) {
    R = localStorage.SS_deltaBuffer.split(",");
  }
  function S(U) {
    if (!U) {
      return;
    }
    if (!R.length) {
      R = [U, U, U];
    }
    U = Math.abs(U);
    R.push(U);
    R.shift();
    clearTimeout(f);
    f = setTimeout(function () {
      if (window.localStorage) {
        localStorage.SS_deltaBuffer = R.join(",");
      }
    }, 1000);
    return !v(120) && !v(100);
  }
  function r(V, U) {
    return Math.floor(V / U) == V / U;
  }
  function v(U) {
    return r(R[0], U) && r(R[1], U) && r(R[2], U);
  }
  function q(W) {
    var V = W.target;
    var U = false;
    if (document.URL.indexOf("www.youtube.com/watch") != -1) {
      do {
        U = V.classList && V.classList.contains("html5-video-controls");
        if (U) {
          break;
        }
      } while ((V = V.parentNode));
    }
    return U;
  }
  var G = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (W, V, U) {
        window.setTimeout(W, U || 1000 / 60);
      }
    );
  })();
  var B =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  var u = (function () {
    var U;
    return function () {
      if (!U) {
        var X = document.createElement("div");
        X.style.cssText = "height:10000px;width:1px;";
        document.body.appendChild(X);
        var W = document.body.scrollTop;
        var V = document.documentElement.scrollTop;
        window.scrollBy(0, 1);
        if (document.body.scrollTop != W) {
          U = document.body;
        } else {
          U = document.documentElement;
        }
        window.scrollBy(0, -1);
        document.body.removeChild(X);
      }
      return U;
    };
  })();
  function L(U) {
    var W, X, V;
    U = U * y.pulseScale;
    if (U < 1) {
      W = U - (1 - Math.exp(-U));
    } else {
      X = Math.exp(-1);
      U -= 1;
      V = 1 - Math.exp(-U);
      W = X + V * (1 - X);
    }
    return W * y.pulseNormalize;
  }
  function k(U) {
    if (U >= 1) {
      return 1;
    }
    if (U <= 0) {
      return 0;
    }
    if (y.pulseNormalize == 1) {
      y.pulseNormalize /= L(1);
    }
    return L(U);
  }
  var F;
  if ("onwheel" in document.createElement("div")) {
    F = "wheel";
  } else {
    if ("onmousewheel" in document.createElement("div")) {
      F = "mousewheel";
    }
  }
  if (F) {
    g(F, n);
    g("mousedown", p);
    g("load", P);
  }
})();
