import { FC } from "react";
import { Record } from "./History";

type EditRecordFormProps = {
  editRecord: Record | null;
  setEditRecord: React.Dispatch<React.SetStateAction<Record | null>>;
  handleUpdate: (updatedRecord: Record) => void;
};

const EditRecordForm: FC<EditRecordFormProps> = ({
  editRecord,
  setEditRecord,
  handleUpdate,
}) => {
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editRecord) {
      handleUpdate(editRecord);
    }
  };

  if (!editRecord) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>記録の編集</h3>
        <form onSubmit={handleEditSubmit}>
          <label>
            日付
            <input
              type="date"
              value={editRecord.date}
              onChange={(e) =>
                setEditRecord({ ...editRecord, date: e.target.value })
              }
              required
            />
          </label>
          <label>
            料理名
            <input
              type="text"
              value={editRecord.dish_name}
              onChange={(e) =>
                setEditRecord({ ...editRecord, dish_name: e.target.value })
              }
              required
            />
          </label>
          <label>
            メモ
            <textarea
              value={editRecord.description}
              onChange={(e) =>
                setEditRecord({ ...editRecord, description: e.target.value })
              }
            />
          </label>
          <button type="submit">保存</button>
          <button type="button" onClick={() => setEditRecord(null)}>
            キャンセル
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecordForm;
