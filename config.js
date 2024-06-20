export default {
    menu: {
        background_list: [
            { id: 'pass', name: 'Pass Through' },
            { id: 'image', name: 'Image' },
            { id: 'color', name: 'Color' }
        ],
        app_list: [
            {
                group: 'media',
                items: [
                    { id: '2dimg', name: 'Add 2D Image', path: './image2D.js', ui: [{ type: 'file', accept: 'image/*' }] },
                    { id: '2dvideo', name: 'Add 2D Video', path: './video2D.js', ui: [{ type: 'file', accept: 'video/*' }] },
                    { id: '3dmodel', name: 'Add 3D Model', path: './gltfmodel.js', ui: [{ type: 'file', accept: '.gltf,.glb' }] },
                    { id: '360image', name: 'Add 360 Image', path: './image360.js', ui: [{ type: 'file', accept: 'image/*' }] }
                ]
            }
        ],
        back_kind_select: ['pass', 'image', 'color'],
        inst_list: []
    }
};
