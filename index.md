---
layout: default
title: Home
---

# Welcome to ZeroDumb Ethics Journal

Exploring the frontier of ethical hacking, recon, and digital responsibility.

## 📝 Latest Posts

<ul>
{% for post in site.posts %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: "%B %d, %Y" }}</li>
{% endfor %}
</ul>
