package struts.action;

import hibernate.pageinfo.PageInfo;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.orm.hibernate3.HibernateTemplate;

import service.exceptions.DBException;
import service.interfaces.BaseDAOI;

import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport {

	public BaseDAOI baseDAO;

	/**
	 * 所有Action类的基类，用于处理普通事务
	 */
	private static final long serialVersionUID = 1L;

	// 取得request对象
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	// 取得response对象
	public HttpServletResponse getResponse() {
		return ServletActionContext.getResponse();
	}

	// 取得session对象
	public HttpSession getSession() {
		return getRequest().getSession();
	}

	public void Exceptprocess(Exception e) {
		try {
			getResponse().setContentType("text/html; charset=utf-8");

			getResponse().getWriter().write(
					"{errors:{info:\"" + e.getMessage() + "\"},success:false}");

		} catch (Exception ee) {

		}
	}

	public void notLogin() {
		try {
			getResponse().setContentType("text/html; charset=utf-8");

			getResponse().getWriter().write(
					"{errors:{info:\"" + "未登录或登录已超时！"
							+ "\"},success:false,notlog:true}");

		} catch (Exception ee) {

		}
	}

	public String execute() {
		try {
			if (getSession().getAttribute("username") == null) {
				notLogin();
			}
			return exe();
		} catch (Exception e) {
			Exceptprocess(e);
			return null;
		}
	}

	public String exe() throws Exception {
		return "success";
	}
	
	// 增加
	public void save(Object obj) throws DBException
	{
		baseDAO.save(obj);
	}

	// 删除
	public void delete(Object obj)throws DBException
	{
		baseDAO.delete(obj);
	}

	// 修改
	public Object merge(Object obj) throws DBException
	{
		return baseDAO.merge(obj);
	}
	
	//更新
	public void update(Object obj)throws DBException
	{
		baseDAO.update(obj);
	}

	// 自动保存
	public void uporsave(Object obj) throws DBException
	{
		baseDAO.uporsave(obj);
	}
	
	//批量保存
	@SuppressWarnings("unchecked")
	public boolean save(List list) throws DBException
	{
		return baseDAO.save(list);
	}
	//批量更新
	@SuppressWarnings("unchecked")
	public boolean saveorupdate(List list) throws DBException
	{
		return baseDAO.saveorupdate(list);
	}

	// 根据主键取得唯一对象
	public Object findByID(String clazz, Long id) throws DBException
	{
		return baseDAO.findByID(clazz, id);
	}

	// 根据现有对象取得相同对象
	public List<Object> findByExample(Object obj) throws DBException
	{
		return baseDAO.findByExample(obj);
	}

	// 根据属性取得对象
	public List<Object> findByProperty(String clazz, String property, Object provalue) throws DBException
	{
		return baseDAO.findByProperty(clazz, property, provalue);
	}

	// 根据多属性组合取得对象
	public List<Object> findByComplex(String clazz, String[] property, Object[] value) throws DBException
	{
		return baseDAO.findByComplex(clazz, property, value);
	}

	// 取得所有对象
	public List<Object> findAll(String queryString) throws DBException
	{
		return baseDAO.findAll(queryString);
	}
	
	//取得数据分页
	public PageInfo findAll(String queryString, int pageNo, int pageCount) throws DBException
	{
		return baseDAO.findAll(queryString, pageNo, pageCount);
	}
	//取得数据分页的另一种方式
	public PageInfo findStartLimit(String queryString, int start, int limit) throws DBException
	{
		return baseDAO.findStartLimit(queryString, start, limit);
	}
	
	
	//取得数据记录数
	public int getCount(String queryString) throws DBException
	{
		return baseDAO.getCount(queryString);
	}
	
	//取得HibernateTemplate 模板，用于回调处理（一般用不上）
	public HibernateTemplate getHibernateTemplate()
	{
		return baseDAO.getHibernateTemplate();
	}
	

	public BaseDAOI getBaseDAO() {
		return baseDAO;
	}

	public void setBaseDAO(BaseDAOI baseDAO) {
		this.baseDAO = baseDAO;
	}

}
