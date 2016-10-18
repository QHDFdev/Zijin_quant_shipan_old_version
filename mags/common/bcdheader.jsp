 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <header class="main-header">
    <!-- Logo -->
    <a href="<%=request.getContextPath()%>/mags/magindex.jsp" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>TU</b>L</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Turing</b>Chain</span>
    </a>
    <!-- 头部导航栏: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- 侧边栏 开关 按钮-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">导航开关</span>
      </a>

	<div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          
          <!-- Notifications: style can be found in dropdown.less -->

          <!-- Tasks: style can be found in dropdown.less -->
          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="<%=request.getContextPath()%>/dist/img/user8-128x128.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">${adminName}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="<%=request.getContextPath()%>/dist/img/user8-128x128.jpg" class="img-circle" alt="User Image">

              </li>
              
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  
                </div>
                <div class="pull-right">
                  <a href="<%=request.getContextPath()%>/logout.do" class="btn btn-default btn-flat">退出管理平台</a>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
        </ul>
      </div>
    </nav>
  </header>