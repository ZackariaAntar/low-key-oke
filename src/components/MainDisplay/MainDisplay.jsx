import YouTube, { YouTubeProps } from "react-youtube";
// https://github.com/tjallingt/react-youtube
function MainDisplay(){
    const dummyCode = 'xyz123'
    const dummyUrls = [
		{url: "KZnou4zthz4"},
		{url: "5EQIiabJvk"},
	];
    const onPlayerReady = (event) => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};

    const options = {
		height: "390",
		width: "640",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
            controls: 1,

		},
	};
    return (
		<>
			<h1>{dummyCode}</h1>
			<div>
				<YouTube
					videoId=""
					opts={options}
					onReady={onPlayerReady}
				/>
			</div>
			<div>
				<h2>
					ON DECK: show the 1st index from the array for the song
					queue table
				</h2>
			</div>
		</>
	);
}

export default MainDisplay

