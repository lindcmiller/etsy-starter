
Array.prototype.slice.call(document.querySelectorAll('script[type="text/html"]'))
  .forEach(function (script) {
    tem.add(script.getAttribute('id'), script.innerHTML);
    script.parentElement.removeChild(script);
  });

document.querySelector('main').innerHTML = tem('tmpl', {
  name: 'Joe & gang.',
  msg: '<em>Hoi this is emphatic.</em>',
  tags: ['a', 'b']
});

window.temTemplate = tem.build("<div><h1 class='header'>{{- it.header}}</h1><h2 class='header2'>{{- it.header2}}</h2><h3 class='header3'>{{- it.header3}}</h3><h4 class='header4'>{{- it.header4}}</h4><h5 class='header5'>{{- it.header5}}</h5><h6 class='header6'>{{- it.header6}}</h6><ul class='list'>{{map it.list l}}<li class='item'>{{- l}}</li>{{/}}</ul></div>");
document.body.innerHTML = temTemplate({
  header: 'H1',
  header2: 'h2',
  header3: 'h3',
  header4: 'h4',
  header5: 'h5',
  header6: 'h6',
  list: ['a', 'b', 'c']
});
