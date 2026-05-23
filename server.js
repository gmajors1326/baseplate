import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'database.json');
const OUTPUT_DIR = path.join(__dirname, 'output');

// Initial seed data
const SEED_TRANSCRIPTS = [
  {
    id: 'aipb-community-shared',
    name: 'aipb-community-shared',
    size: '6.4 KB',
    wordCount: 820,
    content: `# AIPB Community Shared Transcript\n\n[Developer A] We need to establish a high-performance content engine for our web applications. Let's discuss configuring Vite, Tailwind CSS, and Node.js.\n\n[Developer B] Yes, the base setup is simple. We can initialize a React shell, import Google Fonts, and configure tailwind.config.js to handle deep dark themes. Let's make sure the touch targets are very generous.\n\n[Developer A] Exactly. All click items need a minimum height of 48px to allow touch navigation without issues. Let's build out the pipeline and verify deployment in the staging area.`
  },
  {
    id: 'agentic-ai-os',
    name: 'agentic-ai-os',
    size: '4.4 KB',
    wordCount: 560,
    content: `# Agentic AI OS Architecture Discussion\n\n[User] How are the agent workflows running in this environment?\n\n[Agent] We have established three primary agents: Claude, OpenClaw, and Hermes. They operate concurrently to review filesystem files, manage tasks, and run builds.\n\n[User] Great, make sure the system maintains zero branding and has a sleek midnight industrial feel.`
  },
  {
    id: 'hermes-agent-os',
    name: 'hermes-agent-os',
    size: '6.0 KB',
    wordCount: 780,
    content: `# Hermes Agent OS Transcript\n\n[Developer] Hermes needs access to read and write filesystem files to execute commands. Let's build the workspace. We need to verify that we are avoiding hashtags and banned phrases in our outputs.\n\n[AI] Affirmative. The safety checks are online. Banned terms like the calm content method are completely blocked. Emojis and links are used instead of hashtags.`
  }
];

const SEED_HISTORY = [
  {
    keyword: 'hermes mcp server',
    slug: 'hermes-mcp-server',
    transcriptName: 'hermes-mcp-server',
    autoDeploy: true,
    timestamp: '2026-05-23 14:32',
    articles: [
      'The Complete Guide to Installing Hermes MCP Server',
      'Why Hermes MCP Server is a Game Changer for AI Agents',
      'How to Connect React Dashboards to your MCP Server',
      '5 Advanced Tools to Run with Hermes Model Context Protocol',
      'Deploying Your Local MCP Server Node: A Step-by-Step Guide'
    ]
  }
];

const SEED_GOALS = [
  { id: 'goal-1', title: 'Generate Q2 SEO Strategy', priority: 'High', agent: 'Claude', status: 'Active' },
  { id: 'goal-2', title: 'Audit Site Speeds', priority: 'Medium', agent: 'Hermes', status: 'Pending' },
  { id: 'goal-3', title: 'Verify UI Styling Guidelines', priority: 'High', agent: 'OpenClaw', status: 'Completed' }
];

const SEED_NOTES = [
  { id: 'note-1', title: 'Vite Config Template', content: 'export default defineConfig({\n  plugins: [react()],\n  server: {\n    proxy: {\n      "/api": {\n        target: "http://localhost:3001",\n        changeOrigin: true\n      }\n    }\n  }\n})' },
  { id: 'note-2', title: 'SEO Outline Prompt', content: 'Act as an expert SEO writer. Write a 1000-word article for the keyword. Ensure heading hierarchies (H1, H2, H3) are used and no hashtags are included.' }
];

const SEED_TASKS = [
  { id: 'task-1', title: 'Configure Render Webhooks', status: 'backlog' },
  { id: 'task-2', title: 'Analyze transcripts for key logs', status: 'in-progress' },
  { id: 'task-3', title: 'Write project README.md', status: 'done' }
];

const SEED_JOURNAL = [
  { id: 'log-1', message: 'Agent Hermes initialized local file system writes.', timestamp: '2026-05-23 11:20' },
  { id: 'log-2', message: 'Claude completed production build verification (0 warnings).', timestamp: '2026-05-23 14:15' }
];

