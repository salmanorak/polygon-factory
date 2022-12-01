import { FC, useRef } from "react";
import { parseJsonFile } from "../../shared/utils/export";

interface ExportToFileProps {
  handler: (json: object) => void;
}

const ImportFile: FC<ExportToFileProps> = ({ handler }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    parseJsonFile(file, (result) => {
      handler(result);
    });
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <input
        className="upload-input"
        type="file"
        onChange={handleExport}
        ref={inputRef}
      />
      ;
      <div className="upload-btn" onClick={handleClick}>
        ⭱
      </div>
    </>
  );
};

export default ImportFile;
