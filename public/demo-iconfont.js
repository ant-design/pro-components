(function () {
  var symbols =
    '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
    '<symbol id="icon-demo-star" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 3.1 6.3 7 1-5.1 5 .9 7-5.9-3.3-5.9 3.3.9-7-5.1-5 7-1z"/></symbol>' +
    '<symbol id="icon-demo-folder" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5h7l2 2h9v12H3z"/></symbol>' +
    '<symbol id="icon-demo-chart" viewBox="0 0 24 24"><path fill="currentColor" d="M3 20V4h2v14h16v2zM8 15l4-5 3 2 4-5 1.5 1.2-5.1 6.3-3-2-2.8 3.7z"/></symbol>' +
    '</svg>';
  var holder = document.createElement('div');
  holder.innerHTML = symbols;
  document.body.insertBefore(holder.firstChild, document.body.firstChild);
})();
