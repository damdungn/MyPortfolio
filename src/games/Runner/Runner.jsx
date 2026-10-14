// src/games/Runner/Runner.jsx
// Forest Run — an endless side-scrolling runner. All gameplay happens in fixed
// "world units"; the canvas just scales the world to fit its container.
import { useEffect, useRef, useState } from 'react'
import './Runner.css'

/* ============ TUNING (world units, seconds) ============ */
const MIN_VIEW_W = 500 // always show at least this much of the track
const MIN_VIEW_H = 180
const GROUND_MARGIN = 22 // gap between the ground line and the canvas bottom
const PLAYER_X = 56
const STAND = { w: 39, h: 49 }
const DUCK = { w: 48, h: 22 }

const GRAVITY = 2400
const FAST_FALL = 3 // gravity multiplier when ducking mid-air
const JUMP_V = 640 // full jump ≈ 85 units high
const JUMP_CUT_V = 300 // releasing jump early caps upward speed to this…
const MIN_JUMP_H = 30 // …but only after rising this far, so taps still clear obstacles
const JUMP_BUFFER = 0.12 // a press just before landing still counts

const SPEED_START = 380
const SPEED_MAX = 800
const SPEED_ACCEL = 10
const SCORE_RATE = 0.025 // points per world unit travelled
const FLYER_SCORE = 300 // moths start appearing after this score
const FLYER_CHANCE = 0.25

const STEP = 1 / 120 // fixed physics step, so 60Hz and 144Hz play the same
const RESTART_DELAY = 400 // ms after a crash before input restarts the run
const HI_KEY = 'forest-run-high-score'

const GROUND_TYPES = [
  { kind: 'mushroom', w: 20, h: 26, color: '#d9432e' },
  { kind: 'mushroom', w: 28, h: 38, color: '#8a5a3c' },
  { kind: 'rock', w: 32, h: 20 },
  { kind: 'log', w: 50, h: 24 },
  { kind: 'cluster', w: 42, h: 32 },
]
const FLYER = { w: 30, h: 18 }
// Moth bottom heights: low = jump, mid = duck (or jump), high = run under
const FLYER_HEIGHTS = [8, 26, 56]

const C = {
  ink: '#0f2417',
  dark: '#345e42',
  sage: '#4f7a52',
  sageLight: '#8fb08a',
  cream: '#f4ebd9',
  warm: '#f8f4e8',
  cheek: '#e8a49a',
  red: '#d9432e',
  brown: '#8a5a3c',
  tan: '#c69a6d',
  rock: '#9fb39a',
  mothBody: '#6b5440',
  pineDark: '#2f5a3a',
  pineLight: '#6fa35f',
}

// Pixel sugar pine (D = dark green, L = light green, E = eye spot, . = empty)
const PX = 3 // world units per sprite pixel
const PINE_STAND = [
  '......D......',
  '.....DLD.....',
  '....DLLLD....',
  '...DDLLDDD...',
  '..DLLLLLLLD..',
  '....DDLDD....',
  '.DLLLLLLELLD.',
  '...DDDLDDD...',
  'DLLLLLLLLLLLD',
  '..DDDDLDDDD..',
  '.DLLLLLLLLLD.',
  'DLLLLLLLLLLLD',
  '.DDDDDLDDDDD.',
  '.....DLD.....',
  '.....DLD.....',
]
// Ducking: the same pine squashed low and wide
const PINE_DUCK = [
  '.......DD.......',
  '....DDLLLLDD....',
  '.DDLLLLLLLLLEDD.',
  'DLLLLLLLLLLLLLLD',
  '.DDDDDDLLDDDDDD.',
  '......DLLD......',
]
const PINE_COLORS = { D: C.pineDark, L: C.pineLight, E: C.pineLight }

// Repeating ground texture (pebbles + grass tufts), generated once
const GROUND_TILE = 300
const GROUND_BITS = Array.from({ length: 14 }, () => ({
  x: Math.random() * GROUND_TILE,
  y: 4 + Math.random() * 12,
  len: 2 + Math.random() * 6,
  tuft: Math.random() < 0.35,
}))

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function readHighScore() {
  try {
    return parseInt(localStorage.getItem(HI_KEY), 10) || 0
  } catch {
    return 0
  }
}

