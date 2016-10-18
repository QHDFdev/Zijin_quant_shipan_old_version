
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<aside class="main-sidebar">
	<!-- sidebar: style can be found in sidebar.less -->
	<section class="sidebar">
		<!-- Sidebar user panel -->
		<!-- search form -->

		<!-- /.search form -->
		<!-- sidebar menu: : style can be found in sidebar.less -->
		<ul class="sidebar-menu">
			<li class="header">导航</li>
			<li class="active treeview"><a href="#"> <i
					class="fa fa-dashboard"></i> <span>审核</span> <i
					class="fa fa-angle-left pull-right"></i>
			</a>
				<ul class="treeview-menu">
					<li><a
						href="<%=request.getContextPath()%>/admin/listAllNoder.do"><i
							class="fa fa-circle-o"></i> 审核节点用户</a></li>
					<li><a
						href="<%=request.getContextPath()%>/admin/listAllBlockChainAdmin.do"><i
							class="fa fa-circle-o"></i> 审核区块链管理员</a></li>
					<li><a
						href="<%=request.getContextPath()%>/admin/listAllApply.do"><i
							class="fa fa-circle-o"></i> 审核权限升级</a></li>
					<li><a
						href="<%=request.getContextPath()%>/admin/listNoders.do"><i
							class="fa fa-circle-o"></i> 管理节点用户</a></li>
					<li><a
						href="<%=request.getContextPath()%>/admin/listAllBlockChainAdmin2.do"><i
							class="fa fa-circle-o"></i> 管理区块链管理员</a></li>

				</ul>
			<li class=" treeview"><a href="#"> <i
					class="fa fa-dashboard"></i> <span>节点</span> <i
					class="fa fa-angle-left pull-right"></i>
			</a>
				<ul class="treeview-menu">
					<li><a
						href="<%=request.getContextPath()%>/admin/listAllNoderDeploy.do"><i
							class="fa fa-circle-o"></i>节点信息</a></li>
					<li><a href="#"><i class="fa fa-circle-o"></i>节点监控</a></li>
					<li><a href="#"><i class="fa fa-circle-o"></i>区块监控</a></li>
				</ul>
		</ul>
	</section>
	<!-- /.sidebar -->
</aside>