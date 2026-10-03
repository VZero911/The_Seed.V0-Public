/**
 * 3D view of the chain (console §5 bis): blocks as cubes in a line (height = number of
 * transactions, the last one pulses), transactions as shards above their block, the project's
 * contracts as glowing stars around the chain, linked to the transactions that call them.
 * Wallets (V2) are spheres on an arc in front of the chain, linked to the transactions they sent;
 * the followed wallet (Portefeuille) glows gold.
 * Drag to turn, wheel to zoom, hover for a label, click to open the detail in the explorer.
 */
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Graph } from './consoleApi'
import type { Target } from './Console'

const CONTRACT_COLORS = [
  0x8f6cf0, 0x5fb8ff, 0xf2c14e, 0x5fd38d, 0xef5d6c, 0x4fd6e0, 0xff9df5, 0xffa94d, 0xb8f5d9,
  0xd7b4ff,
]

function colorAt(i: number): number {
  return CONTRACT_COLORS[i % CONTRACT_COLORS.length] ?? 0x8f6cf0
}

/** Whether the browser can draw WebGL (jsdom and some old browsers cannot). */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

interface Picked {
  target: Target
  label: string
}

export function ChainView3D({
  graph,
  onOpen,
  focus = null,
}: {
  graph: Graph | null
  onOpen: (target: Target) => void
  /** Address of the followed wallet, highlighted in gold. */
  focus?: string | null
}) {
  const host = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<string | null>(null)
  const [webgl] = useState(supportsWebGL)
  const open = useRef(onOpen)
  useEffect(() => {
    open.current = onOpen
  }, [onOpen])

  useEffect(() => {
    const el = host.current
    if (!el || !graph) return
    if (!webgl) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true })
    } catch {
      return
    }
    const width = el.clientWidth || 800
    const height = el.clientHeight || 520
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(width, height)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b0918)
    scene.fog = new THREE.Fog(0x0b0918, 40, 140)
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500)
    camera.position.set(10, 22, 46)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 2, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.45))
    const sun = new THREE.DirectionalLight(0xffffff, 1.1)
    sun.position.set(20, 40, 25)
    scene.add(sun)
    const grid = new THREE.GridHelper(160, 64, 0x2a2640, 0x1a1730)
    grid.position.y = -0.01
    scene.add(grid)

    // Contracts: stars on an arc behind the chain.
    const colorOf = new Map<string, number>()
    const contractPos = new Map<string, THREE.Vector3>()
    const pickables: THREE.Object3D[] = []
    const info = new Map<THREE.Object3D, Picked>()
    graph.contracts.forEach((c, i) => {
      const color = colorAt(i)
      colorOf.set(c.name, color)
      const angle = Math.PI * (0.15 + (0.7 * i) / Math.max(1, graph.contracts.length - 1))
      const pos = new THREE.Vector3(
        Math.cos(angle) * -34,
        14 + (i % 3) * 3,
        -Math.sin(angle) * 22 - 6,
      )
      contractPos.set(c.name, pos)
      const star = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.4, 1),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.8 }),
      )
      star.position.copy(pos)
      scene.add(star)
      const light = new THREE.PointLight(color, 25, 14)
      light.position.copy(pos)
      scene.add(light)
      pickables.push(star)
      info.set(star, { target: { kind: 'address', id: c.address }, label: `Contrat ${c.name}` })
    })

    // Wallets: spheres on an arc in front of the chain.
    const walletPos = new Map<string, THREE.Vector3>()
    const wallets = graph.wallets ?? []
    wallets.forEach((w, i) => {
      const followed = !!focus && w.address.toLowerCase() === focus.toLowerCase()
      const color = followed ? 0xf2c14e : w.label ? 0x5fe0a8 : 0x9a96b0
      const angle = Math.PI * (0.12 + (0.76 * i) / Math.max(1, wallets.length - 1))
      const pos = new THREE.Vector3(
        Math.cos(angle) * -30,
        3 + (i % 2) * 2,
        Math.sin(angle) * 14 + 10,
      )
      walletPos.set(w.address.toLowerCase(), pos)
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(
          followed ? 1.3 : 0.55 + Math.min(0.6, w.transactions * 0.05),
          24,
          16,
        ),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: followed ? 1.1 : 0.45,
          metalness: 0.2,
          roughness: 0.35,
        }),
      )
      orb.position.copy(pos)
      scene.add(orb)
      pickables.push(orb)
      info.set(orb, {
        target: { kind: 'address', id: w.address },
        label: `${w.label ?? 'Wallet'} ${w.address.slice(0, 8)}… · ${String(w.transactions)} transaction(s)`,
      })
    })
    const walletLinks: number[] = []

    // Blocks: oldest on the left, newest on the right.
    const blocks = [...graph.blocks].reverse()
    const spacing = 2.4
    const offset = ((blocks.length - 1) * spacing) / 2
    let latest: THREE.Mesh | null = null
    const links: number[] = []
    blocks.forEach((b, i) => {
      const count = b.transactions.length
      const h = 0.6 + Math.min(8, count) * 0.6
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, h, 1.6),
        new THREE.MeshStandardMaterial({
          color: count ? 0x3b2f6b : 0x23203a,
          emissive: count ? 0x5a3fd0 : 0x0,
          emissiveIntensity: count ? 0.35 : 0,
          metalness: 0.3,
          roughness: 0.5,
        }),
      )
      const x = i * spacing - offset
      mesh.position.set(x, h / 2, 0)
      scene.add(mesh)
      pickables.push(mesh)
      info.set(mesh, {
        target: { kind: 'block', id: b.number },
        label: `Bloc ${String(b.number)} · ${String(count)} transaction(s)`,
      })
      if (i === blocks.length - 1) latest = mesh
      // Chain link to the previous block.
      if (i > 0) links.push(x - spacing + 0.8, 0.3, 0, x - 0.8, 0.3, 0)
      b.transactions.forEach((t, j) => {
        const color = (t.to && colorOf.get(t.to)) ?? 0xcfcae6
        const shard = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.42),
          new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6 }),
        )
        const y = h + 0.9 + j * 1.0
        shard.position.set(x, y, 0)
        scene.add(shard)
        pickables.push(shard)
        info.set(shard, {
          target: { kind: 'tx', id: t.hash },
          label: `${t.to ?? 'Transaction'}${t.function ? ` · ${t.function}` : ''}`,
        })
        const to = t.to ? contractPos.get(t.to) : undefined
        if (to) links.push(x, y, 0, to.x, to.y, to.z)
        const from = t.from ? walletPos.get(t.from.toLowerCase()) : undefined
        if (from) walletLinks.push(from.x, from.y, from.z, x, y, 0)
      })
    })
    const lines = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.Float32BufferAttribute(links, 3),
      ),
      new THREE.LineBasicMaterial({ color: 0x6f62b0, transparent: true, opacity: 0.35 }),
    )
    scene.add(lines)
    scene.add(
      new THREE.LineSegments(
        new THREE.BufferGeometry().setAttribute(
          'position',
          new THREE.Float32BufferAttribute(walletLinks, 3),
        ),
        new THREE.LineBasicMaterial({ color: 0x5fe0a8, transparent: true, opacity: 0.22 }),
      ),
    )

    // Hover and click.
    const ray = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const pick = (event: MouseEvent): Picked | null => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      )
      ray.setFromCamera(mouse, camera)
      const hit = ray.intersectObjects(pickables)[0]
      return hit ? (info.get(hit.object) ?? null) : null
    }
    let down = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      const p = pick(e)
      setHover(p ? p.label : null)
      renderer.domElement.style.cursor = p ? 'pointer' : 'grab'
    }
    const onDown = (e: MouseEvent) => {
      down = { x: e.clientX, y: e.clientY }
    }
    const onUp = (e: MouseEvent) => {
      if (Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y) > 4) return // a drag
      const p = pick(e)
      if (p) open.current(p.target)
    }
    renderer.domElement.addEventListener('mousemove', onMove)
    renderer.domElement.addEventListener('mousedown', onDown)
    renderer.domElement.addEventListener('mouseup', onUp)
    const onResize = () => {
      const w = el.clientWidth || width
      const hh = el.clientHeight || height
      camera.aspect = w / hh
      camera.updateProjectionMatrix()
      renderer.setSize(w, hh)
    }
    window.addEventListener('resize', onResize)

    let frame = 0
    const timer = new THREE.Timer()
    const animate = () => {
      frame = requestAnimationFrame(animate)
      timer.update()
      const t = timer.getElapsed()
      if (latest) {
        const mat = latest.material as THREE.MeshStandardMaterial
        mat.emissive.setHex(0xf2c14e)
        mat.emissiveIntensity = 0.4 + 0.4 * Math.sin(t * 3)
      }
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('mousemove', onMove)
      renderer.domElement.removeEventListener('mousedown', onDown)
      renderer.domElement.removeEventListener('mouseup', onUp)
      controls.dispose()
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          const mesh = o as THREE.Mesh<THREE.BufferGeometry, THREE.Material>
          mesh.geometry.dispose()
          mesh.material.dispose()
        }
      })
      renderer.dispose()
      el.removeChild(renderer.domElement)
    }
  }, [graph, webgl, focus])

  if (!webgl) {
    return (
      <p className="c-muted">
        La 3D (WebGL) n’est pas disponible dans ce navigateur : utilise l’explorateur.
      </p>
    )
  }
  return (
    <div className="c-3d-wrap">
      <div ref={host} className="c-3d" data-testid="chain-3d" />
      <div className="c-3d-hud">
        {hover ?? 'Glisse pour tourner, molette pour zoomer, clic pour ouvrir.'}
      </div>
      {graph ? (
        <div className="c-3d-legend">
          <span>
            <i style={{ background: '#5fe0a8' }} />
            Wallet de joueur
          </span>
          {focus ? (
            <span>
              <i style={{ background: '#f2c14e' }} />
              Wallet suivi
            </span>
          ) : null}
          {graph.contracts.map((c, i) => (
            <span key={c.address}>
              <i
                style={{
                  background: `#${colorAt(i).toString(16).padStart(6, '0')}`,
                }}
              />
              {c.name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
