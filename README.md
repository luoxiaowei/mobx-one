# mobx-one

### configuration
1. npm start  启动项目
2. npm run dev 启动项目
3. npm run dist 打包
4. npm run lint 修复eslint检测的问题

### project
1. rem自适应布局, 样式模块化
2. mobx数据流

1.搭一个简单的后台  
2.银行卡管理
【添加银行卡】姓名 银行卡号 开户行
【银行卡列表】姓名 银行卡号 开户行 支付笔数 支付总金额
【删除，编辑】
3.商户管理
【添加商户】商户名称 商户登录账号 登录密码
【商户展示】商户名称 商户登录账号
4.订单管理
【订单列表】订单编号 充值金额 转账截图 充值账户 时间


`name`  '姓名',
  `bank_number`  '银行卡号',
  `bank_name` '开户行',
  `recharge_times`  '支付笔数',
  `recharge_money`  '支付总金额',

`name`  '商家名称',
  `account`  '登录账号',
  `password`登录密码',

`order_sn` '订单号',
  `amount` '充值金额',
  `image` '转账截图',
  `bank_number`  '银行卡号',
  `bank_name` '开户行',
  `name`  '姓名',

订单列表 http://154.92.18.182/api/admin/orders/list
订单审核 http://154.92.18.182/api/admin/orders/verify?id=1&status=1  0审核中 1充值成功 2充值失败
银行卡添加：http://154.92.18.182/api/admin/bank/create
银行卡编辑：http://154.92.18.182/api/admin/bank/edit?id=1
银行卡删除：http://154.92.18.182/api/admin/bank/delete?id=1
银行卡列表：http://154.92.18.182/api/admin/bank/list
商户添加：http://154.92.18.182/api/admin/merchant/create
商户编辑：http://154.92.18.182/api/admin/merchant/edit?id=1
商户删除：http://154.92.18.182/api/admin/merchant/delete?id=1
商户列表：http://154.92.18.182/api/admin/merchant/list