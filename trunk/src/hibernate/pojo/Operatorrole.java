package hibernate.pojo;

/**
 * Operatorrole entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Operatorrole extends hibernate.pojo.BasePOJO implements
		java.io.Serializable {

	// Fields

	private Long id;
	private Long userid;
	private Long roleid;

	// Constructors

	/** default constructor */
	public Operatorrole() {
	}

	/** full constructor */
	public Operatorrole(Long userid, Long roleid) {
		this.userid = userid;
		this.roleid = roleid;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserid() {
		return this.userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public Long getRoleid() {
		return this.roleid;
	}

	public void setRoleid(Long roleid) {
		this.roleid = roleid;
	}

}