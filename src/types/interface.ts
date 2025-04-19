export interface CSVData {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
}

export interface DataTableProps {
  data: CSVData;
}

export interface FileUploaderProps {
  onDataLoaded: (data: CSVData) => void;
}