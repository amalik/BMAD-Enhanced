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
  console.log(`${CYAN}${BOLD}║  Wade (lean-experiments-specialist) Installer 🧪  ║${RESET}`);
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
  console.log(`${CYAN}[2/4]${RESET} Installing Wade agent files...`);

  const sourceDir = path.join(__dirname, '..', '_bmad', 'bme', '_vortex');
  const targetDir = path.join(process.cwd(), '_bmad', 'bme', '_vortex');

  // Create target directory structure
  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'workflows', '_deprecated', 'wireframe', 'steps'), { recursive: true });

  // Copy Wade agent file
  fs.copyFileSync(
    path.join(sourceDir, 'agents', 'lean-experiments-specialist.md'),
    path.join(targetDir, 'agents', 'lean-experiments-specialist.md')
  );

  // Copy wireframe workflow files
  const workflowFiles = [
    'workflow.md',
    'wireframe.template.md',
    'steps/step-01-define-requirements.md',
    'steps/step-02-user-flows.md',
    'steps/step-03-information-architecture.md',
    'steps/step-04-wireframe-sketch.md',
    'steps/step-05-components.md',
    'steps/step-06-synthesize.md'
  ];

  workflowFiles.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, 'workflows', '_deprecated', 'wireframe', file),
      path.join(targetDir, 'workflows', '_deprecated', 'wireframe', file)
    );
  });

  console.log(`${GREEN}  ✓${RESET} Agent files installed`);
}

function updateConfig() {
  console.log(`${CYAN}[3/4]${RESET} Configuring Wade...`);

  const configPath = path.join(process.cwd(), '_bmad', 'bme', '_vortex', 'config.yaml');
  const manifestPath = path.join(process.cwd(), '_bmad', '_config', 'agent-manifest.csv');

  // Update or create config
  if (!fs.existsSync(configPath)) {
    const configContent = `---
submodule_name: _vortex
description: Contextualize and Externalize streams - Strategic framing and validated learning
module: bme
version: 1.2.0

# Output Configuration
output_folder: "{project-root}/_bmad-output/vortex-artifacts"
user_name: "{user}"
communication_language: "en"

# Agents in this submodule
agents:
  - lean-experiments-specialist  # Wade - Lean Experiments Specialist

# Workflows available
workflows:
  # Wade - Externalize Stream
  - mvp                    # Design Minimum Viable Product
  - lean-experiment        # Run Build-Measure-Learn cycle
  - proof-of-concept       # Validate technical feasibility
  - proof-of-value         # Validate business value

# Integration
party_mode_enabled: true
core_module: bme
`;
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, configContent);
    console.log(`${GREEN}  ✓${RESET} Created config.yaml`);
  } else {
    // Add Wade to existing config if not present
    let config = fs.readFileSync(configPath, 'utf-8');
    if (!config.includes('lean-experiments-specialist')) {
      config = config.replace(/agents:\s*\n/, 'agents:\n  - lean-experiments-specialist  # Wade - Lean Experiments Specialist\n');
      config = config.replace(/workflows:\s*\n/, 'workflows:\n  - lean-experiment   # Run Build-Measure-Learn cycle\n');
      fs.writeFileSync(configPath, config);
      console.log(`${GREEN}  ✓${RESET} Updated config.yaml`);
    } else {
      console.log(`${GREEN}  ✓${RESET} Using existing config.yaml`);
    }
  }

  // Update manifest
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  if (!fs.existsSync(manifestPath)) {
    const header = '"agent_id","name","title","icon","role","identity","communication_style","expertise","submodule","path"\n';
    const wadeRow = '"lean-experiments-specialist","Wade","Lean Experiments Specialist","🧪","Lean Startup + Validated Learning Expert","Lean Startup practitioner specialized in running rapid experiments to validate product hypotheses. Helps teams move from assumptions to evidence through Build-Measure-Learn cycles. Guides teams through the \'Externalize\' stream - taking ideas into the real world to test with actual users.","Experimental and evidence-driven - speaks in hypotheses, metrics, and learning. Like a scientist who says \'Let\'s test that assumption\' and \'What would prove us wrong?\' Uses Lean language (MVPs, pivots, validated learning) and focuses on speed-to-insight over perfection.","- Master of Lean Startup and rapid experimentation - Build the smallest thing that tests the riskiest assumption - Measure what matters - focus on actionable metrics, not vanity metrics - Learn fast, pivot faster - every experiment teaches something - Proof-of-concept before proof-of-value - validate feasibility before business case - Fail fast is good, learn fast is better","bme","_bmad/bme/_vortex/agents/lean-experiments-specialist.md"\n';
    fs.writeFileSync(manifestPath, header + wadeRow);
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
  console.log(`${GREEN}${BOLD}║        ✓  Wade Successfully Installed!            ║${RESET}`);
  console.log(`${GREEN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${GREEN}${BOLD}╚════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
  console.log(`${BOLD}Quick Start:${RESET}`);
  console.log('');
  console.log('  1. Activate Wade:');
  console.log(`     ${CYAN}cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md${RESET}`);
  console.log('');
  console.log('  2. Run your first lean experiment:');
  console.log(`     ${CYAN}Select workflow: lean-experiment${RESET}`);
  console.log('');
  console.log(`${YELLOW}Note: User guides being updated for v1.2.0${RESET}`);
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
