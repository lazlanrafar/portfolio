export default function Home() {
  return (
    <div>
      {/* loop lorem */}
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatibus, voluptas quibusdam, voluptatem, voluptate quod
          accusantium quia fugit voluptatum molestiae quos. Quisquam
          voluptatibus, voluptas quibusdam, voluptatem, voluptate quod
        </p>
      ))}
    </div>
  );
}