const SEED_MEMORY = [
  { id: 'mem-1', key: 'DEPLOY_TARGET', value: 'Render' },
  { id: 'mem-2', key: 'THEME_NAME', value: 'Midnight Industrial' },
  { id: 'mem-3', key: 'LOCAL_PORT', value: '5173' }
];

// Helper: load database
function loadDb() {
  if (!fs.existsSync(DB_PATH)) {
    const defaultDb = { 
      transcripts: SEED_TRANSCRIPTS, 
      history: SEED_HISTORY,
      goals: SEED_GOALS,
      notes: SEED_NOTES,
      tasks: SEED_TASKS,
      journal: SEED_JOURNAL,
      memory: SEED_MEMORY
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
    return defaultDb;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure all collections exist (migration support)
    if (!parsed.goals) parsed.goals = SEED_GOALS;
    if (!parsed.notes) parsed.notes = SEED_NOTES;
    if (!parsed.tasks) parsed.tasks = SEED_TASKS;
    if (!parsed.journal) parsed.journal = SEED_JOURNAL;
    if (!parsed.memory) parsed.memory = SEED_MEMORY;

    return parsed;
  } catch (err) {
    console.error('Error reading database.json, resetting', err);
    return { 
      transcripts: SEED_TRANSCRIPTS, 
      history: SEED_HISTORY,
      goals: SEED_GOALS,
      notes: SEED_NOTES,
      tasks: SEED_TASKS,
      journal: SEED_JOURNAL,
      memory: SEED_MEMORY
    };
  }
}

// Helper: save database
function saveDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Initialize database
loadDb();
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/* ========================================================
   REST API Endpoints
   ======================================================== */

// Transcripts API
app.get('/api/transcripts', (req, res) => {
  const db = loadDb();
  res.json(db.transcripts);
});

app.post('/api/transcripts', (req, res) => {
  const db = loadDb();
  const newTranscript = req.body;
  if (!newTranscript.id || !newTranscript.name || !newTranscript.content) {
    return res.status(400).json({ error: 'Missing transcript parameters' });
  }
  const exists = db.transcripts.some(t => t.id === newTranscript.id);
  if (exists) {
    newTranscript.id = `${newTranscript.id}-${Date.now()}`;
  }
  db.transcripts.unshift(newTranscript);
  saveDb(db);
  res.status(201).json(newTranscript);
});

// Generation History API
app.get('/api/history', (req, res) => {
  const db = loadDb();
  res.json(db.history);
});

app.delete('/api/history', (req, res) => {
  const db = loadDb();
  db.history = [];
  saveDb(db);
  res.json({ message: 'History cleared' });
});

// Goals API
app.get('/api/goals', (req, res) => {
  const db = loadDb();
  res.json(db.goals);
});

app.post('/api/goals', (req, res) => {
  const db = loadDb();
  const newGoal = req.body;
  if (!newGoal.title || !newGoal.priority || !newGoal.agent) {
    return res.status(400).json({ error: 'Missing goal parameters' });
  }
  newGoal.id = `goal-${Date.now()}`;
  newGoal.status = newGoal.status || 'Active';
  db.goals.push(newGoal);
  saveDb(db);
  res.status(201).json(newGoal);
});

// Notebook API
app.get('/api/notes', (req, res) => {
  const db = loadDb();
  res.json(db.notes);
});

app.post('/api/notes', (req, res) => {
  const db = loadDb();
  const newNote = req.body;
  if (!newNote.title || !newNote.content) {
    return res.status(400).json({ error: 'Missing note parameters' });
  }
  newNote.id = `note-${Date.now()}`;
  db.notes.unshift(newNote);
  saveDb(db);
  res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const db = loadDb();
  db.notes = db.notes.filter(n => n.id !== req.params.id);
  saveDb(db);
  res.json({ message: 'Note deleted' });
});

// Kanban Tasks API
app.get('/api/tasks', (req, res) => {
  const db = loadDb();
  res.json(db.tasks);
});

app.post('/api/tasks', (req, res) => {
  const db = loadDb();
  const newTask = req.body;
  if (!newTask.title) {
    return res.status(400).json({ error: 'Missing task parameters' });
  }
  newTask.id = `task-${Date.now()}`;
  newTask.status = newTask.status || 'backlog';
  db.tasks.push(newTask);
  saveDb(db);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const db = loadDb();
  const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };
  saveDb(db);
  res.json(db.tasks[taskIndex]);
});

