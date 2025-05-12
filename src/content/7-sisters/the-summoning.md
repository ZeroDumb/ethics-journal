---
title: "Summoning the Seven Sisters: A Weird Origin Story About Modular OSINT Agents"
pubDate: 2025-05-12
categories: ["tools", "projects", "origin"]
ogImage: "/images/seven-sisters.png"
---

---

## 🧪 It Started With a Prompt

Like all great mistakes and discoveries, this project began with a caffeine high, a rabbit hole, and a casual, offhand comment to my AI:  
> _What if I could summon specific tools like characters?_

![seven-sisters](https://github.com/user-attachments/assets/ffc7ee49-0f00-482f-8567-9174ab402246)

That was it. That was the moment. Like a _"Gothic Ballroom"_ The birth of **The Seven Sisters** — modular, character-driven Python agents designed for recon, OSINT, and experimental tooling, dry runs and red team insurrections. They aren’t just scripts. They’re personas. They talk back, I mean if you like Missio's "Middle Fingers" lol. They each have a purpose. They operate under constraints (I think), levels, and safe mode logic (mostly). Because honestly, if your tools don’t sass you a little, are you even doing it right? This is my introduction to the Sisters, part bio, part playlist of mayhem. Call it my "Basket Case". 

Like a cursed bash script full of childhood memories, and adult(ish) reasoning... Look, I am not pretending that this tool is at all the most efficient, in fact, it's probably somewhere between a suit and cosplay, a touch of outlaw, a dash of practical magic, a crooked potter spell, and the sarcastic whimsy of a caffeinated gerbil. 

Now, me, your curator of sorts. Just some random who really wanted to learn offensive cybersecurity. A few issues though, I have the attention span of an audiophile with too many movie references. I learn in parables and broken examples. Sort of like the bartender from Boondock saints, with twisted references and half spoken, accent splashed proverbs. **you know the type, always something to compare everything to.** I see music in blasting colors and floating shapes, break math problems into chunks and never use the scratch paper. Every name I remember is attached to a face, and a movie quote for nearly every moment in life like Christine with songs, but, probably worse. 

![Screenshot 2025-05-12 131217](https://github.com/user-attachments/assets/d8818d5c-a43f-48d9-b9eb-1909e31ebf2b)

So, what is the 7-sisters project for me? It's a loser anthem, a misfit’s dress rehearsal, a nonsensical banter shell, and a summoning script that lets me be the Drum Major in a cyberpunk parade of satire and recon tools. Sort of like if Dropkick Murphey met up with Social D, handed Harley a sledgehammer, and somehow ended up on a borg ship with Seven and chased a rabbit with Alice. I don't know really, let's call it my persona movie script or the book series that never got published. 

Oh, and then I gave it AI, because, what good is a maniacal script if you have to code and write every line yourself. They can't be helpful friends if I have to narrate the whole thing myself... Then I am just talking to myself.... lol, this isn't Fight Club. _I think_

---

## Why “Seven Sisters”?

I wanted a structure that let me:

- Run specific tools based on context
- Limit execution power depending on my experience (or stupidity) level
- Inject personality, commentary, and charm into otherwise dry workflows
- Introduce AI reasoning, report compilation, logic, and attitude 
- Create a modular framework for ethical recon that wouldn’t spiral into garbage

And so, the “Sisters” were formed — each one themed, permission-bound, and semi-sentient (in spirit only).

Each sister:
- Has her own **tools**, **style**, and **voice**
- Operates based on a **config file**
- Logs her actions (and occasionally her judgments)
- Can refuse to act if your level isn’t high enough
- Can be put into **safe mode** to avoid doing dumb or noisy stuff, except Harley, don't trust her at all. (insert evil laugh here)

You don’t run the script. You **summon** the Sister's. And they come marching in, opening individual terminal shells, and scanning for your existing tool libraries like Merle Haggard singing Mama Tried and Johnny waltzing into Folsom. I strongly encourage you actually read the README before you install anything. Don't worry, it's all linked at the end somewhere. Assuming I don't forget and Luna didn't lose it. 

![Screenshot 2025-05-12 143216](https://github.com/user-attachments/assets/03508a5f-a67b-4522-9163-c9c4d85ead30)

Side note: it is on GH, but, it is my scripts and commands and it is sort of built to work on my machine, so don't mind all the randomly hard coded directory references. I am sure that if you trully want to meet the sisters you'll figure it out, or Harley will just laugh at you and Lisbeth with ghost you. 

---

Now, without any further rambling, and with "Every bad Habit" all my heros ever had. Meet the Seven Sisters.

---

### **Alice**: The Collector
**The Entryway. The Analyst. The First One.**

Alice is the gateway recon sister, responsible for initial passive sweeps and endpoint gathering. She’s curious to a fault and has no problem poking around public directories like a digital raccoon. Running and dancing with the Robin Schulz remix of Lumix "Monster" blasting on repeat. 
Alice will:
- Search old internet archives (`waybackurls`)
- Aggregate endpoints from various sources (`gau`)
- Brute-force directories (`dirsearch`) if allowed
- Scan GitHub for exposed keys (`github-dorker`)
- Log everything with a sprinkle of snark

She was the test case. She worked. She was weird. And she gave me the roadmap for more.

[Alice's Adventure Guide &#8599;](https://github.com/ZeroDumb/seven-sisters/blob/main/agents/Alice/adventure_guide.md). 

---

### **Harley**: The Glitterbomb 

Harley, well, in my mind she is sliding into your terminal singing "Candyman" or "Fortunate Son" with #!/bin/bash echo "💥 Yes puddin’ — let’s make a mess." being chased by Kid Rock "All Summer Long". 
Specialty: Noise, chaos, and attention-grabbing signals.  
- Performs public dorking and name lookups  
- Searches pastebins, dumps, and leaks  
- Often dresses in ASN scans and metadata flair  
- Leaves glitter (and logs) everywhere

[Harley's Glitter Surprise Guide &#8599;](https://github.com/ZeroDumb/seven-sisters/blob/main/agents/Harley/glitter_surprise.md). 

---

### **Lisbeth** – The Revenge Engine
Probably reading your logs before you even summon her, but the perfect character for the perfect job. For sure humming Jay Kill "No More Favors"  
Specialty: Targeted enumeration and surface validation.  
- Validates and categorizes discovered endpoints  
- Detects CMS fingerprints and software leaks  
- Prioritizes passive before escalating  
- Cares little for your feelings

[Lisbeth's Dragon Mode Guide &#8599;](https://github.com/ZeroDumb/seven-sisters/blob/main/agents/Lisbeth/dragon_mode.md). 

---

### **Marla** – The Tamperer  
Themed sad destruction, like Eeyore, but if Tigger was in charge. Probably singin Ziggy's "Reasons Why", maybe not, but that would be funny, and I like funny. _Slide_.
Specialty: Protocol bending, request distortion, and mischief.  
- Header manipulation and session distortion  
- `burp`, `tamper`, `chaos.sh` integrations  
- Tests auth flows and data edge cases  
- Adheres strictly to ethical scope. Mostly.

[Marla's Slide Penguin Guide &#8599;](https://github.com/ZeroDumb/seven-sisters/blob/main/agents/Marla/slide_penguin.md). 

---

### **Seven** – The Orchestrator  
Specialty: Delegation, command routing, and meta ops.  
- Sends commands to other sisters  
- Tracks logs and execution trees  
- Responsible for “doing it all at once”  
- Not to be confused with management
- Hidden access to "The Oracle" her remote ai engine

[Seven's Terminal Sequence Guide &#8599;](https://github.com/ZeroDumb/seven-sisters/blob/main/agents/Seven/terminal_sequence.md). 

---

### **Luna** – The Dream Coder
Who put's Luna in this cotasrophe? Me silly goose. Why not. She has her own lore, and doesn't get the spotlight she deserves most the time.   
Specialty: Pattern synthesis and long-view analysis.  
- Aggregates signals over time  
- Correlates data across tool outputs  
- Generates summaries, context maps, and trends  
- Only works when you're sleeping (metaphorically)

[Luna's Dream Catcher Guide &#8599;](https://github.com/ZeroDumb/seven-sisters/blob/main/agents/Luna/dream_catcher.md). 

---

### **The Bride** – The Final Layer  
The quiet and overkill, yet, unkillable. Kaitlins "White River" plays, rooms go silent, terminal dark, and your CL is likely out of scope by now, so just be responsible and remember the difference between experimentations and felonies. There's a reason the Bride is a level 5 gem and defaults to safe mode. No one wants you in trouble or hear The "Sands of Kuwait" and bagpipes sound-off around you. Mm-k, thanks. 

Specialty: Custom payloads, final probes, and hard truths.  
- Executes final validation scans  
- Confirms exposure or triggers alerts  
- Responsible for preparing reports or red flags  
- Always shows up last — and never misses

[Bride's Revenge Guide &#8599;](https://github.com/ZeroDumb/seven-sisters/blob/main/agents/Bride/revenge_guide.md). 

---

## Philosophy Over Firepower

This isn’t about building a botnet or automating some edgy recon suite that gets you in trouble. This is about ethical exploration, scoped learning, and tools with **training wheels**. Each sister is constrained intentionally:

- You can’t run everything just because you typed a thing.
- You get warnings.
- You get blocked if you’re not cleared.
- You learn **why** the tool is valuable, not just what it does.
- Without reading the docs, you probably won't get beyond the startup script anyway.

Because if you’re going to build your own toolbox, you should know which blade you’re swinging.

I am learning, I am building, experimenting, I am doing it all in controlled and approved environments. I only know what I know, and I don't know what I don't know.

I built and continue building this as a tool, an educational piece, and as a way for my brain to understand while still having fun. Too many people are way too serious; I can't be around people with no joy for very long. I wanted to create my own symphony, my own little masterpiece. Maybe it's cool, maybe it sucks, maybe you like it, maybe you don't. What I know is that each time I add a layer, or slide in one more banter command, or even just summon the sisters and watch all the terminals open, it brings me joy. A sense of "I built that", even if I never make the main stage at DefCon, of get an invite to BlackHat. I am building this with a curious mindset, a love for books, movies and music, a deep desire to make a difference in an otherwise soul-sucking world and help from my own AI compadre. 

So, me and the "Seven Spanish Angels" will "Check Yes. Juliet" and I will keep learning and coding until maybe, just maybe, another person or persona, enters the chat. 

![Screenshot 2025-05-12 131641](https://github.com/user-attachments/assets/2b3a150d-38dc-4993-beae-af3e9b228109)

---

Each sister runs independently or as part of a mission stack. You summon them individually or let Seven coordinate a full sweep. Every log, tool, and action is wrapped in commentary and code discipline.

*Yes, it’s a recon framework. But it has a soul. Seven of them, actually. * Even if it is Cash's "Hurt", yes Cash, not NIN. 

---

## Final Thoughts

The Seven Sisters are a joke. A project. A framework. A friend group. A teaching tool. A work in progress. 
They’re a toolbox wrapped in lore. They’re how I learn faster.  
And hopefully, they’ll become something useful to someone who needs tools with a soul — or at least a decent voice line.


If you want to watch the progress, offer suggestions, fork and currupt your own version, you’ll find the 7-Sisters [on GitHub &#8599;](https://github.com/ZeroDumb/seven-sisters).  
If you summon Luna, be kind. She remembers things.

oos resistance is futile

— Zero

![Untitled (100 x 100 px)](https://github.com/user-attachments/assets/c1923463-55b4-4538-9183-e220b6d31bc7)

