import { Head, Link, usePage } from '@inertiajs/react';
type Articles = {
    id: number;
    title: string;
    path: string;
    price: number;
}
export default function Welcome() {
    const { articles } = usePage<{articles: Articles[]}>().props;

    return (
        <div className={"container mx-auto p-10 lg:px-0 flex flex-col gap-5 lg:block"}>
            <Head title="Page d'accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <h1>Page d'accueil</h1>
            <Link href={route('dashboard')} className={"p-2 bg-gray-300 inline-block hover:bg-black hover:text-white duration-300 rounded shadow"}>Page admin</Link>
            <p>Bienvenue sur Mangalia, la plateforme de streaming n°1 au monde pour regarder des animés (Crunchyroll je t'ai à l'œil)</p>
            {/*<Form />*/}
            <div className={"grid lg:grid-cols-4 gap-10 pt-10"}>
                {articles.map((article, index) => (
                    article.path && (
                        <figure key={index} className={"rounded-3xl shadow-xl h-100 lg:h-200 relative hover:scale-110 duration-300"}>
                            <img src={`/storage/${article.path.replace('public/', '')}`} alt={article.title} className={"w-full h-3/4 object-cover rounded-t-3xl"}/>
                            <figcaption className={"min-h-1/4 p-5 flex flex-col justify-between"}>
                                <p className={'text-3xl'}>{article.title}</p>
                                <a href={route('sujet', article.id)}>Voir plus de détails</a>
                                <p className={"absolute top-5 left-0 right-3/4 bg-orange-500 text-white text-center"}>Prix : {article.price} €</p>
                            </figcaption>
                        </figure>
                    )
                ))}
            </div>
        </div>
    );
}
