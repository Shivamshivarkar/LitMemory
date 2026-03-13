/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef, MouseEvent } from "react";
import { novels, Novel } from "./data";
import { dramas, Drama } from "./dramaData";
import { Search, Shuffle, RotateCcw, BookOpen, GraduationCap, CheckCircle2, XCircle, Info, Trophy, ArrowRight, Calendar, Quote, Theater, User, LogOut, UserCircle, History, TrendingUp, Award, Medal, Crown, Edit, Camera, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

type Mode = "novels" | "dramas" | "quiz" | "profile" | "rankings";
type QuizType = "novels" | "dramas";

interface UserData {
  id: number;
  username: string;
  profile_photo?: string | null;
  about?: string | null;
}

interface UserStats {
  total_quizzes: number;
  avg_score: number;
  high_score: number;
  total_points: number;
}

interface UserScore {
  id: number;
  score: number;
  total: number;
  type: string;
  created_at: string;
}

interface LeaderboardEntry {
  username: string;
  profile_photo?: string | null;
  quiz_count: number;
  avg_score: number;
  high_score: number;
  total_points: number;
}

interface QuizHistoryItem {
  item: Novel | Drama;
  selectedAnswer: string;
  isCorrect: boolean;
}

// ── Utility ──────────────────────────────────────────────────────────────────
const shuffleArray = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
const getCategoryColor = (cat: string) => {
  const map: Record<string, string> = { British: "#c084fc", European: "#60a5fa", American: "#34d399", Indian: "#fb923c" };
  return map[cat] || "#a3a3a3";
};

// ── Local Storage Helpers ─────────────────────────────────────────────────────
const STORAGE_KEYS = {
  USER: "litmemory_user",
  USERS: "litmemory_users",
  SCORES: "litmemory_scores",
  TOKEN: "litmemory_token"
};

const getLocalUsers = (): any[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
const saveLocalUsers = (users: any[]) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
const getLocalScores = (userId: number): UserScore[] => {
  const allScores = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES) || "[]");
  return allScores.filter((s: any) => s.user_id === userId);
};
const saveLocalScore = (score: any) => {
  const allScores = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES) || "[]");
  allScores.push({ ...score, id: Date.now(), created_at: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(allScores));
};

const calculateLocalStats = (userId: number): UserStats => {
  const scores = getLocalScores(userId);
  if (scores.length === 0) return { total_quizzes: 0, avg_score: 0, high_score: 0, total_points: 0 };
  
  const total = scores.length;
  const sumPercentage = scores.reduce((acc, s) => acc + (s.score * 100 / s.total), 0);
  const high = Math.max(...scores.map(s => (s.score * 100 / s.total)));
  const totalPoints = scores.reduce((acc, s) => acc + s.score, 0);
  
  return {
    total_quizzes: total,
    avg_score: sumPercentage / total,
    high_score: high,
    total_points: totalPoints
  };
};

