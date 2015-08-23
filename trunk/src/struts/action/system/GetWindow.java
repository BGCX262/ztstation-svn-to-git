package struts.action.system;

import hibernate.pojo.Pris;
import struts.action.BaseAction;

public class GetWindow extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = -749642058356922369L;
	@SuppressWarnings("unchecked")
	public Pris pris;
	public String id;

	public String exe() throws Exception {
		if (getId() == null)
			setId("0");

		pris = (Pris) super.findByID("Pris", Long.valueOf(getId()));

		return "success";
	}

	public Pris getPris() {
		return pris;
	}

	public void setPris(Pris pris) {
		this.pris = pris;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
