/**
 *    类：DBException
 *  功能：作为查询返回时把数据库异常转换为运行时异常
 *  作者：张中伟
 *  时间：2009年6月23日
 *  描述：在查询时，如果发生数据库异常，不能正确返回到页面。
 *        这个方法是将数据查询时产生的异常抛出到业务异常，返回页面。  
 */

package service.exceptions;

@SuppressWarnings("serial")
public class DBException extends Exception {

	public String errorinfo;
	public String errordetail;

	public DBException() {
		super();

	}

	public String getMessage() {
		return getErrorinfo();
	}

	public DBException(String errorinfo) {
		super();
		this.errorinfo = errorinfo;
	}

	public DBException(String errorinfo, Exception e) {
		super();
		this.errorinfo = errorinfo;
		this.errordetail=e.getMessage();
	}

	public String getErrorinfo() {
		return errorinfo;
	}

	public void setErrorinfo(String errorinfo) {
		this.errorinfo = errorinfo;
	}

	public String getErrordetail() {
		return errordetail;
	}

	public void setErrordetail(String errordetail) {
		this.errordetail = errordetail;
	}

}
