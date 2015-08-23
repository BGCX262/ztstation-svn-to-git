/**
 *   接口：BaseDAOI
 *   功能：数据访问接口
 *   作者：张中伟
 *   时间：2009年6月23日8时37分
 *   描述：所有数据库访问通过此接口进行
 */

package service.interfaces;

import hibernate.pageinfo.PageInfo;

import java.util.List;

import org.springframework.orm.hibernate3.HibernateTemplate;

import service.exceptions.DBException;

public interface BaseDAOI {
	// 增加
	public void save(Object obj) throws DBException;

	// 删除
	public void delete(Object obj)throws DBException;

	// 修改
	public Object merge(Object obj)throws DBException;
	
	//更新
	public void update(Object obj)throws DBException;

	// 自动保存
	public void uporsave(Object obj) throws DBException;
	
	//批量保存
	@SuppressWarnings("unchecked")
	public boolean save(List list) throws DBException;
	//批量更新
	@SuppressWarnings("unchecked")
	public boolean saveorupdate(List list) throws DBException;

	// 根据主键取得唯一对象
	public Object findByID(String clazz, Long id) throws DBException;

	// 根据现有对象取得相同对象
	public List<Object> findByExample(Object obj) throws DBException;

	// 根据属性取得对象
	public List<Object> findByProperty(String clazz, String property, Object provalue) throws DBException;

	// 根据多属性组合取得对象
	public List<Object> findByComplex(String clazz, String[] property, Object[] value) throws DBException;

	// 取得所有对象
	public List<Object> findAll(String queryString) throws DBException;
	
	//取得数据分页
	public PageInfo findAll(String queryString, int pageNo, int pageCount) throws DBException;
	public PageInfo findStartLimit(String queryString, int start, int limit) throws DBException;
	
	//取得数据记录数
	public int getCount(String queryString) throws DBException;
	
	public HibernateTemplate getHibernateTemplate();
}
