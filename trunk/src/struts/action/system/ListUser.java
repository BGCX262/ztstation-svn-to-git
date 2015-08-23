package struts.action.system;

import hibernate.pageinfo.PageInfo;

import java.util.List;

import struts.action.BaseAction;

public class ListUser extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -749642058356922369L;
	@SuppressWarnings("unchecked")
	public List<Object> root;
	public int start;
	public int limit;
	public int total;

	public String exe() throws Exception {
		
		
		PageInfo pi= super.findStartLimit(" from Operators ", getStart(), getLimit());
		
		setRoot(pi.list);
		setTotal(pi.totalCount);

		return "success";
	}

	

	public List<Object> getRoot() {
		return root;
	}



	public void setRoot(List<Object> root) {
		this.root = root;
	}



	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}



	public int getTotal() {
		return total;
	}



	public void setTotal(int total) {
		this.total = total;
	}

	

	

}
