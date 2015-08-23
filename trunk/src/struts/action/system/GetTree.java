package struts.action.system;

import java.util.List;

import struts.action.BaseAction;

public class GetTree extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -749642058356922369L;
	@SuppressWarnings("unchecked")
	public List treenode;
	public String id;

	public String exe() throws Exception {
		if (getId() == null)
			setId("0");

		treenode = super.findAll(" from Pris p where uppriid=" + getId());

		return "success";
	}

	@SuppressWarnings("unchecked")
	public List getTreenode() {
		return treenode;
	}

	@SuppressWarnings("unchecked")
	public void setTreenode(List treenode) {
		this.treenode = treenode;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
