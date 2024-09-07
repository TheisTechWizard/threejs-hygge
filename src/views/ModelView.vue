<template>
    <div ref="sceneContainer" class="three-container"></div>
</template>

<script>
import * as THREE from "three";

export default {
    data() {
        return {
            // scene: null,
            // camera: null,
            // renderer: null,
            // cube: null,
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
            // Set up scene
            this.scene = new THREE.Scene();

            // Set up camera (Field of View, Aspect Ratio, Near and Far clipping plane)
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.camera.position.z = 5;

            // Set up renderer and attach to DOM
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            this.$refs.sceneContainer.appendChild(this.renderer.domElement);

            // Set up geometry and material, then create a cube
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x005300 });
            this.cube = new THREE.Mesh(geometry, material);

            // Add cube to scene
            this.scene.add(this.cube);
        },
        animate() {
            requestAnimationFrame(this.animate);

            // Rotate cube for animation
            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;

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