import { FC } from "react";
import { exporToJson } from "../../shared/utils/export";

interface ExportToFileProps {
  json: object;
  fileName: string;
}

const ExportToJSON: FC<ExportToFileProps> = ({ json, fileName }) => {
  const handleExport = () => {
    exporToJson(json, fileName);
  };
  return (
    <div className="download-btn" onClick={handleExport}>
      ⭳
    </div>
  );
};

export default ExportToJSON;
