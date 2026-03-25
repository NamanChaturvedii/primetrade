import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const API = "http://localhost:5000/api";

  const login = async () => {
    if (!email || !password) return alert("Enter details");

    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      setEmail("");
      setPassword("");
    } catch {
      alert("Login failed");
    }
  };

  const register = async () => {
    if (!email || !password) return alert("Enter details");

    try {
      await axios.post(`${API}/auth/register`, {
        name: "Naman",
        email,
        password,
      });

      alert("Registered successfully, now login");

      setEmail("");
      setPassword("");
    } catch {
      alert("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes`, {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!title || !content) return alert("Enter note details");

    await axios.post(
      `${API}/notes`,
      { title, content },
      { headers: { Authorization: token } }
    );

    setTitle("");
    setContent("");

    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/notes/${id}`, {
      headers: { Authorization: token },
    });
    fetchNotes();
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  // Login
  if (!token) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Login</h2>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button onClick={login} style={styles.button}>
            Login
          </button>

          <button onClick={register} style={styles.secondaryBtn}>
            Register
          </button>
        </div>
      </div>
    );
  }

  // Dash
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Notes Dashboard</h2>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.input}
        />

        <button onClick={addNote} style={styles.button}>
          Add Note
        </button>

        <h3>Your Notes</h3>

        {notes.map((note) => (
          <div key={note.id} style={styles.note}>
            <p><b>{note.title}</b></p>
            <p>{note.content}</p>
            <button
              onClick={() => deleteNote(note.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 320,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "10px 0",
    borderRadius: 5,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginTop: 10,
  },
  secondaryBtn: {
    width: "100%",
    padding: 10,
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginTop: 10,
  },
  logoutBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
  },
  note: {
    border: "1px solid #ddd",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    textAlign: "left",
  },
  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default App;