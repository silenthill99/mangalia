import { Head, usePage } from '@inertiajs/react';
type Articles = {
    title: string;
}
export default function Welcome() {
    const { articles } = usePage<{articles: Articles[]}>().props;

    return (
        <div className={"container mx-auto"}>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <h1>Page d'accueil</h1>
            {articles.map((article, index) => (
                <p key={index}>{article.title}</p>
            ))}
        </div>
    );
}
