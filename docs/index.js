/*
(c) 2023 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const asyncWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

const asyncErrorLog = (async function () {
  try {
    const module = await import("https://scotwatson.github.io/Debug/Test/ErrorLog.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

const asyncJSON = (async function () {
  try {
    const module = await import("https://scotwatson.github.io/WebJSON/Test/JSON.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

(async function () {
  try {
    const modules = await Promise.all( [ asyncWindow, asyncErrorLog, asyncJSON ] );
    start(modules);
  } catch (e) {
    console.error(e);
  }
})();

async function start( [ evtWindow, ErrorLog, JSON ] ) {
  try {
    
  } catch (e) {
    ErrorLog.rethrow({
      functionName: "start",
      error: e,
    });
  }
}

function isWhitespace(char) {
  const charCode = char.toValue();
  return ((charCode === 0x0009) || (charCode === 0x000A) || (charCode === 0x000D) || (charCode === 0x0020));
}

function isStructural(char) {
  const charCode = char.toValue();
  return ((charCode === 0x005B) || (charCode === 0x007B) || (charCode === 0x005D) || (charCode === 0x007D) || (charCode === 0x003A) || (charCode === 0x002C));
}

function tokenizeInit() {
  return {
    currentToken: "",
    quoted: false,
  };
}
function tokenize(input, state) {
  const doubleQuote = new Unicode.CodePoint(0x22);
  if (state.quoted) {
    if (input === "\"") {
      state.quoted = false;
    }
    state.currentToken += input;
  } else {
    if (isWhitespace(input)) {
      if (state.currentToken !== "") {
        // end token
        const ret = state.currentToken;
        state.currentToken = "";
        return ret;
      }
    } else {
      if (input === "\"") {
        state.quoted = true;
      }
      state.currentToken += input;
    }
  }
  return null;
}
function tokenizeFlush() {
  
}
