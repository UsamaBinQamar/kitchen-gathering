import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Mic, MicOff, Pause, Play } from "lucide-react";
import type { Recipe } from "@/lib/recipe-types";
import { toast } from "sonner";

type SpeechRecognition = any;

export function CookNow({ recipe, onExit }: { recipe: Recipe; onExit: () => void }) {
  const steps = recipe.instructions;
  const [step, setStep] = useState(0);
  const [listening, setListening] = useState(false);
  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Wake lock — keep screen on
  useEffect(() => {
    let cancelled = false;
    async function lock() {
      try {
        const nav = navigator as Navigator & { wakeLock?: { request: (t: string) => Promise<{ release: () => Promise<void> }> } };
        if (nav.wakeLock) {
          const wl = await nav.wakeLock.request("screen");
          if (cancelled) { wl.release(); return; }
          wakeLockRef.current = wl;
        }
      } catch {/* no-op */}
    }
    lock();
    const onVis = () => { if (document.visibilityState === "visible" && !wakeLockRef.current) lock(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
    };
  }, []);

  // ESC to exit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
      else if (e.key === "ArrowRight") setStep((s) => Math.min(s + 1, steps.length - 1));
      else if (e.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steps.length, onExit]);

  function toggleVoice() {
    const w = window as Window & { SpeechRecognition?: any; webkitSpeechRecognition?: any };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return toast.error("Voice commands aren't supported in this browser");
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const r = new SR();
    r.continuous = true;
    r.interimResults = false;
    r.lang = "en-US";
    r.onresult = (e: any) => {
      const last = e.results[e.results.length - 1][0].transcript.toLowerCase().trim();
      if (/(next|forward|continue)/.test(last)) setStep((s) => Math.min(s + 1, steps.length - 1));
      else if (/(back|previous|repeat)/.test(last)) setStep((s) => Math.max(s - 1, 0));
      else if (/(stop|exit|done|finish)/.test(last)) onExit();
      else if (/(read|say) (it|that|again)/.test(last)) speak(steps[step]);
    };
    r.onerror = () => setListening(false);
    r.onend = () => { if (listening) try { r.start(); } catch {} };
    try { r.start(); recognitionRef.current = r; setListening(true); toast.success("Listening: say 'next', 'back', or 'exit'"); }
    catch { setListening(false); }
  }

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(u);
  }

  useEffect(() => {
    return () => { recognitionRef.current?.stop(); speechSynthesis?.cancel(); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background text-foreground">
      <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Cook Now</p>
          <h2 className="font-display text-xl">{recipe.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={listening ? "default" : "outline"} size="sm" onClick={toggleVoice} className="rounded-full">
            {listening ? <><MicOff className="mr-1 h-4 w-4" />Listening</> : <><Mic className="mr-1 h-4 w-4" />Voice</>}
          </Button>
          <Button variant="ghost" size="icon" onClick={onExit} aria-label="Exit"><X className="h-5 w-5" /></Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        <div className="mb-6 text-center">
          <p className="font-display text-2xl text-primary">Step {step + 1} <span className="text-muted-foreground">/ {steps.length}</span></p>
        </div>
        <p className="max-w-4xl text-center font-display text-3xl leading-snug md:text-5xl">
          {steps[step]}
        </p>
        <Button variant="ghost" size="sm" className="mt-8" onClick={() => speak(steps[step])}>
          <Play className="mr-2 h-4 w-4" />Read this step
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border/60 px-6 py-5">
        <Button size="lg" variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-full">
          <ChevronLeft className="mr-1 h-5 w-5" />Back
        </Button>
        <div className="flex flex-1 items-center gap-1 px-4">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <Button size="lg" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)} className="rounded-full">
          Next<ChevronRight className="ml-1 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
