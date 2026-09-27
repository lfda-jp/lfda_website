import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SimplexNoise = (function () {
  const F3 = 1.0 / 3.0
  const G3 = 1.0 / 6.0
  const p = new Uint8Array([
    151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,
    8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
    35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
    134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,
    55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,
    18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,
    250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,
    189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,
    172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
    228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
    107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
  ])
  const perm = new Uint8Array(512)
  const permMod12 = new Uint8Array(512)
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255]
    permMod12[i] = perm[i] % 12
  }
  const grad3 = new Float32Array([
    1,1,0,-1,1,0,1,-1,0,-1,-1,0,
    1,0,1,-1,0,1,1,0,-1,-1,0,-1,
    0,1,1,0,-1,1,0,1,-1,0,-1,-1
  ])
  return {
    noise(xin, yin, zin) {
      let n0, n1, n2, n3
      const s = (xin + yin + zin) * F3
      const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s)
      const t = (i + j + k) * G3
      const x0 = xin-(i-t), y0 = yin-(j-t), z0 = zin-(k-t)
      let i1, j1, k1, i2, j2, k2
      if (x0>=y0) {
        if (y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0}
        else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1}
        else{i1=0;j1=0;k1=1;i2=1;j2=0;k2=1}
      } else {
        if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1}
        else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1}
        else{i1=0;j1=1;k1=0;i2=1;j2=1;k2=0}
      }
      const x1=x0-i1+G3,y1=y0-j1+G3,z1=z0-k1+G3
      const x2=x0-i2+2*G3,y2=y0-j2+2*G3,z2=z0-k2+2*G3
      const x3=x0-1+3*G3,y3=y0-1+3*G3,z3=z0-1+3*G3
      const ii=i&255,jj=j&255,kk=k&255
      let t0=0.6-x0*x0-y0*y0-z0*z0
      if(t0<0)n0=0;else{t0*=t0;const gi=permMod12[ii+perm[jj+perm[kk]]]*3;n0=t0*t0*(grad3[gi]*x0+grad3[gi+1]*y0+grad3[gi+2]*z0)}
      let t1=0.6-x1*x1-y1*y1-z1*z1
      if(t1<0)n1=0;else{t1*=t1;const gi=permMod12[ii+i1+perm[jj+j1+perm[kk+k1]]]*3;n1=t1*t1*(grad3[gi]*x1+grad3[gi+1]*y1+grad3[gi+2]*z1)}
      let t2=0.6-x2*x2-y2*y2-z2*z2
      if(t2<0)n2=0;else{t2*=t2;const gi=permMod12[ii+i2+perm[jj+j2+perm[kk+k2]]]*3;n2=t2*t2*(grad3[gi]*x2+grad3[gi+1]*y2+grad3[gi+2]*z2)}
      let t3=0.6-x3*x3-y3*y3-z3*z3
      if(t3<0)n3=0;else{t3*=t3;const gi=permMod12[ii+1+perm[jj+1+perm[kk+1]]]*3;n3=t3*t3*(grad3[gi]*x3+grad3[gi+1]*y3+grad3[gi+2]*z3)}
      return 32*(n0+n1+n2+n3)
    }
  }
})()

