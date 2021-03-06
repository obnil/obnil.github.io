!function (t, e) {
    "function" == typeof define && define.amd ? define([], e(t)) : "object" == typeof exports ? module.exports = e(t) : t.smoothScroll = e(t)
}("undefined" != typeof global ? global : this.window || this.global, function (t) {
    "use strict";
    var e, n, r, o, i, s, a, u = {}, c = "querySelector" in document && "addEventListener" in t, l = {
        selector: "[data-scroll]",
        selectorHeader: null,
        speed: 500,
        easing: "easeInOutCubic",
        offset: 0,
        callback: function () {
        }
    }, h = function () {
        var t = {}, e = !1, n = 0, r = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], n++);
        for (; n < r; n++) {
            var o = arguments[n];
            !function (n) {
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e && "[object Object]" === Object.prototype.toString.call(n[r]) ? t[r] = h(!0, t[r], n[r]) : t[r] = n[r])
            }(o)
        }
        return t
    }, p = function (t) {
        return Math.max(t.scrollHeight, t.offsetHeight, t.clientHeight)
    }, d = function (t, e) {
        for (Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (t) {
            for (var e = (this.document || this.ownerDocument).querySelectorAll(t), n = e.length; --n >= 0 && e.item(n) !== this;) ;
            return n > -1
        }); t && t !== document; t = t.parentNode) if (t.matches(e)) return t;
        return null
    }, f = function (t) {
        "#" === t.charAt(0) && (t = t.substr(1));
        for (var e, n = String(t), r = n.length, o = -1, i = "", s = n.charCodeAt(0); ++o < r;) {
            if (0 === (e = n.charCodeAt(o))) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
            e >= 1 && e <= 31 || 127 == e || 0 === o && e >= 48 && e <= 57 || 1 === o && e >= 48 && e <= 57 && 45 === s ? i += "\\" + e.toString(16) + " " : i += e >= 128 || 45 === e || 95 === e || e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122 ? n.charAt(o) : "\\" + n.charAt(o)
        }
        return "#" + i
    }, y = function (t, e) {
        var n;
        return "easeInQuad" === t && (n = e * e), "easeOutQuad" === t && (n = e * (2 - e)), "easeInOutQuad" === t && (n = e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1), "easeInCubic" === t && (n = e * e * e), "easeOutCubic" === t && (n = --e * e * e + 1), "easeInOutCubic" === t && (n = e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1), "easeInQuart" === t && (n = e * e * e * e), "easeOutQuart" === t && (n = 1 - --e * e * e * e), "easeInOutQuart" === t && (n = e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e), "easeInQuint" === t && (n = e * e * e * e * e), "easeOutQuint" === t && (n = 1 + --e * e * e * e * e), "easeInOutQuint" === t && (n = e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e), n || e
    }, m = function (t, e, n) {
        var r = 0;
        if (t.offsetParent) do {
            r += t.offsetTop, t = t.offsetParent
        } while (t);
        return r = Math.max(r - e - n, 0), Math.min(r, g() - v())
    }, v = function () {
        return Math.max(document.documentElement.clientHeight, t.innerHeight || 0)
    }, g = function () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight)
    }, E = function (t) {
        return t && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(t) : {}
    }, b = function (t) {
        return t ? p(t) + t.offsetTop : 0
    }, w = function (e, n, r) {
        r || (e.focus(), document.activeElement.id !== e.id && (e.setAttribute("tabindex", "-1"), e.focus(), e.style.outline = "none"), t.scrollTo(0, n))
    };
    u.animateScroll = function (n, r, s) {
        var u = E(r ? r.getAttribute("data-options") : null), c = h(e || l, s || {}, u),
            p = "[object Number]" === Object.prototype.toString.call(n), d = p || !n.tagName ? null : n;
        if (p || d) {
            var f = t.pageYOffset;
            c.selectorHeader && !o && (o = document.querySelector(c.selectorHeader)), i || (i = b(o));
            var v, S, L = p ? n : m(d, i, parseInt(c.offset, 10)), R = L - f, C = g(), T = 0, A = function (e, o, i) {
                var s = t.pageYOffset;
                (e == o || s == o || t.innerHeight + s >= C) && (clearInterval(i), w(n, o, p), c.callback(n, r))
            }, q = function () {
                T += 16, v = T / parseInt(c.speed, 10), v = v > 1 ? 1 : v, S = f + R * y(c.easing, v), t.scrollTo(0, Math.floor(S)), A(S, L, a)
            };
            0 === t.pageYOffset && t.scrollTo(0, 0), function () {
                clearInterval(a), a = setInterval(q, 16)
            }()
        }
    };
    var S = function (e) {
        try {
            f(decodeURIComponent(t.location.hash))
        } catch (e) {
            f(t.location.hash)
        }
        n && (n.id = n.getAttribute("data-scroll-id"), u.animateScroll(n, r), n = null, r = null)
    }, L = function (o) {
        if (0 === o.button && !o.metaKey && !o.ctrlKey && (r = d(o.target, e.selector)) && "a" === r.tagName.toLowerCase() && r.hostname === t.location.hostname && r.pathname === t.location.pathname && /#/.test(r.href)) {
            var i;
            try {
                i = f(decodeURIComponent(r.hash))
            } catch (t) {
                i = f(r.hash)
            }
            if ("#" === i) {
                o.preventDefault(), n = document.body;
                var s = n.id ? n.id : "smooth-scroll-top";
                return n.setAttribute("data-scroll-id", s), n.id = "", void (t.location.hash.substring(1) === s ? S() : t.location.hash = s)
            }
            n = document.querySelector(i), n && (n.setAttribute("data-scroll-id", n.id), n.id = "", r.hash === t.location.hash && (o.preventDefault(), S()))
        }
    }, R = function (t) {
        s || (s = setTimeout(function () {
            s = null, i = b(o)
        }, 66))
    };
    return u.destroy = function () {
        e && (document.removeEventListener("click", L, !1), t.removeEventListener("resize", R, !1), e = null, n = null, r = null, o = null, i = null, s = null, a = null)
    }, u.init = function (n) {
        c && (u.destroy(), e = h(l, n || {}), o = e.selectorHeader ? document.querySelector(e.selectorHeader) : null, i = b(o), document.addEventListener("click", L, !1), t.addEventListener("hashchange", S, !1), o && t.addEventListener("resize", R, !1))
    }, u
}), function () {
    (function () {
        (function () {
            this.Turbolinks = {
                supported: function () {
                    return null != window.history.pushState && null != window.requestAnimationFrame
                }(), visit: function (e, n) {
                    return t.controller.visit(e, n)
                }, clearCache: function () {
                    return t.controller.clearCache()
                }
            }
        }).call(this)
    }).call(this);
    var t = this.Turbolinks;
    (function () {
        (function () {
            var e, n;
            t.copyObject = function (t) {
                var e, n, r;
                n = {};
                for (e in t) r = t[e], n[e] = r;
                return n
            }, t.closest = function (t, n) {
                return e.call(t, n)
            }, e = function () {
                var t, e;
                return t = document.documentElement, null != (e = t.closest) ? e : function (t) {
                    var e;
                    for (e = this; e;) {
                        if (e.nodeType === Node.ELEMENT_NODE && n.call(e, t)) return e;
                        e = e.parentNode
                    }
                }
            }(), t.defer = function (t) {
                return setTimeout(t, 1)
            }, t.dispatch = function (t, e) {
                var n, r, o, i, s;
                return i = null != e ? e : {}, s = i.target, n = i.cancelable, r = i.data, o = document.createEvent("Events"), o.initEvent(t, !0, !0 === n), o.data = null != r ? r : {}, (null != s ? s : document).dispatchEvent(o), o
            }, t.match = function (t, e) {
                return n.call(t, e)
            }, n = function () {
                var t, e, n, r;
                return t = document.documentElement, null != (e = null != (n = null != (r = t.matchesSelector) ? r : t.webkitMatchesSelector) ? n : t.msMatchesSelector) ? e : t.mozMatchesSelector
            }(), t.uuid = function () {
                var t, e, n;
                for (n = "", t = e = 1; 36 >= e; t = ++e) n += 9 === t || 14 === t || 19 === t || 24 === t ? "-" : 15 === t ? "4" : 20 === t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16);
                return n
            }
        }).call(this), function () {
            t.Location = function () {
                function t(t) {
                    var e, n;
                    null == t && (t = ""), n = document.createElement("a"), n.href = t.toString(), this.absoluteURL = n.href, e = n.hash.length, 2 > e ? this.requestURL = this.absoluteURL : (this.requestURL = this.absoluteURL.slice(0, -e), this.anchor = n.hash.slice(1))
                }

                var e, n, r, o;
                return t.wrap = function (t) {
                    return t instanceof this ? t : new this(t)
                }, t.prototype.getOrigin = function () {
                    return this.absoluteURL.split("/", 3).join("/")
                }, t.prototype.getPath = function () {
                    var t, e;
                    return null != (t = null != (e = this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/)) ? e[1] : void 0) ? t : "/"
                }, t.prototype.getPathComponents = function () {
                    return this.getPath().split("/").slice(1)
                }, t.prototype.getLastPathComponent = function () {
                    return this.getPathComponents().slice(-1)[0]
                }, t.prototype.getExtension = function () {
                    var t, e;
                    return null != (t = null != (e = this.getLastPathComponent().match(/\.[^.]*$/)) ? e[0] : void 0) ? t : ""
                }, t.prototype.isHTML = function () {
                    return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)
                }, t.prototype.isPrefixedBy = function (t) {
                    var e;
                    return e = n(t), this.isEqualTo(t) || o(this.absoluteURL, e)
                }, t.prototype.isEqualTo = function (t) {
                    return this.absoluteURL === (null != t ? t.absoluteURL : void 0)
                }, t.prototype.toCacheKey = function () {
                    return this.requestURL
                }, t.prototype.toJSON = function () {
                    return this.absoluteURL
                }, t.prototype.toString = function () {
                    return this.absoluteURL
                }, t.prototype.valueOf = function () {
                    return this.absoluteURL
                }, n = function (t) {
                    return e(t.getOrigin() + t.getPath())
                }, e = function (t) {
                    return r(t, "/") ? t : t + "/"
                }, o = function (t, e) {
                    return t.slice(0, e.length) === e
                }, r = function (t, e) {
                    return t.slice(-e.length) === e
                }, t
            }()
        }.call(this), function () {
            var e = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.HttpRequest = function () {
                function n(n, r, o) {
                    this.delegate = n, this.requestCanceled = e(this.requestCanceled, this), this.requestTimedOut = e(this.requestTimedOut, this), this.requestFailed = e(this.requestFailed, this), this.requestLoaded = e(this.requestLoaded, this), this.requestProgressed = e(this.requestProgressed, this), this.url = t.Location.wrap(r).requestURL, this.referrer = t.Location.wrap(o).absoluteURL, this.createXHR()
                }

                return n.NETWORK_FAILURE = 0, n.TIMEOUT_FAILURE = -1, n.timeout = 60, n.prototype.send = function () {
                    var t;
                    return this.xhr && !this.sent ? (this.notifyApplicationBeforeRequestStart(), this.setProgress(0), this.xhr.send(), this.sent = !0, "function" == typeof (t = this.delegate).requestStarted ? t.requestStarted() : void 0) : void 0
                }, n.prototype.cancel = function () {
                    return this.xhr && this.sent ? this.xhr.abort() : void 0
                }, n.prototype.requestProgressed = function (t) {
                    return t.lengthComputable ? this.setProgress(t.loaded / t.total) : void 0
                }, n.prototype.requestLoaded = function () {
                    return this.endRequest(function (t) {
                        return function () {
                            var e;
                            return 200 <= (e = t.xhr.status) && 300 > e ? t.delegate.requestCompletedWithResponse(t.xhr.responseText, t.xhr.getResponseHeader("Turbolinks-Location")) : (t.failed = !0, t.delegate.requestFailedWithStatusCode(t.xhr.status, t.xhr.responseText))
                        }
                    }(this))
                }, n.prototype.requestFailed = function () {
                    return this.endRequest(function (t) {
                        return function () {
                            return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)
                        }
                    }(this))
                }, n.prototype.requestTimedOut = function () {
                    return this.endRequest(function (t) {
                        return function () {
                            return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)
                        }
                    }(this))
                }, n.prototype.requestCanceled = function () {
                    return this.endRequest()
                }, n.prototype.notifyApplicationBeforeRequestStart = function () {
                    return t.dispatch("turbolinks:request-start", {data: {url: this.url, xhr: this.xhr}})
                }, n.prototype.notifyApplicationAfterRequestEnd = function () {
                    return t.dispatch("turbolinks:request-end", {data: {url: this.url, xhr: this.xhr}})
                }, n.prototype.createXHR = function () {
                    return this.xhr = new XMLHttpRequest, this.xhr.open("GET", this.url, !0), this.xhr.timeout = 1e3 * this.constructor.timeout, this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml"), this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer), this.xhr.onprogress = this.requestProgressed, this.xhr.onload = this.requestLoaded, this.xhr.onerror = this.requestFailed, this.xhr.ontimeout = this.requestTimedOut, this.xhr.onabort = this.requestCanceled
                }, n.prototype.endRequest = function (t) {
                    return this.xhr ? (this.notifyApplicationAfterRequestEnd(), null != t && t.call(this), this.destroy()) : void 0
                }, n.prototype.setProgress = function (t) {
                    var e;
                    return this.progress = t, "function" == typeof (e = this.delegate).requestProgressed ? e.requestProgressed(this.progress) : void 0
                }, n.prototype.destroy = function () {
                    var t;
                    return this.setProgress(1), "function" == typeof (t = this.delegate).requestFinished && t.requestFinished(), this.delegate = null, this.xhr = null
                }, n
            }()
        }.call(this), function () {
            var e = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.ProgressBar = function () {
                function t() {
                    this.trickle = e(this.trickle, this), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement()
                }

                var n;
                return n = 300, t.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + n + "ms ease-out, opacity " + n / 2 + "ms " + n / 2 + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}", t.prototype.show = function () {
                    return this.visible ? void 0 : (this.visible = !0, this.installStylesheetElement(), this.installProgressElement(), this.startTrickling())
                }, t.prototype.hide = function () {
                    return this.visible && !this.hiding ? (this.hiding = !0, this.fadeProgressElement(function (t) {
                        return function () {
                            return t.uninstallProgressElement(), t.stopTrickling(), t.visible = !1, t.hiding = !1
                        }
                    }(this))) : void 0
                }, t.prototype.setValue = function (t) {
                    return this.value = t, this.refresh()
                }, t.prototype.installStylesheetElement = function () {
                    return document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
                }, t.prototype.installProgressElement = function () {
                    return this.progressElement.style.width = 0, this.progressElement.style.opacity = 1, document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
                }, t.prototype.fadeProgressElement = function (t) {
                    return this.progressElement.style.opacity = 0, setTimeout(t, 1.5 * n)
                }, t.prototype.uninstallProgressElement = function () {
                    return this.progressElement.parentNode ? document.documentElement.removeChild(this.progressElement) : void 0
                }, t.prototype.startTrickling = function () {
                    return null != this.trickleInterval ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, n)
                }, t.prototype.stopTrickling = function () {
                    return clearInterval(this.trickleInterval), this.trickleInterval = null
                }, t.prototype.trickle = function () {
                    return this.setValue(this.value + Math.random() / 100)
                }, t.prototype.refresh = function () {
                    return requestAnimationFrame(function (t) {
                        return function () {
                            return t.progressElement.style.width = 10 + 90 * t.value + "%"
                        }
                    }(this))
                }, t.prototype.createStylesheetElement = function () {
                    var t;
                    return t = document.createElement("style"), t.type = "text/css", t.textContent = this.constructor.defaultCSS, t
                }, t.prototype.createProgressElement = function () {
                    var t;
                    return t = document.createElement("div"), t.className = "turbolinks-progress-bar", t
                }, t
            }()
        }.call(this), function () {
            var e = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.BrowserAdapter = function () {
                function n(n) {
                    this.controller = n, this.showProgressBar = e(this.showProgressBar, this), this.progressBar = new t.ProgressBar
                }

                var r, o, i, s;
                return s = t.HttpRequest, r = s.NETWORK_FAILURE, i = s.TIMEOUT_FAILURE, o = 500, n.prototype.visitProposedToLocationWithAction = function (t, e) {
                    return this.controller.startVisitToLocationWithAction(t, e)
                }, n.prototype.visitStarted = function (t) {
                    return t.issueRequest(), t.changeHistory(), t.loadCachedSnapshot()
                }, n.prototype.visitRequestStarted = function (t) {
                    return this.progressBar.setValue(0), t.hasCachedSnapshot() || "restore" !== t.action ? this.showProgressBarAfterDelay() : this.showProgressBar()
                }, n.prototype.visitRequestProgressed = function (t) {
                    return this.progressBar.setValue(t.progress)
                }, n.prototype.visitRequestCompleted = function (t) {
                    return t.loadResponse()
                }, n.prototype.visitRequestFailedWithStatusCode = function (t, e) {
                    switch (e) {
                        case r:
                        case i:
                            return this.reload();
                        default:
                            return t.loadResponse()
                    }
                }, n.prototype.visitRequestFinished = function (t) {
                    return this.hideProgressBar()
                }, n.prototype.visitCompleted = function (t) {
                    return t.followRedirect()
                }, n.prototype.pageInvalidated = function () {
                    return this.reload()
                }, n.prototype.showProgressBarAfterDelay = function () {
                    return this.progressBarTimeout = setTimeout(this.showProgressBar, o)
                }, n.prototype.showProgressBar = function () {
                    return this.progressBar.show()
                }, n.prototype.hideProgressBar = function () {
                    return this.progressBar.hide(), clearTimeout(this.progressBarTimeout)
                }, n.prototype.reload = function () {
                    return window.location.reload()
                }, n
            }()
        }.call(this), function () {
            var e, n = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            e = !1, addEventListener("load", function () {
                return t.defer(function () {
                    return e = !0
                })
            }, !1), t.History = function () {
                function r(t) {
                    this.delegate = t, this.onPopState = n(this.onPopState, this)
                }

                return r.prototype.start = function () {
                    return this.started ? void 0 : (addEventListener("popstate", this.onPopState, !1), this.started = !0)
                }, r.prototype.stop = function () {
                    return this.started ? (removeEventListener("popstate", this.onPopState, !1), this.started = !1) : void 0
                }, r.prototype.push = function (e, n) {
                    return e = t.Location.wrap(e), this.update("push", e, n)
                }, r.prototype.replace = function (e, n) {
                    return e = t.Location.wrap(e), this.update("replace", e, n)
                }, r.prototype.onPopState = function (e) {
                    var n, r, o, i;
                    return this.shouldHandlePopState() && (i = null != (r = e.state) ? r.turbolinks : void 0) ? (n = t.Location.wrap(window.location), o = i.restorationIdentifier, this.delegate.historyPoppedToLocationWithRestorationIdentifier(n, o)) : void 0
                }, r.prototype.shouldHandlePopState = function () {
                    return !0 === e
                }, r.prototype.update = function (t, e, n) {
                    var r;
                    return r = {turbolinks: {restorationIdentifier: n}}, history[t + "State"](r, null, e)
                }, r
            }()
        }.call(this), function () {
            t.Snapshot = function () {
                function e(t) {
                    var e, n;
                    n = t.head, e = t.body, this.head = null != n ? n : document.createElement("head"), this.body = null != e ? e : document.createElement("body")
                }

                return e.wrap = function (t) {
                    return t instanceof this ? t : this.fromHTML(t)
                }, e.fromHTML = function (t) {
                    var e;
                    return e = document.createElement("html"), e.innerHTML = t, this.fromElement(e)
                }, e.fromElement = function (t) {
                    return new this({head: t.querySelector("head"), body: t.querySelector("body")})
                }, e.prototype.clone = function () {
                    return new e({head: this.head.cloneNode(!0), body: this.body.cloneNode(!0)})
                }, e.prototype.getRootLocation = function () {
                    var e, n;
                    return n = null != (e = this.getSetting("root")) ? e : "/", new t.Location(n)
                }, e.prototype.getCacheControlValue = function () {
                    return this.getSetting("cache-control")
                }, e.prototype.hasAnchor = function (t) {
                    try {
                        return null != this.body.querySelector("[id='" + t + "']")
                    } catch (t) {
                    }
                }, e.prototype.isPreviewable = function () {
                    return "no-preview" !== this.getCacheControlValue()
                }, e.prototype.isCacheable = function () {
                    return "no-cache" !== this.getCacheControlValue()
                }, e.prototype.getSetting = function (t) {
                    var e, n;
                    return n = this.head.querySelectorAll("meta[name='turbolinks-" + t + "']"), e = n[n.length - 1], null != e ? e.getAttribute("content") : void 0
                }, e
            }()
        }.call(this), function () {
            var e = [].slice;
            t.Renderer = function () {
                function t() {
                }

                var n;
                return t.render = function () {
                    var t, n, r, o;
                    return r = arguments[0], n = arguments[1], t = 3 <= arguments.length ? e.call(arguments, 2) : [], o = function (t, e, n) {
                        n.prototype = t.prototype;
                        var r = new n, o = t.apply(r, e);
                        return Object(o) === o ? o : r
                    }(this, t, function () {
                    }), o.delegate = r, o.render(n), o
                }, t.prototype.renderView = function (t) {
                    return this.delegate.viewWillRender(this.newBody), t(), this.delegate.viewRendered(this.newBody)
                }, t.prototype.invalidateView = function () {
                    return this.delegate.viewInvalidated()
                }, t.prototype.createScriptElement = function (t) {
                    var e;
                    return "false" === t.getAttribute("data-turbolinks-eval") ? t : (e = document.createElement("script"), e.textContent = t.textContent, n(e, t), e)
                }, n = function (t, e) {
                    var n, r, o, i, s, a, u;
                    for (i = e.attributes, a = [], n = 0, r = i.length; r > n; n++) s = i[n], o = s.name, u = s.value, a.push(t.setAttribute(o, u));
                    return a
                }, t
            }()
        }.call(this), function () {
            t.HeadDetails = function () {
                function t(t) {
                    var e, n, i, s, a, u, c;
                    for (this.element = t, this.elements = {}, c = this.element.childNodes, s = 0, u = c.length; u > s; s++) i = c[s], i.nodeType === Node.ELEMENT_NODE && (a = i.outerHTML, n = null != (e = this.elements)[a] ? e[a] : e[a] = {
                        type: o(i),
                        tracked: r(i),
                        elements: []
                    }, n.elements.push(i))
                }

                var e, n, r, o;
                return t.prototype.hasElementWithKey = function (t) {
                    return t in this.elements
                }, t.prototype.getTrackedElementSignature = function () {
                    var t, e;
                    return function () {
                        var n, r;
                        n = this.elements, r = [];
                        for (t in n) (e = n[t].tracked) && r.push(t);
                        return r
                    }.call(this).join("")
                }, t.prototype.getScriptElementsNotInDetails = function (t) {
                    return this.getElementsMatchingTypeNotInDetails("script", t)
                }, t.prototype.getStylesheetElementsNotInDetails = function (t) {
                    return this.getElementsMatchingTypeNotInDetails("stylesheet", t)
                }, t.prototype.getElementsMatchingTypeNotInDetails = function (t, e) {
                    var n, r, o, i, s, a;
                    o = this.elements, s = [];
                    for (r in o) i = o[r], a = i.type, n = i.elements, a !== t || e.hasElementWithKey(r) || s.push(n[0]);
                    return s
                }, t.prototype.getProvisionalElements = function () {
                    var t, e, n, r, o, i, s;
                    n = [], r = this.elements;
                    for (e in r) o = r[e], s = o.type, i = o.tracked, t = o.elements, null != s || i ? t.length > 1 && n.push.apply(n, t.slice(1)) : n.push.apply(n, t);
                    return n
                }, o = function (t) {
                    return e(t) ? "script" : n(t) ? "stylesheet" : void 0
                }, r = function (t) {
                    return "reload" === t.getAttribute("data-turbolinks-track")
                }, e = function (t) {
                    return "script" === t.tagName.toLowerCase()
                }, n = function (t) {
                    var e;
                    return "style" === (e = t.tagName.toLowerCase()) || "link" === e && "stylesheet" === t.getAttribute("rel")
                }, t
            }()
        }.call(this), function () {
            var e = function (t, e) {
                function r() {
                    this.constructor = t
                }

                for (var o in e) n.call(e, o) && (t[o] = e[o]);
                return r.prototype = e.prototype, t.prototype = new r, t.__super__ = e.prototype, t
            }, n = {}.hasOwnProperty;
            t.SnapshotRenderer = function (n) {
                function r(e, n) {
                    this.currentSnapshot = e, this.newSnapshot = n, this.currentHeadDetails = new t.HeadDetails(this.currentSnapshot.head), this.newHeadDetails = new t.HeadDetails(this.newSnapshot.head), this.newBody = this.newSnapshot.body
                }

                return e(r, n), r.prototype.render = function (t) {
                    return this.trackedElementsAreIdentical() ? (this.mergeHead(), this.renderView(function (e) {
                        return function () {
                            return e.replaceBody(), e.focusFirstAutofocusableElement(), t()
                        }
                    }(this))) : this.invalidateView()
                }, r.prototype.mergeHead = function () {
                    return this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements()
                }, r.prototype.replaceBody = function () {
                    return this.activateBodyScriptElements(), this.importBodyPermanentElements(), this.assignNewBody()
                }, r.prototype.trackedElementsAreIdentical = function () {
                    return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature()
                }, r.prototype.copyNewHeadStylesheetElements = function () {
                    var t, e, n, r, o;
                    for (r = this.getNewHeadStylesheetElements(), o = [], e = 0, n = r.length; n > e; e++) t = r[e], o.push(document.head.appendChild(t));
                    return o
                }, r.prototype.copyNewHeadScriptElements = function () {
                    var t, e, n, r, o;
                    for (r = this.getNewHeadScriptElements(), o = [], e = 0, n = r.length; n > e; e++) t = r[e], o.push(document.head.appendChild(this.createScriptElement(t)));
                    return o
                }, r.prototype.removeCurrentHeadProvisionalElements = function () {
                    var t, e, n, r, o;
                    for (r = this.getCurrentHeadProvisionalElements(), o = [], e = 0, n = r.length; n > e; e++) t = r[e], o.push(document.head.removeChild(t));
                    return o
                }, r.prototype.copyNewHeadProvisionalElements = function () {
                    var t, e, n, r, o;
                    for (r = this.getNewHeadProvisionalElements(), o = [], e = 0, n = r.length; n > e; e++) t = r[e], o.push(document.head.appendChild(t));
                    return o
                }, r.prototype.importBodyPermanentElements = function () {
                    var t, e, n, r, o, i;
                    for (r = this.getNewBodyPermanentElements(), i = [], e = 0, n = r.length; n > e; e++) o = r[e], (t = this.findCurrentBodyPermanentElement(o)) ? i.push(o.parentNode.replaceChild(t, o)) : i.push(void 0);
                    return i
                }, r.prototype.activateBodyScriptElements = function () {
                    var t, e, n, r, o, i;
                    for (r = this.getNewBodyScriptElements(), i = [], e = 0, n = r.length; n > e; e++) o = r[e], t = this.createScriptElement(o), i.push(o.parentNode.replaceChild(t, o));
                    return i
                }, r.prototype.assignNewBody = function () {
                    return document.body = this.newBody
                }, r.prototype.focusFirstAutofocusableElement = function () {
                    var t;
                    return null != (t = this.findFirstAutofocusableElement()) ? t.focus() : void 0
                }, r.prototype.getNewHeadStylesheetElements = function () {
                    return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)
                }, r.prototype.getNewHeadScriptElements = function () {
                    return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)
                }, r.prototype.getCurrentHeadProvisionalElements = function () {
                    return this.currentHeadDetails.getProvisionalElements()
                }, r.prototype.getNewHeadProvisionalElements = function () {
                    return this.newHeadDetails.getProvisionalElements()
                }, r.prototype.getNewBodyPermanentElements = function () {
                    return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")
                }, r.prototype.findCurrentBodyPermanentElement = function (t) {
                    return document.body.querySelector("#" + t.id + "[data-turbolinks-permanent]")
                }, r.prototype.getNewBodyScriptElements = function () {
                    return this.newBody.querySelectorAll("script")
                }, r.prototype.findFirstAutofocusableElement = function () {
                    return document.body.querySelector("[autofocus]")
                }, r
            }(t.Renderer)
        }.call(this), function () {
            var e = function (t, e) {
                function r() {
                    this.constructor = t
                }

                for (var o in e) n.call(e, o) && (t[o] = e[o]);
                return r.prototype = e.prototype, t.prototype = new r, t.__super__ = e.prototype, t
            }, n = {}.hasOwnProperty;
            t.ErrorRenderer = function (t) {
                function n(t) {
                    this.html = t
                }

                return e(n, t), n.prototype.render = function (t) {
                    return this.renderView(function (e) {
                        return function () {
                            return e.replaceDocumentHTML(), e.activateBodyScriptElements(), t()
                        }
                    }(this))
                }, n.prototype.replaceDocumentHTML = function () {
                    return document.documentElement.innerHTML = this.html
                }, n.prototype.activateBodyScriptElements = function () {
                    var t, e, n, r, o, i;
                    for (r = this.getScriptElements(), i = [], e = 0, n = r.length; n > e; e++) o = r[e], t = this.createScriptElement(o), i.push(o.parentNode.replaceChild(t, o));
                    return i
                }, n.prototype.getScriptElements = function () {
                    return document.documentElement.querySelectorAll("script")
                }, n
            }(t.Renderer)
        }.call(this), function () {
            t.View = function () {
                function e(t) {
                    this.delegate = t, this.element = document.documentElement
                }

                return e.prototype.getRootLocation = function () {
                    return this.getSnapshot().getRootLocation()
                }, e.prototype.getSnapshot = function () {
                    return t.Snapshot.fromElement(this.element)
                }, e.prototype.render = function (t, e) {
                    var n, r, o;
                    return o = t.snapshot, n = t.error, r = t.isPreview, this.markAsPreview(r), null != o ? this.renderSnapshot(o, e) : this.renderError(n, e)
                }, e.prototype.markAsPreview = function (t) {
                    return t ? this.element.setAttribute("data-turbolinks-preview", "") : this.element.removeAttribute("data-turbolinks-preview")
                }, e.prototype.renderSnapshot = function (e, n) {
                    return t.SnapshotRenderer.render(this.delegate, n, this.getSnapshot(), t.Snapshot.wrap(e))
                }, e.prototype.renderError = function (e, n) {
                    return t.ErrorRenderer.render(this.delegate, n, e)
                }, e
            }()
        }.call(this), function () {
            var e = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.ScrollManager = function () {
                function t(t) {
                    this.delegate = t, this.onScroll = e(this.onScroll, this)
                }

                return t.prototype.start = function () {
                    return this.started ? void 0 : (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
                }, t.prototype.stop = function () {
                    return this.started ? (removeEventListener("scroll", this.onScroll, !1), this.started = !1) : void 0
                }, t.prototype.scrollToElement = function (t) {
                    return t.scrollIntoView()
                }, t.prototype.scrollToPosition = function (t) {
                    var e, n;
                    return e = t.x, n = t.y, window.scrollTo(e, n)
                }, t.prototype.onScroll = function (t) {
                    return this.updatePosition({x: window.pageXOffset, y: window.pageYOffset})
                }, t.prototype.updatePosition = function (t) {
                    var e;
                    return this.position = t, null != (e = this.delegate) ? e.scrollPositionChanged(this.position) : void 0
                }, t
            }()
        }.call(this), function () {
            t.SnapshotCache = function () {
                function e(t) {
                    this.size = t, this.keys = [], this.snapshots = {}
                }

                var n;
                return e.prototype.has = function (t) {
                    return n(t) in this.snapshots
                }, e.prototype.get = function (t) {
                    var e;
                    if (this.has(t)) return e = this.read(t), this.touch(t), e
                }, e.prototype.put = function (t, e) {
                    return this.write(t, e), this.touch(t), e
                }, e.prototype.read = function (t) {
                    var e;
                    return e = n(t), this.snapshots[e]
                }, e.prototype.write = function (t, e) {
                    var r;
                    return r = n(t), this.snapshots[r] = e
                }, e.prototype.touch = function (t) {
                    var e, r;
                    return r = n(t), e = this.keys.indexOf(r), e > -1 && this.keys.splice(e, 1), this.keys.unshift(r), this.trim()
                }, e.prototype.trim = function () {
                    var t, e, n, r, o;
                    for (r = this.keys.splice(this.size), o = [], t = 0, n = r.length; n > t; t++) e = r[t], o.push(delete this.snapshots[e]);
                    return o
                }, n = function (e) {
                    return t.Location.wrap(e).toCacheKey()
                }, e
            }()
        }.call(this), function () {
            var e = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.Visit = function () {
                function n(n, r, o) {
                    this.controller = n, this.action = o, this.performScroll = e(this.performScroll, this), this.identifier = t.uuid(), this.location = t.Location.wrap(r), this.adapter = this.controller.adapter, this.state = "initialized", this.timingMetrics = {}
                }

                var r;
                return n.prototype.start = function () {
                    return "initialized" === this.state ? (this.recordTimingMetric("visitStart"), this.state = "started", this.adapter.visitStarted(this)) : void 0
                }, n.prototype.cancel = function () {
                    var t;
                    return "started" === this.state ? (null != (t = this.request) && t.cancel(), this.cancelRender(), this.state = "canceled") : void 0
                }, n.prototype.complete = function () {
                    var t;
                    return "started" === this.state ? (this.recordTimingMetric("visitEnd"), this.state = "completed", "function" == typeof (t = this.adapter).visitCompleted && t.visitCompleted(this), this.controller.visitCompleted(this)) : void 0
                }, n.prototype.fail = function () {
                    var t;
                    return "started" === this.state ? (this.state = "failed", "function" == typeof (t = this.adapter).visitFailed ? t.visitFailed(this) : void 0) : void 0
                }, n.prototype.changeHistory = function () {
                    var t, e;
                    return this.historyChanged ? void 0 : (t = this.location.isEqualTo(this.referrer) ? "replace" : this.action, e = r(t), this.controller[e](this.location, this.restorationIdentifier), this.historyChanged = !0)
                }, n.prototype.issueRequest = function () {
                    return this.shouldIssueRequest() && null == this.request ? (this.progress = 0, this.request = new t.HttpRequest(this, this.location, this.referrer), this.request.send()) : void 0
                }, n.prototype.getCachedSnapshot = function () {
                    var t;
                    return !(t = this.controller.getCachedSnapshotForLocation(this.location)) || null != this.location.anchor && !t.hasAnchor(this.location.anchor) || "restore" !== this.action && !t.isPreviewable() ? void 0 : t
                }, n.prototype.hasCachedSnapshot = function () {
                    return null != this.getCachedSnapshot()
                }, n.prototype.loadCachedSnapshot = function () {
                    var t, e;
                    return (e = this.getCachedSnapshot()) ? (t = this.shouldIssueRequest(), this.render(function () {
                        var n;
                        return this.cacheSnapshot(), this.controller.render({
                            snapshot: e,
                            isPreview: t
                        }, this.performScroll), "function" == typeof (n = this.adapter).visitRendered && n.visitRendered(this), t ? void 0 : this.complete()
                    })) : void 0
                }, n.prototype.loadResponse = function () {
                    return null != this.response ? this.render(function () {
                        var t, e;
                        return this.cacheSnapshot(), this.request.failed ? (this.controller.render({error: this.response}, this.performScroll), "function" == typeof (t = this.adapter).visitRendered && t.visitRendered(this), this.fail()) : (this.controller.render({snapshot: this.response}, this.performScroll), "function" == typeof (e = this.adapter).visitRendered && e.visitRendered(this), this.complete())
                    }) : void 0
                }, n.prototype.followRedirect = function () {
                    return this.redirectedToLocation && !this.followedRedirect ? (this.location = this.redirectedToLocation, this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = !0) : void 0
                }, n.prototype.requestStarted = function () {
                    var t;
                    return this.recordTimingMetric("requestStart"), "function" == typeof (t = this.adapter).visitRequestStarted ? t.visitRequestStarted(this) : void 0
                }, n.prototype.requestProgressed = function (t) {
                    var e;
                    return this.progress = t, "function" == typeof (e = this.adapter).visitRequestProgressed ? e.visitRequestProgressed(this) : void 0
                }, n.prototype.requestCompletedWithResponse = function (e, n) {
                    return this.response = e, null != n && (this.redirectedToLocation = t.Location.wrap(n)), this.adapter.visitRequestCompleted(this)
                }, n.prototype.requestFailedWithStatusCode = function (t, e) {
                    return this.response = e, this.adapter.visitRequestFailedWithStatusCode(this, t)
                }, n.prototype.requestFinished = function () {
                    var t;
                    return this.recordTimingMetric("requestEnd"), "function" == typeof (t = this.adapter).visitRequestFinished ? t.visitRequestFinished(this) : void 0
                }, n.prototype.performScroll = function () {
                    return this.scrolled ? void 0 : ("restore" === this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = !0)
                }, n.prototype.scrollToRestoredPosition = function () {
                    var t, e;
                    return t = null != (e = this.restorationData) ? e.scrollPosition : void 0, null != t ? (this.controller.scrollToPosition(t), !0) : void 0
                }, n.prototype.scrollToAnchor = function () {
                    return null != this.location.anchor ? (this.controller.scrollToAnchor(this.location.anchor), !0) : void 0
                }, n.prototype.scrollToTop = function () {
                    return this.controller.scrollToPosition({x: 0, y: 0})
                }, n.prototype.recordTimingMetric = function (t) {
                    var e;
                    return null != (e = this.timingMetrics)[t] ? e[t] : e[t] = (new Date).getTime()
                }, n.prototype.getTimingMetrics = function () {
                    return t.copyObject(this.timingMetrics)
                }, r = function (t) {
                    switch (t) {
                        case"replace":
                            return "replaceHistoryWithLocationAndRestorationIdentifier";
                        case"advance":
                        case"restore":
                            return "pushHistoryWithLocationAndRestorationIdentifier"
                    }
                }, n.prototype.shouldIssueRequest = function () {
                    return "restore" !== this.action || !this.hasCachedSnapshot()
                }, n.prototype.cacheSnapshot = function () {
                    return this.snapshotCached ? void 0 : (this.controller.cacheSnapshot(), this.snapshotCached = !0)
                }, n.prototype.render = function (t) {
                    return this.cancelRender(), this.frame = requestAnimationFrame(function (e) {
                        return function () {
                            return e.frame = null, t.call(e)
                        }
                    }(this))
                }, n.prototype.cancelRender = function () {
                    return this.frame ? cancelAnimationFrame(this.frame) : void 0
                }, n
            }()
        }.call(this), function () {
            var e = function (t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.Controller = function () {
                function n() {
                    this.clickBubbled = e(this.clickBubbled, this), this.clickCaptured = e(this.clickCaptured, this), this.pageLoaded = e(this.pageLoaded, this), this.history = new t.History(this), this.view = new t.View(this), this.scrollManager = new t.ScrollManager(this), this.restorationData = {}, this.clearCache()
                }

                return n.prototype.start = function () {
                    return t.supported && !this.started ? (addEventListener("click", this.clickCaptured, !0), addEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.start(), this.startHistory(), this.started = !0, this.enabled = !0) : void 0
                }, n.prototype.disable = function () {
                    return this.enabled = !1
                }, n.prototype.stop = function () {
                    return this.started ? (removeEventListener("click", this.clickCaptured, !0), removeEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.stop(), this.stopHistory(), this.started = !1) : void 0
                }, n.prototype.clearCache = function () {
                    return this.cache = new t.SnapshotCache(10)
                }, n.prototype.visit = function (e, n) {
                    var r, o;
                    return null == n && (n = {}), e = t.Location.wrap(e), this.applicationAllowsVisitingLocation(e) ? this.locationIsVisitable(e) ? (r = null != (o = n.action) ? o : "advance", this.adapter.visitProposedToLocationWithAction(e, r)) : window.location = e : void 0
                }, n.prototype.startVisitToLocationWithAction = function (e, n, r) {
                    var o;
                    return t.supported ? (o = this.getRestorationDataForIdentifier(r), this.startVisit(e, n, {restorationData: o})) : window.location = e
                }, n.prototype.startHistory = function () {
                    return this.location = t.Location.wrap(window.location), this.restorationIdentifier = t.uuid(), this.history.start(), this.history.replace(this.location, this.restorationIdentifier)
                }, n.prototype.stopHistory = function () {
                    return this.history.stop()
                }, n.prototype.pushHistoryWithLocationAndRestorationIdentifier = function (e, n) {
                    return this.restorationIdentifier = n, this.location = t.Location.wrap(e), this.history.push(this.location, this.restorationIdentifier)
                }, n.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function (e, n) {
                    return this.restorationIdentifier = n, this.location = t.Location.wrap(e), this.history.replace(this.location, this.restorationIdentifier)
                }, n.prototype.historyPoppedToLocationWithRestorationIdentifier = function (e, n) {
                    var r;
                    return this.restorationIdentifier = n, this.enabled ? (r = this.getRestorationDataForIdentifier(this.restorationIdentifier), this.startVisit(e, "restore", {
                        restorationIdentifier: this.restorationIdentifier,
                        restorationData: r,
                        historyChanged: !0
                    }), this.location = t.Location.wrap(e)) : this.adapter.pageInvalidated()
                }, n.prototype.getCachedSnapshotForLocation = function (t) {
                    var e;
                    return e = this.cache.get(t), e ? e.clone() : void 0
                }, n.prototype.shouldCacheSnapshot = function () {
                    return this.view.getSnapshot().isCacheable()
                }, n.prototype.cacheSnapshot = function () {
                    var t;
                    return this.shouldCacheSnapshot() ? (this.notifyApplicationBeforeCachingSnapshot(), t = this.view.getSnapshot(), this.cache.put(this.lastRenderedLocation, t.clone())) : void 0
                }, n.prototype.scrollToAnchor = function (t) {
                    var e;
                    return (e = document.getElementById(t)) ? this.scrollToElement(e) : this.scrollToPosition({
                        x: 0,
                        y: 0
                    })
                }, n.prototype.scrollToElement = function (t) {
                    return this.scrollManager.scrollToElement(t)
                }, n.prototype.scrollToPosition = function (t) {
                    return this.scrollManager.scrollToPosition(t)
                }, n.prototype.scrollPositionChanged = function (t) {
                    var e;
                    return e = this.getCurrentRestorationData(), e.scrollPosition = t
                }, n.prototype.render = function (t, e) {
                    return this.view.render(t, e)
                }, n.prototype.viewInvalidated = function () {
                    return this.adapter.pageInvalidated()
                }, n.prototype.viewWillRender = function (t) {
                    return this.notifyApplicationBeforeRender(t)
                }, n.prototype.viewRendered = function () {
                    return this.lastRenderedLocation = this.currentVisit.location, this.notifyApplicationAfterRender()
                }, n.prototype.pageLoaded = function () {
                    return this.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
                }, n.prototype.clickCaptured = function () {
                    return removeEventListener("click", this.clickBubbled, !1), addEventListener("click", this.clickBubbled, !1)
                }, n.prototype.clickBubbled = function (t) {
                    var e, n, r;
                    return this.enabled && this.clickEventIsSignificant(t) && (n = this.getVisitableLinkForNode(t.target)) && (r = this.getVisitableLocationForLink(n)) && this.applicationAllowsFollowingLinkToLocation(n, r) ? (t.preventDefault(), e = this.getActionForLink(n), this.visit(r, {action: e})) : void 0
                }, n.prototype.applicationAllowsFollowingLinkToLocation = function (t, e) {
                    var n;
                    return n = this.notifyApplicationAfterClickingLinkToLocation(t, e), !n.defaultPrevented
                }, n.prototype.applicationAllowsVisitingLocation = function (t) {
                    var e;
                    return e = this.notifyApplicationBeforeVisitingLocation(t), !e.defaultPrevented
                }, n.prototype.notifyApplicationAfterClickingLinkToLocation = function (e, n) {
                    return t.dispatch("turbolinks:click", {target: e, data: {url: n.absoluteURL}, cancelable: !0})
                }, n.prototype.notifyApplicationBeforeVisitingLocation = function (e) {
                    return t.dispatch("turbolinks:before-visit", {data: {url: e.absoluteURL}, cancelable: !0})
                }, n.prototype.notifyApplicationAfterVisitingLocation = function (e) {
                    return t.dispatch("turbolinks:visit", {data: {url: e.absoluteURL}})
                }, n.prototype.notifyApplicationBeforeCachingSnapshot = function () {
                    return t.dispatch("turbolinks:before-cache")
                }, n.prototype.notifyApplicationBeforeRender = function (e) {
                    return t.dispatch("turbolinks:before-render", {data: {newBody: e}})
                }, n.prototype.notifyApplicationAfterRender = function () {
                    return t.dispatch("turbolinks:render")
                }, n.prototype.notifyApplicationAfterPageLoad = function (e) {
                    return null == e && (e = {}), t.dispatch("turbolinks:load", {
                        data: {
                            url: this.location.absoluteURL,
                            timing: e
                        }
                    })
                }, n.prototype.startVisit = function (t, e, n) {
                    var r;
                    return null != (r = this.currentVisit) && r.cancel(), this.currentVisit = this.createVisit(t, e, n), this.currentVisit.start(), this.notifyApplicationAfterVisitingLocation(t)
                }, n.prototype.createVisit = function (e, n, r) {
                    var o, i, s, a, u;
                    return i = null != r ? r : {}, a = i.restorationIdentifier, s = i.restorationData, o = i.historyChanged, u = new t.Visit(this, e, n), u.restorationIdentifier = null != a ? a : t.uuid(), u.restorationData = t.copyObject(s), u.historyChanged = o, u.referrer = this.location, u
                }, n.prototype.visitCompleted = function (t) {
                    return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())
                }, n.prototype.clickEventIsSignificant = function (t) {
                    return !(t.defaultPrevented || t.target.isContentEditable || t.which > 1 || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey)
                }, n.prototype.getVisitableLinkForNode = function (e) {
                    return this.nodeIsVisitable(e) ? t.closest(e, "a[href]:not([target])") : void 0
                }, n.prototype.getVisitableLocationForLink = function (e) {
                    var n;
                    return n = new t.Location(e.getAttribute("href")), this.locationIsVisitable(n) ? n : void 0
                }, n.prototype.getActionForLink = function (t) {
                    var e;
                    return null != (e = t.getAttribute("data-turbolinks-action")) ? e : "advance"
                }, n.prototype.nodeIsVisitable = function (e) {
                    var n;
                    return !(n = t.closest(e, "[data-turbolinks]")) || "false" !== n.getAttribute("data-turbolinks")
                }, n.prototype.locationIsVisitable = function (t) {
                    return t.isPrefixedBy(this.view.getRootLocation()) && t.isHTML()
                }, n.prototype.getCurrentRestorationData = function () {
                    return this.getRestorationDataForIdentifier(this.restorationIdentifier)
                }, n.prototype.getRestorationDataForIdentifier = function (t) {
                    var e;
                    return null != (e = this.restorationData)[t] ? e[t] : e[t] = {}
                }, n
            }()
        }.call(this), function () {
            var e, n, r;
            t.start = function () {
                return n() ? (null == t.controller && (t.controller = e()), t.controller.start()) : void 0
            }, n = function () {
                return null == window.Turbolinks && (window.Turbolinks = t), r()
            }, e = function () {
                var e;
                return e = new t.Controller, e.adapter = new t.BrowserAdapter(e), e
            }, (r = function () {
                return window.Turbolinks === t
            })() && t.start()
        }.call(this)
    }).call(this), "object" == typeof module && module.exports ? module.exports = t : "function" == typeof define && define.amd && define(t)
}.call(this), document.addEventListener("turbolinks:load", function () {
    smoothScroll.init({easing: "easeInOutCubic", offset: 64});
    var t = document.getElementById("js-navOpen"), e = document.getElementById("js-navClose"),
        n = document.getElementById("js-metabarNav");
    t.addEventListener("click", function () {
        n.classList.add("open")
    }), e.addEventListener("click", function () {
        n.classList.remove("open")
    });
    for (var r = document.getElementsByClassName("embedly-card"), o = 0; o < r.length; o++) r[o].setAttribute("data-card-controls", "0"), r[o].setAttribute("data-card-align", "left"), r[o].setAttribute("data-card-recommend", "0"), r[o].setAttribute("data-card-chrome", "0")
});
//# sourceMappingURL=scripts.js.map
