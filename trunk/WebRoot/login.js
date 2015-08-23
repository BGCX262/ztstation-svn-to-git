Ext.onReady(login);

function login() {
	Ext.QuickTips.init();// 支持tips提示
	Ext.form.Field.prototype.msgTarget = 'side';// 提示的方式，枚举值为"qtip","title","under","side",id(元素id)
	Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

	var win, form, submitUrl;
	submitUrl = "./system/login.action";

	var logoPanel = new Ext.Panel({
				baseCls : 'x-plain',
				id : 'login-logo',
				region : 'north',
				height : 100

			});

	// 构建form
	var formPanel = new Ext.form.FormPanel({
				baseCls : 'x-plain',
				baseParams : {},
				bodyStyle : 'padding:5px 5px 0',
				defaults : {
					width : 200

				},
				defaultType : 'textfield',
				frame : false,
				height : 100,
				id : 'login-form',
				items : [{
							fieldLabel : '用户名称',
							allowBlank : false,
							name : 'username',
							invalidText : '用户名无效！',
							blankText : '用户名不能为空!'

						}, {
							fieldLabel : '用户密码',
							allowBlank : false,
							inputType : 'password',
							name : 'userpass',
							blankText : '用户密码不能为空!'
						}],
				labelWidth : 80,
				region : 'center',
				url : submitUrl
			});

	win = new Ext.Window({
				buttons : [{
							handler : function() {
								if (form.isValid())
									form.submit({
												waitMsg : '登录中，请稍等...',
												// reset : true,
												method : 'POST',
												success : Success,
												failure : Failure
											});

							},

							text : '登录'
						}],
				keys : {
					key : [13], // 回车键
					fn : function() {
						form.submit({
									waitMsg : '登录中，请稍等...',
									reset : true,
									method : 'POST',
									success : Success,
									falure : Failure

								});
					}
				},
				buttonAlign : 'center',
				height : 260,
				id : 'login-win',
				layout : 'border',
				minHeight : 200,
				minWidth : 300,
				plain : false,
				resizable : false,
				closable : false,
				draggable : false,
				items : [logoPanel, formPanel],
				title : '中天公司质量管理系统用户登录',
				width : 340

			});

	Failure = function(form, action) {
		// alert(action.result);
		if (!action.result) {
			Ext.MessageBox.alert("失败", "可能连接服务器失败！");
		} else {
			Ext.MessageBox.alert('失败！', action.result.errors.info);
		}

	};

	Success = function(form, action) {
		//Ext.MessageBox.alert('成功', '正在转向系统主页……');
		Ext.MessageBox.progress('登录成功','将要转向系统主页','正在转向中');
		// window.location = 'index.jsp';

		window.location = 'index.jsp';
	};

	form = formPanel.getForm();

	win.show();

}