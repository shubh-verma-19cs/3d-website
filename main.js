import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'; 
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'; 
// import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
// import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
// import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera ); 
composer.addPass( renderPass );

// Bloom
// const unrealBloomPass = new UnrealBloomPass(resolution, 0.3, 1);
// composer.addPass( unrealBloomPass );
const outputPass = new OutputPass();
composer.addPass( outputPass );
/////
const geometry = new THREE.IcosahedronGeometry(2, 2);
const material = new THREE.MeshPhongMaterial( {
    color: 0xffffff, 
    flatShading: true,
    transparent: true,
    opacity: 1,
    // wireframe: true,
    // wireframeLinewidth: 10,
} );

// Make a sphere
const sphere = new THREE.Mesh( geometry, material );
const wireframeMaterial = new THREE.MeshBasicMaterial( { 
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: 5.0,
    transparent: true 
} );
let wireframe = new THREE.Mesh(geometry, wireframeMaterial);
sphere.add( wireframe );
sphere.position.set(0, 0, 0)
sphere.rotation.set(0, 0, 0)
scene.add( sphere );


//Controls
const controls = new OrbitControls( camera, renderer.domElement );

// Axis helper
// scene.add( new THREE.AxesHelper(25) )

// scene.add( new THREE.AmbientLight(0xff0000) )
const light1 = new THREE.DirectionalLight( 0xffdd00, 2 );
light1.position.set( 0, 5, 0 );
light1.lookAt(new THREE.Vector3(0, 5, 0))
scene.add( light1 );

const light2 = new THREE.DirectionalLight( 0xffdd00, 2 );
light2.position.set( 0, -5, 0 );
light2.lookAt(new THREE.Vector3(0, 5, 0))
scene.add( light2 );

const ambientLight = new THREE.AmbientLight( 0xff0000, 2 );
scene.add(ambientLight);

let frames = 0, prevTime = performance.now();


camera.position.set(3, 3, 3)
camera.lookAt(new THREE.Vector3(0, 0, 0))


function animate() {
	requestAnimationFrame( animate );
    // sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    // sphere.rotation.z += 0.01;
    
    frames ++;
    const time = performance.now();
    
    if ( time >= prevTime + 1000 ) {
        
        let fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) )
    	console.log( fps );
      
      frames = 0;
      prevTime = time;
      
    }
	
    composer.render();
    // renderer.render( scene, camera );
}


animate();
