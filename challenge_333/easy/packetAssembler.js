/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		/**
		 * assemble packets
		 * @param {String} [packets] - incoming packets
		 *
		 * @return {Array} [assembled packets]
		 */
		function assemblePacket(packets) {
			let assembled = new Map();
			packets.split("\n").map(packet => packet.trim()).forEach(packet => {
				const info = packet.match(/(\d+\s*)+/)[0];
				const [id, index, total] = info.match(/\d+/g).map(Number);
				const content = packet.slice(info.length);
				let message = assembled.has(id) ? assembled.get(id) : new Array(total);
				message[index] = content;
				assembled.set(id, message);
			});
			return assembled;
		}
		//default input
		console.log(`%cDefault Input: `, "color : red;");
		let input = `6220    1   10  Because he's the hero Gotham deserves, 
							   6220    9   10   
							   5181    5   7   in time, like tears in rain. Time to die.
							   6220    3   10  So we'll hunt him. 
							   6220    5   10  Because he's not a hero. 
							   5181    6   7    
							   5181    2   7   shoulder of Orion. I watched C-beams 
							   5181    4   7   Gate. All those moments will be lost 
							   6220    6   10  He's a silent guardian. 
							   5181    3   7   glitter in the dark near the Tannhäuser 
							   6220    7   10  A watchful protector. 
							   5181    1   7   believe. Attack ships on fire off the 
							   6220    0   10  We have to chase him. 
							   5181    0   7   I've seen things you people wouldn't 
							   6220    4   10  Because he can take it. 
							   6220    2   10  but not the one it needs right now. 
							   6220    8   10  A Dark Knight.`;
		console.log(assemblePacket(input));							   
	});
})();			