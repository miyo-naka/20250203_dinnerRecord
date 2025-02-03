import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Record.css";

const Record = () => {
  const [date, setDate] = useState("");
  const [dishName, setDishName] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/record-dinner/",
        // 変数名をキャメルケースからスネークケースに変換
        {
          date: date,
          dish_name: dishName,
          description: notes,
        }
      );
      console.log(response.data);
      alert("記録しました！");
      setDate("");
      setDishName("");
      setNotes("");
    } catch (error) {
      console.error("記録に失敗しました", error);
    }
  };

  return (
    <>
      <h2>夕ご飯の記録</h2>
      <form onSubmit={handleSubmit}>
        <label>
          日付
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          料理名
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
          />
        </label>
        <label>
          メモ
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <button type="submit">記録する</button>
      </form>
      <Link to="/">
        <button>戻る</button>
      </Link>
    </>
  );
};

export default Record;
