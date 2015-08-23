package hibernate.pojo;

/**
 * Pris entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Pris extends hibernate.pojo.BasePOJO implements
		java.io.Serializable {

	// Fields

	private Long id;
	private String priname;
	private String prigrade;
	private String opentype;
	private String priurl;
	private Long uppriid;
	private String priinfo;

	// Constructors

	/** default constructor */
	public Pris() {
	}

	/** minimal constructor */
	public Pris(String priname) {
		this.priname = priname;
	}

	/** full constructor */
	public Pris(String priname, String prigrade, String opentype,
			String priurl, Long uppriid, String priinfo) {
		this.priname = priname;
		this.prigrade = prigrade;
		this.opentype = opentype;
		this.priurl = priurl;
		this.uppriid = uppriid;
		this.priinfo = priinfo;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPriname() {
		return this.priname;
	}

	public void setPriname(String priname) {
		this.priname = priname;
	}

	public String getPrigrade() {
		return this.prigrade;
	}

	public void setPrigrade(String prigrade) {
		this.prigrade = prigrade;
	}

	public String getOpentype() {
		return this.opentype;
	}

	public void setOpentype(String opentype) {
		this.opentype = opentype;
	}

	public String getPriurl() {
		return this.priurl;
	}

	public void setPriurl(String priurl) {
		this.priurl = priurl;
	}

	public Long getUppriid() {
		return this.uppriid;
	}

	public void setUppriid(Long uppriid) {
		this.uppriid = uppriid;
	}

	public String getPriinfo() {
		return this.priinfo;
	}

	public void setPriinfo(String priinfo) {
		this.priinfo = priinfo;
	}

}