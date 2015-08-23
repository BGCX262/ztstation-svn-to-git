package hibernate.pojo;

/**
 * Rolepri entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Rolepri extends hibernate.pojo.BasePOJO implements
		java.io.Serializable {

	// Fields

	private Long id;
	private Long roleid;
	private Long priid;

	// Constructors

	/** default constructor */
	public Rolepri() {
	}

	/** full constructor */
	public Rolepri(Long roleid, Long priid) {
		this.roleid = roleid;
		this.priid = priid;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRoleid() {
		return this.roleid;
	}

	public void setRoleid(Long roleid) {
		this.roleid = roleid;
	}

	public Long getPriid() {
		return this.priid;
	}

	public void setPriid(Long priid) {
		this.priid = priid;
	}

}