const getLeaderboard = (): LeaderboardEntry[] => {
  const users = getLocalUsers();
  const leaderboard: LeaderboardEntry[] = users.map(user => {
    const stats = calculateLocalStats(user.id);
    return {
      username: user.username,
      profile_photo: user.profile_photo,
      quiz_count: stats.total_quizzes,
      avg_score: Math.round(stats.avg_score),
      high_score: Math.round(stats.high_score),
      total_points: stats.total_points
    };
  });

  return leaderboard.sort((a, b) => b.total_points - a.total_points || b.avg_score - a.avg_score);
};

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryPill({ label, active, color, onClick }: { label: string, active: boolean, color: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all border ${
        active 
          ? "bg-zinc-800 border-zinc-700 text-zinc-100 shadow-lg" 
          : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
      }`}
      style={active ? { borderColor: color, color: color, backgroundColor: color + "11" } : {}}
    >
      {label}
    </button>
  );
}

interface FlashCardProps {
  key?: string;
  item: Novel | Drama;
  index: number;
  isFlipped: boolean;
  onFlip: (idx: number) => void;
  onInfo: (item: Novel | Drama) => void;
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

function DetailModal({ item, onClose, mode }: { item: Novel | Drama | null, onClose: () => void, mode: string }) {
  if (!item) return null;
  const color = getCategoryColor(item.category);
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
          {item.category} {mode === "novels" ? "Novel" : "Drama"}
        </span>
        <h2 className="text-3xl font-bold text-zinc-50 mt-2 mb-1 font-serif">{item.title}</h2>
        <p className="text-zinc-400 text-lg mb-8">by {item.author} {item.year ? `· ${item.year}` : ""}</p>

        <div className="space-y-6">
          {item.summary && (
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
              <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">The Story</div>
              <p className="text-zinc-300 text-sm leading-relaxed italic">"{item.summary}"</p>
            </div>
          )}
          {item.facts && (
            <div className="rounded-2xl p-6 border border-zinc-800" style={{ background: color + "08", borderColor: color + "22" }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color }}>Literary Fact</div>
              <p className="text-zinc-300 text-sm leading-relaxed">{item.facts}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("novels");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [shuffledItems, setShuffledItems] = useState<(Novel | Drama)[]>([]);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  
  // Quiz state
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);

  // Auth state
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authError, setAuthError] = useState("");
  const [authView, setAuthView] = useState<"login" | "signup" | "forgot" | "reset">("login");
  const [resetUsername, setResetUsername] = useState("");
  const [resetPhone, setResetPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userScores, setUserScores] = useState<UserScore[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Novel | Drama | null>(null);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editAbout, setEditAbout] = useState("");
  const [editPhoto, setEditPhoto] = useState<string | null>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastActiveMode, setLastActiveMode] = useState<Mode>("novels");

  const searchRef = useRef<HTMLInputElement>(null);

  const currentItems = useMemo(() => mode === "novels" ? novels : dramas, [mode]);
  const categories = useMemo(() => Array.from(new Set(currentItems.map(n => n.category))), [currentItems]);

  const handleShuffle = () => {
    const baseItems = selectedCategory 
      ? currentItems.filter(item => item.category === selectedCategory)
      : currentItems;
    setShuffledItems(shuffleArray(baseItems).slice(0, 9));
    setFlippedIndex(null);
  };

  useEffect(() => {
    if (mode !== "quiz" && mode !== "profile" && mode !== "rankings") {
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

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const fetchUserStats = async () => {
    if (!user) return;
    const stats = calculateLocalStats(user.id);
    setUserStats(stats);
  };

  const fetchUserScores = async () => {
    if (!user) return;
    const scores = getLocalScores(user.id);
    setUserScores(scores);
  };

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    // Simulate network delay
    setTimeout(() => {
      const lb = getLeaderboard();
      setLeaderboard(lb);
      setIsLoadingLeaderboard(false);
    }, 500);
  };

  useEffect(() => {
    if (mode === "profile" && token) {
      fetchUserStats();
      fetchUserScores();
    }
    if (mode === "rankings") {
      fetchLeaderboard();
    }
  }, [mode, token]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    
    const users = getLocalUsers();
    
    if (authMode === "signup") {
      if (users.find(u => u.username === username)) {
        setAuthError("Username already exists");
        return;
      }
      if (users.find(u => u.phone_number === phoneNumber)) {
        setAuthError("Phone number already registered");
        return;
      }
      
      const newUser = {
        id: Date.now(),
        username,
        password, // In a real app, hash this!
        phone_number: phoneNumber,
        profile_photo: null,
        about: null
      };
      
      users.push(newUser);
      saveLocalUsers(users);
      
      const dummyToken = "local-token-" + newUser.id;
      localStorage.setItem(STORAGE_KEYS.TOKEN, dummyToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      setToken(dummyToken);
      setUser(newUser);
      setShowAuthModal(false);
    } else {
      const foundUser = users.find(u => (u.username === username || u.phone_number === username) && u.password === password);
      if (!foundUser) {
        setAuthError("Invalid username or password");
        return;
      }
      
      const dummyToken = "local-token-" + foundUser.id;
      localStorage.setItem(STORAGE_KEYS.TOKEN, dummyToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(foundUser));
      setToken(dummyToken);
      setUser(foundUser);
      setShowAuthModal(false);
    }
    
    setUsername("");
    setPassword("");
    setPhoneNumber("");
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const users = getLocalUsers();
    const found = users.find(u => u.username === resetUsername && u.phone_number === resetPhone);
    if (!found) {
      setAuthError("No user found with that username and phone number combination");
    } else {
      setAuthView("reset");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const users = getLocalUsers();
    const idx = users.findIndex(u => u.username === resetUsername && u.phone_number === resetPhone);
    if (idx === -1) {
      setAuthError("Identity verification failed");
    } else {
      users[idx].password = newPassword;
      saveLocalUsers(users);
      alert("Password reset successfully! You can now login.");
      setAuthView("login");
      setAuthMode("login");
      setResetUsername("");
      setResetPhone("");
      setNewPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
    setMode("novels");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsUpdatingProfile(true);
    
    // Simulate delay
    setTimeout(() => {
      const users = getLocalUsers();
      const idx = users.findIndex(u => u.id === user.id);
      
      if (idx === -1) {
        handleLogout();
        setIsUpdatingProfile(false);
        return;
      }

      // Check username uniqueness if changed
      if (editUsername && editUsername !== user.username) {
        if (users.find(u => u.username === editUsername && u.id !== user.id)) {
          alert("Username already taken");
          setIsUpdatingProfile(false);
          return;
        }
      }

      const updatedUser = {
        ...users[idx],
        username: editUsername || users[idx].username,
        profile_photo: editPhoto !== null ? editPhoto : users[idx].profile_photo,
        about: editAbout !== undefined ? editAbout : users[idx].about
      };

      users[idx] = updatedUser;
      saveLocalUsers(users);
      
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setIsEditingProfile(false);
      setIsUpdatingProfile(false);
    }, 800);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openDetails = (item: Novel | Drama) => {
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
    const sourceItems = type === "novels" ? novels : dramas;
    const quizSet = [...sourceItems].sort(() => Math.random() - 0.5).slice(0, 10);
    setShuffledItems(quizSet);
    setQuizType(type);
    setQuizIndex(0);
    setScore(0);
    setQuizFinished(false);
    setQuizHistory([]);
    setMode("quiz");
    generateOptions(quizSet[0], sourceItems);
  };

  const generateOptions = (currentItem: Novel | Drama, sourceItems: (Novel | Drama)[]) => {
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
      const sourceItems = quizType === "novels" ? novels : dramas;
      generateOptions(shuffledItems[nextIdx], sourceItems);
    } else {
      setQuizFinished(true);
      
      // Save score if logged in
      if (user) {
        saveLocalScore({
          user_id: user.id,
          score,
          total: shuffledItems.length,
          type: quizType
        });
      }

      if (score >= 5) {
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
              onClick={() => { setMode("novels"); setSelectedCategory(null); setSearch(""); setLastActiveMode("novels"); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "novels" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Novels
            </button>
            <button 
              onClick={() => { setMode("dramas"); setSelectedCategory(null); setSearch(""); setLastActiveMode("dramas"); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "dramas" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Dramas
            </button>
            <button 
              onClick={() => { setMode("quiz"); setQuizType(null); setQuizFinished(false); setLastActiveMode("quiz"); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "quiz" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Quiz
            </button>
            <button 
              onClick={() => { setMode("rankings"); setLastActiveMode("rankings"); }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${mode === "rankings" ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-400 hover:text-zinc-200"}`}
            >
              Rankings
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <Menu size={24} />
            </button>
            {user ? (
              <button 
                onClick={() => setMode(prev => prev === "profile" ? lastActiveMode : "profile")}
                className={`flex items-center gap-3 p-1.5 pr-4 rounded-2xl transition-all border ${mode === "profile" ? "bg-indigo-600/10 border-indigo-500/50" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"}`}
              >
                <div className="w-8 h-8 rounded-xl overflow-hidden bg-zinc-800 flex items-center justify-center border border-zinc-700">
                  {user.profile_photo ? (
                    <img src={user.profile_photo} alt={user.username} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="text-xs font-bold">{user.username[0].toUpperCase()}</span>
                  )}
                </div>
                <span className="text-sm font-medium text-zinc-200 hidden sm:inline">{user.username}</span>
              </button>
            ) : (
              <button 
                onClick={() => { setShowAuthModal(true); setAuthView("login"); setAuthMode("login"); }}
                className="px-5 py-2.5 bg-zinc-50 text-zinc-950 rounded-xl text-sm font-bold hover:bg-white transition-all shadow-lg shadow-white/5"
              >
                Sign In
              </button>
            )}
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
                  onClick={() => { setMode("novels"); setSelectedCategory(null); setSearch(""); setLastActiveMode("novels"); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "novels" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <BookOpen size={20} />
                  Novels
                </button>
                <button 
                  onClick={() => { setMode("dramas"); setSelectedCategory(null); setSearch(""); setLastActiveMode("dramas"); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "dramas" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <Theater size={20} />
                  Dramas
                </button>
                <button 
                  onClick={() => { setMode("quiz"); setQuizType(null); setQuizFinished(false); setLastActiveMode("quiz"); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "quiz" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <GraduationCap size={20} />
                  Quiz
                </button>
                <button 
                  onClick={() => { setMode("rankings"); setLastActiveMode("rankings"); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "rankings" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                >
                  <Trophy size={20} />
                  Rankings
                </button>
              </div>

              {user && (
                <div className="pt-6 border-t border-zinc-800">
                  <button 
                    onClick={() => { setMode("profile"); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${mode === "profile" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/30" : "text-zinc-400 hover:bg-zinc-900 border border-transparent"}`}
                  >
                    <User size={20} />
                    Profile
                  </button>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-zinc-500 hover:text-red-400 transition-all"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto p-6 md:p-10">
        {(mode === "novels" || mode === "dramas") ? (
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder={`Search ${mode === "novels" ? "novels" : "dramas"}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600 text-zinc-200"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 bg-zinc-900/50 p-1.5 border border-zinc-800 rounded-2xl">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${!selectedCategory ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${selectedCategory === cat ? "bg-zinc-800 text-zinc-50 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleShuffle}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all font-bold text-sm shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                <Shuffle size={18} />
                Shuffle Cards
              </button>
            </div>

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
        ) : mode === "profile" ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
                  <div className="flex flex-col items-center text-center">
                    <div className="relative group mb-6">
                      <div className="w-32 h-32 bg-zinc-800 rounded-2xl flex items-center justify-center text-5xl font-bold border-2 border-zinc-700 overflow-hidden shadow-2xl transition-transform group-hover:scale-[1.02]">
                        {editPhoto ? (
                          <img src={editPhoto} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : user?.profile_photo ? (
                          <img src={user.profile_photo} alt={user.username} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="text-zinc-500">{user?.username[0].toUpperCase()}</span>
                        )}
                      </div>
                      {isEditingProfile && (
                        <label className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 rounded-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                          <div className="text-center">
                            <Camera className="text-white mx-auto mb-1" size={24} />
                            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Change Photo</span>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </label>
                      )}
                    </div>

                    {isEditingProfile ? (
                      <div className="w-full space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 text-left">Username</label>
                          <input
                            type="text"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5 text-left">About</label>
                          <textarea
                            value={editAbout}
                            onChange={(e) => setEditAbout(e.target.value)}
                            rows={3}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none text-sm"
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button 
                            onClick={handleUpdateProfile}
                            disabled={isUpdatingProfile}
                            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                          >
                            {isUpdatingProfile ? "Saving..." : "Save Changes"}
                          </button>
                          <button 
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-bold text-sm transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full">
                        <h2 className="text-2xl font-bold text-zinc-50 mb-1">{user?.username}</h2>
                        <p className="text-zinc-500 text-sm mb-6">{user?.about || "No bio yet."}</p>
                        
                        <div className="grid grid-cols-3 gap-2 mb-6">
                          <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-3 text-center">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Quizzes</p>
                            <p className="text-lg font-bold text-zinc-100">{userStats?.total_quizzes || 0}</p>
                          </div>
                          <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-3 text-center">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Avg</p>
                            <p className="text-lg font-bold text-zinc-100">{userStats?.avg_score || 0}</p>
                          </div>
                          <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-xl p-3 text-center">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">High</p>
                            <p className="text-lg font-bold text-zinc-100">{userStats?.high_score || 0}</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => {
                              setIsEditingProfile(true);
                              setEditUsername(user?.username || "");
                              setEditAbout(user?.about || "");
                              setEditPhoto(user?.profile_photo || null);
                            }}
                            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-xl font-bold text-sm transition-all border border-zinc-700"
                          >
                            Edit Profile
                          </button>
                          <button 
                            onClick={handleLogout}
                            className="w-full py-3 text-zinc-500 hover:text-red-400 font-bold text-sm transition-all"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quiz History */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                        <History size={20} className="text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-50">Recent Activity</h3>
                    </div>
                  </div>

                  {userScores.length > 0 ? (
                    <div className="space-y-4">
                      {userScores.map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl hover:border-zinc-700 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${s.score >= 8 ? "bg-emerald-500/10 text-emerald-400" : s.score >= 5 ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>
                              {s.score}
                            </div>
                            <div>
                              <p className="font-bold text-zinc-200 capitalize">{s.type} Quiz</p>
                              <p className="text-xs text-zinc-500">{new Date(s.created_at).toLocaleDateString()} at {new Date(s.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-zinc-400">{Math.round((s.score / s.total) * 100)}%</p>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Accuracy</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-zinc-950/30 border border-dashed border-zinc-800 rounded-2xl">
                      <p className="text-zinc-500">No quiz history yet. Start a quiz to see your progress!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ) : mode === "rankings" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                    <Trophy size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-zinc-50">Global Rankings</h2>
                    <p className="text-zinc-500 text-sm">Top performers in the Literature Memory Trainer</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                {isLoadingLeaderboard ? (
                  <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-zinc-500 font-medium animate-pulse">Fetching legends...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      <div className="col-span-1">Rank</div>
                      <div className="col-span-6">Scholar</div>
                      <div className="col-span-2 text-center">Quizzes</div>
                      <div className="col-span-3 text-right">Total Points</div>
                    </div>

                    {leaderboard.map((entry, idx) => {
                      const isCurrentUser = user?.username === entry.username;
                      return (
                        <div 
                          key={entry.username}
                          className={`grid grid-cols-12 gap-4 items-center px-6 py-4 rounded-2xl transition-all ${isCurrentUser ? "bg-indigo-600/10 border border-indigo-500/30" : "hover:bg-zinc-800/50 border border-transparent"}`}
                        >
                          <div className="col-span-1">
                            {idx === 0 ? (
                              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <Trophy size={16} className="text-amber-950" />
                              </div>
                            ) : idx === 1 ? (
                              <div className="w-8 h-8 bg-zinc-300 rounded-lg flex items-center justify-center shadow-lg shadow-zinc-300/20">
                                <Trophy size={16} className="text-zinc-900" />
                              </div>
                            ) : idx === 2 ? (
                              <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center shadow-lg shadow-amber-700/20">
                                <Trophy size={16} className="text-amber-100" />
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-zinc-500 ml-2">#{idx + 1}</span>
                            )}
                          </div>
                          <div className="col-span-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
                              {entry.profile_photo ? (
                                <img src={entry.profile_photo} alt={entry.username} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm font-bold text-zinc-500">
                                  {entry.username[0].toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="truncate">
                              <p className="font-bold text-zinc-100 truncate">{entry.username}</p>
                              {isCurrentUser && <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">You</span>}
                            </div>
                          </div>
                          <div className="col-span-2 text-center font-bold text-zinc-400">
                            {entry.quiz_count}
                          </div>
                          <div className="col-span-3 text-right">
                            <p className="text-lg font-bold text-zinc-100">{entry.total_points}</p>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Points</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {!quizType ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <button 
                  onClick={() => startQuiz("novels")}
                  className="group bg-slate-800/80 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md hover:bg-indigo-600/20 transition-all text-center"
                >
                  <BookOpen className="mx-auto mb-6 text-indigo-400 group-hover:scale-110 transition-transform" size={64} />
                  <h3 className="text-3xl font-bold mb-2">Novels Quiz</h3>
                  <p className="text-slate-400">Test your knowledge of classic novels and their authors.</p>
                </button>
                <button 
                  onClick={() => startQuiz("dramas")}
                  className="group bg-slate-800/80 p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md hover:bg-emerald-600/20 transition-all text-center"
                >
                  <Theater className="mx-auto mb-6 text-emerald-400 group-hover:scale-110 transition-transform" size={64} />
                  <h3 className="text-3xl font-bold mb-2">Dramas Quiz</h3>
                  <p className="text-slate-400">Challenge yourself with famous plays and dramatists.</p>
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
                          <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Literary Context</h4>
                          {shuffledItems[quizIndex].year && (
                            <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">
                              {shuffledItems[quizIndex].year}
                            </span>
                          )}
                        </div>
                        
                        {shuffledItems[quizIndex].summary && (
                          <div>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Summary</p>
                            <p className="text-zinc-300 text-sm italic leading-relaxed">"{shuffledItems[quizIndex].summary}"</p>
                          </div>
                        )}
                        
                        {shuffledItems[quizIndex].facts && (
                          <div className="pt-2">
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Key Fact</p>
                            <p className="text-zinc-400 text-sm leading-relaxed">{shuffledItems[quizIndex].facts}</p>
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

      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UserCircle size={32} className="text-indigo-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-50">
                    {authView === "login" ? "Welcome Back" : authView === "signup" ? "Join the Scholars" : "Reset Password"}
                  </h2>
                  <p className="text-zinc-500 mt-2">
                    {authView === "login" ? "Continue your literary journey" : authView === "signup" ? "Start tracking your progress" : "Recover your account access"}
                  </p>
                </div>

                {authView === "login" || authView === "signup" ? (
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Username or Phone</label>
                      <input 
                        type="text" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-zinc-100"
                        placeholder="Enter your username or phone"
                      />
                    </div>
                    {authView === "signup" && (
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-zinc-100"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Password</label>
                        {authView === "login" && (
                          <button 
                            type="button"
                            onClick={() => setAuthView("forgot")}
                            className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300"
                          >
                            Forgot?
                          </button>
                        )}
                      </div>
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-zinc-100"
                        placeholder="••••••••"
                      />
                    </div>
                    {authError && (
                      <p className="text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-xl border border-red-400/20">{authError}</p>
                    )}
                    <button 
                      type="submit"
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-500/20"
                    >
                      {authView === "login" ? "Sign In" : "Create Account"}
                    </button>
                  </form>
                ) : authView === "forgot" ? (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Username</label>
                      <input 
                        type="text" 
                        required
                        value={resetUsername}
                        onChange={(e) => setResetUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-zinc-100"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={resetPhone}
                        onChange={(e) => setResetPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-zinc-100"
                        placeholder="Enter registered phone"
                      />
                    </div>
                    {authError && (
                      <p className="text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-xl border border-red-400/20">{authError}</p>
                    )}
                    <button 
                      type="submit"
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Verify Identity
                    </button>
                    <button 
                      type="button"
                      onClick={() => setAuthView("login")}
                      className="w-full text-zinc-500 hover:text-zinc-300 text-sm font-bold transition-colors"
                    >
                      Back to Login
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">New Password</label>
                      <input 
                        type="password" 
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-zinc-100"
                        placeholder="Enter new password"
                      />
                    </div>
                    {authError && (
                      <p className="text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-xl border border-red-400/20">{authError}</p>
                    )}
                    <button 
                      type="submit"
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/20"
                    >
                      Reset Password
                    </button>
                  </form>
                )}

                <div className="mt-8 text-center">
                  {(authView === "login" || authView === "signup") && (
                    <button 
                      onClick={() => {
                        const newMode = authView === "login" ? "signup" : "login";
                        setAuthView(newMode);
                        setAuthMode(newMode);
                        setAuthError("");
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-bold text-sm transition-colors"
                    >
                      {authView === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 text-center">
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
      `}</style>
    </div>
  );
}
