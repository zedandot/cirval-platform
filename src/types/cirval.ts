export type MaterialCategory = 
  | 'Coffee By-Product'
  | 'Fruit & Vegetable'
  | 'Grain & Brewery'
  | 'Bakery & Starch'
  | 'Catering & Food Service'
  | 'Oil & Fat Residue';

export type QualityGrade = 'Grade A (Low Contamination)' | 'Grade B (Pre-treatment Required)' | 'Grade C (Industrial Grade)';

export type SupplyFrequency = 'Harian (Daily)' | '2-3 Hari Sekali' | 'Mingguan (Weekly)' | 'Sesuai Siklus Produksi';

export type VerificationStatus = 'Verified by Lab Partner' | 'Pending Lab Verification' | 'Self-Reported with Photos' | 'Batch Audited';

export interface ResourcePassport {
  id: string;
  materialName: string;
  indonesianName: string;
  category: MaterialCategory;
  sourceBusiness: string;
  businessType: 'Food Manufacturer' | 'SPPG / MBG Kitchen' | 'Coffee Roastery / Cafe' | 'Restaurant / Hotel' | 'Agro-processing';
  location: string;
  regency: string; // e.g. Bogor, Bandung, etc.
  availableVolume: number;
  volumeUnit: 'kg/hari' | 'ton/bulan' | 'kg/minggu' | 'ton/batch';
  supplyFrequency: SupplyFrequency;
  moistureLevel: number; // in %
  cnRatio: string; // Carbon-Nitrogen ratio e.g. "24:1"
  organicMatter: number; // in %
  fiberContent: number; // in %
  sugarStarchContent: number; // in %
  contaminationStatus: 'Bebas Kontaminan Fisik/Kimia' | 'Mengandung Kemasan Minimal (<1%)' | 'Perlu Pemilahan Sederhana';
  collectionDate: string;
  photoUrl: string;
  verificationStatus: VerificationStatus;
  verificationHash: string;
  labCertificateNo?: string;
  additionalNotes: string;
  recommendedPathwayId?: string;
  status: 'Valorization Analysis' | 'Matching' | 'Processor Confirmed' | 'In Logistics' | 'Valorized';
}

export interface FeasibilityDimension {
  score: number; // 0.0 - 5.0
  notes: string;
}

export interface ValorizationPathway {
  id: string;
  name: string;
  indonesianName: string;
  iconName: string;
  badgeTag: string;
  overallScore: number; // 0.0 - 5.0
  technicalScore: number;
  economicScore: number;
  environmentalScore: number;
  logisticsScore: number;
  technicalNotes: string;
  economicNotes: string;
  environmentalNotes: string;
  logisticsNotes: string;
  mainRequirements: string[];
  potentialProcessorType: string;
  estimatedValuePerKg: string; // e.g. "Rp 1.800 - Rp 2.500 / kg"
  emissionsAvoidancePerTon: string; // e.g. "1.42 Ton CO2e"
  processingTimeDays: number;
  isRecommended?: boolean;
  recommendationRationale?: string;
}

export interface ProcessorPartner {
  id: string;
  companyName: string;
  companyType: string;
  regency: string;
  province?: string;
  distanceKm: number;
  requiredMaterial: string;
  requiredVolume: string;
  minBatchKg: number;
  maxCapacityKgMonth: number;
  qualityRequirements: string;
  indicativePriceRp: number; // per kg
  compatibilityScore: number; // % e.g. 96
  verifiedBadge: boolean;
  isoOrLabCert: string;
  contactPerson: string;
  contactRole: string;
  pathwaySpecialty: string;
}

export interface AggregationSupplyItem {
  businessName: string;
  volumeKgWeek: number;
  location: string;
  distanceFromHubKm: number;
}

export interface AggregationOpportunity {
  id: string;
  processorName: string;
  targetMaterial: string;
  requiredVolumeKgWeek: number;
  currentAggregatedKgWeek: number;
  percentageFulfilled: number;
  participatingSuppliers: AggregationSupplyItem[];
  shortfallKgWeek: number;
  suggestedAction: string;
  status: 'Aggregating' | 'Ready for Pickup' | 'Contract Matched';
}

export interface TraceabilityStep {
  step: number;
  title: string;
  indonesianTitle: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
  location?: string;
  actor?: string;
  notes?: string;
  verificationBadge?: string;
}

export interface CircularTransaction {
  id: string;
  resourceId: string;
  materialName: string;
  supplierName: string;
  processorName: string;
  valorizationPathway: string;
  volumeKg: number;
  unitPriceRp: number;
  totalPriceRp: number;
  transactionDate: string;
  logisticsStatus: 'Scheduled' | 'In Transit' | 'Delivered to Facility' | 'Processing Complete';
  processingStatus: 'Inspected' | 'In Valorization' | 'Secondary Resource Produced';
  finalOutputProduct: string;
  carbonAvoidedTon: number;
  economicValueRp: number;
  traceabilityTimeline: TraceabilityStep[];
  feedbackSubmitted?: boolean;
}

export interface FeedbackData {
  transactionId: string;
  processorName: string;
  actualYieldPercent: number;
  actualProcessingCostPerKg: number;
  qualityResult: 'Grade A (Exceeds Spec)' | 'Grade B (Meets Spec)' | 'Grade C (Minor Defect)';
  rejectionRatePercent: number;
  finalOutputQuantity: string;
  finalOutputGrade: string;
  processingTimeDays: number;
  operationalNotes: string;
  algorithmCalibrationEffect: string;
}
