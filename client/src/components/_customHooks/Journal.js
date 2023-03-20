// useJournalForm.js
import { useState } from "react";

export const useJournalForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    content: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const resetFormData = () => {
    setFormData({
      title: "",
      topic: "",
      content: "",
    });
  };

  return [formData, handleChange, resetFormData];
};

export const useJournalEntries = () => {
  const [count, setCount] = useState(0);
  const [fetchedJournals, setFetchedJournals] = useState([]);

  const fetchJournalEntries = async () => {
    const endpoint = `http://localhost:3009/journals`;
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Network response not ok. Failed to fetch users`);
      }

      const journals = await response.json();
      setFetchedJournals(journals);
    } catch (error) {
      console.log(error);
    }
  };

  return [count, setCount, fetchedJournals, fetchJournalEntries];
};
