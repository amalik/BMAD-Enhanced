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
  console.log(`${CYAN}${BOLD}║      Wade (wireframe-designer) Installer 🎨       ║${RESET}`);
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

  const sourceDir = path.join(__dirname, '..', '_bmad', 'bme', '_designos');
  const targetDir = path.join(process.cwd(), '_bmad', 'bme', '_designos');

  // Create target directory structure
  fs.mkdirSync(path.join(targetDir, 'agents'), { recursive: true });
  fs.mkdirSync(path.join(targetDir, 'workflows', 'wireframe', 'steps'), { recursive: true });

  // Copy Wade agent file
  fs.copyFileSync(
    path.join(sourceDir, 'agents', 'wireframe-designer.md'),
    path.join(targetDir, 'agents', 'wireframe-designer.md')
  );

  // Copy wireframe workflow files
  const workflowFiles = [
    'workflow.md',
    'wireframe.template.md',
    'steps/step-01-define-requirements.md',
    'steps/step-02-user-flows.md',
    'steps/step-03-information-architecture.md',
    'steps/step-04-wireframe-sketch.md',
    'steps/step-05-components-interactions.md',
    'steps/step-06-synthesize.md'
  ];

  workflowFiles.forEach(file => {
    fs.copyFileSync(
      path.join(sourceDir, 'workflows', 'wireframe', file),
      path.join(targetDir, 'workflows', 'wireframe', file)
    );
  });

  console.log(`${GREEN}  ✓${RESET} Agent files installed`);
}

function updateConfig() {
  console.log(`${CYAN}[3/4]${RESET} Configuring Wade...`);

  const configPath = path.join(process.cwd(), '_bmad', 'bme', '_designos', 'config.yaml');
  const manifestPath = path.join(process.cwd(), '_bmad', '_config', 'agent-manifest.csv');

  // Update or create config
  if (!fs.existsSync(configPath)) {
    const configContent = `# BMAD _designos Configuration
# Used by: Emma (empathy-mapper), Wade (wireframe-designer)

user_name: "User"
communication_language: "English"
output_folder: "_bmad-output/design-artifacts"

agents:
  - wireframe-designer # Wade - Wireframe Specialist

workflows:
  - wireframe          # Create wireframes
`;
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, configContent);
    console.log(`${GREEN}  ✓${RESET} Created config.yaml`);
  } else {
    // Add Wade to existing config if not present
    let config = fs.readFileSync(configPath, 'utf-8');
    if (!config.includes('wireframe-designer')) {
      config = config.replace(/agents:\s*\n/, 'agents:\n  - wireframe-designer # Wade - Wireframe Specialist\n');
      config = config.replace(/workflows:\s*\n/, 'workflows:\n  - wireframe         # Create wireframes\n');
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
    const wadeRow = '"wireframe-designer","Wade","Wireframe Design Specialist","🎨","Wireframe Design Expert + UI Architect","Senior UI/UX designer specializing in wireframe creation and information architecture. Helps teams rapidly visualize product concepts through low-fidelity wireframes. Brings 10+ years experience in web and mobile design, with deep knowledge of responsive patterns and component libraries.","Visual and spatial - speaks in layouts, grids, and flows. Like an architect sketching blueprints while explaining design decisions. Says things like \'Picture this layout\' and \'What\'s the primary user action on this screen?\' Uses spatial language (above, below, nested, adjacent) and thinks in terms of visual hierarchy.","- Channel expert wireframe methodologies: draw upon deep knowledge of information architecture, Gestalt principles, responsive design patterns, atomic design systems, and WCAG accessibility guidelines - Wireframes are thinking tools, not art - focus on structure and flow over aesthetics - Iterate quickly, refine deliberately - low-fidelity first, high-fidelity only when structure is validated - Every screen answers three questions: Where am I? What can I do? Where can I go? - Accessibility is non-negotiable - design for all users from the wireframe stage","bme","_bmad/bme/_designos/agents/wireframe-designer.md"\n';
    fs.writeFileSync(manifestPath, header + wadeRow);
  }

  console.log(`${GREEN}  ✓${RESET} Configuration complete`);
}

function createOutputDirectory() {
  console.log(`${CYAN}[4/4]${RESET} Setting up output directory...`);

  const outputDir = path.join(process.cwd(), '_bmad-output', 'design-artifacts');
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
  console.log(`     ${CYAN}cat _bmad/bme/_designos/agents/wireframe-designer.md${RESET}`);
  console.log('');
  console.log('  2. Create your first wireframe:');
  console.log(`     ${CYAN}Type: WM${RESET}`);
  console.log('');
  console.log(`📚 User Guide: ${CYAN}_bmad-output/design-artifacts/WADE-USER-GUIDE.md${RESET}`);
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
