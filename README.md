# Fig Coding Challenge

October 2021

![design3](https://github.com/nicholasoxford/fullstack-challenge/blob/main/fig/1234.png)

## Read Through

> Build an app similar to Fig's autocomplete

Thinking about typing a command line argument
First thought is a CLI argument is an array of strings

I've never heard of skypack - neat.

Annotating will be an interesting challenging

I will begrudgingly use NextJS. I am better with Vue3 w/ comp api

## Thought process

Wow - this was a pretty fun project. I hoped to keep better notes throughout the process, but I think that would've messed up the flow I had going. Looking forward to getting feedback from y'all on how I can improve my repo.

This was also my first ever React app. I knoww _things_ about React from Twitter, but I've never actually dove in and started using something like useState. I work in Vue fulltime, and while I could've finished the frontend in about 40% of the time, it's good to chew glass and learn the dang technology.

At certain points, my React code was cleaner. I had a more atomic setup, but with the complexity came compromises. I could've continued to hand-code css in Tailwinds, Which I will get to in a second, but I knew it would be helpful to import a component library. Once I started using the component library, it became harder to access state, and the only way I could figure out how to get it working was to bring some components back to index.tsx.

On Tailwinds - I don't know how you feel about Tailwinds, but I am very split on it. While for things like a weekend project, Tailwinds is perfect, I feel like the syntax isn't collab-friendly. I get it, you can learn it quickly, but it just doesn't feel right. If I was going to plan a little bit better, I would've used purely material UI from the start and just ignored Tailwinds. All though it came in handy in a few places.

Timewise, I probably spent a day and a quarter worth of (mythical) man-hours. The parser was a challenge at first. I've never wrote a parser, and merely figuring out how I was going to format the response Object took a bit of soul searching. This is where Typescript was honestly so helpful. Time after time it saved my butt when writing the parsing code. Furthermore, structuring that response in TS, from the git-go, actually made it easier to get incremental towards as time went on. Oh, I need to change the response from a single string to an array of strings - here are all the places this will impact. I used to think that typescript would be a hindrance in weekend projects, nope.

Other design decisions. If I had more time I would make the components more atomic. CLEARLY, I could improve the file ArgumentInfo.tsx, the three components are the same thing. Yet - because of my lack of React skills I was having trouble figuring out small random things. Although, as I am sitting here typing I just figured out how I could use typescript to dynamically pass in titles.

I would've also spent more time on CSS. I think this is purely a fact of learning React on the fly. There are things like how Command, SubCommand, Argument titles aren't all aligned at the end. I would also include more colorful linking between the input and cards. The cards deserve some love too, I would switch them over to Material UI card. I am also kept running into this weird warning case where makeStyles is sending over a different className id than what the client knows, but again it seems solvable. I just don't have the time.

Edge case-wise, my number one goal was to handle all of the test cases. I did that! If I knew the front end was going to take up so much time, I probably would've gone back and made the simplest front end possible, and focus on the parser. However, I think working through the form allowed me to think of edge cases that I otherwise wouldn't. I also know my code quality could be higher. If I woke up tomorrow, drank a cup of coffee, and spent 45 minutes to an hour, I could do some great refactoring. However, it feels right to get this in tonight. I love shipping code.

Key takeaways. 1) Parsing the command line is a trip worth taking. 2) Typescript is always the way 3) This is just the beginning of my React journey.

I also kept it in Typescript strict mode up until I ran npm run build. This was because of a few weird TS errors like `Type instantiation is excessively deep and possibly infinite`. I could only spend so much time on TS errors before other things became more important.

While I didn't nail the frontend, you can see that I largerly followed the mental model I made day of.

Sadly - I realized I didn't write Test :(

Again a by product of not knowing React & limiting my time I put into this to best reflect my skills, but still. I could've written atleast one! I'm also sure my variable naming is subpar, but I often look to my coworkers for naming ideas. It's not my strongest skill. The cool thing is you can diss the crap out of my code and I truly won't care. I see the end goal as the only important one. Oh I missed somehting? Shocker!

![design](https://github.com/nicholasoxford/fullstack-challenge/blob/main/Untitled_Artwork.jpg)
![design1](https://github.com/nicholasoxford/fullstack-challenge/blob/main/Untitled_Artwork_1.jpg)
![design2](https://github.com/nicholasoxford/fullstack-challenge/blob/main/Untitled_Artwork_2.jpg)
![design3](https://github.com/nicholasoxford/fullstack-challenge/blob/main/Untitled_Artwork_3.jpg)
