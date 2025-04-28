---
title: "Flagged as a Phishing Site for Launching an Ethics Blog"
pubDate: 2025-04-25
categories: ["ethics", "webroot", "dns", "lol"]
---

Welcome to the ZeroDumb blog. A safe space for ethical hacking, recon journaling, and—as it turns out—getting immediately flagged by a threat intelligence platform for existing.

## What Happened

Within minutes of configuring my custom domain (`zerodumb.dev`) and pointing it to my GitHub Pages blog, I was greeted by a full-screen Webroot alert:

> _"Website Blocked: Phishing Site (RT)"_

![Screenshot 2025-04-25 153924](https://github.com/user-attachments/assets/3bf890c4-5cae-4869-aaaa-cc3cd7913c82)


Apparently, my barely-functional skeleton of a blog had already earned a spot in the Red Room of the Internet. You know, the one where you get accused of trying to steal logins and passwords before you've even published a contact form.

## Why Did This Happen?

**Reason #1: I'm Too New**  
New domains, especially `.dev` TLDs, are under hyper-scrutiny.

**Reason #2: No Public Content Yet**  
To automated scanners, an empty website is suspicious.

**Reason #3: GitHub Pages Host**  
Some bad actors have used Pages for spam/phishing in the past, so some DNS security services throw the baby out with the bathwater.

**Reason #4: The Name Is... A Bit Much**  
Look, I get it. "zerodumb.dev" does sound like a troll domain, especially if you're a machine trained on phishing heuristics.

## What I Did About It

1. Submitted a review request to [Webroot's BrightCloud tool](https://www.brightcloud.com/tools/url-ip-lookup.php)
2. Added real content to the blog (including this post!)
3. Turned it into a teachable moment instead of a meltdown

## What You Should Know

If you're launching an infosec blog or recon project:

- Use your domain with intent
- Publish some **actual non-blank** content *before* pointing DNS
- Be aware that some security vendors will flag you for breathing
- Embrace it—it means you're doing something interesting

## Final Thought

Being flagged as a phishing site **within 30 minutes of creating a site about ethics** is possibly the most poetic moment in my short-but-intense recon journey.

If nothing else, it proves the need for better context in automated defense systems.

Until then, I remain:

**Zero**  
Human, not phishing bot  
`zero@zerodumb.dev`

*Yes, I submitted the site for reclassification. No, I'm not mad. This is the best kind of irony: the kind you can blog about.*

![Screenshot 2025-04-28 144702](https://github.com/user-attachments/assets/7313ef81-d4e7-4d6c-9e9e-6fc979db8fe8)

