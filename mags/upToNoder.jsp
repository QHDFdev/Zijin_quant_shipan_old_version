<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>TuLingChain</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->
  <link rel="stylesheet" href="<%=basePath%>bootstrap/css/bootstrap.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="<%=basePath%>plugins/datatables/dataTables.bootstrap.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="<%=basePath%>dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="<%=basePath%>dist/css/skins/_all-skins.min.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

 	<%@ include file="common/bcdheader.jsp"%>
		<!-- Left side column. contains the logo and sidebar -->
	<%@ include file="common/bcdsidebar.jsp"%>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
               节点用户申请列表
      </h1>
       <!-- <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li class="active">数据表</li>
      </ol> -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">数据表</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                
                
                <tr>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>申请日期</th>
                  <th>用户状态</th>
                  <th>用户类型</th>
                  <th>审核</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="noder" items="${noders}">
                <tr>
                  <td>${noder.noderName}</td>
                  <td>${noder.email}</td>
                  <td>${noder.registerStart}</td>
                  <td>${noder.noderState}</td>
                  <td>${noder.noderType}</td>
                  <td>
                    <a href="<%=request.getContextPath()%>/getInfoById/${noder.id}.do"><button type="button" class="btn btn-block btn-info" >审核信息</button></a>
                  </td>
                </tr>
                </c:forEach>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

          
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 	 <div class="control-sidebar-bg"></div>
	<!-- footer -->
	<%@ include file="common/bcdfooter.jsp" %>
</div>
<!-- ./wrapper -->

<!-- jQuery 2.2.0 -->
<script src="<%=basePath%>plugins/jQuery/jQuery-2.2.0.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="<%=basePath%>bootstrap/js/bootstrap.min.js"></script>
<!-- DataTables -->
<script src="<%=basePath%>plugins/datatables/jquery.dataTables.min.js"></script>
<script src="<%=basePath%>plugins/datatables/dataTables.bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="<%=basePath%>plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="<%=basePath%>plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="<%=basePath%>dist/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="<%=basePath%>dist/js/demo.js"></script>
<!-- page script -->

<script type="text/javascript">	
	  $(function () {
		    $("#example1").DataTable();
		    $('#example2').DataTable({
		      "paging": true,
		      "lengthChange":true,
		      "searching": true,
		      "ordering": true,
		      "info": true,
		      "autoWidth": true
		    });
		  });
	
</script>
</body>
</html>
