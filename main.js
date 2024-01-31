import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
/////
const geometry = new THREE.SphereGeometry(2, 12, 8)
const material = new THREE.MeshPhongMaterial( {
    color: 0xffffff, 
    // flatShading: true,
    transparent: true,
    opacity: 1,
    wireframe: true,
    // wireframeLinewidth: 10,
} );

// Make a sphere
const sphere = new THREE.Mesh( geometry, material );
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
	
    renderer.render( scene, camera );
}


animate();