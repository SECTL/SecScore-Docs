---
title: MCP 集成
createTime: 2026/03/29 14:30:00
---

# MCP HTTP 服务

> MCP（Model Context Protocol，模型上下文协议）是由 Anthropic 推出的开放标准，用于让 AI 助手安全地连接外部数据源和工具。

SecScore 内置 MCP HTTP 服务，允许外部 MCP 客户端通过 HTTP API 与软件交互。借助此功能，你可以让 Claude、Cursor 或其他支持 MCP 的 AI 助手直接操作班级积分数据，实现智能化的学生管理和评分辅助。

---

## 1. 启用与配置

### 1.1 开启 MCP 服务

进入**系统设置** → **高级** → **MCP 集成**：

1. 勾选"启用 MCP HTTP 服务"
2. 设置服务端口（默认 `3000`，可修改）
3. 配置 API 密钥（用于身份验证）
4. 点击"保存并重启服务"

### 1.2 服务状态查看

- 服务启动后，状态栏会显示 MCP 服务运行状态
- 若端口被占用，系统会提示更换端口
- 修改配置后需重启服务生效

### 1.3 关闭服务

取消勾选"启用 MCP HTTP 服务"即可停止 HTTP 服务。停止后所有外部 MCP 客户端将无法连接。

---

## 2. API 端点

服务地址：`http://localhost:<端口>`

所有端点均需要**API 密钥认证**（通过 HTTP Header 传递）。

### 2.1 添加积分 `POST /api/add_score`

为学生添加或扣除积分。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| student_id | string | 是 | 学生学号或 ID |
| points | number | 是 | 积分值（正数为加分，负数为扣分） |
| reason | string | 否 | 操作理由 |
| category | string | 否 | 理由分类 |

**请求示例：**

```bash
curl -X POST http://localhost:3000/api/add_score \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "student_id": "2025001",
    "points": 5,
    "reason": "积极回答问题",
    "category": "课堂表现"
  }'
```

**响应示例（成功）：**

```json
{
  "success": true,
  "data": {
    "record_id": "rec_123456",
    "student_id": "2025001",
    "student_name": "张三",
    "points": 5,
    "total_points": 87,
    "reason": "积极回答问题",
    "timestamp": "2026-03-29T14:35:00+08:00"
  }
}
```

**响应示例（失败）：**

```json
{
  "success": false,
  "error": "STUDENT_NOT_FOUND",
  "message": "未找到学号为 2025001 的学生"
}
```

### 2.2 获取学生列表 `GET /api/list_students`

获取班级中的所有学生信息。

**查询参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| group | string | 否 | 按小组筛选 |
| keyword | string | 否 | 按姓名或学号搜索 |

**请求示例：**

```bash
curl -X GET "http://localhost:3000/api/list_students?keyword=张三" \
  -H "X-API-Key: your-api-key"
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "total": 1,
    "students": [
      {
        "id": "2025001",
        "name": "张三",
        "group": "第一组",
        "total_points": 87,
        "rank": 3
      }
    ]
  }
}
```

### 2.3 获取学生详情 `GET /api/student/:id`

获取单个学生的详细信息和积分记录。

**路径参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | 是 | 学生学号或 ID |

**请求示例：**

```bash
curl -X GET "http://localhost:3000/api/student/2025001" \
  -H "X-API-Key: your-api-key"
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "id": "2025001",
    "name": "张三",
    "group": "第一组",
    "total_points": 87,
    "rank": 3,
    "records": [
      {
        "id": "rec_123456",
        "points": 5,
        "reason": "积极回答问题",
        "timestamp": "2026-03-29T14:35:00+08:00"
      }
    ]
  }
}
```

### 2.4 获取排行榜 `GET /api/leaderboard`

获取班级积分排行榜。

**查询参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| limit | number | 否 | 返回数量上限（默认 10，最大 50） |
| group | string | 否 | 按小组筛选 |

**请求示例：**

```bash
curl -X GET "http://localhost:3000/api/leaderboard?limit=5" \
  -H "X-API-Key: your-api-key"
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "total_students": 45,
    "leaderboard": [
      {
        "rank": 1,
        "id": "2025015",
        "name": "李四",
        "group": "第二组",
        "total_points": 125
      },
      {
        "rank": 2,
        "id": "2025008",
        "name": "王五",
        "group": "第一组",
        "total_points": 112
      }
    ]
  }
}
```

### 2.5 获取理由列表 `GET /api/list_reasons`

获取预设的积分操作理由列表。

**查询参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| category | string | 否 | 按分类筛选 |
| type | string | 否 | 按类型筛选（`positive`/`negative`） |

**请求示例：**

```bash
curl -X GET "http://localhost:3000/api/list_reasons?type=positive" \
  -H "X-API-Key: your-api-key"
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "reasons": [
      {
        "id": "reason_1",
        "title": "积极回答问题",
        "points": 5,
        "category": "课堂表现",
        "type": "positive"
      },
      {
        "id": "reason_2",
        "title": "作业完成优秀",
        "points": 10,
        "category": "作业表现",
        "type": "positive"
      }
    ]
  }
}
```

### 2.6 健康检查 `GET /api/health`

检查 MCP 服务是否正常运行。

**请求示例：**

```bash
curl -X GET "http://localhost:3000/api/health"
```

**响应示例：**

```json
{
  "status": "healthy",
  "version": "1.2.0",
  "timestamp": "2026-03-29T14:40:00+08:00"
}
```

