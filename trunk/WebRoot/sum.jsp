<%@page language="java"  pageEncoding="utf-8"%>
<%@taglib  prefix="s"  uri="/struts-tags"%>
<html>
	<head>
		<title>输入操作数</title>
	</head>
	<body>
		求代数和
		<br />
		<s:form action="action/sum.action">
			
			<s:textfield name="operand1"  label="操作数1" ></s:textfield>
			<s:textfield name="operand2"  label="操作数2" ></s:textfield>
			<s:submit value="代数和" />
		</s:form>
	</body>
</html>
