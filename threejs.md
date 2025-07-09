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
