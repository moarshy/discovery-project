# 📝 Notes

Mar 5, 2026

## Storyboard Review

Invited [Thomas Goubin](mailto:thomas@naptha.ai) [Mohamed Arshath](mailto:arshy@naptha.ai) [Richard Blythman](mailto:richard@naptha.ai)

Attachments [Storyboard Review](https://www.google.com/calendar/event?eid=NGdkcmRrdmszOWc5aWJyb2xjNGx2ZDZyZm0gcmljaGFyZEBuYXB0aGEuYWk) 

Meeting records [Transcript](?tab=t.y9r9a5nd5dbt) 

### Summary

Richard Blythman, Thomas Goubin, and Mohamed Arshath discussed synthesizing user needs, confirming that synthesis is the core user problem, and examining limitations in existing tools like Notebook LM and Claude Co-work. They proposed adding a scheduling feature for recurrent synthesis, and Thomas Goubin shared that OpenCloud autonomously generated an HTML prototype for an "ambient idea." The team focused on refining the demo prototype for Bellina, customizing it for a rebranding decision by incorporating source weighting (requested by Fion), defining "skills" as customizable outputs, and planning the integration of skills management and a "share to Slack" button, with Richard Blythman and Thomas Goubin anticipating strategic and technical questions from Bellina's engineering lead.

### Details

* **Review of Previous Work and Process Benefits**: Richard Blythman and Thomas Goubin discussed the late hours spent working and agreed that the artificial deadlines encourage them to push harder and maintain quality standards, particularly with weekly sprints. Richard Blythman mentioned sending Mohamed Arshath a Loom video to catch them up on the sketches, anticipating that Mohamed Arshath would quickly produce a high-quality demo ([00:00:00](#00:00:00)).

* **Autonomous Prototyping by OpenCloud**: Thomas Goubin shared that their OpenCloud cron job, which runs at 2:00 a.m., autonomously created an HTML prototype for the "ambient idea" without an explicit request ([00:00:48](#00:00:48)). The system used context extracted from daily work, important transcripts from the week, and fresh input from Thomas Goubin's Twitter bookmarks to decide on the prototype ([00:01:40](#00:01:40)). The resulting HTML file was a basic but functional prototype showing an ambient window with a small animation and an idle panel view for an inbox and Slack ([00:02:46](#00:02:46)).

* **Proposal for Scheduling Feature**: Richard Blythman suggested adding a scheduling feature to the demo app, noting that meeting preparation often requires recurrent synthesis rather than a one-off job ([00:03:45](#00:03:45)). Thomas Goubin agreed, proposing that scheduling could be tied to the calendar, proactively providing a brief or updates 15 minutes before an upcoming meeting with external stakeholders or new interview candidates. They viewed this as a feature that would create a "haha moment" ([00:04:31](#00:04:31)).

* **Integration with Google Calendar CLI**: Mohamed Arshath joined the meeting, and Thomas Goubin and they confirmed that they had installed the new Google Calendar command-line interface (CLI) on OpenCloud for managing calendar functions ([00:04:31](#00:04:31)). Thomas Goubin noted that the Google CLI required full authentication, even for a fresh Gmail account, but they kept permissions restricted, except for basic capabilities like sending emails for handling newsletters ([00:05:29](#00:05:29)).

* **Synthesis as the Core User Problem**: Richard Blythman summarized their updated understanding of user needs, stating that the main conclusion from customer interviews is that the primary problem is synthesis. They found that existing product tools, such as Product Board, often require manual tagging, and horizontal tools like Glean and Dust are more search-based rather than synthesis-focused ([00:07:24](#00:07:24)). They determined that the ongoing discovery sprint itself is fundamentally a synthesis sprint, consolidating various data sources into a solution or prototype ([00:08:28](#00:08:28)).

* **Analysis of Notebook LM and Synthesis Tools**: Richard Blythman examined Notebook LM as a potential solution, noting it addresses the synthesis problem identified in user interviews ([00:08:28](#00:08:28)). However, they identified limitations, including generic data sources that must be manually copied in (lacking easy connection to Confluence or support tickets) and the inability to add custom output types like a Product Requirements Document (PRD) ([00:10:22](#00:10:22)). They also critiqued the UI of Claude Co-work and Chorus for synthesis work, noting that adding data sources is manual, and there is no clear way to view what sources were passed into a synthesis run or to rerun a synthesis with new data ([00:11:21](#00:11:21)).

* **Rethinking the Sprint Map and User Problems**: Richard Blythman revised the initial sprint map, focusing on the stakeholder (a product leader) and the desired outcome (figuring out the right solution). Based on conversations and synthesis work, they extracted several "how might we" user problems, focusing on connecting to live enterprise data, avoiding manual tagging, finding contradictions, and reducing "archaeology work" across different channels ([00:13:29](#00:13:29)). They suggested they might not need to conduct "ask the experts" interviews next week due to the wealth of user problems already extracted ([00:15:30](#00:15:30)).

* **Prototype Review and Architectural Considerations**: Richard Blythman reported that their latest sketches resemble Notebook LM but differentiate by having specific input data types on the left and custom output templates (e.g., PRD, business cases) on the right ([00:15:30](#00:15:30)). The core area moved away from a chat window to a data processing flow: raw data is extracted into a context graph and then turned into output formats. They acknowledged that while a local Electron app is viable (as Mohamed Arshath prototyped), multi-tenancy and scheduling requirements would necessitate a hosted solution ([00:16:56](#00:16:56)).

* **Scheduling and Monitoring Features**: Richard Blythman proposed adding a monitoring or analytics section, similar to Chorus, to view previous synthesis runs and potentially a scheduling feature to run synthesis projects regularly, such as every Monday for meeting prep ([00:18:57](#00:18:57)). They acknowledged that if scheduling is desired, a hosted component would be required, though some local scheduling could be done ([00:18:04](#00:18:04)).

* **Demo Preparation for Bellina**: The team began planning the specific demos for the upcoming meetings ([00:20:15](#00:20:15)). For Bellina, Thomas Goubin suggested tailoring the skill to their needs, specifically focusing on their current need for a rebranding decision. The demo should use sources like interviews, tickets, and internal Slack discussions, highlighting the output of a final report, specifically a vocabulary map, to demonstrate relevance to their business case ([00:21:16](#00:21:16)).

* **Discussion on Synthesis Workflow Types**: Richard Blythman introduced the concept of different synthesis types, distinguishing between the current design that processes all documents once and a potential "batch workflow" ([00:23:36](#00:23:36)). A batch workflow would be necessary for processing numerous items, like 100 interviews, by running them individually to generate 100 separate outputs without having to create a project for each one ([00:24:38](#00:24:38)).

* **Customization and Source Weighting in the UI**: Richard Blythman and Thomas Goubin agreed that the vocabulary map is an intermediate view of the context graph and should reside in the middle of the UI. They discussed integrating a source weighting feature using a slider, as requested by Fion, to prioritize inputs like product strategy (to avoid being fired) or input from high-value customers ([00:25:43](#00:25:43)). Mohamed Arshath later suggested that this weighting could be implemented as a simple prompt adjustment instructing the system to focus more on certain sources ([00:43:02](#00:43:02)).

* **Defining Skills and Agents for the Demo**: Richard Blythman and Thomas Goubin considered the definition of "skills," suggesting that skills are essentially the different outputs created, such as a "Generate PRD" skill or a "VOC report" skill ([00:28:38](#00:28:38)). Thomas Goubin proposed a taxonomy where the overall solution is a "Voice of Customer Agent" that is hosted, and its different outputs are "skills" based on business needs, such as answering the question of whether to proceed with a rebranding ([00:30:04](#00:30:04)). Mohamed Arshath suggested a three-stage model for skills: connecting data sources, extracting the context graph, and synthesizing the final output ([00:33:25](#00:33:25)).

* **Prototype Refinements for Bellina Demo**: Thomas Goubin shared a prototype that was customized for Bellina's rebranding needs, which included configuring sources, adjusting weights, and showing various outputs like "tensions between sources" (e.g., vision versus customer reality) ([00:37:20](#00:37:20)). Richard Blythman particularly liked the "tensions" feature, which was deemed a part of the synthesis report and an output ([00:38:52](#00:38:52)). The team agreed that a "share to Slack" button is a necessary addition to the demo ([00:39:42](#00:39:42)).

* **Actionable Items for Bellina Demo**: For the Bellina demo, the team decided to incorporate skills management, including the ability to add new skills via GitHub and associate specific extraction skills (like vocabulary map) with input data sources (like transcripts). They would use this to emphasize that the solution is a partnership and will be customized during the initial weeks of collaboration. Richard Blythman also noted the need for a "share to Slack" button ([00:40:34](#00:40:34)).

* **Addressing Technical and Strategic Questions**: Richard Blythman and Thomas Goubin anticipated that Bellina's engineering product leader might ask technical questions about the architecture, hosting, and evaluation methods (evals) ([00:41:42](#00:41:42)). They decided to be transparent, stating that the current presentation is a prototype built on top of Claude code, and that the product helps users make decisions, but does not provide an agent to say what is "best" ([00:43:02](#00:43:02)). They also discussed anticipating the "buy versus build" question, positioning the solution as a partnership that helps implement complex Co-work agents more easily ([00:43:50](#00:43:50)).

* **Demo Plans for Autodesk and SoSafe**: Richard Blythman outlined plans for two other demos: Autodesk, focusing on the customer success team, would feature projects for VOC reports and OKR reports using sources like Confluence, Airtable, and Intercom tickets ([00:45:53](#00:45:53)). SoSafe's demo would target an analytics use case, creating reports based on Mixpanel data and support tickets to analyze issues like activation decline ([00:48:16](#00:48:16)).

* **Internal Debate on Chat Functionality**: The team discussed whether to include a chat window in the Electron app, concluding that the current focus is on synthesis, and they would wait to see if users request it ([00:48:16](#00:48:16)). Thomas Goubin suggested that integrating interactivity directly into Slack would demonstrate greater maturity than embedding a separate chat in the app ([00:49:26](#00:49:26)).

* **Final Review of Upcoming Demos**: Richard Blythman confirmed they have four demos scheduled: Bellina, Autodesk, SoSafe, and Fion ([00:53:52](#00:53:52)). Thomas Goubin noted they might also show something to a user of Claude code ([00:52:46](#00:52:46)).

* **Assignment of Tasks and Final Meeting Scheduling**: Richard Blythman took the task of mapping out the specific data sources and creating a specification for each demo project. Mohamed Arshath was assigned to work on the UI changes, including the sliders for weighting, adding skills from GitHub, and associating extraction skills with input sources ([00:54:44](#00:54:44)). Richard Blythman requested a light mode for the app and scheduled a final run-through meeting for 12:48 ([00:56:05](#00:56:05)).

### Suggested next steps

- [ ] Mohamed Arshath will work on changes for the demos, including adding sliders, associating extraction skills with specific input data sources, and enabling the addition of new output formats via skills from GitHub.  
- [ ] The group will meet at 12:30 or 12:48 for a half-hour final run-through of the demo preparation.

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*Please provide feedback about using Gemini to take notes in a [short survey.](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=n4jIf-OHADv2E2mDDddHDxIYOAIIigIgABgDCA&detailid=standard)*

# 📖 Transcript

Mar 5, 2026

## Storyboard Review \- Transcript

### 00:00:00 {#00:00:00}

   
**Richard Blythman:** Good Morning.  
**Thomas Goubin:** Hello, Richard.  
**Richard Blythman:** How'd you sleep?  
**Thomas Goubin:** Better, better. I I went to bed quite late, but uh it was it was okay. I didn't wake up thinking about wireframing this time.  
**Richard Blythman:** That's good.  
**Thomas Goubin:** And you when when did you go to  
**Richard Blythman:** Yeah, it was quite late as well.  
**Thomas Goubin:** sleep?  
**Richard Blythman:** It was um well, I was working till uh after midnight, I think,  
**Thomas Goubin:** Okay.  
**Richard Blythman:** just trying to get um I sent RC a loom video catching him up on what we were working on and  
**Thomas Goubin:** Okay,  
**Richard Blythman:** I on the sketches and stuff. But uh yeah,  
**Thomas Goubin:** cool.  
**Richard Blythman:** not too bad. I got my eight hours.  
**Thomas Goubin:** Cool.  
**Richard Blythman:** So that's the that's the important Yeah,  
**Thomas Goubin:** Yeah, I saw in this morning the room from Archie. That's uh that's cool.  
**Richard Blythman:** it's good.  
**Thomas Goubin:** That's  
**Richard Blythman:** Like I know um like I know these deadlines are artificial kind of but uh it always  
**Thomas Goubin:** cool.  
   
 

### 00:00:48 {#00:00:48}

   
**Richard Blythman:** does encourage you to like go back and do that extra hour of work that you wouldn't have done before which um I kind of like having these like  
**Thomas Goubin:** Yeah. Yeah.  
**Richard Blythman:** weekly sprints for for that reason. You're just like pushing yourself a bit harder.  
**Thomas Goubin:** Mhm. That's cool. And because we have also external deadlines and we have things to show externally, it pushes us to to have a level of quality also.  
**Richard Blythman:** Yeah,  
**Thomas Goubin:** So that's cool.  
**Richard Blythman:** exactly. Um, yeah, I'm looking forward to talking about the storyboards. Arley, um, the reason I wanted to send him the, uh, the Loom videos because I knew he'd have something really nice like done very quickly for us this morning.  
**Thomas Goubin:** Yeah, that's awesome.  
**Richard Blythman:** See, it seemed like it would have been a waste otherwise.  
**Thomas Goubin:** That's really cool. I um during the night, you know, I have um a crown job running at 2 a.m. for me to when I wake up to have something uh done by OpenCloud and this night you decided to create a prototype for your ambient idea.  
   
 

### 00:01:40 {#00:01:40}

   
**Thomas Goubin:** So, I will show it to you. It's an HTML file. Pretty basic, but it's really funny that it has decided to do that without me asking it to do  
**Richard Blythman:** How does it work?  
**Thomas Goubin:** it.  
**Richard Blythman:** Like what's the prompt?  
**Thomas Goubin:** The context because I don't give him yet uh automatic access to all NAFTA uh data. I don't want to be honest. I I will not do it. But I do some kind of context extract uh from what we did during the day. uh and sometimes the transcripts that are important such as the one we had this week I give it like in raw data. Uh plus all the work that I did I did it with cloud code and with open flow in parallel during all the week. Uh so it decided based on the daily note it took to go after this idea and to prototype that because he thought it would be useful. And the prompt is basically a yellow prompt saying look at all the data plus all my bookmark because I I do a lot of bookmark during my daily walk into Twitter.  
   
 

### 00:02:46 {#00:02:46}

   
**Thomas Goubin:** So it gives him fresh inputs and so I try to find a a combination between what we do novelty based on all the tweet and the hype and the FOMO that is going on on Twitter and to come up with something that I would need or never think about.  
**Richard Blythman:** Very cool. That's awesome.  
**Thomas Goubin:** Yeah, that's that's really nice.  
**Richard Blythman:** I really like  
**Thomas Goubin:** That is really nice. Look at the HTML. It's quite fun.  
**Richard Blythman:** um Yeah.  
**Thomas Goubin:** I send it.  
**Richard Blythman:** Oh, you sent  
**Thomas Goubin:** Yeah, I sent it to you on NDM on U.  
**Richard Blythman:** us.  
**Thomas Goubin:** Oh, I could have shared my screen as well.  
**Richard Blythman:** That's okay.  
**Thomas Goubin:** So,  
**Richard Blythman:** Cool.  
**Thomas Goubin:** it's quite funny. So, there there is like this ambient window with even the small animation, you know, uh uh to to show that it's live basically. Uh, and it gave also like a panel when it's idle, what it would look like in an inbox view because we talked about inbox view.  
   
 

### 00:03:45 {#00:03:45}

   
**Thomas Goubin:** Uh, and what it would look like in Slack and what would be a pilot for Balina with that ID. So, yeah, it's like I don't know. I don't exactly remember the prompt I gave, but it's working pretty well.  
**Richard Blythman:** Cool. This is synthesis work as well. That's the that's the nice thing.  
**Thomas Goubin:** Mhm. Yeah. True. True. True.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** True.  
**Richard Blythman:** I was thinking um we could add scheduling to the app the demo that we're going to be doing.  
**Thomas Goubin:** Yeah. Yeah, we  
**Richard Blythman:** It would be you could like because you know if you're if we're talking about meeting prep, you don't just want to do a synthesis one off.  
**Thomas Goubin:** should.  
**Richard Blythman:** Like maybe maybe every week you do want to at the start of the week uh schedule a job to take all of the transcripts from the last week and create a you know the best feature PRD that you can build or something like that would be a really cool  
   
 

### 00:04:31 {#00:04:31}

   
**Thomas Goubin:** Yeah, that would be awesome. This is kind of the thing that makes a haha moment. And even going forward, imagine you have um I don't know, it looks at your calendar and it knows that you have a meeting alignment with uh some shareholders or even a new interview and it could proactively give you 15 minutes before the call some kind of a brief or good practices or updates regarding the meeting you're going to have.  
**Richard Blythman:** Very  
**Thomas Goubin:** It's stupid to do because it's hardcoded but with scrum but it could do the trick.  
**Richard Blythman:** cool. Yeah. Yeah.  
**Thomas Goubin:** I  
**Richard Blythman:** I really like us. Hey,  
**Thomas Goubin:** got  
**Richard Blythman:** Arshie.  
**Mohamed Arshath:** Hello.  
**Richard Blythman:** Uh,  
**Mohamed Arshath:** Hi.  
**Richard Blythman:** we're just saying that the demo is really cool. I really like it.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** Um,  
**Mohamed Arshath:** Yeah.  
**Richard Blythman:** it looks great.  
**Mohamed Arshath:** Yeah. No,  
**Richard Blythman:** Go ahead.  
**Mohamed Arshath:** I mean uh the calendar like if I don't know if you saw like uh working with Google stuff is like usually very difficult but they just released a uh CLI uh for everything.  
   
 

### 00:05:29 {#00:05:29}

   
**Mohamed Arshath:** So yeah.  
**Thomas Goubin:** I I installed it this morning on open cloud.  
**Mohamed Arshath:** Oh,  
**Thomas Goubin:** Uh I previously had the Python script to manage this and uh but it was like  
**Mohamed Arshath:** nice.  
**Thomas Goubin:** homemade and now it's working with the CLI to O is pretty smooth.  
**Mohamed Arshath:** All right, that's  
**Thomas Goubin:** Um and uh I just had to keep restrain him a bit because he made me  
**Mohamed Arshath:** nice.  
**Thomas Goubin:** install uh the full access and the full access is also Google Cloud Platform. Well,  
**Mohamed Arshath:** Yes.  
**Thomas Goubin:** it's on a dedicated account on a Gmail that has no credit card. It's that I created fresh but still like it made me authenticate for everything. I say, "Oh my man, come on.  
**Mohamed Arshath:** Yeah, just have to be like I think you just need to figure out the correct permission level. But uh yeah, like for example,  
**Thomas Goubin:** Yeah,  
**Mohamed Arshath:** it's connected to calendar drive uh uh yeah like slides.  
**Thomas Goubin:** even slide.  
**Mohamed Arshath:** Yes.  
**Thomas Goubin:** Yeah, it's it's cool for me.  
   
 

### 00:06:26

   
**Thomas Goubin:** I just kept everything except like admin permissions and um I was wondering if I should but but it's a fresh account. So if it were on my own account, I first I wouldn't do it yet because but on a fresh account, I gave him the permission even to write an email because at some point I might use uh it to I don't know send me some stuff. Right now he handles all my newsletter. So I forward every newsletter about AI that I receive which is like 10 a day that I cannot keep up. I do an automatic forward to this fresh email inbox and so it analyzes everything and give me some kind of feedback about  
**Mohamed Arshath:** Oh, nice.  
**Richard Blythman:** Super cool.  
**Thomas Goubin:** it.  
**Richard Blythman:** Um, yeah, maybe we just go through I don't know where where do people want to start with the I don't know. Do we need to go through the storyboard? I guess maybe let me just catch you up with where um what we all chatted about uh individually yesterday.  
   
 

### 00:07:24 {#00:07:24}

   
**Richard Blythman:** So, um, just to summarize, um, we kind of, uh, like I went down a rabbit hole with the, uh, with the ambient stuff in Wednesday morning's meeting when we were trying to create the storyboard and, uh, both of you correctly kind of said like, you know, we're getting away from the the problem here. Um, and yeah, that was a great uh, that was a great push back. And then what I did was I went back to the user interviews with the customers that we're talking to on Friday and the main problem they have is synthesis. That was kind of my main conclusion. And I then I went back to you know our like lightning demos. We were looking up solutions to how people solve synthesis. So I was like doing that with claude code and things like uh things like product board came up like some of those old product tools are supposed to do synthesis but a lot of it is quite manual. You have to tag a lot of stuff that comes up often in the interviews as well.  
   
 

### 00:08:28 {#00:08:28}

   
**Richard Blythman:** So the existing product solutions don't really work that well. Um and then some of the other ones were like glean and dust and super.work but they're more like horizontal I guess and they're more searchbased rather than synthesis I would say. Um, the one that was closest was notebook LM and that's actually something we h we didn't look at in our lightning demos and I think it's a it was a really interesting example and I was thinking like notebook LM kind of solves what a lot of the people in our interviews are saying is a problem which is synthesis work. So I was like wouldn't it be interesting if um like I wanted to try out to see if notebook worked for the synthesis problem. So in our case, we're actually trying to do synthesis as well. And in fact, the whole mirror board is basically just synthesis, right? Like we're just taking a lot of different data sources. We're taking our kind of like vision as a company. We're taking the risks, these kind of like open questions that we need to like figure out answers to.  
   
 

### 00:09:28

   
**Richard Blythman:** We're taking like the user kind of map. We're taking these how might we notes which are basically just user problems and we're taking all of these as input and even like when we were drawing the sketches it said like re reread all of the inputs just to like fill your own context window in your in your head right and then start coming up with solutions. So that's like this is a syn a synthesis problem and in fact like the whole discovery sprint is basically just like it's a synthesis sprint essentially like let's map out all of the data keep multiple things in mind at once keep the user in mind keep the strategy in mind and then we're going to synthesize that into some sort of solution or like a PRD kind of right or a prototype if you could it's more of a prototype so um the problem that we're doing at the moment is a synthesis problem so I tried to like do that with notebook LM so I gave like a few of the different interviews that we have on Friday.  
   
 

### 00:10:22 {#00:10:22}

   
**Richard Blythman:** I gave it our product strategy from Confluence, our vision from Confluence. I gave it a sales email that I sent just to like kind of simulate the sales team and then I started asking it um like basically what should I build in the chat window and didn't do a bad job. I think like we can do better with uh with prompts. Um and then you can also like you also have the uh like it creates a graph a context graph basically which it automatically creates itself um which is cool. So I was thinking like notebook is actually quite similar to what we want from uh what the users want. I don't know if they've tried it but um but there's also a few things that are a little bit annoying like um all of the data is generic. You can't add like there's no types of data. You can't add from support tickets or like confluence easy. You have to like copy and paste it in. So like the the way that input data sources are done could be like much better in in our prototype.  
   
 

### 00:11:21 {#00:11:21}

   
**Richard Blythman:** That was like one of the things I was thinking. Uh and you can't add like custom output types either, right? Like what if we want a PRD here? There's no way to there's no way to add that. So, um, yeah, it's like basically just the inputs and outputs that could be nicer on notebook LM and like dedicated for product and allow more kind of customization and that sort of thing. Um, what else? Me and Thomas were also chatting about like could you use Claude's coowork for this and of course the answer is yes but um the way you add data sources in claude coowwork is kind of annoying as well. So um or even in chorus right like let's say here this is where I'm doing synthesis work I basically usually what I ask it is like use your Google docs read skill to read the transcript and then also read this transcript uh and then like maybe I'll use some other skills or maybe I'll copy and paste some stuff into a chat window that's how I add all of the data sources in chorus and then I start doing synthesis in this conversation threads Right.  
   
 

### 00:12:35

   
**Richard Blythman:** Uh, and it's kind of the same in co-work as well, which is like if I want to do synthesis, I need to start a new chat window, then I need to like add all of the files and connectors manually. And then once I when I need to go back to look at the synthesis work that I did, let's say I go to this one, I need to like read through the thread to see like what sort of context I added in. I guess maybe you have like a context window here, but it's not really clear when I do synthesis work what data sources were passed in during the thread. And also there's no way to like rerun that synthesis like what if I want to rerun this synthesis, the synthesis that I did in this chat. What if I want to rerun that with new data sources? There's no way to do that. I have to start a new thread. And so you can do synthesis in clouds. That's probably one of the things that I do most, but like the UI isn't really set up for the synthesis work, I guess.  
   
 

### 00:13:29 {#00:13:29}

   
**Richard Blythman:** Um, so that was like another uh another thing I was thinking. Um, so uh what I did then was I think we got the sprint map wrong, by the way. Like we just focused on jobs to be done. um more so than like what they say in the book is you're supposed to start off with a a stakeholder like a product leader and then on the right you say like the outcome that they're trying to achieve. So like figures out what to build figures out the right solution to build that's like an outcome that they want to achieve and then you fill out everything in the middle. So I think we got this kind of wrong. So I went back and um iterated on that a bit and then from my conversations with Claude Co-work I started to extract how might we stickers. So um like with the conversation with Fion for example I was like how might we help a product leader see the full picture without manually hunting across channels. This is like um you know that this is what he was saying.  
   
 

### 00:14:28

   
**Richard Blythman:** He was like he's saying he gets a lot of different inputs from the sales team, from the customer success team, from the founders and he has to like synthesize this. He has to first bring it into he has to create a picture for himself and then he has to like based on that full picture he has to figure out what to build. That's a synthesis problem. Um how might we avoid requiring manual tagging or maintenance like product board? That was something that came up in the conversation. How might we connect to live enterprise data and synthesize on demand? How might we find contradictions between what different sources are saying? How might we surface relevant signals automatically? How might we reduce the archaeology work of digging through Slack history, gong recordings, and tickets? How might we help PMs recognize when different people are describing the same underlying problem? This kind of like a dduplication problem. Um, how might we automatically weight feedback by customer value tier? So, this came up in um the interview with Fion as well.  
   
 

### 00:15:30 {#00:15:30}

   
**Richard Blythman:** Basically, I just tried to extract a few more how might we because I think um because the user map was wrong, then our ask the expert interviews were kind of um not focused on the right thing, I guess. And so, I wanted to extract more like user problems. And I guess that's like one takeaway. Maybe we don't need to do ask the experts next week because we have so many user interviews. Like we've already asked the experts a bunch of stuff and um we've extracted a lot of user problems. And I think basically this whole board is basically just you get user problems from users, talk to users and find out what their problems are. And like if we've already done that with some we could we don't necessarily need to do um do that again, I guess. Um, so anyway, I I redid the user map a little bit and like extracted some user problems based on that updated user map. And then as I mentioned I did the kind of lightning demos myself again to figure out like how do people solve how people solve the synthesis problem previously and then I started sketching um basically something that looks very similar to notebook LM like this is the first project screen and then there's a way to like add data sources with a popup just like notebook LM um and then the main difference is that you have different types of input data on the left  
   
 

### 00:16:56 {#00:16:56}

   
**Richard Blythman:** and you have you can add like custom output templates on the right for things like PRDS and business cases and and that sort of thing. And then in the middle we've got rid of the chat window and it's more about like looking at what is extracted from the input. So as we read from left to right we have raw data we extract that into a context graph and then we turn that context graph into like output formats. So it's kind of um data processing from left to right. Um, and then there's a way to like view the different reports and that sort of thing. And then yeah, Archie put together a really nice prototype. Um, I really like the way it looks. Um, I guess like one thing we had been thinking originally that I didn't uh specify was we were thinking of a SAS app partially, but um, I think I I actually don't know what we want. So, I think it's fine to have the Electron app. Um, especially since we're showing like individuals that they're probably all using Cloud Code locally and so they may want an Electron app to do the synthesis rather than something like hosted.  
   
 

### 00:18:04 {#00:18:04}

   
**Richard Blythman:** Me and Thomas were saying like the multi-tenant side of things is uh might be useful like being able to collaborate on data sources and that sort of thing. Um but again maybe maybe like maybe we have a local app which is this one that you've shown as well as some sort of like SAS multi-tenant for like uploading the  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** context graph or If we on scheduling,  
**Thomas Goubin:** And if you want scheduling, we will need it as well.  
**Richard Blythman:** yes, we'll need the hosted. That's a good point. Yeah. Um I guess we could do scheduling some scheduling locally like Claude Co, but um yeah, you're right.  
**Thomas Goubin:** Yeah, but your laptop needs to be they work all of them work on laptop. So sometime it's closed and so I I think it the right chart would be like host solution plus post in Slack or notification in our electron app or both. Good  
**Richard Blythman:** Yeah. Yeah. Let's talk more about this. Um, this is one thing we should talk more about.  
   
 

### 00:18:57 {#00:18:57}

   
**Richard Blythman:** Um, so, uh, yeah, there's the screen where you add and then here it is with all of the different data sources and the graph and the table and the outputs. There's not a lot I would change here honestly. like um I have like a few small comments about things to change, but uh like overall like I'd be happy to like demo this app to someone like maybe one thing we can add is uh like a monitoring or like analytics part where like just like in chorus you can see all of the previous like synthesis runs and that sort of thing and like maybe we could that scheduling as well because me and Thomas were saying just as you were coming on the call arch that uh wouldn't it be cool if you could um wouldn't it be cool like let's say for meeting prep for example like that's a synthesis problem that we do we were doing before our delivery and discovery uh sprint meetings before it would be cool if you could like schedule one of these synthesis projects to run like every Monday at a certain time and And I don't know, maybe you'd have some sort of like PR inbox or something.  
   
 

### 00:20:15 {#00:20:15}

   
**Richard Blythman:** I don't know. There's there's a lot of ways this this could go basically. But um yeah, I guess the main thing I want to talk about now is like for the demos tomorrow, like with Bellina for example, um I want to think through exactly what we would show them and maybe we can have some like custom data for each of them. um basically just create like different a few different projects like one for each of the demos and most of them are like user research type projects I think except the the one with so safe is going to be more like analytics based so in that case we're we're going to want to pass in like mix panel data maybe some other stuff as well um yeah basically just come up with the exact demo that we're going to do for the various meetings that we have tomorrow that's something I'd love to chat through So maybe um maybe we can start with and and also then maybe the like multi-tenant stuff will come up in in that context I guess.  
   
 

### 00:21:16 {#00:21:16}

   
**Richard Blythman:** Um so Thomas, what do you think um about Bolina? What exact do we want to show  
**Thomas Goubin:** Um yeah uh from Balina I think it might be  
**Richard Blythman:** them?  
**Thomas Goubin:** worth to show them that we will tailor the skill to their need. And because we know that the first need they have is about this  
**Richard Blythman:** Okay.  
**Thomas Goubin:** rebranding thing, we could have in the thing we show some stuff about rebranding and helping them again. I think by the end of the meeting if they understand that that will solve their business need which is the decision making of should we do a rebranding or not. If we can highlight this use case in our demo that would be awesome. And what does it mean specifically? I think it means in the sources we might need to show interviews,  
**Richard Blythman:** Mhm.  
**Thomas Goubin:** tickets, uh, discussion,  
**Richard Blythman:** Mhm.  
**Thomas Goubin:** internal discussions from I I don't remember if they use Discord or Slack, but I think it's Discord in their I I'm not sure. I s\*\*\*.  
   
 

### 00:22:26

   
**Richard Blythman:** Okay.  
**Thomas Goubin:** Let's put Slack. We don't care. Uh, let's put Slack. I will double check in my in my notes. Um and um in the text so it what it looks as a rendering. Um I think there is one that needs to we we need to show the rendering for one interview for them to understand what is the output from one interview maybe or not even no no just just a final report maybe an evolution of the final report which is maybe the vocabulary map that is specific uh specific to a rebranding that could show that it's really specific to the need they they highlighted and maybe some other things that would maybe we could just ask about that what would be relevant for this use case based on the transcript basically that I shared with Balina. Uh what else could we add uh that will will make a good report and that will help to uh have an answer should we do reburning or not and and maybe different version of this uh report based on the different interviews that has been made.  
   
 

### 00:23:36 {#00:23:36}

   
**Thomas Goubin:** Maybe when you do a first week one, week two, week three, week four of a project that is for four weeks and will that will take into account the different sources during these weeks and you can see the evolution of the report over time and yeah, I think that would be  
**Richard Blythman:** Interesting. Yeah. I'm just thinking um we almost like there's almost like different types of  
**Thomas Goubin:** cool.  
**Richard Blythman:** synthesis that you want to do. There's like batch synthesis where you almost need like a list of interviews down here and you don't want to pass all of the interviews through the synthesis workflow at once. You want to pass them through in parallel or something like that. Do you know what I mean? like um here for this synthesis workflow, we're passing in all of the docs and just running it once through the synthesis workflow. But for something like interviews where you want to process each interview individually, um currently we'd have to create a new project and just pass a single interview into each one.  
   
 

### 00:24:38 {#00:24:38}

   
**Richard Blythman:** Um so you like if you had a 100 interviews, you'd have a 100 different projects each with like one input, I guess. And so what might be nice is like a different type of synthesis workflow which is called like a batch a batch workflow or something where you just have like all of the 100 interviews here and it doesn't pass all 100 interviews in to a single synthesis workflow. It passes them in one at a time and gives you like a 100 different outputs then or something like that. Do you know what I mean?  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** I wonder what that would look like in the UI, I guess, but probably not uh too important yet. Um,  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** okay. So, um, yeah, we need like a few different data sources here. Um, there's going to be something on the right like a new output type like brand strategy or something like that. As well as um, as well as like the what was it called? The map, the vocabulary map.  
**Thomas Goubin:** Yeah.  
   
 

### 00:25:43 {#00:25:43}

   
**Richard Blythman:** I wonder if the vocabulary map would go in the middle because that's kind of like a view of the context graph, I guess, rather than an output.  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** What do you think?  
**Thomas Goubin:** Yeah. Yeah. I think so. I think it's in the middle.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** Yeah. So, you have a vocabulary graph.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** So, we need kind of like different views on the graph somehow as well. We need a way of I guess when you when you go to the table view, I guess we could have a table here, a vocabulary map.  
**Thomas Goubin:** I think very sorry so sorry I'm going back to something you said yesterday. I think that was a good idea. it was the weight uh on the different sources with the ability to because it will be interesting for Fion as well and even if Balina didn't mention it I think it's  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** um it shows intent in the way we are thinking about it and uh maybe the  
   
 

### 00:26:32

   
**Richard Blythman:** Yeah. Yeah.  
**Thomas Goubin:** waiting could be also part of like all the demo uh and be added here because it with a slider or something like that.  
**Richard Blythman:** You're here. Yeah. I was thinking exactly that.  
**Thomas Goubin:** Yeah, maybe. Yeah. Yeah.  
**Richard Blythman:** So Archie for context uh Fun basically said he was like I have to I get a lot of input on what to build and I have to decide ultimately what to prioritize and he's like if something comes from the founders for example from the product strategy I have to wait weight that more because if I don't do it I'm going to get fired you know whereas like maybe you weigh the sales sales team less. So um some way of waiting the different inputs um is something that he wanted. So maybe like having a slider here where we can be like okay let's like weigh the product strategy the highest because like I don't want to get fired and well this interview with this user they're like a high priority customer so like let's put that up max but like this one is only a small customer and you know so um having some sort of slider would be really cool.  
   
 

### 00:27:31

   
**Richard Blythman:** Um, okay. So, do you think it would be okay to have the basically like a a vocabulary map here like in a table view for example with like I forget what you what it looked like in your  
**Thomas Goubin:** It's just a way to yeah to understand what the customer say and what internally do we say in a context of a rebranding. You want to understand if the internal vocabulary and the thing you're talking about match the customer's perspective. It's just a trick to to show that we have an idea of how to build this workflow with them because during the demo again I think as we mentioned yesterday we will need to say that we will build the skill with them uh to interview them to really create according to their need and we will modify this skill uh based on that but it shows like some kind of yeah customized version of the skill  
**Richard Blythman:** Mhm. Yeah.  
**Thomas Goubin:** ready.  
**Richard Blythman:** Yeah. Okay. Um, yeah, we can think about this a bit more.  
   
 

### 00:28:38 {#00:28:38}

   
**Richard Blythman:** I think it'd be nice to talk to Claude codes about  
**Thomas Goubin:** Yeah, I think so.  
**Richard Blythman:** ideas.  
**Thomas Goubin:** You just asked in the context of a rebranding based in Balina's transcript uh and the outcome they want to have, which is should we do the rebranding or not? And what should we give to the CEO about that? If you just prompt this, I guess it's going to add some stuff in the content.  
**Richard Blythman:** Yeah. Yeah. Um, cool. And you mentioned skills as well. So, um, what skills are we going to create for them?  
**Thomas Goubin:** Um, basically this is a skill to my opinion.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** It's like a VOC skill that we customized for a precise outcome or business a precise business case. That's actually good because in the skill creation with us because when you create a skill you describe how do you want it to work in our case and what we could sell and what we could tell is that you don't come with um an how to you come with a business case you come with the outcome you want out of this skill which is should I take the decision to do a rebranding and spend 100k or not and we discuss together to make that happen and uh that's what the skill is about you know and  
   
 

### 00:30:04 {#00:30:04}

   
**Richard Blythman:** Yeah.  
**Thomas Goubin:** that's worse I  
**Richard Blythman:** Yeah. So I was also thinking that like what we have here are already are skills because like  
**Thomas Goubin:** think  
**Richard Blythman:** each of the outputs that you create is a skill pretty much right. So like 10 or eight report is going to be a skill.  
**Thomas Goubin:** that's correct so  
**Richard Blythman:** Generate PRD is going to be a skill business case.  
**Thomas Goubin:** maybe it's an agent and what does the agent do and the output are skills it's It's a voice of customer agent and within this  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** agent we have different outputs that are skills. Would that make more sense? I think it's important to have some kind of taxonomy on non letters that we give to what we do to represent what we build and for them to understand what it does and and you know in their mind to understand it's an agent it's a skill. It's an agent because this is what is hosted and uh what will answer to different channels and the outputs or different skills based on the business needs.  
   
 

### 00:31:03

   
**Thomas Goubin:** Does it make  
**Richard Blythman:** Yeah. Yeah. I think more Yeah.  
**Thomas Goubin:** sense?  
**Richard Blythman:** Lots of stuff is skills. Like the entire like kind of synthesis is a skill. Like usually we'll have like a user research skill, I guess. And maybe that user research skill we'll call a generate PRD skill.  
**Thomas Goubin:** Okay.  
**Richard Blythman:** Yeah. A skill skills within a skill kind of thing. Um,  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** and also like extracting the nodes from the graph we usually have as skills as well. So maybe there's like different types of skills. There's like skills that generate outputs. There's skills that extract the context graph. And then there's like I don't know composed skills that kind of like piece all of these together.  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** Um, I think we need to figure out exactly what skills Alina would want.  
**Thomas Goubin:** Yeah. Um, yeah, it's it's hard to say. I think just a skill that allows them again to just see about this rebranding thing.  
   
 

### 00:32:13

   
**Thomas Goubin:** I I mean the the final scale not the different thing we need to achieve that it's like uh a complete report based on the different sources that allow them to understand what the their customer are talking about what the internal team are talking about and to have some kind of insight on what is their uh things that do not match and if the conclusion should be to do a rebranding on what and so And I guess this is the the global skills that they would need and inside of this they need different sources. They need a a graph to have some kind of visualization and they want different output and maybe talk about this report on Slack to change a weight for instance or to ask for details you know interaction uh with  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** Slack.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** It could be like uh yeah like that.  
**Mohamed Arshath:** I I think uh can we like uh maybe like three levels of skill or three stages of skill. Uh for example like here like uh the first type is to connect to different data sources.  
   
 

### 00:33:25 {#00:33:25}

   
**Mohamed Arshath:** Number two is to extract context graph like different context graph skills and then the final one is the synthesis of output skills. So all we have to show is like we have we are thinking of these three different sorts of skills. uh we can like have on the left side a skills panel that uh that with uh all the different skills what it do and maybe we can say it could be customizable but there's default and then we can just show that oh when you do when we do like um first uh when you connect all the sources and then there's like a button to extract uh context graph and that skill will be used to do the uh whatever uh context graph uh maybe that could be composable Like for example um for example like uh vocabulary graph is vocabulary table is a skill type you can choose or not to choose like okay you choose few other thing and then you extract and show that and then from that you um you do like certain output like VC report that the input to VC report uh is the context graph and then we do the report generation That's another skill though.  
   
 

### 00:34:42

   
**Richard Blythman:** Yeah.  
**Mohamed Arshath:** How it work on the back end,  
**Richard Blythman:** Yeah.  
**Mohamed Arshath:** we can figure it out later. But that's like I think one way to think about I suppose.  
**Richard Blythman:** Yeah. I was thinking like when you when you add a certain type of input data, um there's going to be certain skills for extraction that work with that. So if you add the product strategy doc like one of the things that it can one of the skills associated with that is extracting strategic bets for example or extracting I don't know vision or something right um and then like when you load a user transcript um certain skills associated with that are extracting opportunities or extracting vocabulary maps and So when you add an input data source, I don't know, maybe there's some checkbox where maybe there's a default where like if you add a transcript, it's going to automatically extract the opportunities because that's like usually something that most people want, but it's not going to automatically extract the vocabulary map. But there's some way of customizing where I can click on this transcript and then I can like check a box to say I also want to extract a vocabulary map which basically like um pulls in that skill.  
   
 

### 00:36:02

   
**Richard Blythman:** And maybe there's even a way to add like custom extractions as well from like GitHub or something, right? like uh out of the box this app doesn't have the ability to extract something specific. Uh I don't know like um I don't know maybe I want to do pain points in a slightly different way. So I can write a custom skill for extracting pain points with my own prompt and then I can uh run that on the transcripts. And then similarly for the outputs, um, we're going to have a bunch of like skills that come with the app like business case and PRD. But if I want to add a new output, then I probably need to create my own skill. And maybe when I click add output, it's going to allow me to like choose whether it's from GitHub or something like this, right? Um, yeah, I think we can figure it  
**Thomas Goubin:** Yeah,  
**Richard Blythman:** out.  
**Thomas Goubin:** I I try to run uh I don't know if it's relevant. I will share you to I try to create a prototype out of the specifics of needs of Balena based on the work she has done and your um and your draw and your sketches.  
   
 

### 00:37:20 {#00:37:20}

   
**Thomas Goubin:** Uh I'm just going to share it to see if it's relevant. You tell me if it's not. Uh uh uh here you go. Uh so basically this is uh there is different it's not like the UI this is just to present the different windows or different uh um specifics. uh imagine you have uh in the context of balina different project what it's a project basically for user recent print free for instance it's something where you configure different sources you want and the different weights I don't really like this onboarding thing I prefer I would prefer to have it straight in the workspace workspace is a bit like what are you prototyped uh with the sources on the left and the output on the right what is different here are the weight and this is what you say just before Richard to configure the weight here might be better a representation with a graph view and the different outputs that could be scaled as you mentioned with the vocabulary map as an output maybe or it's here I don't know and the result here is interesting I think this is what it should look like basically uh what it is the tension between the sources the vision versus the customer reality the sales promise versus the support relative this is typical um uh rebranding stuff the key insights the source transformation the vocabulary map that we find here and this is something that will help to take a decision the  
   
 

### 00:38:52 {#00:38:52}

   
**Thomas Goubin:** run history that should be somewhere and in the slack it will look like that imagine it posted on the slack the synthesis run and shown as an idea and want to I don't know change the weight to eight and what it what does it look like with that in with that input from shan and we could have it straight on slack so that just uh inspiration for us to build this new prototype, but I think it could look uh of some aspect in the different window I shared. We could take some stuff from here to put it in the Balinda demo.  
**Richard Blythman:** Yeah, nice. I really like the attentions part.  
**Thomas Goubin:** Me too. Yeah, the in the result. That's my favorite aspect here.  
**Richard Blythman:** Yeah, that was super cool.  
**Thomas Goubin:** I'll share it to Slack  
**Richard Blythman:** You also Great.  
**Thomas Goubin:** here.  
**Richard Blythman:** You also made me think that um we need some sort of share to Slack in the demo as well. Like once we have like a business case here,  
**Thomas Goubin:** Correct.  
   
 

### 00:39:42 {#00:39:42}

   
**Richard Blythman:** we need some sort of like share  
**Thomas Goubin:** Correct.  
**Richard Blythman:** button.  
**Thomas Goubin:** Yeah, correct. Even in the report here, he didn't do it, by the way. And um it's cool maybe to show to have some kind of window to show to them what it will look like in their Slack. This has a slide, you know, in our somewhere that we can share during the demo.  
**Richard Blythman:** Mhm. Yeah.  
**Thomas Goubin:** because I think this this could be very relevant.  
**Richard Blythman:** Yes.  
**Thomas Goubin:** Oh, I didn't see it even as another.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** Okay, that's okay. I will share it to you.  
**Richard Blythman:** I'm trying to think where the tensions could  
**Thomas Goubin:** Yeah, I mean the tension for me it's a part of the synthesis.  
**Richard Blythman:** go.  
**Thomas Goubin:** It's like uh what you would look like after it's it's after this basically after you run the synthesis.  
**Richard Blythman:** Yes, attentions would be an output.  
**Thomas Goubin:** Yeah. Yeah, definitely. Just part of the of the report,  
**Richard Blythman:** Mhm.  
   
 

### 00:40:34 {#00:40:34}

   
**Richard Blythman:** Yeah.  
**Thomas Goubin:** I  
**Richard Blythman:** Nice.  
**Thomas Goubin:** think.  
**Richard Blythman:** Um, cool. Okay. So, the main things we need to add for Bellina are something to do with skills, like some way of adding skills from GitHub, I guess. And we also talked about like what skills are associated with what inputs. So like maybe some way of clicking on the transcripts here and seeing like checkboxes of which skills you want to run to extract the graph like um vocabulary map or opportunities  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** or whatever.  
**Thomas Goubin:** Yeah. And this is just an excuse for us to say we will uh customize this with you if thinking what it's relevant for you. This is what we think is generic could be helpful to your context but we will do that with you in the first week of our collaboration or something like that you know.  
**Richard Blythman:** Yeah. Yeah. Exactly. Um and then maybe some way of like adding new outputs via skills as well.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** Uh also like a Slack a share to Slack button.  
   
 

### 00:41:42 {#00:41:42}

   
**Thomas Goubin:** Yeah.  
**Richard Blythman:** Um okay. That that would be a pretty cool demo though, right?  
**Thomas Goubin:** Yeah. Yeah. I think so. Yeah.  
**Richard Blythman:** Look at that point.  
**Thomas Goubin:** And uh yeah, definitely. I think it's I think it's cool to show that we might have questions from the product guy that is an engineer. So we might have some question about what is our agent? So more backend questions I would say more infrastructure architecture thing.  
**Richard Blythman:** Great.  
**Thomas Goubin:** How do we I don't know I he might ask how are we sure uh for instance he could ask about evils or how we sure that the result is better with that source rather than in that one. Uh how do we host it? what is the uh LLM behind I don't know he might deep dive into some technical question on the how how we make it happen and not just the UI  
**Richard Blythman:** Yeah. Yeah. Um, yeah. Yeah, I think we can just kind of be honest there and say like well what we're showing you is a prototype, but uh we do a lot of the we've been like using our own we've been doing a lot of synthesis with claw code for eight months and everything's built on top of claw code.  
   
 

### 00:43:02 {#00:43:02}

   
**Richard Blythman:** Uh we don't really do evals. I don't know how you would do evals  
**Thomas Goubin:** I I don't think it's necessary to be honest.  
**Richard Blythman:** here as an  
**Thomas Goubin:** I I was just saying that because in in fact you because you have the waiting so it's  
**Richard Blythman:** example.  
**Thomas Goubin:** just very very uh approximative. You choose you decide which one is best. It's not like uh we don't provide an agent to say to you what is best because we don't know what's best. Yeah. At the end of the day, you have to decide.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** It's just a synthesis work.  
**Richard Blythman:** Yeah. Yeah. The weights. That's another thing we can ask uh for Alina  
**Thomas Goubin:** Yeah. Oh, yeah. Yeah. We need to wait.  
**Richard Blythman:** and  
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** I think what we can say for the weights is basically it's prompt uh we know uh as we change uh the weight score like it's just going to tell uh add a prompt that says hey uh you know for these sources uh you know focus a bit  
   
 

### 00:43:50 {#00:43:50}

   
**Richard Blythman:** Yeah,  
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** more uh for this Yeah.  
**Thomas Goubin:** Yeah, definitely.  
**Richard Blythman:** I was thinking the same. Yeah, just hack it.  
**Thomas Goubin:** Um,  
**Richard Blythman:** Mhm.  
**Thomas Goubin:** and maybe they will ask buy versus build question and it might be the same for all the different interviews. What stop me to what stops me to do it on my own? And on that we should be clear on where we are and all the different uh how far we are with this thinking. how we will help us to build their own skill and go straight for the business outcome and uh tell them how difficult it is to build a co-work agent that works and that is hosted and that is even if they have scheduling now but with scheduling and so on. So basically we implement it for them help rather for them to do it on their own.  
**Richard Blythman:** Mhm.  
**Thomas Goubin:** So this in the pitch need to need to work  
**Richard Blythman:** Yeah. Yeah.  
**Thomas Goubin:** I think. Um I don't have the correct answer yet I think.  
   
 

### 00:44:56

   
**Richard Blythman:** I think a lot of the pattern matching that's like where we can really start to help them, you know, like all of these proactive things.  
**Thomas Goubin:** Yeah. Yeah. Yeah. And yeah it's more and again it's more a partnership than selling a SAS product. And I think it needs to be clear from the beginning as well that our solution is customization by default and uh it's a partnership rather than just a subscription to a SAS that we build and uh based on that it allows to be very flexible in our answers and that's a reality in fact we don't have a  
**Richard Blythman:** Yeah. Yeah.  
**Thomas Goubin:** SAS product or even a real like a full-fledged product that is hosted somewhere and so on.  
**Richard Blythman:** Mhm. Yeah. I guess Balina is the one that we're least it's the most different to the other ones because a lot of the other ones have expressed this like synthesis problem specifically.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** But um I'm not sure if Bolina will see the problem they're facing as a synthesis  
   
 

### 00:45:53 {#00:45:53}

   
**Thomas Goubin:** Yeah.  
**Richard Blythman:** problem.  
**Thomas Goubin:** I think so. I think so. I think they win.  
**Richard Blythman:** Okay.  
**Thomas Goubin:** Yeah. Yeah. I think they  
**Richard Blythman:** Um cool.  
**Thomas Goubin:** win.  
**Richard Blythman:** All right. Um for Autodesk, um it's the customer success team that we're speaking to and so uh I need to  
**Thomas Goubin:** No.  
**Richard Blythman:** go back and look at the exact sources that they were using. I spoke to him about the OKR reporting and the VOC reporting before. So, um maybe we could even have both of those. I'll go back to the interviews and figure out which sources went into each one and we could have like separate projects for VC report versus uh the OKR report. For the OKR report, I think it was stuff like um the OKRs wherever they're stored like on Confluence. Um I think air tableable went into that as well like their learnings they stored the learnings in air tableable. Um support tickets no the support tickets were for the VOC stuff.  
   
 

### 00:46:59

   
**Richard Blythman:** Um and they use intercom for that. Um but yeah we can just have like different input sources for for each one.  
**Thomas Goubin:** Okay.  
**Richard Blythman:** And then for the VFC like maybe we want to see like the opportunities extracted from uh or maybe the feature requests or something from the support tickets. There are a few things we could view on the context graph. And then the output we basically want is like either an OKR report or a VOC report which I'm not sure we have the full templates for that yet. I might but um I think that'd be a cool demo for them then.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** um scheduling that those ones in particular would be nice to schedule especially because like reporting is regular. So maybe we could try and figure out what the scheduling would look like in another icon here. Um but yeah, I'd be pretty happy with that as a demo. I think that would be pretty compelling. Um, who else? So, then there's so safe as well.  
   
 

### 00:48:16 {#00:48:16}

   
**Richard Blythman:** Theirs is an analytics use case. Like I said, it's going to be like mix panel data along with support tickets and some other stuff. And they again they kind of want to just create a report. So he has to like create regular reports based on the analytics and like why activation is down versus like something else. So I think that would be pretty I think that would be a pretty cool demo for him as well. And who else? That's three, right?  
**Thomas Goubin:** Does this demo only single tenants or do we do they need to talk about the report generated with their  
**Richard Blythman:** Um,  
**Thomas Goubin:** team?  
**Richard Blythman:** I guess like the share to Slack kind of gets us like if they can run it locally and just like share to Slack, that's probably fine.  
**Thomas Goubin:** Okay.  
**Richard Blythman:** Um, one of the other questions I was going to ask is, do we need a chat window since it's going to if it's an Electron app, like should we just add in a chat window so that you can like chat with the data sources?  
   
 

### 00:49:26 {#00:49:26}

   
**Richard Blythman:** If people aren't asking for it, maybe we don't need to.  
**Mohamed Arshath:** uh in the King Thomas show this table this graph and then the third ch the third one is  
**Richard Blythman:** Okay.  
**Mohamed Arshath:** chat  
**Richard Blythman:** Yeah, I guess it it'd be nice to have, right? Like I think I would use the the chat if like if this was a real app.  
**Thomas Goubin:** Yeah, I think we are used to it now to chat with the different interface to describe what we want or but I'm wondering if we don't if we should embed it here or do it on Slack and position ourself as a Slack agent, you for everything to be interactive in Slack, but I don't know.  
**Richard Blythman:** Yeah, maybe let's wait to see if people ask for it.  
**Thomas Goubin:** Yeah,  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** maybe maybe we could we could say it's both and and ask which one would be the best for  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** them because I I can imagine myself if I have my imagine we have it's a bit like your your issue you have different agents and imagine that we start with that but we have I don't know an agent for creating PRD or whatever.  
   
 

### 00:50:38

   
**Thomas Goubin:** uh if you have to open the different windows in your browser and in the in this specific thing having a chat by agent it's not very handy rather than having everything in slack being able to add mention them or to see them on the left as co-workers then it works  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** better right or directly in channels I think  
**Richard Blythman:** Yeah. Yeah. Yeah.  
**Thomas Goubin:** it's it's a better it shows our maturity if we do it in Slack actually I think I don't know  
**Richard Blythman:** Okay. Cool. Cool.  
**Thomas Goubin:** what you I think it's  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** a  
**Richard Blythman:** I'm on the fence about it. I'm I'm like mostly thinking about it from my perspective because like honestly what we're showing here is something that I would use each week. Like um we were kind of trying to set this up with like the  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** SR.nappa.gg, right? Like this is kind of like the new the replacement for like SRA and VOCC.NAPA.gg.  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** And what I would like to start doing is like using like start working on this as a full production app and then like start using it every week and like adding more and more synthesis workflows I use for myself  
   
 

### 00:51:45

   
**Thomas Goubin:** Yeah. And how would you use it?  
**Richard Blythman:** for  
**Thomas Goubin:** Do you think you will go on the interface and chat to it or do you think you will chat to it on Slack? And should we have it opened on the Slack channel for the three of  
**Richard Blythman:** Um so I use chorus for two types of work.  
**Thomas Goubin:** us?  
**Richard Blythman:** One is for general chat stuff and also for synthesis stuff.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** I actually started like analyzing how much synthesis I was doing versus like research  
**Thomas Goubin:** Okay.  
**Richard Blythman:** because like you always want to be doing synthesis, right? You don't want to be having like endless conversations that like lead nowhere. You want whatever you're talking about to end up as some sort of synthesis that ends up in a dock or whatever. Um, so I'm not sure you need both of those from the same tool. I guess like why wouldn't I just use cloud cowork for chat and then for any synthesis work I could just use this. Um,  
   
 

### 00:52:46 {#00:52:46}

   
**Thomas Goubin:** Okay.  
**Richard Blythman:** I'm not sure yet I guess is the answer.  
**Thomas Goubin:** Yeah. Let's see. Let's see how it goes after Friday. And if  
**Richard Blythman:** Um the last kind of interview that we're having is with  
**Thomas Goubin:** I  
**Richard Blythman:** Toast. So we have Bellina Synthflow Autodesk.  
**Thomas Goubin:** realize that you had toast in there.  
**Richard Blythman:** Adriana booked one  
**Thomas Goubin:** Okay.  
**Richard Blythman:** in.  
**Thomas Goubin:** But it's about I see it in your It's with a person that wanted to do meetups, right?  
**Richard Blythman:** Oh yeah,  
**Thomas Goubin:** car.  
**Richard Blythman:** that was Ricar. So, it's not going to be a demo.  
**Thomas Goubin:** I don't think it's gonna be a  
**Richard Blythman:** Okay. So, we just have three  
**Thomas Goubin:** demo.  
**Richard Blythman:** tomorrow.  
**Thomas Goubin:** Uh, you got Fion, we got Balina start.  
**Richard Blythman:** I've got like a ton of like separate stuff  
**Thomas Goubin:** And I see  
**Richard Blythman:** like  
**Thomas Goubin:** that I got one as well.  
**Richard Blythman:** stripe  
**Thomas Goubin:** So I might show some stuff to Anaka, a guy that is using cloud code as well.  
   
 

### 00:53:52 {#00:53:52}

   
**Thomas Goubin:** But yeah. Okay. Okay.  
**Richard Blythman:** I'm going to block this final slot in my calendar so I don't unbox it because I need to have lunch.  
**Thomas Goubin:** Okay.  
**Richard Blythman:** Um um so um yeah. Okay, we're only going to do three demos.  
**Thomas Goubin:** Okay.  
**Richard Blythman:** I guess I guess I could show in the Stripe like interview just to get  
**Thomas Goubin:** Cool. Cool. Cool.  
**Richard Blythman:** their thoughts.  
**Thomas Goubin:** Oh yeah, definitely. It's always useful to have some kind of insight on a specific prototype rather than the discussion maybe.  
**Richard Blythman:** Yeah. And then I have another one.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** Adriana introduced me to a PM from Microsoft.  
**Thomas Goubin:** Oh, nice. Cool. Awesome. Um  
**Richard Blythman:** Oh, and also Oh,  
**Thomas Goubin:** Okay.  
**Richard Blythman:** yeah. So safe as well. So there's four.  
**Thomas Goubin:** Ah, it's so safe.  
**Richard Blythman:** Yeah,  
**Thomas Goubin:** Okay. Yeah. Cool. Awesome.  
**Richard Blythman:** that's going to be at nine.  
   
 

### 00:54:44 {#00:54:44}

   
**Richard Blythman:** I'm trying to get it 30 minutes earlier. Okay, so there's going to be like four demos.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** We've gone through all of them. So save Autoesk. Oh, we didn't go through Fion's one. It's kind of similar. Yeah. Um Okay, cool. Yeah. For I think we I think we have a good idea about what the demos will look like. So, um maybe that's Let me map these out a little bit more. I'll like try and get the specific data sources and that sort of thing. Um Arshie, maybe you could start working on some of the changes that we mentioned in this meeting like um I don't know the sliders and the way that we add skills like the way that we associate certain extraction skills with certain input data sources. and also how we add new output formats via skills from GitHub and that sort of thing. Um, and yeah, by the time you've done that, I'll come back with specific maybe like we can set up different projects.  
   
 

### 00:56:05 {#00:56:05}

   
**Richard Blythman:** If we set up a different project for each demo, maybe um I know that the adding of data sources wasn't working when uh when you did the Loom video. I wonder is that something that we  
**Mohamed Arshath:** Uh yeah,  
**Richard Blythman:** need?  
**Mohamed Arshath:** everything is just mocked like uh I didn't really uh go into like adding data sources. Um yeah, I don't know how much you want to  
**Richard Blythman:** Yeah, that's like lower priority, I guess.  
**Mohamed Arshath:** mock.  
**Richard Blythman:** So, um, one other thing maybe could we add a light mode and  
**Mohamed Arshath:** Yeah, sure.  
**Richard Blythman:** then we also talked about scheduling. That's kind of like lower priority I would say, but um, yeah, I guess if Yeah, it's not super important, but nice to have, I guess. Um, okay, cool. Let me let me go and start mapping out the exact data sources that we need for each demo and I'll share those with you. I'll like share some sort of spec about exactly what each project should look like. And um yeah, maybe we can do like a final run through in a meeting, like a half hour meeting later or something.  
   
 

### 00:57:24

   
**Richard Blythman:** And then after that, I think we're good to go with demos for for  
**Thomas Goubin:** Yeah. Yeah. The first is at 10:30 tomorrow.  
**Richard Blythman:** Friday.  
**Thomas Goubin:** 10:30 Bing time tomorrow. So, I guess we're good.  
**Richard Blythman:** Yeah. And I think the the so safe one is going to be before that.  
**Thomas Goubin:** Oh, the safe is before.  
**Richard Blythman:** He said haven't booked it in yet.  
**Thomas Goubin:** Okay. Okay. Okay. Okay. Cool. Okay.  
**Richard Blythman:** Um  
**Thomas Goubin:** I just have one slot in my calendar today. I need to go to the dentist just for you to know. It's at 22 London time. So, yeah.  
**Richard Blythman:** Okay, cool. Cool. Maybe um aim to meet at 12:30 or something for half an hour.  
**Thomas Goubin:** 12:40  
**Richard Blythman:** Okay,  
**Thomas Goubin:** 8\.  
**Richard Blythman:** I'll put that in and that can be like a final run through. Sweet.  
**Thomas Goubin:** Okay.  
**Richard Blythman:** Um, demo prep. Okay, cool. All right. Um, thanks guys. Yeah,  
**Thomas Goubin:** Thank you.  
**Richard Blythman:** I'm looking forward to nearly at the end of it's been a busy week. So, yeah. Yeah. Yeah, I think so, too.  
   
 

### Transcription ended after 01:00:14

*This editable transcript was computer generated and might contain errors. People can also change the text after it was created.*