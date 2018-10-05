var img="img/bb.jpg"
var student=[
    "img/aa.png",
    "img/aa.jpg",
    "img/bb.jpg",
    "img/cc.jpg"
]
var model=document.getElementById("model");
$(".chartlet li").click(function (){
    let a=$(".chartlet li").index(this)
    img=student[a]
    initModel()
})
var ww=model.clientWidth;
var wh=model.clientHeight;
//渲染器
var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(ww, wh);
    //告诉渲染器需要阴影效果
    renderer.setClearColor(0xffffff);
    model.appendChild(renderer.domElement);
}
//相机
var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(100, ww / wh, 0.1, 1000);
    //设置相机视点
    camera.position.set(0, 43, 90);
    //设置相机的朝向
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}
//场景
var scene;
function initScene() {
    scene = new THREE.Scene();
}
//灯光

var light;
function initLight() {
    //添加环境光
    scene.add(new THREE.AmbientLight( 0xd5d5d5,0.9));
    //添加平衡光
    light = new THREE.DirectionalLight( 0xffffff,0.7);
    light.position.set(0,1,0);
    scene.add(light);

}

 //加载OBJ格式的模型
function initModel() {
    var loader = new THREE.OBJLoader();
    loader.load("mx/ob.obj", function (loadedMesh) {
        // var material = new THREE.MeshLambertMaterial({ color: 0x690ffe });
        var material=THREE.ImageUtils.loadTexture(img);
        // 加载完obj文件是一个场景组，遍历它的子元素，赋值纹理并且更新面和点的发现了
        loadedMesh.children.forEach(function (child) {
            child.material.map = material;
            // child.material=material;
            child.geometry.computeFaceNormals();
            child.geometry.computeVertexNormals();
        });
        scene.add(loadedMesh);
    });
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;
function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    // controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    // controls.dampingFactor =0.01;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    // controls.autoRotate = true;
    //设置相机距离原点的最远距离
    controls.minDistance = 10;
    //设置相机距离原点的最远距离
    controls.maxDistance = 250;
    //是否开启右键拖拽
    controls.enablePan = false;
}

function render() {
    renderer.render(scene, camera);
}

//窗口变动触发的函数
function onWindowResize() {
    camera.aspect = ww / wh;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(ww, wh);
}
function animate() {
    //更新控制器
    render();
    controls.update();
    requestAnimationFrame(animate);
}

function draw() {
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    animate();
    window.onresize = onWindowResize;
}