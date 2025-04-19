export interface CSVData {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
}

export interface DataTableProps {
  data: CSVData;
  onSave: (data: CSVData) => void;
  onEditToggle: () => void;
  isEditing: boolean;
}

export interface FileUploaderProps {
  onDataLoaded: (data: CSVData) => void;
}
