/**
 * Design reminder — Ground truth: ChatGPT-inspired learning workspace.
 * Keep the shell quiet and source-only; translated interface labels never alter channel-provided lesson data.
 */
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Command,
  ExternalLink,
  ListVideo,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Route as RouteIcon,
  Sun,
  X,
} from "lucide-react";
import { toast } from "sonner";

const channelUrl = "https://www.youtube.com/@warraichpatentebinpunjabi2783";
const progressStorageKey = "driving-learner-path-progress-v1";
const themeStorageKey = "driving-learner-path-theme-v1";
const languageStorageKey = "driving-learner-path-language-v1";

const copy = {
  en: {
    language: "Language", home: "Home", path: "Course path", collections: "Source collections", recent: "Recently published", viewChannel: "View channel", light: "Light mode", dark: "Dark mode", resetProgress: "Reset local progress", source: "Channel source", selfPaced: "Self-paced YouTube learning", welcome: "Continue with your learning path.", introduction: "Choose a source collection from the channel. When you are ready, mark the chapter complete to save your place and unlock the next one.", current: "Your current chapter", playlist: "Channel playlist", videos: "videos", playing: "Playing from the supplied YouTube channel.", openPlaylist: "Open playlist on YouTube", chapterDone: "This chapter is marked complete in this browser.", finishPrompt: "Finished this source collection? Save your progress when you are ready.", completed: "Completed", markComplete: "Mark chapter complete", nextUnlock: "The next source collection becomes available after you mark this chapter complete.", continueTo: "Continue to", allComplete: "All source collections currently listed in this path are marked complete.", progress: "Local progress", collectionsComplete: "source collections marked complete", reset: "Reset", disclaimer: "Progress is stored only in this browser. It does not record YouTube viewing activity or certify learning.", locked: "Complete the previous chapter to unlock this source collection.", already: "This chapter is already marked complete.", savedNext: "Saved. The next source collection is now available.", savedDone: "Saved. All listed source collections are marked complete.", resetMessage: "Your local learning progress has been reset.", help: "All learning material is played from the supplied YouTube channel. Completion is saved only in this browser.", about: "About this learning path", openMenu: "Open menu", closeMenu: "Close menu", collapse: "Collapse sidebar", expand: "Expand sidebar",
  },
  ur: {
    language: "زبان", home: "ہوم", path: "کورس کا راستہ", collections: "ماخذ مجموعے", recent: "حال ہی میں شائع شدہ", viewChannel: "چینل دیکھیں", light: "ہلکا موڈ", dark: "گہرا موڈ", resetProgress: "مقامی پیش رفت ری سیٹ کریں", source: "چینل ماخذ", selfPaced: "اپنی رفتار سے یوٹیوب لرننگ", welcome: "اپنے سیکھنے کے راستے پر جاری رکھیں۔", introduction: "چینل سے ماخذ مجموعہ منتخب کریں۔ جب آپ تیار ہوں، اپنی جگہ محفوظ کرنے اور اگلا مجموعہ کھولنے کے لیے باب مکمل نشان زد کریں۔", current: "آپ کا موجودہ باب", playlist: "چینل پلے لسٹ", videos: "ویڈیوز", playing: "فراہم کردہ یوٹیوب چینل سے چل رہا ہے۔", openPlaylist: "یوٹیوب پر پلے لسٹ کھولیں", chapterDone: "اس براؤزر میں یہ باب مکمل نشان زد ہے۔", finishPrompt: "کیا یہ ماخذ مجموعہ مکمل ہو گیا؟ تیار ہونے پر اپنی پیش رفت محفوظ کریں۔", completed: "مکمل", markComplete: "باب مکمل نشان زد کریں", nextUnlock: "اس باب کو مکمل نشان زد کرنے کے بعد اگلا ماخذ مجموعہ دستیاب ہو گا۔", continueTo: "جاری رکھیں", allComplete: "اس راستے میں درج تمام ماخذ مجموعے مکمل نشان زد ہیں۔", progress: "مقامی پیش رفت", collectionsComplete: "ماخذ مجموعے مکمل نشان زد ہیں", reset: "ری سیٹ", disclaimer: "پیش رفت صرف اس براؤزر میں محفوظ ہے۔ یہ یوٹیوب دیکھنے کی سرگرمی ریکارڈ نہیں کرتی اور نہ سیکھنے کی تصدیق کرتی ہے۔", locked: "اس ماخذ مجموعے کو کھولنے کے لیے پچھلا باب مکمل کریں۔", already: "یہ باب پہلے ہی مکمل نشان زد ہے۔", savedNext: "محفوظ ہو گیا۔ اگلا ماخذ مجموعہ اب دستیاب ہے۔", savedDone: "محفوظ ہو گیا۔ درج تمام ماخذ مجموعے مکمل نشان زد ہیں۔", resetMessage: "آپ کی مقامی سیکھنے کی پیش رفت ری سیٹ ہو گئی ہے۔", help: "تمام تعلیمی مواد فراہم کردہ یوٹیوب چینل سے چلایا جاتا ہے۔ تکمیل صرف اس براؤزر میں محفوظ ہے۔", about: "اس سیکھنے کے راستے کے بارے میں", openMenu: "مینیو کھولیں", closeMenu: "مینیو بند کریں", collapse: "سائیڈبار سکیڑیں", expand: "سائیڈبار پھیلائیں",
  },
  hi: {
    language: "भाषा", home: "होम", path: "कोर्स पथ", collections: "स्रोत संग्रह", recent: "हाल में प्रकाशित", viewChannel: "चैनल देखें", light: "लाइट मोड", dark: "डार्क मोड", resetProgress: "स्थानीय प्रगति रीसेट करें", source: "चैनल स्रोत", selfPaced: "स्व-गति YouTube शिक्षण", welcome: "अपने शिक्षण पथ पर आगे बढ़ें।", introduction: "चैनल से एक स्रोत संग्रह चुनें। तैयार होने पर, अपनी जगह सहेजने और अगला संग्रह खोलने के लिए अध्याय को पूरा चिह्नित करें।", current: "आपका वर्तमान अध्याय", playlist: "चैनल प्लेलिस्ट", videos: "वीडियो", playing: "दिए गए YouTube चैनल से चल रहा है।", openPlaylist: "YouTube पर प्लेलिस्ट खोलें", chapterDone: "यह अध्याय इस ब्राउज़र में पूर्ण चिह्नित है।", finishPrompt: "क्या यह स्रोत संग्रह पूरा हो गया? तैयार होने पर अपनी प्रगति सहेजें।", completed: "पूर्ण", markComplete: "अध्याय पूर्ण चिह्नित करें", nextUnlock: "इस अध्याय को पूर्ण चिह्नित करने पर अगला स्रोत संग्रह उपलब्ध होगा।", continueTo: "जारी रखें", allComplete: "इस पथ में सूचीबद्ध सभी स्रोत संग्रह पूर्ण चिह्नित हैं।", progress: "स्थानीय प्रगति", collectionsComplete: "स्रोत संग्रह पूर्ण चिह्नित हैं", reset: "रीसेट", disclaimer: "प्रगति केवल इस ब्राउज़र में सहेजी जाती है। यह YouTube देखने की गतिविधि रिकॉर्ड नहीं करती और न ही सीखने को प्रमाणित करती है।", locked: "इस स्रोत संग्रह को खोलने के लिए पिछला अध्याय पूरा करें।", already: "यह अध्याय पहले ही पूर्ण चिह्नित है।", savedNext: "सहेजा गया। अगला स्रोत संग्रह अब उपलब्ध है।", savedDone: "सहेजा गया। सूचीबद्ध सभी स्रोत संग्रह पूर्ण चिह्नित हैं।", resetMessage: "आपकी स्थानीय शिक्षण प्रगति रीसेट हो गई है।", help: "सारी शिक्षण सामग्री दिए गए YouTube चैनल से चलाई जाती है। पूर्णता केवल इस ब्राउज़र में सहेजी जाती है।", about: "इस शिक्षण पथ के बारे में", openMenu: "मेनू खोलें", closeMenu: "मेनू बंद करें", collapse: "साइडबार छोटा करें", expand: "साइडबार बड़ा करें",
  },
} as const;

