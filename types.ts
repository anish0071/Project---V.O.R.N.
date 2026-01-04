
export interface EvolutionMetrics {
  compliance_score: number;
  latency_ms: number;
  audit_reduction_pct: number;
}

export interface Agent {
  id: string;
  name: string;
  icon: string;
  status: 'Live' | 'Done' | 'Active' | 'Queue';
  fitness: number;
  load: number;
}

export interface EvolutionRecord {
  txn_id: string;
  compliance: number;
  time: number;
  status: string;
}

export interface TokenResult {
  id: string;
  score: number;
  status: string;
  lineage: string;
}

export interface EvolutionResponse {
  txn_id: string;
  tokens: TokenResult[];
  compliance_score: number;
  visa_risk: number;
  heatmap: Record<string, number>;
  processing_time_ms: number;
}

export interface EvolutionPayload {
  card: string;
  name: string;
  expiry: string;
  jurisdiction: string[];
}
