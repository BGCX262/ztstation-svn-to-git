/** 
 * 此类为测试类，在my-define.xml中定义
 */

package struts.action;

import service.exceptions.DBException;

public class FirstAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int operand1;
	private int operand2;

	public String execute() {

		// 测试-- 在不同浏览器不同session 情况下，得到的test 相同 struts.action.Test@a03c20
		// 说明 spring 以单态模式管理 bean
		// Test test=this.getTest();
		// System.out.println(test.toString());

		if (getSum() >= 0) // 如果代码数和是非负整数，跳到positive.jsp页面
		{
			return "positive";
		} else // 如果代码数和是负整数，跳到negative.jsp页面
		{
			return "negative";
		}
	}

	public int getOperand1() {
		return operand1;
	}

	public void setOperand1(int operand1) {
		System.out.println(operand1);
		this.operand1 = operand1;
	}

	public int getOperand2() {
		return operand2;
	}

	public void setOperand2(int operand2) {
		System.out.println(operand2);
		this.operand2 = operand2;
	}

	public int getSum() {
		return operand1 + operand2; // 计算两个整数的代码数和
	}
}
