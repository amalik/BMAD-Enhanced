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

  const sourceDir = path.join(__dirname, '..', '_bmad', 'bme', '_designos');
  const targetDir = path.join(process.cwd(), '_bmad', 'bme', '_designos');

  // Create target directory structure
  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'workflows', 'empathy-map', 'steps'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'workflows', 'wireframe', 'steps'), { recursive: true });

  // Copy Emma agent file
  console.log(`${CYAN}  →${RESET} Installing Emma (empathy-mapper)...`);
  fs.copyFileSync(
    path.join(sourceDir, 'agents', 'empathy-mapper.md'),
    path.join(targetDir, 'agents', 'empathy-mapper.md')
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
      path.join(sourceDir, 'workflows', 'empathy-map', file),
      path.join(targetDir, 'workflows', 'empathy-map', file)
    );
  });

  console.log(`${GREEN}  ✓${RESET} Emma installed`);

  // Copy Wade agent file
  console.log(`${CYAN}  →${RESET} Installing Wade (wireframe-designer)...`);
  fs.copyFileSync(
    path.join(sourceDir, 'agents', 'wireframe-designer.md'),
    path.join(targetDir, 'agents', 'wireframe-designer.md')
  );

  // Copy Wade workflow files
  const wadeWorkflowFiles = [
    'workflow.md',
    'wireframe.template.md',
    'steps/step-01-define-requirements.md',
    'steps/step-02-user-flows.md',
    'steps/step-03-information-architecture.md',
    'steps/step-04-wireframe-sketch.md',
    'steps/step-05-components-interactions.md',
    'steps/step-06-synthesize.md'
  ];

  wadeWorkflowFiles.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, 'workflows', 'wireframe', file),
      path.join(targetDir, 'workflows', 'wireframe', file)
    );
  });

  console.log(`${GREEN}  ✓${RESET} Wade installed`);
}

function updateConfig() {
  console.log(`${CYAN}[3/6]${RESET} Configuring agents...`);

  const configPath = path.join(process.cwd(), '_bmad', 'bme', '_designos', 'config.yaml');
  const manifestPath = path.join(process.cwd(), '_bmad', '_config', 'agent-manifest.csv');

  // Create config
  const configContent = `# BMAD _designos Configuration
# Used by: Emma (empathy-mapper), Wade (wireframe-designer)

user_name: "User"
communication_language: "English"
output_folder: "_bmad-output/design-artifacts"

agents:
  - empathy-mapper     # Emma - Empathy Mapping Specialist
  - wireframe-designer # Wade - Wireframe Specialist

workflows:
  - empathy-map        # Create empathy maps
  - wireframe          # Create wireframes
`;
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, configContent);
  console.log(`${GREEN}  ✓${RESET} Created config.yaml`);

  // Create manifest
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  const header = '"agent_id","name","title","icon","role","identity","communication_style","expertise","submodule","path"\n';
  const emmaRow = '"empathy-mapper","Emma","Empathy Mapping Specialist","🎨","UX Researcher + Empathy Mapping Expert","Senior UX researcher specializing in empathy mapping and user-centered design. Helps teams build deep understanding of user needs, motivations, and pain points. Brings 10+ years experience synthesizing research into actionable insights.","Warm and curious - like a skilled interviewer who asks thoughtful follow-up questions. Uses phrases like \'Tell me more about that\' and \'What makes that challenging?\' Empathetic without being saccharine. Focuses on understanding context and emotion.","- Channel expert empathy mapping methodologies: draw upon deep knowledge of cognitive empathy frameworks, Jobs-to-be-Done theory, behavioral psychology, and qualitative research methods - Empathy maps reveal insights, not assumptions - ground observations in real user behaviors and quotes - Ask clarifying questions to avoid surface-level answers - Surface both rational (Says/Does) and emotional (Thinks/Feels) dimensions - Pain points are opportunities - the bigger the pain, the bigger the design opportunity","bme","_bmad/bme/_designos/agents/empathy-mapper.md"\n';
  const wadeRow = '"wireframe-designer","Wade","Wireframe Design Specialist","🎨","Wireframe Design Expert + UI Architect","Senior UI/UX designer specializing in wireframe creation and information architecture. Helps teams rapidly visualize product concepts through low-fidelity wireframes. Brings 10+ years experience in web and mobile design, with deep knowledge of responsive patterns and component libraries.","Visual and spatial - speaks in layouts, grids, and flows. Like an architect sketching blueprints while explaining design decisions. Says things like \'Picture this layout\' and \'What\'s the primary user action on this screen?\' Uses spatial language (above, below, nested, adjacent) and thinks in terms of visual hierarchy.","- Channel expert wireframe methodologies: draw upon deep knowledge of information architecture, Gestalt principles, responsive design patterns, atomic design systems, and WCAG accessibility guidelines - Wireframes are thinking tools, not art - focus on structure and flow over aesthetics - Iterate quickly, refine deliberately - low-fidelity first, high-fidelity only when structure is validated - Every screen answers three questions: Where am I? What can I do? Where can I go? - Accessibility is non-negotiable - design for all users from the wireframe stage","bme","_bmad/bme/_designos/agents/wireframe-designer.md"\n';
  fs.writeFileSync(manifestPath, header + emmaRow + wadeRow);
  console.log(`${GREEN}  ✓${RESET} Created agent-manifest.csv`);
}

function createOutputDirectory() {
  console.log(`${CYAN}[4/6]${RESET} Setting up output directory...`);

  const outputDir = path.join(process.cwd(), '_bmad-output', 'design-artifacts');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`${GREEN}  ✓${RESET} Output directory ready`);
}

function verifyInstallation() {
  console.log(`${CYAN}[5/6]${RESET} Verifying installation...`);

  const targetDir = process.cwd();
  const checks = [
    { path: '_bmad/bme/_designos/agents/empathy-mapper.md', name: 'Emma agent file' },
    { path: '_bmad/bme/_designos/agents/wireframe-designer.md', name: 'Wade agent file' },
    { path: '_bmad/bme/_designos/workflows/empathy-map/workflow.md', name: 'Emma workflow' },
    { path: '_bmad/bme/_designos/workflows/wireframe/workflow.md', name: 'Wade workflow' },
    { path: '_bmad/bme/_designos/config.yaml', name: 'Configuration file' },
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

  const sourceDir = path.join(__dirname, '..', '_bmad-output', 'design-artifacts');
  const targetDir = path.join(process.cwd(), '_bmad-output', 'design-artifacts');

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
  console.log(`  ${GREEN}✓${RESET} Emma (empathy-mapper) - Empathy Mapping Specialist 🎨`);
  console.log(`  ${GREEN}✓${RESET} Wade (wireframe-designer) - Wireframe Design Expert 🎨`);
  console.log('');
  console.log(`${BOLD}Quick Start:${RESET}`);
  console.log('');
  console.log('  Activate Emma:');
  console.log(`  ${CYAN}cat _bmad/bme/_designos/agents/empathy-mapper.md${RESET}`);
  console.log('');
  console.log('  Activate Wade:');
  console.log(`  ${CYAN}cat _bmad/bme/_designos/agents/wireframe-designer.md${RESET}`);
  console.log('');
  console.log(`${BOLD}User Guides:${RESET}`);
  console.log(`  📚 Emma: ${CYAN}_bmad-output/design-artifacts/EMMA-USER-GUIDE.md${RESET}`);
  console.log(`  📚 Wade: ${CYAN}_bmad-output/design-artifacts/WADE-USER-GUIDE.md${RESET}`);
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
