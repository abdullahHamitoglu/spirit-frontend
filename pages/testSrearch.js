
import { renderToString } from 'react-dom/server';
import algoliasearch from 'algoliasearch/lite';
import {
    Hits,
    InstantSearch,
    InstantSearchSSRProvider,
    SearchBox,
    getServerState,
} from 'react-instantsearch';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import singletonRouter from 'next/router';
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_SECRET);

function Hit({ hit }) {
    console.log(hit);
    return (
        <a href={`/products/${hit.url_key}`} className="search-result">
            <span className="name">{hit.name} <span className="desc">{hit.short_description}</span></span>
            <span className="price">${hit.price}</span>
        </a>
    );
}
export default function SearchPage({ serverState, serverUrl }) {
    return (
        <InstantSearchSSRProvider {...serverState}>
            <InstantSearch
                searchClient={searchClient}
                indexName="products_index"
                routing={{
                    router: createInstantSearchRouterNext({ singletonRouter, serverUrl }),
                }}
            >
                <SearchBox placeholder="Search a Product" typeof="text" classNames={{
                    root: 'border-0',
                    form: 'border-0',
                    input: 'form-control',
                }} />
                <Hits hitComponent={Hit} classNames={{
                    root: 'd-flex',
                    list: 'd-flex flex-column w-100',
                }} />
            </InstantSearch>
        </InstantSearchSSRProvider>
    );
}

export async function getServerSideProps({ req }) {
    const protocol = req.headers.referer?.split('://')[0] || 'https';
    const serverUrl = `${protocol}://${req.headers.host}${req.url}`;
    const serverState = await getServerState(
        <SearchPage serverUrl={serverUrl} />,
        { renderToString }
    );

    return {
        props: {
            serverState,
            serverUrl,
        },
    };
}
