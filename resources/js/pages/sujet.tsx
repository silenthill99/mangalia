import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

type ArticleProps = {
    title: string;
    path: string
}

const Sujet = () => {

    const  { article } = usePage<{article : ArticleProps}>().props;

    return (
        <div className={"grid lg:grid-cols-[25%_50%_25%]"}>
            <Head title={article.title} />
            <div className={"hidden lg:flex flex-col items-center justify-center"}>
                <h1>Mangalia</h1>
                <Link href={route('home')} className={"hover:underline"}>Retour à l'accueil</Link>
            </div>
            <div className={"border-x border-gray-300 min-h-screen"}></div>
            <div className={"hidden lg:flex flex-col items-center justify-center p-5"}>
                <h1>{article.title}</h1>
                <img src={`/storage/${article.path.replace("public/", "")}`} alt="" className={"w-full"}/>
            </div>
        </div>
    );
};

export default Sujet;
