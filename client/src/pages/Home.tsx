/**
 * Design reminder — Ground truth: ChatGPT-inspired learning workspace.
 * The interface is minimal, conversational, source-only, and shows one clear next action.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Command,
  ExternalLink,
  ListVideo,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  Plus,
  RotateCcw,
  Route as RouteIcon,
  Search,
  Settings2,
  Sun,
  X,
} from "lucide-react";
import { toast } from "sonner";

const channelUrl = "https://www.youtube.com/@warraichpatentebinpunjabi2783";
const progressStorageKey = "driving-learner-path-progress-v1";
const themeStorageKey = "driving-learner-path-theme-v1";

const chapters = [
  {
    id: "essential-pages",
    name: "zruri page patente b k liye",
    videoCount: 4,
    listId: "PL-EQmGjosNXToXAPAEjGT8MznkzFMbMLW",
  },
  {
    id: "exam-sheets-2026",
    name: "scheda di esame patente b 2026",
    videoCount: 664,
    listId: "PL-EQmGjosNXTYKM0wNpqrvco7ZLk76EwM",
  },
  {
    id: "trick-videos",
    name: "patente b trick videos",
    videoCount: 68,
    listId: "PL-EQmGjosNXS87C53aITUB7nway2qmHg7",
  },
  {
    id: "punjabi-course",
    name: "WARRAICH PATENTE B IN PUNJABI",
    videoCount: 192,
    listId: "PL-EQmGjosNXSfs-hdnDxVQud6CI6Jt1pU",
  },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

type StoredProgress = {
  completedIds: ChapterId[];
  activeId: ChapterId;
};

const initialProgress: StoredProgress = {
  completedIds: [],
  activeId: chapters[0].id,
};

function getStoredProgress(): StoredProgress {
  if (typeof window === "undefined") return initialProgress;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(progressStorageKey) ?? "null");
    const validIds = new Set(chapters.map((chapter) => chapter.id));
    const completedIds = Array.isArray(parsed?.completedIds)
      ? parsed.completedIds.filter((id: unknown): id is ChapterId => typeof id === "string" && validIds.has(id as ChapterId))
      : [];
    const activeId = validIds.has(parsed?.activeId) ? (parsed.activeId as ChapterId) : chapters[0].id;
    return { completedIds, activeId };
  } catch {
    return initialProgress;
  }
}

function getStoredTheme() {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
}

function getChapterUrl(listId: string) {
  return `https://www.youtube.com/playlist?list=${listId}`;
}

function getEmbedUrl(listId: string) {
  return `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}&rel=0`;
}

export default function Home() {
  const [progress, setProgress] = useState<StoredProgress>(getStoredProgress);
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  const [isDark, setIsDark] = useState(() => getStoredTheme() === "dark");

  useEffect(() => {
    window.localStorage.setItem(progressStorageKey, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
  }, [isDark]);

  const completed = new Set(progress.completedIds);
  const completedCount = progress.completedIds.length;
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === progress.activeId));
  const activeChapter = chapters[activeIndex] ?? chapters[0];
  const nextChapter = chapters[activeIndex + 1];
  const allDone = completedCount === chapters.length;

  const filteredChapters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return chapters;
    return chapters.filter((chapter) => chapter.name.toLowerCase().includes(normalizedQuery));
  }, [query]);

  const isUnlocked = (chapterIndex: number) => chapterIndex === 0 || completed.has(chapters[chapterIndex - 1].id);

  const selectChapter = (chapter: (typeof chapters)[number], chapterIndex: number) => {
    if (!isUnlocked(chapterIndex)) {
      toast.message("Complete the previous chapter to unlock this source collection.");
      return;
    }
    setProgress((current) => ({ ...current, activeId: chapter.id }));
    setIsSidebarOpen(false);
  };

  const completeChapter = () => {
    if (completed.has(activeChapter.id)) {
      toast.message("This chapter is already marked complete.");
      return;
    }

    const updatedCompleted = [...progress.completedIds, activeChapter.id];
    const following = chapters[activeIndex + 1];
    setProgress({
      completedIds: updatedCompleted,
      activeId: following?.id ?? activeChapter.id,
    });

    toast.success(
      following
        ? "Saved. The next source collection is now available."
        : "Saved. All listed source collections are marked complete.",
    );
  };

  const resetProgress = () => {
    setProgress(initialProgress);
    toast.message("Your local learning progress has been reset.");
  };

  return (
    <div className={`app-shell ${isSidebarCompact ? "sidebar-compact" : ""}`}>
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`} aria-label="Learning navigation">
        <div className="sidebar-top">
          <div className="brand-row">
            <span className="brand-mark" role="img" aria-label="Driving Learner Path mark">
              <RouteIcon size={20} strokeWidth={2.4} />
            </span>
            <div className="brand-copy">
              <strong>Driving Learner Path</strong>
              <span>Warraich patente</span>
            </div>
            <button
              className="icon-button desktop-only"
              aria-label={isSidebarCompact ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setIsSidebarCompact((current) => !current)}
            >
              {isSidebarCompact ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            <button className="icon-button mobile-only" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <button className="new-path-button" onClick={resetProgress}>
            <Plus size={17} />
            <span>New learning path</span>
          </button>

          <label className="sidebar-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lessons"
              aria-label="Search channel source collections"
            />
            <kbd>⌘K</kbd>
          </label>
        </div>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          <a href="#workspace" className="nav-link nav-link-active">
            <Command size={18} />
            <span>Home</span>
          </a>
          <a href="#course-path" className="nav-link">
            <ListVideo size={18} />
            <span>Course path</span>
          </a>
        </nav>

        <section className="chapter-nav" aria-labelledby="chapter-nav-heading">
          <div className="sidebar-label" id="chapter-nav-heading">Source collections</div>
          <div className="chapter-list">
            {filteredChapters.length ? (
              filteredChapters.map((chapter) => {
                const chapterIndex = chapters.findIndex((item) => item.id === chapter.id);
                const done = completed.has(chapter.id);
                const unlocked = isUnlocked(chapterIndex);
                const selected = activeChapter.id === chapter.id;
                return (
                  <button
                    key={chapter.id}
                    className={`chapter-link ${selected ? "chapter-link-active" : ""}`}
                    onClick={() => selectChapter(chapter, chapterIndex)}
                    disabled={!unlocked}
                    aria-current={selected ? "step" : undefined}
                  >
                    <span className={`chapter-status ${done ? "complete" : unlocked ? "available" : "locked"}`}>
                      {done ? <Check size={13} strokeWidth={3} /> : chapterIndex + 1}
                    </span>
                    <span className="chapter-link-copy">
                      <span>{chapter.name}</span>
                      <small>{chapter.videoCount} videos</small>
                    </span>
                  </button>
                );
              })
            ) : (
              <p className="no-results">No matching source collection.</p>
            )}
          </div>
        </section>

        <section className="recent-section" aria-labelledby="recent-heading">
          <div className="sidebar-label" id="recent-heading">Recently published</div>
          <a className="recent-link" href="https://www.youtube.com/watch?v=hffSwLXXq1g" target="_blank" rel="noreferrer">
            <span>Exam Sheet 427 | Part 2 | Full Free Patente B Course in Punjabi</span>
            <small>9:55</small>
          </a>
          <a className="recent-link" href="https://www.youtube.com/watch?v=qrisjbOUg4s" target="_blank" rel="noreferrer">
            <span>Exam Sheet 427 | Part 1 | Full Free Patente B Course in Punjabi</span>
            <small>10:31</small>
          </a>
          <a className="show-source-link" href={channelUrl} target="_blank" rel="noreferrer">
            View channel <ArrowUpRight size={14} />
          </a>
        </section>

        <div className="sidebar-footer">
          <button className="nav-link" onClick={() => setIsDark((current) => !current)}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
          <button className="nav-link" onClick={resetProgress}>
            <RotateCcw size={18} />
            <span>Reset local progress</span>
          </button>
        </div>
      </aside>

      {isSidebarOpen && <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)} />}

      <main className="workspace" id="workspace">
        <header className="workspace-header">
          <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="mobile-brand">Driving Learner Path</div>
          <div className="header-actions">
            <a className="quiet-action" href={channelUrl} target="_blank" rel="noreferrer">
              Channel source <ExternalLink size={15} />
            </a>
            <button className="icon-button" aria-label="About this learning path" onClick={() => toast.message("All learning material is played from the supplied YouTube channel. Completion is saved only in this browser.")}>
              <CircleHelp size={19} />
            </button>
          </div>
        </header>

        <div className="workspace-content" id="course-path">
          <section className="welcome-block" aria-labelledby="welcome-title">
            <p className="eyebrow">Self-paced YouTube learning</p>
            <h1 id="welcome-title">Continue with your learning path.</h1>
            <p className="welcome-copy">
              Choose a source collection from the channel. When you are ready, mark the chapter complete to save your place and unlock the next one.
            </p>
          </section>

          <section className="learning-composer" aria-label="Current chapter selector">
            <div className="composer-main">
              <Play size={19} fill="currentColor" />
              <span>Continue: {activeChapter.name}</span>
            </div>
            <div className="composer-footer">
              <div className="composer-context">
                <span className="source-dot" />
                <span>YouTube channel source</span>
                <ChevronDown size={15} />
              </div>
              <button className="composer-go" onClick={() => document.getElementById("lesson-player")?.scrollIntoView({ behavior: "smooth", block: "start" })} aria-label="Go to current chapter">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </section>

          <div className="suggestion-row" aria-label="Available actions">
            <button className="suggestion-chip" onClick={() => document.getElementById("lesson-player")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Open current chapter</button>
            <button className="suggestion-chip" onClick={() => toast.message(`${completedCount} of ${chapters.length} source collections marked complete.`)}>View local progress</button>
            <a className="suggestion-chip suggestion-link" href={channelUrl} target="_blank" rel="noreferrer">Browse channel <ArrowUpRight size={14} /></a>
          </div>

          <section className="lesson-canvas" id="lesson-player" aria-labelledby="current-chapter-title">
            <div className="learner-message">
              <span className="message-label">Your current chapter</span>
              <p>{activeChapter.name}</p>
            </div>

            <div className="source-response">
              <div className="response-heading">
                <div>
                  <span className="message-label">Channel playlist</span>
                  <h2 id="current-chapter-title">{activeChapter.name}</h2>
                </div>
                <span className="video-count">{activeChapter.videoCount} videos</span>
              </div>

              <div className="video-frame">
                <iframe
                  key={activeChapter.listId}
                  src={getEmbedUrl(activeChapter.listId)}
                  title={`YouTube playlist: ${activeChapter.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="source-footnote">
                <span>Playing from the supplied YouTube channel.</span>
                <a href={getChapterUrl(activeChapter.listId)} target="_blank" rel="noreferrer">
                  Open playlist on YouTube <ExternalLink size={14} />
                </a>
              </div>

              <div className="completion-row">
                <div className="completion-copy">
                  {completed.has(activeChapter.id) ? (
                    <>
                      <CheckCircle2 size={20} />
                      <span>This chapter is marked complete in this browser.</span>
                    </>
                  ) : (
                    <span>Finished this source collection? Save your progress when you are ready.</span>
                  )}
                </div>
                <button className={`completion-button ${completed.has(activeChapter.id) ? "completion-done" : ""}`} onClick={completeChapter} disabled={completed.has(activeChapter.id)}>
                  {completed.has(activeChapter.id) ? <Check size={17} /> : <CheckCircle2 size={17} />}
                  {completed.has(activeChapter.id) ? "Completed" : "Mark chapter complete"}
                </button>
              </div>

              {nextChapter && !completed.has(activeChapter.id) ? (
                <p className="next-note">The next source collection becomes available after you mark this chapter complete.</p>
              ) : nextChapter ? (
                <button className="next-step" onClick={() => selectChapter(nextChapter, activeIndex + 1)}>
                  Continue to {nextChapter.name} <ArrowUpRight size={17} />
                </button>
              ) : allDone ? (
                <p className="next-note complete-note"><CheckCircle2 size={17} /> All source collections currently listed in this path are marked complete.</p>
              ) : null}
            </div>
          </section>

          <section className="progress-section" aria-label="Learning progress">
            <div className="progress-header">
              <div>
                <span className="message-label">Local progress</span>
                <p>{completedCount} of {chapters.length} source collections marked complete</p>
              </div>
              <button className="text-action" onClick={resetProgress}>Reset</button>
            </div>
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: `${(completedCount / chapters.length) * 100}%` }} />
            </div>
            <p className="progress-disclaimer">Progress is stored only in this browser. It does not record YouTube viewing activity or certify learning.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
