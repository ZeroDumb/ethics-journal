---
title: "Nmap Command Reference"
description: "Common Nmap commands and flags for network reconnaissance"
pubDate: 2025-07-18
categories: ["commands", "reconnaissance", "tools"]
---

# Nmap Command Reference

A quick reference for common Nmap commands and flags used in network reconnaissance.

## Basic Scans

### Host Discovery
```bash
# Ping scan
nmap -sn 192.168.1.0/24

# No ping scan (assume host is up)
nmap -Pn 192.168.1.1

# TCP SYN ping
nmap -PS 192.168.1.1
```

### Port Scanning
```bash
# TCP connect scan
nmap -sT 192.168.1.1

# SYN scan (stealth)
nmap -sS 192.168.1.1

# UDP scan
nmap -sU 192.168.1.1

# Scan specific ports
nmap -p 80,443,8080 192.168.1.1

# Scan port ranges
nmap -p 1-1000 192.168.1.1
```

## Advanced Scans

### Service Detection
```bash
# Service and version detection
nmap -sV 192.168.1.1

# Aggressive service detection
nmap -A 192.168.1.1

# OS detection
nmap -O 192.168.1.1
```

### Scripts
```bash
# Run default scripts
nmap -sC 192.168.1.1

# Run specific script
nmap --script=http-title 192.168.1.1

# Run multiple scripts
nmap --script=vuln,auth 192.168.1.1
```

## Output Formats

```bash
# Normal output
nmap 192.168.1.1

# XML output
nmap -oX scan.xml 192.168.1.1

# Grepable output
nmap -oG scan.gnmap 192.168.1.1

# All formats
nmap -oA scan 192.168.1.1
```

## Common Flags

- `-v` - Verbose output
- `-T4` - Timing template (faster)
- `-n` - No DNS resolution
- `--max-retries 1` - Reduce retries
- `--min-rate 1000` - Minimum packet rate 