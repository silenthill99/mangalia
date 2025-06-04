import { Head, usePage } from '@inertiajs/react';
import Form from '@/components/form';
type Articles = {
    title: string;
    path: string;
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
            <Form />
            {articles.map((article, index) => (
                <div key={index}>
                    <p>{article.title}</p>
                    {article.path && (
                        <img src={`/storage/${article.path.replace('public/', '')}`} alt={article.title}/>
                    )}
                </div>
            ))}
        </div>
    );
}
