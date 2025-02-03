import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./api.ts";
import "./History.css";

type Record = {
  id: number;
  date: string;
  dish_name: string;
  description: string;
};

const History = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/history/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        return response.json();
      })
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete-dinner-record/${id}/`
      );
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
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.dish_name}</td>
                <td>{record.description}</td>
                <td>
                  <button onClick={() => handleDelete(record.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/">
        <button>戻る</button>
      </Link>
    </>
  );
};

export default History;
