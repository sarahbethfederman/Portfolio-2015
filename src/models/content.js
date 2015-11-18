var data = {
	about: "Hey! I'm a 4th year creative web developer and New Media Design major at Rochester Institute of Technology. I use cutting-edge technology to design &amp; develop usable applications and interactive experiences. I'm passionate about design &amp; development and I live to learn constantly. My focus is on frontend engineering, but I often hop the fence and work on visual design and UX or do some backend development. I'm currently finishing up my BFA this fall, and then starting a full-time role as a Web Developer at LinkedIn in January. <em>Not currently accepting new clients.</em>",
	projects: {
		"interactive-wall": {
			title: "New Media Interactive Wall",
			subtitle: "Kinect Web Experience",
			description: "For my independent study, I created an interactive video wall to display student work plus a content management web app.",
			slug: "interactive-wall",
			backgroundImage: "",
			tags: [
				"Time: 1 semester",
				"Node.js",
				"Express",
				"Ember JS",
				"React",
				"Kinect"
			],
			content: {
				finalThoughts: ""
			},
			prev: "ntlb",
			next: "portfolio-theme"
		},
		"portfolio-theme": {
			title: "Design Portfolio Development",
			subtitle: "Custom Wordpress Theme",
			description: "For a fun freelance project, I developed a custom wordpress theme to house a client's design work.",
			slug: "portfolio-theme",
			backgroundImage: "",
			tags: [
				"Time: 70 hours",
				"Wordpress",
				"PHP",
				"jQuery",
				"HTML",
				"SCSS"
			],
			content: {
				finalThoughts: ""
			},
			prev: "interactive-wall",
			next: "chadder"
		},
		"chadder": {
			title: "Chadder",
			subtitle: "Website Reboot",
			description: "I designed and developed a new responsive website for RIT-based startup Chadder.",
			slug: "chadder",
			backgroundImage: "mockups/chadder1.jpg",
			logo: "chadder/logo.svg",
			tags: [
				"Time: 3 weeks",
				"UI/UX design",
				"Concept/Strategy",
				"HTML5",
				"jQuery",
				"SCSS"
			],
			content: {
				description: "<p>Chadder is an RIT-based startup. They created an end-to-end encrypted private messaging mobile application. In need of a site redesign, they approached me with the project.I designed the website for my GUI course project and continued on to develop the site, until I helped officially launch the app at CES 2015 in Las Vegas. Utilizing a responsive approach, the site's main function is to increase app downloads. Currently featured on <a class=\"red\"  href=\"http://www.producthunt.com/posts/chadder\" target=\"_blank\">Product Hunt</a>!</p>",
				finalThoughts: "<p>I learned so much from this project! This was the first pure js-driven application I've written. I learned a lot about Canvas, vanilla javascript, AMD, and designing an application structure.</p><p>The interface is lacking, however, though functional. I may try to provide a nicer UI when I have some extra time. I'd also like to include a beat detection library and do more with the Web Audio API.</p>"
			},
			liveSite: "http://chadder.im",
			repo: "https://github.com/sarahbethfederman/Chadder-Redesign",
			prev: "portfolio-theme",
			next: "particle"
		},
		"particle": {
			title: "Interactive Particle Playground",
			subtitle: "HTML5 Canvas Experiment",
			description: "I developed a musical particle experience using HTML5 canvas and the web audio API",
			slug: "particle",
			backgroundImage: "mockups/particle3.jpg",
			tags: [
				"Time: 3 weeks",
				"UI/UX design",
				"Object-oriented JS",
				"HTML5 Canvas",
				"Web Audio API"
			],
			content: {
				backgroundImage: "mockups/particle.png",
				description: "<p>For my Rich Media Web Application Development I class, our first project was a HTML5 canvas project. I chose to create a experimental experience using particle systems and the web audio API. This was a chance for me to get into the nitty gritty of object-oriented javascript and prototypal inheritance.</p>",
				finalThoughts: "<p>I learned so much from this project! This was the first pure js-driven application I've written. I learned a lot about Canvas, vanilla javascript, AMD, and designing an application structure.</p><p>The interface is lacking, however, though functional. I may try to provide a nicer UI when I have some extra time. I'd also like to include a beat detection library and do more with the Web Audio API.</p>",
			},
			liveSite: "",
			repo: "https://github.com/sarahbethfederman/interactive-particle-system",
			prev: "chadder",
			next: "vid-reel"
		},
		"vid-reel": {
			title: "Gallery-R Reel",
			subtitle: "Web Installation Experience",
			description: "I created an HTML5 video immersion interface to display videos with metadata",
			slug: "vid-reel",
			backgroundImage: "mockups/vid-reel.jpg",
			tags: [
				"Time: 3 weeks",
				"UI/UX design",
				"Concept/Strategy",
				"HTML5",
				"Javascript",
				"SCSS"
			],
			content: {
				backgroundImage: "mockups/vid-reel1.jpg",
				description: "<p>The Gallery R exhibit is a visual showing of the history of the New Media Design major, through the use of projection screens leading through the exhibit and interactive installations to keep viewers engaged. My portion of the project involved creating an interactive installation to be displayed on projector screens and iMac displays. Due to current HTML5 video implementation inconsistencies, this application only supports recent versions of Chrome.</p>",
				finalThoughts: "<p>This was a challenging project from both a design perspective and a development perspective and I learned a lot!</p><p>I'd like to work some more on it in the future, and add scrubbing and icons, but also integrate Kinect interactivity so it can be used interactively on a tv or similar setups.</p>"
			},
			liveSite: "",
			repo: "",
			prev: "particle",
			next: "ntlb"
		},
		"ntlb": {		
			title: "News to Live By",
			subtitle: "Custom Wordpress Theme",
			description: "I developed a responsive wordpress theme for a news website during my internship at Lookthink",
			link: "ntlb",
			backgroundImage: "mockups/ntlb1.jpg",
			logo: "ntlb/logo.png",
			tags: [
				"Role: Lead Developer",
				"HTML5",
				"CSS3",
				"Wordpress",
				"PHP",
				"MySQL"
			],
			content: {
				finalThoughts: "<p>This was an awesome project because it really pushed me. I learned some PHP, learned some Wordpress, and had to utilize some of the command line MySQL I learned in my Database class.</p><p>If I could do it again, I would probably redesign the CSS architecture with more'abstract modules to get rid of some bloat. I would also try and do more traditional wordpress techniques, like taking advantage of 'the loop.'</p>"
			},
			liveSite: "http://newstoliveby.net",
			prev: "vid-reel",
			next: "interactive-wall"
		}
	}
};

module.exports = data;