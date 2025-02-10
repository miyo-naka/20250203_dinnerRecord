import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import "./History.css";
import EditRecordForm from "./EditRecordForm.tsx";

export type Record = {
  id: number;
  date: string;
  dish_name: string;
  description: string;
};

const History = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editRecord, setEditRecord] = useState<Record | null>(null);

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    api
      .get(`/history/?page=${page}`)
      .then((response) => {
        const data = response.data;
        setRecords(data.records);
        setHasNext(data.has_next);
        setHasPrevious(data.has_previous);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  const handleEdit = (record: Record) => {
    setEditRecord(record);
  };

  const handleUpdate = async (updatedRecord: Record) => {
    try {
      console.log("送信データ:", updatedRecord);
      const response = await api.put(
        `/update-dinner-record/${updatedRecord.id}/`,
        updatedRecord
      );

      setRecords(
        records.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      );
      alert(response.data.message);
      setEditRecord(null); // 編集フォームを閉じる
    } catch (error) {
      console.error("更新エラー：", error);
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/delete-dinner-record/${id}/`);
      console.log(response.data.message);
      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      console.error("削除エラー：", error);
      alert("削除に失敗しました");
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>エラー: {error}</p>;

  return (
    <>
      <h2>ごはんの記録</h2>
      {records.length === 0 ? (
        <p>記録がありません</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>料理名</th>
              <th>メモ</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.dish_name}</td>
                <td>{record.description}</td>
                <td>
                  <button onClick={() => handleEdit(record)}>編集</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(record.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button disabled={!hasPrevious} onClick={() => setPage(page - 1)}>
        Prev
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button disabled={!hasNext} onClick={() => setPage(page + 1)}>
        Next
      </button>
      <Link to="/">
        <button>戻る</button>
      </Link>

      {/* 編集フォーム（EditRecordForm）を表示 */}
      {editRecord && (
        <EditRecordForm
          editRecord={editRecord}
          setEditRecord={setEditRecord}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default History;
