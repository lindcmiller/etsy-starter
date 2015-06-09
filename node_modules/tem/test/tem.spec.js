(function (tem) {

  describe('tem', function () {

    it('Escapes with =', function () {
      var fn = tem.build('{{= it.name }}');
      expect(fn({ name: '\'<&>"'})).toEqual('&apos;&lt;&amp;&gt;&quot;');
    });

    it('Does not escape with -', function () {
      var fn = tem.build('{{- it.name }}');
      expect(fn({ name: '\'<&>"'})).toEqual('\'<&>"');
    });

    it('Loops with for', function () {
      var fn = tem.build('{{for it.name n}}{{- n}},{{/}}');
      expect(fn({ name: 'abcd'})).toEqual('a,b,c,d,');
    });

    it('Handles ifs', function () {
      var fn = tem.build('{{if it.isSo}}Yep{{/}}');
      expect(fn({ isSo: true })).toEqual('Yep');
      expect(fn({ isSo: false })).toEqual('');
    });

    it('Handles else-ifs', function () {
      var fn = tem.build('{{if it.isSo}}Yep{{else-if it.meh}}Meh!{{/}}');
      expect(fn({ meh: true })).toEqual('Meh!');
    });

    it('Handles else', function () {
      var fn = tem.build('{{if it.isSo}}Yep{{else}}Nope!{{/}}');
      expect(fn({ meh: false })).toEqual('Nope!');
    });

    it('Handles complex conditionals', function () {
      var fn = tem.build('{{if it.age > 2 && it.gender === \'m\'}}Boy{{else}}Hrm{{/}}');
      expect(fn({ age: 3, gender: 'm' })).toEqual('Boy');
      expect(fn({ age: 1, gender: 'm' })).toEqual('Hrm');
    });

    it('Handles partials', function () {
      tem.add('user', '{{= it.name}}');
      var fn = tem.build('{{tem user}}');

      expect(fn({ name: 'Joe' })).toEqual('Joe');
    });

    it('Handles partials with explicit it', function () {
      tem.add('user', '{{= it.name}}');
      var fn = tem.build('{{tem user {name: "Sally"} }}');

      expect(fn({ name: 'Joe' })).toEqual('Sally');
    });

    it('Handles masters', function () {
      tem.add('user', '<h1>{{yield}}</h1>');
      var fn = tem.build('{{master user}}Shazam!{{/}}');

      expect(fn()).toEqual('<h1>Shazam!</h1>');
    });

    it('Handles newlines', function () {
      tem.add('user', '{{= it.name}}');
      var fn = tem.build('{{tem user {\n\t name: "Sally" \n\t} }}');

      expect(fn()).toEqual('Sally');
    });

    it('Handles custom commands', function () {
      tem.cmd('caps', function (c, args) {
        return args.trim().toUpperCase();
      });

      var fn = tem.build('{{caps Hello}}');

      expect(fn()).toEqual('HELLO');
    });
  });

})(this.tem || require('../tem'));
