---
title: MCP Integration
createTime: 2026/03/29 14:30:00
---

# MCP HTTP Service

> MCP (Model Context Protocol) is an open standard introduced by Anthropic that lets AI assistants safely connect to external data sources and tools.

SecScore includes a built-in MCP HTTP service that allows external MCP clients to interact with the application via HTTP API. With this feature, you can use Claude, Cursor, or other MCP-compatible AI assistants to directly manage class scoring data and get intelligent help with student management and grading.

---

## 1. Enabling and Configuration

### 1.1 Enable MCP Service

Go to **System Settings** → **Advanced** → **MCP Integration**:

1. Check "Enable MCP HTTP Service"
2. Set the service port (default is `3000`, can be changed)
3. Configure the API key (used for authentication)
4. Click "Save and Restart Service"

### 1.2 Service Status

- After the service starts, the status bar shows the MCP service running status
- If the port is in use, the system will prompt you to change ports
- Changes require a service restart to take effect

### 1.3 Disable Service

Uncheck "Enable MCP HTTP Service" to stop the HTTP service. Once stopped, all external MCP clients will be unable to connect.

---

## 2. API Endpoints

Base URL: `http://localhost:<port>`

All endpoints require **API key authentication** (passed via HTTP Header).

### 2.1 Add Score `POST /api/add_score`

Add or deduct points from a student.

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| student_id | string | Yes | Student ID or number |
| points | number | Yes | Point value (positive for bonus, negative for penalty) |
| reason | string | No | Reason for the action |
| category | string | No | Reason category |

**Request Example:**

```bash
curl -X POST http://localhost:3000/api/add_score \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "student_id": "2025001",
    "points": 5,
    "reason": "Active participation in class",
    "category": "Classroom Performance"
  }'
```

**Response Example (Success):**

```json
{
  "success": true,
  "data": {
    "record_id": "rec_123456",
    "student_id": "2025001",
    "student_name": "Zhang San",
    "points": 5,
    "total_points": 87,
    "reason": "Active participation in class",
    "timestamp": "2026-03-29T14:35:00+08:00"
  }
}
```

**Response Example (Failure):**

```json
{
  "success": false,
  "error": "STUDENT_NOT_FOUND",
  "message": "Student with ID 2025001 not found"
}
```

### 2.2 List Students `GET /api/list_students`

Get all students in the class.

**Query Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| group | string | No | Filter by group |
| keyword | string | No | Search by name or student ID |

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/list_students?keyword=Zhang" \
  -H "X-API-Key: your-api-key"
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "total": 1,
    "students": [
      {
        "id": "2025001",
        "name": "Zhang San",
        "group": "Group 1",
        "total_points": 87,
        "rank": 3
      }
    ]
  }
}
```

### 2.3 Get Student Details `GET /api/student/:id`

Get detailed information and scoring records for a single student.

**Path Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Student ID or number |

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/student/2025001" \
  -H "X-API-Key: your-api-key"
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "id": "2025001",
    "name": "Zhang San",
    "group": "Group 1",
    "total_points": 87,
    "rank": 3,
    "records": [
      {
        "id": "rec_123456",
        "points": 5,
        "reason": "Active participation in class",
        "timestamp": "2026-03-29T14:35:00+08:00"
      }
    ]
  }
}
```

### 2.4 Get Leaderboard `GET /api/leaderboard`

Get the class points leaderboard.

**Query Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| limit | number | No | Maximum number of results (default 10, max 50) |
| group | string | No | Filter by group |

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/leaderboard?limit=5" \
  -H "X-API-Key: your-api-key"
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "total_students": 45,
    "leaderboard": [
      {
        "rank": 1,
        "id": "2025015",
        "name": "Li Si",
        "group": "Group 2",
        "total_points": 125
      },
      {
        "rank": 2,
        "id": "2025008",
        "name": "Wang Wu",
        "group": "Group 1",
        "total_points": 112
      }
    ]
  }
}
```

### 2.5 List Reasons `GET /api/list_reasons`

Get the list of preset scoring reasons.

**Query Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| category | string | No | Filter by category |
| type | string | No | Filter by type (`positive`/`negative`) |

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/list_reasons?type=positive" \
  -H "X-API-Key: your-api-key"
```

**Response Example:**

```json
{
  "success": true,
  "data": {
    "reasons": [
      {
        "id": "reason_1",
        "title": "Active participation in class",
        "points": 5,
        "category": "Classroom Performance",
        "type": "positive"
      },
      {
        "id": "reason_2",
        "title": "Excellent homework completion",
        "points": 10,
        "category": "Homework",
        "type": "positive"
      }
    ]
  }
}
```

### 2.6 Health Check `GET /api/health`

Check if the MCP service is running properly.

**Request Example:**

```bash
curl -X GET "http://localhost:3000/api/health"
```

**Response Example:**

