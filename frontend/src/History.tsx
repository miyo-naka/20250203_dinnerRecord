import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    fetch("http://127.0.0.1:8000/api/history/") // DjangoのAPIエンドポイント
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

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>エラー: {error}</p>;

  return (
    <>
      <h2>夕ご飯の記録</h2>
      {records.length === 0 ? (
        <p>記録がありません</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>料理名</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.dish_name}</td>
                <td>{record.description}</td>
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
