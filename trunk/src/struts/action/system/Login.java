package struts.action.system;

import hibernate.pojo.Operators;
import hibernate.pojo.OperatorsDAO;

import java.util.List;

import struts.action.BaseAction;

public class Login extends BaseAction {

	// 判断提交是否成功的标志
	public boolean success;
	public String[] errors;

	public String username;
	public String userpass;

	

	public String execute() {
		return exe();
	}

	public String exe() {
		try {

			List<Object> list = baseDAO.findAll(" from Operators  ");
			Operators op = (Operators) list.get(0);

			setSuccess(true);
			getSession().setAttribute("username", op.getUsername());
			// throw new DBException("假错误");
			return "success";
		} catch (Exception e) {

			Exceptprocess(e);

			return null;
		}
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public void setErrors(String[] errors) {
		this.errors = errors;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserpass() {
		return userpass;
	}

	public void setUserpass(String userpass) {
		this.userpass = userpass;
	}

	
}
