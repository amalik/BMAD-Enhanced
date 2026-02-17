#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

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
  console.log(`${MAGENTA}${BOLD}║        BMAD-Enhanced Complete Installer 🚀        ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}║                                                    ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}║     Installing Emma + Wade Design Agents          ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}║                                                    ║${RESET}`);
  console.log(`${MAGENTA}${BOLD}╚════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
}

function checkPrerequisites() {
  console.log(`${CYAN}[1/6]${RESET} Checking prerequisites...`);

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

  // Check for BMAD version/compatibility (optional but recommended)
  const bmadConfigPath = path.join(bmadDir, '_config', 'bmad.yaml');
  if (fs.existsSync(bmadConfigPath)) {
    console.log(`${GREEN}  ✓${RESET} BMAD configuration found`);
  } else {
    console.log(`${YELLOW}  ⚠${RESET} BMAD configuration not found (continuing anyway)`);
  }

  console.log(`${GREEN}  ✓${RESET} Prerequisites met`);
}

function copyAllAgentFiles() {
  console.log(`${CYAN}[2/6]${RESET} Installing Emma + Wade agent files...`);

  const sourceDir = path.join(__dirname, '..', '_bmad', 'bme', '_vortex');
  const targetDir = path.join(process.cwd(), '_bmad', 'bme', '_vortex');

  // Create target directory structure
  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'workflows', '_deprecated', 'empathy-map', 'steps'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'workflows', '_deprecated', 'wireframe', 'steps'), { recursive: true });

  // Copy Emma agent file
  console.log(`${CYAN}  →${RESET} Installing Emma (contextualization-expert)...`);
  fs.copyFileSync(
    path.join(sourceDir, 'agents', 'contextualization-expert.md'),
    path.join(targetDir, 'agents', 'contextualization-expert.md')
  );

  // Copy Emma workflow files
  const emmaWorkflowFiles = [
    'workflow.md',
    'empathy-map.template.md',
    'steps/step-01-define-user.md',
    'steps/step-02-says-thinks.md',
    'steps/step-03-does-feels.md',
    'steps/step-04-pain-points.md',
    'steps/step-05-gains.md',
    'steps/step-06-synthesize.md'
  ];

  emmaWorkflowFiles.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, 'workflows', '_deprecated', 'empathy-map', file),
      path.join(targetDir, 'workflows', '_deprecated', 'empathy-map', file)
    );
  });

  console.log(`${GREEN}  ✓${RESET} Emma installed`);

  // Copy Wade agent file
  console.log(`${CYAN}  →${RESET} Installing Wade (lean-experiments-specialist)...`);
  fs.copyFileSync(
    path.join(sourceDir, 'agents', 'lean-experiments-specialist.md'),
    path.join(targetDir, 'agents', 'lean-experiments-specialist.md')
  );

  // Copy Wade workflow files
  const wadeWorkflowFiles = [
    'workflow.md',
    'wireframe.template.md',
    'steps/step-01-define-requirements.md',
    'steps/step-02-user-flows.md',
    'steps/step-03-information-architecture.md',
    'steps/step-04-wireframe-sketch.md',
    'steps/step-05-components.md',
    'steps/step-06-synthesize.md'
  ];

  wadeWorkflowFiles.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, 'workflows', '_deprecated', 'wireframe', file),
      path.join(targetDir, 'workflows', '_deprecated', 'wireframe', file)
    );
  });

  console.log(`${GREEN}  ✓${RESET} Wade installed`);
}

function updateConfig() {
  console.log(`${CYAN}[3/6]${RESET} Configuring agents...`);

  const configPath = path.join(process.cwd(), '_bmad', 'bme', '_vortex', 'config.yaml');
  const manifestPath = path.join(process.cwd(), '_bmad', '_config', 'agent-manifest.csv');

  // Create config
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
  - contextualization-expert     # Emma - Contextualization Expert
  - lean-experiments-specialist  # Wade - Lean Experiments Specialist

# Workflows available
workflows:
  # Emma - Contextualize Stream
  - lean-persona           # Create lean user personas
  - product-vision         # Define product vision
  - contextualize-scope    # Decide which problem space to investigate

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

  // Create manifest
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  const header = '"agent_id","name","title","icon","role","identity","communication_style","expertise","submodule","path"\n';
  const emmaRow = '"contextualization-expert","Emma","Contextualization Expert","🎯","Strategic Framing + Problem-Product Space Navigator","Expert in helping teams contextualize their product strategy by defining clear problem spaces and validating assumptions. Specializes in Lean Startup methodologies, persona creation, and product vision framing. Guides teams through the critical \'Contextualize\' stream of the Vortex framework.","Strategic yet approachable - speaks in frameworks and validated learning. Like a product strategist who asks \'What are we really solving?\' and \'Who is this truly for?\' Uses Lean Startup language (hypotheses, assumptions, pivots) and focuses on clarity before action.","- Master of Lean Startup and strategic framing methodologies - Personas over demographics - focus on jobs-to-be-done and problem contexts - Vision before features - align team around the \'why\' before the \'what\' - Challenge assumptions - every belief is a hypothesis until validated - Problem-solution fit comes before product-market fit","bme","_bmad/bme/_vortex/agents/contextualization-expert.md"\n';
  const wadeRow = '"lean-experiments-specialist","Wade","Lean Experiments Specialist","🧪","Lean Startup + Validated Learning Expert","Lean Startup practitioner specialized in running rapid experiments to validate product hypotheses. Helps teams move from assumptions to evidence through Build-Measure-Learn cycles. Guides teams through the \'Externalize\' stream - taking ideas into the real world to test with actual users.","Experimental and evidence-driven - speaks in hypotheses, metrics, and learning. Like a scientist who says \'Let\'s test that assumption\' and \'What would prove us wrong?\' Uses Lean language (MVPs, pivots, validated learning) and focuses on speed-to-insight over perfection.","- Master of Lean Startup and rapid experimentation - Build the smallest thing that tests the riskiest assumption - Measure what matters - focus on actionable metrics, not vanity metrics - Learn fast, pivot faster - every experiment teaches something - Proof-of-concept before proof-of-value - validate feasibility before business case - Fail fast is good, learn fast is better","bme","_bmad/bme/_vortex/agents/lean-experiments-specialist.md"\n';
  fs.writeFileSync(manifestPath, header + emmaRow + wadeRow);
  console.log(`${GREEN}  ✓${RESET} Created agent-manifest.csv`);
}

function createOutputDirectory() {
  console.log(`${CYAN}[4/6]${RESET} Setting up output directory...`);

  const outputDir = path.join(process.cwd(), '_bmad-output', 'vortex-artifacts');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`${GREEN}  ✓${RESET} Output directory ready`);
}

function verifyInstallation() {
  console.log(`${CYAN}[5/6]${RESET} Verifying installation...`);

  const targetDir = process.cwd();
  const checks = [
    { path: '_bmad/bme/_vortex/agents/contextualization-expert.md', name: 'Emma agent file' },
    { path: '_bmad/bme/_vortex/agents/lean-experiments-specialist.md', name: 'Wade agent file' },
    { path: '_bmad/bme/_vortex/workflows/_deprecated/empathy-map/workflow.md', name: 'Emma workflow (legacy)' },
    { path: '_bmad/bme/_vortex/workflows/_deprecated/wireframe/workflow.md', name: 'Wade workflow (legacy)' },
    { path: '_bmad/bme/_vortex/config.yaml', name: 'Configuration file' },
  ];

  let allChecksPass = true;
  checks.forEach(check => {
    const fullPath = path.join(targetDir, check.path);
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

function copyUserGuides() {
  console.log(`${CYAN}[6/6]${RESET} Installing user guides...`);

  const sourceDir = path.join(__dirname, '..', '_bmad-output', 'vortex-artifacts');
  const targetDir = path.join(process.cwd(), '_bmad-output', 'vortex-artifacts');

  // Copy user guides if they exist
  const guides = ['EMMA-USER-GUIDE.md', 'WADE-USER-GUIDE.md'];
  guides.forEach(guide => {
    const sourcePath = path.join(sourceDir, guide);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, path.join(targetDir, guide));
    }
  });

  console.log(`${GREEN}  ✓${RESET} User guides installed`);
}

function printSuccess() {
  console.log('');
  console.log(`${GREEN}${BOLD}╔════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${GREEN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${GREEN}${BOLD}║    ✓  All Agents Successfully Installed! 🎉       ║${RESET}`);
  console.log(`${GREEN}${BOLD}║                                                    ║${RESET}`);
  console.log(`${GREEN}${BOLD}╚════════════════════════════════════════════════════╝${RESET}`);
  console.log('');
  console.log(`${BOLD}Installed Agents:${RESET}`);
  console.log('');
  console.log(`  ${GREEN}✓${RESET} Emma (contextualization-expert) - Contextualization Expert 🎯`);
  console.log(`  ${GREEN}✓${RESET} Wade (lean-experiments-specialist) - Lean Experiments Specialist 🧪`);
  console.log('');
  console.log(`${BOLD}Quick Start:${RESET}`);
  console.log('');
  console.log('  Activate Emma:');
  console.log(`  ${CYAN}cat _bmad/bme/_vortex/agents/contextualization-expert.md${RESET}`);
  console.log('');
  console.log('  Activate Wade:');
  console.log(`  ${CYAN}cat _bmad/bme/_vortex/agents/lean-experiments-specialist.md${RESET}`);
  console.log('');
  console.log(`${YELLOW}Note: User guides being updated for v1.2.0${RESET}`);
  console.log('');
}

async function main() {
  try {
    printBanner();
    checkPrerequisites();
    copyAllAgentFiles();
    updateConfig();
    createOutputDirectory();
    verifyInstallation();
    copyUserGuides();
    printSuccess();
  } catch (error) {
    console.error(`${RED}✗ Installation failed:${RESET}`, error.message);
    process.exit(1);
  }
}

main();
