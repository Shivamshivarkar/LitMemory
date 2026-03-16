/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef, MouseEvent } from "react";
import { novels, Novel } from "./data";
import { dramas, Drama } from "./dramaData";
import { proseDatabase, Prose } from "./prosedata";
import { poemData, Poem } from "./poemdata";
import { Search, Shuffle, RotateCcw, BookOpen, GraduationCap, CheckCircle2, XCircle, Info, Trophy, ArrowRight, Theater, X, Menu, Layout, History, Download, List, Feather } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

type Mode = "novels" | "dramas" | "prose" | "poems" | "quiz";
type QuizType = "novels" | "dramas" | "prose" | "poems" | "all";

interface QuizHistoryItem {
  item: Novel | Drama | Prose | Poem;
  selectedAnswer: string;
  isCorrect: boolean;
}

// ── Utility ──────────────────────────────────────────────────────────────────
const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
const getCategoryColor = (cat: string) => {
  const map: Record<string, string> = { 
    British: "#a855f7", // Purple
    "British Prose": "#a855f7",
    American: "#10b981", // Emerald
    "American Prose": "#10b981",
    Indian: "#f97316", // Orange
    "Indian Prose": "#f97316",
    European: "#3b82f6", // Blue
    World: "#6366f1", // Indigo
    "Other Prose": "#ec4899", // Pink
    "World Prose": "#6366f1"
  };
  return map[cat] || "#a3a3a3";
};

// ── Sub-components ────────────────────────────────────────────────────────────

interface CategoryPillProps {
  key?: string | number;
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}

