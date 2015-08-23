package hibernate.pojo;

/**
 * Roles entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Roles extends hibernate.pojo.BasePOJO implements
		java.io.Serializable {

	// Fields

	private Long id;
	private String rolename;
	private String roleinfo;
	private String rolememo;

	// Constructors

	/** default constructor */
	public Roles() {
	}

	/** minimal constructor */
	public Roles(String rolename) {
		this.rolename = rolename;
	}

	/** full constructor */
	public Roles(String rolename, String roleinfo, String rolememo) {
		this.rolename = rolename;
		this.roleinfo = roleinfo;
		this.rolememo = rolememo;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRolename() {
		return this.rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getRoleinfo() {
		return this.roleinfo;
	}

	public void setRoleinfo(String roleinfo) {
		this.roleinfo = roleinfo;
	}

	public String getRolememo() {
		return this.rolememo;
	}

	public void setRolememo(String rolememo) {
		this.rolememo = rolememo;
	}

}