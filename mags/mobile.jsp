<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>手机号归属地查询</title>
</head>
<body>
	<form action="<%=basePath %>queryMobile.do" method="get">
		手机号归属地查询：<input type=
		"text" name="code" />
		<br/>
		查询结果：${result}
		<br/>
		<input type="submit" value="查询手机号归属地"/>
	</form>
</body>
</html>