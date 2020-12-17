import * as _ from 'lodash';
import * as THREE from 'three';

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());

const scene = new THREE.Scene();
