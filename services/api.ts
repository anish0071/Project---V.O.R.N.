
import { EvolutionPayload, EvolutionResponse, EvolutionMetrics, EvolutionRecord, Agent } from '../types';

const API_BASE = 'https://your-backend.onrender.com';

// Fallback data for testing/offline mode
const MOCK_RESPONSE: EvolutionResponse = {
  txn_id: "T-800",
  tokens: [
    { id: "EVO-X9-001", score: 99.8, status: "Visa Approved", lineage: "Gen3 Winner (v1+v7 parents)" },
    { id: "EVO-X9-002", score: 98.5, status: "Approved", lineage: "Runner Up" },
    { id: "EVO-X9-003", score: 97.2, status: "Pending", lineage: "Third Place" }
  ],
  compliance_score: 99.5,
  visa_risk: 0.008,
  heatmap: { "pci": 98, "gdpr": 97, "ccpa": 99, "lgpd": 95 },
  processing_time_ms: 24
};

export const evolveData = async (payload: EvolutionPayload): Promise<EvolutionResponse> => {
  try {
    // BACKEND CONNECTION: POST /evolve
    /*
    const response = await fetch(`${API_BASE}/evolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await response.json();
    */
    // Simulating API latency
    await new Promise(r => setTimeout(r, 1500));
    return MOCK_RESPONSE;
  } catch (error) {
    console.error("Evolution failed:", error);
    return MOCK_RESPONSE;
  }
};

export const fetchMetrics = async (): Promise<EvolutionMetrics> => {
  // BACKEND CONNECTION: GET /metrics
  await new Promise(r => setTimeout(r, 500));
  return {
    compliance_score: 98.4,
    latency_ms: 18.2,
    audit_reduction_pct: 42.5
  };
};

export const fetchRecentEvolutions = async (): Promise<EvolutionRecord[]> => {
  // BACKEND CONNECTION: GET /history
  return [
    { txn_id: 'T001', compliance: 99.5, time: 24, status: 'Success' },
    { txn_id: 'T002', compliance: 98.2, time: 31, status: 'Success' },
    { txn_id: 'T003', compliance: 97.8, time: 28, status: 'Success' },
  ];
};

export const fetchAgents = async (): Promise<Agent[]> => {
  // BACKEND CONNECTION: GET /agents
  return [
    { id: '1', name: 'Reg Analyst', icon: 'fa-robot', status: 'Live', fitness: 99.2, load: 45 },
    { id: '2', name: 'PII Detector', icon: 'fa-shield-halved', status: 'Done', fitness: 98.5, load: 20 },
    { id: '3', name: 'Token Morpher', icon: 'fa-bolt', status: 'Active', fitness: 94.1, load: 70 },
    { id: '4', name: 'Risk Crawler', icon: 'fa-spider', status: 'Queue', fitness: 0, load: 0 },
    { id: '5', name: 'PCI Warden', icon: 'fa-building-shield', status: 'Live', fitness: 99.8, load: 30 },
  ];
};
