1 . do not make path mixtakes

image

2.  arrange the accordingly
    e.g putting your canvas and scene code below won't give any reult you have to put them first above all your code below the imports.

                        const fontLoader = new FontLoader();
                        fontLoader.load("/fonts/helvetiker_regular.typeface.json",
                        (font) => {
                        const material = new THREE.MeshBasicMaterial();
                         const textGeometry = new TextGeometry(
                            "Hello Three.js",
                        {
                             font: font,
                             size: 0.5,
                             height: 0.2,
                             curveSegments: 12,
                             bevelEnabled: true,
                             bevelThickness: 0.03,
                             bevelSize: 0.02,
                             bevelOffset: 0,
                             bevelSegments: 5,
                        });
                        const text = new THREE.Mesh(textGeometry, material);
                        scene.add(text);
                        });
                        const canvas = document.querySelector("canvas.webgl");
                        const scene = new THREE.Scene();

            when adding a code like this

                        const material = new THREE.MeshStandardMaterial();
                            material.roughness = 0.4;

                            const sphere = new THREE.Mesh(
                            new THREE.SphereGeometry(0.5, 32, 32),
                             material
                            );
                            sphere.castShadow = true;

                            const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),                 material);

                            plane.rotation.x = -Math.PI * 0.5;
                            plane.position.y = -0.65;

                            plane.receiveShadow = true;
                            scene.add(sphere, plane);

        always add this

                const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

                 scene.add(ambientLight);

    when adding fog it is written like this

                scene.fog = fog;

when ever ther eis aomap always use the _uv2_

        plane.geometry.setAttribute(

        "uv2",
        new THREE.Float32BufferAttribute(
        plane.geometry.attributes.uv.array,
        2
        )
        );

don't use multiplication (\*) whre you are to use addition sign(+)

how to install cannon.js

            npm install -- save cannon

how to uninstall cannon

        npm uninstall -- save cannon

how to install cannon another way

            npm install --save cannon-es@0.15.1

where to get 3d models

            https://github.com/khronosGroup/glTF-Sample-Models

enter fly mode on blender

        shift + backtick(`)

to see camera

                press numpad 0

focus scene on an object

        press left click and comma(,) on the numpad(number part of the keyboard)

focus on one object alone

         press left click and slash(/) on the numpad(number part of the keyboard)

to select

                shift + left click

to select all

                click A
                unseclect A + A

select a rectangle

        click B
        unseclect A + A

select painting

        click  C and scroll to be big or small

to add any object

        shift + A

to reopen panel for uvshpere if lost

        fn + f9

to see menu on left top side

        click T

to change position,the rotation and the scale

        click G
        click R
        click S

to add loop cut

        ctrl + r

to search on object

                f3

what is HDRi

        High Dynamic Range Image

how to destroy thing source:(code structuring time 3:08:54)
also read three.js documentation on how to dispose of things
