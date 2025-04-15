const sortOptions = [
    { value: "date", label: "Sort by Date" },
    { value: "title", label: "Sort by Title" },
    { value: "category", label: "Sort by Category" },
    { value: "location", label: "Sort by Location" },
  ];
  
  const SortDropdown = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
    return (
      <div className="flex gap-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-1 rounded text-sm"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
  
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-1 rounded text-sm"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    );
  };
  
  export default SortDropdown;
  