function writeHighScore(value) {
  try {
    localStorage.setItem(HI_KEY, String(value))
  } catch {
    /* storage unavailable — keep it in memory only */
  }
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

// Hitboxes are inset from the drawn shapes so near-misses feel fair.
// y is measured upward from the ground.
function playerBox(p) {
  const s = p.ducking ? DUCK : STAND
  return { x: PLAYER_X + 6, y: p.y + 2, w: s.w - 12, h: s.h - 7 }
}

function obstacleBox(o) {
  return o.kind === 'moth'
    ? { x: o.x + 4, y: o.y + 3, w: o.w - 8, h: o.h - 6 }
    : { x: o.x + 4, y: o.y, w: o.w - 8, h: o.h - 4 }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/* ============ DRAWING (world coordinates; gy = ground line) ============ */
function drawPlayer(ctx, p, gy, dead) {
  const bottom = gy - p.y
  const onGround = p.y === 0
  const sprite = p.ducking ? PINE_DUCK : PINE_STAND
  const left = PLAYER_X + ((p.ducking ? DUCK.w : STAND.w) - sprite[0].length * PX) / 2
  const cx = left + (sprite[0].length * PX) / 2
  // legs first so the trunk overlaps their tops
  drawLegs(ctx, cx - 8, cx + 3, bottom, p.runPhase, onGround)
  drawPixels(ctx, sprite, left, bottom - 4 - sprite.length * PX, dead)
}

function drawPixels(ctx, sprite, left, top, dead) {
  let eye = null
  sprite.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const ch = row[c]
      if (ch === '.') continue
      const x = left + c * PX
      const y = top + r * PX
      if (ch === 'E') eye = [x, y]
      ctx.fillStyle = PINE_COLORS[ch]
      // slight overlap hides hairline seams at fractional scales
      ctx.fillRect(x, y, PX + 0.25, PX + 0.25)
    }
  })
  // face goes on top of the needles
  if (eye) drawEye(ctx, eye[0], eye[1], dead)
}

