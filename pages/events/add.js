import { EventForm } from "components";

export default EventForm;

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
