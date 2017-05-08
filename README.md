**致一科技人员评估系统**

1.安装依赖
  **npm install** 
注：由于是国外资源需要转向淘宝镜像（可选项）
  1. **npm config set registry https://registry.npm.taobao.org**
  2. **npm info underscore** （成功则会返回response）
  3. **npm --registry https://registry.npm.taobao.org info underscore** 
  4. 编辑 ~/.npmrc 
     registry = https://registry.npm.taobao.org
     
或是直接使用cnpm模块（可选项）
  **npm install -g cnpm --registry=https://registry.npm.taobao.org**
  安装依赖 **cnpm install**
  
2.修改配置文件
  config.js
  common/mysql-config.js 修改数据库配置
3.开启服务
  **npm start**
  