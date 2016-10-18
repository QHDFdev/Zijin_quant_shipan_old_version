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
  <link rel="stylesheet" href="<%=basePath%>css/showBo.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body class="hold-transition skin-blue sidebar-mini" style="font-size:14px;">
<div class="wrapper">

 <%@ include file="common/bcdheader.jsp"%>
 
  <!-- Left side column. contains the logo and sidebar -->
<%@ include file="common/bcdsidebar.jsp"%>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
               节点详细信息
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="col-md-16">
          <!-- Horizontal Form -->
          <div class="box box-info">
            <!-- /.box-header -->
            <!-- form start -->
            <form class="form-horizontal">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点IP</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeIP}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点名称</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeName}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点ID</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeID}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">所属区域</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.region}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">所属组织</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.ownedOrgnization}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点负责人</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.respPerson}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点类型</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeType}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点Pubkey</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodePUBKEY}" >
                  </div>
                </div>
              <%--   <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">创建时间</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.createdTime}" >
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">运行时长</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.runtime}">
                  </div>
                </div> 
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点统计</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.runStatistics}">
                  </div>
                </div>--%>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点Cpu</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeCpu} 核">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点内存</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeMemory} G">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点带宽</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeBandwidth} MB">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点系统</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeOS}">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">节点硬盘</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" value="${nodeDep.nodeDisk}">
                  </div>
                </div>
              <!-- /.box-body -->
              <div class="box-footer">
              <label class="col-sm-2 control-label"></label>
	              <div class="col-sm-1">
	              	<a href="<%=request.getContextPath()%>/deleteById/${nodeDep.nodeID}.do" class="delete"><button type="button" class="btn btn-block btn-danger btn-info ">删除</button></a>
	              </div>
	               <%-- <div class="col-sm-1">
	                <a href="<%=basePath%>failDelete/${noder.id}.do" class="fail"><button type="button" class="btn btn-block btn-success btn-info ">取消</button></a>
	              </div> --%> 
              </div>
              </div>
              </form>
          </div>
          </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  
	<!-- footer -->
	 <div class="control-sidebar-bg"></div>
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
