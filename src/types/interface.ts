// Configuration for CRM integration (future feature)
export interface CRMConfig {
  enabled?: boolean; // Toggle CRM sync functionality
  apiKey?: string;   // Authentication key for CRM API
  endpoint?: string; // URL for CRM API endpoints
}

export interface CSVData {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
  crmConfig?: CRMConfig;
}

export interface DataTableProps {
  data: CSVData;
  onSave: (data: CSVData) => void;
  onEditToggle: () => void;
  isEditing: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize?: number;
}

export interface FileUploaderProps {
  onDataLoaded: (data: CSVData) => void;
}
