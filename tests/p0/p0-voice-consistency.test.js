'use strict';

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const {
  discoverAgents,
  loadAgentDefinition,
  STEP_PATTERN,
} = require('./helpers');

// ─── Voice Markers — Per-Agent Vocabulary Constants (Task 2) ────
// Characteristic phrases: verified in BOTH registry and agent file
// communication_style. Domain vocabulary: verified in workflow step files.
// Keyed by agent ID for dynamic lookup via discoverAgents().

const VOICE_MARKERS = {
  'contextualization-expert': {
    phrases: ['really solving'],
    vocabulary: ['persona', 'hypothesis', 'assumption', 'context', 'problem', 'product', 'vision'],
  },
  'discovery-empathy-expert': {
    phrases: ['I noticed that', 'asked them WHY'],
    vocabulary: ['empathy', 'observe', 'discover', 'interview', 'user', 'research', 'feelings'],
  },
  'research-convergence-specialist': {
    phrases: ['what the research is telling us', 'Three patterns converge'],
    vocabulary: ['converge', 'synthesize', 'pattern', 'insight', 'evidence', 'research', 'finding'],
  },
  'hypothesis-engineer': {
    phrases: ['What if?', 'safe bet'],
    vocabulary: ['hypothesis', 'assumption', 'brainwriting', 'falsifiable', 'belief', 'experiment'],
  },
  'lean-experiments-specialist': {
    phrases: ['validated learning', 'MVPs'],
    vocabulary: ['experiment', 'assumption', 'measure', 'MVP', 'lean', 'learning', 'evidence'],
  },
  'production-intelligence-specialist': {
    phrases: ['The signal indicates', 'what we\'re seeing in context'],
    vocabulary: ['signal', 'pattern', 'observe', 'behavior', 'metric', 'anomaly', 'data'],
  },
  'learning-decision-expert': {
    phrases: ['The evidence suggests', 'what we\'ve learned'],
    vocabulary: ['evidence', 'decision', 'pivot', 'learning', 'data', 'action', 'experiment'],
  },
};

// ─── Dynamic Agent Discovery (NFR5) ────────────────────────────
const agents = discoverAgents();

// ─── P0 Voice Consistency: Registry vs Agent Definition ─────────

