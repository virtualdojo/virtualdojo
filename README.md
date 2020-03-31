# VirtualDojo ✌️

> How can you organize a Virtual CoderDojo during a national lockdown? 

Angela and other mentors from CoderDojo Bologna, Padova and Turin wrote [some notes](https://medium.com/@angiulina1984/tutto-quello-che-serve-sapere-per-organizzare-un-virtual-dojo-8f3e5ec45a08) (in 🇮🇹) after the first Virtual Dojo.

We found extremely useful to build a static website where to host our online meeting. It runs [Jitsi Meet API](https://github.com/jitsi/jitsi-meet/blob/master/doc/api.md) which generates an iframe - the features are the same as the online client, but thanks to this approach we are able to use a custom webpage where are listed all the available rooms. For a user it just requires a click to change the room.

You can customize the page as you want just changing some values in the configuration file. You can find more details ([customization](#customization)) and some an [example](https://github.com/peterampazzo/virtualdojo/blob/master/config.example.json).

# Development
You may incur to some errors running this webpage locally as it tries to fetch the config file. You should serve the website (e.g. using [`serve`](https://github.com/zeit/serve)).

# Customization

You can customize the webpage by editing the configuration file (here you can find an [example](https://github.com/peterampazzo/virtualdojo/blob/master/config.example.json)).

In details:
* `main` - is the Jitsi Meet main room where every users will join on the page load
* `support` - support room (Optional)
* `imgPath` - path where images are located (e.g. `assets/images/`)
* `date`:
  * `event` - event date that will include in the navbar
  * `start` - event start date, since then it will be not possible to join the meeting (UTC Timezone)
  * `end` - event end date, same effect as previous one (UTC Timezone)

For each room/meeting, it is required:
* `name` - it will appear in the room box
* `img` - it will be set as background
* `jitsi` - meet id associated
* `members` - all members belonging to the room

# FAQ
### Why Jitsi Meet?
It's free and open source. You don't need any account and it allows multiple users to share their screen.

### How do I choose the ID of the meet?
> Jitsi does not require any sort of pre-meeting setup so all you need to worry about is picking up URLs that are **unique** enough.

### Does it work on any device?
Nope. It works only on desktop.

### How the date check works?

The first screen changes based on the current date - there are three options: 
* [before](https://raw.githubusercontent.com/peterampazzo/virtualdojo/master/demo/event-not-started.png) 
* [during](https://raw.githubusercontent.com/peterampazzo/virtualdojo/master/demo/event-started.png)
* [after](https://raw.githubusercontent.com/peterampazzo/virtualdojo/master/demo/event-ended.png)