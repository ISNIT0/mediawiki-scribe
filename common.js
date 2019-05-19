"use strict";

/*
Copyright (C) 2019 - 2019 Ondřej Merkun 

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function removeTemplateContainer() {
  setTimeout(function () {
    $('#templateContainer').slideUp('slow');
    setTimeout(function () {
      templateContainer.parentNode.removeChild(templateContainer);
    }, 600);
  }, 300);
}

function contentHasChildren() {
  return document.getElementsByClassName('ve-ce-contentBranchNode')[0].hasChildNodes();
}

function isVisualEditorEmpty() {
  if (contentHasChildren()) {
    if (document.getElementsByClassName('ve-ce-branchNode-inlineSlug')[0].textContent !== '') {
      return false;
    }
  } else if (document.getElementsByClassName('ve-ce-contentBranchNode')[0].textContent !== '') {
    return false;
  }

  return true;
}

var sectionHeadings = [];
var referenceCards = [];

function populateReferencesPanel(referenceCards) {
  var labelColor = '';
  referenceCards.map(function (item, index) {
    var card = document.createElement('div');

    switch (item.type) {
      case 'news':
        labelColor = '#3669c9';
        break;

      case 'paper':
        labelColor = '#1aae8a';
        break;

      case 'search':
        labelColor = '#fecb45';
        break;
    }

    if (index > 0) {
      if (item.heading !== referenceCards[index - 1].heading) {
        card.innerHTML += "<h3 style='margin-bottom: 0.5em;'>".concat(item.heading, "</h3>");
      }
    } else {
      card.innerHTML += "<h3 style='margin-bottom: 0.5em;'>".concat(item.heading, "</h3>");
    }

    card.innerHTML += "\n      <a href='".concat(item.link, "' target='_blank'>").concat(item.link, "</a>\n      <span style='margin: 1em; padding: 0.1em 0.4em; background-color: ").concat(labelColor, ";'>").concat(item.type, "</span>\n      <ul style='margin: 0; padding: 0; padding-left: 1em;'>\n        <li>").concat(item.desc, "</li>\n      </ul>\n      ");
    referencesContainer.append(card);
  });
}

function showReferencesPanel() {
  document.getElementsByClassName('ve-init-mw-target-surface')[0].style.width = '70%';
  var references = document.createElement('div');
  references.innerHTML = "<div id='referencesContainer' style='background-color: #F8F9FA; border: 1px solid #72777d; padding: 2em;\n    display: inline-block; z-index: 999; overflowY: scroll; overflowX: hidden; white-space: break-word; width: 100%;\n    box-sizing: border-box;'>\n      <h2 style='border-bottom: 1px solid #72777d; margin: 0; margin-bottom: 1.5em;'>References</h2>\n    </div>";
  references.style.position = 'fixed';
  references.style.top = '122px';
  references.style.bottom = 0;
  references.style.right = 0;
  references.style.zIndex = 999;
  references.style.width = '30%';
  references.style.maxHeight = '85vh';
  references.style.overflow = 'scroll';
  references.style.overflowX = 'hidden';
  references.style.whiteSpace = 'break-spaces';
  document.body.appendChild(references);
}

mw.hook('ve.activationComplete').add(function () {
  if (isVisualEditorEmpty()) {
    var container = document.createElement('div');
    container.innerHTML = "<div style='padding: 1em 4em; border: 1px solid #72777d;'\n        id='templateContainer'>\n        <h3 style='margin: 0; padding: 0;'>Creating a new article?</h3>\n        <h4 style='font-weight: normal; margin: 0; padding: 0;'>Choose one of these templates to get started quickly...</h4>\n        \n        <div style='display: flex; justify-content: flex-start;\n        margin-top: 1.5em; flex-wrap: wrap;' id='templateButtonsContainer'>\n        </div>\n      </div>";
    content.append(container);
    var templateButtons = '';
    fetch('https://scribe-mediawiki.herokuapp.com/classes/' + encodeURIComponent(firstHeading.textContent)).then(function (response) {
      response = response.json();
      return response;
    }).then(function (responseJson) {
      var text;
      Array.prototype.slice.call(responseJson, 0).map(function (item) {
        text = item.label.split('');
        text[0] = text[0].toUpperCase();
        text = text.join('');
        templateButtons += "<div data-id=".concat(item.id, " style=\"background-color: #F8F9FA; margin-right: 2em; color: #36c;\n                cursor: pointer; padding: 0.2em 1em; border: 1px solid #72777d;\" class=\"templateButtons\">\n                  ").concat(text, "\n                </div>");
      });
      templateButtonsContainer.innerHTML = templateButtons;
    }).then(function () {
      Array.prototype.slice.call(document.getElementsByClassName('templateButtons'), 0).map(function (item) {
        item.addEventListener('click', function () {
          Array.prototype.slice.call(document.getElementsByClassName('templateButtons'), 0).map(function (button) {
            button.setAttribute('disabled', true);
          });
          fetch('https://scribe-mediawiki.herokuapp.com/articleTemplate/' + item.dataset.id).then(function (response) {
            response = response.json();
            return response;
          }).then(function (responseJson) {
            sectionHeadings = _toConsumableArray(responseJson);
            var data = responseJson.map(function (item) {
              return [{
                type: 'mwHeading',
                attributes: {
                  level: 2
                }
              }].concat(_toConsumableArray(item.line), [{
                type: '/mwHeading'
              }, {
                type: 'paragraph'
              }, {
                type: '/paragraph'
              }]);
            }).reduce(function (acc, item) {
              return acc.concat(item);
            }, []);
            var surfaceFragment = ve.init.target.getSurface().getModel().getLinearFragment(new ve.Range(0));
            surfaceFragment.insertContent(data).collapseToEnd().select();
            ve.init.target.getSurface().getView().focus();
            showReferencesPanel();
            Promise.all(sectionHeadings.map(function (sectionHeading) {
              return fetch('https://scribe-mediawiki.herokuapp.com/references/' + firstHeading.textContent + '/' + encodeURIComponent(sectionHeading.line)).then(function (response) {
                response = response.json();
                return response;
              }).then(function (responseJson) {
                return responseJson.map(function (referenceItem) {
                  return {
                    heading: sectionHeading.line,
                    desc: referenceItem.title,
                    link: referenceItem.url,
                    type: referenceItem.type
                  };
                });
              });
            })).then(function (arg) {
              var args = arg.reduce(function (acc, item) {
                return acc.concat(item);
              }, []);
              populateReferencesPanel(args);
            });
          });
          removeTemplateContainer();
        });
      });
    });
  }
});