type Language = keyof typeof copy;

const chapters = [
  { id: "essential-pages", name: "zruri page patente b k liye", videoCount: 4, listId: "PL-EQmGjosNXToXAPAEjGT8MznkzFMbMLW" },
  { id: "exam-sheets-2026", name: "scheda di esame patente b 2026", videoCount: 664, listId: "PL-EQmGjosNXTYKM0wNpqrvco7ZLk76EwM" },
  { id: "trick-videos", name: "patente b trick videos", videoCount: 68, listId: "PL-EQmGjosNXS87C53aITUB7nway2qmHg7" },
  { id: "punjabi-course", name: "WARRAICH PATENTE B IN PUNJABI", videoCount: 192, listId: "PL-EQmGjosNXSfs-hdnDxVQud6CI6Jt1pU" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];
type StoredProgress = { completedIds: ChapterId[]; activeId: ChapterId };
const initialProgress: StoredProgress = { completedIds: [], activeId: chapters[0].id };

function getStoredProgress(): StoredProgress {
  if (typeof window === "undefined") return initialProgress;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(progressStorageKey) ?? "null");
    const validIds = new Set(chapters.map((chapter) => chapter.id));
    const completedIds = Array.isArray(parsed?.completedIds) ? parsed.completedIds.filter((id: unknown): id is ChapterId => typeof id === "string" && validIds.has(id as ChapterId)) : [];
    return { completedIds, activeId: validIds.has(parsed?.activeId) ? parsed.activeId as ChapterId : chapters[0].id };
  } catch {
    return initialProgress;
  }
}

