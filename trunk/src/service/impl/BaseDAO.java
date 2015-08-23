/**
 *     类：BaseDAO
 *   功能：数据处理
 *   作者：张中伟
 *   时间：2009年8月4日
 *   描述：所有数据库数据处理通过此类进行
 */

package service.impl;

import hibernate.pageinfo.PageInfo;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import service.exceptions.DBException;
import service.interfaces.BaseDAOI;

public class BaseDAO extends HibernateDaoSupport implements BaseDAOI {

	private static final Log log = LogFactory.getLog(BaseDAO.class);


	public void delete(Object obj) throws DBException {
		log.debug("deleting Pris instance");
		try {
			getHibernateTemplate().delete(obj);
			log.debug("delete successful");
		} catch (Exception re) {
			log.error("delete failed", re);
			throw new DBException("数据库删除失败！",re);
		}

	}

	@SuppressWarnings("unchecked")
	public List findAll(String queryString) throws DBException {
		log.debug("finding all Object instances");
		try {
			return getHibernateTemplate().find(queryString);
		} catch (Exception re) {
			log.error("find all failed", re);
			throw new DBException("数据库查询失败！",re);
		}
	}

	@SuppressWarnings("unchecked")
	public List findByComplex(String clazz, String[] property, Object[] value)
			throws DBException {
		log.debug("finding Object instance with property: " + property
				+ ", value: " + value);
		try {
			String queryString = "from " + clazz + " as model where model."
					+ property + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (Exception re) {
			log.error("find by property name failed", re);
			throw new DBException("数据库查询失败！",re);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object> findByExample(Object obj) throws DBException {
		log.debug("finding Object instance by example");
		try {
			List<Object> results = getHibernateTemplate().findByExample(obj);
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (Exception re) {
			log.error("find by example failed", re);
			throw new DBException("数据库查询失败！",re);
		}
	}

	public Object findByID(String clazz, Long id) throws DBException {
		log.debug("getting Object instance with id: " + id);
		try {
			Object obj = getHibernateTemplate().get(
					"hibernate.pojo." + clazz.trim(), id);
			return obj;
		} catch (Exception re) {
			log.error("get failed", re);
			throw new DBException("数据库查询失败！",re);
		}
	}

	@SuppressWarnings("unchecked")
	public List<Object> findByProperty(String clazz, String property,
			Object provalue) throws DBException {
		log.debug("finding Object instance with property: " + property
				+ ", value: " + provalue);
		try {
			String queryString = "from " + clazz + " as model where model."
					+ property + "= ?";
			return getHibernateTemplate().find(queryString, provalue);
		} catch (Exception re) {
			log.error("find by property name failed", re);
			throw new DBException("数据库查询失败！",re);
		}

	}

	public Object merge(Object obj) throws DBException {
		log.debug("merging Object instance");
		try {
			Object rs = getHibernateTemplate().merge(obj);
			log.debug("merge successful");
			return rs;
		} catch (Exception re) {
			log.error("merge failed", re);
			throw new DBException("数据库更新失败！",re);
		}

	}

	public void save(Object obj) throws DBException {
		log.debug("saving Object instance");
		try {
			getHibernateTemplate().save(obj);
			log.debug("save successful");
		} catch (Exception re) {
			log.error("save failed", re);
			throw new DBException("数据库保存失败！",re);
		}

	}

	public void uporsave(Object obj) throws DBException {
		log.debug("update or save Object instance");
		try {
			getHibernateTemplate().saveOrUpdate(obj);
			log.debug("update or save successful");
		} catch (Exception re) {
			log.error("update or save failed", re);
			throw new DBException("数据库自动保存失败！",re);
		}

	}

	public void update(Object obj) throws DBException {
		log.debug("update Object instance");
		try {
			getHibernateTemplate().update(obj);
			log.debug("update successful");
		} catch (Exception re) {
			log.error("update failed", re);
			throw new DBException("数据库修改失败！",re);
		}

	}

	@SuppressWarnings("unchecked")
	public boolean save(List list) throws DBException {

		log.debug("save list Object instance");
		try {
			for(Object o:list)
			{
				if(o==null) list.remove(o);
			}
			getHibernateTemplate().saveOrUpdateAll(list);
			log.debug("save successful");

			return true;
		} catch (Exception re) {
			log.error("save failed", re);
			throw new DBException("数据库批量保存失败！",re);

		}
	}

	@SuppressWarnings("unchecked")
	public boolean saveorupdate(List list) throws DBException {

		log.debug("save or update list Object instance");
		try {
			for(Object o:list)
			{
				if(o==null) list.remove(o);
			}
			getHibernateTemplate().saveOrUpdateAll(list);
			log.debug("save or update successful");

			return true;
		} catch (Exception re) {
			log.error("save or update failed", re);
			throw new DBException("数据库批量更新失败！",re);

		}
	}

	// 返回根据每页记录数和页数查询的结果
	@SuppressWarnings("unchecked")
	public PageInfo findAll(String queryString, int pageNo, int pageCount)
			throws DBException {

		// 处理页数和记录数非法的情况
		if (pageCount < 10)
			pageCount = 10;

		PageInfo pi = new PageInfo();
		pi.setTotalCount(getCount(queryString));
		pi.setPageCount(pageCount);

		// 页数计算
		if (pi.getTotalCount() % pi.getPageCount() == 0) {
			pi.setTotalPage(pi.getTotalCount() / pi.getPageCount());
			if (pi.getTotalPage() == 0)
				pi.setTotalPage(1);
		} else
			pi.setTotalPage(pi.getTotalCount() / pi.getPageCount() + 1);

		// 设置当前页
		if (pageNo < 1)
			pi.setPageNo(1);
		else if (pageNo > pi.getTotalPage())
			pi.setPageNo(pi.getTotalPage());
		else
			pi.setPageNo(pageNo);

		// 设置查询记录集合
		pi.setList(findRec(queryString, (pi.getPageNo() - 1)
				* pi.getPageCount(), pi.pageCount));

		return pi;
	}
	
	public PageInfo findStartLimit(String queryString ,int start,int limit) throws DBException 
	{
		PageInfo pi=new PageInfo();
		pi.setTotalCount(getCount(queryString));
		
		pi.setList(findRec(queryString,start,limit));
		return pi;
	}

	// 按指定分页记录查询的方法
	@SuppressWarnings("unchecked")
	public List findRec(final String hql, final int firstResult,
			final int maxResults) throws DBException {
		return getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(Session s) throws HibernateException,
					SQLException {

				Query query = s.createQuery(hql);
				query.setFirstResult(firstResult);
				query.setMaxResults(maxResults);
				List list = query.list();
				return list;
			}
		});
	}

	// 根据hql 取得记录数
	public int getCount(String queryString) throws DBException {
		String newHql = " select count(*) "
				+ queryString.substring(queryString.indexOf("from"));

		Long i = (Long) findAll(newHql).get(0);
		return i.intValue();
	}

	public boolean exeProc(String proc) {
		try {

		} catch (Exception e) {
			return false;
		}
		return true;

	}
	
	

}
