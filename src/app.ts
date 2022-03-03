import { BackSide, BoxGeometry, Euler, Mesh, MeshBasicMaterial, PerspectiveCamera, Quaternion, Scene, TextureLoader, Vector2, WebGLRenderer } from "three"

// Setting up the scene
const CAMERA = new PerspectiveCamera(90, window.innerWidth / window.innerHeight)
const SCENE = new Scene()

const RENDERER = new WebGLRenderer({ antialias: true })
RENDERER.setSize( window.innerWidth, window.innerHeight )

let time = new Date().getTime() / 1000
RENDERER.setAnimationLoop(() => {
    let delta = (new Date().getTime() / 1000) - time

    update(delta)

    time = new Date().getTime() / 1000
})

const RENDERERDOM = RENDERER.domElement
document.body.appendChild(RENDERERDOM)

const BELAGEOMETRY = new BoxGeometry(2, 2, 2)
const BELATEXTURE = new TextureLoader().load("./img/susmak.png")
const BELAMATERIAL = new MeshBasicMaterial( { color: 0xffffff, map: BELATEXTURE } )
const BELACUBE = new Mesh( BELAGEOMETRY, BELAMATERIAL )
SCENE.add( BELACUBE )

const SKYBOXGEOMETRY = new BoxGeometry(2000, 2000, 2000)
const SKYBOXMATERIAL = getSkyBoxPaths("purplenebula").map(v => new MeshBasicMaterial({ map: new TextureLoader().load(v), side: BackSide }))
const SKYBOX = new Mesh(SKYBOXGEOMETRY, SKYBOXMATERIAL)
SCENE.add(SKYBOX)

BELACUBE.position.z = -3

window.addEventListener("resize", updateAspect)

const getAspectRatio = () => window.innerWidth / window.innerHeight

function update(delta) {
    if (!isDragging) {
        BELACUBE.rotation.x += deg2rad(delta * 50)
        BELACUBE.rotation.y += deg2rad(delta * 50)
    }
    
    SKYBOX.rotation.y += deg2rad(delta * 10)

    RENDERER.render(SCENE, CAMERA)
}

function updateAspect() {
    CAMERA.aspect = getAspectRatio()
    CAMERA.updateProjectionMatrix()

    RENDERER.setSize(window.innerWidth, window.innerHeight)
}

function getSkyBoxPaths(v: "purplenebula") {
    const STDPATH = "./img/skybox/"
    const SIDES = ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
    const FORMAT = "png"

    return SIDES.map(side => `${STDPATH}${v}_${side}.${FORMAT}`)
}

let isDragging = false
let point = {
    x: 0,
    y: 0
}

window.addEventListener("mousedown", () => isDragging = true)
window.addEventListener("mouseup", () => isDragging = false)

window.addEventListener("mousemove", (e) => {
    let delta = {
        x: e.offsetX - point.x,
        y: e.offsetY - point.y
    }
    
    if (isDragging) {
        BELACUBE.quaternion.multiplyQuaternions(
            new Quaternion()
                .setFromEuler(new Euler(
                        deg2rad(delta.y / 2),
                        deg2rad(delta.x / 2),
                        0,
                        'XYZ'
                    ))
        , BELACUBE.quaternion)
    }

    point = {
        x: e.offsetX,
        y: e.offsetY
    }
})

const deg2rad = (deg) => deg * (Math.PI/180)
const rad2deg = (rad) => rad * (180/Math.PI)