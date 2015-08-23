package hibernate.pojo;

/**
 * Operators entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Operators extends hibernate.pojo.BasePOJO implements
		java.io.Serializable {

	// Fields

	private Long id;
	private String username;
	private String userpass;
	private String memo;

	// Constructors

	/** default constructor */
	public Operators() {
	}

	/** minimal constructor */
	public Operators(String username) {
		this.username = username;
	}

	/** full constructor */
	public Operators(String username, String userpass, String memo) {
		this.username = username;
		this.userpass = userpass;
		this.memo = memo;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserpass() {
		return this.userpass;
	}

	public void setUserpass(String userpass) {
		this.userpass = userpass;
	}

	public String getMemo() {
		return this.memo;
	}

	public void setMemo(String memo) {
		this.memo = memo;
	}

}