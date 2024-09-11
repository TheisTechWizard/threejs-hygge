<template>
    <div class="model-view-wrapper">
        <div class="button-wrapper">
            <button v-for="(animation, name) in animationsList" :key="name" @click="playAnimation(name)"> {{ name
                }}</button>
        </div>
        <div ref="sceneContainer" class="three-container"></div>
    </div>
</template>

<script>
import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import modelUrl from '../assets/ThreeDModels/Kermit.fbx';

export default {
    data() {
        return {
            animationsList: {},
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

            this.scene.background = new THREE.Color(0xe5e5e5)

            // Set up camera (Field of View, Aspect Ratio, Near and Far clipping plane)
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 5;

            // Set up renderer and attach to DOM
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(1800, 850);
            this.$refs.sceneContainer.appendChild(this.renderer.domElement);

            const ambientLight = new THREE.AmbientLight(0xffffff, 1);
            this.scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            this.scene.add(directionalLight);

            this.animationsList = {}

            this.loadModel();
        },

        //Code for loading my 3D Model, and creating an animationController
        loadModel() {
            const loader = new FBXLoader();

            loader.load(modelUrl, (fbx) => {
                this.scene.add(fbx)

                fbx.position.set(0, -2, -1);
                fbx.scale.set(0.022, 0.022, 0.022);


                this.mixer = new THREE.AnimationMixer(fbx)

                //This code is here because there
                const animationClip = fbx.animations[0];
                if (animationClip) {
                    this.action = this.mixer.clipAction(animationClip);
                }

                this.LoadMixamoAnimations('/src/assets/animations/Northern_Soul_Floor_Combo.fbx', 'Breakdance');
                this.LoadMixamoAnimations('/src/assets/animations/Ymca_Dance.fbx', 'YMCA');
                this.LoadMixamoAnimations('/src/assets/animations/Standing React Death Backward.fbx', 'Ohhh Nooo :,(');
                //This one is accsessed a bit different from the others, because the 3D model already has an animation built in
                this.LoadMixamoAnimations('/src/assets/ThreeDModels/Kermit.fbx', 'Vibe dance');

            },
                (xhr) => {
                    console.log(`Model ${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                (error) => {
                    console.error('An error happened while loading the model', error);
                }
            );
        },

        LoadMixamoAnimations(path, name) {
            const loader = new FBXLoader();
            loader.load(path, (fbx) => {
                const animationClip = fbx.animations[0];
                if (animationClip) {
                    this.action = this.mixer.clipAction(animationClip);
                }
                this.animationsList[name] = this.action
            })

            console.log(this.animationsList)
        },

        playAnimation(name) {
            // Stop all current animations
            for (let key in this.animationsList) {
                this.animationsList[key].stop();
            }

            // Play the desired animation
            const action = this.animationsList[name];
            if (action) {
                action.reset().play();
            }
        },

        animate() {
            requestAnimationFrame(this.animate);

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

<style lang="scss">
@import "../scss/modelView.scss";
</style>