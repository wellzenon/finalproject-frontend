function Event({ event }) {
  console.log(event);
  return <>{JSON.stringify(event)}</>;
}

export async function getStaticPaths() {
  const res = await fetch(`http://127.0.0.1:8000/events/`);
  const events = await res.json();

  const paths = events.map((event) => ({ params: { slug: event.slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/events/${params.slug}`);
  const event = await res.json();

  return {
    props: {
      event,
    },
  };
}

export default Event;
