
const Persons = ({data, removeInfo}) => {
    return (
        <div>
          {data.map((list)=> (
            <div key={list.id}>
              <p>{list.name} {list.number} </p>
              <button type='submit' onClick={() => {
                removeInfo(list);
              }}>delete</button>
            </div>
          ))}
        </div>
    )
}

export default Persons;