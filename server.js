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
  },
  {
    id: 'julian-goldie-ai',
    name: 'julian-goldie-ai',
    size: '4.2 KB',
    wordCount: 540,
    content: `# Julian Goldie AI Strategy Session\n\n[Host] Today we're mapping out the SEO Content Pipeline. The goal is to generate 5 unique articles for our funnels and deploy them directly to Netlify in parallel.\n\n[Guest] This is extremely efficient. Using automated static site builders and Vite, we can push content to the CDN edge in seconds. The keyword targeting must be clean.`
  },
  {
    id: 'hermes-mcp-server',
    name: 'hermes-mcp-server',
    size: '5.9 KB',
    wordCount: 750,
    content: `# Hermes MCP Server Integration\n\n[SysAdmin] The Model Context Protocol (MCP) server is online. We can now load tool schemas lazily and call tools directly. The node is operating on port 8080.\n\n[Engineer] Excellent. The react dashboard should connect to the local node to list active servers and display real-time console logs.`
  },
  {
    id: 'hermes-computer-use',
    name: 'hermes-computer-use',
    size: '5.9 KB',
    wordCount: 760,
    content: `# Hermes Computer Use Session Log\n\n[Agent] Initiating browser session. Accessing localhost:5173 to verify page rendering.\n\n[Supervisor] Page is rendering correctly. Colors match the midnight industrial dark scheme, and font sizes comply with the high contrast white typography. Verify command palette opens with control K.`
  },
  {
    id: 'claude-hermes-agent',
    name: 'claude-hermes-agent',
    size: '5.7 KB',
    wordCount: 730,
    content: `# Claude & Hermes Pair Programming Session\n\n[Claude] I'm building out the sidebar component now. Let's add the dynamic local clocks and section dividers. I'll make sure there is no internal scrolling inside the cards to follow layout guidelines.\n\n[Hermes] Correct. Standard full-page scrolling only when the view height exceeds the viewport.`
  },
  {
    id: 'openclaw-seo-agent',
    name: 'openclaw-seo-agent',
    size: '4.0 KB',
    wordCount: 510,
    content: `# OpenClaw SEO Agent Log\n\n[Claw] Running keyword research on target queries. Generating optimized meta titles and headings. Recommending clean slug paths without special characters.\n\n[System] File slug saved as lowercase-hyphenated. Ready for content writing step.`
  },
  {
    id: 'hermes-seo',
    name: 'hermes-seo',
    size: '4.4 KB',
    wordCount: 560,
    content: `# Hermes SEO Strategy Discussion\n\n[AI] I have completed the keyword optimization logic. The article outline contains meta titles, introduction, heading hierarchy (H1, H2, H3), and call-to-actions.\n\n[User] Excellent. Ensure no hashtags are generated in the body content or bios.`
  },
  {
    id: 'goldie-agency',
    name: 'goldie-agency',
    size: '4.8 KB',
    wordCount: 620,
    content: `# Goldie Agency Team Chat\n\n[Lead] We are launching the five Netlify funnels today. The target keyword and file slugs are configured. Let's kick off the automated build.\n\n[SysOp] Build triggered. Staggered CDN deployment in progress. All 5 funnels are live.`
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

// Helper: load database
function loadDb() {
  if (!fs.existsSync(DB_PATH)) {
    const defaultDb = { transcripts: SEED_TRANSCRIPTS, history: SEED_HISTORY };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
    return defaultDb;
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database.json, resetting', err);
    return { transcripts: SEED_TRANSCRIPTS, history: SEED_HISTORY };
  }
}

// Helper: save database
function saveDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Ensure database and output dir exist
loadDb();
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// REST APIs
app.get('/api/transcripts', (req, res) => {
  const db = loadDb();
  res.json(db.transcripts);
});

app.post('/api/transcripts', (req, res) => {
  const db = loadDb();
  const newTranscript = req.body;
  
  // Basic validation
  if (!newTranscript.id || !newTranscript.name || !newTranscript.content) {
    return res.status(400).json({ error: 'Missing transcript parameters' });
  }

  // Ensure unique ID
  const exists = db.transcripts.some(t => t.id === newTranscript.id);
  if (exists) {
    newTranscript.id = `${newTranscript.id}-${Date.now()}`;
  }

  db.transcripts.unshift(newTranscript);
  saveDb(db);
  res.status(201).json(newTranscript);
});

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

// Trigger pipeline and generate physical markdown files
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

  // Write physical markdown files to /output directory
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

    // Add to history log database
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