// Round eye + blush cheek; the eye becomes an X on a crash
function drawEye(ctx, x, y, dead) {
  const ex = x + PX / 2
  const ey = y + PX / 2
  ctx.fillStyle = C.cheek
  ctx.globalAlpha = 0.75
  ctx.beginPath()
  ctx.arc(ex + 2, ey + 6, 2.6, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1
  if (dead) {
    ctx.strokeStyle = C.ink
    ctx.lineWidth = 1.6
    ctx.beginPath()
    ctx.moveTo(ex - 2.5, ey - 2.5)
    ctx.lineTo(ex + 2.5, ey + 2.5)
    ctx.moveTo(ex + 2.5, ey - 2.5)
    ctx.lineTo(ex - 2.5, ey + 2.5)
    ctx.stroke()
  } else {
    ctx.fillStyle = C.ink
    ctx.beginPath()
    ctx.arc(ex, ey, 2.3, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawLegs(ctx, x1, x2, bottom, phase, onGround) {
  const step = onGround ? Math.sin(phase) : 0
  ctx.fillStyle = C.dark
  // alternate which foot is lifted while running; both tucked in the air
  const lift1 = onGround ? Math.max(0, step) * 4 : 3
  const lift2 = onGround ? Math.max(0, -step) * 4 : 3
  roundRect(ctx, x1, bottom - 6 - lift1, 5, 6, 2)
  ctx.fill()
  roundRect(ctx, x2, bottom - 6 - lift2, 5, 6, 2)
  ctx.fill()
}

function drawMushroom(ctx, x, gy, w, h, color) {
  const stemW = w * 0.4
  const stemH = h * 0.55
  ctx.fillStyle = C.cream
  ctx.strokeStyle = C.dark
  ctx.lineWidth = 1.5
  roundRect(ctx, x + (w - stemW) / 2, gy - stemH, stemW, stemH, 2)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.ellipse(x + w / 2, gy - stemH, w / 2, h - stemH, 0, Math.PI, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  if (color === C.red) {
    ctx.fillStyle = '#fff'
    const capH = h - stemH
    for (const [fx, fy] of [[0.3, 0.5], [0.55, 0.75], [0.75, 0.45]]) {
      ctx.beginPath()
      ctx.arc(x + w * fx, gy - stemH - capH * fy, Math.max(1.4, w * 0.07), 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

function drawObstacle(ctx, o, gy) {
  if (o.kind === 'mushroom') {
    drawMushroom(ctx, o.x, gy, o.w, o.h, o.color)
  } else if (o.kind === 'cluster') {
    drawMushroom(ctx, o.x + 20, gy, 20, 22, C.tan)
    drawMushroom(ctx, o.x, gy, 26, o.h, C.red)
  } else if (o.kind === 'rock') {
    ctx.fillStyle = C.rock
    ctx.strokeStyle = C.sage
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(o.x, gy)
    ctx.quadraticCurveTo(o.x + 2, gy - o.h * 0.8, o.x + o.w * 0.4, gy - o.h)
    ctx.quadraticCurveTo(o.x + o.w * 0.85, gy - o.h * 1.05, o.x + o.w, gy)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  } else if (o.kind === 'log') {
    ctx.fillStyle = C.brown
    ctx.strokeStyle = '#5b3a24'
    ctx.lineWidth = 1.5
    roundRect(ctx, o.x, gy - o.h, o.w, o.h, 7)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = C.tan
    ctx.beginPath()
    ctx.ellipse(o.x + o.w - 7, gy - o.h / 2, 6, o.h / 2 - 1, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.ellipse(o.x + o.w - 7, gy - o.h / 2, 2.5, 5, 0, 0, Math.PI * 2)
    ctx.stroke()
  } else if (o.kind === 'moth') {
    const cx = o.x + o.w / 2
    const cy = gy - o.y - o.h / 2
    const flap = Math.sin(o.phase)
    ctx.strokeStyle = C.sage
    ctx.lineWidth = 1.5
    // wings flap up and down around the body
    ctx.fillStyle = C.warm
    ctx.beginPath()
    ctx.moveTo(cx - 7, cy)
    ctx.quadraticCurveTo(cx - 2, cy - 14 * flap, cx + 6, cy - 11 * flap)
    ctx.lineTo(cx + 5, cy)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = C.mothBody
    ctx.beginPath()
    ctx.ellipse(cx, cy, 10, 4, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = C.mothBody
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(cx - 9, cy - 1)
    ctx.quadraticCurveTo(cx - 14, cy - 6, cx - 15, cy - 8)
    ctx.stroke()
  }
}

function drawGround(ctx, w, gy, distance) {
  ctx.strokeStyle = C.sage
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, gy)
  ctx.lineTo(w, gy)
  ctx.stroke()

  const offset = distance % GROUND_TILE
  ctx.lineWidth = 1
  for (let tile = -offset; tile < w; tile += GROUND_TILE) {
    for (const b of GROUND_BITS) {
      const x = tile + b.x
      if (x < -10 || x > w + 10) continue
      ctx.beginPath()
      if (b.tuft) {
        ctx.strokeStyle = C.sage
        ctx.moveTo(x - 3, gy)
        ctx.lineTo(x - 1, gy - 5)
        ctx.moveTo(x, gy)
        ctx.lineTo(x + 2, gy - 6)
      } else {
        ctx.strokeStyle = C.sageLight
        ctx.moveTo(x, gy + b.y)
        ctx.lineTo(x + b.len, gy + b.y)
      }
      ctx.stroke()
    }
  }
}

function makeSpores() {
  return Array.from({ length: 12 }, () => ({
    fx: Math.random(),
    fy: 0.1 + Math.random() * 0.6,
    r: 1.2 + Math.random() * 1.8,
    vx: 8 + Math.random() * 14,
    bob: Math.random() * Math.PI * 2,
    sage: Math.random() < 0.5,
  }))
}

/* ============ COMPONENT ============ */
export default function Runner() {
  const containerRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('Press Space or tap to start')

  useEffect(() => {
    const container = containerRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const g = {
      state: 'idle', // idle | playing | paused | over
      view: { cssW: 0, cssH: 0, dpr: 1, scale: 1, w: MIN_VIEW_W, h: MIN_VIEW_H },
      player: { y: 0, vy: 0, ducking: false, runPhase: 0 },
      input: { jumpHeld: false, jumpBuffer: 0, duck: false },
      obstacles: [],
      gap: 0,
      speed: SPEED_START,
      distance: 0,
      score: 0,
      hi: readHighScore(),
      overAt: 0,
      spores: makeSpores(),
      reducedMotion: motionQuery.matches,
      inView: true,
    }

    let rafId = null
    let last = null
    let acc = 0

    function resetRun() {
      g.player = { y: 0, vy: 0, ducking: false, runPhase: 0 }
      g.obstacles = []
      g.gap = 200
      g.speed = SPEED_START
      g.distance = 0
      g.score = 0
      acc = 0
    }

    function startRun() {
      resetRun()
      g.state = 'playing'
      g.input.jumpBuffer = JUMP_BUFFER // open with a hop
      setStatus('Playing')
    }

    function pause() {
      if (g.state !== 'playing') return
      g.state = 'paused'
      g.input.jumpHeld = false
      g.input.duck = false
      setStatus('Paused. Press Space or tap to resume')
    }

    function gameOver() {
      g.state = 'over'
      g.overAt = performance.now()
      const final = Math.floor(g.score)
      if (final > g.hi) {
        g.hi = final
        writeHighScore(final)
      }
      setStatus(`Game over. Score ${final}. Press Space or tap to restart`)
    }

    function spawn() {
      const viewRight = g.view.w + 20
      let o
      if (g.score >= FLYER_SCORE && Math.random() < FLYER_CHANCE) {
        o = { kind: 'moth', ...FLYER, x: viewRight, y: pick(FLYER_HEIGHTS), phase: Math.random() * 6 }
      } else {
        o = { ...pick(GROUND_TYPES), x: viewRight, y: 0 }
      }
      g.obstacles.push(o)
      // Minimum gap leaves room to land from a full jump and take off again
      const minGap = g.speed * 0.6 + 40
      g.gap = o.w + minGap + Math.random() * g.speed * 0.8
    }

    function update(dt) {
      g.speed = Math.min(SPEED_MAX, g.speed + SPEED_ACCEL * dt)
      const dx = g.speed * dt
      g.distance += dx
      g.score += dx * SCORE_RATE

      const p = g.player
      const { input } = g
      const onGround = p.y === 0 && p.vy === 0
      if (input.jumpBuffer > 0) {
        input.jumpBuffer -= dt
        if (onGround) {
          p.vy = JUMP_V
          input.jumpBuffer = 0
        }
      }
      if (p.y > 0 || p.vy > 0) {
        // variable jump height: letting go early trims the rest of the climb
        if (!input.jumpHeld && p.vy > JUMP_CUT_V && p.y >= MIN_JUMP_H) p.vy = JUMP_CUT_V
        p.vy -= GRAVITY * (input.duck ? FAST_FALL : 1) * dt
        p.y += p.vy * dt
        if (p.y <= 0) {
          p.y = 0
          p.vy = 0
        }
      }
      p.ducking = input.duck && p.y === 0
      p.runPhase += dt * g.speed / 30

      for (const o of g.obstacles) {
        o.x -= dx
        if (o.kind === 'moth') o.phase += dt * 14
      }
      g.obstacles = g.obstacles.filter((o) => o.x + o.w > -20)

      g.gap -= dx
      if (g.gap <= 0) spawn()

      const pb = playerBox(p)
      if (g.obstacles.some((o) => overlaps(pb, obstacleBox(o)))) gameOver()
    }

    function updateDecor(dt) {
      if (g.reducedMotion) return
      for (const s of g.spores) {
        s.fx -= (s.vx * dt) / g.view.w
        s.bob += dt * 1.2
        if (s.fx < -0.02) {
          s.fx = 1.02
          s.fy = 0.1 + Math.random() * 0.6
        }
      }
    }

    function draw() {
      const { dpr, scale, w, h, cssW, cssH } = g.view
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0)
      const gy = h - GROUND_MARGIN

      for (const s of g.spores) {
        ctx.fillStyle = s.sage ? C.sageLight : C.warm
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.arc(s.fx * w, s.fy * gy + Math.sin(s.bob) * 4, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      drawGround(ctx, w, gy, g.distance)
      for (const o of g.obstacles) drawObstacle(ctx, o, gy)
      drawPlayer(ctx, g.player, gy, g.state === 'over')

      // HUD text is drawn in CSS pixels so it stays readable at any scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.textBaseline = 'top'
      ctx.textAlign = 'right'
      ctx.font = '600 13px ui-monospace, SFMono-Regular, Menlo, monospace'
      const pad = (n) => String(Math.floor(n)).padStart(5, '0')
      ctx.fillStyle = C.ink
      ctx.fillText(pad(g.score), cssW - 12, 10)
      ctx.fillStyle = C.sage
      ctx.fillText(`HI ${pad(g.hi)}`, cssW - 12 - ctx.measureText('00000').width - 14, 10)

      let title = null
      let sub = null
      if (g.state === 'idle') title = 'Press Space or tap to start'
      else if (g.state === 'paused') title = 'Paused — press Space or tap to resume'
      else if (g.state === 'over') {
        title = `Game over · ${Math.floor(g.score)}`
        sub = 'Press Space or tap to restart'
      }
      if (title) {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = C.ink
        ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
        ctx.fillText(title, cssW / 2, cssH * 0.36)
        if (sub) {
          ctx.fillStyle = C.dark
          ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
          ctx.fillText(sub, cssW / 2, cssH * 0.36 + 22)
        }
      }
    }

    function frame(now) {
      rafId = requestAnimationFrame(frame)
      if (last === null) last = now
      const dt = Math.min(0.25, (now - last) / 1000)
      last = now
      if (g.state === 'playing') {
        acc += dt
        while (acc >= STEP && g.state === 'playing') {
          update(STEP)
          acc -= STEP
        }
      }
      updateDecor(dt)
      draw()
    }

    function startLoop() {
      if (rafId !== null || document.hidden || !g.inView) return
      last = null
      acc = 0
      rafId = requestAnimationFrame(frame)
    }

    function stopLoop() {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = null
    }

    /* ---- input ---- */
    function pressJump() {
      g.input.jumpHeld = true
      if (g.state === 'idle') startRun()
      else if (g.state === 'over') {
        if (performance.now() - g.overAt > RESTART_DELAY) startRun()
      } else if (g.state === 'paused') {
        g.state = 'playing'
        setStatus('Playing')
      } else {
        g.input.jumpBuffer = JUMP_BUFFER
      }
      startLoop()
    }

    function releaseJump() {
      g.input.jumpHeld = false
    }

    const isJumpKey = (e) => e.code === 'Space' || e.key === ' ' || e.key === 'ArrowUp'
    const isDuckKey = (e) => e.key === 'ArrowDown'
    // Keys only belong to the game while it's focused or a run is live;
    // otherwise Space/arrows keep scrolling the page as usual.
    const isActive = () => document.activeElement === container || g.state === 'playing'

    function onKeyDown(e) {
      if (!isJumpKey(e) && !isDuckKey(e)) return
      if (!isActive()) return
      e.preventDefault()
      if (isDuckKey(e)) g.input.duck = true
      else if (!e.repeat) pressJump()
    }

    function onKeyUp(e) {
      if (isJumpKey(e)) releaseJump()
      else if (isDuckKey(e)) g.input.duck = false
    }

    function onPointerDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      container.focus({ preventScroll: true })
      stage.setPointerCapture?.(e.pointerId)
      pressJump()
    }

    /* ---- sizing ---- */
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (!width || !height) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      // Scale so at least MIN_VIEW_W × MIN_VIEW_H world units are visible
      const scale = Math.min(width / MIN_VIEW_W, height / MIN_VIEW_H)
      g.view = { cssW: width, cssH: height, dpr, scale, w: width / scale, h: height / scale }
      draw()
    })
    resizeObserver.observe(stage)

    /* ---- auto-pause ---- */
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        g.inView = entry.isIntersecting && entry.intersectionRatio >= 0.4
        if (g.inView) startLoop()
        else {
          pause()
          draw()
          stopLoop()
        }
      },
      { threshold: [0, 0.4] },
    )
    intersectionObserver.observe(container)

    function onVisibilityChange() {
      if (document.hidden) {
        pause()
        stopLoop()
      } else startLoop()
    }

    function onWindowBlur() {
      pause()
    }

    function onMotionChange(e) {
      g.reducedMotion = e.matches
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onWindowBlur)
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionQuery.addEventListener('change', onMotionChange)
    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointerup', releaseJump)
    stage.addEventListener('pointercancel', releaseJump)

    startLoop()

    return () => {
      stopLoop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onWindowBlur)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionQuery.removeEventListener('change', onMotionChange)
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointerup', releaseJump)
      stage.removeEventListener('pointercancel', releaseJump)
    }
  }, [])

  return (
    <div
      className="runner"
      ref={containerRef}
      tabIndex={0}
      role="application"
      aria-label="Forest Run game. Press Space or Up Arrow to jump, Down Arrow to duck."
      aria-describedby="runner-hint"
    >
      <div className="runner-stage" ref={stageRef}>
        <canvas className="runner-canvas" ref={canvasRef} aria-hidden="true" />
      </div>
      <p className="runner-hint" id="runner-hint">
        <kbd>Space</kbd> / <kbd>↑</kbd> or tap to jump (hold for higher) · <kbd>↓</kbd> to duck
      </p>
      <p className="runner-status" aria-live="polite">
        {status}
      </p>
    </div>
  )
}
