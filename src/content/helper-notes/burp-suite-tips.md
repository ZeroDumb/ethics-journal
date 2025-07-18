---
title: "Burp Suite Tips & Tricks"
description: "Essential Burp Suite configurations, shortcuts, and techniques for web application testing"
pubDate: 2025-07-18
categories: ["tools", "web-security", "testing"]
---

# Burp Suite Tips & Tricks

Essential configurations, shortcuts, and techniques for effective web application testing with Burp Suite.

## Initial Setup

### Proxy Configuration
```bash
# Default proxy settings
Proxy: 127.0.0.1:8080
HTTPS: 127.0.0.1:8080

# Browser configuration
# Firefox: Settings > Network Settings > Manual proxy
# Chrome: --proxy-server=127.0.0.1:8080
```

### Certificate Installation
```bash
# Download Burp certificate
# Navigate to http://burp/cert in browser
# Or download from: http://127.0.0.1:8080/cert

# Install in browser/system
# Firefox: Settings > Privacy & Security > Certificates > View Certificates
# Chrome: Settings > Security > Manage Certificates
```

## Essential Shortcuts

### General Navigation
- `Ctrl+Shift+O` - Open project
- `Ctrl+S` - Save project
- `Ctrl+Shift+S` - Save project as
- `Ctrl+Q` - Quit Burp Suite

### Proxy Tab
- `Ctrl+R` - Send to Repeater
- `Ctrl+Shift+R` - Send to Intruder
- `Ctrl+Shift+S` - Send to Scanner
- `Ctrl+Shift+B` - Send to Spider

### Repeater Tab
- `Ctrl+Enter` - Send request
- `Ctrl+Shift+Enter` - Send request and follow redirects
- `Ctrl+U` - URL encode
- `Ctrl+Shift+U` - URL decode

## Scanner Configuration

### Scan Settings
```bash
# Crawl settings
- Maximum crawl depth: 10
- Maximum links per page: 100
- Maximum requests per second: 10

# Audit settings
- Maximum requests per second: 5
- Maximum concurrent requests: 10
```

### Custom Scan Policies
```bash
# Create custom policy for specific tests
1. Scanner > Scan Queue > New Scan
2. Select "Use custom policy"
3. Configure specific checks:
   - SQL Injection
   - XSS
   - CSRF
   - File Upload
```

## Advanced Techniques

### Intruder Payloads
```bash
# SQL Injection payloads
' OR '1'='1
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
admin'--

# XSS payloads
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')

# Directory traversal
../../../etc/passwd
..\..\..\windows\system32\drivers\etc\hosts
```

### Macro Recording
```bash
# Record login macro
1. Proxy > HTTP history
2. Right-click login request
3. "Add to macro"
4. Configure parameters to extract
5. Use in Intruder for authenticated scans
```

## Useful Extensions

### BApp Store Extensions
```bash
# Essential extensions
- Logger++
- J2EEScan
- Backslash Powered Scanner
- HTTP Request Smuggler
- Param Miner
- ActiveScan++
```

### Custom Extensions
```bash
# Python extension template
from burp import IBurpExtender
from burp import IHttpListener

class BurpExtender(IBurpExtender, IHttpListener):
    def registerExtenderCallbacks(self, callbacks):
        self._callbacks = callbacks
        callbacks.registerHttpListener(self)
    
    def processHttpMessage(self, toolFlag, messageIsRequest, messageInfo):
        # Custom processing logic
        pass
```

## Reporting

### Custom Report Templates
```bash
# HTML report customization
1. Scanner > Scan Queue > Report
2. Select "HTML" format
3. Customize template with:
   - Company logo
   - Executive summary
   - Technical details
   - Remediation steps
```

### Export Options
```bash
# Export formats
- HTML (detailed)
- XML (machine-readable)
- CSV (spreadsheet)
- JSON (API integration)
```

## Performance Tips

### Memory Management
```bash
# Increase heap size
java -Xmx4g -jar burpsuite_pro.jar

# Monitor memory usage
- Proxy > Options > Performance
- Set appropriate limits
```

### Network Optimization
```bash
# Proxy settings
- Buffer size: 8192 bytes
- Connection timeout: 30 seconds
- Read timeout: 30 seconds

# Scanner optimization
- Limit concurrent scans
- Use appropriate scan policies
- Monitor resource usage
```

## Troubleshooting

### Common Issues
```bash
# Certificate errors
- Clear browser cache
- Reinstall Burp certificate
- Check system date/time

# Connection issues
- Verify proxy settings
- Check firewall rules
- Test with different ports

# Performance problems
- Reduce concurrent requests
- Increase memory allocation
- Close unnecessary tabs
```

## Best Practices

1. **Always backup projects** before major scans
2. **Use appropriate scan policies** for target scope
3. **Monitor resource usage** during large scans
4. **Document findings** with screenshots
5. **Test in isolated environment** first
6. **Follow responsible disclosure** procedures
7. **Keep Burp Suite updated** regularly 