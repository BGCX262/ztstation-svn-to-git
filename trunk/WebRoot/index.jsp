<%@ page language="java"  pageEncoding="UTF-8"%>
<%
	if (request.getSession().getAttribute("username") == null)
		response.sendRedirect("login.jsp");
%>
<html>
	<head>
		<title>岗位化管理系统</title>		
		<link rel="stylesheet" type="text/css"
			href="./ext3/resources/css/ext-all.css" />
	
		<script type="text/javascript" src="./ext3/adapter/ext/ext-base-debug.js"></script>
	
		<script type="text/javascript" src="./ext3/ext-all-debug.js"></script>
			
		<script type="text/javascript" src="index.js">    
	</script>
	</head>
	<body>
    
  </body>
</html>