// Journal API
app.get('/api/journal', (req, res) => {
  const db = loadDb();
  res.json(db.journal);
});

app.post('/api/journal', (req, res) => {
  const db = loadDb();
  const newLog = req.body;
  if (!newLog.message) {
    return res.status(400).json({ error: 'Missing log message' });
  }
  newLog.id = `log-${Date.now()}`;
  
  const now = new Date();
  newLog.timestamp = newLog.timestamp || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  db.journal.unshift(newLog);
  saveDb(db);
  res.status(201).json(newLog);
});

// Memory API
app.get('/api/memory', (req, res) => {
  const db = loadDb();
  res.json(db.memory);
});

app.post('/api/memory', (req, res) => {
  const db = loadDb();
  const newMem = req.body;
  if (!newMem.key || !newMem.value) {
    return res.status(400).json({ error: 'Missing memory parameters' });
  }
  
  // Update if exists, otherwise create
  const existingIdx = db.memory.findIndex(m => m.key === newMem.key);
  if (existingIdx !== -1) {
    db.memory[existingIdx].value = newMem.value;
    saveDb(db);
    return res.json(db.memory[existingIdx]);
  }

  newMem.id = `mem-${Date.now()}`;
  db.memory.push(newMem);
  saveDb(db);
  res.status(201).json(newMem);
});

app.delete('/api/memory/:id', (req, res) => {
  const db = loadDb();
  db.memory = db.memory.filter(m => m.id !== req.params.id);
  saveDb(db);
  res.json({ message: 'Memory deleted' });
});

// File Generator Engine
app.post('/api/generate', (req, res) => {
  const { keyword, slug, transcriptId, transcriptName, autoDeploy } = req.body;

  if (!keyword || !slug) {
    return res.status(400).json({ error: 'Keyword and Slug are required' });
  }

  const cap = keyword.replace(/\b\w/g, c => c.toUpperCase());
  const articles = [
    `The Ultimate Guide to ${cap}`,
    `Why ${cap} is the Future of Digital Growth`,
    `5 Hidden Secrets About ${cap} You Need to Know`,
    `Mastering ${cap}: A Step-by-Step Developer Tutorial`,
    `How to Maximize Conversions with ${cap}`
  ];

  const generatedFiles = [];
  try {
    articles.forEach((title, index) => {
      const fileName = `${slug}-article-${index + 1}.md`;
      const filePath = path.join(OUTPUT_DIR, fileName);
      
      const content = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
keyword: "${keyword}"
slug: "${slug}"
index: ${index + 1}
---

# ${title}

This article was automatically generated by the Hermes Agent SEO Content Pipeline for the target keyword: **${keyword}**.

## Section 1: Introduction to ${keyword}

In modern web development and SEO operations, optimization of search indexes plays a critical role. By utilizing structured content layouts and fast static CDN deploys, web administrators can establish authoritative gateways.

## Section 2: Implementing ${cap} Best Practices

Implementing a clean setup requires:
1. Designing around clear touch target hierarchies.
2. Integrating responsive CSS frameworks.
3. Writing search engine descriptive headers.

For more details, visit the reference link below.
`;

      fs.writeFileSync(filePath, content, 'utf-8');
      generatedFiles.push(fileName);
    });

    // Save run record to database history
    const db = loadDb();
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const record = {
      keyword,
      slug,
      transcriptName,
      autoDeploy,
      timestamp,
      articles
    };

    db.history.unshift(record);

    // Also auto-log to Journal
    db.journal.unshift({
      id: `log-${Date.now()}`,
      message: `Hermes Agent generated 5 articles for keyword "${keyword}" (${slug}). Files written to /output.`,
      timestamp
    });

    saveDb(db);

    res.json({
      message: 'Articles generated and saved successfully',
      files: generatedFiles,
      record
    });

  } catch (err) {
    console.error('Failed to write files to disk', err);
    res.status(500).json({ error: 'Failed to write files to disk' });
  }
});

app.listen(PORT, () => {
  console.log(`Hermes Agent local node API listening on port ${PORT}`);
});
