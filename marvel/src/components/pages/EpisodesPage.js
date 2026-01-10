import { Helmet } from "react-helmet";

import EpisodesList from "../episodesList/EpisodesList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our episodes"
                    />
                <title>Episodes page</title>
            </Helmet>
            <ErrorBoundary>
                <EpisodesList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;