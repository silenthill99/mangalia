import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import mangas from '@/routes/mangas';
import { Manga } from '@/types';

export default function Welcome() {
    const { articles } = usePage<{articles: Manga[]}>().props;

    return (
        <div className={'container mx-auto flex flex-col gap-5 p-10 3xl:block 3xl:px-0'}>
            <Head title="Page d'accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <h1>Page d'accueil</h1>
            <Link href={dashboard()} className={'inline-block rounded bg-gray-300 p-2 shadow duration-300 hover:bg-black hover:text-white mr-auto'}>
                Page admin
            </Link>
            <p>Bienvenue sur Mangalia, la plateforme de streaming n°1 au monde pour regarder des animés (Crunchyroll je t'ai à l'œil)</p>
            {articles.length > 0 && (
                <div className={'grid gap-10 pt-10 lg:grid-cols-4'}>
                    {articles.map(
                        (article, index) =>
                            article.path && (
                                <figure key={index} className={'relative h-100 rounded-3xl shadow-xl duration-300 hover:scale-110 lg:h-200'}>
                                    <img
                                        src={`/storage/${article.path.replace('public/', '')}`}
                                        alt={article.title}
                                        className={'h-3/4 w-full rounded-t-3xl object-cover'}
                                    />
                                    <figcaption className={'flex min-h-1/4 flex-col justify-between p-5'}>
                                        <p className={'text-3xl'}>{article.title}</p>
                                        <Link href={mangas.show({ manga: article.id })}>Voir plus de détails</Link>
                                        <p className={'absolute top-5 right-3/5 left-0 bg-orange-500 text-center text-white text-sm p-1'}>Note : {article.note} / 20</p>
                                    </figcaption>
                                </figure>
                            )
                        ,
                    )}
                </div>
            )}
        </div>
    );
}
