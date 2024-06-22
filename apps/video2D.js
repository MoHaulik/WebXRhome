/*
    SPATIAL SHELL APP
    2D video viewer 
*/

// Register the ss-video component
AFRAME.registerComponent('ss-video', {
    schema: {
        type: "string"
    },
    init: function() {
        console.log("init ss-video");
        this.assets = document.querySelector("a-assets");
        this.isPlaying = true;

        // Add event listener for play/pause
        this.el.addEventListener('togglePlayPause', this.togglePlayPause.bind(this));
    },
    update: function() {
        this.id = crypto.randomUUID();
        this.setimg(this.data, this.id);
    },
    remove: function() {
        if (this.imgdom) {
            this.imgdom.remove();
        }
    },
    setimg: function(src, id) {
        console.log("Setting video source:", src);
        return new Promise((resolve, reject) => {
            const video = document.createElement("video");
            video.id = id;
            video.setAttribute("crossorigin", "anonymous");
            video.setAttribute("playsinline", "");
            video.setAttribute("webkit-playsinline", "");
            video.setAttribute("autoplay", true);
            video.setAttribute("loop", true);

            video.onloadedmetadata = () => {
                const aspectRatio = video.videoHeight / video.videoWidth;
                const baseSize = 0.5;
                const height = aspectRatio > 1 ? baseSize : aspectRatio * baseSize;
                const width = aspectRatio > 1 ? baseSize / aspectRatio : baseSize;

                this.el.setAttribute("width", width);
                this.el.setAttribute("height", height);
                this.el.setAttribute("position", {x: 0, y: height/2, z: 0});
                this.el.setAttribute("material", "src", "#" + id);
                resolve(video);
            };

            video.onerror = (error) => {
                console.error("Error loading video:", error);
                reject(error);
            };

            video.src = src;
            this.assets.appendChild(video);
            this.imgdom = video;
        });
    },
    togglePlayPause: function() {
        if (this.imgdom) {
            if (this.isPlaying) {
                this.imgdom.pause();
            } else {
                this.imgdom.play();
            }
            this.isPlaying = !this.isPlaying;
            console.log(this.isPlaying ? "Video playing" : "Video paused");
        }
    }
});

// Register the video-controls component
AFRAME.registerComponent('video-controls', {
    init: function() {
        this.onTriggerDown = this.onTriggerDown.bind(this);
        this.onPinch = this.onPinch.bind(this);

        // Oculus Touch controller events
        this.el.addEventListener('triggerdown', this.onTriggerDown);

        // Hand tracking events
        this.el.addEventListener('pinchstarted', this.onPinch);
    },

    onTriggerDown: function(evt) {
        console.log("Trigger pressed");
        this.togglePlayPause();
    },

    onPinch: function(evt) {
        console.log("Pinch detected");
        this.togglePlayPause();
    },

    togglePlayPause: function() {
        const videoEl = this.el.querySelector('[ss-video]');
        if (videoEl) {
            videoEl.emit('togglePlayPause');
        }
    }
});

// Export the default object
export default {
    props: {
        psrc: String,
        pscale: Number,
    },
    template: `
        <a-entity :scale="pscale+' '+pscale+' '+pscale" video-controls>
            <a-plane material="shader:flat" :ss-video="psrc"></a-plane>
        </a-entity>
    `
}
