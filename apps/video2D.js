/*
    SPATIAL SHELL APP
    2D video viewer 
*/
export default {
    props:{
        psrc:String,
        pscale:Number,
    },
    template: `<a-entity :scale="pscale+' '+pscale+' '+pscale">
        <a-plane width=0.2 height=.2 position="0 0.2 0" material="shader:flat" :ss-video="psrc"></a-plane>
    </a-entity>`
}

AFRAME.registerComponent('ss-video', {
    schema:{
        type:"string"
    },
    init:function() {
        console.log("init ss-video");
        this.assets = document.querySelector("a-assets");
        this.isPlaying = true;
        this.el.addEventListener('click', this.togglePlayPause.bind(this));
    },
    update:function() {
        this.id = crypto.randomUUID();
        this.setimg(this.data, this.id);
    },
    remove:function() {
        if (this.imgdom) {
            this.imgdom.remove();
        }
    },
    setimg:function(src, id) {
        console.log("Setting video source:", src);
        return new Promise((resolve,reject)=>{
            const im1 = document.createElement("video");
            im1.id = id;
            im1.setAttribute("crossorigin","anonymous");
            im1.setAttribute("playsinline", "");
            im1.setAttribute("webkit-playsinline", "");
            im1.setAttribute("autoplay",true);
            im1.setAttribute("loop",true);

            im1.onloadeddata = ()=>{
                const as=(im1.videoHeight/im1.videoWidth);
                const bsize = 0.5;
                const h=as>1?1:as*bsize;
                this.el.setAttribute("width",(as>1?1/as:1)*bsize);
                this.el.setAttribute("height",h);
                this.el.setAttribute("position",{x:0,y:h/2,z:0});
                this.el.setAttribute("material","src","#"+id);
                resolve(im1);
            };
            im1.src = src;
            this.assets.appendChild(im1);
            this.imgdom = im1;
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
