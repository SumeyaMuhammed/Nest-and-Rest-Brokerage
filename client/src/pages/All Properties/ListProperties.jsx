const ListProperties = ({ properties, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Type</th>
        <th>Broker</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {properties.map((property) => (
        <tr key={property.id}>
          <td>{property.title}</td>
          <td>{property.price}</td>
          <td>{property.type}</td>
          <td>{property.broker}</td>
          <td>
            <button onClick={() => onEdit(property.id)}>Edit</button>
            <button onClick={() => onDelete(property.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ListProperties;