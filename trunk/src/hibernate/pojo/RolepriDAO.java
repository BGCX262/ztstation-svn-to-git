package hibernate.pojo;

import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

/**
 * A data access object (DAO) providing persistence and search support for
 * Rolepri entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see hibernate.pojo.Rolepri
 * @author MyEclipse Persistence Tools
 */

public class RolepriDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory.getLog(RolepriDAO.class);
	// property constants
	public static final String ROLEID = "roleid";
	public static final String PRIID = "priid";

	protected void initDao() {
		// do nothing
	}

	public void save(Rolepri transientInstance) {
		log.debug("saving Rolepri instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Rolepri persistentInstance) {
		log.debug("deleting Rolepri instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Rolepri findById(java.lang.Long id) {
		log.debug("getting Rolepri instance with id: " + id);
		try {
			Rolepri instance = (Rolepri) getHibernateTemplate().get(
					"hibernate.pojo.Rolepri", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Rolepri instance) {
		log.debug("finding Rolepri instance by example");
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
		log.debug("finding Rolepri instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Rolepri as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByRoleid(Object roleid) {
		return findByProperty(ROLEID, roleid);
	}

	public List findByPriid(Object priid) {
		return findByProperty(PRIID, priid);
	}

	public List findAll() {
		log.debug("finding all Rolepri instances");
		try {
			String queryString = "from Rolepri";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Rolepri merge(Rolepri detachedInstance) {
		log.debug("merging Rolepri instance");
		try {
			Rolepri result = (Rolepri) getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Rolepri instance) {
		log.debug("attaching dirty Rolepri instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Rolepri instance) {
		log.debug("attaching clean Rolepri instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static RolepriDAO getFromApplicationContext(ApplicationContext ctx) {
		return (RolepriDAO) ctx.getBean("RolepriDAO");
	}
}