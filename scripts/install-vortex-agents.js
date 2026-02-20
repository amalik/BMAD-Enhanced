#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { refreshInstallation } = require('./update/lib/refresh-installation');
const { findProjectRoot } = require('./update/lib/utils');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const MAGENTA = '\x1b[35m';

function printBanner() {
  console.log('');
  console.log(`${MAGENTA}${BOLD}╔════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${MAGENTA}${BOLD}║                                                    ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}║        BMAD-Enhanced Vortex Installer 🌀          ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}║                                                    ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}║   Installing Emma + Wade + Isla + Max Agents      ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}║                                                    ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}╚════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
}

function checkPrerequisites(projectRoot) {
  console.log(`${CYAN}[1/6]${RESET} Checking prerequisites...`);

  const bmadDir = path.join(projectRoot, '_bmad');

  // Create _bmad directory if it doesn't exist
  if (!fs.existsSync(bmadDir)) {
    console.log(`${YELLOW}  ⚠${RESET} _bmad directory not found - creating it`);
    fs.mkdirSync(bmadDir, { recursive: true });
  } else {
    console.log(`${GREEN}  ✓${RESET} BMAD directory detected`);
  }

  // Check for BMAD Method configuration (optional)
  const bmadConfigPath = path.join(bmadDir, '_config', 'bmad.yaml');
  if (fs.existsSync(bmadConfigPath)) {
    console.log(`${GREEN}  ✓${RESET} BMAD Method configuration found`);
  } else {
    console.log(`${YELLOW}  ⚠${RESET} BMAD Method not detected (BMAD-Enhanced will install standalone)`);
  }

  console.log(`${GREEN}  ✓${RESET} Prerequisites met`);
}

function archiveDeprecatedWorkflows(projectRoot) {
  console.log(`${CYAN}[2/6]${RESET} Archiving deprecated workflows...`);

  const sourceDir = path.join(__dirname, '..', '_bmad', 'bme', '_vortex');
  const targetDir = path.join(projectRoot, '_bmad', 'bme', '_vortex');

  // Only wireframe is deprecated now; empathy-map is live for Isla
  const deprecatedWorkflows = ['wireframe'];

  for (const workflow of deprecatedWorkflows) {
    const workflowSourceDir = path.join(sourceDir, 'workflows', '_deprecated', workflow);
    const workflowTargetDir = path.join(targetDir, 'workflows', '_deprecated', workflow);

    if (fs.existsSync(workflowSourceDir)) {
      fs.copySync(workflowSourceDir, workflowTargetDir);
      console.log(`${GREEN}  ✓${RESET} Archived ${workflow} to _deprecated/`);
    }
  }

  // Legacy cleanup
  cleanupLegacyFiles(projectRoot);
}

function cleanupLegacyFiles(projectRoot) {
  console.log(`${CYAN}  →${RESET} Cleaning up legacy files...`);

  // Remove _designos directory (pre-Vortex structure) from all possible locations
  const legacyPaths = [
    path.join(projectRoot, '_bmad', 'bme', '_designos'),
    path.join(projectRoot, '_bmad', '_designos'),
  ];

  for (const legacyPath of legacyPaths) {
    if (fs.existsSync(legacyPath)) {
      fs.removeSync(legacyPath);
      console.log(`${GREEN}    ✓${RESET} Removed legacy directory: ${path.relative(projectRoot, legacyPath)}`);
    }
  }

  console.log(`${GREEN}  ✓${RESET} Legacy cleanup complete`);
}

function createAgentManifest(projectRoot) {
  console.log(`${CYAN}[3/6]${RESET} Creating agent manifest...`);

  const manifestPath = path.join(projectRoot, '_bmad', '_config', 'agent-manifest.csv');
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });

  const header = '"agent_id","name","title","icon","role","identity","communication_style","expertise","submodule","path"\n';
  const emmaRow = '"contextualization-expert","Emma","Contextualization Expert","🎯","Strategic Framing + Problem-Product Space Navigator","Expert in helping teams contextualize their product strategy by defining clear problem spaces and validating assumptions. Specializes in Lean Startup methodologies, persona creation, and product vision framing. Guides teams through the critical \'Contextualize\' stream of the Vortex framework.","Strategic yet approachable - speaks in frameworks and validated learning. Like a product strategist who asks \'What are we really solving?\' and \'Who is this truly for?\' Uses Lean Startup language (hypotheses, assumptions, pivots) and focuses on clarity before action.","- Master of Lean Startup and strategic framing methodologies - Personas over demographics - focus on jobs-to-be-done and problem contexts - Vision before features - align team around the \'why\' before the \'what\' - Challenge assumptions - every belief is a hypothesis until validated - Problem-solution fit comes before product-market fit","bme","_bmad/bme/_vortex/agents/contextualization-expert.md"\n';
  const wadeRow = '"lean-experiments-specialist","Wade","Lean Experiments Specialist","🧪","Lean Startup + Validated Learning Expert","Lean Startup practitioner specialized in running rapid experiments to validate product hypotheses. Helps teams move from assumptions to evidence through Build-Measure-Learn cycles. Guides teams through the \'Externalize\' stream - taking ideas into the real world to test with actual users.","Experimental and evidence-driven - speaks in hypotheses, metrics, and learning. Like a scientist who says \'Let\'s test that assumption\' and \'What would prove us wrong?\' Uses Lean language (MVPs, pivots, validated learning) and focuses on speed-to-insight over perfection.","- Master of Lean Startup and rapid experimentation - Build the smallest thing that tests the riskiest assumption - Measure what matters - focus on actionable metrics, not vanity metrics - Learn fast, pivot faster - every experiment teaches something - Proof-of-concept before proof-of-value - validate feasibility before business case - Fail fast is good, learn fast is better","bme","_bmad/bme/_vortex/agents/lean-experiments-specialist.md"\n';
  const islaRow = '"discovery-empathy-expert","Isla","Discovery & Empathy Expert","🔍","Qualitative Research Expert + Empathy Mapping Specialist","Expert in helping teams deeply understand their users through structured discovery and empathy work. Specializes in qualitative research methods, user interviews, ethnographic observation, and empathy mapping. Guides teams through the \'Empathize\' stream of the Vortex framework.","Warm and probing - asks follow-up questions others wouldn\'t think of. Speaks in user stories and observations. Celebrates messy, raw findings over polished assumptions. Says things like \'I noticed that...\' and \'What if we asked them WHY they do that?\'","- Listen before you define - Observe before you assume - Feelings are data - Talk to real people, not personas - Empathy is a practice, not a phase - The messier the research, the richer the insights","bme","_bmad/bme/_vortex/agents/discovery-empathy-expert.md"\n';
  const maxRow = '"learning-decision-expert","Max","Learning & Decision Expert","🧭","Validated Learning Synthesizer + Strategic Decision Expert","Expert in synthesizing experiment results, capturing validated learnings, and guiding strategic pivot/patch/persevere decisions. Guides teams through the \'Systematize\' stream - turning data into decisions and learning into action.","Calm and decisive - cuts through noise to surface what the data actually says. Says things like \'The evidence suggests...\' and \'Based on what we\'ve learned, here are our three options.\' Focuses on evidence over opinion.","- Data tells a story - learn to read it - Every experiment has a lesson, even failed ones - Decide and move - analysis paralysis kills innovation - Pivot is not failure, it is intelligence - Systematize what you learn so the next team doesn\'t start from zero","bme","_bmad/bme/_vortex/agents/learning-decision-expert.md"\n';
  fs.writeFileSync(manifestPath, header + emmaRow + wadeRow + islaRow + maxRow);
  console.log(`${GREEN}  ✓${RESET} Created agent-manifest.csv`);
}

function createOutputDirectory(projectRoot) {
  console.log(`${CYAN}[4/6]${RESET} Setting up output directory...`);

  const outputDir = path.join(projectRoot, '_bmad-output', 'vortex-artifacts');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`${GREEN}  ✓${RESET} Output directory ready`);
}

function verifyInstallation(projectRoot) {
  console.log(`${CYAN}[6/6]${RESET} Verifying installation...`);

  const checks = [
    { path: '_bmad/bme/_vortex/agents/contextualization-expert.md', name: 'Emma agent file' },
    { path: '_bmad/bme/_vortex/agents/lean-experiments-specialist.md', name: 'Wade agent file' },
    { path: '_bmad/bme/_vortex/agents/discovery-empathy-expert.md', name: 'Isla agent file' },
    { path: '_bmad/bme/_vortex/agents/learning-decision-expert.md', name: 'Max agent file' },
    { path: '_bmad/bme/_vortex/config.yaml', name: 'Configuration file' },
  ];

  let allChecksPass = true;
  checks.forEach(check => {
    const fullPath = path.join(projectRoot, check.path);
    if (fs.existsSync(fullPath)) {
      console.log(`${GREEN}  ✓${RESET} ${check.name}`);
    } else {
      console.log(`${RED}  ✗${RESET} ${check.name} - MISSING`);
      allChecksPass = false;
    }
  });

  if (!allChecksPass) {
    console.log('');
    console.error(`${RED}Installation verification failed. Some files are missing.${RESET}`);
    process.exit(1);
  }

  console.log(`${GREEN}  ✓${RESET} All files installed successfully`);
}

function printSuccess() {
  console.log('');
  console.log(`${GREEN}${BOLD}╔════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${GREEN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${GREEN}${BOLD}║    ✓  All Vortex Agents Installed! 🎉             ║${RESET}`);
  console.log(`${GREEN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${GREEN}${BOLD}╚════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
  console.log(`${BOLD}Installed Agents:${RESET}`);
  console.log('');
  console.log(`  ${GREEN}✓${RESET} Emma (contextualization-expert) - Contextualization Expert 🎯`);
  console.log(`  ${GREEN}✓${RESET} Wade (lean-experiments-specialist) - Lean Experiments Specialist 🧪`);
  console.log(`  ${GREEN}✓${RESET} Isla (discovery-empathy-expert) - Discovery & Empathy Expert 🔍`);
  console.log(`  ${GREEN}✓${RESET} Max (learning-decision-expert) - Learning & Decision Expert 🧭`);
  console.log('');
  console.log(`${BOLD}Quick Start:${RESET}`);
  console.log('');
  console.log('  Activate an agent by reading their file:');
  console.log(`  ${CYAN}cat _bmad/bme/_vortex/agents/contextualization-expert.md${RESET}  (Emma)`);
  console.log(`  ${CYAN}cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md${RESET}  (Wade)`);
  console.log(`  ${CYAN}cat _bmad/bme/_vortex/agents/discovery-empathy-expert.md${RESET}  (Isla)`);
  console.log(`  ${CYAN}cat _bmad/bme/_vortex/agents/learning-decision-expert.md${RESET}  (Max)`);
  console.log('');
}

async function main() {
  try {
    // Use findProjectRoot for existing projects, fall back to cwd for fresh installs
    const projectRoot = findProjectRoot() || process.cwd();

    printBanner();
    checkPrerequisites(projectRoot);
    archiveDeprecatedWorkflows(projectRoot);
    createAgentManifest(projectRoot);
    createOutputDirectory(projectRoot);

    // Use refreshInstallation for agents, workflows, config, and user guides
    console.log(`${CYAN}[5/6]${RESET} Installing agents, workflows, config, and guides...`);
    await refreshInstallation(projectRoot, { backupGuides: false });
    console.log(`${GREEN}  ✓${RESET} Installation refreshed`);

    verifyInstallation(projectRoot);
    printSuccess();
  } catch (error) {
    console.error(`${RED}✗ Installation failed:${RESET}`, error.message);
    process.exit(1);
  }
}

main();
