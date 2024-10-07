function Item({ content, name }) {
  return (
    <li
      style={{
        padding: 10,
        borderBottom: "1px solid #ddd",
      }}
    >
      {content} - <b>{name}</b>
    </li>
  );
}

function List({ children }) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {children}
    </ul>
  );
}

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h1>Yaycha</h1>
      <List>
        <Item content="Hello, World" name="Alice" />
        <Item content="React is fun." name="Bob" />
      </List>
    </div>
  )
};