---

## 3. 认证与安全

### 3.1 API 密钥认证

所有 API 请求必须在请求头中携带 API 密钥：

```
X-API-Key: your-api-key
```

未提供或提供错误的 API 密钥将返回 `401 Unauthorized`：

```json
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "无效的 API 密钥"
}
```

### 3.2 密钥管理

- API 密钥在系统设置中生成，可随时重置
- 建议为不同客户端使用不同密钥（如未来版本支持多密钥）
- 密钥应妥善保管，不要在公开场合泄露

### 3.3 网络访问限制

- MCP HTTP 服务仅监听 `localhost`（127.0.0.1）
- 默认情况下，外部网络无法直接访问
- 如需远程访问，建议使用反向代理并配置 HTTPS

### 3.4 操作日志

所有通过 MCP API 执行的操作都会记录在 SecScore 的操作日志中，包括：
- 操作时间
- 操作类型（add_score 等）
- 操作用户（API 密钥标识）
- 操作结果

---

## 4. AI 助手集成示例

### 4.1 Claude Desktop 配置

在 Claude Desktop 的 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "secscore": {
      "command": "curl",
      "args": [
        "-X", "POST",
        "-H", "Content-Type: application/json",
        "-H", "X-API-Key: your-api-key",
        "http://localhost:3000/api/add_score",
        "-d"
      ]
    }
  }
}
```

> 注：实际配置方式取决于 MCP 客户端类型，上述仅为示例。

### 4.2 Cursor 编辑器集成

在 Cursor 的 MCP 设置中添加 HTTP 服务端点：

```
Endpoint: http://localhost:3000
API Key: your-api-key
```

### 4.3 使用场景示例

**场景一：课堂实时评分**

```
用户：给刚才回答问题的张三加 5 分
AI：已为学生张三（学号 2025001）添加 5 分，当前总分 87 分。
```

**场景二：查询学生表现**

```
用户：帮我看看李四这周的积分情况
AI：李四（学号 2025015）当前积分 125 分，排名班级第 1。
本周积分记录：
- 周一：作业完成优秀 +10
- 周二：帮助同学 +5
- 周三：课堂表现积极 +5
```

**场景三：批量操作**

```
用户：给第一组的所有同学各加 2 分参与分
AI：已为第一组的 12 名学生各添加 2 分，共计 24 分。
```

---

## 5. 错误代码参考

| 错误代码 | 说明 | 处理建议 |
|----------|------|----------|
| `UNAUTHORIZED` | API 密钥无效或缺失 | 检查请求头中的 `X-API-Key` |
| `STUDENT_NOT_FOUND` | 学生不存在 | 确认学号正确，或使用搜索接口查找 |
| `INVALID_POINTS` | 积分值无效 | 检查 points 字段是否为数字 |
| `REQUIRED_FIELD_MISSING` | 缺少必填字段 | 检查请求参数是否完整 |
| `SERVICE_UNAVAILABLE` | 服务暂时不可用 | 检查 SecScore 是否运行，MCP 服务是否启用 |
| `RATE_LIMITED` | 请求过于频繁 | 降低请求频率 |

---

## 6. 故障排查

### 6.1 无法连接服务

**现象：** 请求返回 `Connection refused`

**排查步骤：**
1. 确认 SecScore 正在运行
2. 检查系统设置中 MCP 服务是否已启用
3. 确认端口配置正确，无其他程序占用
4. 检查防火墙设置（Windows 可能需要允许应用通过防火墙）

### 6.2 认证失败

**现象：** 返回 `401 Unauthorized`

**排查步骤：**
1. 确认请求头中包含 `X-API-Key`
2. 核对 API 密钥是否与设置中一致
3. 检查密钥是否包含多余空格或特殊字符

### 6.3 跨域问题

**现象：** 浏览器中报 `CORS` 错误

**解决方案：**
- MCP 服务默认允许来自 `localhost` 的请求
- 如需从其他域名访问，需在设置中添加允许的源地址

### 6.4 数据不同步

**现象：** API 返回的数据与界面显示不一致

**排查步骤：**
1. 确认操作成功后界面已刷新
2. 检查是否操作了正确的班级/学期数据
3. 查看操作日志确认操作是否成功执行

---

## 7. 相关模块

- [系统设置](./basic.md) - 了解如何配置 MCP 服务
- [学生管理](./listmg.md) - 管理学生信息和分组
- [积分管理](./pick.md) - 了解积分操作逻辑
- [理由管理](./link.md) - 配置预设理由
- [排行榜](./notification.md) - 查看排名和积分统计

---

## 8. 技术说明

### 8.1 协议兼容性

SecScore 的 MCP 实现基于 HTTP/REST API，不仅限于 MCP 客户端。任何支持 HTTP 请求的工具都可以调用，包括：

- Python 脚本
- 浏览器扩展
- 自动化工具（如 n8n、Zapier）
- 自定义应用

### 8.2 数据格式

- 请求/响应格式：JSON
- 字符编码：UTF-8
- 时间格式：ISO 8601（带时区）
- 所有数值均为整数（积分）

### 8.3 性能与限制

- 默认并发连接数：10
- 单次请求最大响应数据：1MB
- 建议调用频率：每秒不超过 10 次
- 学生列表查询默认返回全部，建议配合 keyword 参数使用

### 8.4 版本兼容性

- MCP 服务 API 版本：v1
- 后续版本将保持向后兼容
- 新增端点会单独标注版本要求