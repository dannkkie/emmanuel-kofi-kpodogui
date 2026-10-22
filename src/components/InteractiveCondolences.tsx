"use client";

import { useState, useEffect } from "react";
import { Send, Check, Share2 } from "lucide-react";

interface Note {
  id: string;
  name: string;
  message: string;
  date: string;
}

export function InteractiveCondolences() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("kpodogui_condolences");
        if (stored) {
          setNotes(JSON.parse(stored));
        }
      } catch {
        // Ignore local storage read errors
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    try {
      localStorage.setItem("kpodogui_condolences", JSON.stringify(updated));
    } catch {
      // localStorage write error fallback
    }

    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const sendViaWhatsApp = () => {
    if (!name.trim() || !message.trim()) return;
    const text = `Condolence Message for the Late Ex-WO1 Emmanuel Kofi Kpodogui (Ago Die):\n\n"${message.trim()}"\n\n— From: ${name.trim()}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-16 sm:py-20 px-4 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
            Digital Condolence Book
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif text-zinc-100 font-bold mt-2">
            Leave a Message of Comfort
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/60 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mt-2">
            Share a memory or word of sympathy for the family of Ex-WO1 Emmanuel Kofi Kpodogui.
          </p>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Your Full Name / Relationship
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sgt. Kwame Mensah (Colleague) or Auntie Joyce (Cousin)"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Your Words of Condolence
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your tribute, heartfelt prayer, or memorable encounter with 'Ago Die'..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400 transition-colors shadow-md"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Message Saved!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Save to Digital Book</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={sendViaWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-600/20 text-green-300 border border-green-600/40 text-xs font-semibold hover:bg-green-600/30 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Note via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>

        {/* List of visitor's saved messages */}
        {notes.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Your Saved Words of Solace
            </h4>
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80 text-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-semibold text-amber-300">{note.name}</p>
                  <span className="text-[10px] text-zinc-500">{note.date}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed italic">
                  “{note.message}”
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
