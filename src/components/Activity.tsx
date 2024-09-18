interface ActivityProps {
  activity: {
    name: string;
    description: string;
    location: string;
    price: string;
  };
}

function Activity({ activity }: ActivityProps) {
  const { name, description, location, price } = activity;

  return (
    <div>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Price:</strong> {price}
      </p>
    </div>
  );
}

export default Activity;