// dark=true のときMissionセクション用のウォームゴールド照明を使う
export default function MiniBlob({ className, dark = false }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const cfg = { distortion: 0.95, speed: 0.5, frequency: 1.1 }

    const scene = new THREE.Scene()

    const w = container.clientWidth || 400
    const h = container.clientHeight || 400
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0.1, 5.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // 照明 — Vision(light)とMission(dark)で切り替え
    scene.add(new THREE.AmbientLight(0xffffff, dark ? 1.3 : 0.85))
    if (dark) {
      const key = new THREE.DirectionalLight(0xffffff, 3.5); key.position.set(4,5,4); scene.add(key)
      const rim = new THREE.DirectionalLight(0xf4d4a0, 3.0); rim.position.set(-5,2,2); scene.add(rim)
      const fill = new THREE.PointLight(0xfff0d0, 2.4, 18); fill.position.set(2,-4,2); scene.add(fill)
      const back = new THREE.DirectionalLight(0x8090d0, 1.8); back.position.set(0,-3,-4); scene.add(back)
    } else {
      const key = new THREE.DirectionalLight(0xffffff, 2.8); key.position.set(4,5,4); scene.add(key)
      const rim = new THREE.DirectionalLight(0xbdf2d5, 2.2); rim.position.set(-5,2,2); scene.add(rim)
      const fill = new THREE.PointLight(0xffc2d4, 1.8, 15); fill.position.set(2,-4,2); scene.add(fill)
      const back = new THREE.DirectionalLight(0xdce7f0, 1.6); back.position.set(0,-3,-4); scene.add(back)
    }

    // 環境マップ
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512; envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')
    const grad = ctx.createLinearGradient(0, 0, 512, 256)
    if (dark) {
      grad.addColorStop(0, '#ffffff')
      grad.addColorStop(0.4, '#d4c090')
      grad.addColorStop(1, '#303030')
    } else {
      grad.addColorStop(0, '#ffffff')
      grad.addColorStop(0.25, '#d4e4df')
      grad.addColorStop(0.5, '#f4e3ea')
      grad.addColorStop(1, '#ffffff')
    }
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 512, 256)
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(80, 30, 100, 200)
    const envTex = new THREE.CanvasTexture(envCanvas)
    scene.environment = pmrem.fromEquirectangular(envTex).texture
    envTex.dispose(); pmrem.dispose()

    // ブロブメッシュ
    const baseGeo = new THREE.SphereGeometry(1.65, 96, 96)
    const origGeo = baseGeo.clone()
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(dark ? 0xe0d8cc : 0xdadcdb),
      metalness: 0.97, roughness: dark ? 0.16 : 0.14,
      clearcoat: 0.85, clearcoatRoughness: 0.1, reflectivity: 1.0,
    })
    const blob = new THREE.Mesh(baseGeo, mat)
    scene.add(blob)

    const clock = new THREE.Clock()
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.ty = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    const v = new THREE.Vector3(), origV = new THREE.Vector3()
    function deform(t) {
      const pos = blob.geometry.attributes.position
      const orig = origGeo.attributes.position
      const speed = t * cfg.speed * 0.5
      const mx = mouse.x * 0.28, my = mouse.y * 0.28
      for (let i = 0; i < pos.count; i++) {
        origV.fromBufferAttribute(orig, i)
        const n = origV.clone().normalize()
        const f1 = cfg.frequency * 0.7
        const n1 = SimplexNoise.noise(origV.x*f1+speed*0.5, origV.y*f1+my, origV.z*f1+speed*0.3)
        const f2 = cfg.frequency * 1.5
        const n2 = SimplexNoise.noise(origV.x*f2-speed*0.4, origV.y*f2+mx, origV.z*f2+speed*0.6) * 0.38
        const fold = Math.sin(origV.y*1.8 + origV.x*1.2 + speed) * 0.2
        const d = (n1+n2+fold) * (cfg.distortion * 0.36)
        v.copy(origV).addScaledVector(n, d)
        pos.setXYZ(i, v.x, v.y, v.z)
      }
      pos.needsUpdate = true
      blob.geometry.computeVertexNormals()
    }

    // 画面内に入ったときだけアニメーションを実行
    let isVisible = false
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { isVisible = e.isIntersecting }) },
      { threshold: 0.05 }
    )
    observer.observe(container)

    let rafId
    function animate() {
      rafId = requestAnimationFrame(animate)
      if (!isVisible) return
      const t = clock.getElapsedTime()
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      blob.rotation.y += 0.0018
      blob.rotation.z = Math.sin(t * 0.14) * 0.055
      deform(t)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const nw = container.clientWidth, nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [dark])

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%' }} />
}
