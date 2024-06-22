export default {
    props: {
        psrc: String,
        pscale: Number,
    },
    template: `<a-entity :scale="pscale+' '+pscale+' '+pscale">
        <a-plane class="video-plane" width="1" height="1" material="shader:flat" :ss-video="psrc"></a-plane>
    </a-entity>`
};

if (AFRAME.components['ss-video']) delete AFRAME.components['ss-video'];
AFRAME.registerComponent('ss-video', {
    schema: {
        type: "string"
    },
    init: function () {
        console.log("init");
        this.assets = document.querySelector("a-assets");
        this.isPlaying = true;
        this.lastTap = 0;

        // Add event listeners for VR controllers and hand tracking directly on the video plane
        this.el.addEventListener('triggerdown', this.handleInteraction.bind(this));
        this.el.addEventListener('pinchstarted', this.handleInteraction.bind(this));

        // Rebind event listeners when the position changes
        this.el.addEventListener('componentchanged', (evt) => {
            if (evt.detail.name === 'position') {
                this.rebindEvents();
            }
        });
    },
    update: function () {
        this.id = crypto.randomUUID();
        this.setimg(this.data, this.id);
    },
    remove: function () {
        this.imgdom.remove();
    },
    setimg: function (src, id) {
        console.log(src);
        return new Promise((resolve, reject) => {
            const im1 = document.createElement("video");
            im1.id = id;
            im1.setAttribute("crossorigin", "anonymous");
            im1.setAttribute("autoplay", true);
            im1.setAttribute("loop", true);

            im1.onloadeddata = () => {
                const as = (im1.videoHeight / im1.videoWidth);
                const bsize = 0.5;
                const h = as > 1 ? 1 : as * bsize;
                this.el.setAttribute("width", (as > 1 ? 1 / as : 1) * bsize);
                this.el.setAttribute("height", h);
                this.el.setAttribute("position", { x: 0, y: h / 2, z: 0 });
                this.el.setAttribute("material", "src", "#" + id);
                resolve(im1);
            };
            im1.src = src;
            this.assets.appendChild(im1);
            this.imgdom = im1;
        });
    },
    handleInteraction: function (event) {
        const currentTime = new Date().getTime();
        const tapGap = currentTime - this.lastTap;

        if (tapGap < 300 && tapGap > 0) {
            this.togglePlayPause();
        }
        this.lastTap = currentTime;
    },
    togglePlayPause: function () {
        if (this.isPlaying) {
            this.imgdom.pause();
        } else {
            this.imgdom.play();
        }
        this.isPlaying = !this.isPlaying;
    },
    rebindEvents: function () {
        // Rebind event listeners for the updated position
        this.el.addEventListener('triggerdown', this.handleInteraction.bind(this));
        this.el.addEventListener('pinchstarted', this.handleInteraction.bind(this));
    }
});
