<template lang="">
    <div>
        
    </div>
</template>
<script setup>
import { Scene } from 'three'

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

</script>
<style lang="">

</style>