function getStoredTheme() {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
}

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(languageStorageKey);
  return stored === "ur" || stored === "hi" ? stored : "en";
}

const getChapterUrl = (listId: string) => `https://www.youtube.com/playlist?list=${listId}`;
const getEmbedUrl = (listId: string) => `https://www.youtube-nocookie.com/embed/videoseries?list=${listId}&rel=0`;

export default function Home() {
  const [progress, setProgress] = useState<StoredProgress>(getStoredProgress);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCompact, setIsSidebarCompact] = useState(false);
  const [isDark, setIsDark] = useState(() => getStoredTheme() === "dark");
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const t = copy[language];

  useEffect(() => { window.localStorage.setItem(progressStorageKey, JSON.stringify(progress)); }, [progress]);
  useEffect(() => { document.documentElement.classList.toggle("dark", isDark); window.localStorage.setItem(themeStorageKey, isDark ? "dark" : "light"); }, [isDark]);
  useEffect(() => { window.localStorage.setItem(languageStorageKey, language); }, [language]);

  const completed = new Set(progress.completedIds);
  const completedCount = progress.completedIds.length;
  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === progress.activeId));
  const activeChapter = chapters[activeIndex] ?? chapters[0];
  const nextChapter = chapters[activeIndex + 1];
  const allDone = completedCount === chapters.length;
  const isUnlocked = (chapterIndex: number) => chapterIndex === 0 || completed.has(chapters[chapterIndex - 1].id);

  const selectChapter = (chapter: (typeof chapters)[number], chapterIndex: number) => {
    if (!isUnlocked(chapterIndex)) { toast.message(t.locked); return; }
    setProgress((current) => ({ ...current, activeId: chapter.id }));
    setIsSidebarOpen(false);
  };

  const completeChapter = () => {
    if (completed.has(activeChapter.id)) { toast.message(t.already); return; }
    const following = chapters[activeIndex + 1];
    setProgress({ completedIds: [...progress.completedIds, activeChapter.id], activeId: following?.id ?? activeChapter.id });
    toast.success(following ? t.savedNext : t.savedDone);
  };

  const resetProgress = () => { setProgress(initialProgress); toast.message(t.resetMessage); };

  return (
    <div className={`app-shell ${isSidebarCompact ? "sidebar-compact" : ""}`} dir={language === "ur" ? "rtl" : "ltr"} lang={language}>
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`} aria-label={t.path}>
        <div className="sidebar-top">
          <div className="brand-row">
            <span className="brand-mark" role="img" aria-label="Driving Learner Path mark"><RouteIcon size={20} strokeWidth={2.4} /></span>
            <div className="brand-copy"><strong>Driving Learner Path</strong><span>Warraich patente</span></div>
            <button className="icon-button desktop-only" aria-label={isSidebarCompact ? t.expand : t.collapse} onClick={() => setIsSidebarCompact((current) => !current)}>
              {isSidebarCompact ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            <button className="icon-button mobile-only" aria-label={t.closeMenu} onClick={() => setIsSidebarOpen(false)}><X size={18} /></button>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label={t.home}>
          <a href="#workspace" className="nav-link nav-link-active"><Command size={18} /><span>{t.home}</span></a>
          <a href="#course-path" className="nav-link"><ListVideo size={18} /><span>{t.path}</span></a>
        </nav>

        <section className="chapter-nav" aria-labelledby="chapter-nav-heading">
          <div className="sidebar-label" id="chapter-nav-heading">{t.collections}</div>
          <div className="chapter-list">
            {chapters.map((chapter) => {
              const chapterIndex = chapters.findIndex((item) => item.id === chapter.id);
              const done = completed.has(chapter.id);
              const unlocked = isUnlocked(chapterIndex);
              const selected = activeChapter.id === chapter.id;
              return (
                <button key={chapter.id} className={`chapter-link ${selected ? "chapter-link-active" : ""}`} onClick={() => selectChapter(chapter, chapterIndex)} disabled={!unlocked} aria-current={selected ? "step" : undefined}>
                  <span className={`chapter-status ${done ? "complete" : unlocked ? "available" : "locked"}`}>{done ? <Check size={13} strokeWidth={3} /> : chapterIndex + 1}</span>
                  <span className="chapter-link-copy"><span>{chapter.name}</span><small>{chapter.videoCount} {t.videos}</small></span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="recent-section" aria-labelledby="recent-heading">
          <div className="sidebar-label" id="recent-heading">{t.recent}</div>
          <a className="recent-link" href="https://www.youtube.com/watch?v=hffSwLXXq1g" target="_blank" rel="noreferrer"><span>Exam Sheet 427 | Part 2 | Full Free Patente B Course in Punjabi</span><small>9:55</small></a>
          <a className="recent-link" href="https://www.youtube.com/watch?v=qrisjbOUg4s" target="_blank" rel="noreferrer"><span>Exam Sheet 427 | Part 1 | Full Free Patente B Course in Punjabi</span><small>10:31</small></a>
          <a className="show-source-link" href={channelUrl} target="_blank" rel="noreferrer">{t.viewChannel} <ArrowUpRight size={14} /></a>
        </section>

        <div className="sidebar-footer">
          <button className="nav-link" onClick={() => setIsDark((current) => !current)}>{isDark ? <Sun size={18} /> : <Moon size={18} />}<span>{isDark ? t.light : t.dark}</span></button>
          <button className="nav-link" onClick={resetProgress}><RotateCcw size={18} /><span>{t.resetProgress}</span></button>
        </div>
      </aside>

      {isSidebarOpen && <button className="sidebar-scrim" aria-label={t.closeMenu} onClick={() => setIsSidebarOpen(false)} />}

      <main className="workspace" id="workspace">
        <header className="workspace-header">
          <button className="icon-button mobile-menu" aria-label={t.openMenu} onClick={() => setIsSidebarOpen(true)}><Menu size={20} /></button>
          <div className="mobile-brand">Driving Learner Path</div>
          <div className="header-actions">
            <a className="quiet-action" href={channelUrl} target="_blank" rel="noreferrer">{t.source} <ExternalLink size={15} /></a>
            <label className="language-control"><span className="sr-only">{t.language}</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label={t.language}><option value="en">English</option><option value="ur">اردو</option><option value="hi">हिन्दी</option></select></label>
            <button className="icon-button" aria-label={t.about} onClick={() => toast.message(t.help)}><CircleHelp size={19} /></button>
          </div>
        </header>

        <div className="workspace-content" id="course-path">
          <section className="welcome-block" aria-labelledby="welcome-title"><p className="eyebrow">{t.selfPaced}</p><h1 id="welcome-title">{t.welcome}</h1><p className="welcome-copy">{t.introduction}</p></section>

          <section className="lesson-canvas" id="lesson-player" aria-labelledby="current-chapter-title">
            <div className="learner-message"><span className="message-label">{t.current}</span><p>{activeChapter.name}</p></div>
            <div className="source-response">
              <div className="response-heading"><div><span className="message-label">{t.playlist}</span><h2 id="current-chapter-title">{activeChapter.name}</h2></div><span className="video-count">{activeChapter.videoCount} {t.videos}</span></div>
              <div className="video-frame"><iframe key={activeChapter.listId} src={getEmbedUrl(activeChapter.listId)} title={`YouTube playlist: ${activeChapter.name}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
              <div className="source-footnote"><span>{t.playing}</span><a href={getChapterUrl(activeChapter.listId)} target="_blank" rel="noreferrer">{t.openPlaylist} <ExternalLink size={14} /></a></div>
              <div className="completion-row"><div className="completion-copy">{completed.has(activeChapter.id) ? <><CheckCircle2 size={20} /><span>{t.chapterDone}</span></> : <span>{t.finishPrompt}</span>}</div><button className={`completion-button ${completed.has(activeChapter.id) ? "completion-done" : ""}`} onClick={completeChapter} disabled={completed.has(activeChapter.id)}>{completed.has(activeChapter.id) ? <Check size={17} /> : <CheckCircle2 size={17} />}{completed.has(activeChapter.id) ? t.completed : t.markComplete}</button></div>
              {nextChapter && !completed.has(activeChapter.id) ? <p className="next-note">{t.nextUnlock}</p> : nextChapter ? <button className="next-step" onClick={() => selectChapter(nextChapter, activeIndex + 1)}>{t.continueTo} {nextChapter.name} <ArrowUpRight size={17} /></button> : allDone ? <p className="next-note complete-note"><CheckCircle2 size={17} /> {t.allComplete}</p> : null}
            </div>
          </section>

          <section className="progress-section" aria-label={t.progress}><div className="progress-header"><div><span className="message-label">{t.progress}</span><p>{completedCount} / {chapters.length} {t.collectionsComplete}</p></div><button className="text-action" onClick={resetProgress}>{t.reset}</button></div><div className="progress-track" aria-hidden="true"><span style={{ width: `${(completedCount / chapters.length) * 100}%` }} /></div><p className="progress-disclaimer">{t.disclaimer}</p></section>
        </div>
      </main>
    </div>
  );
}
