/****
 *     类：PageInfo
 *   功能：作为查询返回的类
 *   作者：张中伟 
 *   日期：2009年8月4日
 *   描述：在执行数据库查询时，记录HQL返回的数据及查询方式 
 */

package hibernate.pageinfo;

import java.util.List;

public class PageInfo {
	
	public List<Object> list; //返回记录集
	public String hql;       //记录查询用的 hql 语句
	public int totalCount; //总记录数
	public int pageCount; //每页记录数
	public int pageNo;    //页码
	public int totalPage; //总页数
	public List<Object> getList() {
		return list;
	}
	public void setList(List<Object> list) {
		this.list = list;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageCount() {
		return pageCount;
	}
	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}
	public int getPageNo() {
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public String getHql() {
		return hql;
	}
	public void setHql(String hql) {
		this.hql = hql;
	}
	
	

}
