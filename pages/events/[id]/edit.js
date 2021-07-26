import { EventForm } from "components";

export default EventForm;

export async function getStaticPaths() {
  const res = await fetch(`http://127.0.0.1:8000/events/`);
  const events = await res.json();

  const paths = events.map(({ id }) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: {
        ...require(`messages/shared/${locale}.json`),
        ...require(`messages/events/${locale}.json`),
      },
    },
    revalidate: 10,
  };
}
