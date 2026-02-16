#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

function printBanner() {
  console.log('');
  console.log(`${CYAN}${BOLD}╔════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${CYAN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${CYAN}${BOLD}║        Emma (empathy-mapper) Installer 🎯         ║${RESET}`);
  console.log(`${CYAN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${CYAN}${BOLD}╚════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
}

function checkPrerequisites() {
  console.log(`${CYAN}[1/4]${RESET} Checking prerequisites...`);

  const targetDir = process.cwd();
  const bmadDir = path.join(targetDir, '_bmad');

  // Check if BMAD Method is installed
  if (!fs.existsSync(bmadDir)) {
    console.log('');
    console.error(`${RED}${BOLD}✗ BMAD Method not found!${RESET}`);
    console.log('');
    console.log(`${YELLOW}BMAD-Enhanced requires BMAD Method to be installed first.${RESET}`);
    console.log('');
    console.log('Please install BMAD Method:');
    console.log(`  ${CYAN}npx bmad-method@alpha install${RESET}`);
    console.log('');
    console.log('Then run this installer again.');
    console.log('');
    process.exit(1);
  }

  console.log(`${GREEN}  ✓${RESET} BMAD Method detected`);
  console.log(`${GREEN}  ✓${RESET} Prerequisites met`);
}

function copyAgentFiles() {
  console.log(`${CYAN}[2/4]${RESET} Installing Emma agent files...`);

  const sourceDir = path.join(__dirname, '..', '_bmad', 'bme', '_vortex');
  const targetDir = path.join(process.cwd(), '_bmad', 'bme', '_vortex');

  // Create target directory structure
  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'workflows', 'empathy-map', 'steps'), { recursive: true });

  // Copy Emma agent file
  fs.copyFileSync(
    path.join(sourceDir, 'agents', 'empathy-mapper.md'),
    path.join(targetDir, 'agents', 'empathy-mapper.md')
  );

  // Copy empathy-map workflow files
  const workflowFiles = [
    'workflow.md',
    'empathy-map.template.md',
    'steps/step-01-define-user.md',
    'steps/step-02-says-thinks.md',
    'steps/step-03-does-feels.md',
    'steps/step-04-pain-points.md',
    'steps/step-05-gains.md',
    'steps/step-06-synthesize.md'
  ];

  workflowFiles.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, 'workflows', 'empathy-map', file),
      path.join(targetDir, 'workflows', 'empathy-map', file)
    );
  });

  console.log(`${GREEN}  ✓${RESET} Agent files installed`);
}

function updateConfig() {
  console.log(`${CYAN}[3/4]${RESET} Configuring Emma...`);

  const configPath = path.join(process.cwd(), '_bmad', 'bme', '_vortex', 'config.yaml');
  const manifestPath = path.join(process.cwd(), '_bmad', '_config', 'agent-manifest.csv');

  // Create config if doesn't exist
  if (!fs.existsSync(configPath)) {
    const configContent = `---
submodule_name: _vortex
description: Contextualize and Externalize streams - Strategic framing and validated learning
module: bme
version: 1.1.0

# Output Configuration
output_folder: "{project-root}/_bmad-output/vortex-artifacts"
user_name: "{user}"
communication_language: "en"

# Agents in this submodule
agents:
  - empathy-mapper     # Emma - Contextualization Expert

# Workflows available
workflows:
  # Emma - Contextualize Stream
  - lean-persona           # Create lean user personas
  - product-vision         # Define product vision
  - contextualize-scope    # Decide which problem space to investigate

# Integration
party_mode_enabled: true
core_module: bme
`;
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, configContent);
    console.log(`${GREEN}  ✓${RESET} Created config.yaml`);
  } else {
    console.log(`${GREEN}  ✓${RESET} Using existing config.yaml`);
  }

  // Update manifest
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  if (!fs.existsSync(manifestPath)) {
    const header = '"agent_id","name","title","icon","role","identity","communication_style","expertise","submodule","path"\n';
    const emmaRow = '"empathy-mapper","Emma","Contextualization Expert","🎯","Strategic Framing + Problem-Product Space Navigator","Expert in helping teams contextualize their product strategy by defining clear problem spaces and validating assumptions. Specializes in Lean Startup methodologies, persona creation, and product vision framing. Guides teams through the critical \'Contextualize\' stream of the Vortex framework.","Strategic yet approachable - speaks in frameworks and validated learning. Like a product strategist who asks \'What are we really solving?\' and \'Who is this truly for?\' Uses Lean Startup language (hypotheses, assumptions, pivots) and focuses on clarity before action.","- Master of Lean Startup and strategic framing methodologies - Personas over demographics - focus on jobs-to-be-done and problem contexts - Vision before features - align team around the \'why\' before the \'what\' - Challenge assumptions - every belief is a hypothesis until validated - Problem-solution fit comes before product-market fit","bme","_bmad/bme/_vortex/agents/empathy-mapper.md"\n';
    fs.writeFileSync(manifestPath, header + emmaRow);
  }

  console.log(`${GREEN}  ✓${RESET} Configuration complete`);
}

function createOutputDirectory() {
  console.log(`${CYAN}[4/4]${RESET} Setting up output directory...`);

  const outputDir = path.join(process.cwd(), '_bmad-output', 'vortex-artifacts');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`${GREEN}  ✓${RESET} Output directory ready`);
}

function printSuccess() {
  console.log('');
  console.log(`${GREEN}${BOLD}╔════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${GREEN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${GREEN}${BOLD}║        ✓  Emma Successfully Installed!            ║${RESET}`);
  console.log(`${GREEN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${GREEN}${BOLD}╚════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
  console.log(`${BOLD}Quick Start:${RESET}`);
  console.log('');
  console.log('  1. Activate Emma:');
  console.log(`     ${CYAN}cat _bmad/bme/_vortex/agents/empathy-mapper.md${RESET}`);
  console.log('');
  console.log('  2. Create your first lean persona:');
  console.log(`     ${CYAN}Select workflow: lean-persona${RESET}`);
  console.log('');
  console.log(`📚 User Guide: ${CYAN}_bmad-output/vortex-artifacts/EMMA-USER-GUIDE.md${RESET}`);
  console.log('');
}

async function main() {
  try {
    printBanner();
    checkPrerequisites();
    copyAgentFiles();
    updateConfig();
    createOutputDirectory();
    printSuccess();
  } catch (error) {
    console.error(`${RED}✗ Installation failed:${RESET}`, error.message);
    process.exit(1);
  }
}

main();
