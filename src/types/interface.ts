export interface CRMConfig {
  // Placeholder for future CRM configuration
  enabled?: boolean;
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
