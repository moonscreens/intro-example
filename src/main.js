import './main.css';
import Chat from 'twitch-chat-emotes';

// a default array of twitch channels to join
let channels = ['moonmoon'];

// the following few lines of code will allow you to add ?channels=channel1,channel2,channel3 to the URL in order to override the default array of channels
const query_vars = {};
const query_parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
	query_vars[key] = value;
});

if (query_vars.channels || query_vars.channel) {
	const temp = query_vars.channels || query_vars.channel;
	channels = temp.split(',');
}

// create our chat instance
const ChatInstance = new Chat({
	channels,
	duplicateEmoteLimit: 5,
})

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');


function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);


let lastFrame = performance.now();
// Called once per frame
function draw() {
	window.requestAnimationFrame(draw);

	// number of seconds since the last frame was drawn
	const delta = Math.min(1, Math.max(0, (performance.now() - lastFrame) / 1000));
	lastFrame = performance.now();

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let o = emoteArray.length - 1; o >= 0; o--) {
		const emoteGroup = emoteArray[o];

		// Keep track of where we should be drawing the next emote per message
		let xOffset = 0;

		for (let i = 0; i < emoteGroup.emotes.length; i++) {
			const emote = emoteGroup.emotes[i];
			ctx.drawImage(emote.canvas, xOffset + emoteGroup.x, emoteGroup.y);
			xOffset = emote.canvas.width;
		}

		// Delete a group after 10 seconds
		if (emoteGroup.spawn < Date.now() - 10000) {
			emoteArray.splice(o, 1);
		}
	}

}

// add a callback function for when a new message with emotes is sent
const emoteArray = [];
ChatInstance.on("emotes", (emotes) => {

	//prevent lag caused by emote buildup when you tab out from the page for a while
	if (performance.now() - lastFrame > 1000) return;

	emoteArray.push({
		emotes,
		x: Math.floor(Math.random() * canvas.width),
		y: Math.floor(Math.random() * canvas.height),
		spawn: Date.now()
	});
})

draw();
