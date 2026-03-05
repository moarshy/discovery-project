# 📝 Notes

Mar 5, 2026

## Demo Prep

Invited [Thomas Goubin](mailto:thomas@naptha.ai) [Mohamed Arshath](mailto:arshy@naptha.ai) [Richard Blythman](mailto:richard@naptha.ai)

Attachments [Demo Prep](https://www.google.com/calendar/event?eid=M3AxaHI5YmFtb3NicnFwbmhzMmxqZG0yZzUgcmljaGFyZEBuYXB0aGEuYWk) 

Meeting records [Transcript](?tab=t.u54rhj4wpq17) 

### Summary

Mohamed Arshath reviewed the current development status, confirming the light mode, integrations, and functional analysis reports, while Richard Blythman suggested a demo workflow focusing on adding skills via "import from GitHub" and running the analysis. The team, including Thomas Goubin, confirmed the core architectural choice of using an intermediary "context graph" for structured data storage and efficient report generation, which will serve as a unique feature differentiation. Important pending tasks include implementing "export to Slack" and scheduling functionality, and there was a discussion about abstractions, suggesting the need to package components as "plugins" containing both connectors and associated skills to handle structured and unstructured input data.

### Details

* **Review of Current Development Status**: Mohamed Arshath provided an overview of the current status of the application, demonstrating the light mode, the integrations section showcasing different available integrations, and the skills section which currently allows for renaming, editing, and importing from GitHub ([00:00:00](#00:00:00)). They also confirmed that the feature for running analysis and viewing the report is functional across all areas, though some UI issues still need attention ([00:01:33](#00:01:33)).

* **Demo Workflow and Prototype Preparation**: Richard Blythman outlined a suggested click-through for the demo, which should start with showing all projects, selecting one (like Bolina), and then demonstrating how to add skills, specifically using the "import from GitHub" button. The workflow would then proceed to the actual project to show how to add sources and finally run the analysis ([00:02:53](#00:02:53)).

* **Skills and Project Scoping**: Mohamed Arshath clarified that integrations and skills are currently treated as global, making them available to all projects once added. The conceptual flow involves input sources, which are processed by skills to populate a context graph, from which different outputs and reports are synthesized ([00:04:09](#00:04:09)) ([00:10:15](#00:10:15)).

* **Pending Tasks for Demo Completion**: Mohamed Arshath confirmed that the functionality to "export to Slack" still needs to be implemented ([00:02:53](#00:02:53)) ([00:05:23](#00:05:23)). Additionally, the remaining tasks include working on the scheduling functionality, which is considered one of the last two items left to complete ([00:06:23](#00:06:23)).

* **Discussion on Input Data Structure and Abstractions**: Richard Blythman shared feedback from Thiago regarding desired data sources, noting that these include structured data (like subscriptions and accounts from commercial sources) and unstructured data (like support tickets and customer transcripts) ([00:07:37](#00:07:37)). This led to a discussion suggesting the need for two different types of input data—structured, which auto-creates objects, and unstructured, which requires skills for extraction—and the importance of figuring out the correct abstractions, possibly by packaging components as "plugins" which contain both connectors and associated skills ([00:08:56](#00:08:56)) ([00:11:15](#00:11:15)).

* **Requirements for Run History and Scheduling**: Thomas Goubin suggested that the application should include a history of runs, which could be integrated with the scheduling interface, similar to a monitoring or PR inbox view ([00:13:44](#00:13:44)). The team agreed that the context graph and the outputs should potentially be scheduled separately, as the context graph might need to refresh daily for syncing new data, while different reports (outputs) might be scheduled weekly or monthly, and the context graph could also be used to generate alerts or insights without full reports ([00:19:29](#00:19:29)).

* **Architectural Decision and Unique Feature**: The discussion solidified the architectural choice to use an intermediary "context graph," which is unique to their methodology and provides a way to store structured data from various sources for efficient report generation, serving as a key feature differentiation ([00:18:20](#00:18:20)) ([00:21:29](#00:21:29)). This context graph relates to a larger concept of "company memory" and raised questions about how to manage and scope memory across different synthesis flows and projects ([00:22:29](#00:22:29)) ([00:24:44](#00:24:44)).

* **Future Development and Sales Strategy**: The group discussed future work, recognizing that the next steps will involve extensive agent building and testing of the analysis capabilities, pending positive feedback on the current UI ([00:25:42](#00:25:42)). They considered two paths for the following week: an execution sprint if the demo is successful, or another discovery sprint to focus on agent capabilities or sales/product delivery format, possibly using an Electron app to overcome security hurdles with prospective clients ([00:26:45](#00:26:45)) ([00:28:20](#00:28:20)).

### Suggested next steps

- [ ] Mohamed Arshath will implement the Slack export functionality and look into how to implement the scheduling functionality.  
- [ ] Richard Blythman will continue to think about the demos and communicate any realizations to Mohamed Arshath before going to sleep.

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*Please provide feedback about using Gemini to take notes in a [short survey.](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=J2D7T0I9OZflJeH5Pe8_DxIUOAIIigIgABgECA&detailid=standard)*

# 📖 Transcript

Mar 5, 2026

## Demo Prep \- Transcript

### 00:00:00 {#00:00:00}

   
**Richard Blythman:** Hey.  
**Mohamed Arshath:** Hey.  
**Richard Blythman:** Hey. Hi.  
**Mohamed Arshath:** Hi.  
**Richard Blythman:** How's it going?  
**Mohamed Arshath:** Doing good.  
**Richard Blythman:** I know it's probably quite short time to work on stuff since the last meeting. We don't have to take up the full half hour either. Um, did you get get a chance to take a look at the sample data?  
**Mohamed Arshath:** Yeah. Uh, I'll go through one by one.  
**Thomas Goubin:** I  
**Mohamed Arshath:** Hi. Hi. Thomas is here too. Can see.  
**Richard Blythman:** Yep.  
**Mohamed Arshath:** So, this one is done. uh you know so I mean I'm just showing what I'm doing now is just the light mode is working I suppose I'm going to  
**Richard Blythman:** Nice.  
**Mohamed Arshath:** switch it back uh we went through this this is like the integration like you know just to show like we have all the different available integrations uh and so on added few from the previous call and then this is skills. Currently it's like three different stuffs like we can rename them.  
   
 

### 00:01:33 {#00:01:33}

   
**Mohamed Arshath:** You can also like you know edit them uh you know uh you can also import but currently this is not geared but like you can say that we can import from GitHub. I suppose that's skills. When we go here, we have these that's set up for each of the demo. If you go to VOC, we can click here and choose which extraction works like just to show off like nothing is functional of course like it's just to show that you know and then of course for each of that like you can have like a uh scale that you can explain what it is.  
**Richard Blythman:** Nice.  
**Mohamed Arshath:** Now you can run analysis. It would do this and then come up with this.  
**Richard Blythman:** Nice.  
**Mohamed Arshath:** You can take a look the report. So this should be the same across all. I think there are some issues that I need to work on. of course. Oh, the UI, but otherwise, yeah. So, I haven't worked on the Slack stuff,  
**Richard Blythman:** Nice.  
   
 

### 00:02:53 {#00:02:53}

   
**Mohamed Arshath:** like, you know, export to Slack. I'm going to do that. Yeah. Any any thoughts like  
**Richard Blythman:** Looks great. Looks really nice.  
**Thomas Goubin:** Yeah,  
**Mohamed Arshath:** any?  
**Thomas Goubin:** that's good.  
**Richard Blythman:** I think um main thing we should do is just like do a click through of what we think the demo is going to look like. Um so I think uh we're going to start with the projects like just all of the projects I guess and  
**Mohamed Arshath:** Yeah.  
**Richard Blythman:** then let's say we're doing Bolina for example. Um maybe first we'll show them like how to add the skills I guess.  
**Mohamed Arshath:** Thank  
**Richard Blythman:** And we'll click on the import from GitHub button and say we're going to build you like custom skills.  
**Mohamed Arshath:** you.  
**Richard Blythman:** You can import from here. And then we'll go to the actual project and we'll show them that you can add sources. The add source button works does it pops up like this?  
**Mohamed Arshath:** I Okay,  
**Richard Blythman:** Yeah. Okay.  
**Mohamed Arshath:** I need to connect but it's uh it's uh it's currently like Oh yeah,  
   
 

### 00:04:09 {#00:04:09}

   
**Richard Blythman:** Yeah.  
**Mohamed Arshath:** like you can do this but it doesn't get added.  
**Richard Blythman:** Yeah.  
**Mohamed Arshath:** Yeah,  
**Richard Blythman:** So,  
**Mohamed Arshath:** but it it's you can you can show up here maybe.  
**Richard Blythman:** we'll just say Yeah.  
**Mohamed Arshath:** Uh  
**Richard Blythman:** Yeah. Yeah. We can Yeah. No, that's fine. Um, so we'll like say you can add your custom scale through here and then it shows up on the left hand side and you  
**Mohamed Arshath:** yeah.  
**Richard Blythman:** can like wait the different uh weight the different sources and then we'll run the run analysis button. Is that  
**Mohamed Arshath:** Yeah.  
**Richard Blythman:** right?  
**Mohamed Arshath:** Like there's another thing like of course here you're adding skills to the like the way I'm thinking is like okay these integrations and skills are like global right so when you add something here it becomes available to all the projects right uh  
**Richard Blythman:** Yeah.  
**Mohamed Arshath:** so now let's say you set up this project and then you have let's say you add your sources now you can add a specific skill to this that would eventually you know occupy by this like for example extract opportunities pain points this you know that I'm thinking these are like when you run like you do it fills up the context graph and then when you run analysis it's basically doing this context graph and from context  
   
 

### 00:05:23 {#00:05:23}

   
**Richard Blythman:** Yeah.  
**Mohamed Arshath:** graph it is outputting different uh uh different outputs like one of them is like I current like it moved the vocabulary map here I don't know it should come there  
**Richard Blythman:** I think  
**Mohamed Arshath:** or here like we can think about that I just realized that  
**Richard Blythman:** it like that actually.  
**Mohamed Arshath:** vocabulary.  
**Thomas Goubin:** No. Yeah, it's good to hear.  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** Then the brand. So the way I'm thinking is yeah, you this is your input source. You you can like eventually like you can add like different skills to this uh and then uh you know it gets this and from here it moves there something like that.  
**Richard Blythman:** Nice. Yeah, I think that's pretty much the demo then, I guess.  
**Mohamed Arshath:** Yeah, I need to work on the Slack.  
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** I think just now like I have a to-do list like I'm still going through them all of them.  
**Richard Blythman:** Oh yeah, the slack can be  
**Mohamed Arshath:** So, yeah, I need to I'm going to work on it.  
   
 

### 00:06:23 {#00:06:23}

   
**Mohamed Arshath:** Then I'm going to I've been pushing it. Uh and then I'm going to see like if the scheduling stuff is uh uh how to do that. Like those are the two things that uh that's left.  
**Thomas Goubin:** Oh yeah, this scaring would be cool as  
**Mohamed Arshath:** Yeah.  
**Richard Blythman:** That would be cool.  
**Thomas Goubin:** yeah.  
**Mohamed Arshath:** Yeah.  
**Richard Blythman:** Yeah. Nice. Awesome.  
**Mohamed Arshath:** I  
**Richard Blythman:** It's a good question. Like you like I don't really know how to do the inputs.  
**Mohamed Arshath:** think  
**Richard Blythman:** Um let me uh let me just explain more of my thought process ina in case it's helpful. Um but uh I was talking to Thiago and he came back to me with the types of data sources that he wants to use. And um let me um yeah,  
**Mohamed Arshath:** You want me to I I stop  
**Richard Blythman:** let me show  
**Mohamed Arshath:** sharing.  
**Richard Blythman:** um so here's my here's my message with Thiago and he was basically said like here's the rough data. This I actually remembered this after I already shared the objects that they want with you.  
   
 

### 00:07:37 {#00:07:37}

   
**Richard Blythman:** actually said so these are new but um he was basically like I want the commercials so he was like from commercial I guess that's like stripe or something they want the subscription object they want the account object for product usage I guess this is like mix panel or something so they want like tenants campaigns users campaign activity admin user activity and user activity so I guess these are all actual these are all objects from structured data right and then he was like unstructured data we on support tickets, we want customer transcripts, uh we want feature requests from product board, and we want training reasons from Salesforce, right? Um but then when I went I was like, what should these actually look like on the left hand side? Like so he said he wants churn reasons from Salesforce, right? So is like churn reason is kind of the object that we're extracting from the raw sales force data but then like these are kind of objects too like the accounts and subscription subscriptions they come from an actual database all of the stuff from mix panel campaign activity campaigns tenants these are all actual objects and so I guess these would show up on the left hand side you're kind of pulling these in and then they would also show up in the like table view then as well so some of the input data  
   
 

### 00:08:56 {#00:08:56}

   
**Richard Blythman:** sources already have the objects kind of um defined I guess whereas the unstructured ones don't have the objects defined and that's where we'll need like the extraction skills or something. So maybe we need like two different types of input data. One is structured and one is unstructured. when you're pulling in structured data, um it's going to like automatically create an object corresponding to the database or something and then the unstructured ones maybe that's when you have to define the skill to actually do the extraction or something like that. There's a bunch of stuff to figure out I guess is the main thing I'm saying here and we don't need to figure it out for the prototype. Um, but like when you were talking about how to represent the skills in the lefth hand sidebar, I think there's a bunch of stuff to figure Right.  
**Mohamed Arshath:** Yeah. Yeah. I I think for me like um I very it's very difficult for me personally to move like when I can't figure out the back end. So it's been a uh very um uh it's actually helpful like if you can just do the front end actually it it actually helps with the uh uh you know having a representation for the back end.  
   
 

### 00:10:15 {#00:10:15}

   
**Mohamed Arshath:** So it's been uh it's been good like I think getting the front end this far  
**Richard Blythman:** Yeah.  
**Mohamed Arshath:** like um it's probably a good start like from here we need to figure out uh all the representation like what you're saying like different objects and stuff and then just have to w it like yeah um yeah like uh there's definitely quite a number of things to figure it out but uh but it it's sort of starting to make sense right like like input Then the context graph and from there we have different different synthesis. Uh so that's that's and and everything is skill like it's a skill to pull something from somewhere. Uh of course if it is structured then it is easy maybe we can just abstract it there. then it's a skill to even build context craft like for example uh today like if you click the way I'm thinking like okay uh there's default that's always going into all the interview transcript and if it is a brand strategy right these are  
**Richard Blythman:** We in case you think uh you're not sharing your  
   
 

### 00:11:15 {#00:11:15}

   
**Mohamed Arshath:** the oh shoot All right. Yeah. So, what I'm saying like okay, you have uh these different inputs like there's always a default uh that um that's that's going into unstructured because this in transcript and uh it's a brand strategy. there's always a default number of skills that's used to occupy uh to to to do to to do these context but you can add your own what I mean then you will have like your own uh representation like different representation maybe and from here you have other skills to pull the vocabulary map from here uh brand strategy report and tension report  
**Richard Blythman:** Yeah. Yeah. I think um the main question is around the abstractions. Like even you see where it says like interview transcripts. I wasn't sure if it should say interview transcripts there or like Google Docs like um and I guess uh we just need to figure out our abstractions.  
**Mohamed Arshath:** Yeah.  
**Richard Blythman:** And I'm kind of thinking of maybe we should just take stuff from plugins cuz like a plugin contains both connectors which defines the source that it's connecting to as well as the skills associated with those connectors.  
   
 

### 00:12:39

   
**Thomas Goubin:** But that's what coork  
**Richard Blythman:** So maybe we should package like all of these up as plugins.  
**Thomas Goubin:** does. It's a plugin in  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** coork.  
**Richard Blythman:** Yes. Exactly. And then I guess we need like one more type of object which is like transcript like it's the context graph.  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** So it's like not only the connectors and the skills, we actually need the like the graph objects like what is contained in that connectors and what is actually extracted by the skills.  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** Um just two things.  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** It's a deviation from uh I don't want to jump uh to another topic. Do do we need to continue about uh abstraction?  
**Richard Blythman:** Yeah, I think we're pretty much finished  
**Thomas Goubin:** Okay. Um I've put in the thread you mentioned me on Slack. uh where you mentioned me on Slack, Richard. Um several inputs, entities, and outputs from Balina especially uh that we could maybe integrate to the demo to feel like a little bit more tailor made.  
   
 

### 00:13:44 {#00:13:44}

   
**Thomas Goubin:** It's an extract mainly from the interview I had with Thomas. Uh I guess it's worth a shot. And second, uh more global. Um, we might need somewhere to see a history of what has been launched. Um, the history of the run,  
**Richard Blythman:** Yeah. Yeah. That's like I guess separate to the scheduling.  
**Thomas Goubin:** I think.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** So, or separate, but it could be in the same window or the same interface. I don't know. But there during a demo, I I would miss in my head it would pop up the question immediately. Do we have to run it every time? So, compute and so on. No, everything is stored and you know so we could have some kind of way prototype to to to show it.  
**Richard Blythman:** Yes. Yeah. I think Yeah, maybe that's part of the scheduling. Like we could maybe we just need like one new icon um to go to monitoring and then I guess that's going to kind of look like the PR inbox type sketches that we did, right?  
   
 

### 00:14:44

   
**Richard Blythman:** So, it's going to look like the sketches that you created specifically, Archie. and it'll just have like different rows with the different uh syntheses that have been run. And then maybe there's like a button for scheduling that in like on that screen it's like add schedule or maybe each run. I don't know. I'm kind of like open. Maybe they're separate screens or maybe they're the same. I don't know if you can do them. But uh yeah, I do agree that it would be nice to have like a history of the of the different runs kind of like we have in chorus with the analytics basically the same as that. Uh and that's kind of looks like the PR inbox as well maybe. Uh or maybe they're separate.  
**Thomas Goubin:** Yeah. And it could be also interesting to have the ability to schedule the different outputs or to run it one shot because in the demo you showed like everything is rendered. So every output or rendered when you run the analysis I'm not sure it's the correct way because I can assume for example the example of Balena I would have some the VOCC report some synthesis of the interview and the discord uh but I could have also a full uh business case as an output and I would want to run the VOC report every week to provide me inputs like weekly and at the end of the month I will run the business case based on all the different data but I do not want to render it every  
   
 

### 00:16:16

   
**Thomas Goubin:** time. So in the demo in the flow I'm not sure I don't see really the thing where the different input or in in um in Google notbook lm it's render when you click on the button it generates the the slide for for example or the podcast I think we should adopt something like that with the ability to maybe have a button like run the output this output and schedule this output and then uh it will allow us to enter through that door for  
**Richard Blythman:** In other words, like are you do you mean that when we run us,  
**Thomas Goubin:** scheduling.  
**Richard Blythman:** we have to rerun all of the outputs rather than like just a single output?  
**Thomas Goubin:** Right now in the demo it shows like you render everything when when you run the and I don't think it's  
**Richard Blythman:** Yeah. Yeah.  
**Thomas Goubin:** good. I think you need to render only the output but the question is how do you render the graph first? I don't know. But I think right now I'm missing this kind of separation.  
   
 

### 00:17:12

   
**Mohamed Arshath:** Uh yeah.  
**Thomas Goubin:** Sorry.  
**Mohamed Arshath:** uh what what I'm uh thinking is like we will have uh if I can share can you see okay so I'm think I'm I'm thinking like okay we'll  
**Thomas Goubin:** Yes.  
**Mohamed Arshath:** have like for example we go from here here and then uh yeah let's forget about these first like once we have like here I will have like schedule extraction of a context graph right. Uh so for this project this context graph can be pulled at many different times and then for here like we will have oh just schedule this just schedule this  
**Thomas Goubin:** Yeah. Yes.  
**Mohamed Arshath:** uh  
**Thomas Goubin:** But why would I need to schedule the context graph  
**Mohamed Arshath:** okay that's a good question like for example let's say if we are pulling different reports  
**Thomas Goubin:** creation?  
**Mohamed Arshath:** weekly and weekly new reports are coming then we have to reynthesize the context graph before writing the  
**Thomas Goubin:** Okay. So it's to kind of sync.  
**Mohamed Arshath:** report.  
**Thomas Goubin:** We can explain this as the context graph is a way to sync to our  
   
 

### 00:18:20 {#00:18:20}

   
**Richard Blythman:** Yeah.  
**Thomas Goubin:** database the different inputs.  
**Mohamed Arshath:** Data sources.  
**Thomas Goubin:** Okay.  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** For us to generate output based on structured data that we have put in our  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** graph. It's so when you create when you when you run an output it will use the data  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** in the graph and not the row data in all the sources allowing to save money save token all  
**Mohamed Arshath:** Yeah. Yeah.  
**Thomas Goubin:** this kind of stuff.  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** Is that correct?  
**Mohamed Arshath:** Or we can say that when this is running, we will just try to run this first and then run this.  
**Richard Blythman:** Do you need to schedule them separately or do you It's a good question.  
**Thomas Goubin:** Oh, okay. Okay, got it.  
**Mohamed Arshath:** So which one do you Yeah.  
**Thomas Goubin:** Oh.  
**Mohamed Arshath:** Which one do you prefer? like uh but the the the problem is like we need to uh like for example let's say the schedule for this and this is separate I mean this is and doesn't have to be figured out today but like you know like we learned that this process can be expensive uh so uh which is why  
   
 

### 00:19:29 {#00:19:29}

   
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** like I like to think of this as one process and then this as the second process uh so yeah like  
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** uh that we have to figure out like But maybe we can start with like we can schedule this schedule this you know schedule this like maybe uh once a week and then yeah this like this can be once a week but this is once a month you know that sort of  
**Thomas Goubin:** Yeah. Yeah.  
**Mohamed Arshath:** thing and then what I'm also think yeah sure  
**Thomas Goubin:** Yeah. I would say the graph should re should refresh every day and the output uh  
**Mohamed Arshath:** that yeah maybe it's like every day like yeah like  
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** weekly uh then like we can potentially show like okay when I click here like  
**Thomas Goubin:** Yeah.  
**Mohamed Arshath:** it doesn't go here but like like all the historical runs and then I can select uh that's  
**Thomas Goubin:** Yes. Yes. Yes.  
**Mohamed Arshath:** one way uh then maybe if you want a different view then we maybe not for the demo like uh if we can have like inbox uh representation for each uh project dash uh report uh in the as an as an  
   
 

### 00:20:32

   
**Thomas Goubin:** Mhm.  
**Mohamed Arshath:** inbox item and then when we click it's like a thread you can see all the different reports that was produced used  
**Thomas Goubin:** Okay. Interesting.  
**Richard Blythman:** Interesting. Yeah, I was thinking um one reason you might want to do the context graph separately is a lot of people ask for like  
**Mohamed Arshath:** like  
**Richard Blythman:** alerts like on certain I don't know if a certain number if a lot of feature requests are coming in for the same thing they want like an alert to like basically say that which is kind of separate to the output documents right and you could imagine for something like blockers the proactive pattern analysis just requires the context graph it doesn't require like the document outputs and so like you could set up alert It's on.  
**Thomas Goubin:** Oh, we could have even insights on the context graph we was without generating a report.  
**Richard Blythman:** Yes.  
**Thomas Goubin:** That's what you mean. It's could be like interesting.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** Very interesting. I didn't realize that we're going to architecture the the agent that way.  
   
 

### 00:21:29 {#00:21:29}

   
**Thomas Goubin:** So sources context graph then pulling data from the context graph to answer and and build the  
**Richard Blythman:** No,  
**Thomas Goubin:** report. That's actually a differentiation from cloud co-work because it doesn't generate any intermediary graph does it?  
**Richard Blythman:** unless you use a memory  
**Thomas Goubin:** So it so it's something we do. So that's that's a feature unique feature that we we are doing kind of one specific area we think will provide better results by using this methodology. Is that correct?  
**Richard Blythman:** Exactly. Yeah.  
**Thomas Goubin:** Interesting. Okay.  
**Richard Blythman:** Ontology is one of the main um  
**Thomas Goubin:** Okay. Okay. With the representation of andies. Okay. Okay. Very  
**Richard Blythman:** another question is like this is like getting way beyond ourselves but  
**Thomas Goubin:** cool.  
**Richard Blythman:** like how does the memory this is like a kind of a memory just for this synthesis flow but like how does this memory feed into like the memories of the other flows and stuff like that?  
**Thomas Goubin:** Yeah, we need to figure it out.  
   
 

### 00:22:29 {#00:22:29}

   
**Mohamed Arshath:** Yeah. Like we will have we'll have like a company memory here.  
**Thomas Goubin:** Global memory. But that's good.  
**Mohamed Arshath:** Yeah.  
**Thomas Goubin:** That that ties to the company observability CS that I have. So that that could be awesome. In  
**Richard Blythman:** That'd be super cool. Yeah.  
**Thomas Goubin:** fact,  
**Richard Blythman:** And then also um how do the outputs like sometimes we'll want to use outputs between different synthesis flows as well. So like we kind of need a centralized like what if uh like the example that came from Autodesk is they for their monthly progress reporting they  
**Thomas Goubin:** Hold  
**Richard Blythman:** want their fourp progress reports are feeding as input and so like in other words some of the outputs generated by some synthesis flows will become like inputs to another flow. So you can imagine that we have two different projects where one is like the four PS reporting and one of them is the monthly progress  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** reporting. when we're in the monthly progress reporting project, how do we like get the output from the fourps project to pass as input?  
   
 

### 00:23:26

   
**Richard Blythman:** So we need some kind of like centralized documents, some way of sharing docs between like flows and that sort of  
**Thomas Goubin:** That reminds me something I think at some point we it would be cool to work on is how the different agent interacts uh between each other through maybe a chat channel. It's a bit like that. How do you share inputs from different sources and how can you see it in real time or force it or use it yourself? No, it's it's cool.  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** May maybe we could um fake a little button on the left for um company memory or something like that just for us during the demo to mention it without building everything Argie because um the purpose again I think what I like about this process we've done this week  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** is that we can have inputs without building the real thing but to understand if that's something we need to to spend time building and if we can hint on that during some of our calls it would be great to have some early insight on something we didn't even sketch you know uh so that would be great and for the sake of the demo u definitely during the workflow we need to highlight this architecture that we chose uh Richard talking about entities and so on because I didn't realize but that's a key um positioning at  
   
 

### 00:24:44 {#00:24:44}

   
**Thomas Goubin:** some it's something that we chose to do and it's kind of unique  
**Richard Blythman:** Yeah. Yeah. I think it's Yeah. It's one of our unique things for sure. Um Yeah. I think this is super cool. I'm excited about this. I think like just exploring all of these different areas for future improvements shows that there's like a ton of interest and I think it's all quite novel.  
**Thomas Goubin:** Yep.  
**Richard Blythman:** Um and we're starting to figure out the abstractions like um like I don't know maybe this is like some how do we scope memory? like how is each project how do we define which parts of memory each project can see and how they tie in with the larger memory and stuff like that. These are all interesting architectural questions. Um okay, cool. I um I'm going to continue to think about the demos for the rest of the day. Like it's possible I might realize we need something, Arshie, and I'll I'll say that to you before I go to sleep.  
   
 

### 00:25:42 {#00:25:42}

   
**Richard Blythman:** And then um you'll be up before us. So maybe it's something you can uh you can work on before the first demo tomorrow. Um I also realized, by the way, there's a ton of work to do on actual agent building for this. So, not only just the back end, but also like building out all of the skills, making sure like the like the data analysis works for each one. Like there's going to be a ton of like agent building work that we do. Assuming they say, "Yeah, this UI is cool. This would be amazing. Let's do this." Um,  
**Thomas Goubin:** Yeah,  
**Richard Blythman:** there's going to be a ton of agent building  
**Thomas Goubin:** it will definitely impact what we do next week if we should do another discovery sprint or if we do some kind of execions execution sprint because we have to go to phase two towards selling  
**Richard Blythman:** Yeah.  
**Thomas Goubin:** that and I think this is part of the global process of what we should do maybe I don't know just throwing ideas in the air but um if on Friday we have something promising then we execute the next week and try to sell it to to like to close the deal or to sell it to others.  
   
 

### 00:26:45 {#00:26:45}

   
**Thomas Goubin:** If not, then we go back to the drawing board and do a discovery sprint again. Maybe something like  
**Richard Blythman:** Yeah, if they say they want the Electron app next week,  
**Thomas Goubin:** that.  
**Richard Blythman:** like you guys thinking the same, it makes sense to do a delivery and Ar can work on that maybe while me and you do some more  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** discovery.  
**Thomas Goubin:** Yeah. And test and test the agent as well.  
**Richard Blythman:** Uh like it doesn't need to be a UI discovery like it  
**Thomas Goubin:** There's going to be a lot of testing, I think.  
**Richard Blythman:** could be a agent discovery like just to discover whether the types of analyses that we can do are useful to them and  
**Thomas Goubin:** Yes.  
**Richard Blythman:** that could just be Yeah.  
**Thomas Goubin:** Yeah. Or even do some pre-sale stuff because imagine B say yes. Then could I run some call with Thomas and gather more data for us to start training and start building the skills and the  
**Richard Blythman:** Yeah, it could be discovery on sales like basically because I was just ask I just had a meeting with  
   
 

### 00:27:24

   
**Thomas Goubin:** agents.  
**Richard Blythman:** um Lucas from Bolt um and he he was really interested. We might I actually said I'd demo to him next week.  
**Thomas Goubin:** Oh, cool. Okay.  
**Richard Blythman:** He's like interested in continuing to like meet and give feedback and stuff.  
**Thomas Goubin:** Awesome.  
**Richard Blythman:** It's a little bit hard with Bolt in terms of like the data. Um, but what I was asking him was like if I was like I can give you I can give him prompts and he can run them and then he could say like this prompt didn't work.  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** Uh or like reports are quite interesting for him. So he could say like the report is too generic.  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** Um so we can still get feedback even if they can't share any data whatsoever I guess. Um,  
**Thomas Goubin:** Okay.  
**Richard Blythman:** but I I was also asking him like can if if we give him an Electron app, like he can run prompts himself. We can like share prompts with him by email and he can run them, right?  
   
 

### 00:28:20 {#00:28:20}

   
**Richard Blythman:** But like what if we give him an Electron app to run locally and I like that will be nice for him because he'd have the UI to be able to do this synthesis work.  
**Thomas Goubin:** Yeah,  
**Richard Blythman:** I And I actually don't he was like I don't know if I can do that.  
**Thomas Goubin:** it depends of the level of security. For instance, I was talking to my brother last week and he told me even if something is run locally, but it's an app I need to run on my on my machine on my business machine, then I will need approval. So, but it's a bank, so that that might be different. That might be  
**Richard Blythman:** Yeah,  
**Thomas Goubin:** extreme.  
**Richard Blythman:** I like Electron is likely easier than hosted SAS.  
**Thomas Goubin:** Yeah. Yeah, of course.  
**Richard Blythman:** That was one of my realizations. And so maybe if it makes us easier to get in there,  
**Thomas Goubin:** Mhm.  
**Richard Blythman:** maybe that is a reason to have an Electron app first until we go through the like larger approval.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** And then there's like different levels of things that we can share.  
**Thomas Goubin:** Yeah.  
**Richard Blythman:** We can share prompts like we can share a repo with a skill because that's just a pro. they can probably run that themselves like where is the line there with different companies. I think that's something do discovery on basically and um yeah figure out exactly what shape of product we can deliver to them in the short term versus long term. So we could we could work on that next week as well.  
**Thomas Goubin:** Yeah, perfect. Good. Go.  
**Richard Blythman:** Uh cool. All right. Exciting stuff.  
**Thomas Goubin:** Cool.  
**Richard Blythman:** I um yeah I'm really excited about this and also I want to use this myself next week.  
**Thomas Goubin:** Oh, yeah. No, good idea. Good idea.  
   
 

### Transcription ended after 00:30:13

*This editable transcript was computer generated and might contain errors. People can also change the text after it was created.*