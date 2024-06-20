/*
	SPATIAL SHELL APP
	primitive demo
*/
export default {
	props:{
		kind:{
			type:String,
			default:"cube"
		},
		size:{
			default:1
		},
		pcolor:{
			type:String,
			default:"red"
		},
		pscale:{
			type:Number,
			default:0.1
		},
		speed:{
			type:Number,
			default:Math.random()*50+50
		}
	},
	computed:{
		scale() {
			return this.pscale*parseFloat(this.size) 	
		}
	},
	methods:{
		zpos() {
			let y=0
			switch(this.kind) {
				case "cube":
					y = this.scale*0.6
					break 
				case "torus":
					y = this.scale*1.4
					break 				
				default:
					y = this.scale*1.1
			}
			return `0 ${y} 0`
		}
	},
	updated() {
//		console.log(this)
	},
	mounted() {
		console.log(this.$props)
	},
	template: '<a-entity :position="zpos()"><a-octahedron v-if="kind==\'octa\'" :scale="`${scale} ${scale} ${scale}`" :color="pcolor" :primitive-rot="`speed:${speed}`"></a-octahedron>'+
		'<a-box v-if="kind==\'cube\'" :scale="`${scale} ${scale} ${scale}`" :color="pcolor" :primitive-rot="`speed:${speed}`"></a-box>'+
		'<a-sphere v-if="kind==\'sphere\'" :scale="`${scale} ${scale} ${scale}`" :color="pcolor" :primitive-rot="`speed:${speed}`"></a-sphere>'+
		'<a-dodecahedron v-if="kind==\'dodeca\'" :scale="`${scale} ${scale} ${scale}`" :color="pcolor" :primitive-rot="`speed:${speed}`"></a-dodecahedron>'+
		'<a-icosahedron v-if="kind==\'icosa\'" :scale="`${scale} ${scale} ${scale}`" :color="pcolor" :primitive-rot="`speed:${speed}`"></a-icosahedron>'+
		'<a-torus v-if="kind==\'torus\'" :scale="`${scale} ${scale} ${scale}`" :color="pcolor" :primitive-rot="`speed:${speed}`"></a-torus></a-entity>'
}
//sample component
if(AFRAME.components['primitive-rot']) delete AFRAME.components['primitive-rot']
AFRAME.registerComponent('primitive-rot', {
	schema: {
		speed:{type:"number",default:60},
		axis:{default:"Y"}
	},
	init:function() {
		this.rot = {x:0,y:0,z:0}
	},
	tick:function(time, timeDelta) {
		if(this.data.axis=="X") this.rot.x = THREE.MathUtils.degToRad(time/this.data.speed)
		if(this.data.axis=="Y") this.rot.y = THREE.MathUtils.degToRad(time/this.data.speed)
		if(this.data.axis=="Z") this.rot.z = THREE.MathUtils.degToRad(time/this.data.speed)
//		this.el.setAttribute("rotation",this.rot)
		this.el.object3D.rotation.set(this.rot.x,this.rot.y,this.rot.z)
	}
})