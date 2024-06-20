/*
	SPATIAL SHELL 
	menu config file
*/
export default {
	menu:{
		background_list:[
			{name:"passthru",id:"pass"},
			{name:"space",id:"space"},
			{name:"360 photo",id:"p360"},
		],
		app_list:[
			{group:"utils",
			items:[
				{name:"accessory Clock",id:"clock",
					path:"./apps/clock.js"
				},

				{name:"2D image loader",id:"image2D_loader",
					path:"./apps/image2D.js",
					ui:[
						{id:"psrc",name:"src",type:"file",accept:".jpg,.jpeg,.png,.gif"}
					]
				},
				{name:"2D video loader",id:"video2D_loader",
					path:"./apps/video2D.js",
					ui:[
						{id:"psrc",name:"src",type:"file",accept:".mp4,.webm,.mov"}
					]
				},
				{name:"3D Model loader",id:"model_loader",
					path:"./apps/gltfmodel.js",
					param:{
						basescale:0.2
					},
					ui:[
						{id:"psrc",name:"src",type:"file",accept:".glb,.vrm"}
					]
				},
				{name:"360 image loader",id:"image360_loader",
					path:"./apps/image360.js",
					ui:[
						{id:"psrc",name:"src",type:"file",accept:".jpg,.jpeg,.png,.gif"}
					]
				},
			]},
			{group:"content sample",
			items:[
				{name:"Primitive",id:"primitive",
				path:"./apps/primitive.js",
				param:{
					basescale:0.02
				},
				ui:[
					{name:"kind",type:"select",value:"cube",options:[
						{id:"cube",name:"cube"},
						{id:"sphere",name:"sphere"},
						{id:"octa",name:"octahedron"},
						{id:"dodeca",name:"dodecahedron"},
						{id:"icosa",name:"icosahedron"},
						{id:"torus",name:"torus"}
					]},
					{name:"size",type:"range",min:1,max:10,step:0.1,value:5},
					{id:"pcolor",name:"color",type:"text",value:"red"}
				]
			},
				{name:"2D image sample",id:"image2D_sample",
					path:"./apps/image2D.js",
					param:{
						psrc:"./assets/chihiro015.jpg"
					}
				},
				{name:"2D video sample",id:"video2D_sample",
					path:"./apps/video2D.js",
					param:{
						psrc:"https://wakufactory.jp/wxr/assets/mov/syaso_sk1.mp4"
					}
				},
				{name:"3D Model sample 1",id:"model_sample1",
					path:"./apps/gltfmodel.js",
					param:{
						psrc:"./assets/red_spider_lily_lycoris_radiata_e.glb",
						basescale:0.02,
						ppos:"0 0 0"
					}
				},
				{name:"3D app sample 1",id:"obj_sample1",
					path:"./apps/instobj1.js",
					param:{

					}
				},				
			]}
		]		
	}
}