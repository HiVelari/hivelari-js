interface SearchFormProps {
  initialSearch?: string;
}

export default function SearchForm({ initialSearch = '' }: SearchFormProps) {
  return (
    <form
      action="/commerce"
      method="GET"
      style={{ display: 'flex', gap: 8, marginBottom: 32 }}
    >
      <input
        type="text"
        name="search"
        defaultValue={initialSearch}
        placeholder="Search products…"
        className="input"
        style={{ flex: 1, maxWidth: 400 }}
      />
      <button type="submit" className="btn btn-secondary">
        Search
      </button>
      {initialSearch && (
        <a href="/commerce" className="btn btn-ghost">
          Clear
        </a>
      )}
    </form>
  );
}
