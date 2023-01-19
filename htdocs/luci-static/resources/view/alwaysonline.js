'use strict';
'require view';
'require fs';
'require uci';
'require form';

return view.extend({
//	handleSaveApply: null,
//	handleSave: null,
//	handleReset: null,

	load: function() {
	return Promise.all([
		uci.load('alwaysonline'),
	]);
	},

	render: function(res) {

		var m, s, o;

		m = new form.Map('alwaysonline', _('AlwaysOnline'),
			_('<a href="%s"><b>AlwaysOnline</b></a> is a HTTP server which mocks a lot network/internet/portal detection servers.').format('https://github.com/Jamesits/alwaysonline'));

		s = m.section(form.TypedSection, 'alwaysonline');
		s.anonymous = true;

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.rmempty = false;

		s = m.section(form.GridSection, 'domain', _('Apply to Domains'));
		s.sortable  = true;
		s.anonymous = true;
		s.addremove = true;

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.default = o.enabled;
		o.editable = true;
		o.rmempty = false;

		o = s.option(form.Value, 'name', _('Domain'));
		o.datatype = 'hostname';
		o.rmempty = false;

		o = s.option(form.Value, 'group', _('Group'));
		o.rmempty = true;
		//o.modalonly = true;

		o = s.option(form.ListValue, 'family', _('Address family'));
		o.value('4', 'IPv4');
		o.value('6', 'IPv6');
		o.value('both', _('Both'));
		o.default = 'both';
		o.rmempty = false;

		o = s.option(form.Value, 'overwrite', _('Address overwrite'));
		o.datatype = 'ipaddr(1)';
		o.rmempty = true;
		o.depends('family', '4');
		o.depends('family', '6');

		return m.render();
	}
});
