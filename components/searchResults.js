import EventGrid from "./eventgrid";
import SearchBar from "./searchbar";

export default function SearchResults({search, ...props}) {
    return(
        <>
            <SearchBar p={4} />

            {search && [
                <EventGrid key={0} title="Events" group="names" search={search} limit={6} />,
                <EventGrid key={1} title="Tags" group="tags" search={search} limit={6} />,
                <EventGrid key={2} title="Places" group="places" search={search} limit={6} />,
                <EventGrid key={3} title="Organizers" group="organizers" search={search} limit={6} />,
                <EventGrid key={4} title="Others" group="others" search={search} limit={6} />,
            ]}
        </>
    )
}