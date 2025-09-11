import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Timer, Shield, Upload, FileText, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthModal } from "@/lib/authModalContext.jsx";

export default function Landing() {
  const { openModal } = useAuthModal();
  return (
    <div className="min-h-[calc(100vh-64px-64px)] bg-gradient-to-b from-background to-background">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 size-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/20 via-fuchsia-500/20 to-sky-500/20 blur-3xl" />
        <div className="container py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1 initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Turn meetings into <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600">crisp summaries</span>
              </motion.h1>
              <motion.p initial={{opacity:0, y:10}} animate={{opacity:1,y:0, transition:{delay:0.1}}} className="mt-5 text-lg text-muted-foreground max-w-xl">
                Meet Summarizer converts your meeting recordings into clean, editable summaries with action items and decisions — ready to share.
              </motion.p>
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0, transition:{delay:0.2}}} className="mt-8 flex flex-wrap gap-3">
                <Button className="h-11 px-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600" onClick={()=>openModal('signup')}>Get started free</Button>
                <a href="#how"><Button variant="outline" className="h-11 px-6">See how it works</Button></a>
              </motion.div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600"/> AI-powered summaries</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600"/> Edit & export</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600"/> Fast & modern</div>
              </div>
            </div>
            <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.5, delay:0.1}} className="relative">
              <div className="rounded-xl border bg-card/60 backdrop-blur shadow-lg">
                <div className="p-4 border-b flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 rounded-full bg-rose-500"/><span className="size-2 rounded-full bg-amber-500"/><span className="size-2 rounded-full bg-emerald-500"/> demo.meet-summarizer</div>
                <div className="p-6 grid gap-4">
                  <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                    <div className="flex justify-center gap-2 mb-2 text-foreground"><Upload/><FileText/><Wand2/></div>
                    Drop a transcript file or paste text, then click Summarize
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-sm">
                        <div className="font-semibold mb-1">Summary</div>
                        <p className="text-muted-foreground">Concise, structured overview of key points.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-sm">
                        <div className="font-semibold mb-1">Action Items</div>
                        <p className="text-muted-foreground">Clear tasks with owners and due dates.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 md:right-0 md:bottom-0 size-24 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 blur-2xl opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="container py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Made for busy teams</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">A fast, delightful way to go from meeting recordings to ready-to-share notes.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature icon={<Sparkles className="text-fuchsia-600"/>} title="Clean summaries" desc="Intelligent extractive summaries that keep what matters." />
          <Feature icon={<Timer className="text-violet-600"/>} title="Save time" desc="Cut note-taking time from hours to minutes." />
          <Feature icon={<Shield className="text-sky-600"/>} title="Local-first" desc="Runs in your browser — paste transcripts, no sign-in." />
          <Feature icon={<Wand2 className="text-emerald-600"/>} title="Editable" desc="Refine summaries before exporting or sharing." />
          <Feature icon={<Upload className="text-rose-600"/>} title="Flexible input" desc="Drop .txt/.srt/.vtt or paste raw notes." />
          <Feature icon={<FileText className="text-amber-600"/>} title="Export anywhere" desc="Copy, TXT/MD download, or print to PDF." />
        </div>
      </section>

      <section id="how" className="container py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Step n={1} title="Upload or paste" desc="Drop a transcript file or paste meeting notes." />
          <Step n={2} title="Summarize" desc="Choose tone and length, then generate a clean summary." />
          <Step n={3} title="Edit & export" desc="Tweak the text and export to TXT, MD, or PDF." />
        </div>
        <div className="text-center mt-10">
           <Button className="h-11 px-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-sky-600"onClick={()=>openModal('signup')}>Start now</Button>
        </div>
      </section>
    </div>
  );
}

function Feature({icon, title, desc}){
  return (
    <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4}} className="rounded-xl border p-5 bg-card">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-accent/60">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">{desc}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Step({n, title, desc}){
  return (
    <div className="rounded-xl border p-6">
      <div className="size-8 grid place-items-center rounded-full bg-gradient-to-r from-violet-600 to-sky-600 text-white font-semibold">{n}</div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}
