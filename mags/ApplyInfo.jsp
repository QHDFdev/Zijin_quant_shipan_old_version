<!-- <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="myApp">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>TuringChain</title>
<!-- Tell the browser to be responsive to screen width -->
<meta
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
	name="viewport">
<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="<%=basePath%>bootstrap/css/bootstrap.css">
<!-- Font Awesome -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
<!-- DataTables -->
<link rel="stylesheet"
	href="<%=basePath%>plugins/datatables/dataTables.bootstrap.css">
<!-- Theme style -->
<link rel="stylesheet" href="<%=basePath%>dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet"
	href="<%=basePath%>dist/css/skins/_all-skins.min.css">
<!--<link rel="stylesheet" href="../plugins/datatables/dataTables.bootstrap.css"/>-->
<!-- angularJS -->
<script src="<%=basePath%>js/framework/1.3.0.14/angular.js"></script>
<script src="<%=basePath%>js/framework/1.3.0.14/angular-route.js"></script>
<script src="<%=basePath%>js/framework/1.3.0.14/angular-animate.js"></script>
<script src="<%=basePath%>js/framework/1.3.0.14/angular-messages.js"></script>
<script src="<%=basePath%>js/app.js"></script>
<script src="<%=basePath%>js/filters.js"></script>
<script src="<%=basePath%>js/directives.js"></script>
<script src="<%=basePath%>js/services.js"></script>
<script src="<%=basePath%>js/controllers/controllers.js"></script>

<script
	src="https://cdn.bootcss.com/angular-file-upload/2.3.3/angular-file-upload.js"></script>
<script src="https://cdn.bootcss.com/jquery/2.2.1/jquery.min.js"></script>
<script src="<%=basePath%>js/ace/ace.js" type="text/javascript"
	charset="utf-8"></script>

<!-- bootstrap -->
<script src="https://cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.js"></script>
<script src="<%=basePath%>js/framework/bootstrap/ui-bootstrap-tpls.js"></script>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition skin-blue sidebar-mini">

	<div class="wrapper">
		<!-- <%@ include file="common/bcdheader.jsp"%> -->
		<!-- Left side column. contains the logo and sidebar -->
		<!-- <%@ include file="common/bcdsidebar.jsp"%> -->

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
			<h1>权限升级申请信息</h1>

			</section>

			<!-- Main content -->
			<section class="content">
			<div class="col-md-16">
				<!-- Horizontal Form -->
				<div class="box box-info">
					<!-- <div class="box-header with-border">
              <h3 class="box-title">Horizontal Form</h3>
            </div> -->
					<!-- /.box-header -->
					<!-- form start -->
					<form class="form-horizontal" action="<%=basePath%>noderyy.do"
						method="post" enctype="multipart/form-data">
						<div class="box-body">
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.userName}" name="noderName">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户ID</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" value="${apply.userId}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户身份证号</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.idNumber}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">省</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.userProvince}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">市</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.userCity}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">县</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.userCounty}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">街道地址</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.userAddress}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户所属行业</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.business}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户申请起因</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" value="${apply.reason}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户注册使用开始时间</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.registerStart}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户升级申请时间</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.applyTime}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户公司名称</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.companyName}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户公司营业执照注册号</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.companyId}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户公司组织机构代码</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.companyCode}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户公司法人代表名称</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.lawerName}">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户公司注册时间</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.companyRegist}" name="">
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户升级类别</label>
								<div class="col-sm-6">
									<input type="text" class="form-control"
										value="${apply.applyType}" name="">
								</div>
							</div>
							<div class="form-group">
								<label class="col-sm-2 control-label">用户资质证明</label>
								<div class="col-sm-2">
									<input type="text" class="form-control" value="${apply.file}">
								</div>
								<div>
									<a
										href="<%=basePath%>downloadNoderFile/${noder.sonCompanyFile}.do"
										class="btn btn-primary"><i class="fa fa-download"></i>下载</a>
								</div>
							</div>
							<div class="form-group">
								<label for="inputEmail3" class="col-sm-2 control-label">用户有无不良历史记录</label>
								<div class="col-sm-6">
									<input type="text" class="form-control" value="${apply.record}"
										name="">
								</div>
							</div>
							<!-- /.box-body -->
							<div class="box-footer">
								<label class="col-sm-2 control-label"></label>
								<div class="col-sm-1">
									<button type="submit"
										class="btn btn-block btn-success btn-info ">审核通过</button>
									<!-- </a> -->
								</div>
								<div class="col-sm-1">
									<a href="<%=request.getContextPath()%>/deleteApply/${apply.userId}.do"
										class="fail">
										<button type="button"
											class="btn btn-block btn-danger btn-info ">审核不通过</button>
									</a>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			</section>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
		<div class="control-sidebar-bg"></div>
		<!-- footer -->
		<!-- <%@ include file="common/bcdfooter.jsp"%> -->
	</div>
	<!-- ./wrapper -->

	<!-- jQuery 2.2.0 -->
	<script src="<%=basePath%>plugins/jQuery/jQuery-2.2.0.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="<%=basePath%>bootstrap/js/bootstrap.min.js"></script>
	<!-- DataTables -->
	<script src="<%=basePath%>plugins/datatables/jquery.dataTables.min.js"></script>
	<script
		src="<%=basePath%>plugins/datatables/dataTables.bootstrap.min.js"></script>
	<!-- SlimScroll -->
	<script src="<%=basePath%>plugins/slimScroll/jquery.slimscroll.min.js"></script>
	<!-- FastClick -->
	<script src="<%=basePath%>plugins/fastclick/fastclick.js"></script>
	<!-- AdminLTE App -->
	<script src="<%=basePath%>dist/js/app.min.js"></script>
	<!-- AdminLTE for demo purposes -->
	<script src="<%=basePath%>dist/js/demo.js"></script>
	<!-- page script -->
	<link type="text/css" rel="stylesheet" href="./css/showBo.css" />
	<script type="text/javascript" src="./js/showBo.js"></script>

	<script type="text/javascript">
		$(function() {
			//1. 点击 时, 弹出 确定通过审核? 若确定, 执行删除, 若不确定, 则取消
			$(".pass").click(function() {
				var flag = confirm("确定通过审核?");
				if (flag) {
					return true;
				}
			});
		});

		$(function() {
			//1. 点击 时, 弹出 确定通过审核? 若确定, 执行删除, 若不确定, 则取消
			$(".fail").click(function() {
				var flag = confirm("确定不通过审核?");
				if (flag) {
					return true;
				}
			});
		});
	</script>
</body>
</html>
