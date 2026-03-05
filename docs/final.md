00:00 Hey Arshy, I just wanted to fill you in with where I got to after I was working, uhm, in the evening.
00:09 So, uh, I went back to the customer problem and I looked at the demos that were giving on Friday. Uh, one of them is with SynthFlow, one is with SoSafe, one is with Autodesk, also Bellina.
00:23 They're all kind of like voices. I'm looking at the transcripts and the problem, uhm, the main problem they all face is taking a lot of different data as input and synthesizing that into some sort of output, like a report or something like that.
00:44 I went back and I updated the sprint map, so, uhm, from when, you know, this product person is gathering signals from different channels, they synthesize into the full picture and then they decide what to build from that.
01:01 And, for example, the guy from SynthFlow, he basically says, you know, he gets a lot of directions, he gets, uhm, you know, from the founders, they kind of give their top-down strategy.
01:12 Into what they want into product, the sales team says, like, what the customers want. The customer success team says what they want.
01:20 Uhm, so, it's coming from a bunch of different data sources and his job is to basically, like, create a PRD and ship something that week.
01:29 So, how do you, like, you know, weight the difference? Uhm, how much do you do the founder versus how much do you listen to the sales team?
01:36 That's it. It's kind of, like, a big part of his job that he finds difficult. I extracted some How Might We's, uhm, as well, and I really tried to, once I had this, like, sprint map, uhm, and also the, kind of, the user problems from the How Might We, I went back.
02:00 And I looked at existing solutions for inspiration, and a lot of what came up was, like, product board, and those sorts of ones, but, uhm, product board, you kind of have to manually tag the different, uhm, like, categories and labels that come up.
02:19 So, uhm, none of the existing product solutions, like product boards, automatically, you know, find these problems. Patterns, that's, like, one gap, and then others, like Dust, and Super.Work, and these sorts of ones, like Glean, they're all horizontal, and, uhm, they mostly just do search, and not synthesis
02:41 , so after kind of, like, looking at existing solutions, I realized, probably the closest is Notebook.LM, because with Notebook.LM, you take a lot of information, data sources, and you synthesize it into, you know, many different formats, so I decided to try Notebook.LM, to see how good it does our synthesis
02:58 problem, right, so, we're also doing a synthesis problem, in that we're trying to take data from a lot of different sources, like, uhm, interviews with customers, and also I added our product strategy from Confluence here that go.
03:13 I also added the vision from Confluence, I also added some, like, the sales email that I sent to Zendesk, because, like, I wanted to kind of simulate some sort of data from sales, gave it a bunch of different stuff, and then I started asking it questions, like, I'm a head of product, deciding what to
03:32 build next, and across all of these sources, what are the top three problems? For each one, show me specifically which sources mention it and what they say.
03:42 And it did, like, an okay job. Then I said, based on these signals, if I had to scope one feature this week, what would you recommend and why?
03:51 And then, like, what are the tensions and contradictions between what the founders want, and what the customers are asking for?
03:58 And all of this was, uhm, was pretty okay, and then I started doing creating a bunch of outputs from it.
04:02 So, you can create a report. Sorry, that's not the report. Creates a report here. And you can also create, it also created this, like, data table, which was actually pretty good.
04:16 Just created this on the fly. And you can also do, like, graphs, right? And this was all extracted, so it extracted our vision and I'm going to go ahead make a Extracted different pain points, which is kind of cool.
04:32 And you can even create, like, podcasts and stuff, obviously. And so I started thinking, like, why wouldn't they just use NotebookLM?
04:43 And one of the answers is, it's kind of generic, right? So, you can't, you can add a few things, like, Google Docs and YouTube videos and stuff, but you can't pass input from, like, support tickets or Notion or, like, other things.
05:03 Sure, you can copy them in, but this isn't really made to work across, like, product data. so that's like one thing so maybe you know on the left hand side for inputs you could add support tickets or whatever else the other thing is you can't add, like, custom outputs and a lot of the stuff that we had
05:23 in our Miro board they're kind of like custom outputs right so like, um, vocabulary map and business impact there's no way of adding these like custom things into NotebookLM right now.
05:40 So I actually think that NotebookLM for product probably solves the problem that all of the people we're demoing to on Friday want.
05:52 Is it differentiated enough? Like, we're not sure, but, uhm, you know, we think that's a pretty interesting, it'd be interesting to get feedback on what they think of.
06:01 Built for product. And, of course, you can also do this in Cloud Code. But, again, it's a little bit more difficult on this bit of setup.
06:13 So, uhm, I started putting together a storyboard that we can work on tomorrow. And it's basically inspired by NotebookLM. So in NotebookLM, you know, you can go to the main projects, That's kind of what this screen is supposed to be, so we could see the difference.
06:35 Projects that we've built for synthesis, so we could have, like, synthesis for user research, which maybe takes transcripts. We can have synthesis for analytics, which maybe takes, like, Mixpanel, as in Buzz.
06:46 We can have one for, like, solution discovery, like, meeting prep. This one could take previous tickets, take, eh, Confluence, take transcripts.
06:55 And then when you click on one of them, like you click on user research, it opens up, and initially it's empty.
06:59 And this is what it looks like when it's empty on notebook.am, so it's basically just the same. and you had a sleep.
07:13 Source, so maybe I choose, like, I want to add, like, transcripts first, and then I want to add some strategy docs, and I want to add support tickets.
07:20 After you add all of those, it looks like this. All of your sources are on the left-hand side, similar to how they are in notebook.am.
07:29 And then, on the right-hand side, we have a bunch of outputs. So reports is still here, but we also have things like PRD and business.
07:37 There's different types of outputs to what we had in notebook.am. And then, in the middle, we decided not to have the chat interface, because I actually don't really find the chat interface that useful on notebook.am.
07:52 It's, like, one of the things I use least. I just want to pass inputs and, like, produce, like, podcasts and stuff.
07:58 And me and Thomas were saying, like, maybe we could have some sort of graph view in the middle. So this kind of happens.
08:06 This does happen. Like, they put the graph, like, over here on the output side, but you could imagine we could just kind of put that in the middle.
08:15 And you could, like, see the table view or the graph view. And this is just kind of, like, inspired by SuperBass currently, but maybe we can do a bit more.
08:23 So basically, you pass your inputs. Then, in the middle you have your context graph that's extracted from the inputs. And then, from the context graph, you can produce various outputs.
08:32 That's kind of the idea here. And then, maybe, like, you can view reports as well. So if you click on Report, it opens up a report on the right-hand side in the same way that NotebookLM does.
08:46 Anyway, that's, uhm, that's where we go. I think, uh, this is kind of the best that we could do at this stage of the week.
08:58 Like, the ambient stuff, uhm, I agree, wasn't really a good fit. Especially, we weren't really solving a problem that any of our people were demoing to once.
09:13 Like, this is kind of like, synthesis work from Thomas Wright, like, select the different inputs, and then some sort of, like, kind of context graph that gets extracted, uhm, more different types of inputs, like, more, kind of, context graph output style stuff, uhm, so yeah, a lot of, Ugh.
09:38 Some of these, I guess these are more actions based on the PR inbox, so we don't really have a PR inbox, I guess, right now.
09:52 I wonder, maybe we could add scheduling to this, right, this is all kind of human in the loop, but maybe we could add scheduling.
10:02 Um, this here, you've got some analysis and reports and that sort of thing, so this is kind of incorporated in our storyboard a little bit.
10:15 So I think, like, basically, based on all of the ideas that we have across our sketches, And given that, we need to decide on something that works for our customers.
10:26 Me and Thomas thought it made sense to go ahead with a kind of, like, notebook LM for product data type thing.
10:33 And I think this does solve the problem that everyone that we've talked to faces. There is a question around differentiation.
10:40 Maybe people will choose to build it themselves on top of core code, but, uhm, I think it would be interesting to test this.
10:46 So, uhm, yeah, feel free to get started, like, prototyping. Coming up with some new ideas around this. And, yeah, we'll meet in the morning and create some prototypes and see where we get to.
11:00 Alright, see you tomorrow.