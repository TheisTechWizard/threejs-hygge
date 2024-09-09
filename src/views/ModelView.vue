<template>
    <button @click="playAnimation"> Click if feeling groovy </button>
    <div ref="sceneContainer" class="three-container"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import modelUrl from '../assets/ThreeDModels/vibe_kermit.glb';

export default {
    data() {
        return {
            // scene: null,
            // camera: null,
            // renderer: null,
            // cube: null,
            clock: new THREE.Clock()
        };
    },
    mounted() {
        this.initThree();
        this.animate();
        window.addEventListener("resize", this.onWindowResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onWindowResize);
    },
    methods: {
        initThree() {
            this.scene = new THREE.Scene();

            this.scene.background = new THREE.Color(0xcccccc)

            // Set up camera (Field of View, Aspect Ratio, Near and Far clipping plane)
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 5;

            // Set up renderer and attach to DOM
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.$refs.sceneContainer.appendChild(this.renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 1);
            this.scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            this.scene.add(directionalLight);

            this.loadModel();
        },

        //Code for loading my 3D Model, and creating an animationController
        loadModel() {
            const loader = new GLTFLoader();

            loader.load(
                modelUrl,
                (gltf) => {
                    this.model = gltf.scene;
                    this.scene.add(this.model);

                    this.mixer = new THREE.AnimationMixer(this.model)
                    const animationClip = gltf.animations[0];

                    if (animationClip) {
                        this.action = this.mixer.clipAction(animationClip);
                    }

                    this.model.position.set(0, -2, 0);

                    this.model.scale.set(1, 1, 1);
                },
                (xhr) => {
                    console.log(`Model ${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                (error) => {
                    console.error('An error happened while loading the model', error);
                }
            );
        },
        //For animation my 3D Model
        playAnimation() {
            if (this.action) {
                this.action.play();
            }
        },

        animate() {
            requestAnimationFrame(this.animate);

            // Rotate cube for animation
            //this.cube.rotation.x += 0.01;
            //this.cube.rotation.y += 0.01;

            // Update the mixer for animations
            const delta = this.clock.getDelta(); // Get the time difference between frames
            if (this.mixer) this.mixer.update(delta); // Update the mixer to advance the animation

            // Render the scene
            this.renderer.render(this.scene, this.camera);
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
    },
};
</script>

<style>
.three-container {
    width: 100%;
    height: 100vh;
    display: block;
}
</style>