function CategoryPill({ label, active, color, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
        active 
          ? "shadow-sm" 
          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300"
      }`}
      style={active ? { 
        backgroundColor: color + "15", 
        color: color, 
        borderColor: color + "40" 
      } : {}}
    >
      {label}
    </button>
  );
}

interface FlashCardProps {
  key?: string;
  item: Novel | Drama | Prose;
  index: number;
  isFlipped: boolean;
  onFlip: (idx: number) => void;
  onInfo: (item: Novel | Drama | Prose) => void;
}

function FlashCard({ item, index, isFlipped, onFlip, onInfo }: FlashCardProps) {
  const color = getCategoryColor(item.category);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onFlip(index);
      }}
      className="h-52 cursor-pointer relative group"
      style={{ perspective: 1000 }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-xl group-hover:border-zinc-700 transition-colors">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          />
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>
              {item.category}
            </span>
            <div className="mt-2 text-lg font-bold text-zinc-100 leading-tight font-serif">
              {item.title}
            </div>
            {item.year && (
              <div className="mt-1 text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{item.year}</div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Tap to reveal</span>
            <button
              onClick={(e) => { e.stopPropagation(); onInfo(item); }}
              className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 transition-colors"
              title="Details"
            >
              <Info size={14} />
            </button>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden rotate-y-180 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl"
          style={{ background: `linear-gradient(135deg, ${color}11, transparent)` }}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: color + "cc" }}>
            Author of "{item.title}"
          </div>
          <div className="text-xl font-bold text-zinc-100 font-serif">
            {item.author}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ item, onClose, mode }: { item: Novel | Drama | Prose | Poem | null, onClose: () => void, mode: string }) {
  if (!item) return null;
  const color = getCategoryColor(item.category);
  
  // Helper to check if it's a Poem
  const isPoem = 'poet' in item || 'form' in item;
  
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-400 transition-colors"
        >
          <X size={20} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>
          {item.category} {item.category.toLowerCase().includes(mode === "novels" ? "novel" : mode === "dramas" ? "drama" : mode === "poems" ? "poem" : "prose") ? "" : mode === "novels" ? "Novel" : mode === "dramas" ? "Drama" : mode === "poems" ? "Poem" : "Prose"}
        </span>
        <h2 className="text-3xl font-bold text-zinc-50 mt-2 mb-1 font-serif">{item.title}</h2>
        <p className="text-zinc-400 text-lg mb-8">by {item.author} {item.year ? `· ${item.year}` : ""}</p>

        <div className="space-y-6">
          {isPoem && (item as Poem).poet && (
            <div className="bg-zinc-950/30 border border-zinc-800/50 rounded-xl p-4">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Poet Context</div>
              <p className="text-zinc-300 text-sm">{(item as Poem).poet}</p>
            </div>
          )}
          {isPoem && (item as Poem).form && (
            <div className="bg-zinc-950/30 border border-zinc-800/50 rounded-xl p-4">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Poetic Form</div>
              <p className="text-zinc-300 text-sm">{(item as Poem).form}</p>
            </div>
          )}
          {item.summary && (
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
              <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">The Story / Essence</div>
              <p className="text-zinc-300 text-sm leading-relaxed italic">"{item.summary}"</p>
            </div>
          )}
          {item.facts && (
            <div className="rounded-2xl p-6 border border-zinc-800" style={{ background: color + "08", borderColor: color + "22" }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>Literary Fact</div>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">{item.facts}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("poems");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [shuffledItems, setShuffledItems] = useState<(Novel | Drama | Prose | Poem)[]>([]);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [isListView, setIsListView] = useState(false);
  
  // Quiz state
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);

  const [selectedItem, setSelectedItem] = useState<Novel | Drama | Prose | Poem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastActiveMode, setLastActiveMode] = useState<Mode>("poems");

  const currentItems = useMemo(() => {
    if (mode === "novels") return novels;
    if (mode === "dramas") return dramas;
    if (mode === "poems") return poemData;
    return proseDatabase;
  }, [mode]);
  const categories = useMemo(() => Array.from(new Set(currentItems.map(n => n.category))), [currentItems]);

  const handleShuffle = () => {
    const baseItems = selectedCategory 
      ? currentItems.filter(item => item.category === selectedCategory)
      : currentItems;
    setShuffledItems(shuffleArray(baseItems).slice(0, 9));
    setFlippedIndex(null);
  };

  useEffect(() => {
    if (mode !== "quiz") {
      handleShuffle();
    }
  }, [mode, selectedCategory, currentItems]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return shuffledItems;
    const q = search.toLowerCase();
    return currentItems.filter(i =>
      i.title.toLowerCase().includes(q) || i.author.toLowerCase().includes(q)
    );
  }, [search, shuffledItems, currentItems]);

  const openDetails = (item: Novel | Drama | Prose) => {
    setSelectedItem(item);
  };

  const toggleCard = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    setFlippedIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleGlobalClick = () => setFlippedIndex(null);
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // Quiz Logic
  const startQuiz = (type: QuizType) => {
    let sourceItems: (Novel | Drama | Prose | Poem)[] = [];
    let quizCount = 10;

    if (type === "novels") {
      sourceItems = novels;
    } else if (type === "dramas") {
      sourceItems = dramas;
    } else if (type === "prose") {
      sourceItems = proseDatabase;
    } else if (type === "poems") {
      sourceItems = poemData;
    } else if (type === "all") {
      sourceItems = [...novels, ...dramas, ...proseDatabase, ...poemData];
      quizCount = 20;
    }

    const quizSet = [...sourceItems].sort(() => Math.random() - 0.5).slice(0, quizCount);
    setShuffledItems(quizSet);
    setQuizType(type);
    setQuizIndex(0);
    setScore(0);
    setQuizFinished(false);
    setQuizHistory([]);
    setMode("quiz");
    generateOptions(quizSet[0], sourceItems);
  };

  const generateOptions = (currentItem: Novel | Drama | Prose | Poem, sourceItems: (Novel | Drama | Prose | Poem)[]) => {
    const others = sourceItems
      .filter(n => n.author !== currentItem.author)
      .map(n => n.author);
    const randomOthers = Array.from(new Set(others))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const allOptions = [...randomOthers, currentItem.author].sort(() => Math.random() - 0.5);
    setQuizOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = async (answer: string) => {
    if (selectedAnswer) return;
    
    const currentItem = shuffledItems[quizIndex];
    const correct = answer === currentItem.author;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);

    // Record history
    setQuizHistory(prev => [...prev, {
      item: currentItem,
      selectedAnswer: answer,
      isCorrect: correct,
    }]);
  };

  const nextQuestion = async () => {
    if (quizIndex < shuffledItems.length - 1) {
      const nextIdx = quizIndex + 1;
      setQuizIndex(nextIdx);
      let sourceItems: (Novel | Drama | Prose | Poem)[] = [];
      if (quizType === "novels") sourceItems = novels;
      else if (quizType === "dramas") sourceItems = dramas;
      else if (quizType === "prose") sourceItems = proseDatabase;
      else if (quizType === "poems") sourceItems = poemData;
      else sourceItems = [...novels, ...dramas, ...proseDatabase, ...poemData];
      
      generateOptions(shuffledItems[nextIdx], sourceItems);
    } else {
      setQuizFinished(true);
      
      if (score >= (shuffledItems.length / 2)) {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookOpen size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-50">LitMemory</h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Trainer</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center bg-zinc-900/50 border border-zinc-800 rounded-2xl p-1">
            <button 
              onClick={() => { setMode("poems"); setSelectedCategory(null); setSearch(""); setLastActiveMode("poems"); setIsListView(false); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "poems" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Poetry
            </button>
            <button 
              onClick={() => { setMode("dramas"); setSelectedCategory(null); setSearch(""); setLastActiveMode("dramas"); setIsListView(false); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "dramas" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Dramas
            </button>
            <button 
              onClick={() => { setMode("novels"); setSelectedCategory(null); setSearch(""); setLastActiveMode("novels"); setIsListView(false); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "novels" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Novels
            </button>
            <button 
              onClick={() => { setMode("prose"); setSelectedCategory(null); setSearch(""); setLastActiveMode("prose"); setIsListView(false); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "prose" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Prose
            </button>
            <button 
              onClick={() => { setMode("quiz"); setQuizType(null); setQuizFinished(false); setLastActiveMode("quiz"); setIsListView(false); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "quiz" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Quiz
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://drive.google.com/drive/folders/1F_jxZJxYOTDid7MKGvv0BOHuFgkG9GKa?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-zinc-400 hover:text-indigo-400 bg-zinc-900 border border-zinc-800 rounded-xl transition-all hover:border-indigo-500/30 hover:bg-indigo-500/5 flex items-center gap-2 group"
              title="Download Resources"
            >
              <Download size={20} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest">Resources</span>
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800 z-50 md:hidden p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <span className="font-bold text-zinc-50">Menu</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2 flex-1">
                <button 
                  onClick={() => { setMode("poems"); setSelectedCategory(null); setSearch(""); setLastActiveMode("poems"); setIsMobileMenuOpen(false); setIsListView(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "poems" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <Feather size={20} />
                  Poetry
                </button>
                <button 
                  onClick={() => { setMode("dramas"); setSelectedCategory(null); setSearch(""); setLastActiveMode("dramas"); setIsMobileMenuOpen(false); setIsListView(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "dramas" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <Theater size={20} />
                  Dramas
                </button>
                <button 
                  onClick={() => { setMode("novels"); setSelectedCategory(null); setSearch(""); setLastActiveMode("novels"); setIsMobileMenuOpen(false); setIsListView(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "novels" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <BookOpen size={20} />
                  Novels
                </button>
                <button 
                  onClick={() => { setMode("prose"); setSelectedCategory(null); setSearch(""); setLastActiveMode("prose"); setIsMobileMenuOpen(false); setIsListView(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "prose" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <Layout size={20} />
                  Prose
                </button>
                <button 
                  onClick={() => { setMode("quiz"); setQuizType(null); setQuizFinished(false); setLastActiveMode("quiz"); setIsMobileMenuOpen(false); setIsListView(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "quiz" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <GraduationCap size={20} />
                  Quiz
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {(mode === "novels" || mode === "dramas" || mode === "prose" || mode === "poems") ? (
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder={`Search ${mode === "novels" ? "novels" : mode === "dramas" ? "dramas" : mode === "poems" ? "poems" : "prose"}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600 text-zinc-200"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 bg-zinc-900/50 p-1.5 border border-zinc-800 rounded-2xl">
                <CategoryPill 
                  label="All" 
                  active={!selectedCategory} 
                  color="#e4e4e7" 
                  onClick={() => { setSelectedCategory(null); setIsListView(false); }} 
                />
                {categories.map(cat => (
                  <CategoryPill 
                    key={cat}
                    label={cat}
                    active={selectedCategory === cat}
                    color={getCategoryColor(cat)}
                    onClick={() => { setSelectedCategory(cat); setIsListView(false); }}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsListView(!isListView)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold text-sm shadow-lg active:scale-95 ${isListView ? "bg-zinc-100 text-zinc-900 shadow-white/10" : "bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700"}`}
                >
                  {isListView ? <Layout size={18} /> : <List size={18} />}
                  {isListView ? "Grid View" : "List View"}
                </button>
                <button 
                  onClick={handleShuffle}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  <Shuffle size={18} />
                  Shuffle
                </button>
              </div>
            </div>

            {isListView ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-zinc-50 flex items-center gap-3">
                    <List className="text-indigo-400" />
                    All {selectedCategory || mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </h3>
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{currentItems.filter(i => !selectedCategory || i.category === selectedCategory).length} Entries</span>
                </div>
                <div className="divide-y divide-zinc-800 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {(selectedCategory 
                    ? currentItems.filter(item => item.category === selectedCategory)
                    : currentItems
                  ).filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.author.toLowerCase().includes(search.toLowerCase()))
                  .map((item, idx) => (
                    <div key={idx} className="p-4 hover:bg-zinc-800/30 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-zinc-100 font-bold font-serif italic">{item.title}</h4>
                          <p className="text-zinc-500 text-xs">by {item.author} {item.year ? `· ${item.year}` : ""}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline text-[10px] font-bold px-2 py-1 rounded-md bg-zinc-800 text-zinc-500 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <button 
                          onClick={() => openDetails(item)}
                          className="p-2 bg-zinc-800 hover:bg-indigo-600 text-zinc-400 hover:text-white rounded-xl transition-all"
                          title="View Details"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, idx) => (
                    <FlashCard 
                      key={`${item.title}-${idx}`}
                      item={item}
                      index={idx}
                      isFlipped={flippedIndex === idx}
                      onFlip={(i) => setFlippedIndex(flippedIndex === i ? null : i)}
                      onInfo={(it) => openDetails(it)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {!isListView && (
              <div className="flex justify-center pt-4">
                <button 
                  onClick={() => setIsListView(true)}
                  className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all shadow-xl"
                >
                  <span className="text-sm font-bold uppercase tracking-widest">See All Entries</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            
            {filteredItems.length === 0 && (
              <div className="text-center py-32 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-3xl">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-300">No results found</h3>
                <p className="text-zinc-500 mt-2">Try adjusting your search or category filters.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {!quizType ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <button 
                  onClick={() => startQuiz("prose")}
                  className="group bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md hover:bg-indigo-600/20 transition-all text-center"
                >
                  <Layout className="mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition-transform" size={48} />
                  <h3 className="text-2xl font-bold mb-2">Prose Quiz</h3>
                  <p className="text-slate-400 text-sm">Test your knowledge of classic prose and essays.</p>
                </button>
                <button 
                  onClick={() => startQuiz("novels")}
                  className="group bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md hover:bg-indigo-600/20 transition-all text-center"
                >
                  <BookOpen className="mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition-transform" size={48} />
                  <h3 className="text-2xl font-bold mb-2">Novels Quiz</h3>
                  <p className="text-slate-400 text-sm">Test your knowledge of classic novels and their authors.</p>
                </button>
                <button 
                  onClick={() => startQuiz("dramas")}
                  className="group bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md hover:bg-emerald-600/20 transition-all text-center"
                >
                  <Theater className="mx-auto mb-4 text-emerald-400 group-hover:scale-110 transition-transform" size={48} />
                  <h3 className="text-2xl font-bold mb-2">Dramas Quiz</h3>
                  <p className="text-slate-400 text-sm">Challenge yourself with famous plays and dramatists.</p>
                </button>
                <button 
                  onClick={() => startQuiz("poems")}
                  className="group bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md hover:bg-pink-600/20 transition-all text-center"
                >
                  <Feather className="mx-auto mb-4 text-pink-400 group-hover:scale-110 transition-transform" size={48} />
                  <h3 className="text-2xl font-bold mb-2">Poetry Quiz</h3>
                  <p className="text-slate-400 text-sm">Test your knowledge of famous poems and poets.</p>
                </button>
                <button 
                  onClick={() => startQuiz("all")}
                  className="group bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md hover:bg-amber-600/20 transition-all text-center"
                >
                  <GraduationCap className="mx-auto mb-4 text-amber-400 group-hover:scale-110 transition-transform" size={48} />
                  <h3 className="text-2xl font-bold mb-2">Combined Quiz</h3>
                  <p className="text-slate-400 text-sm">20 questions from Novels, Dramas, Prose, and Poetry.</p>
                </button>
              </motion.div>
            ) : !quizFinished ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl"
              >
                <div className="flex justify-between items-center mb-10">
                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Question {quizIndex + 1} of {shuffledItems.length}</p>
                    <div className="h-1.5 w-48 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((quizIndex + 1) / shuffledItems.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-zinc-950 px-4 py-2 rounded-xl border border-zinc-800">
                    <span className="text-indigo-400 font-bold text-xl">{score}</span>
                    <span className="text-zinc-600 ml-1 text-xs font-bold uppercase tracking-widest">pts</span>
                  </div>
                </div>

                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Who wrote <span className="text-indigo-400 italic">"{shuffledItems[quizIndex].title}"</span>?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizOptions.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = option === shuffledItems[quizIndex].author;
                    
                    let buttonClass = "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200";
                    if (selectedAnswer) {
                      if (isCorrectOption) buttonClass = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                      else if (isSelected) buttonClass = "bg-red-500/10 border-red-500 text-red-400";
                      else buttonClass = "opacity-50 bg-zinc-950 border-zinc-800 text-zinc-500";
                    }

                    return (
                      <button
                        key={option}
                        disabled={!!selectedAnswer}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-5 rounded-2xl border-2 text-left text-lg font-bold transition-all flex items-center justify-between ${buttonClass}`}
                      >
                        <span className="flex-1">{option}</span>
                        {selectedAnswer && isCorrectOption && <CheckCircle2 className="text-emerald-500 shrink-0" />}
                        {selectedAnswer && isSelected && !isCorrectOption && <XCircle className="text-red-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selectedAnswer && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-10"
                    >
                      <button 
                        onClick={nextQuestion}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all font-bold text-xl flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20"
                      >
                        {quizIndex < shuffledItems.length - 1 ? "Next Question" : "See Results"}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      {/* Additional Info Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl space-y-4"
                      >
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                          <div className="flex flex-col">
                            <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Literary Context</h4>
                            <p className="text-zinc-100 font-serif italic text-lg mt-1">"{shuffledItems[quizIndex].title}"</p>
                            <p className="text-indigo-400 text-sm font-bold">by {shuffledItems[quizIndex].author}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                              {shuffledItems[quizIndex].category}
                            </span>
                            {shuffledItems[quizIndex].year && (
                              <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">
                                {shuffledItems[quizIndex].year}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {'poet' in shuffledItems[quizIndex] && (shuffledItems[quizIndex] as Poem).poet && (
                          <div>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Poet Details</p>
                            <p className="text-zinc-300 text-sm">{(shuffledItems[quizIndex] as Poem).poet}</p>
                          </div>
                        )}

                        {'form' in shuffledItems[quizIndex] && (shuffledItems[quizIndex] as Poem).form && (
                          <div>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Form</p>
                            <p className="text-zinc-300 text-sm">{(shuffledItems[quizIndex] as Poem).form}</p>
                          </div>
                        )}

                        {shuffledItems[quizIndex].summary && (
                          <div>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Summary</p>
                            <p className="text-zinc-300 text-sm italic leading-relaxed">"{shuffledItems[quizIndex].summary}"</p>
                          </div>
                        )}
                        
                        {shuffledItems[quizIndex].facts && (
                          <div className="pt-2">
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Key Facts</p>
                            <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{shuffledItems[quizIndex].facts}</p>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center bg-zinc-900 border border-zinc-800 p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
                  <Trophy className="mx-auto text-amber-500 mb-6" size={64} />
                  <h2 className="text-4xl font-bold mb-2 text-zinc-50">Quiz Complete!</h2>
                  <div className="text-7xl font-black text-indigo-400 mb-8">{Math.round((score / shuffledItems.length) * 100)}%</div>
                  
                  <div className="flex justify-center gap-8 mb-10">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Correct</p>
                      <p className="text-2xl font-bold text-zinc-100">{score}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total</p>
                      <p className="text-2xl font-bold text-zinc-100">{shuffledItems.length}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className={`text-xl font-bold ${score >= 5 ? "text-emerald-400" : "text-amber-400"}`}>
                      {score >= 5 ? "Shinchan: Sugoi! Great job! 🎉" : "Shinchan: Haha! Study more! 😜"}
                    </p>
                  </div>

                  <div className="mb-10 rounded-2xl overflow-hidden max-w-xs mx-auto shadow-2xl border-4 border-zinc-800">
                    <img 
                      src={score >= 5 ? "https://media.tenor.com/7SE3IKEub60AAAAi/shinchan.gif" : "https://media1.tenor.com/m/cbuD7hyZawAAAAAC/eyebrow-waggle-eye-brow.gif"} 
                      alt="Result reaction"
                      className="w-full h-auto"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <button 
                    onClick={() => startQuiz(quizType!)}
                    className="flex items-center gap-2 px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-2xl transition-all font-bold text-xl mx-auto shadow-xl"
                  >
                    <RotateCcw size={24} />
                    Try Again
                  </button>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                  <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-zinc-50">
                      <History className="text-indigo-400" />
                      Detailed Summary
                    </h3>
                  </div>
                  <div className="divide-y divide-zinc-800">
                    {quizHistory.map((item, idx) => (
                      <div key={idx} className="p-6 hover:bg-zinc-800/30 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-bold text-zinc-100 font-serif italic">"{item.item.title}"</h4>
                            <p className="text-zinc-500 text-sm">Correct Author: <span className="text-zinc-300 font-medium">{item.item.author}</span></p>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.isCorrect ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            {item.isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {item.isCorrect ? "Correct" : `You chose: ${item.selectedAnswer}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>

      <DetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        mode={mode} 
      />

      <footer className="mt-20 py-12 border-t border-zinc-900 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 opacity-50 grayscale">
              <BookOpen size={20} />
              <span className="font-bold tracking-tight text-zinc-50">LitMemory</span>
            </div>
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">© {new Date().getFullYear()} Literature Memory Trainer</p>
          </div>
        </div>
      </footer>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
    </div>
  );
}
