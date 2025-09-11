import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { summarizeText, extractActionItems, extractDecisions } from "@/lib/summarizer";
import { parseSRT, parseVTT } from "@/lib/subtitle";
import { Upload, FileText, Scissors, CheckCircle2, Download, Copy, FileAudio2, FileVideo2, Wand2 } from "lucide-react";
import { useAuthModal } from "@/lib/authModalContext.jsx";

function download(filename, text) {
  const element = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  element.remove();
}

function openPrint(title, content) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!doctype html><html><head><title>${title}</title><style>body{font:14px/1.6 ui-sans-serif,system-ui;margin:40px} h1{font-size:22px;margin:0 0 12px} h2{font-size:18px;margin:20px 0 8px}</style></head><body>${content.replace(/\n/g, "<br/>")}</body></html>`);
  w.document.close();
  w.focus();
  w.print();
}

export default function AppMain() {
  const [dragOver, setDragOver] = useState(false);
  const [filename, setFilename] = useState(null);
  const [fileInfo, setFileInfo] = useState("");
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [actions, setActions] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const handleFiles = useCallback(async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    // Only accept audio/video files
    const type = file.type;
    if (!type.startsWith("audio/") && !type.startsWith("video/")) {
      setFilename(null);
      setFileInfo("Only audio or video files are accepted. Please upload a .mp3, .wav, .mp4, or similar media file.");
      return;
    }

    // Reset previous outputs and set file
    setFilename(file.name);
    setSummary("");
    setActions([]);
    setDecisions([]);
    setTranscript("");

    setFileInfo("Audio/Video accepted. Click \"Summarize\" to simulate upload and transcription.");
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const SAMPLE_TRANSCRIPT = `Good morning everyone. Thanks for joining the weekly sync. Today we have three main topics: product roadmap updates, QA timeline, and marketing launch plans. First, Alice will share the status on the mobile release.\n\nAlice: The mobile release is on track. We completed the performance improvements and are validating the last round of tests. The ETA for beta is next Wednesday. We still need to confirm crash rates on Android.\n\nBob: For QA, we need two more engineers to handle regression testing; I will assign Clara to own the test matrix and Daniel to help with automation.\n\nCarol: On marketing, we plan to prepare launch assets by Friday and coordinate a short demo for partners. We decided to prioritize the demo video and a one-page summary.\n\nAction items: Alice to follow up on Android crash rate (due next Monday). Bob to onboard two QA engineers and share test plan. Carol to finalize partner demo script.\n\nThanks everyone — we'll reconvene next Tuesday for a quick status update.`;

  const { isAuthenticated, openModal } = useAuthModal();

  const runSummarize = useCallback(() => {
    // require authentication
    if (!isAuthenticated) {
      openModal('signin');
      return;
    }

    // Reset previous outputs
    setActions([]);
    setDecisions([]);

    // If user already provided a transcript, summarize locally
    if (transcript.trim()) {
      setProgress(10);
      const steps = [30, 55, 75, 100];
      let i = 0;
      const timer = setInterval(() => {
        setProgress(steps[i]);
        i++;
        if (i >= steps.length) {
          clearInterval(timer);
          const s = summarizeText(transcript, { ratio: 0.25, tone: 'neutral' });
          setSummary(s);
          setActions(extractActionItems(transcript));
          setDecisions(extractDecisions(transcript));
          setFileInfo("Summary generated from provided transcript.");
        }
      }, 250);
      return;
    }

    // No transcript provided: simulate upload + backend transcription + summarization
    setFileInfo("No transcript provided. Simulating upload and transcription (demo)...");
    setFilename((f) => f || "meeting-demo.mp3");
    setProgress(5);

    // Simulate upload phase
    setTimeout(() => setProgress(25), 400);
    setTimeout(() => {
      setProgress(50);
      setFileInfo("Transcribing (simulated)...");
    }, 900);

    // Simulate transcription progress
    setTimeout(() => setProgress(75), 1700);
    setTimeout(() => setProgress(92), 2200);

    // Finalize: set transcript, then generate summary
    setTimeout(() => {
      setProgress(100);
      setTranscript(SAMPLE_TRANSCRIPT);
      const s = summarizeText(SAMPLE_TRANSCRIPT, { ratio: 0.25, tone: 'neutral' });
      setSummary(s);
      setActions(extractActionItems(SAMPLE_TRANSCRIPT));
      setDecisions(extractDecisions(SAMPLE_TRANSCRIPT));
      setFileInfo("Demo transcription complete. Summary generated.");
    }, 2600);
  }, [transcript]);

  const combinedForExport = useMemo(() => {
    const blocks = [
      "# Meeting Summary",
      summary.trim(),
      actions.length ? `\n## Action Items\n${actions.map(a=>`- ${a}`).join("\n")}` : "",
      decisions.length ? `\n## Decisions\n${decisions.map(d=>`- ${d}`).join("\n")}` : "",
    ].filter(Boolean);
    return blocks.join("\n\n");
  }, [summary, actions, decisions]);

  return (
    <div className="min-h-[calc(100vh-64px-64px)] bg-gradient-to-b from-background via-background to-background">
      <div className="container py-10 grid gap-6 lg:grid-cols-2">
        <div>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="text-violet-600" /> Upload audio / video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDragOver={(e)=>{e.preventDefault(); setDragOver(true);}}
                onDragLeave={()=>setDragOver(false)}
                onDrop={onDrop}
                className={cn(
                  "relative grid place-items-center rounded-lg border border-dashed p-8",
                  dragOver ? "border-violet-500 bg-violet-500/5" : "border-muted-foreground/30",
                )}
              >
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <FileText /> <FileAudio2 /> <FileVideo2 />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop an audio or video file here (mp3, wav, mp4). Transcripts like .txt/.srt/.vtt are not accepted via this uploader.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Button variant="secondary" onClick={()=>inputRef.current?.click()}>Choose File</Button>
                    {filename && <span className="text-xs text-muted-foreground">{filename}</span>}
                  </div>
                  {fileInfo && <p className="text-xs text-muted-foreground">{fileInfo}</p>}
                </div>
                <input ref={inputRef} type="file" accept="audio/*,video/*" className="hidden" onChange={(e)=>handleFiles(e.target.files)} />
                <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/0 via-fuchsia-500/10 to-sky-500/0 [mask-image:linear-gradient(90deg,transparent,black,transparent)] animate-[shimmer_2s_infinite]" />
              </div>

              <div className="text-sm text-muted-foreground">
                For demo, click "Summarize" to simulate upload and transcription of the uploaded media file.
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button onClick={runSummarize} className="gap-2"><Wand2 className="size-4"/> Summarize</Button>
                <div className="flex-1"><Progress value={progress} /></div>
              </div>

            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Scissors className="text-fuchsia-600"/> Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea rows={12} value={summary} onChange={(e)=>setSummary(e.target.value)} />
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="secondary" className="gap-2" onClick={()=>navigator.clipboard.writeText(combinedForExport)}><Copy className="size-4"/> Copy</Button>
                <Button variant="secondary" className="gap-2" onClick={()=>download("summary.txt", combinedForExport)}><Download className="size-4"/> TXT</Button>
                <Button variant="secondary" className="gap-2" onClick={()=>download("summary.md", combinedForExport)}><Download className="size-4"/> Markdown</Button>
                <Button className="gap-2" onClick={()=>openPrint("Meeting Summary", `<h1>Meeting Summary</h1><p>${summary.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</p>${actions.length?`<h2>Action Items</h2><ul>${actions.map(a=>`<li>${a}</li>`).join("")}</ul>`:""}${decisions.length?`<h2>Decisions</h2><ul>${decisions.map(d=>`<li>${d}</li>`).join("")}</ul>`:""}`)}><Download className="size-4"/> PDF</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle2 className="text-sky-600"/> Action Items</CardTitle>
              </CardHeader>
              <CardContent>
                {actions.length ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {actions.map((a,i)=> <li key={i}>{a}</li>)}
                  </ul>
                ): <p className="text-sm text-muted-foreground">No action items detected yet.</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle2 className="text-emerald-600"/> Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                {decisions.length ? (
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {decisions.map((d,i)=> <li key={i}>{d}</li>)}
                  </ul>
                ): <p className="text-sm text-muted-foreground">No decisions detected yet.</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
