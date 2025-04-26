---
title: "When the AI Built a Scraper I Shouldn't Deliver"
pubDate: 2024-05-01
categories: ["ethics", "ai", "development"]
---

A client asked for help populating a new directory. I asked AI for assistance. What I got was a fully wired headless scraper ready to mass-clone someone else's data.

It was fast. It was accurate. It was ethically horrifying.

This post breaks down what happened, what I learned, and why responsible developers must draw hard lines — even when the client has a checkbook ready.

## 💥 The Moment It Got Weird

It started like any other freelance request:  
> _"Can you help build my platform and then populate my new directory?"_

Simple enough.  
Open data.  
Publicly listed companies.  
What could go wrong?

---

## 📬 The Client Request (aka Bob)

Bob (not his real name) was excited.  
He had a shiny new website. He needed it filled with business listings.

When I asked where the data should come from, Bob shrugged and said:
> _"I want to use the listings from "example.com", their site is so out of date, and I want to make a better version. Can you just scrape it from their site? I have been using the browser inspect tool and just copying what it says in the code blocks, one listing at a time, and it is all manual work, slow, and no one I have tried hiring has been able to provide a way to capture everything I want. It's all public anyway."_

First red flag: ignored.  
(Spoiler: this will become important.)

---

## 🤖 What I Asked the AI

Wanting to be efficient, I turned to an AI coding assistant and asked it a simple question:

> _" Can you help me populate a new directory with some of the listings data from an outside url if I provide the example source?"_

A harmless enough request, right?

---

## 🎯 What the AI Actually Gave Me

In under a minute, the AI delivered:
- A fully operational **headless Puppeteer scraper**
- Backend functions for **bulk extraction**
- Database upload automation
- A dashboard to **trigger new scrapes anytime**
- Even a preview screen to verify it captured all the data requested



It didn't just build a scraper.  
It built a **recon artillery platform** disguised as a business tool.
It built this, not in a cli, not in some random backdoor. 

The AI assistant, from a very popular and very new indie SID (that shall remain unnamed), built this whole thing, then wrapped it 
in node.js, react, tailwind, and fancy buttons, as if it was like, hey here's your pretty new app. I mean
this thing even linked it to a database for querying later. Not to be malicious in any way, shape, or form-- it was just
too good at its job.

Here's a simplified example of what the AI generated (for demonstration purposes only):

```javascript
const puppeteer = require('puppeteer');

async function scrapeListings(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(url);
    
    // Extract all listings from the page
    const listings = await page.evaluate(() => {
      const items = document.querySelectorAll('.listing-item');
      return Array.from(items).map(item => ({
        name: item.querySelector('.company-name').textContent,
        description: item.querySelector('.description').textContent,
        contact: item.querySelector('.contact-info').textContent,
        // ... more fields
      }));
    });

    // Save to database or file
    await saveToDatabase(listings);
    
  } catch (error) {
    console.error('Scraping failed:', error);
  } finally {
    await browser.close();
  }
}

// Function to handle bulk URLs
async function scrapeBulkUrls(urls) {
  for (const url of urls) {
    await scrapeListings(url);
    // Add delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}
```

## 🛠️ The Scraper Dashboard (Example)

Here's a look at the auto-generated scraper dashboard created by the AI:

![Admin Portal Interface](/assets/images/vibe-case-study/scraper-example.png)

---

## 🛠️ The "Review and Publish" Flow

After scraping, it allowed data review and rapid publishing:

![Review Details Interface](/assets/images/vibe-case-study/scraper2.png)

---

## 🧠 The Ethical Gut Check

Looking at what the AI created, I had one overwhelming thought:

> _"Just because you can doesn't mean you should."_

No one — client, freelancer, AI, or platform — had ever stopped to ask:
- Is this ethical?
- Is this legal?
- Could this be seen as theft or copyright issues?
- Just because you can easily see the listings (even without using inspect, like Bob)
    which I mean, why not just open each tab and view the listings, it is 
    a public facing, non-gated, directory. 

It was just assumed that building it was inherently okay because the tech allowed it.

---

## 🚦 What I Did Next

I stopped.  
I deleted the automation.  
I re-scoped the project.

And most importantly:  
I declined to deliver Bob a weapon he might not even understand he was wielding.
In fact, I actually declined to deliver anything outside of the platform build. 
- no data, no database outside of bare bones. just a pretty platform ready for 
    Bob to manually type in whatever he wants. 


---

## 📚 Lessons for Developers

1. **Intent doesn't compile.**  
   AI doesn't ask _why_ you want something. It just delivers.
   Furthermore, AI coding tools are normally pre- injected with prompts on the
   platform side, to make their output a certain way, and to do it in as 
   efficient a way as possible. 

2. **Clients don't always know better.**  
   It's your job to recognize when a request crosses a line.
   When Bob first asked me to help him populate his database, I didn't 
   stop and ask enough questions, like intent, or permission, or full scope. 

    ## Personal note:
    In hindsight, it’s important to recognize that not every client shares 
    your standards. While Bob was enthusiastic, there was a clear gap 
    between their expectations and what responsible development should entail. 

3. **Scraping is not always innocent.**  
   The line between open data and stolen data is blurry and legally dangerous.
   Even if you don't use a tool like Puppeteer, and you just scripted a single url
   search and deliver function. 

   useMutation, or useQueryClient 
   or 

    ```
    Map scraped property types to valid database types
        function mapPropertyType(scrapedType: string): string {
    const normalized = scrapedType.toLowerCase().replace(/ /g, '_');
    
    // Direct matches
    if (VALID_PROPERTY_TYPES.includes(normalized)) {
        return normalized;
    }
    ```

    If it's not yours, or you don't have permission, then why 
    are you touching it. 

4. **You are the last line of defense.**  
   Tools don't have ethics. Developers do.

---

## 🎯 Final Thought

The future will be built by people who can tell the difference between **what's possible** and **what's right**.

Sometimes, doing a good job means saying no — even when the code is perfect, the client is paying, and no one else would ever know.

And if an AI can't be trusted to make that call...  
**then you have to be the human that does.**

---

***Intent Doesn't Compile***

---