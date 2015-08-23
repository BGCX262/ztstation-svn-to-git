Ext.onReady(function() {
	var thistab = Ext.get('用户管理');
	thistab.clean(true);

	var pageNo, pageCount; // 当前面和每页记录数
	var totalCount, totalPage; // 总记录数和总页数
	// var params;

	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer({
						header : '序号',
						width : 35
					}),// 自动行号
			sm,// 添加的地方
			{
				header : '用户编码',
				dataIndex : 'id'
			}, {
				header : '用户名称',
				dataIndex : 'username'
			}, {
				header : '用户信息',
				dataIndex : 'memo'
			}, {
				header : '用户地区',
				dataIndex : 'userarea'
			}]);
	cm.defaultSortable = true;

	var data;

	var ds = new Ext.data.Store({
				proxy : new Ext.data.MemoryProxy(data),
				reader : new Ext.data.JsonReader({
							root : 'list'
						}, [{
									name : 'id'
								}, {
									name : 'username'
								}, {
									name : 'userpass'
								}, {
									name : 'memo'
								}, {
									name : 'userarea'
								}])
			});

	ds.load();

	// var formFields = [new Ext.form.TextField({
	// fieldLabel : '用户名称',
	// name : 'username',
	// allowBlank : false,
	// blankText : '用户名不能为空！'
	// }), new Ext.form.TextField({
	// fieldLabel : '用户密码',
	// name : 'userpass',
	// inputType : 'password'
	// }), new Ext.form.TextField({
	// fieldLabel : '重复密码',
	// name : 'repass',
	// inputType : 'password'
	// }), new Ext.form.TextField({
	// fieldLabel : '用户地区',
	// name : 'userarea'
	// }), new Ext.form.TextField({
	// fieldLabel : '用户信息',
	// name : 'memo'
	// }), new Ext.form.TextField({
	// fieldLabel : 'ID',
	// name : 'id',
	// inputType : 'hidden'
	//
	// }), new Ext.form.TextField({
	// fieldLabel : '命令',
	// name : 'command',
	// inputType : 'hidden',
	// value : 'add'
	//
	// })];
	// alert(Ext.get('maintab').getHeight()-20);

	//			
	// var gen = new Ext.grid.GridPanel({
	// renderTo:thistab,
	// cm:cm,
	// ds:ds,
	// sm:sm,
	// autoHeight:true,
	// tbar:[new Ext.Toolbar({id:'ntbar',text
	// :'增加',handler:function(){}})]
	// }
	// );
	//			

	// var genGrid = new Ext.grid.GenGrid({
	// renderTo : thistab,
	// cm : cm,
	// ds : ds,
	// sm : sm,
	// // width:thistab.getWidth()-10,
	// // height:thistab.getHeight()/2
	// autoHeight : true
	//
	// });
	//
	// // 用户角色维护
	//
	// });

	var ds1 = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : './system/listuser.action'
						}),
				reader : new Ext.data.JsonReader({
							root : 'root',
							totalProperty : 'total'
						}, [{
									name : 'id'
								}, {
									name : 'username'
								}, {
									name : 'userpass'
								}, {
									name : 'memo'
								}, {
									name : 'userarea'
								}])
			});
	ds1.on('load', function() {
			});

	var ptb = new Ext.PagingToolbar({
		pageSize : 20,
		store : ds1,
		displayInfo : true,
		beforePageText : '第',
		afterPageText : '页',
		displayMsg : '显示 {0}-{1}条 / 共 {2} 条',
		emptyMsg : "无数据。",
		items : ['-', '每页显示', psize= new Ext.form.NumberField({
					cls : 'x-tbar-page-number',
					allowDecimals : false,
					allowNegative : false,
					enableKeyEvents : true,
					value:20,
					selectOnFocus : true,
					listeners : {
						scope : this,
						keypress : function(field, e) {
							var k = e.getKey(), pageSize;
							if (k == e.RETURN) {
								//e.stopEvent();

								pageSize = field.getValue();

								pageSize = Math.min(Math.max(15, pageSize), 1000);
								Ext.MessageBox.alert(pageSize);
								ptb.pageSize = pageSize;
								ds1.load({
											params : {
												start : 0,
												limit : pageSize
											}
										});
							}

						},
						change : function(t, n, o) {
							t.setValue(n);
						}
					}
				}), '条']
	})

	var grid = new Ext.grid.GridPanel({
				renderTo : thistab,
				cm : cm,
				ds : ds1,
				sm : sm,
				bbar : ptb,
				// width:thistab.getWidth()-10,
				// height:thistab.getHeight()/2
				autoHeight : true
			});

	ds1.load({
				params : {
					start : 0,
					limit : ptb.pageSize
				}
			});

});