describe('P0 Voice Consistency: Registry vs Agent Definition (Low-Confidence)', () => {
  // M2: Vacuous pass guard — ensure dynamic discovery found agents
  it('discovered at least 7 agents for voice testing', () => {
    assert.ok(
      agents.length >= 7,
      `Expected at least 7 agents for voice consistency testing, discovered ${agents.length}`
    );
  });

  for (const agent of agents) {
    describe(`${agent.name} (${agent.id})`, () => {
      let def;
      let markers;

      before(() => {
        def = loadAgentDefinition(agent.id);
        markers = VOICE_MARKERS[agent.id];
      });

      // Task 1.8: all 4 registry persona fields are non-empty strings
      it('registry persona has all 4 fields as non-empty strings', () => {
        const fields = ['role', 'identity', 'communication_style', 'expertise'];
        for (const field of fields) {
          assert.ok(
            typeof agent.persona[field] === 'string' && agent.persona[field].length > 0,
            `[Low-Confidence] ${agent.name} (${agent.id}): registry persona.${field} should be a non-empty string (human spot-check recommended)`
          );
        }
      });

      // Task 1.5: registry communication_style shares at least 1 phrase with agent file
      it('communication_style cross-validation: at least 1 shared phrase', (t) => {
        if (!markers) {
          t.skip(`No voice markers defined for ${agent.name} — add to VOICE_MARKERS`);
          return;
        }
        const registryStyle = agent.persona.communication_style;
        const agentFileStyle = def.persona.communication_style;
        const sharedPhrases = markers.phrases.filter(
          phrase => registryStyle.includes(phrase) && agentFileStyle.includes(phrase)
        );
        assert.ok(
          sharedPhrases.length >= 1,
          `[Low-Confidence] ${agent.name} (${agent.id}): communication_style cross-validation — registry and agent file should share at least 1 characteristic phrase from [${markers.phrases.map(p => `"${p}"`).join(', ')}], found ${sharedPhrases.length} matches (human spot-check recommended)`
        );
      });

      // Task 1.6: registry role shares at least 1 keyword with agent file role
      it('role cross-validation: at least 1 shared keyword', () => {
        const registryRole = agent.persona.role.toLowerCase();
        const agentFileRole = def.persona.role.toLowerCase();

        // Extract significant words (3+ chars) from registry role
        const registryWords = registryRole.match(/\b[a-z]{3,}\b/g) || [];
        const sharedWords = registryWords.filter(w => agentFileRole.includes(w));
        assert.ok(
          sharedWords.length >= 1,
          `[Low-Confidence] ${agent.name} (${agent.id}): role cross-validation — registry role "${agent.persona.role}" and agent file <role> "${def.persona.role}" should share at least 1 keyword, found [${sharedWords.join(', ')}] (human spot-check recommended)`
        );
      });

      // Task 1.7: registry expertise themes appear in agent file principles
      it('expertise/principles cross-validation: at least 2 shared domain keywords', () => {
        const registryExpertise = agent.persona.expertise.toLowerCase();
        const agentFilePrinciples = (def.persona.principles || '').toLowerCase();

        // Extract significant words (4+ chars) from expertise
        const expertiseWords = [...new Set(
          registryExpertise.match(/\b[a-z]{4,}\b/g) || []
        )];
        const sharedWords = expertiseWords.filter(w => agentFilePrinciples.includes(w));

        assert.ok(
          sharedWords.length >= 2,
          `[Low-Confidence] ${agent.name} (${agent.id}): expertise/principles cross-validation — registry expertise and agent file <principles> should share at least 2 domain keywords, found ${sharedWords.length}: [${sharedWords.slice(0, 5).join(', ')}] (human spot-check recommended)`
        );
      });
    });
  }
});

// ─── P0 Voice Consistency: Workflow Step Voice Markers ───────────

describe('P0 Voice Consistency: Workflow Step Voice Markers (Low-Confidence)', () => {
  for (const agent of agents) {
    describe(`${agent.name} (${agent.id})`, () => {
      it('workflow step content contains domain vocabulary', (t) => {
        const markers = VOICE_MARKERS[agent.id];
        if (!markers) {
          t.skip(`No voice markers defined for ${agent.name} — add to VOICE_MARKERS`);
          return;
        }

        // M2: Vacuous pass guard — agent has workflows
        assert.ok(
          agent.workflowDirs.length >= 1,
          `[Low-Confidence] ${agent.name} (${agent.id}): expected at least 1 workflow, found ${agent.workflowDirs.length} (human spot-check recommended)`
        );

        // Concatenate ALL step files across ALL workflows for this agent
        let allStepContent = '';
        let totalStepFiles = 0;

        for (const wfDir of agent.workflowDirs) {
          const stepsDir = path.join(wfDir, 'steps');
          if (!fs.existsSync(stepsDir)) continue;

          const files = fs.readdirSync(stepsDir)
            .filter(f => STEP_PATTERN.test(f))
            .sort();

          for (const file of files) {
            allStepContent += fs.readFileSync(path.join(stepsDir, file), 'utf8') + '\n';
            totalStepFiles++;
          }
        }

        // M2: Vacuous pass guard — ensure step files exist
        assert.ok(
          totalStepFiles >= 1,
          `[Low-Confidence] ${agent.name} (${agent.id}): expected step files but found ${totalStepFiles} across ${agent.workflowDirs.length} workflows (human spot-check recommended)`
        );

        const contentLower = allStepContent.toLowerCase();
        const matchedWords = markers.vocabulary.filter(
          word => contentLower.includes(word.toLowerCase())
        );

        assert.ok(
          matchedWords.length >= 2,
          `[Low-Confidence] ${agent.name} (${agent.id}): workflow step content should contain at least 2 domain vocabulary words from [${markers.vocabulary.join(', ')}], found ${matchedWords.length}: [${matchedWords.join(', ')}] (human spot-check recommended)`
        );
      });
    });
  }
});
