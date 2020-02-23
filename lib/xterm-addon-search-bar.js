(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SearchBarAddon = {})));
}(this, (function (exports) { 'use strict';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".xterm-search-bar__addon {\n  position: absolute;\n  max-width: 1467px;\n  top: 0;\n  right: 28px;\n  color: #000;\n  background: #fff;\n  padding: 5px 10px;\n  box-shadow: 0 2px 8px #000;\n  background-color: #252526;\n  z-index: 999;\n  display: flex;\n}\n.xterm-search-bar__addon .search-bar__input {\n  background-color: rgb(60, 60, 60);\n  color: rgb(204, 204, 204);\n  border: 0;\n  padding: 2px;\n  height: 20px;\n  width: 227px;\n}\n.xterm-search-bar__addon .search-bar__btn {\n  min-width: 20px;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  display: -webkit-flex;\n  flex: initial;\n  background-position: 50%;\n  margin-left: 3px;\n  background-repeat: no-repeat;\n  background-color: #252526;\n  border: 0;\n  cursor: pointer;\n}\n.xterm-search-bar__addon .search-bar__btn:hover {\n  background-color: #666;\n}\n.xterm-search-bar__addon .search-bar__btn.prev {\n  margin-left: 20px;\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBzdHlsZT0iZmlsbDojZmZmOyI+CiAgPHBhdGggZD0iTTUuMzk5OSw4IEM1LjM5OTksNy44NDcgNS40NTg5LDcuNjkzIDUuNTc1OSw3LjU3NiBMOS41NzU5LDMuNTc2IEM5LjgwOTksMy4zNDEgMTAuMTg5OSwzLjM0MSAxMC40MjM5LDMuNTc2IEMxMC42NTg5LDMuODEgMTAuNjU4OSw0LjE5IDEwLjQyMzksNC40MjQgTDYuODQ4OSw4IEwxMC40MjM5LDExLjU3NiBDMTAuNjU4OSwxMS44MSAxMC42NTg5LDEyLjE5IDEwLjQyMzksMTIuNDI0IEMxMC4xODk5LDEyLjY1OSA5LjgwOTksMTIuNjU5IDkuNTc1OSwxMi40MjQgTDUuNTc1OSw4LjQyNCBDNS40NTg5LDguMzA3IDUuMzk5OSw4LjE1MyA1LjM5OTksOCIvPgo8L3N2Zz4K');\n}\n.xterm-search-bar__addon .search-bar__btn.next {\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2IiBzdHlsZT0iZmlsbDojZmZmOyI+CiAgPHBhdGggZD0iTTEwLjYwMDEsOCBDMTAuNjAwMSw4LjE1MyAxMC41NDExLDguMzA3IDEwLjQyNDEsOC40MjQgTDYuNDI0MSwxMi40MjQgQzYuMTkwMSwxMi42NTkgNS44MTAxLDEyLjY1OSA1LjU3NjEsMTIuNDI0IEM1LjM0MTEsMTIuMTkgNS4zNDExLDExLjgxIDUuNTc2MSwxMS41NzYgTDkuMTUxMSw4IEw1LjU3NjEsNC40MjQgQzUuMzQxMSw0LjE5IDUuMzQxMSwzLjgxIDUuNTc2MSwzLjU3NiBDNS44MTAxLDMuMzQxIDYuMTkwMSwzLjM0MSA2LjQyNDEsMy41NzYgTDEwLjQyNDEsNy41NzYgQzEwLjU0MTEsNy42OTMgMTAuNjAwMSw3Ljg0NyAxMC42MDAxLDgiLz4KPC9zdmc+Cg==');\n}\n.xterm-search-bar__addon .search-bar__btn.close {\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIiBzdHlsZT0iZmlsbDojZmZmOyI+CiAgPHBhdGggZD0iTTcsNiBMOSw0IEM5LjI3NCwzLjcyNiA5LjI3NCwzLjI3NCA5LDMgQzguNzI2LDIuNzI2IDguMjc0LDIuNzI2IDgsMyBMNiw1IEw0LDMgQzMuNzI2LDIuNzI2IDMuMjc0LDIuNzI2IDMsMyBDMi43MjYsMy4yNzQgMi43MjYsMy43MjYgMyw0IEw1LDYgTDMsOCBDMi43MjYsOC4yNzQgMi43MjYsOC43MjYgMyw5IEMzLjI3NCw5LjI3NCAzLjcyNiw5LjI3NCA0LDkgTDYsNyBMOCw5IEM4LjI3NCw5LjI3NCA4LjcyNiw5LjI3NCA5LDkgQzkuMjc0LDguNzI2IDkuMjc0LDguMjc0IDksOCBMNyw2IFoiLz4KPC9zdmc+Cg==');\n}\n";
styleInject(css);

const ADDON_MARKER_NAME = 'xterm-search-bar__addon';
class SearchBarAddon {
    constructor(options) {
        this.options = options || {};
        if (this.options && this.options.searchAddon) {
            this.searchAddon = this.options.searchAddon;
        }
    }
    activate(terminal) {
        this.terminal = terminal;
        if (!this.searchAddon) {
            console.error('Cannot use search bar addon until search addon has been loaded!');
        }
    }
    dispose() {
        this.hidden();
    }
    show() {
        if (!this.terminal || !this.terminal.element) {
            return;
        }
        if (this.searchBarElement) {
            this.searchBarElement.style.visibility = 'visible';
            this.searchBarElement.querySelector('input').select();
            return;
        }
        this.terminal.element.style.position = 'relative';
        const element = document.createElement('div');
        element.innerHTML = `
       <input type="text" class="search-bar__input" name="search-bar__input"/>
       <button class="search-bar__btn prev"></button>
       <button class="search-bar__btn next"></button>
       <button class="search-bar__btn close"></button>
    `;
        element.className = ADDON_MARKER_NAME;
        const parentElement = this.terminal.element.parentElement;
        this.searchBarElement = element;
        if (!['relative', 'absoulte', 'fixed'].includes(parentElement.style.position)) {
            parentElement.style.position = 'relative';
        }
        parentElement.appendChild(this.searchBarElement);
        this.on('.search-bar__btn.close', 'click', () => {
            this.hidden();
        });
        this.on('.search-bar__btn.next', 'click', () => {
            this.searchAddon.findNext(this.searchKey, {
                incremental: false
            });
        });
        this.on('.search-bar__btn.prev', 'click', () => {
            this.searchAddon.findPrevious(this.searchKey, {
                incremental: false
            });
        });
        this.on('.search-bar__input', 'keyup', (e) => {
            this.searchKey = e.target.value;
            this.searchAddon.findNext(this.searchKey, {
                incremental: e.key !== `Enter`
            });
        });
        this.searchBarElement.querySelector('input').select();
    }
    hidden() {
        if (this.searchBarElement && this.terminal.element.parentElement) {
            this.searchBarElement.style.visibility = 'hidden';
        }
    }
    on(selector, event, cb) {
        const parentElement = this.terminal.element.parentElement;
        parentElement.addEventListener(event, (e) => {
            let target = e.target;
            while (target !== document.querySelector(selector)) {
                if (target === parentElement) {
                    target = null;
                    break;
                }
                target = target.parentElement;
            }
            if (target === document.querySelector(selector)) {
                cb.call(this, e);
                e.stopPropagation();
            }
        });
    }
    addNewStyle(newStyle) {
        let styleElement = document.getElementById(ADDON_MARKER_NAME);
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = ADDON_MARKER_NAME;
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        styleElement.appendChild(document.createTextNode(newStyle));
    }
}

exports.SearchBarAddon = SearchBarAddon;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xterm-addon-search-bar.js.map
