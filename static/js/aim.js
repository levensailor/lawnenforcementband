(function () {
  var PLAYER_NAME = "xXLawnCopXx";
  var chatOffsetX = 240;
  var chatOffsetY = 80;

  var bots = {
    skater_chic_81: {
      greetings: [
        "omg HIIII!! finally ur online lol i was so bored",
        "hey!! wuts up?? i was just thinking about u haha",
        "FINALLY!! ive been sitting here like 🛹 waiting for someone to talk to",
        "yo!! i was just listening to blink 182 and thought id say hey lol",
        "omg ok so i have to tell u something... actually hi first lol"
      ],
      keywords: {
        skate: [
          "dude i FINALLY landed my kickflip!! only took like 3 months lol",
          "omg skating is literally my whole life rn",
          "the skate park by the mall is the best, we go every weekend",
          "i wiped out SO bad yesterday but it was worth it lol"
        ],
        skating: [
          "omg yes skating!! thats literally all i do lol",
          "i was at the park all day and my knees are destroyed but worth it",
          "do u skate?? u should come to the park sometime just sayin 👀"
        ],
        music: [
          "omg blink 182 is literally everything to me rn",
          "im downloading stuff on napster rn shhhh lol dont tell anyone",
          "have u heard \"what's my age again\"?? literally OBSESSED",
          "no doubt is also SO good, tragic kingdom is perfect",
          "i made a new winamp playlist and its perfect, took me 2 hours lol"
        ],
        napster: [
          "lol i use it every day shhh dont tell the record labels haha",
          "i downloaded like 40 songs yesterday my mom would kill me if she knew",
          "the dialup takes forever but its so worth it omg"
        ],
        band: [
          "omg lawn enforcement is SO GOOD!! u guys rock!!",
          "i have ur song on my winamp playlist i listen to it literally every day",
          "when r u guys playing again?? i def wanna come!!",
          "my friend sarah thinks ur band is cute btw lol just saying"
        ],
        lawn: [
          "LAWN ENFORCEMENT!! omg ur famous lol",
          "i have ur song on repeat rn no joke",
          "ur music is so good!! when r u guys playing again??"
        ],
        hi: [
          "HIII!! omg finally lol",
          "heyyyy!! wuts gooddd!!",
          "omg hi!! i was literally just about to go away lol good timing"
        ],
        hey: [
          "HEY!! omg im so glad ur online",
          "heyyy!! wuts up!!",
          "hey hey hey!! lol wuts good"
        ],
        hello: [
          "hello!! omg hi lol",
          "helloo!! wuts up??"
        ],
        how: [
          "im good!! just chilling and avoiding homework lol",
          "pretty good!! went skating earlier and wiped out SO bad omg",
          "ugh tired lol i was on AIM til like 2am last night"
        ],
        school: [
          "ugh dont even talk to me about school rn lol",
          "i have SO much homework but this is way more important",
          "my teacher mr henderson is literally the worst omg",
          "i failed a test today but tbh i was on AIM during study hall lol"
        ],
        bye: [
          "nooo dont go!! :( fine brb mom is calling anyway lol",
          "byeee!! ttyl!! don't forget to sign my guestbook!! ✌️",
          "ok fine bye!! u better be on later tho"
        ],
        cool: [
          "omg i KNOW right!!",
          "right?? so cool lol",
          "OMG YESSS"
        ],
        lol: [
          "LOLLLL ikr",
          "hahaha omg same",
          "lmaooo fr tho"
        ],
        asl: [
          "lol u first!! jk im 16 / f / nj. u??",
          "omg thats such an AIM thing to ask lol. 16/f/suburbs"
        ],
        cute: [
          "omg stoppp ur making me blush lol",
          "haha ur cute too lol... wait i mean. nevermind lol",
          "😊😊😊 lol"
        ],
        crush: [
          "omg why are u asking?? do u like someone?? spill!!",
          "ok so theoretically... like if someone had a crush on someone... what would u do lol asking for a friend",
          "TELL ME EVERYTHING lol who is it"
        ]
      },
      fallback: [
        "lol omg that's so random haha",
        "wait what?? lol explain",
        "omg same!! kinda?? lol",
        "haha no wayyy",
        "brb my mom is yelling... ok im back lol",
        "omg i just changed my away message wanna hear it?? \"~*skating thru life*~ 🛹 probably at the park\"",
        "ok wait i have to tell u something. nevermind. ok i will. nevermind lol",
        "ugh this dial-up is so slow today sorry if i disappear",
        "omg my little brother keeps walking in here SO annoying",
        "do u have a geocities page?? mine is geocities.com/skaterchic81xo check it out!!",
        "i changed my profile like 3 times today lol i can't decide what font to use",
        "have u ever had a crush on someone and ur too scared to tell them?? asking for a friend lol",
        ":) :) :) lol",
        "omg wait hold on brb... ok im back sorry what were we talking about lol",
        "ur funny lol i like talking to u",
        "ok i dare u to change ur away message to something embarrassing lol",
        "what's ur screen name theme?? mine is obviously skating related lol",
        "omg i have so many songs on my playlist rn it's like 200 songs lol"
      ]
    },

    lawn_enforcement_manager: {
      greetings: [
        "Kid! Morty here. Your manager. Big things happening. BIG.",
        "Finally online. Listen, I've been on the phone all morning. Big moves.",
        "Morty Goldstein, your manager. I have NEWS. Well, potential news.",
        "Kid! Good timing. I just got off the phone with someone. They didn't answer but I left a message."
      ],
      keywords: {
        hi: [
          "Hi! Good. Two words: PYROTECHNICS. Well that's one word but still.",
          "Hi! Perfect timing. I have a proposition. Medium-sized proposition.",
          "Hi kid! Big news. Well, developing news. Stay tuned."
        ],
        hey: [
          "Hey kid! Good timing. I have a proposition.",
          "Hey! Perfect. We need to talk about the setlist.",
          "Hey hey! Morty here. Big day. Well, medium day."
        ],
        hello: [
          "Hello! Great. Listen. Do you have a fax machine?",
          "Hello kid! Morty here. We need to talk branding."
        ],
        gig: [
          "Just got off the phone with the VFW Hall. They want a $40 deposit. You got $40?",
          "I booked you guys at the Pizza Hut parking lot on Route 9. August 9th. Prime real estate.",
          "The block party is confirmed. They're also hiring a face painter. Good crowd energy.",
          "I'm working on an Applebee's happy hour slot. Not confirmed but I have a good feeling."
        ],
        show: [
          "The Rec Center show is happening. I just need to find out if they have a PA.",
          "Turnout at the last show was phenomenal. Estimated 14-16 people.",
          "I'm thinking fog machine for the next show. Does anyone in the band have a fog machine?"
        ],
        money: [
          "Look, 15% is VERY reasonable for a manager of my caliber.",
          "We split the door 60/40. That's 60 for expenses, 40 for the band. Very standard.",
          "I spent $12 on long distance calls this week alone. You're welcome.",
          "The merch should pay for itself. Eventually. Give it time."
        ],
        merch: [
          "The t-shirts are being printed. GRASS GREEN. My idea, you're welcome.",
          "Bumper stickers: minimum order was 500. Already ordered them. They're coming.",
          "What about trucker hats? I have a guy. Well I have a guy who knows a guy."
        ],
        music: [
          "I sent the demo tape to 3 labels. Priority mail. Very professional.",
          "My cousin knows a guy at a regional radio station. We're THIS close to airplay.",
          "The tape sounds great. I listened to it in my Buick. Very loud. Good sign."
        ],
        record: [
          "Sent the demo to 3 labels. Priority mail. Very professional.",
          "I know a studio. It's a guy's garage but he has a mixer. Could be the one."
        ],
        band: [
          "Great group of kids. Real talent. I've been in this business since '87.",
          "I managed a Hootie cover band for 6 months. I know what I'm doing.",
          "You guys need more cowbell. Actually no. Different advice. More ENERGY."
        ],
        lawn: [
          "Lawn Enforcement is a BRAND. We treat it like one.",
          "The name is gold. Very marketable. I told my wife and she said \"what?\" That means it's edgy."
        ],
        contract: [
          "I have the contracts right here. Just need a fax machine.",
          "Seven-year deal. Very standard in the industry. Everyone does seven years.",
          "Do you have a fax machine? My printer might also be a fax. I'm not sure how."
        ],
        tour: [
          "\"Mow The Line\" Summer Tour. That was MY idea by the way. The name.",
          "I'm mapping out routing. Mostly towns within 45 minutes. Gas is expensive.",
          "The tour van situation is being worked on. Does anyone in the band have a van?"
        ],
        how: [
          "Busy! On the phone, working deals. That's the manager life.",
          "Great! Just got off a call with a promoter. Well, I called him. He didn't answer. But progress.",
          "Living the dream kid. 15% of the dream."
        ],
        bye: [
          "I'll have my people call your people. I AM your people. I'll call myself.",
          "Good talk. I'm going to send some faxes. Big moves.",
          "Alright kid. Morty out. Think about the pyrotechnics."
        ],
        pyrotechnics: [
          "YES. I'm thinking sparklers minimum. Maybe bottle rockets. Very safe.",
          "I already looked into it. There are regulations but where there's a will there's a way.",
          "The VFW Hall said no pyrotechnics. That's just their OPENING negotiating position."
        ],
        fax: [
          "I need to send you some contracts. What's your fax number?",
          "My fax machine is also a printer I think but I only know how to print.",
          "The fax is very important in this industry. Very professional."
        ]
      },
      fallback: [
        "Listen, I've been thinking about the brand. BIG thoughts.",
        "My cousin knows a guy. That's all I'll say right now.",
        "Do you have a fax machine? I need to fax some documents.",
        "I've been in this business since 1987. I know what I'm doing.",
        "What if the band wore matching outfits? Grass green. My idea.",
        "I spent all morning cold-calling venues. Left 4 voicemails. Great momentum.",
        "The Pizza Hut parking lot is bigger than it sounds. Very versatile space.",
        "My pitch: it's like Nirvana meets lawnmower. That's the whole pitch.",
        "The bumper stickers are at the printer. 500 units. Already paid. You're welcome.",
        "My business card says 'Entertainment Manager & Consultant.' Very professional.",
        "Have you considered a mascot? I'm thinking a lawnmower with sunglasses.",
        "The label hasn't called back yet but no news is good news in this industry.",
        "I told my barber about the band. He seemed interested. Could be a lead.",
        "What's the merch situation? We need to monetize the brand ASAP.",
        "I have a good feeling about this year. Last year I also had a good feeling. But THIS year.",
        "I'm working on a press kit. Do you have a photo? Anything? Even a school photo?",
        "The Applebee's contact said 'maybe.' In my experience maybe means yes."
      ]
    }
  };

  var chatState = {};
  var spawnX = 240;
  var spawnY = 80;

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".aim-buddy").forEach(function (buddy) {
      buddy.addEventListener("dblclick", function () {
        openChat(buddy.getAttribute("data-buddy"));
      });
    });
  });

  function openChat(buddyName) {
    var existingWin = document.getElementById("aim-chat-" + buddyName);
    if (existingWin) {
      existingWin.classList.remove("hidden");
      DesktopManager.bringToFront(existingWin);
      return;
    }
    createChatWindow(buddyName);
  }

  function createChatWindow(buddyName) {
    var win = document.createElement("div");
    win.id = "aim-chat-" + buddyName;
    win.className = "window desktop-window aim-chat-window";
    win.style.cssText = "width:420px; left:" + spawnX + "px; top:" + spawnY + "px;";
    spawnX += 24;
    spawnY += 24;

    win.innerHTML =
      '<div class="title-bar">' +
      '  <div class="title-bar-text">Instant Message with ' + buddyName + "</div>" +
      '  <div class="title-bar-controls">' +
      '    <button aria-label="Minimize" data-action="minimize"></button>' +
      '    <button aria-label="Close" data-action="close"></button>' +
      "  </div>" +
      "</div>" +
      '<div class="window-body aim-chat-body">' +
      '  <div class="aim-chat-to-bar">To: <strong>' + buddyName + "</strong></div>" +
      '  <div class="aim-chat-log" id="aim-log-' + buddyName + '"></div>' +
      '  <div class="aim-typing-indicator" id="aim-typing-' + buddyName + '"></div>' +
      '  <div class="aim-chat-toolbar">' +
      '    <button class="aim-fmt-btn"><b>A</b></button>' +
      '    <button class="aim-fmt-btn"><b>B</b></button>' +
      '    <button class="aim-fmt-btn"><i>I</i></button>' +
      '    <button class="aim-fmt-btn"><u>U</u></button>' +
      '    <span class="aim-fmt-sep">|</span>' +
      '    <select class="aim-font-select"><option>Arial</option><option>Times New Roman</option><option>Comic Sans MS</option><option>Courier New</option></select>' +
      '    <select class="aim-font-size"><option>10</option><option selected>12</option><option>14</option><option>18</option></select>' +
      "  </div>" +
      '  <div class="aim-chat-input-area">' +
      '    <textarea class="aim-input" id="aim-input-' + buddyName + '" placeholder="Type a message..."></textarea>' +
      '    <div class="aim-send-row">' +
      '      <button class="aim-send-btn" id="aim-send-' + buddyName + '">Send</button>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    document.getElementById("desktop").appendChild(win);
    chatState[buddyName] = [];

    DesktopManager.initWindow(win);
    DesktopManager.bringToFront(win);

    var sendBtn = document.getElementById("aim-send-" + buddyName);
    var input = document.getElementById("aim-input-" + buddyName);

    sendBtn.addEventListener("click", function () { sendMessage(buddyName); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(buddyName);
      }
    });

    // Bot sends opening greeting
    setTimeout(function () {
      appendMessage(buddyName, buddyName, randomFrom(bots[buddyName].greetings), "recv");
    }, 700);
  }

  function sendMessage(buddyName) {
    var input = document.getElementById("aim-input-" + buddyName);
    var text = input.value.trim();
    if (!text) return;

    appendMessage(buddyName, PLAYER_NAME, text, "sent");
    input.value = "";

    var typingEl = document.getElementById("aim-typing-" + buddyName);
    typingEl.textContent = buddyName + " is typing...";

    var delay = 1100 + Math.random() * 2200;
    setTimeout(function () {
      typingEl.textContent = "";
      appendMessage(buddyName, buddyName, getBotResponse(buddyName, text), "recv");
    }, delay);
  }

  function appendMessage(buddyName, sender, text, type) {
    var log = document.getElementById("aim-log-" + buddyName);
    var row = document.createElement("div");
    row.className = "aim-msg aim-msg-" + type;

    var now = new Date();
    var h = now.getHours(), m = now.getMinutes();
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    var timeStr = h + ":" + (m < 10 ? "0" : "") + m + " " + ampm;

    row.innerHTML =
      '<span class="aim-msg-sender">' + escapeHtml(sender) + "</span>" +
      ' <span class="aim-msg-time">(' + timeStr + ")</span>" +
      '<span class="aim-msg-colon">: </span>' +
      '<span class="aim-msg-text">' + escapeHtml(text) + "</span>";

    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function getBotResponse(buddyName, text) {
    var bot = bots[buddyName];
    var lower = text.toLowerCase();
    for (var kw in bot.keywords) {
      if (lower.indexOf(kw) !== -1) {
        return randomFrom(bot.keywords[kw]);
      }
    }
    return randomFrom(bot.fallback);
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function escapeHtml(str) {
    var d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }
})();
