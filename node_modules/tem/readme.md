# tem, a small, fast, flexible template engine in JavaScript

- Tiny (less than 1KB)
- As fast (or nearly) as doT
- Support for master pages
- Support for partials
- Pluggable (add your own commands)

[![Build Status](https://travis-ci.org/chrisdavies/tem.svg?branch=master)](https://travis-ci.org/chrisdavies/tem)

## Usage

tem is mustache like. It uses the `{{sym args}}` where sym is the symbol or
command, and args are the arguments, if any. Blocks such as for or if are
closed with `{{/}}`

The model is referred to as `it`, just as in doT.

### Conditionals

```html
<h1>Hi,
{{if it.age < 20}}
  <span class="young">Youngster</span>
{{else-if it.age > 100}}
  <span class="old">Oldster</span>
{{else}}
  <span class="meh">You</span>
{{/}}
</h1>
```

### Loops

```html
<ul class="users">
{{for it.users u}}
  <li>{{= u.name}}</li>
{{/}}
</ul>
```

Or, if you want the index:

```html
<ul class="users">
{{for it.users u, x}}
  <li>{{= u.name}} is number {{- x}}</li>
{{/}}
</ul>
```

### Escaping

The `=` option escapes any HTML in the model before rendering it. The `-`
option does not.

```html
<h1>{{= it.name}} is escaped</h1>
<h2>{{- it.name}} is not escaped</h2>
```

### Partials

Partials can be called like so:

```javascript
dotx.add('myview', '<h1>{{= it.name}}</h1>');
dotx.add('deets', '{{tem myview}}');

dotx('deets', { name: "Greg" }); // <h1>Greg</h1>
```

Partials get the `it` context from the caller by default, but this can
be overridden.

```javascript
dotx.add('myview', '<h1>{{= it.name}}</h1>');
dotx.add('deets', '{{tem myview { name: "Chris" } }}');

dotx('deets', { name: "Greg" }); // <h1>Chris</h1>
```

### Masters

It's often useful to have a master template that wraps child templates.

Master template (let's say it's named `page-layout`):

```html
<main>
  <header>This is the header</header>
  <article>{{yield}}</article>
  <footer>Copyright (c) 2083</footer>
</main>
```

Child template:

```html
{{master page-layout}}
  <h1>This is the child</h1>
{{/}}
```

That combination will produce this:

```html
<main>
  <header>This is the header</header>
  <article><h1>This is the child</h1></article>
  <footer>Copyright (c) 2083</footer>
</main>
```

## Adding your own commands

A command defined like this:

```javascript
tem.cmd('rand', function (cmd, args, context) {
  return Math.floor(Math.random() * parseInt(args));
});
```

Would be called like this:

```html
{{rand 45}}
```

### Arguments

- `cmd` is the command, in this case 'rand'
- `args` is the string representation of the arguments '45'
- `context` is an array
  - if your command is not self-closing, then
  - push the closing string onto the array

### Commands with closing blocks

```javascript
tem.cmd('wrap', function (cmd, args, context) {
  args = args.trim();
  context.push('</' + args + '>');
  return '<' + args + '>';
});
```

When called like this:

```html
{{wrap div}}Hello world{{/}}
```

Would produce this:

```html
<div>Hello world</div>
```

## Installation

Just download tem.min.js, or use bower:

    bower install tem

Or use npm:
https://www.npmjs.com/package/tem

    npm install --save tem

## Contributing

Make your changes (and add tests), then run the tests:

    npm test

If all is well, build your changes:

    npm run min

This minifies tem, and tells you the size. It's currently less than 1KB, and
I'd like to keep it that way!

## License MIT

Copyright (c) 2015 Chris Davies

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
