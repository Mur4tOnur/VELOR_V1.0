"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE?: Record<string, unknown>;
  }
}

const THREE_SCRIPT_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";

const THREE_WAIT_MS = 20_000;

let threeLoadPromise: Promise<void> | null = null;

function hasThreeGlobal(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      window.THREE &&
      typeof (window.THREE as { WebGLRenderer?: unknown }).WebGLRenderer ===
        "function",
  );
}

function waitForThreeGlobal(deadlineMs: number): Promise<void> {
  const start = performance.now();
  return new Promise((resolve, reject) => {
    const step = () => {
      if (hasThreeGlobal()) {
        resolve();
        return;
      }
      if (performance.now() - start >= deadlineMs) {
        reject(new Error("Timed out waiting for THREE"));
        return;
      }
      requestAnimationFrame(step);
    };
    step();
  });
}

function ensureThreeLoaded(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (hasThreeGlobal()) return Promise.resolve();
  if (threeLoadPromise) return threeLoadPromise;

  threeLoadPromise = (async () => {
    const existing = document.querySelector(
      "script[data-velor-three-shader]",
    ) as HTMLScriptElement | null;

    if (!existing) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = THREE_SCRIPT_SRC;
        script.async = true;
        script.dataset.velorThreeShader = "1";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Three.js script failed to load"));
        document.head.appendChild(script);
      });
    }

    // Script may have executed before our listeners ran (cache) — poll until THREE exists
    await waitForThreeGlobal(THREE_WAIT_MS);

    if (!hasThreeGlobal()) {
      throw new Error("THREE global missing after load");
    }
  })().catch((err) => {
    threeLoadPromise = null;
    throw err;
  });

  return threeLoadPromise;
}

export type ShaderAnimationProps = {
  className?: string;
};

/**
 * Full-bleed WebGL line shader (three.js r89 from Intro_Animation.md spec).
 * Loads the CDN script once; disposes renderer on unmount (script stays for HMR).
 */
export function ShaderAnimation({ className }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: { position: { z: number } };
    scene: unknown;
    renderer: {
      domElement: HTMLCanvasElement;
      setPixelRatio: (r: number) => void;
      setSize: (w: number, h: number) => void;
      render: (s: unknown, c: unknown) => void;
      dispose: () => void;
    };
    uniforms: { time: { value: number }; resolution: { value: { x: number; y: number } } };
    animationId: number | null;
    geometry: { dispose: () => void };
    material: { dispose: () => void };
    mesh: unknown;
  } | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let alive = true;
    let onWindowResize: (() => void) | null = null;

    const run = async () => {
      try {
        await ensureThreeLoaded();
      } catch {
        return;
      }
      if (!alive || !root.isConnected || !hasThreeGlobal()) return;

      const THREE = window.THREE as {
        Camera: new () => { position: { z: number } };
        Scene: new () => unknown;
        PlaneBufferGeometry: new (w: number, h: number) => { dispose: () => void };
        Vector2: new (x?: number, y?: number) => { x: number; y: number };
        ShaderMaterial: new (opts: unknown) => { dispose: () => void };
        Mesh: new (geo: unknown, mat: unknown) => unknown;
        WebGLRenderer: new (opts?: object) => {
          domElement: HTMLCanvasElement;
          setPixelRatio: (r: number) => void;
          setSize: (w: number, h: number) => void;
          render: (s: unknown, c: unknown) => void;
          dispose: () => void;
        };
      };

      try {
        root.innerHTML = "";

        const camera = new THREE.Camera();
        camera.position.z = 1;

        const scene = new THREE.Scene() as { add: (obj: unknown) => void };
        const geometry = new THREE.PlaneBufferGeometry(2, 2);

        const uniforms = {
          time: { type: "f", value: 1.0 },
          resolution: { type: "v2", value: new THREE.Vector2() },
        };

        const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

        const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy,
                               vec2(12.9898,78.233)))*
              43758.5453123);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);

        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);

        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
          }
        }

        gl_FragColor = vec4(color[2],color[1],color[0],1.0);
      }
    `;

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
        const pr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2);
        renderer.setPixelRatio(pr);
        const canvas = renderer.domElement;
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        root.appendChild(canvas);

        onWindowResize = () => {
          if (!alive || !root.isConnected) return;
          const rect = root.getBoundingClientRect();
          const w = Math.max(1, Math.floor(rect.width));
          const h = Math.max(1, Math.floor(rect.height));
          try {
            renderer.setSize(w, h);
            uniforms.resolution.value.x = renderer.domElement.width;
            uniforms.resolution.value.y = renderer.domElement.height;
          } catch {
            /* context may be lost */
          }
        };

        onWindowResize();
        window.addEventListener("resize", onWindowResize, false);

        sceneRef.current = {
          camera,
          scene,
          renderer,
          uniforms,
          animationId: null,
          geometry,
          material,
          mesh,
        };

        const animate = () => {
          if (!alive || !sceneRef.current) return;
          sceneRef.current.animationId = requestAnimationFrame(animate);
          try {
            uniforms.time.value += 0.05;
            renderer.render(scene, camera);
          } catch {
            if (alive && sceneRef.current?.animationId != null) {
              cancelAnimationFrame(sceneRef.current.animationId);
              sceneRef.current.animationId = null;
            }
          }
        };
        animate();
      } catch {
        if (alive && root.isConnected) {
          root.innerHTML = "";
        }
      }
    };

    void run();

    return () => {
      alive = false;
      if (onWindowResize) {
        window.removeEventListener("resize", onWindowResize, false);
      }
      const ctx = sceneRef.current;
      sceneRef.current = null;
      if (ctx?.animationId != null) {
        cancelAnimationFrame(ctx.animationId);
      }
      if (ctx?.renderer) {
        try {
          ctx.renderer.dispose();
        } catch {
          /* ignore */
        }
      }
      if (ctx?.geometry) ctx.geometry.dispose();
      if (ctx?.material) ctx.material.dispose();
      root.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className ?? "absolute inset-0 h-full w-full"}
      aria-hidden
    />
  );
}
