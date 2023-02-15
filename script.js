var scene = new THREE.Scene();
document.addEventListener('mousemove',onMouseMove,false)
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
var mouseY;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});

var distance  = Math.min(200,window.innerWidth/4);
var geometry = new THREE.Geometry();

for (var i =0;i < 5; i++) {
    var vertex = new THREE.Vector3();

    var theta =  THREE.Math.randFloatSpread(360);
    var phi =  THREE.Math.randFloatSpread(300);

    vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    vertex.y= distance * Math.sin(theta) * Math.cos(phi);

    geometry.vertices.push(vertex);
}

var particles = new THREE.Points(geometry,new THREE.PointsMaterial({color:0xff44ff,size:4}));
particles.boundingSphere=50;

var renderingParent = new THREE.Group();
renderingParent.add(particles);

var resizeContainer = new THREE.Group();

resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

var animate = function(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
};

var myTween;

function onMouseMove(event){
    if(myTween)
    myTween.kill();

    mouseY = (event.clientY / window.innerHeight) *2 +1 ;    
    myTween = gsap.to(particles.rotation, {duration:0.1,x: mouseY*-1});
}

animate();

var animProps = {scale:1,xRot:0 ,yRot:0};
gsap.to(animProps,{duration:1000,scale:2.0,repeat:-1,yoyo:false,ease:"sine", onUpdate: function () {
    renderingParent.scale.set(animProps.scale,animProps.scale,animProps.scale);
}});

