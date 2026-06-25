interface SearchFormProps {
  initialSearch?: string;
}

export default function SearchForm({ initialSearch = '' }: SearchFormProps) {
  return (
    <form
      action="/"
      method="GET"
      style={{
        display: 'flex',
        gap: '12px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto 32px auto',
      }}
    >
      <input
        type="text"
        name="search"
        defaultValue={initialSearch}
        placeholder="Search product catalog..."
        className="input-field"
        style={{ flex: 1 }}
      />
      <button type="submit" className="btn-primary">
        Search
      </button>
    </form>
  );
}
