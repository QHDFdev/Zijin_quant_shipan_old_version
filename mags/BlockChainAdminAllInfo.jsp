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
  <link rel="stylesheet" href="<%=basePath%>css/showBo.css">
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
               区块链管理员申请信息
      </h1>
            <!-- <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li class="active">数据表</li>
      </ol> -->
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
            <form class="form-horizontal">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.bcAdmName}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">邮箱</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.email}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">地址</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.address}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">公司名称</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.companyName}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">公司注册号</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.companyRegNum}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">公司地址</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.companyAddress}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">推荐人名 </label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.referrerName}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">推荐人授权码</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.referrerKey}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">用户所属行业</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.userBusinessType}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点区块链名</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.nodeBlockChainName}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点所属区块链节点号</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.nodeBlockChainNum}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">区块链管理子节点个数上限</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.sonNodeNum}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">区块链管理具体权限申请项</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.authority}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点公钥</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.nodePublicKey}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点私钥</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.nodePrivaeteKey}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">申请/升级原因</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.applyReason}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">首次注册时间</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.registDate}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">申请/升级时间</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${bcAdmin.applyDate}">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">区块链管理员状态</label>
                  <div class="col-sm-6">
                  	 <input type="text" class="form-control" value="${bcAdmin.blockChainAdminState}" >
                  </div>
                </div>
             
              <!-- /.box-body -->
              <div class="box-footer">
              <label class="col-sm-2 control-label"></label>
	              <div class="col-sm-1">
	              	<a href="<%=request.getContextPath()%>/passBlockChainAdmin/${bcAdmin.id}.do" class="pass"><button type="button" class="btn btn-block btn-success btn-info ">审核通过</button></a>
	              </div>
	              <div class="col-sm-1">
	                <a href="<%=request.getContextPath()%>/failBlockChainAdmin/${bcAdmin.id}.do" class="fail"><button type="button" class="btn btn-block btn-danger btn-info ">审核不通过</button></a>
	              </div>
              </div>
              <%-- <div class="box-footer" ng-show="bcAdmin.blockChainAdminState!='未审核'">
              <label class="col-sm-2 control-label"></label>
	              <div class="col-sm-1">
	              	<a href="<%=basePath%>deleteBlockChainAdmin/${bcAdmin.id}.do" class="delete"><button type="button" class="btn btn-block btn-success btn-info ">删除</button></a>
	              </div>
              </div> --%>
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
			Showbo.Msg.alert("BlockChainAdmin：审核pass");
			var flag = Showbo.Msg.confirm("BlockChainAdmin:确定通过审核?");
			if (flag) {
				Showbo.Msg.alert("BlockChainAdmin:通过了审核~~~");
				return true;
				}
		});
	});
	
	$(function() {
		//1. 点击 时, 弹出 确定通过审核? 若确定, 执行删除, 若不确定, 则取消
		$(".fail").click(function() {
			Showbo.Msg.alert("BlockChainAdmin：审核fail");
			var flag = Showbo.Msg.confirm("BlockChainAdmin:确定不通过审核?");
			if (flag) {
				Showbo.Msg.alert("BlockChainAdmin:不通过审核~~~");
				return true;
				}
		});
	});
	
</script>
</body>
</html>
