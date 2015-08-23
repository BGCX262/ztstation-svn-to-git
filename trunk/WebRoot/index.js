Ext.onReady(function() {
	// Ext.MessageBox.alert("", "这是一个提示窗口啦");

	// 构造树
	var root = new Ext.tree.AsyncTreeNode({
				id : '0',
				text : '模块列表',
				children : [{
							text : 'loading',
							iconCls : 'loading,leaf:true'
						}]

			});

	var treeLoader = new Ext.tree.TreeLoader();

	var tree = new Ext.tree.TreePanel({
				id : 'tree',
				iconCls : 'nav',
				region : 'north', // 放在west panel的 north
				split : true,
				collapseMode : 'mini',
				width : 200,
				minSize : 200,
				maxSize : 300,
				collapsible : true,
				title : '功能区',
				loader : treeLoader,
				lines : true,
				autoScroll : true,
				root : root

			});

	// 树的展开事件
	root.on('expand', gettree);
	function gettree(node) {
		if (node.firstChild.text == 'loading') {
			Ext.Ajax.request({
				url : './system/getTree.action',
				params : {
					id : node.id
				},
				success : function(action) {
					var result = Ext.decode(action.responseText);
					if (result.notlog) {
						Ext.MessageBox.alert('提示', '未登录！转向登录页面！');
						window.location = 'login.jsp';
						return;
					}
					if (result.errors && result.errors.info) {
						Ext.MessageBox.alert('警告', '错误！' + result.errors.info);
						return;
					}
					tn = result.treenode;
					for (var i = 0; i < tn.length; i++) {

						var cnode = new Ext.tree.AsyncTreeNode({
									id : tn[i].id,
									text : tn[i].priname,
									leaf : (tn[i].opentype == 0) ? false : true,
									children : [{
												text : 'loading',
												iconCls : 'x-tbar-loading'
											}]
								});
						cnode.on('expand', gettree);
						node.appendChild(cnode);
					}
					node.firstChild.remove();

				},
				failure : function(action) {
					Ext.MessageBox.alert('提示', '请求超时或失败！');
					return;
				}

			}

			);

		}
	}

	// 布局示例
	var north = new Ext.Panel({
				title : 'north',
				region : 'north',
				height : 100
			});

	var center = new Ext.TabPanel({
				region : 'center',
				id : 'maintab',
				enableTabScroll : true,
				deferredRender : false,
				autoScroll : true,
				activeTab : 0,
				items : [{
							id : 'main tab'
						}]
			});

	var south = new Ext.Panel({
				title : 'south',
				region : 'south',
				split : true,
				collapsible : true,
				heigth : 50
			});

	var west = new Ext.Panel({
				title : 'west',
				region : 'west',
				width : 200,
				split : true,
				collapsible : true,
				minSize : 175,
				maxSize : 400,
				layout : 'accordion',
				layoutConfig : {
					animate : true
				},
				items : [tree, {
							title : "常用模块",
							html : '常用模块',
							border : false
						}]
			});

	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [north, center, south, west]
			});

	tree.on('click', function(node) {
				if (!node.isLeaf())
					return;

				selectNode = node;
				Ext.Ajax.request({
							url : 'system/getWindow.action',
							params : {
								id : node.id
							},
							success : function(action) {
								var result = Ext.decode(action.responseText);
								if (result.notlog) {
									Ext.MessageBox.alert('提示', '未登录！转向登录页面！');
									window.location = 'login.jsp';
									return;
								}
								if (result.errors && result.errors.info) {
									Ext.MessageBox.alert('警告', '错误！'
													+ result.errors.info);
									return;
								}

								var priname = result.pris.priname;
								var priurl = result.pris.priurl;

								// var tab =
								// center.getItem(result.pris.priname);
								var tab = center.getComponent(priname);
								if (tab)
									center.setActiveTab(tab);
								else {
									center.add(new Ext.Panel({
												id : priname,
												title : priname,
												autoLoad : {
													url : priurl,
													scripts : true,
													nocache : true
												},
												//autoScroll : true,
												autoHeight : true,
												autoWidth : true,
												closable:true,
												// width:center.width,
												// heigth:center.height,
												layout : 'fit'
											})).show();
								}

							},
							failure : function(action) {
								Ext.MessageBox.alert('提示', '请求超时或失败！');
								return;

							}
						}

				);

			});

		// // window 示例
		// var panel = new Ext.Panel({
		// title : 'panel',
		// region : 'center'
		// });
		//
		// win = new Ext.Window({
		//
		// height : 240,
		// id : 'login-win',
		// layout : 'border',
		// minHeight : 200,
		// minWidth : 300,
		// plain : false,
		// // resizable : false,
		// // closable : false,
		// // draggable : false,
		// items : [panel],
		// title : '信息管理系统用户登录',
		// width : 330
		//
		// });
		//
		// win.show();

}

);