package hibernate.pojo;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * A data access object (DAO) providing persistence and search support for Pris
 * entities. Transaction control of the save(), update() and delete() operations
 * can directly support Spring container-managed transactions or they can be
 * augmented to handle user-managed Spring transactions. Each of these methods
 * provides additional information for how to configure it for the desired type
 * of transaction control.
 * 
 * @see hibernate.pojo.Pris
 * @author MyEclipse Persistence Tools
 */

public class PrisDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory.getLog(PrisDAO.class);
	// property constants
	public static final String PRINAME = "priname";
	public static final String PRIGRADE = "prigrade";
	public static final String OPENTYPE = "opentype";
	public static final String PRIURL = "priurl";
	public static final String UPPRIID = "uppriid";
	public static final String PRIINFO = "priinfo";

	protected void initDao() {
		// do nothing
	}

	public void save(Pris transientInstance) {
		log.debug("saving Pris instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Pris persistentInstance) {
		log.debug("deleting Pris instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Pris findById(java.lang.Long id) {
		log.debug("getting Pris instance with id: " + id);
		try {
			Pris instance = (Pris) getHibernateTemplate().get(
					"hibernate.pojo.Pris", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Pris instance) {
		log.debug("finding Pris instance by example");
		try {
			List results = getHibernateTemplate().findByExample(instance);
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding Pris instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Pris as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByPriname(Object priname) {
		return findByProperty(PRINAME, priname);
	}

	public List findByPrigrade(Object prigrade) {
		return findByProperty(PRIGRADE, prigrade);
	}

	public List findByOpentype(Object opentype) {
		return findByProperty(OPENTYPE, opentype);
	}

	public List findByPriurl(Object priurl) {
		return findByProperty(PRIURL, priurl);
	}

	public List findByUppriid(Object uppriid) {
		return findByProperty(UPPRIID, uppriid);
	}

	public List findByPriinfo(Object priinfo) {
		return findByProperty(PRIINFO, priinfo);
	}

	public List findAll() {
		log.debug("finding all Pris instances");
		try {
			String queryString = "from Pris";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Pris merge(Pris detachedInstance) {
		log.debug("merging Pris instance");
		try {
			Pris result = (Pris) getHibernateTemplate().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Pris instance) {
		log.debug("attaching dirty Pris instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Pris instance) {
		log.debug("attaching clean Pris instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static PrisDAO getFromApplicationContext(ApplicationContext ctx) {
		return (PrisDAO) ctx.getBean("PrisDAO");
	}
}