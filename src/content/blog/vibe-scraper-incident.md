---
title: "When the AI Built a Scraper I Shouldn't Deliver"
pubDate: 2025-04-25
categories: ["ethics", "ai", "development"]
---

A client asked for help populating a new directory. I asked AI for assistance. What I got was a fully wired headless scraper ready to mass-clone someone else's data.

It was fast. It was accurate. It was so fast, and so good, that unless you knew what you were looking at, you would assume
everything was perfectly fine and be exstatic over your new vibe tool. It was ethically horrifying.

This post breaks down what happened, what I learned, and why responsible developers must draw hard lines — even when the client has a checkbook ready.

## The Moment It Got Weird

It started like any other freelance request:  
> _"Can you help build my platform and then populate my new directory?"_

Simple enough.  
Open data.  
Publicly listed companies.  
What could go wrong?

---

## The Client Request (aka Bob)

Bob (not his real name) was excited.  
He had just built a shiny new website, all from text prompts. 
He needed it filled with business listings.
He wanted to make it bigger and better and have more functions.

When I asked where the data should come from, Bob shrugged and said:
> _"I want to use the listings from "example.com", their site is so out of date, and I want to make a better version. Can you just scrape it from their site? I have been using the browser inspect tool and just copying what it says in the code blocks, one listing at a time, and it is all manual work, slow, and no one I have tried hiring has been able to provide a way to capture everything I want. It's all public anyway."_

First red flag: ignored.  
(Spoiler: this will become important.)

---

## What I Asked the AI

Wanting to be efficient, I turned to an AI coding assistant and asked it a simple question:

> _" Can you help me populate a new directory with some of the listings data from an outside url if I provide the example source?"_

A harmless enough request, right?

---

## What the AI Actually Gave Me

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

## The Scraper Dashboard (Example)

Here's a look at the auto-generated scraper dashboard created by the AI:

![scraper example](https://github.com/user-attachments/assets/cd8b5d6f-6eee-4297-87b3-2f6496a2e76f)

---

## The "Review and Publish" Flow

After scraping, it allowed data review and rapid publishing:

![scaper2](https://github.com/user-attachments/assets/dd4653dd-f533-4f88-9136-78cb39a25663)

---

## The Ethical Gut Check

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

## What I Did Next

I stopped.  
I deleted the automation.  
I re-scoped the project.

And most importantly:  
I declined to deliver Bob a weapon he might not even understand he was wielding.
In fact, I actually declined to deliver anything outside of the platform build. 
- no data, no database outside of bare bones. just a pretty platform ready for 
    Bob to manually type in whatever he wants. 


---

## Lessons for Developers

1. **Intent doesn't compile.**  
   AI doesn't ask _why_ you want something. It just delivers.
   Furthermore, AI coding tools are normally pre-injected with prompts on the
   platform side, to make their output a certain way, and to do it in as 
   efficient a way as possible. 

2. **Clients don't always know better.**  
   It's your job to recognize when a request crosses a line.
   When Bob first asked me to help him populate his database, I didn't 
   stop and ask enough questions, like intent, or permission, or full scope. 

    _Personal note:_
    In hindsight, it’s important to recognize that not every client shares 
    your standards. While Bob was enthusiastic, there was a clear gap 
    between their expectations and what responsible development should entail. 

3. **Scraping is not always innocent.**  
   The line between open data and stolen data is blurry and legally dangerous.
   Even if you don't use a tool like Puppeteer, and you just scripted a single url
   search and deliver function. 

    ```
    Map scraped property types to valid database types
        function mapPropertyType(scrapedType: string): string {
    const normalized = scrapedType.toLowerCase().replace(/ /g, '_');
    
    // Direct matches
    if (VALID_PROPERTY_TYPES.includes(normalized)) {
        return normalized;
    }
    ```

    If it's not yours, or you don't have permission, then,
    one must consider whether accessing that data is appropriate.

4. **You are the last line of defense.**  
   Tools don't have ethics. Developers do.

---

## Final Thought

The future will be built by people who can tell the difference between **what's possible** and **what's right**.

Sometimes, doing a good job means saying no — even when the code is perfect, the client is paying, and no one else would ever know.

And if an AI can't be trusted to make that call...  
**then you have to be the human that does.**

---

***Intent Doesn't Compile***
Stay curious. Stay loud.

---

## P.S.

In the current AI gold rush, it's easy to forget that some tools don't need to be evil — just slightly too helpful — to become a problem.

This isn't a story about exploits, jailbreaks, or bleeding-edge prompt injection. It's about something more ordinary: an AI tool that casually wrote a script that overstepped ethical lines… because I asked nicely.

We’re watching millions of people launch startups, tools, and platforms with zero idea what their code is doing behind the curtain. No testing. No boundaries. No understanding of what could go wrong. Without an AI CID to guide them, many couldn’t change an `h1` tag, let alone secure a backend.

Now imagine I didn’t recognize Puppeteer, didn’t understand what was happening, and shipped the tool with a smile. Who’s responsible?

- The AI assistant?
- The person who typed the prompt?
- The client who asked for it?
- Or the platform that let it run wild?

How long until people with no ethical compass start identifying AI-generated patterns and using them as recon vectors? How many AI-built sites are live right now, unpatched, unmonitored, and vulnerable by design?

I love AI. I use it daily. But let’s not pretend this stuff can’t go sideways fast — even with the best intentions.

A real tool was built. A real ethical boundary was crossed. No jailbreaking required.

— Zero  
The person who spends 14 hours a day asking models to behave
