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
        this.togglePlayPause();
    },

    onPinch: function(evt) {
        this.togglePlayPause();
    },

    togglePlayPause: function() {
        const videoEl = this.el.querySelector('[ss-video]');
        if (videoEl) {
            videoEl.components['ss-video'].togglePlayPause();
        }
    }
});
