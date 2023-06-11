var DOM = {};
DOM.qSel = (sel) => { return document.querySelector(sel); };
DOM.qSelAll = (sel) => { return document.querySelectorAll(sel); };
DOM.iSel = (id) => { return document.getElementById(id); };
DOM.htmlToElement = (html) => {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

DOM.htmlToElements = (html) => {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
  }
DOM.qShow = (sel) => { DOM.qSel(sel).classList.remove('hidden'); };
DOM.qHide = (sel) => { DOM.qSel(sel).classList.add('hidden'); };
DOM.Show = (el) => { el.classList.remove('hidden'); };
DOM.Hide = (el) => { el.classList.add('hidden'); };
DOM.ready = (fn) => {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn);
  // If late; I mean on time.
  if (document.readyState === "interactive" || document.readyState === "complete" ) {
    fn();
  }
}


function loadBinaryFile(file)
{
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function(e) {
      resolve(e.target.result);
    };
    reader.onerror = function(e) {
       reject('Error: '+ e.type);
    };
    reader.readAsBinaryString(file);
  });
}

function loadTextFile(file)
{
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function(e) {
      resolve(e.target.result);
    };
    reader.onerror = function(e) {
       reject('Error: '+ e.type);
    };
    reader.readAsText(file);
  });
}

var Msg = {};

Msg.showYN = function (msg, callback)
  {
    document.querySelector('#alert-dlg #alert-msg').textContent = msg;
    document.querySelector('#alert-dlg #btn-cancel').textContent = 'No';

    var btnYes = document.querySelector('#alert-dlg #btn-yes');
    btnYes.style.display = 'initial'
    btnYes.onclick = () =>
       {
        $('#alert-dlg').modal('hide');

        if (callback) callback(); 
       };

    var dlg = $('#alert-dlg .modal-content');
    dlg.width(500);
    $('#alert-dlg').modal('show');
  };

