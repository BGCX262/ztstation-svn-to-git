package hibernate.pojo;

import java.util.Date;

/**
 * Person entity.
 * 
 * @author MyEclipse Persistence Tools
 */

public class Person extends hibernate.pojo.BasePOJO implements
		java.io.Serializable {

	// Fields

	private Long id;
	private String name;
	private Date birth;
	private Double sala;

	// Constructors

	/** default constructor */
	public Person() {
	}

	/** full constructor */
	public Person(String name, Date birth, Double sala) {
		this.name = name;
		this.birth = birth;
		this.sala = sala;
	}

	// Property accessors

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getBirth() {
		return this.birth;
	}

	public void setBirth(Date birth) {
		this.birth = birth;
	}

	public Double getSala() {
		return this.sala;
	}

	public void setSala(Double sala) {
		this.sala = sala;
	}

}