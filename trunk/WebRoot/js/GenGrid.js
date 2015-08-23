/*******************************************************************************
 * @author 张中伟 zhongweizhang@163.com
 * @class Ext.my.GenGrid 通用的Grid
 ******************************************************************************/

function objClone(obj)
// 增加了对网页元素克隆的判断
// 增加了对构造方法的克隆
{
	if (obj.cloneNode != null)
		return obj.cloneNode(true);
	result = new Object();
	result.constructor = obj.constructor
	for (var i in obj)
		result[i] = obj[i]
	return result;
}

// 实现中文拼音顺序排序
Ext.data.Store.prototype.applySort = function() {
	if (this.sortInfo && !this.remoteSort) {
		var s = this.sortInfo, f = s.field;
		var st = this.fields.get(f).sortType;
		var fn = function(r1, r2) {
			var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
			if (typeof(v1) == "string") {
				return v1.localeCompare(v2);
			}
			return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
		};
		this.data.sort(s.direction, fn);
		if (this.snapshot && this.snapshot != this.data) {
			this.snapshot.sort(s.direction, fn);
		}
	}

}

// 通用的grid 对象
Ext.grid.GenGrid = function(config) {
	Ext.QuickTips.init();
	
	
	//this.tbar=new Ext.Toolbar([{text:'测试'}]);
	//this.bbar=new Ext.Toolbar([{text:'测试'}]);
	
	
	
	
	
	
	config = Ext.apply(
			config,// 此处为 定制.....如果是为default类型的用applyIf
			{
				//tbar : this.tbar,
				//bbar : this.bbar
			});
			
	Ext.grid.GenGrid.superclass.constructor.call(this, config);
}

Ext.extend(Ext.grid.GenGrid, Ext.grid.GridPanel, {

});
