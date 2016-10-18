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
  <title>TuringChain</title>
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
                  <th>申请者</th>
                  <!-- <th>省</th>
                  <th>城市</th>
                  <th>县</th> -->
                  <th>公司</th>
                  <th>注册使用开始时间</th>
                  <th>用户升级申请时间</th>
                  <!-- <th>公司资质证明</th> -->
                  <th>审核</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="apply" items="${applys}">
                <tr>
                  <td>${apply.userName}</td>
                  <td>${apply.business}</td>
                  <td>${apply.registerStart}</td>
                  <td>${apply.applyTime}</td>
				  <td>
                    <a href="<%=request.getContextPath()%>/getApplyInfoById/${apply.userId}.do" >
                    	<button type="button" class="btn btn-block btn-sucess" >详细信息</button>
                    </a> 
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
<script src="<%=basePath%>js/showBo.js"></script>

<script type="text/javascript">
	$(function() {
		//1. 点击 时, 弹出 确定通过审核? 若确定, 执行删除, 若不确定, 则取消
		$(".pass").click(function() {
			var flag = confirm("确定通过审核???");
			if (flag) {
				var $tr = $(this).parent().parent();
				//删除, 使用 ajax 的方式
				var url = this.href;
				var args = {
					"time" : new Date()
				};
				$.get(url, args, function(data) {
					//若 data 的返回值为 1, 则提示 审核通过成功, 且把当前行删除
					if (data == "1") {
						alert("审核通过完成!!!");
						$tr.remove();
						window.location.reload();
					} else {
						//若 data 的返回值不是 1, 审核通过失败. 
						alert("审核通过失败!!!");
					}
				});
			}
			//取消超链接的默认行为
			return false;
		});
	});
	
	$(function() {
		//1. 点击 时, 弹出 确定通过审核? 若确定, 执行删除, 若不确定, 则取消
		$(".fail").click(function() {
			var flag = confirm("确定不通过审核?");
			if (flag) {
				var $tr = $(this).parent().parent();
				//删除, 使用 ajax 的方式
				var url = this.href;
				var args = {
					"time" : new Date()
				};
				$.get(url, args, function(data) {
					//若 data 的返回值为 1, 则提示 审核不通过完成, 且把当前行删除
					if (data == "1") {
						alert("审核不通过完成!");
						$tr.remove();
					} else {
						//若 data 的返回值不是 1, 审核通过失败. 
						alert("审核不通过失败!");
					}
				});
			}
			//取消超链接的默认行为
			return false;
		});
	});
	
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