```json
{
  "status": "healthy",
  "version": "1.2.0",
  "timestamp": "2026-03-29T14:40:00+08:00"
}
```

---

## 3. Authentication and Security

### 3.1 API Key Authentication

All API requests must include the API key in the request header:

```
X-API-Key: your-api-key
```

Requests without a valid API key will return `401 Unauthorized`:

```json
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Invalid API key"
}
```

### 3.2 Key Management

- API keys are generated in System Settings and can be reset at any time
- Consider using different keys for different clients (if multi-key support is added in future versions)
- Keep keys secure and do not expose them publicly

### 3.3 Network Access Restrictions

- The MCP HTTP service only listens on `localhost` (127.0.0.1)
- By default, external networks cannot access it directly
- For remote access, use a reverse proxy with HTTPS configured

### 3.4 Operation Logs

All operations performed via the MCP API are recorded in SecScore's operation logs, including:
- Operation time
- Operation type (add_score, etc.)
- User (identified by API key)
- Operation result

---

## 4. AI Assistant Integration Examples

### 4.1 Claude Desktop Configuration

Add to Claude Desktop's `claude_desktop_config.json`:

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

> Note: Actual configuration depends on the MCP client type. The above is just an example.

### 4.2 Cursor Editor Integration

Add the HTTP service endpoint in Cursor's MCP settings:

```
Endpoint: http://localhost:3000
API Key: your-api-key
```

### 4.3 Usage Scenario Examples

**Scenario 1: Real-time Classroom Scoring**

```
User: Give Zhang San 5 points for answering that question
AI: Added 5 points to student Zhang San (ID: 2025001). Current total: 87 points.
```

**Scenario 2: Check Student Performance**

```
User: Show me Li Si's points for this week
AI: Li Si (ID: 2025015) currently has 125 points, ranked #1 in class.
Points this week:
- Monday: Excellent homework +10
- Tuesday: Helped a classmate +5
- Wednesday: Active participation +5
```

**Scenario 3: Batch Operations**

```
User: Add 2 participation points to everyone in Group 1
AI: Added 2 points to all 12 students in Group 1, totaling 24 points.
```

---

## 5. Error Code Reference

| Error Code | Description | Solution |
|------------|-------------|----------|
| `UNAUTHORIZED` | Invalid or missing API key | Check the `X-API-Key` header |
| `STUDENT_NOT_FOUND` | Student does not exist | Verify the student ID, or use the search endpoint |
| `INVALID_POINTS` | Invalid points value | Check that points field is a number |
| `REQUIRED_FIELD_MISSING` | Missing required field | Check that all required parameters are present |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable | Check if SecScore is running and MCP service is enabled |
| `RATE_LIMITED` | Too many requests | Reduce request frequency |

---

## 6. Troubleshooting

### 6.1 Cannot Connect to Service

**Symptom:** Request returns `Connection refused`

**Checklist:**
1. Confirm SecScore is running
2. Check that MCP service is enabled in System Settings
3. Verify port configuration is correct and no other program is using the port
4. Check firewall settings (Windows may require allowing the app through firewall)

### 6.2 Authentication Failure

**Symptom:** Returns `401 Unauthorized`

**Checklist:**
1. Confirm the request header includes `X-API-Key`
2. Verify the API key matches what's in settings
3. Check for extra spaces or special characters in the key

### 6.3 CORS Issues

**Symptom:** Browser shows `CORS` errors

**Solution:**
- MCP service allows requests from `localhost` by default
- To access from other domains, add allowed origins in settings

### 6.4 Data Out of Sync

**Symptom:** API returns data different from UI display

**Checklist:**
1. Confirm the interface has refreshed after successful operations
2. Check if you're operating on the correct class/semester data
3. Review operation logs to confirm actions were executed

---

## 7. Related Modules

- [System Settings](./basic.md) - Learn how to configure the MCP service
- [Student Management](./listmg.md) - Manage student info and groups
- [Scoring](./pick.md) - Understand scoring logic
- [Reason Management](./link.md) - Configure preset reasons
- [Leaderboard](./notification.md) - View rankings and statistics

---

## 8. Technical Notes

### 8.1 Protocol Compatibility

SecScore's MCP implementation uses HTTP/REST API, not limited to MCP clients. Any tool that supports HTTP requests can call it, including:

- Python scripts
- Browser extensions
- Automation tools (like n8n, Zapier)
- Custom applications

### 8.2 Data Format

- Request/Response format: JSON
- Character encoding: UTF-8
- Time format: ISO 8601 (with timezone)
- All numbers are integers (points)

### 8.3 Performance and Limits

- Default concurrent connections: 10
- Maximum response data per request: 1MB
- Recommended call frequency: no more than 10 per second
- Student list queries return all by default, use keyword parameter when possible

### 8.4 Version Compatibility

- MCP service API version: v1
- Future versions will maintain backward compatibility
- New endpoints will be marked with version requirements
