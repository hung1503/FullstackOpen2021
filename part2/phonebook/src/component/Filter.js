
const Filter = ({searchQuery, handleSearchChange, foundPer}) => {
    return (
        <div>
            <p>
            Filter shown with 
            <input value={searchQuery} 
            type="text" 
            placeholder="Search..." 
            onChange={handleSearchChange}/></p>
          <div>
            {foundPer.map(per => (
              <div key={per.id}>
                <p>{per.name} {per.number}</p>
              </div>
            ))}
          </div>
      </div>
    )
}

export default Filter;